
-- Insert Default FAQ Config
INSERT INTO site_settings (key, value)
VALUES (
  'faq_section',
  '{
    "title": "Common questions",
    "subtitle": "Removing the friction between your vision and execution.",
    "icon_style": "plus_minus",
    "items": [
      {
        "id": "1",
        "q": "How do you bridge the gap between UI/UX and actual revenue?",
        "a": "We believe beauty must perform. Our UI/UX process uses behavioral data to map user journeys that lead directly to conversions. When paired with our email automation, we create a closed-loop system that captures, converts, and retains customers.",
        "cta": "View Our Case Studies",
        "link": "/work"
      },
      {
        "id": "2",
        "q": "Do you build native iOS apps or cross-platform solutions?",
        "a": "We specialize in high-performance Native iOS development using Swift and SwiftUI. This ensures your app has the fastest possible response times, seamless integration with Apple’s ecosystem, and a premium \"Apple-level\" feel for your users.",
        "cta": "See Our App Portfolio",
        "link": "/work"
      },
      {
        "id": "3",
        "q": "Can you integrate email marketing into my existing eCommerce store?",
        "a": "Absolutely. We specialize in turning \"stale\" stores into profit engines. We audit your current tech stack (Shopify, Magento, etc.) and deploy sophisticated lifecycle automations—like abandoned cart recovery and post-purchase flows—that drive immediate ROI.",
        "cta": "Book a Revenue Audit",
        "link": "/contact"
      },
      {
        "id": "4",
        "q": "What is the typical timeline for a full Design-to-Launch project?",
        "a": "A custom high-end project typically spans 8 to 12 weeks. This includes deep-dive strategy, UI/UX prototyping, full-stack development, and rigorous QA. We work in agile \"sprints\" so you see tangible progress every two weeks.",
        "cta": "Request a Timeline",
        "link": "/contact"
      },
      {
        "id": "5",
        "q": "Are your designs \"dev-ready\" if I have my own internal team?",
        "a": "Yes. We provide a complete Design System, including component libraries, documentation, and high-fidelity prototypes. Our designs are architected with engineering in mind, ensuring a seamless handover to your developers.",
        "cta": "View Design Systems",
        "link": "/services"
      },
      {
        "id": "6",
        "q": "Do you provide long-term support after the \"Scale\" phase?",
        "a": "We aren''t just a vendor; we’re a partner. After launch, we offer optimization packages that include A/B testing for your email flows, monthly UI/UX refinements, and technical scaling to ensure your product grows with your user base.",
        "cta": "Explore Support Plans",
        "link": "/services"
      }
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
