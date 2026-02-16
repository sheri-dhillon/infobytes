
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Shirt, HeartPulse, UtensilsCrossed, PawPrint, Package, Baby, Home, Gem, Dumbbell } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Sparkles, Shirt, HeartPulse, UtensilsCrossed, PawPrint, Package, Baby, Home, Gem, Dumbbell
};

const THEME_STYLES: Record<string, { icon: string, bg: string, border: string }> = {
    purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    yellow: { icon: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    green:  { icon: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
    teal:   { icon: 'text-teal-400',   bg: 'bg-teal-500/10',   border: 'border-teal-500/20' },
    blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
    orange: { icon: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    indigo: { icon: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    pink:   { icon: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20' },
    red:    { icon: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
};

const STATIC_INDUSTRIES = {
  title: 'Built for high-growth D2C sectors.',
  description:
    'We specialize in industries where customer loyalty is the primary driver of scale. Our strategies are tailored to the unique buying behaviors of the world’s most demanding consumers.',
  items: [
    {
      id: '01',
      slug: 'beauty',
      industry: 'Beauty & Personal Care',
      headline: 'Replenishment Engines',
      strategy:
        'We predict usage cycles to trigger automated re-order reminders. Focus: Beauty eCommerce Retention, skincare retention, and Klaviyo health checks.',
      icon_name: 'Sparkles',
      theme: 'pink',
      cta: 'Get Your Beauty Brand Audit',
    },
    {
      id: '02',
      slug: 'fashion',
      industry: 'Fashion & Apparel',
      headline: 'Dynamic Style Profiling',
      strategy:
        'Personalizing the journey based on size, fit, and seasonal trends. Focus: Fashion Marketing Agency, back-in-stock alerts, and SMS marketing.',
      icon_name: 'Shirt',
      theme: 'yellow',
      cta: 'Get Your Fashion Retention Audit',
    },
    {
      id: '03',
      slug: 'health',
      industry: 'Health & Wellness',
      headline: 'Subscriber Save Flows',
      strategy:
        'Educational nurturing and subscription-recovery flows to stop churn. Focus: Health & Wellness SMS Strategy, supplement marketing, and LTV growth.',
      icon_name: 'HeartPulse',
      theme: 'green',
      cta: 'Get Your Wellness Retention Audit',
    },
    {
      id: '04',
      slug: 'food-bev',
      industry: 'Food & Beverage',
      headline: 'Flavor Drop Sequences',
      strategy:
        'High-velocity SMS alerts for new arrivals and limited-edition drops. Focus: CPG automation and mobile-first strategy.',
      icon_name: 'UtensilsCrossed',
      theme: 'orange',
      cta: 'Get Your Food & Beverage Audit',
    },
    {
      id: '05',
      slug: 'pet-care',
      industry: 'Pet Care',
      headline: 'Life-Stage Marketing',
      strategy:
        'Flows that grow with the pet, from puppy training to senior wellness. Focus: Pet brand retention and automated nurturing.',
      icon_name: 'PawPrint',
      theme: 'purple',
      cta: 'Get Your Pet Brand Audit',
    },
    {
      id: '06',
      slug: 'subscription',
      industry: 'Subscription Boxes',
      headline: 'Churn Defense Systems',
      strategy:
        'Aggressive win-back campaigns and “Manage Your Subscription” education. Focus: Subscription Box Marketing, recurring revenue, and lifecycle strategy.',
      icon_name: 'Package',
      theme: 'indigo',
      cta: 'Get Your Subscription Box Audit',
    },
    {
      id: '07',
      slug: 'baby-parenting',
      industry: 'Baby & Parenting',
      headline: 'Milestone Automation',
      strategy:
        'Targeted messaging that shifts as the child reaches new development stages. Focus: Parenting niche email marketing.',
      icon_name: 'Baby',
      theme: 'teal',
      cta: 'Get Your Parenting Brand Audit',
    },
    {
      id: '08',
      slug: 'home-lifestyle',
      industry: 'Home & Lifestyle',
      headline: 'High-Ticket Nurturing',
      strategy:
        'Long-term sequences designed to turn one-time buyers into brand advocates. Focus: Luxury home decor and post-purchase care.',
      icon_name: 'Home',
      theme: 'blue',
      cta: 'Get Your Home & Lifestyle Audit',
    },
    {
      id: '09',
      slug: 'jewelry',
      industry: 'Jewelry & Luxury',
      headline: 'VIP Gifting Cycles',
      strategy:
        'High-touch storytelling and automated reminders for holidays and anniversaries. Focus: Jewelry brand email design.',
      icon_name: 'Gem',
      theme: 'red',
      cta: 'Get Your Jewelry Brand Audit',
    },
    {
      id: '10',
      slug: 'sports-fitness',
      industry: 'Sports & Fitness',
      headline: 'Gear Cross-Selling',
      strategy:
        'Automated accessory recommendations based on previous equipment purchases. Focus: D2C Email Marketing, fitness gear marketing, and A/B testing.',
      icon_name: 'Dumbbell',
      theme: 'purple',
      cta: 'Get Your Fitness Brand Audit',
    },
  ],
};

export const Industries: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    const epsilon = 4;

    setCanScrollLeft(scrollLeft > epsilon);
    setCanScrollRight(scrollLeft < maxScrollLeft - epsilon);
  };

  const getScrollAmount = () => {
    if (!scrollRef.current) return 420;
    const firstCard = scrollRef.current.querySelector('article');
    if (!firstCard) return 420;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(scrollRef.current);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');

    return cardWidth + gap;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = getScrollAmount();
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);

    const rafId = window.requestAnimationFrame(() => updateScrollState());

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="bg-black py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-12 text-center mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
            Industry Focus
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{STATIC_INDUSTRIES.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            {STATIC_INDUSTRIES.description}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10"
              aria-label="Scroll industries left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10"
              aria-label="Scroll industries right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {STATIC_INDUSTRIES.items.map((industry: any) => {
            const Icon = ICON_MAP[industry.icon_name] || Sparkles;
            const theme = THEME_STYLES[industry.theme] || THEME_STYLES.purple;

            return (
              <article
                key={industry.id}
                className="min-w-[320px] md:min-w-[420px] max-w-[420px] snap-start bg-[#0a0a0a] border border-white/10 rounded-3xl p-7 hover:border-white/20 hover:bg-[#111] transition-all duration-300 group min-h-[300px]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${theme.icon}`} />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-500">{industry.id}</span>
                </div>

                <p className="text-xs font-semibold tracking-widest uppercase text-brand-orange mb-3">{industry.industry}</p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{industry.headline}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{industry.strategy}</p>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-5 hover:text-brand-orange transition-colors"
                >
                  Explore industry
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            );
          })}
            <div className="w-1 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};
