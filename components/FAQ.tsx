
import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export type FaqJsonLd = {
  '@context': 'https://schema.org' | 'https://schema.org/';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
};

export type FaqItem = {
  q: string;
  a: React.ReactNode;
  aText: string;
};

export const FAQ_CONTENT: {
  title: string;
  subtitle: string;
  iconStyle: 'plus_minus' | 'chevron' | 'arrow';
  items: FaqItem[];
} = {
  title: 'Everything you need to know about scaling retention.',
  subtitle:
    'Clear answers for brands ready to transition from basic newsletters to high-performance revenue engines.',
  iconStyle: 'plus_minus',
  items: [
    {
      q: 'What is the role of a retention marketing agency compared to a growth agency?',
      aText:
        'While growth agencies focus on top-of-funnel acquisition (Ads/SEO), a retention marketing agency like INFOBYTES focuses on maximizing the value of the customers you already have. We specialize in email marketing automation and SMS strategies that increase Customer Lifetime Value (CLV) and reduce your dependency on expensive ad spend.',
      a: (
        <>
          While growth agencies focus on top-of-funnel acquisition (Ads/SEO), a retention marketing agency like
          INFOBYTES focuses on maximizing the value of the customers you already have. We specialize in{' '}
          <Link
            to="/services/email-automation-engines"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            email marketing automation
          </Link>{' '}
          and{' '}
          <Link
            to="/services/sms-mobile-messaging"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            SMS strategies
          </Link>{' '}
          that increase Customer Lifetime Value (CLV) and reduce your dependency on expensive ad spend.
        </>
      )
    },
    {
      q: 'Why do you specialize specifically in Klaviyo and Omnisend?',
      aText:
        "We believe in mastery over mediocrity. As a certified Klaviyo expert and Omnisend partner team, we have deep technical knowledge of these platforms' unique data science capabilities. This allows us to build more complex segments and higher-converting flows than generalist agencies that try to support every platform.",
      a: (
        <>
          We believe in mastery over mediocrity. As a certified{' '}
          <Link
            to="/services/platform-migration-audit"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            Klaviyo expert
          </Link>{' '}
          and{' '}
          <Link
            to="/services/platform-migration-audit"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            Omnisend partner
          </Link>{' '}
          team, we have deep technical knowledge of these platforms' unique data science capabilities. This allows
          us to build more complex segments and higher-converting flows than generalist agencies that try to
          support every platform.
        </>
      )
    },
    {
      q: 'How much revenue should my eCommerce store generate from email and SMS?',
      aText:
        'For a healthy, scaling brand, email and SMS marketing should account for 30% to 45% of total store revenue. If your current retention channels are contributing less than 20%, you are likely leaving significant revenue on the table due to unoptimized flows or poor list hygiene.',
      a: (
        <>
          For a healthy, scaling brand, email and SMS marketing should account for 30% to 45% of total store
          revenue. If your current retention channels are contributing less than 20%, you are likely leaving
          significant revenue on the table due to unoptimized flows or poor list hygiene.
        </>
      )
    },
    {
      q: 'Does INFOBYTES handle both strategy and implementation?',
      aText:
        'Yes. We are a full-service partner. Our team handles everything from high-level lifecycle strategy and journey mapping to the technical build-out of flows, custom template design, and ongoing A/B testing. We provide the expertise so your team can focus on product and operations.',
      a: (
        <>
          Yes. We are a full-service partner. Our team handles everything from high-level{' '}
          <Link
            to="/services/lifecycle-strategy-cro"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            lifecycle strategy
          </Link>{' '}
          and{' '}
          <Link
            to="/services/lifecycle-strategy-cro"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            journey mapping
          </Link>{' '}
          to the technical build-out of flows, custom template design, and ongoing A/B testing. We provide the
          expertise so your team can focus on product and operations.
        </>
      )
    },
    {
      q: 'How long does it take to see a measurable ROI from your services?',
      aText:
        'Most clients see an immediate lift in engagement within the first 30 days. However, a full retention engine—including advanced behavioral triggers and fully optimized SMS synchronization—typically reaches peak performance within 60 to 90 days as we gather enough data to refine our A/B tests.',
      a: (
        <>
          Most clients see an immediate lift in engagement within the first 30 days. However, a full retention
          engine—including advanced behavioral triggers and fully optimized{' '}
          <Link
            to="/services/sms-mobile-messaging"
            className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60 transition-colors"
          >
            SMS synchronization
          </Link>{' '}
          —typically reaches peak performance within 60 to 90 days as we gather enough data to refine our A/B
          tests.
        </>
      )
    }
  ]
};

export function buildFaqPageJsonLd(): FaqJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CONTENT.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.aText
      }
    }))
  };
}

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Icon Resolver
  const getIcons = (isOpen: boolean) => {
      switch(FAQ_CONTENT.iconStyle) {
          case 'chevron':
              return isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />;
          case 'arrow':
              return isOpen ? <ArrowDown className="w-5 h-5 text-brand-orange" /> : <ArrowRight className="w-5 h-5" />;
          case 'plus_minus':
          default:
              return isOpen ? <Minus className="w-5 h-5 text-brand-orange" /> : <Plus className="w-5 h-5" />;
      }
  };

  return (
    <section className="py-24 md:py-32 bg-black relative" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-brand-text uppercase mb-6 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 inline-block backdrop-blur-sm">
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            {FAQ_CONTENT.title}
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            {FAQ_CONTENT.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-5 flex flex-col">
             {FAQ_CONTENT.items.map((item, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <button 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`w-full flex items-center justify-between py-6 group text-left transition-all duration-300 relative border-b border-white/5 hover:border-white/20`}
                 >
                   <span className={`text-lg md:text-xl pr-8 transition-colors duration-300 font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                     {item.q}
                   </span>
                   
                   {/* Neon underline effect for active state */}
                   {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-orange shadow-[0_0_15px_rgba(255,107,74,0.8)] animate-fade-in"></span>
                   )}

                   <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-0' : 'text-gray-600'}`}>
                     {getIcons(isActive)}
                   </div>
                 </button>
               );
             })}
          </div>

          {/* Right Column: Answer Box */}
          <div className="lg:col-span-7 sticky top-32">
             <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2rem] relative overflow-hidden min-h-[450px] flex flex-col justify-between group">
                
                {/* Large Background Number */}
                <div className="absolute -top-6 right-6 text-[12rem] font-bold text-white opacity-[0.03] pointer-events-none select-none font-sans leading-none">
                  {`0${activeIndex + 1}`}
                </div>
                
                {/* Decorative Mesh */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/5 to-transparent pointer-events-none"></div>

                {FAQ_CONTENT.items[activeIndex] && (
                    <div className="relative z-10 animate-fade-in key={activeIndex}">
                    <h3 className="text-2xl font-bold text-white mb-6 leading-tight tracking-wide">{FAQ_CONTENT.items[activeIndex].q}</h3>
                        <div className="h-px w-12 bg-brand-orange mb-8"></div>
                        <p className="text-lg text-gray-300 leading-relaxed font-light tracking-wide">
                      {FAQ_CONTENT.items[activeIndex].a}
                        </p>
                    </div>
                )}

             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
