import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ["Web Development", "App Development", "UI/UX Design", "Branding", "AI Solutions"];

const projects = [
  {
    title: "LuxeStay",
    subtitle: "Premium Booking Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    description: "A high-end booking platform for luxury villas. We streamlined the checkout flow to boost conversion.",
    stat: "2.5x Conv.",
    tags: ["Web Dev", "Branding"],
    link: "/work"
  },
  {
    title: "HealthMate",
    subtitle: "AI Diagnostics SaaS",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    description: "Integrating AI diagnostics into a user-friendly patient portal, reducing support tickets by half.",
    stat: "-50% Support",
    tags: ["Product Design", "AI"],
    link: "/work"
  },
  {
    title: "FinFlow",
    subtitle: "Banking Reimagined",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    description: "Redesigning the mobile banking experience for Gen Z, resulting in a 40% increase in daily active users.",
    stat: "+40% DAU",
    tags: ["UI/UX", "iOS Dev"],
    link: "/work"
  },
  {
    title: "Nebula Stream",
    subtitle: "Content Aggregator",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    description: "A cross-platform streaming app with personalized AI recommendations.",
    stat: "4.8 Store Rating",
    tags: ["React Native", "Streaming"],
    link: "/work"
  },
  {
    title: "Vortex Identity",
    subtitle: "Brand Evolution",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1000&q=80",
    description: "Complete rebrand for a legacy tech firm moving into the Web3 space.",
    stat: "3x Brand Search",
    tags: ["Identity", "Strategy"],
    link: "/work"
  },
  {
    title: "Zenith UI Kit",
    subtitle: "Design System",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=1000&q=80",
    description: "A comprehensive design system for enterprise-grade SaaS applications.",
    stat: "100% Consistency",
    tags: ["Figma", "Design System"],
    link: "/work"
  },
  {
    title: "E-Comm AI",
    subtitle: "Shopping Assistant",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
    description: "AI-powered shopping assistant that personalizes product recommendations in real-time.",
    stat: "+25% AOV",
    tags: ["AI", "Machine Learning"],
    link: "/work"
  }
];

export const CaseStudies: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");

  const filteredProjects = projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
           <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                 <div className="h-px w-8 bg-brand-orange"></div>
                 <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Selected Work</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1]">
                 Crafting Digital <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Masterpieces.</span>
              </h2>
           </div>
           
           <Link 
             to="/work" 
             className="hidden md:flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white hover:text-brand-orange transition-all duration-300 group"
           >
             <span className="font-medium text-lg">View All Projects</span>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
           {filteredProjects.length > 0 ? (
             filteredProjects.map((project, idx) => (
               <Link 
                  to={project.link} 
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
                         <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:scale-110">
                            <ArrowUpRight className="w-5 h-5" />
                         </div>
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
               </Link>
             ))
           ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                <p className="text-xl text-gray-400 mb-4">No case studies found for this category yet.</p>
                <button onClick={() => setActiveCategory("Web Development")} className="text-brand-orange hover:underline">
                  Reset to Web Development
                </button>
             </div>
           )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden flex justify-center">
            <Link 
             to="/work" 
             className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
           >
             View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
};