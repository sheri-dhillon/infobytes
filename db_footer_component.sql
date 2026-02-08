
-- Insert Default Footer Config
INSERT INTO site_settings (key, value)
VALUES (
  'footer',
  '{
    "marquee_text_1": "Let''s Make Something Great",
    "marquee_text_2": "Together",
    "contact_heading": "Got a vision?",
    "contact_subheading": "Let''s architect your digital legacy with precision and style.",
    "email": "hello@infobytes.io",
    "booking_link": "https://calendly.com/shehryar-infobytes/30min",
    "copyright_text": "© 2026 InfoBytes Agency. All rights reserved.",
    "social_links": [
      { "name": "Facebook", "icon": "fa-brands fa-facebook-f", "href": "#" },
      { "name": "Instagram", "icon": "fa-brands fa-instagram", "href": "#" },
      { "name": "LinkedIn", "icon": "fa-brands fa-linkedin-in", "href": "#" },
      { "name": "Twitter", "icon": "fa-brands fa-x-twitter", "href": "#" },
      { "name": "Behance", "icon": "fa-brands fa-behance", "href": "#" },
      { "name": "Dribbble", "icon": "fa-brands fa-dribbble", "href": "#" }
    ],
    "columns": [
      {
        "title": "Expertise",
        "links": [
           { "label": "UI/UX Design Strategy", "href": "/services" },
           { "label": "Native iOS Development", "href": "/services" },
           { "label": "Web Development", "href": "/services" },
           { "label": "Email Marketing", "href": "/services" },
           { "label": "Growth Strategy", "href": "/services" }
        ]
      },
      {
        "title": "Agency",
        "links": [
           { "label": "About Us", "href": "/about" },
           { "label": "Client Success", "href": "/work" },
           { "label": "Pricing Plans", "href": "/pricing" },
           { "label": "Contact", "href": "/contact" },
           { "label": "Privacy Policy", "href": "/privacy" }
        ]
      }
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
