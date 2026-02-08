
-- Insert Default Contact Page Config
INSERT INTO site_settings (key, value)
VALUES (
  'contact_page',
  '{
    "hero": {
      "title": "We''d love to \nhear from you.",
      "subtitle": "Whether you''re building a brand, designing a product, or scaling a system."
    },
    "info": {
      "heading": "LET''S CHAT",
      "subheading": "Let''s bring your vision to life.",
      "email": "hello@infobytes.io",
      "phone": "+1 (555) 000-0000",
      "address": "123 Design Street, Creative City, NY 10012",
      "booking_link": "https://calendly.com/shehryar-infobytes/30min"
    },
    "form_fields": [
      { "id": "1", "key": "first_name", "label": "First Name", "type": "text", "width": "half", "required": true, "placeholder": "John" },
      { "id": "2", "key": "last_name", "label": "Last Name", "type": "text", "width": "half", "required": true, "placeholder": "Doe" },
      { "id": "3", "key": "email", "label": "Email", "type": "email", "width": "full", "required": true, "placeholder": "john@example.com" },
      { "id": "4", "key": "company_name", "label": "Company Name", "type": "text", "width": "half", "required": false, "placeholder": "Acme Inc." },
      { "id": "5", "key": "mobile_number", "label": "Mobile Number", "type": "tel", "width": "half", "required": false, "placeholder": "+1 (555) 000-0000" },
      { "id": "6", "key": "project_budget", "label": "Project Budget", "type": "select", "width": "full", "required": false, "options": ["Less than $1,000", "$1,000 - $2,000", "$2,000 - $3,000", "$3,000+"] },
      { "id": "7", "key": "source", "label": "How did you hear about us?", "type": "select", "width": "full", "required": false, "options": ["Google", "LinkedIn", "Referral", "Other"] },
      { "id": "8", "key": "project_details", "label": "Project Details", "type": "textarea", "width": "full", "required": true, "placeholder": "Tell us about your project..." }
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
