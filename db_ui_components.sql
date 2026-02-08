
-- Create table for key-value site settings (storing JSON configs)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read settings (needed for public website)
DROP POLICY IF EXISTS "Public view settings" ON site_settings;
CREATE POLICY "Public view settings" ON site_settings FOR SELECT USING (true);

-- Policy: Only Admins can update/insert
DROP POLICY IF EXISTS "Admins manage settings" ON site_settings;
CREATE POLICY "Admins manage settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Insert Default Header Config if not exists
INSERT INTO site_settings (key, value)
VALUES (
  'header',
  '{
    "logo_url": "", 
    "logo_alt": "InfoBytes Agency",
    "cta_text": "Book a 30 mins call", 
    "cta_link": "https://calendly.com/shehryar-infobytes/30min",
    "menu_items": [
      {"label": "Home", "href": "/"},
      {"label": "About", "href": "/about"},
      {"label": "Service", "href": "/services"},
      {"label": "Portfolio", "href": "/work"},
      {"label": "Reviews", "href": "/testimonials"},
      {"label": "Contact", "href": "/contact"}
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
