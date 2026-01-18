import React from 'react';
import { PageHero } from '../components/PageHero';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="About Us" 
        subtitle="We are building something amazing. Stay tuned." 
      />
      <section className="py-32 bg-brand-dark min-h-[50vh] flex items-center justify-center">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-8">
               <span className="text-brand-orange font-bold text-xl">Coming Soon</span>
            </div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We are currently crafting a unique experience for this page. 
              Check back soon to learn more about our story, team, and mission.
            </p>
         </div>
      </section>
    </>
  );
};