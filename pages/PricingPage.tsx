import React from 'react';
import { PageHero } from '../components/PageHero';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';

export const PricingPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="Pricing" 
        subtitle="Transparent, flexible pricing plans designed to scale with your business." 
      />
      <Pricing />
      <FAQ />
    </>
  );
};