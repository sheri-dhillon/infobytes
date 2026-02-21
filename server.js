import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

const PORT = Number(process.env.PORT || 8080);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'shehryar@infobytes.io';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const REQUIRED_FIELDS = [
  'first_name',
  'last_name',
  'email',
  'project_goal',
  'monthly_store_revenue',
  'current_platform',
  'project_details'
];

const FIELD_LABELS = {
  first_name: 'First Name',
  last_name: 'Last Name',
  email: 'Email',
  company_name: 'Company Name',
  mobile_number: 'Mobile Number',
  project_goal: 'Project Goal',
  monthly_store_revenue: 'Monthly Store Revenue',
  current_platform: 'Current Platform',
  project_details: 'Project Details'
};

app.use(express.json({ limit: '1mb' }));

async function verifyTurnstile(token) {
  const params = new URLSearchParams();
  params.set('secret', TURNSTILE_SECRET_KEY || '');
  params.set('response', token || '');

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  if (!response.ok) {
    return { success: false, errors: ['turnstile-request-failed'] };
  }

  return response.json();
}

async function sendResendEmail(payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Failed sending email with Resend');
  }

  return data;
}

async function saveContactToAirtable(form) {
  if (!AIRTABLE_BASE_ID || !AIRTABLE_API_TOKEN) {
    console.warn('Airtable not configured, skipping contact save');
    return null;
  }

  const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            'First Name': form.first_name,
            'Last Name': form.last_name,
            'Email': form.email,
            'Company Name': form.company_name || '',
            'Mobile Number': form.mobile_number || '',
            'Project Goal': form.project_goal,
            'Monthly Store Revenue': form.monthly_store_revenue,
            'Current Platform': form.current_platform,
            'Project Details': form.project_details,
            'Submitted At': new Date().toISOString()
          }
        }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Airtable save error:', data);
    // Don't throw - we still want to send emails even if Airtable fails
    return null;
  }

  return data;
}

function normalizePayload(body) {
  const normalized = {};

  for (const key of Object.keys(FIELD_LABELS)) {
    const value = body?.[key];
    normalized[key] = typeof value === 'string' ? value.trim() : '';
  }

  return normalized;
}

app.post('/api/contact', async (req, res) => {
  try {
    if (!RESEND_API_KEY || !TURNSTILE_SECRET_KEY) {
      return res.status(500).json({
        ok: false,
        message: 'Server is missing required environment variables.'
      });
    }

    const { turnstileToken } = req.body || {};
    const form = normalizePayload(req.body || {});

    const missingField = REQUIRED_FIELDS.find((field) => !form[field]);
    if (missingField) {
      return res.status(400).json({
        ok: false,
        message: `Missing required field: ${FIELD_LABELS[missingField]}`
      });
    }

    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return res.status(400).json({
        ok: false,
        message: 'Turnstile verification is required.'
      });
    }

    const turnstileResult = await verifyTurnstile(turnstileToken);
    if (!turnstileResult?.success) {
      const errorCodes = Array.isArray(turnstileResult?.['error-codes'])
        ? turnstileResult['error-codes'].join(', ')
        : 'unknown';

      return res.status(400).json({
        ok: false,
        message: `Bot verification failed. (${errorCodes})`
      });
    }

    // Save to Airtable (non-blocking - doesn't fail the request if it errors)
    await saveContactToAirtable(form);

    const formRowsText = Object.entries(FIELD_LABELS)
      .map(([key, label]) => `${label}: ${form[key] || 'N/A'}`)
      .join('\n');

    const formRowsHtml = Object.entries(FIELD_LABELS)
      .map(([key, label]) => `<li><strong>${label}:</strong> ${form[key] || 'N/A'}</li>`)
      .join('');

    await sendResendEmail({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      subject: 'New Brand Inquiry Received',
      reply_to: [form.email],
      text: `A new inquiry was submitted:\n\n${formRowsText}`,
      html: `<p>A new inquiry was submitted:</p><ul>${formRowsHtml}</ul>`
    });

    await sendResendEmail({
      from: RESEND_FROM_EMAIL,
      to: [form.email],
      subject: 'Thank You for Reaching Out to InfoBytes!',
      text: `Hi ${form.first_name},\n\nThank you for contacting InfoBytes! We've received your inquiry and our team is reviewing your project details.\n\nHere's a summary of what you submitted:\n- Project Goal: ${form.project_goal}\n- Monthly Store Revenue: ${form.monthly_store_revenue}\n- Current Platform: ${form.current_platform}\n\nWe typically respond within 24-48 business hours. In the meantime, feel free to book a call directly: https://calendly.com/shehryar-infobytes/30min\n\nBest regards,\nThe InfoBytes Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hi ${form.first_name},</h2>
          <p>Thank you for contacting <strong>InfoBytes</strong>! We've received your inquiry and our team is reviewing your project details.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Your Submission Summary:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Project Goal:</strong> ${form.project_goal}</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Monthly Revenue:</strong> ${form.monthly_store_revenue}</li>
              <li style="padding: 8px 0;"><strong>Current Platform:</strong> ${form.current_platform}</li>
            </ul>
          </div>
          <p>We typically respond within <strong>24-48 business hours</strong>.</p>
          <p>Want to speed things up? <a href="https://calendly.com/shehryar-infobytes/30min" style="color: #f97316;">Book a call directly →</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #888; font-size: 14px;">Best regards,<br><strong>The InfoBytes Team</strong></p>
        </div>
      `
    });

    return res.status(200).json({
      ok: true,
      message: 'Your message has been sent successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Unexpected server error.'
    });
  }
});

// Airtable API proxy for careers/jobs
app.get('/api/careers', async (req, res) => {
  try {
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_TOKEN) {
      return res.status(500).json({
        ok: false,
        message: 'Airtable configuration is missing.',
        records: []
      });
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Careers`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error:', response.status, errorText);
      return res.status(response.status).json({
        ok: false,
        message: `Airtable API error: ${response.status}`,
        records: []
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Unexpected server error.',
      records: []
    });
  }
});

app.use(express.static(distDir, { index: false }));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  return res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
