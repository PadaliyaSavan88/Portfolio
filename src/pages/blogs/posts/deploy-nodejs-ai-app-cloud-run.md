---
title: 'Deploying AI Apps to Cloud Run: Node.js + Vertex AI'
date: '2026-04-27'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Step-by-step guide to deploying a Node.js + Vertex AI application to Google Cloud Run — Dockerfile, authentication, Artifact Registry, and continuous deployment.'
keyword: 'Cloud Run Node.js, deploy AI app Google Cloud, Vertex AI Cloud Run, serverless AI deployment, Cloud Run Dockerfile, GCP Node.js deployment, Artifact Registry'
faq:
  - question: "Why should I use Cloud Run for a Node.js AI application?"
    answer: "Cloud Run is serverless and scales to zero — you pay only for actual requests, which is ideal for AI apps with spiky traffic. It handles load balancing, SSL, and autoscaling automatically. It also integrates natively with Vertex AI authentication via the default service account, eliminating the need to manage key files."
  - question: "How do I authenticate with Vertex AI from a Cloud Run container?"
    answer: "Cloud Run containers automatically have access to the default service account credentials. Grant the Cloud Run service account the Vertex AI User role in IAM. The @google-cloud/vertexai SDK picks up these credentials automatically via Application Default Credentials — no key files or GOOGLE_APPLICATION_CREDENTIALS env var needed."
  - question: "What base Docker image should I use for a Node.js AI app on Cloud Run?"
    answer: "Use node:20-slim as the base image. The slim variant excludes unnecessary packages, reducing container size and attack surface. Multi-stage builds further reduce image size by separating the build environment with devDependencies from the production image with only production dependencies."
  - question: "How do I set environment variables securely in Cloud Run?"
    answer: "Use Secret Manager for sensitive values like API keys. Reference secrets in Cloud Run as environment variables via the --set-secrets flag in gcloud or the Secrets section in the Cloud Run console. Avoid passing secrets as plain env vars in the Dockerfile or deploy commands — they appear in build logs."
  - question: "How long can a Cloud Run request take for AI applications?"
    answer: "Cloud Run supports a maximum request timeout of 3600 seconds (1 hour). For typical LLM calls, set a timeout of 60–120 seconds. For long-running batch operations, use Cloud Tasks or Cloud Run Jobs instead of HTTP requests, which are better suited for fire-and-forget workloads."
---

You have built a Node.js app that calls [Vertex AI](/blogs/vertex-ai-setup-for-nodejs-apps), tested it locally, and now you need it running in production. Cloud Run is the right first choice — serverless, fully managed, and scales to zero when idle.

This guide covers containerizing the app, handling authentication properly, deploying to Cloud Run, and wiring up continuous deployment.

## Prerequisites

Make sure you have completed the [Google Cloud project setup](/blogs/google-cloud-ai-setup-guide) — billing enabled, required APIs enabled — and the [Vertex AI Node.js integration](/blogs/vertex-ai-setup-for-nodejs-apps) working locally.

## Project Structure

```
my-ai-app/
├── src/
│   ├── index.js        # Express app
│   └── vertexai.js     # Vertex AI client
├── package.json
├── Dockerfile
└── .dockerignore
```

A minimal Express app wrapping your Vertex AI calls:

```js
// src/index.js
import express from 'express';
import { generateText } from './vertexai.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  try {
    const text = await generateText(prompt);
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'generation failed' });
  }
});

// Cloud Run injects PORT automatically — never hardcode 3000
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

## Dockerfile

```dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "src/index.js"]
```

```
# .dockerignore
node_modules
.env
*.md
.git
```

Two things matter here:
- `npm ci --only=production` skips dev dependencies — keeps the image lean
- Cloud Run injects `PORT` automatically; your app must read it from the environment, not hardcode a port number

## Authentication: The Critical Part

On Cloud Run, you do not use key files. Instead, assign a dedicated service account to the Cloud Run service and grant it Vertex AI access. The SDK picks up credentials automatically via the GCP metadata server.

**Step 1: Create a service account**

```bash
gcloud iam service-accounts create vertex-ai-runner \
  --display-name="Vertex AI Cloud Run Runner"
```

**Step 2: Grant it the Vertex AI User role**

```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:vertex-ai-runner@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
```

**Step 3: Attach it during deployment** (shown in the deploy step below).

No `GOOGLE_APPLICATION_CREDENTIALS` environment variable, no JSON key files in your container. The SDK authenticates automatically.

## Build and Push the Container

Cloud Run pulls images from Artifact Registry. Create a repository:

```bash
gcloud artifacts repositories create ai-apps \
  --repository-format=docker \
  --location=us-central1 \
  --description="AI application containers"
```

Configure Docker auth and build:

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build
docker build -t us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ai-apps/my-ai-app:latest .

# Push
docker push us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ai-apps/my-ai-app:latest
```

Or use Cloud Build to build remotely (avoids needing Docker locally):

```bash
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ai-apps/my-ai-app:latest .
```

## Deploy to Cloud Run

```bash
gcloud run deploy my-ai-app \
  --image=us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ai-apps/my-ai-app:latest \
  --region=us-central1 \
  --service-account=vertex-ai-runner@YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --set-env-vars=GCP_PROJECT=YOUR_PROJECT_ID,GCP_LOCATION=us-central1 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --allow-unauthenticated
```

Flag notes:
- `--service-account` — attaches the service account; the Vertex AI SDK authenticates automatically via the metadata server
- `--min-instances=0` — scales to zero when idle (saves cost for low-traffic apps)
- `--max-instances=10` — caps scaling; adjust based on expected load and your Vertex AI quota
- `--allow-unauthenticated` — makes the service publicly accessible; remove for internal APIs

## Secrets with Secret Manager

For API keys or sensitive config, use Secret Manager instead of plain environment variables:

```bash
# Create a secret
echo -n "your-api-key" | gcloud secrets create my-api-key --data-file=-

# Grant the service account access
gcloud secrets add-iam-policy-binding my-api-key \
  --member="serviceAccount:vertex-ai-runner@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Reference in the deploy command
gcloud run deploy my-ai-app \
  --set-secrets=MY_API_KEY=my-api-key:latest \
  ...
```

In your Node.js code, the secret appears as a normal environment variable: `process.env.MY_API_KEY`.

## Continuous Deployment with Cloud Build

Add a `cloudbuild.yaml` to auto-deploy on every push to your main branch:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'us-central1-docker.pkg.dev/$PROJECT_ID/ai-apps/my-ai-app:$COMMIT_SHA'
      - '.'

  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'us-central1-docker.pkg.dev/$PROJECT_ID/ai-apps/my-ai-app:$COMMIT_SHA'

  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'gcloud'
      - 'run'
      - 'deploy'
      - 'my-ai-app'
      - '--image=us-central1-docker.pkg.dev/$PROJECT_ID/ai-apps/my-ai-app:$COMMIT_SHA'
      - '--region=us-central1'
      - '--quiet'

images:
  - 'us-central1-docker.pkg.dev/$PROJECT_ID/ai-apps/my-ai-app:$COMMIT_SHA'
```

Connect your GitHub repository to Cloud Build in the GCP console, and every push triggers a build and deploy.

## Cold Starts and Latency

Cloud Run scales to zero by default, meaning the first request after a period of inactivity pays a cold start penalty — usually 1–3 seconds for a Node.js container.

For AI APIs where latency matters:

- **Set `--min-instances=1`** to keep one instance always warm (~$15/month for a 256Mi instance)
- **Preload expensive dependencies** at module load time, not inside request handlers — initializing the Vertex AI client once at startup instead of per-request cuts cold start time significantly
- **Use startup probes** via your `/health` endpoint so Cloud Run only marks an instance ready after initialization is complete

## Verifying the Deployment

```bash
# Get the service URL
gcloud run services describe my-ai-app --region=us-central1 --format='value(status.url)'

# Test the endpoint
curl -X POST https://YOUR_SERVICE_URL/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain what Vertex AI is in one sentence."}'
```

Once deployed, [instrument your Vertex AI calls](/blogs/how-to-monitor-ai-pipelines-in-production) to track latency, token usage, and errors from day one — Cloud Run metrics alone won't show you what's happening inside your AI calls.

## Frequently Asked Questions

**Why should I use Cloud Run for a Node.js AI application?**  
Cloud Run is serverless and scales to zero — you pay only for actual requests, which is ideal for AI apps with spiky or unpredictable traffic. It handles load balancing, SSL, and autoscaling automatically. It also integrates natively with Vertex AI authentication via the default service account, eliminating key file management.

**How do I authenticate with Vertex AI from a Cloud Run container?**  
Cloud Run containers automatically have access to the default service account credentials. Grant the Cloud Run service account the Vertex AI User role in IAM. The `@google-cloud/vertexai` SDK picks up these credentials automatically via Application Default Credentials — no key files or `GOOGLE_APPLICATION_CREDENTIALS` env var needed.

**What base Docker image should I use for a Node.js AI app on Cloud Run?**  
Use `node:20-slim` as the base image. The slim variant excludes unnecessary packages, reducing container size and attack surface. Multi-stage builds further reduce image size by separating the build environment (with devDependencies) from the production image (with only production dependencies installed).

**How do I set environment variables securely in Cloud Run?**  
Use Secret Manager for sensitive values like API keys. Reference secrets in Cloud Run as environment variables via the `--set-secrets` flag in gcloud or the Secrets section in the Cloud Run console. Avoid passing secrets as plain env vars in the Dockerfile or deploy commands — they appear in build and deployment logs.

**How long can a Cloud Run request take for AI applications?**  
Cloud Run supports a maximum request timeout of 3600 seconds (1 hour). For typical LLM calls, set a timeout of 60–120 seconds. For long-running batch operations, use Cloud Tasks or Cloud Run Jobs instead of HTTP requests, which are better suited for fire-and-forget workloads that don't need immediate responses.
