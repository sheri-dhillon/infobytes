-- Add updated_at column if it does not exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Optional: Create a trigger to automatically update this column on change
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_modtime ON profiles;

CREATE TRIGGER update_profiles_modtime 
BEFORE UPDATE ON profiles 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();