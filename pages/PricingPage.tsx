import React from 'react';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Pricing } from '../components/Pricing';
import { FAQ, buildFaqPageJsonLd } from '../components/FAQ';

// Static page hero content
const PAGE_HERO = {
  title: "Pricing",
  subtitle: "Transparent, flexible pricing plans designed to scale with your business."
};

export const PricingPage: React.FC = () => {
  return (
    <>
      <Seo jsonLdId="infobytes-pricing-faq-schema" jsonLd={buildFaqPageJsonLd()} />
      <PageHero 
        title={PAGE_HERO.title}
        subtitle={PAGE_HERO.subtitle}
      />
      <Pricing />
      <FAQ />
    </>
  );
};