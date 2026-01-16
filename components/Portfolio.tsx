import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';

const categories = ['AI', 'FINTECH', 'HEALTHCARE', 'SAAS', 'ECOMMERCE'];

const projects = [
  {
    title: "NeuronIQ – AI-Powered Hiring Assistant",
    desc: "Streamlined UX for smarter candidate filtering and team collaboration.",
    tags: ["Product Design", "AI SaaS", "UX Strategy"],
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
    color: "bg-green-500"
  },
  {
    title: "Echo – AI Analytics Platform Design",
    desc: "Data-rich dashboards with a clean interface for better decision-making.",
    tags: ["Interaction", "AI SaaS", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "bg-pink-500"
  },
  {
    title: "Nanobot – AI Chat Experience",
    desc: "Conversational AI interface designed to boost engagement and reduce churn.",
    tags: ["AI Design", "Product Strategy", "UI/UX Design"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", // AI looking image
    color: "bg-purple-500",
    fullWidth: true
  }
];

export const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('AI');

  return (
    <section className="py-24 bg-black" id="work">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● Our Work</div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Featured Design + AI<br />Project portfolio</h2>
            
            <div className="flex flex-col gap-1 w-64">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`text-left px-4 py-3 text-sm font-semibold transition-all flex justify-between items-center rounded-lg ${activeTab === cat ? 'bg-orange-500 text-white' : 'text-brand-text hover:text-white hover:bg-white/5'}`}
                >
                  {cat}
                  {activeTab === cat && <ArrowUpRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-xs text-right md:text-left">
            <p className="text-brand-text text-sm mb-6">We team up with startups, SaaS companies, and digital brands to create design-driven solutions that look great — and perform even better.</p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
              See more projects <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className={`group ${project.fullWidth ? 'md:col-span-2 md:grid md:grid-cols-2 gap-8 items-center bg-[#0a0a0a] rounded-3xl p-8 border border-white/5' : ''}`}>
              
              {project.fullWidth ? (
                  // Full width card layout
                  <>
                    <div className="order-2 md:order-1">
                        <div className={`w-8 h-8 rounded-full ${project.color} flex items-center justify-center mb-6`}>
                            <Plus className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                        <p className="text-gray-400 mb-6">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs border border-white/10 rounded-full px-3 py-1 text-gray-400">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  </>
              ) : (
                // Standard card layout
                <div className="bg-[#0a0a0a] rounded-3xl p-0 border border-white/5 overflow-hidden hover:border-white/20 transition-colors">
                   <div className="p-8 pb-0">
                      <div className={`w-8 h-8 rounded-full ${project.color} flex items-center justify-center mb-6`}>
                        <Plus className="text-white w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-6 h-10">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs border border-white/10 rounded-full px-3 py-1 text-gray-400">{tag}</span>
                        ))}
                      </div>
                   </div>
                   <div className="h-64 w-full bg-gray-900 mt-4 relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};