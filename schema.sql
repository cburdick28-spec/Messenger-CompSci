-- ===== BREWSTER APP — SUPABASE SCHEMA =====
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hnjziardboghvhyhyhcx/sql

-- Anonymous messages to Ms. Ellie
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Survey responses
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id text NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Problem reports
CREATE TABLE IF NOT EXISTS problem_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text,
  description text NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

-- House points
CREATE TABLE IF NOT EXISTS house_points (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name text UNIQUE NOT NULL,
  points integer DEFAULT 0,
  bar_color text,
  chart_color text,
  icon text,
  updated_at timestamptz DEFAULT now()
);

-- Seed house points (safe — skips if already exists)
INSERT INTO house_points (house_name, points, bar_color, chart_color, icon) VALUES
  ('Red',   342, '#FF6B6B', '#CC0000', '🔴'),
  ('Blue',  315, '#88AAFF', '#1A4FCC', '🔵'),
  ('White', 289, '#FFFFFF', '#9CA3AF', '⚪'),
  ('Black', 271, '#AAAAAA', '#374151', '⚫')
ON CONFLICT (house_name) DO NOTHING;

-- Staff broadcasts
CREATE TABLE IF NOT EXISTS broadcasts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'emergency')),
  created_at timestamptz DEFAULT now()
);

-- ===== ROW LEVEL SECURITY =====

ALTER TABLE messages        ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_points     ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts       ENABLE ROW LEVEL SECURITY;

-- Students can submit (insert) anonymously
CREATE POLICY IF NOT EXISTS "Public insert messages"         ON messages        FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Public insert surveys"          ON survey_responses FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Public insert reports"          ON problem_reports  FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Public insert broadcasts"       ON broadcasts       FOR INSERT WITH CHECK (true);

-- Anyone can read house standings and broadcasts
CREATE POLICY IF NOT EXISTS "Public read house points"       ON house_points FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public read broadcasts"         ON broadcasts   FOR SELECT USING (true);
