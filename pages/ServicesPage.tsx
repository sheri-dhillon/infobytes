import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { ServicesList } from '../components/ServicesList';
import { Industries } from '../components/Industries';
import { CaseStudies } from '../components/CaseStudies';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TestimonialsMarquee } from '../components/TestimonialsMarquee';
import { Pricing } from '../components/Pricing';
import { EmailShowcase } from '../components/EmailShowcase';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <EmailShowcase />
      <Industries />
      <CaseStudies />
      <WhyChooseUs />
      <TestimonialsMarquee />
      <Pricing />
    </>
  );
};
