import React, { useState } from 'react';
import caseStudiesData from '../projects.json';

const section = caseStudiesData.section;
const categories = caseStudiesData.categories;
const projects = caseStudiesData.projects;
const CASE_STUDIES_SCHEMA = caseStudiesData.schema;

export const CaseStudies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.value || 'All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
          <div className="max-w-4xl mb-12 text-center mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
                {section.tagline}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {section.headline}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
                {section.subheadline}
              </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat.value
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
           {filteredProjects.length > 0 ? (
             filteredProjects.map((project, idx) => (
               <article 
                key={`${project.resultMetric}-${idx}`}
                className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_12px_55px_rgba(255,107,74,0.16)] flex flex-col animate-fade-in"
               >
                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                     <img 
                       src={project.image} 
                    alt={project.industryTag} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] opacity-45 group-hover:opacity-55"
                     />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/88 to-black/45 opacity-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-brand-purple/10 group-hover:from-brand-orange/20 group-hover:to-brand-purple/20 transition-all duration-700"></div>
                  </div>

                  {/* Content Wrapper */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-9">
                      
                      {/* Top Section */}
                      <div className="flex justify-start items-start w-full">
                         <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
                           {project.industryTag}
                         </span>
                      </div>

                      {/* Bottom Section */}
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-3 opacity-100">
                             <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Result Metric</span>
                          </div>
                          
                            <h3 className="text-4xl md:text-[2.35rem] font-bold text-white mb-3 leading-[1.05] group-hover:text-brand-orange transition-colors duration-300">
                             {project.resultMetric}
                          </h3>
                            <p className="text-sm text-gray-200 mb-3 font-semibold uppercase tracking-wider">{project.brand}</p>

                            <p className="text-[11px] text-green-300 mb-3 font-bold uppercase tracking-widest">
                              {project.platform}
                            </p>
                          
                            <p className="text-gray-200 text-base leading-relaxed max-w-sm border-t border-white/20 pt-4 mt-4 opacity-95">
                             {project.description}
                          </p>
                      </div>
                  </div>
               </article>
             ))
           ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                <p className="text-xl text-gray-400 mb-4">No case studies found for this category yet.</p>
                <button onClick={() => setActiveCategory('All')} className="text-brand-orange hover:underline">
                  Reset to All
                </button>
             </div>
           )}
        </div>

        <script
          type="application/ld+json"
          id="infobytes-case-studies-series-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CASE_STUDIES_SCHEMA) }}
        />

      </div>
    </section>
  );
};