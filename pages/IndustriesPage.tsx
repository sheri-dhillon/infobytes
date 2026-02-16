import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';

const INDUSTRY_LINKS = [
  { slug: 'beauty', name: 'Beauty & Personal Care', headline: 'Replenishment Engines' },
  { slug: 'fashion', name: 'Fashion & Apparel', headline: 'Dynamic Style Profiling' },
  { slug: 'health', name: 'Health & Wellness', headline: 'Subscriber Save Flows' },
  { slug: 'food-bev', name: 'Food & Beverage', headline: 'Flavor Drop Sequences' },
  { slug: 'pet-care', name: 'Pet Care', headline: 'Life-Stage Marketing' },
  { slug: 'subscription', name: 'Subscription Boxes', headline: 'Churn Defense Systems' },
  { slug: 'baby-parenting', name: 'Baby & Parenting', headline: 'Milestone Automation' },
  { slug: 'home-lifestyle', name: 'Home & Lifestyle', headline: 'High-Ticket Nurturing' },
  { slug: 'jewelry', name: 'Jewelry & Luxury', headline: 'VIP Gifting Cycles' },
  { slug: 'sports-fitness', name: 'Sports & Fitness', headline: 'Gear Cross-Selling' },
];

export const IndustriesPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Industry Retention Marketing | D2C Email & SMS Experts | INFOBYTES"
        description="Explore INFOBYTES industry-specific retention strategies for Beauty, Fashion, Health, Subscription Boxes, and more D2C sectors."
        jsonLdId="infobytes-industries-hub"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'INFOBYTES Industry Focus',
          url: 'https://infobytes.io/industries',
          description:
            'Industry-specific D2C email and SMS retention marketing strategies across 10 high-growth sectors.',
        }}
      />

      <section className="bg-black pt-44 pb-20 md:pt-56 md:pb-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
            Industry Focus
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">Built for high-growth D2C sectors.</h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Explore our industry landing pages built around high-intent retention keywords and strategies tailored to each market’s customer behavior.
          </p>
        </div>
      </section>

      <section className="bg-black py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRY_LINKS.map((item) => (
            <Link
              key={item.slug}
              to={`/industries/${item.slug}`}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-7 hover:border-white/20 hover:bg-[#111] transition-all duration-300 group"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-orange mb-3">{item.name}</p>
              <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">{item.headline}</h2>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-brand-orange transition-colors">
                View landing page
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
