SET search_path TO proj_0d1347f8;

-- Create families table
CREATE TABLE IF NOT EXISTS families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  invite_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex')
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',
  color TEXT DEFAULT '#4E91F0',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Create calendar_events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_all_day BOOLEAN DEFAULT false,
  color TEXT,
  recurrence_rule TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create event_assignees join table
CREATE TABLE IF NOT EXISTS event_assignees (
  event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, user_id)
);

-- Create shopping_lists table
CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create shopping_items table
CREATE TABLE IF NOT EXISTS shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_checked BOOLEAN DEFAULT false,
  added_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Permissive for Authenticated Users within their Family Scope - Conceptual)
-- For the init step, we ensure tables exist. Detailed RLS logic regarding family_id matching is application logic or deeper SQL policies.
-- We will add a basic policy for profiles to allow self-management.

CREATE POLICY "Users can manage their own profile" ON profiles
  USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow authenticated users to view families they belong to (via profile)
-- Note: This requires a join or subquery which we will add later if needed. 
-- For now, we allow authenticated users to create families.
CREATE POLICY "Authenticated users can create families" ON families
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
