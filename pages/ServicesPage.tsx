import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { ServicesList } from '../components/ServicesList';
import { Industries } from '../components/Industries';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <Industries />
    </>
  );
};