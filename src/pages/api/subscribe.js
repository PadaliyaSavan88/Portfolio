export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Valid email required' });
    }

    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
        console.error('ConvertKit env vars missing');
        return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const ckRes = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email }),
    });

    if (!ckRes.ok) {
        const err = await ckRes.json().catch(() => ({}));
        console.error('ConvertKit error:', err);
        return res.status(500).json({ message: 'Subscription failed' });
    }
    console.log(ckRes)

    return res.status(200).json({ message: 'Subscribed successfully' });
}
