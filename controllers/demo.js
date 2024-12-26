import Mailgun from 'mailgun-js';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '../config/environment.js';
import db1 from '../config/db.js'
import { demoValidationSchema } from '../models/demo.js';

const demoRequest = async (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.company || !req.body.status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const { name, email, company, status } = req.body || {};
    if (!name || !email || !company || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const validationResult = demoValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validationResult.error.errors,
        });
    }

    try {
        const db = await db1.connect();

        if (!db || !db.schema) {
            return res.status(500).json({ message: 'Database connection is not available' });
        }

        await db.schema.createTableIfNotExists('demo_requests', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('company').notNullable();
            table.string('status').notNullable();
        });

        const result = await db.insert('demo_requests').values({
            name,
            email,
            company,
            status
        }).returning('*');
        console.log(result)
        if (result && result.length > 0) {
            res.status(201).json({
                message: 'Demo request added successfully',
                result: result[0],
            });
        } else {
            res.status(500).json({
                message: 'No data returned from the database',
            });
        }
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).json({
            message: 'Failed to add demo request',
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