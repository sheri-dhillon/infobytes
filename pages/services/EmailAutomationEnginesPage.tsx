import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../../components/Seo';

export const EmailAutomationEnginesPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Email Automation Engines | INFOBYTES"
        description="Email marketing automation engines built with Klaviyo flows, behavioral triggers, and segmentation to grow retention revenue."
        jsonLdId="infobytes-service-email-automation-engines"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Email Marketing Automation',
          provider: {
            '@type': 'Organization',
            name: 'INFOBYTES',
            url: 'https://infobytes.io',
            logo: 'https://infobytes.io/logo.png'
          },
          areaServed: 'Global',
          url: 'https://infobytes.io/services/email-automation-engines',
          description:
            'Email automation engines built with Klaviyo flows, abandoned cart recovery, behavioral triggers, and hyper-segmentation to maximize retention revenue.'
        }}
      />
      <section className="relative pt-48 pb-20 md:pt-60 md:pb-28 px-6 bg-[#050505] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up-fade leading-tight">
            Email Automation Engines
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed animate-slide-up-fade"
            style={{ animationDelay: '100ms' }}
          >
            Page coming soon.
          </p>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">We’re building this page</h2>
            <p className="text-gray-400 leading-relaxed">
              We’ll add a full breakdown of our email marketing automation approach, Klaviyo flows, and lifecycle systems here next.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
