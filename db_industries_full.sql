
-- Insert Full Industries Config
INSERT INTO site_settings (key, value)
VALUES (
  'industries_section',
  '{
    "title": "Industries",
    "description": "We work across high-impact industries, combining deep domain knowledge with cutting-edge design and AI.",
    "items": [
      {
        "id": "1",
        "title": "AI & Machine Learning",
        "description": "Designing intuitive interfaces for complex AI systems and NLP products. We bridge human-centered design with technical depth.",
        "icon_name": "Cpu",
        "theme": "purple"
      },
      {
        "id": "2",
        "title": "FinTech",
        "description": "Our team builds clear, compliant, and conversion-optimized financial experiences—designed to build trust and perform at scale.",
        "icon_name": "CreditCard",
        "theme": "yellow"
      },
      {
        "id": "3",
        "title": "EdTech",
        "description": "Designing education products for engagement and clarity. We create UX that empowers learning across mobile and LMS platforms.",
        "icon_name": "GraduationCap",
        "theme": "green"
      },
      {
        "id": "4",
        "title": "Healthcare",
        "description": "Building patient-friendly, compliant, and trustworthy digital experiences. From medtech SaaS to wellness apps.",
        "icon_name": "Heart",
        "theme": "red"
      },
      {
        "id": "5",
        "title": "Web3 & Blockchain",
        "description": "We design products for decentralized platforms and NFT ecosystems. Focusing on clarity to help Web3 startups launch with confidence.",
        "icon_name": "Layers",
        "theme": "blue"
      },
      {
        "id": "6",
        "title": "E-commerce",
        "description": "From DTC brands to enterprise platforms, we create seamless shopping experiences that support product discovery and retention.",
        "icon_name": "ShoppingBag",
        "theme": "orange"
      },
      {
        "id": "7",
        "title": "Real Estate",
        "description": "Designing digital platforms that bring property and people together. Intuitive search and listings for modern real estate.",
        "icon_name": "Building2",
        "theme": "indigo"
      }
    ]
  }'
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
