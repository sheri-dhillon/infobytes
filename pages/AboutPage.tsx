import React from 'react';
import { PageHero } from '../components/PageHero';
import { About } from '../components/About';
import { TrustedBy } from '../components/TrustedBy';
import { Momentum } from '../components/Momentum';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="About Us" 
        subtitle="We are a team of visionaries, creators, and strategists dedicated to building the next generation of digital experiences." 
      />
      <About />
      <Momentum />
      <TrustedBy />
    </>
  );
};