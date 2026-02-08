-- 1. Create a secure function to check admin status without triggering recursion
-- SECURITY DEFINER means this function runs with the privileges of the creator (superuser), bypassing RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- 3. Re-create the policy using the secure function
-- This breaks the loop because the function reads the table without checking policies
CREATE POLICY "Admins can manage all profiles" 
ON profiles FOR ALL 
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

-- 4. Ensure the standard user policy is also present (Users can always update their own)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);
