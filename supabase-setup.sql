-- ============================================================
--  V.O.N.N.I.E. — Supabase Setup
--  Run this entire file in your Supabase SQL Editor once.
--  Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- Facilities: one row per hospital, school, SNF, or home setup
CREATE TABLE IF NOT EXISTS facilities (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  facility_type TEXT        DEFAULT 'general',  -- hospital | rehab | school | snf | home | general
  facility_code TEXT        UNIQUE NOT NULL,
  admin_email   TEXT        DEFAULT '',
  admin_pin     TEXT        NOT NULL,            -- 6-digit PIN (stored as text)
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Button sets: named configurations of buttons owned by a facility
CREATE TABLE IF NOT EXISTS button_sets (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id  UUID        REFERENCES facilities(id) ON DELETE CASCADE,
  name         TEXT        NOT NULL,
  description  TEXT        DEFAULT '',
  buttons      JSONB       NOT NULL DEFAULT '[]',
  is_active    BOOLEAN     DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Devices: tablets/phones registered to a facility
CREATE TABLE IF NOT EXISTS devices (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id     UUID        REFERENCES facilities(id) ON DELETE CASCADE,
  device_label    TEXT        DEFAULT 'Tablet',
  last_seen       TIMESTAMPTZ DEFAULT NOW(),
  assigned_set_id UUID        REFERENCES button_sets(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE facilities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE button_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices     ENABLE ROW LEVEL SECURITY;

-- Allow full access via the anon key (access is controlled at app level by facility_code + PIN)
-- DROP first so re-running never collides (PostgreSQL has no CREATE POLICY IF NOT EXISTS)
DROP POLICY IF EXISTS "anon_all_facilities"  ON facilities;
CREATE POLICY "anon_all_facilities"  ON facilities  FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_button_sets" ON button_sets;
CREATE POLICY "anon_all_button_sets" ON button_sets FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_devices"     ON devices;
CREATE POLICY "anon_all_devices"     ON devices     FOR ALL TO anon USING (true) WITH CHECK (true);

-- ── Trigger: auto-update updated_at on button_sets ──────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- DROP first so re-running the script never collides
DROP TRIGGER IF EXISTS button_sets_updated_at ON button_sets;
CREATE TRIGGER button_sets_updated_at
  BEFORE UPDATE ON button_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
--  DONE. Your Supabase database is ready for V.O.N.N.I.E.
-- ============================================================
