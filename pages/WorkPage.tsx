import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data: 15 Projects (3 per category) ---
const categories = ["All", "Web Development", "App Development", "UI/UX Design", "Branding", "AI Solutions"];

const allProjects = [
  // --- Web Development ---
  {
    title: "LuxeStay",
    subtitle: "Premium Villa Booking",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    description: "A high-end booking platform for luxury villas featuring 3D virtual tours and instant availability checks.",
    stat: "2.5x Conv.",
    tags: ["React", "Next.js"]
  },
  {
    title: "Orbit SaaS",
    subtitle: "Project Management Tool",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    description: "A collaborative workspace dashboard built for remote teams, focusing on speed and real-time updates.",
    stat: "99.9% Uptime",
    tags: ["SaaS", "WebSockets"]
  },
  {
    title: "EstatePro",
    subtitle: "Real Estate Market",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
    description: "Modern real estate listing platform with map-based search and automated lead generation for agents.",
    stat: "+45% Leads",
    tags: ["Mapbox", "React"]
  },

  // --- App Development ---
  {
    title: "FinFlow",
    subtitle: "Banking Reimagined",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    description: "Redesigning the mobile banking experience for Gen Z, resulting in a 40% increase in daily active users.",
    stat: "+40% DAU",
    tags: ["iOS", "SwiftUI"]
  },
  {
    title: "FitPulse",
    subtitle: "Fitness Tracking",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
    description: "Social fitness app connecting runners globally. Features real-time GPS tracking and community challenges.",
    stat: "1M+ Downloads",
    tags: ["React Native", "HealthKit"]
  },
  {
    title: "CryptoHive",
    subtitle: "DeFi Wallet",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=80",
    description: "Secure non-custodial wallet for managing crypto assets with a focus on simple onboarding for beginners.",
    stat: "$50M Transacted",
    tags: ["Blockchain", "Security"]
  },

  // --- UI/UX Design ---
  {
    title: "Zenith System",
    subtitle: "Enterprise Design System",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=1000&q=80",
    description: "A comprehensive design system created for a Fortune 500 logistics company to unify their digital products.",
    stat: "100% Consistency",
    tags: ["Figma", "Design Ops"]
  },
  {
    title: "Neon Dashboard",
    subtitle: "Analytics Interface",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    description: "Dark-mode first analytics dashboard designed for high-frequency traders needing rapid data visualization.",
    stat: "-20% Cog. Load",
    tags: ["Data Viz", "UI"]
  },
  {
    title: "Flow Bank",
    subtitle: "Fintech User Journey",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&w=1000&q=80",
    description: "Optimizing the onboarding flow for a digital bank to reduce drop-off rates during KYC processes.",
    stat: "+15% Signups",
    tags: ["UX Research", "Prototyping"]
  },

  // --- Branding ---
  {
    title: "Vortex",
    subtitle: "Tech Rebrand",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1000&q=80",
    description: "Complete visual identity overhaul for a legacy tech firm moving into the Web3 space.",
    stat: "3x Brand Search",
    tags: ["Identity", "Strategy"]
  },
  {
    title: "Aura Skincare",
    subtitle: "DTC Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1556228720-19275151553c?auto=format&fit=crop&w=1000&q=80",
    description: "Minimalist packaging and digital identity for a new organic skincare line targeting millennials.",
    stat: "Sold Out Launch",
    tags: ["Packaging", "Art Direction"]
  },
  {
    title: "NorthStar",
    subtitle: "Logistics Logo",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1494412574643-35d3d4018822?auto=format&fit=crop&w=1000&q=80",
    description: "Modernizing the visual language of a global shipping company to reflect speed and reliability.",
    stat: "Global Rollout",
    tags: ["Logo", "Guidelines"]
  },

  // --- AI Solutions ---
  {
    title: "HealthMate",
    subtitle: "AI Diagnostics",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    description: "Integrating AI diagnostics into a user-friendly patient portal, reducing support tickets by half.",
    stat: "-50% Support",
    tags: ["Machine Learning", "Healthcare"]
  },
  {
    title: "ChatBot X",
    subtitle: "Customer Service AI",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
    description: "Context-aware customer support agent trained on company documentation to answer complex queries.",
    stat: "24/7 Availability",
    tags: ["NLP", "Automation"]
  },
  {
    title: "DataMind",
    subtitle: "Predictive Analytics",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    description: "Sales forecasting engine for e-commerce brands to optimize inventory levels automatically.",
    stat: "+12% Revenue",
    tags: ["Predictive AI", "Python"]
  }
];

export const WorkPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  return (
    <>
      {/* --- Creative Hero Section --- */}
      <section className="relative pt-52 pb-20 md:pt-72 md:pb-32 px-6 bg-[#050505] overflow-hidden min-h-[60vh] flex flex-col justify-center">
         {/* Background Typography Effect */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.03]">
             <div className="text-[15vw] font-black text-center text-white leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                 Selected Work
             </div>
             <div className="text-[15vw] font-serif italic text-center text-white leading-[0.8] tracking-tighter uppercase whitespace-nowrap ml-20">
                 Selected Work
             </div>
         </div>

         {/* Ambient Glows */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="max-w-4xl">
               <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-white tracking-widest uppercase">Portfolio 2024-2025</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-8 tracking-tight leading-[0.95] animate-slide-up-fade">
                  Building the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">impossible.</span>
               </h1>

               <p className="text-xl text-gray-400 max-w-2xl leading-relaxed animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
                  A curated selection of projects where we bridged the gap between complex technology and human-centric design.
               </p>
            </div>
         </div>
      </section>

      {/* --- Portfolio Grid Section --- */}
      <section className="bg-black pb-32 border-t border-white/5">
         
         {/* Sticky Filter Bar */}
         <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-y border-white/10 py-4 mb-16">
            <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
               <div className="flex gap-2 min-w-max">
                  <div className="flex items-center gap-2 mr-4 text-gray-500">
                     <Filter className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-widest">Filter by:</span>
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                        activeCategory === cat
                          ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                          : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6">
            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[800px]">
               {filteredProjects.map((project, idx) => (
                 <div 
                    key={`${project.title}-${idx}`}
                    className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,74,0.15)] flex flex-col animate-fade-in"
                 >
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                       <img 
                         src={project.image} 
                         alt={project.title} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                        
                        {/* Top Section */}
                        <div className="flex justify-between items-start w-full">
                           <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
                              {project.category}
                           </span>
                           
                           {/* Floating Action Button */}
                           <Link to="/contact" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:scale-110">
                              <ArrowUpRight className="w-5 h-5" />
                           </Link>
                        </div>

                        {/* Bottom Section */}
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                               <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{project.stat}</span>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-brand-orange transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-lg text-gray-300 mb-4 font-light">{project.subtitle}</p>
                            
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm border-t border-white/10 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                               {project.description}
                            </p>
                        </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                   <p className="text-xl text-gray-400 mb-4">No projects found in this category.</p>
                   <button onClick={() => setActiveCategory("All")} className="text-brand-orange hover:underline font-bold">
                     View All Projects
                   </button>
                </div>
            )}

            {/* Footer CTA */}
            <div className="mt-24 md:mt-32 p-12 md:p-20 bg-[#0a0a0a] border border-white/10 rounded-[3rem] text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none"></div>
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none"></div>

                 <div className="relative z-10">
                     <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Ready to build the <br/> next <span className="text-gray-500 font-serif italic">big thing?</span>
                     </h2>
                     <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
                        We have the team, the tools, and the experience to bring your vision to life. Let's start a conversation.
                     </p>
                     <Link to="/contact" className="inline-flex px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Start a Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </Link>
                 </div>
            </div>

         </div>
      </section>
    </>
  );
};