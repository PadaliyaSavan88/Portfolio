# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via next lint
```

There are no tests in this project.

## Architecture

This is a **Next.js 14 portfolio site** (Pages Router, not App Router) for Savan Padaliya — a Full Stack AI Engineer. It uses Bootstrap 5 for styling alongside custom CSS in `src/styles/globals.css`.

### Path aliases

`@/*` maps to `./src/*` (configured in `jsconfig.json`).

### Page structure

- `src/pages/index.js` — homepage; assembles section components from `src/pages/components/`
- `src/pages/about.js` — about page
- `src/pages/blogs.js` — blog listing page; fetches all post metadata via `getSortedPostsData()` at build time
- `src/pages/blogs/[slug].js` — individual blog post page; uses ISR (`revalidate: 600`)
- `src/pages/sitemap.xml.js` — server-side rendered sitemap
- `src/pages/api/revalidate.js` — on-demand ISR endpoint protected by `MY_SECRET_TOKEN` env var

### Component layout

There are **two separate component trees**:

1. **`src/pages/components/`** — page-section components used on the homepage and within page files:
   - `header.js`, `footer.js`, `hero.js`, `about.js`, `contact.js`, `projects.js`, `services.js`, `techStack.js`

2. **`components/`** (root level) — blog-specific components:
   - `post.js` — server-side data utilities (`getPostData`, `getSortedPostsData`, `getPostsFiles`, `getAllPostIdsForSitemap`). All functions read from `src/pages/blogs/posts/`.
   - `posts/post-content.js` — renders markdown with `react-markdown` + `remark-gfm`, custom renderers for images, tables, and syntax-highlighted code blocks (using `react-syntax-highlighter` with `atomDark` theme)
   - `posts/post-header.js` — renders blog post title, author, and formatted date

### Blog post format

Blog posts live at `src/pages/blogs/posts/*.md` and require this frontmatter:

```yaml
---
title: 'Post Title'
date: 'YYYY-MM-DD'
image: 'images/filename.jpg'      # used inside post-content for inline images
imageName: 'filename.jpg'         # used on blog listing card
author: 'Author Name'
description: 'Short description'
keyword: 'comma separated keywords'
---
```

Post images are served from `public/images/posts/`. The `imageName` field is used for the blog card thumbnail on `/blogs`; the `image` field is used for inline images within the post body (prepended with `/images/posts/`).

### Deployment

CI/CD via GitHub Actions (`.github/workflows/`) deploys to a self-hosted Ubuntu server over SSH on push to `master`. The server runs the app under **pm2** as `my-next-app`. Secrets required: `SSH_PRIVATE_KEY`, `SERVER_USER`, `SERVER_IP`, `APP_DIR`.

The `MY_SECRET_TOKEN` environment variable (in `.env`) gates the `/api/revalidate` endpoint for on-demand ISR.
