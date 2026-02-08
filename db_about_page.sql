
-- Insert Default About Page Config
INSERT INTO site_settings (key, value)
VALUES (
  'about_page',
  '{
    "hero": {
      "pill": "Design studio for AI, SaaS & tech startups",
      "title_line1": "Good design",
      "title_line2": "makes life better.",
      "description": "We design delightful experiences that make life simpler and more enjoyable. Our team is a collective of creative minds obsessed with quality.",
      "cta_text": "Book 1:1 Meeting",
      "cta_link": "https://calendly.com/shehryar-infobytes/30min",
      "secondary_text": "Got an idea? Let''s shape it."
    },
    "team": [
      { "name": "Ali-Dah", "role": "Design Lead", "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "Schuith", "role": "Tech Lead", "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "Ben", "role": "Strategy", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "Ollie", "role": "Creative Dir.", "image": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop&q=80", "span": "col-span-2 row-span-2" },
      { "name": "Eightball", "role": "Developer", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "Galloc", "role": "Product", "image": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "HiskMz", "role": "Marketing", "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop&q=80", "span": "col-span-1" },
      { "name": "Launch", "role": "Operations", "image": "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?w=600&h=600&fit=crop&q=80", "span": "col-span-1" }
    ],
    "impact": {
      "label": "We''re a product design & AI studio built for real-world impact.",
      "content": "We help teams design smarter, scale faster, and deliver better digital experiences — without the fluff. Clarity, speed, and long-term value. Whether you''re building your first MVP or optimizing a complex SaaS, our work wraps around your business goals — not the other way around."
    },
    "culture_images": [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
    ],
    "stats": [
      { "id": 1, "value": "2016", "label": "Founded, 8 Years of experience", "theme": "orange", "x": -30, "y": -25, "mx": 0, "my": -32 },
      { "id": 2, "value": "150+", "label": "In product launches", "theme": "white", "x": -12, "y": -35, "mx": -5, "my": -20 },
      { "id": 3, "value": "$1.35B", "label": "Startup funding raised", "theme": "purple", "x": 5, "y": -5, "mx": 5, "my": -8 },
      { "id": 4, "value": "13K+", "label": "Active startups", "theme": "white", "x": -25, "y": 15, "mx": -5, "my": 8 },
      { "id": 5, "value": "254+", "label": "Team Members", "theme": "orange", "x": 30, "y": -15, "mx": 5, "my": 20 },
      { "id": 6, "value": "25K+", "label": "Funds and syndicates", "theme": "purple", "x": 20, "y": 25, "mx": 0, "my": 32 }
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
