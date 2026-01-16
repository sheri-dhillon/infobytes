import React from 'react';
import { PageHero } from '../components/PageHero';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { FAQ } from '../components/FAQ';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive digital solutions tailored to your unique business needs, from initial concept to final execution." 
      />
      <Services />
      <Process />
      <FAQ />
    </>
  );
};