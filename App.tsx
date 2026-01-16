import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Momentum } from './components/Momentum';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { TrustedBy } from './components/TrustedBy';
import { Process } from './components/Process';

function App() {
  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans selection:bg-purple-500/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Momentum />
        
        {/* Replaced Portfolio with Process based on user request */}
        <Process />
        
        {/* Trusted By / Marquee Section */}
        <TrustedBy />

        <Testimonials />
        <Pricing />
        
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;