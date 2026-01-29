-- --- 1. EXISTING SETUP (Keep your existing tables) ---

-- ... (Previous tables: profiles, services, posts, etc.) ...

-- --- 4. STORAGE SETUP (For Avatars & Images) ---

-- Create the 'media' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public Access to View
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- Policy: Authenticated Users can Upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- Policy: Users can update their own uploads (optional, usually Insert is enough for simple usage)
CREATE POLICY "Users can update own"
ON storage.objects FOR UPDATE
USING ( auth.uid() = owner );

-- Policy: Users can delete own uploads
CREATE POLICY "Users can delete own"
ON storage.objects FOR DELETE
USING ( auth.uid() = owner );
