-- --- 1. TABLES ---

-- PROFILES (Links to auth.users, stores Role & Metadata)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'manager' CHECK (role IN ('admin', 'manager', 'blogger')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Update POSTS to include Author
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES profiles(id);

-- --- 2. TRIGGERS (Auto-create Profile on Signup) ---

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    'manager' -- Default role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --- 3. RLS POLICIES (Role-Based Access Control) ---

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Helper Function to get current user role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
DECLARE
  current_role TEXT;
BEGIN
  SELECT role INTO current_role FROM profiles WHERE id = auth.uid();
  RETURN current_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3.1 PROFILES POLICIES
-- Everyone can read profiles (needed for attribution)
CREATE POLICY "Profiles are viewable by users" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
-- Only Admins can update roles, Users can update own profile
CREATE POLICY "Admins manage profiles" ON profiles FOR UPDATE USING (
  get_current_user_role() = 'admin' OR id = auth.uid()
);

-- 3.2 POSTS POLICIES
-- Admin: All
-- Manager: Read Only
-- Blogger: Read/Write
DROP POLICY IF EXISTS "Posts Policy" ON posts;
CREATE POLICY "Posts Access" ON posts FOR ALL USING (
  auth.role() = 'authenticated' AND (
    get_current_user_role() = 'admin' OR 
    get_current_user_role() = 'blogger' OR
    (get_current_user_role() = 'manager' AND (current_setting('request.method') = 'GET'))
  )
);

-- 3.3 LEADS / SERVICES / TESTIMONIALS / CASE_STUDIES POLICIES
-- Admin: All
-- Manager: Read Only
-- Blogger: NO ACCESS (Hidden in UI, blocked in DB)

-- Leads
DROP POLICY IF EXISTS "Leads Policy" ON leads;
CREATE POLICY "Leads Access" ON leads FOR ALL USING (
  auth.role() = 'authenticated' AND (
    get_current_user_role() = 'admin' OR 
    (get_current_user_role() = 'manager' AND (current_setting('request.method') = 'GET'))
  )
);

-- Services
DROP POLICY IF EXISTS "Services Policy" ON services;
CREATE POLICY "Services Access" ON services FOR ALL USING (
  auth.role() = 'authenticated' AND (
    get_current_user_role() = 'admin' OR 
    (get_current_user_role() = 'manager' AND (current_setting('request.method') = 'GET'))
  )
);

-- Testimonials & Case Studies (Same as Services)
DROP POLICY IF EXISTS "Testimonials Policy" ON testimonials;
CREATE POLICY "Testimonials Access" ON testimonials FOR ALL USING (
  auth.role() = 'authenticated' AND (
    get_current_user_role() = 'admin' OR 
    (get_current_user_role() = 'manager' AND (current_setting('request.method') = 'GET'))
  )
);

-- Comments (Bloggers need access to moderate)
DROP POLICY IF EXISTS "Authenticated users can manage comments" ON comments;
CREATE POLICY "Comments Access" ON comments FOR ALL USING (
  auth.role() = 'authenticated' AND (
    get_current_user_role() = 'admin' OR 
    get_current_user_role() = 'blogger' OR
    (get_current_user_role() = 'manager' AND (current_setting('request.method') = 'GET'))
  )
);
