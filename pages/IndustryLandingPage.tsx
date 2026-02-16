import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { HeroHeading } from '../components/ui/HeroHeading';

type IndustryPageData = {
  slug: string;
  industry: string;
  headline: string;
  strategy: string;
  cta: string;
  metaTitle: string;
  metaDescription: string;
};

const INDUSTRY_PAGES: Record<string, IndustryPageData> = {
  beauty: {
    slug: 'beauty',
    industry: 'Beauty & Personal Care',
    headline: 'Replenishment Engines',
    strategy:
      'We predict usage cycles to trigger automated re-order reminders. Focus: Beauty eCommerce Retention, skincare retention, and Klaviyo health checks.',
    cta: 'Get Your Beauty Brand Audit',
    metaTitle: 'Beauty Email Marketing Agency | Klaviyo Experts | INFOBYTES',
    metaDescription:
      'Scale your beauty brand with automated replenishment flows and replenishment engines. Increase repeat purchases with INFOBYTES’ retention experts.',
  },
  fashion: {
    slug: 'fashion',
    industry: 'Fashion & Apparel',
    headline: 'Dynamic Style Profiling',
    strategy:
      'Personalizing the journey based on size, fit, and seasonal trends. Focus: Fashion Marketing Agency, back-in-stock alerts, and SMS marketing.',
    cta: 'Get Your Fashion Retention Audit',
    metaTitle: 'Fashion eCommerce Retention & SMS Agency | INFOBYTES',
    metaDescription:
      'Turn seasonal shoppers into loyal fans. We build high-conversion back-in-stock and style-preference flows for apparel brands. Book your free revenue audit.',
  },
  health: {
    slug: 'health',
    industry: 'Health & Wellness',
    headline: 'Subscriber Save Flows',
    strategy:
      'Educational nurturing and subscription-recovery flows to stop churn. Focus: Health & Wellness SMS Strategy, supplement marketing, and LTV growth.',
    cta: 'Get Your Wellness Retention Audit',
    metaTitle: 'Health & Wellness Retention Marketing | Stop Churn | INFOBYTES',
    metaDescription:
      'Reduce churn for your supplement or wellness brand. Specialized Klaviyo strategies for subscription-based growth and subscriber save flows. Scale today.',
  },
  'food-bev': {
    slug: 'food-bev',
    industry: 'Food & Beverage',
    headline: 'Flavor Drop Sequences',
    strategy:
      'High-velocity SMS alerts for new arrivals and limited-edition drops. Focus: CPG automation and mobile-first strategy.',
    cta: 'Get Your Food & Beverage Audit',
    metaTitle: 'CPG & Food Email Marketing Agency | SMS Strategy | INFOBYTES',
    metaDescription:
      'Drive high-velocity sales with flavor-drop sequences and SMS alerts. Specialized retention and lifecycle automation for food and beverage brands.',
  },
  'pet-care': {
    slug: 'pet-care',
    industry: 'Pet Care',
    headline: 'Life-Stage Marketing',
    strategy:
      'Flows that grow with the pet, from puppy training to senior wellness. Focus: Pet brand retention and automated nurturing.',
    cta: 'Get Your Pet Brand Audit',
    metaTitle: 'Pet Brand Retention Marketing | Klaviyo Specialists | INFOBYTES',
    metaDescription:
      "Life-stage marketing for pet brands. From puppy flows to senior care reminders, we automate your pet store's revenue. See how we scale pet D2C brands.",
  },
  subscription: {
    slug: 'subscription',
    industry: 'Subscription Boxes',
    headline: 'Churn Defense Systems',
    strategy:
      'Aggressive win-back campaigns and “Manage Your Subscription” education. Focus: Subscription Box Marketing, recurring revenue, and lifecycle strategy.',
    cta: 'Get Your Subscription Box Audit',
    metaTitle: 'Subscription Box Retention Agency | Stop Churn | INFOBYTES',
    metaDescription:
      'Stop losing subscribers. We build aggressive win-back and retention flows for subscription boxes. Maximize your recurring revenue with INFOBYTES.',
  },
  'baby-parenting': {
    slug: 'baby-parenting',
    industry: 'Baby & Parenting',
    headline: 'Milestone Automation',
    strategy:
      'Targeted messaging that shifts as the child reaches new development stages. Focus: Parenting niche email marketing.',
    cta: 'Get Your Parenting Brand Audit',
    metaTitle: 'Baby & Parenting Email Marketing | Lifecycle Experts | INFOBYTES',
    metaDescription:
      'Reach parents at every milestone. Specialized lifecycle automation for baby brands. Turn one-time gift buyers into lifetime customers with INFOBYTES.',
  },
  'home-lifestyle': {
    slug: 'home-lifestyle',
    industry: 'Home & Lifestyle',
    headline: 'High-Ticket Nurturing',
    strategy:
      'Long-term sequences designed to turn one-time buyers into brand advocates. Focus: Luxury home decor and post-purchase care.',
    cta: 'Get Your Home & Lifestyle Audit',
    metaTitle: 'Home & Lifestyle Retention Strategy | LTV Growth | INFOBYTES',
    metaDescription:
      'High-ticket retention for home and lifestyle brands. Post-purchase care and long-term nurturing that drives repeat sales. Book your free revenue audit.',
  },
  jewelry: {
    slug: 'jewelry',
    industry: 'Jewelry & Luxury',
    headline: 'VIP Gifting Cycles',
    strategy:
      'High-touch storytelling and automated reminders for holidays and anniversaries. Focus: Jewelry brand email design.',
    cta: 'Get Your Jewelry Brand Audit',
    metaTitle: 'Luxury Jewelry Email Marketing | VIP Retention | INFOBYTES',
    metaDescription:
      'High-end email design and VIP storytelling for jewelry brands. Automated gifting reminders for anniversaries and holidays. Scale your luxury brand.',
  },
  'sports-fitness': {
    slug: 'sports-fitness',
    industry: 'Sports & Fitness',
    headline: 'Gear Cross-Selling',
    strategy:
      'Automated accessory recommendations based on previous equipment purchases. Focus: D2C Email Marketing, fitness gear marketing, and A/B testing.',
    cta: 'Get Your Fitness Brand Audit',
    metaTitle: 'Sports & Fitness Gear Marketing | Klaviyo Experts | INFOBYTES',
    metaDescription:
      'Cross-sell gear and equipment with data-driven automation. Specialized retention marketing for fitness and sports brands. Increase your AOV today.',
  },
};

export const IndustryLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? INDUSTRY_PAGES[slug] : null;

  if (!page) return <Navigate to="/services" replace />;

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        jsonLdId={`infobytes-industry-${page.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: `${page.industry} D2C Retention Marketing`,
          provider: {
            '@type': 'Organization',
            name: 'INFOBYTES',
            url: 'https://infobytes.io',
            logo: 'https://infobytes.io/logo.png',
          },
          areaServed: 'Global',
          url: `https://infobytes.io/industries/${page.slug}`,
          description: page.metaDescription,
        }}
      />

      <section className="relative pt-44 pb-16 md:pt-56 md:pb-24 px-6 bg-[#050505] overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
            Industry Landing Page
          </div>

          <HeroHeading pre={<>Industry Focus</>} main={<>{page.industry}</>} className="mb-6" preClassName="text-[clamp(1.6rem,3vw,3.2rem)]" mainClassName="text-[clamp(2.4rem,5vw,5.2rem)]" />

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            {page.metaDescription}
          </p>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <article className="lg:col-span-2 bg-[#0a0a0a] rounded-3xl border border-white/10 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">{page.headline}</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">{page.strategy}</p>

            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Execution model</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              We combine lifecycle mapping, conversion-focused creative, and retention automation to build compounding growth systems for {page.industry.toLowerCase()} brands.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Stack coverage includes Klaviyo and Omnisend setup, segmentation architecture, flow strategy, campaign operations, and test-driven optimization.
            </p>
          </article>

          <aside className="bg-[#0a0a0a] rounded-3xl border border-white/10 p-8 md:p-10 h-fit">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to scale?</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Let’s map your retention opportunities and turn your existing traffic into durable revenue.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 px-7 py-3 text-sm font-semibold transition-all duration-200"
            >
              {page.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
};
