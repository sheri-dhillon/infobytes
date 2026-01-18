import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Momentum } from '../components/Momentum';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { TrustedBy } from '../components/TrustedBy';
import { WorkProcess } from '../components/WorkProcess';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Momentum />
      <WorkProcess />
      <TrustedBy />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
};