
-- Insert Default Pricing Config
INSERT INTO site_settings (key, value)
VALUES (
  'pricing_plans',
  '[
    {
      "id": "1",
      "name": "The Launchpad",
      "tagline": "Design Focus",
      "description": "Best for early-stage brands needing a world-class foundation.",
      "price": "5,000",
      "frequency": "month",
      "isCustom": false,
      "features": [
        "Premium UI/UX Strategy & Wireframing",
        "High-Performance Custom Website (Up to 5 Pages)",
        "Foundational SEO & Speed Optimization",
        "Brand Style Guide & Component Library",
        "2 Rounds of High-Fidelity Revisions"
      ],
      "highlight": false
    },
    {
      "id": "2",
      "name": "The Accelerator",
      "tagline": "Development & Email Focus",
      "description": "Our most popular plan for scaling eCommerce and Mobile products.",
      "price": "12,500",
      "frequency": "month",
      "isCustom": false,
      "features": [
        "iOS App Development (Native Swift/SwiftUI)",
        "Advanced eCommerce Optimization",
        "Revenue-Generating Email Marketing",
        "Comprehensive Lead Capture Systems",
        "Priority Engineering Support & Weekly Sprints"
      ],
      "highlight": true
    },
    {
      "id": "3",
      "name": "The Enterprise",
      "tagline": "Scale Focus",
      "description": "A full-cycle partnership for global market dominance.",
      "price": "",
      "frequency": "month",
      "isCustom": true,
      "features": [
        "Full-Funnel Email Marketing & Retention",
        "Cross-Platform Development (iOS + Web + Backend)",
        "Dedicated Project Manager & Senior Architect",
        "Quarterly Brand Workshops & Competitor Audits",
        "Continuous A/B Testing & Lifecycle Optimization"
      ],
      "highlight": false
    }
  ]'
) ON CONFLICT (key) DO NOTHING;
