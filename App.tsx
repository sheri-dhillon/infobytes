import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Support } from './components/Support';
import { Outcomes } from './components/Outcomes';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans selection:bg-purple-500/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Support />
        <Outcomes />
        <Portfolio />
        <Services />
        
        {/* Features Grid (Small interlude) */}
        <section className="py-24 bg-black text-center border-t border-white/5">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● Features</div>
              <h2 className="text-3xl md:text-5xl font-semibold mb-16">Built for founders, Fine-<br/>tuned for teams.</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {[
                   { title: "Multilingual by Design", icon: "🌐" },
                   { title: "Intelligent Tool Hooks", icon: "🔗" },
                   { title: "A/B Prompt + UX Testing", icon: "⚡" },
                   { title: "99.9% Uptime", icon: "🛡️" },
                   { title: "Launch Support", icon: "🚀" },
                   { title: "Compliance", icon: "🔒" }
                 ].map((f, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors">
                       <div className="text-2xl mb-4">{f.icon}</div>
                       <h3 className="font-semibold mb-2">{f.title}</h3>
                       <p className="text-xs text-gray-500">Robust systems scaled for performance.</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        <Testimonials />
        <Pricing />
        
        {/* Blog/Case Studies Teaser */}
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
               <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● See How We Help Teams Win</div>
               <h2 className="text-3xl font-semibold">Case Studies & Insights</h2>
             </div>
             
             <div className="grid md:grid-cols-4 gap-6">
               {[
                 { title: "Building Reliable MVPs", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80" },
                 { title: "Product-Market Fit", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80" },
                 { title: "Designing Complex AI", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" },
                 { title: "Micro-Interactions", img: "https://images.unsplash.com/photo-1504384308090-c54be3855463?auto=format&fit=crop&w=400&q=80" },
               ].map((post, idx) => (
                 <div key={idx} className="group cursor-pointer">
                    <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                       <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>
                    <div className="text-xs text-orange-500 mb-2">PRODUCT • JULY 2025</div>
                    <h3 className="text-sm font-semibold group-hover:text-white text-gray-300 transition-colors">{post.title}</h3>
                 </div>
               ))}
             </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;