-- Update case_studies table to support new detailed view (Logo, Before, After)
-- We keep 'image' column implicitly as it is often used for the main listing thumbnail.
ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS content TEXT, -- For rich text details
ADD COLUMN IF NOT EXISTS client_logo TEXT, -- URL for client logo
ADD COLUMN IF NOT EXISTS service_category TEXT, -- To store the selected service name
ADD COLUMN IF NOT EXISTS before_image TEXT,
ADD COLUMN IF NOT EXISTS after_image TEXT,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT;

-- Ensure RLS policies exist (safeguard)
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public view case studies" ON case_studies;
CREATE POLICY "Public view case studies" ON case_studies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage case studies" ON case_studies;
CREATE POLICY "Admins manage case studies" ON case_studies FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'blogger'))
);