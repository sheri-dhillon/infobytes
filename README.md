<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Infobytes Agency Website

React + Vite website with a Node server for contact form delivery and SPA routing fallback.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Frontend dev server: `npm run dev`
3. Production build: `npm run build`
4. Run production server locally: `npm start`

## Contact Form (Resend + Cloudflare Turnstile)

Set the following environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (must be a verified sender in Resend)
- `CONTACT_TO_EMAIL` (defaults to `shehryar@infobytes.io`)
- `TURNSTILE_SECRET_KEY`
- `VITE_TURNSTILE_SITE_KEY`

Behavior:

- Sends full inquiry details to `shehryar@infobytes.io`
- Subject: `New Brand Inquiry Received`
- Sends auto-reply to the submitter
- Subject: `Thanks for Contacting InfoBytes`

## Deploy (DigitalOcean App Platform)

### Recommended deployment mode

Deploy as a **Web Service** (Node) so secret keys stay server-side and SPA route refreshes work automatically.

- Build command: `npm run build`
- Run command: `npm start`
- HTTP port: set by `PORT` (handled automatically by App Platform)

The Node server serves `dist/` and falls back to `index.html` for non-API routes, which fixes 404 on page refresh for React Router paths.
