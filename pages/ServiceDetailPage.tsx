import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { FAQ } from '../components/FAQ';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error("Error fetching service:", error);
        } else {
          setService(data);
          
          // --- SEO Management ---
          if (data) {
              document.title = data.seo_title || data.title + " | InfoBytes";
              
              // Update Meta Description
              let metaDesc = document.querySelector('meta[name="description"]');
              if (!metaDesc) {
                  metaDesc = document.createElement('meta');
                  metaDesc.setAttribute('name', 'description');
                  document.head.appendChild(metaDesc);
              }
              metaDesc.setAttribute('content', data.meta_description || data.description || '');

              // Update Meta Title (OG)
              let ogTitle = document.querySelector('meta[property="og:title"]');
              if (!ogTitle) {
                  ogTitle = document.createElement('meta');
                  ogTitle.setAttribute('property', 'og:title');
                  document.head.appendChild(ogTitle);
              }
              ogTitle.setAttribute('content', data.seo_title || data.title);
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();

    // Cleanup SEO on unmount
    return () => {
        document.title = "InfoBytes - Design. Build. Scale.";
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
             {service.pills && Array.isArray(service.pills) && service.pills.map((pill: string, idx: number) => (
               pill && (
                <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                  {pill}
                </span>
               )
             ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-black border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
                {service.content ? (
                   <div dangerouslySetInnerHTML={{ __html: service.content }} />
                ) : (
                   <p className="text-gray-500 italic">Detailed service description coming soon.</p>
                )}
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