import React from 'react';
import { Layers, Smartphone, Monitor, PenTool } from 'lucide-react';

const services = [
  {
    title: "UI/UX Design",
    desc: "Intuitive experiences that turn functional products into memorable.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&q=80",
    gradient: "from-gray-800 to-gray-900"
  },
  {
    title: "Mobile App Development",
    desc: "Designing seamless mobile experiences that stay accessible.",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-900 to-indigo-900"
  },
  {
    title: "Website Development",
    desc: "Your first impression matters — we craft pages that capture attention.",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    gradient: "from-purple-900 to-fuchsia-900"
  },
  {
    title: "Branding & Identity",
    desc: "Building brands with depth and clarity — identities that connect.",
    icon: <PenTool className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=400&q=80",
    gradient: "from-green-900 to-emerald-900"
  }
];

export const Services: React.FC = () => {
  return (
    <section className="py-24 bg-black overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-semibold mb-4">Services and<br/>solutions we offer.</h2>
          <p className="text-brand-text max-w-xl">We work with creative teams and ambitious founders to turn vision into product — with intuitive UX, standout visuals, and seamless digital experiences.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
           {services.map((service, idx) => (
             <div key={idx} className={`min-w-[300px] md:min-w-[350px] h-[450px] rounded-3xl relative overflow-hidden group snap-center bg-gradient-to-br ${service.gradient} border border-white/5`}>
                <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 flex flex-col justify-end">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white">
                      {service.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                   <p className="text-sm text-gray-300">{service.desc}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Process Section */}
        <div className="mt-32 border-t border-white/10 pt-24">
           <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-semibold mb-6">We simplify product<br/>Design process</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs">1</span>
                     <span className="text-brand-text">Strategy Workshop</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs">2</span>
                     <span className="text-brand-text">Competitor Research</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs">3</span>
                     <span className="text-brand-text">Idea Validation</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-brand-text">
                 <p className="mb-8">We don't follow trends blindly or design without context. Every UI we craft aligns closely with your product's purpose and business goals.</p>
                 
                 {/* Visual Flow Representation */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                       <div className="bg-white text-black px-4 py-2 rounded-full text-center font-bold text-xs">Product Strategy</div>
                       <div className="h-8 border-l border-dashed border-white/20 ml-8"></div>
                       <div className="bg-transparent border border-white px-4 py-2 rounded-full text-center text-white text-xs">UX Research</div>
                    </div>
                     <div className="space-y-3 mt-8">
                       <div className="bg-transparent border border-white px-4 py-2 rounded-full text-center text-white text-xs">Design System</div>
                       <div className="h-8 border-l border-dashed border-white/20 ml-8"></div>
                       <div className="bg-white text-black px-4 py-2 rounded-full text-center font-bold text-xs">Handoff</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};