import Mailgun from 'mailgun-js';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '../config/environment.js';
import db from '../config/db.js'
import { demoValidationSchema, demoRequestTable } from '../models/demo.js';

const demoRequest = async (req, res) => {
    try {
        const validationResult = demoValidationSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationResult.error.errors,
            });
        }
        const { name, email, company, status } = validationResult.data;

        if (!db && !db.schema) {
            return res.status(500).json({ message: 'Database connection is not available' });
        }

        const result = await db.insert(demoRequestTable)
            .values({ name, email, company, status })
        if (result) {
            return res.status(201).json({
                message: 'Demo request added successfully',
                result: result[0],
            });
        } else {
            return res.status(500).json({
                message: 'Failed to add demo request',
            });
        }
    } catch (error) {
        console.error('Error inserting data:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};


const sendResetLink = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const resetLink = `https://backoffice.com/reset-password?email=${encodeURIComponent(email)}`;

        const mailgun = Mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

        const emailData = {
            from: 'no-reply@example.com',
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };
        await mailgun.messages().send(emailData);
        res.status(200).json({ message: 'Reset password link sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
}

export { demoRequest, sendResetLink }