import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroHeading } from './ui/HeroHeading';

const ROADMAP_STEPS = [
  {
    num: '01',
    title: 'Discovery & Audit',
    hoverPills: [
      'Klaviyo Health Check',
      'List Hygiene Audit',
      'Deliverability Analysis',
      'Data Integrity Setup',
    ],
  },
  {
    num: '02',
    title: 'Retention Blueprinting',
    hoverPills: ['Lifecycle Mapping', 'Customer Segmentation', 'Flow Logic Design', 'SMS/Email Sync'],
  },
  {
    num: '03',
    title: 'High-Conversion Build',
    hoverPills: [
      'Abandoned Cart Engines',
      'Post-Purchase Nurture',
      'Custom Template Design',
      'Dynamic Content Blocks',
    ],
  },
  {
    num: '04',
    title: 'Scale & A/B Testing',
    hoverPills: ['Subject Line Testing', 'Revenue Attribution', 'LTV Forecasting', 'Campaign Dominance'],
  },
];

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-black pt-52 md:pt-64 pb-24 overflow-hidden flex flex-col justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[4000ms]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">OUR CAPABILITIES</span>
            </div>
            
            <HeroHeading
              pre={<>We architect</>}
              main={<>revenue-first lifecycles.</>}
              className="mb-8 animate-slide-up-fade"
              preClassName="mb-2"
              mainClassName=""
            />
            
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-12 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              We don’t just "manage" accounts; we engineer growth engines. From high-integrity migrations to complex behavioral automation, our methodology is designed to turn your customer list into your most profitable asset.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
               <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group">
                 Start Your Audit <ArrowDownRight className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
               </Link>
               <a href="#retention-roadmap" className="px-8 py-4 border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white/5 transition-all">
                 The Process
               </a>
            </div>
          </div>

          {/* Visual Interactive List */}
          <div
            id="retention-roadmap"
            className="lg:col-span-5 relative animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <div className="relative z-10 flex flex-col gap-3">
              {ROADMAP_STEPS.map((step, idx, arr) => (
                <div
                  key={step.num}
                  className="group relative p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:bg-white hover:border-white transition-all duration-300 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  style={{
                    marginLeft: `${idx * 24}px`,
                    zIndex: 10 - idx,
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="text-xs font-bold text-gray-500 mb-1 group-hover:text-black/50 transition-colors">
                        {step.num}. {step.title}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-black transition-colors">
                        {step.num}. {step.title}
                      </h3>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-black">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>

                  {/* Pills Reveal (Hover / Focus on desktop, always visible on mobile) */}
                  <div className="mt-4 flex flex-wrap gap-2 lg:hidden relative z-10">
                    {step.hoverPills.map((pill) => (
                      <span
                        key={pill}
                        className="text-[10px] font-bold uppercase tracking-wider border border-white/10 px-3 py-1.5 rounded-full text-gray-300 bg-white/5"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  <div className="hidden lg:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] transition-[grid-template-rows] duration-300 relative z-10">
                    <div className="overflow-hidden">
                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.hoverPills.map((pill) => (
                          <span
                            key={pill}
                            className="text-[10px] font-bold uppercase tracking-wider border border-black/10 px-3 py-1.5 rounded-full text-black/70"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow (Visible on all except last) */}
                  {idx < arr.length - 1 && (
                    <div className="absolute -bottom-[28px] -left-[14px] w-[60px] h-[60px] z-20 pointer-events-none text-brand-orange/40 group-hover:text-brand-orange transition-colors duration-300">
                      <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M 25 10 C 5 25, 15 45, 45 50"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="4 3"
                          markerEnd="url(#arrowhead)"
                        />
                        <defs>
                          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0 0 L6 3 L0 6 L1.5 3 Z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/10 blur-[80px] pointer-events-none z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};