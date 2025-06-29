/*
  # Create clinics table for dental voice agent

  1. New Tables
    - `clinics`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `status` (text, default 'draft')
      - `clinic_name` (text)
      - `street` (text)
      - `city` (text)
      - `state` (text)
      - `zip` (text)
      - `time_zone` (text)
      - `gcal_refresh_token` (text)
      - `gcal_id` (text)
      - `twilio_sid` (text)
      - `twilio_token` (text)
      - `wa_from` (text)
      - `docker_host` (text, default 'localhost')

  2. Security
    - Enable RLS on `clinics` table
    - Add policy for public access (for demo purposes)
    
  Note: In production, you would want to implement proper authentication
  and restrict access based on user ownership.
*/

CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'draft',
  clinic_name text,
  street text,
  city text,
  state text,
  zip text,
  time_zone text,
  gcal_refresh_token text,
  gcal_id text,
  twilio_sid text,
  twilio_token text,
  wa_from text,
  docker_host text DEFAULT 'localhost'
);

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;

-- For demo purposes, allow public access
-- In production, replace with proper user-based policies
CREATE POLICY "Allow public access for demo"
  ON clinics
  FOR ALL
  TO public
  USING (true);