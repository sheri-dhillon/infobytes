import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  return (
    <div className="relative pt-52 pb-20 px-6 md:pt-64 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up-fade">{title}</h1>
        <p className="text-xl text-brand-text max-w-2xl animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};