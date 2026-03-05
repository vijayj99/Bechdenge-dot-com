-- ============================================
-- Supabase Database Setup Script
-- ============================================
-- 
-- This script creates the necessary tables and storage buckets
-- for the Bechdenge.com team management system
--
-- How to run:
-- 1. Go to your Supabase Dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Copy and paste this entire script
-- 5. Click "Run" button
-- ============================================

-- ============================================
-- 1. CREATE TEAM_MEMBERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE team_members IS 'Stores team member information for Bechdenge.com';

-- Add comments to columns
COMMENT ON COLUMN team_members.id IS 'Unique identifier for team member';
COMMENT ON COLUMN team_members.name IS 'Full name of the team member';
COMMENT ON COLUMN team_members.role IS 'Job title or role of the team member';
COMMENT ON COLUMN team_members.bio IS 'Short biography or description';
COMMENT ON COLUMN team_members.image_url IS 'URL to team member profile image in Supabase Storage';
COMMENT ON COLUMN team_members.created_at IS 'Timestamp when record was created';
COMMENT ON COLUMN team_members.updated_at IS 'Timestamp when record was last updated';

-- ============================================
-- 2. CREATE UPDATE TRIGGER FOR updated_at
-- ============================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (anyone can view team members)
CREATE POLICY "Allow public read access"
    ON team_members
    FOR SELECT
    USING (true);

-- Policy: Allow insert/update/delete for authenticated users only
-- You can modify this later to be more restrictive
CREATE POLICY "Allow authenticated insert"
    ON team_members
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
    ON team_members
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
    ON team_members
    FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- 4. INSERT SAMPLE DATA (OPTIONAL)
-- ============================================

-- Insert a sample team member
-- You can delete this after testing or add your actual team members here
INSERT INTO team_members (name, role, bio, image_url)
VALUES (
    'Vijay Savani',
    'Founder & Ecommerce Specialist',
    'Amazon Trained Ecommerce Specialist with expertise in Google & Meta Ads. Driving sales and optimizing ROAS is my forte.',
    'https://via.placeholder.com/400x400'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

-- If you see this message, the script ran successfully!
DO $$
BEGIN
    RAISE NOTICE '✅ Database setup complete!';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Go to Storage in Supabase Dashboard';
    RAISE NOTICE '2. Create a new bucket called "team-images"';
    RAISE NOTICE '3. Make it PUBLIC';
    RAISE NOTICE '4. Set max file size to 5MB';
    RAISE NOTICE '';
    RAISE NOTICE 'Table created: team_members';
    RAISE NOTICE 'Policies enabled: RLS with public read, authenticated write';
END $$;
