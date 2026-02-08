
-- Insert Default Industries Config
INSERT INTO site_settings (key, value)
VALUES (
  'industries_section',
  '{
    "title": "Industries",
    "description": "We work across high-impact industries, combining deep domain knowledge with cutting-edge design and AI.",
    "items": [
      {
        "id": "1",
        "title": "AI & Machine",
        "description": "Designing intuitive interfaces for complex AI systems, and NLP products. We bridge human-centered design with technical depth to deliver real-world results.",
        "icon_name": "Box",
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
        "description": "Designing education products for engagement and clarity—across mobile, desktop, and LMS platforms. We create UX that empowers learning, not distracts from it.",
        "icon_name": "GraduationCap",
        "theme": "green"
      },
      {
        "id": "4",
        "title": "Healthcare",
        "description": "Building patient-friendly, compliant, and trustworthy digital experiences. From medtech SaaS to wellness apps, we blend usability with accessibility.",
        "icon_name": "Heart",
        "theme": "teal"
      },
      {
        "id": "5",
        "title": "Web3 & Blockchain",
        "description": "We design products for decentralized platforms, NFT ecosystems, and token-based systems. With a focus on clarity and community, we help Web3 startups launch with confidence.",
        "icon_name": "Layers",
        "theme": "blue"
      },
      {
        "id": "6",
        "title": "E-commerce",
        "description": "From DTC brands to enterprise platforms, we create seamless shopping experiences. Our work supports product discovery, sales, retention, and end-to-end user journeys.",
        "icon_name": "ShoppingBag",
        "theme": "orange"
      },
      {
        "id": "7",
        "title": "Real Estate",
        "description": "Designing digital platforms that bring property and people together. We craft intuitive property search, listings, and CMS-powered backends for real estate success.",
        "icon_name": "Building2",
        "theme": "indigo"
      }
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
