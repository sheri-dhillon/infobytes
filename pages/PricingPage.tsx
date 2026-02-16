import React from 'react';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Pricing } from '../components/Pricing';
import { FAQ, buildFaqPageJsonLd } from '../components/FAQ';
import pricingData from '../pricing.json';

export const PricingPage: React.FC = () => {
  return (
    <>
      <Seo jsonLdId="infobytes-pricing-faq-schema" jsonLd={buildFaqPageJsonLd()} />
      <PageHero 
        title={pricingData.pageHero.title}
        subtitle={pricingData.pageHero.subtitle}
      />
      <Pricing />
      <FAQ />
    </>
  );
};