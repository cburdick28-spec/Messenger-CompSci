-- ===== BREWSTER APP — SUPABASE SCHEMA =====
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hnjziardboghvhyhyhcx/sql/new

-- =============================================
-- STEP 1: Run this block first (tables + seed)
-- =============================================

CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Ensure legacy messages tables gain the content + category columns used by the app.
ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS content text;

ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS category text;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'messages'
       AND column_name = 'message'
  ) THEN
    UPDATE messages
       SET content = COALESCE(content, message)
     WHERE content IS NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id text NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS problem_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text,
  description text NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS house_points (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name text UNIQUE NOT NULL,
  points integer DEFAULT 0,
  bar_color text,
  chart_color text,
  icon text,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO house_points (house_name, points, bar_color, chart_color, icon) VALUES
  ('Red',   342, '#FF6B6B', '#CC0000', '🔴'),
  ('Blue',  315, '#88AAFF', '#1A4FCC', '🔵'),
  ('White', 289, '#FFFFFF', '#9CA3AF', '⚪'),
  ('Black', 271, '#AAAAAA', '#374151', '⚫')
ON CONFLICT (house_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS broadcasts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'emergency')),
  created_at timestamptz DEFAULT now()
);

-- USERS TABLE (required for teacher approval flow)
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approval_token text DEFAULT gen_random_uuid()::text,
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

-- =============================================
-- STEP 2: Enable Row Level Security
-- =============================================

ALTER TABLE users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages          ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_reports   ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_points      ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts        ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 3: Create RLS policies
-- =============================================

DO $$ BEGIN
  CREATE POLICY "Public insert users" ON users FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read users" ON users FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public update users" ON users FOR UPDATE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert surveys" ON survey_responses FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read surveys" ON survey_responses FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert reports" ON problem_reports FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert broadcasts" ON broadcasts FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read house points" ON house_points FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read broadcasts" ON broadcasts FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
