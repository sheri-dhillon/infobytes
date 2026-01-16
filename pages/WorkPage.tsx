import React from 'react';
import { PageHero } from '../components/PageHero';
import { Portfolio } from '../components/Portfolio';
import { TrustedBy } from '../components/TrustedBy';

export const WorkPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="Our Work" 
        subtitle="Explore our portfolio of award-winning projects, where innovation meets exceptional design." 
      />
      <Portfolio />
      <TrustedBy />
    </>
  );
};