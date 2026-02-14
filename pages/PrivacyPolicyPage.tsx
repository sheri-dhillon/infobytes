import React from 'react';
import { HeroHeading } from '../components/ui/HeroHeading';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <section className="pt-40 pb-20 px-6 bg-brand-dark">
      <div className="max-w-4xl mx-auto">
        <HeroHeading main="Privacy Policy" className="mb-6" />
        <p className="text-gray-400 text-lg leading-relaxed">
          Page coming soon.
        </p>
      </div>
    </section>
  );
};
