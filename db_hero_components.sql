
-- Insert Default Hero Config
INSERT INTO site_settings (key, value)
VALUES (
  'hero',
  '{
    "pills": ["Marketing", "UI/UX Design", "Strategy", "Development"],
    "headline_part1": "Design. Develop.",
    "headline_part2": "& SCALE.",
    "cta_text": "Let''s Talk",
    "cta_link": "/contact"
  }'
) ON CONFLICT (key) DO NOTHING;
