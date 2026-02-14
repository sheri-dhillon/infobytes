<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Infobytes Agency Website

Frontend-only React + Vite website.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Production build: `npm run build`

## Deploy (DigitalOcean App Platform)

### Fix 404 on refresh (React Router)

This app uses client-side routes (e.g. `/services/...`). If your Static Site component is not configured for SPA routing, DigitalOcean will return **404** when you refresh or deep-link to a non-root route.

In the DigitalOcean Control Panel:

1. Go to **Apps** → select your app
2. Open **Settings**
3. Select your **Static Site** component
4. Under **Custom Pages**, set **Catchall** to `index.html`

That makes App Platform serve `index.html` for unknown paths, allowing React Router to handle the route client-side.
