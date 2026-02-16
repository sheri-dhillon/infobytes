import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

const PORT = Number(process.env.PORT || 8080);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'shehryar@infobytes.io';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

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
      subject: 'Thanks for Contacting InfoBytes',
      text: "We've revieved your query and soon you'll receive a response from us.",
      html: "<p>We've revieved your query and soon you'll receive a response from us.</p>"
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
