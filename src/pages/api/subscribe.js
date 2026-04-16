export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Valid email required' });
    }

    // TODO: connect to Resend / Mailchimp / ConvertKit
    // For now, log and acknowledge
    console.log(`New subscriber: ${email}`);

    return res.status(200).json({ message: 'Subscribed successfully' });
}
