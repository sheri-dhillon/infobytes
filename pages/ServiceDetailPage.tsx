
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FAQ } from '../components/FAQ';

const SERVICES_DATA: Record<string, any> = {
    'ui-ux-design': {
        title: "UI/UX Design",
        description: "We design user-centric systems for web and mobile that are strategically built to convert.",
        pills: ["Product Design", "Wireframing", "Prototyping"],
        content: "<p>Great design is more than just aesthetics; it's about how a user interacts with your product. Our UI/UX design process focuses on creating intuitive, engaging, and accessible interfaces that drive user satisfaction and business growth.</p><h3>Our Process</h3><ul><li><strong>Discovery:</strong> Understanding your business goals and user needs.</li><li><strong>Wireframing:</strong> Creating the blueprint of your product.</li><li><strong>Visual Design:</strong> Crafting the look and feel.</li><li><strong>Prototyping:</strong> Building interactive models for testing.</li></ul>",
        meta_description: "Expert UI/UX design services aimed at maximizing user engagement."
    },
    'web-development': {
        title: "Web Development",
        description: "High-performance websites built for scale. From custom React applications to optimized marketing sites.",
        pills: ["React", "Next.js", "Performance"],
        content: "<p>We build robust, scalable, and high-performance web applications using modern technologies. Whether it's a simple marketing site or a complex SaaS platform, we ensure clean code and best practices.</p>",
        meta_description: "Professional web development services."
    },
    'mobile-apps': {
        title: "Mobile Apps",
        description: "Native iOS and cross-platform solutions that deliver premium user experiences on every device.",
        pills: ["iOS", "SwiftUI", "React Native"],
        content: "<p>In a mobile-first world, your app needs to be flawless. We specialize in building native iOS apps with Swift and cross-platform solutions using React Native, ensuring top-tier performance and user experience.</p>",
        meta_description: "Top-tier mobile app development."
    },
    'growth-strategy': {
        title: "Growth Strategy",
        description: "Data-driven marketing and retention strategies to help your product reach its full potential.",
        pills: ["Analytics", "CRO", "Automation"],
        content: "<p>Growth isn't an accident. We analyze your data, optimize your conversion funnels, and implement marketing automation strategies that drive sustainable growth and customer retention.</p>",
        meta_description: "Strategic growth services for startups."
    }
};

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES_DATA[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
         <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
         <p className="text-gray-400 mb-8">The service you are looking for does not exist or has been moved.</p>
         <Link to="/services" className="px-6 py-3 bg-white text-black rounded-full font-bold">Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 md:pt-60 md:pb-28 px-6 bg-[#050505] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up-fade leading-tight">
            {service.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed animate-slide-up-fade mb-10" style={{ animationDelay: '100ms' }}>
            {service.description}
          </p>

          <div className="flex flex-wrap gap-3 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
             {service.pills && service.pills.map((pill: string, idx: number) => (
               <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                  {pill}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-black border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
               Let's discuss how our {service.title} services can help you scale your business.
            </p>
            <div className="flex justify-center gap-4">
               <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
         </div>
      </section>

      <FAQ />
    </>
  );
};
