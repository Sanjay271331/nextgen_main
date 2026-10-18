-- Supabase Schema for NextGen Build-a-thon CMS

-- 1. Global Content Blocks (For all headings, paragraphs, taglines)
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(255) NOT NULL,
  key VARCHAR(255) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dynamic Links & CTA Buttons
CREATE TABLE IF NOT EXISTS dynamic_buttons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) NOT NULL UNIQUE,
  label VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Domains
CREATE TABLE IF NOT EXISTS domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Event Schedule (Timeline)
CREATE TABLE IF NOT EXISTS event_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_name VARCHAR(255) NOT NULL,
  date_time VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INITIAL DATA SEEDING

INSERT INTO content_blocks (section, key, value) VALUES
('header', 'college_name', 'Vidhyavardhaka College of Engineering'),
('header', 'college_sub', 'Autonomous Institute affiliated to VTU, Belagavi • Accredited by NBA NAAC with ''A'' Grade'),
('intro', 'presents', 'THE MIND MESH PRESENTS'),
('intro', 'title_next', 'NEXT'),
('intro', 'title_gen', 'GEN'),
('intro', 'title_buildathon', 'BUILD-A-THON'),
('intro', 'title_sub', '2026 • CHAPTER 02'),
('domains', 'pre_motto', 'Every domain has its own path, but only one will rise as the Ultimate Champion.'),
('domains', 'pre_submotto', 'What awaits beyond the final checkpoint is something you''ll have to experience yourself.'),
('domains', 'post_motto_1', 'Choose your domain wisely. It defines your journey to the championship.'),
('domains', 'post_motto_2', 'Every domain will celebrate its champions, but only one will rise above them all.'),
('domains', 'post_motto_3', 'Build your idea with software, hardware, or a combination of both. It''s your choice depending on the domain you choose and the problem you aim to solve.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO dynamic_buttons (key, label, url) VALUES
('main_cta', 'REGISTER YOUR TEAM', '/register')
ON CONFLICT (key) DO NOTHING;

INSERT INTO domains (number, title, description, order_index) VALUES
('01', 'NEXTGEN | Building Tomorrow, Today', 'A space for emerging, advanced, and futuristic technologies...', 1),
('02', 'ARTIFICIAL INTELLIGENCE & INTELLIGENT SYSTEMS', 'A software-focused domain dedicated to building intelligent systems...', 2),
('03', 'IoT & EMBEDDED SYSTEMS', 'A domain where hardware, software, sensors, connectivity...', 3),
('04', 'FINTECH | Financial Technology', 'A technology-driven domain focused on transforming the way financial services...', 4),
('05', 'SUSTAINABLE INNOVATION', 'A domain focused on using innovation and technology...', 5);

INSERT INTO faqs (question, answer, order_index) VALUES
('Who can participate?', 'Any engineering student from across India can participate.', 1),
('Is the accommodation provided?', 'Yes, accommodation will be provided for all shortlisted teams.', 2);

INSERT INTO event_schedule (stage_name, date_time, is_active, order_index) VALUES
('Registration Starts', '18th September 2026', false, 1),
('Registration Closes', '18th October 2026', false, 2),
('PPT Submission Begins', '18th October 2026', true, 3),
('PPT Deadline', '20th October 2026', false, 4),
('Shortlist Announcement', '28th October 2026', false, 5),
('Payment Deadline', '30th October 2026', false, 6),
('Offline Hackathon', '26th & 27th November 2026', false, 7);

-- SECURITY POLICIES
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on content_blocks" ON content_blocks FOR SELECT USING (true);

ALTER TABLE dynamic_buttons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on dynamic_buttons" ON dynamic_buttons FOR SELECT USING (true);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on domains" ON domains FOR SELECT USING (true);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on faqs" ON faqs FOR SELECT USING (true);

ALTER TABLE event_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on event_schedule" ON event_schedule FOR SELECT USING (true);

-- Contact Messages Table
CREATE TABLE contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE
);
