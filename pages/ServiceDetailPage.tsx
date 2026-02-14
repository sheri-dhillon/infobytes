
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { FAQ, buildFaqPageJsonLd } from '../components/FAQ';
import { HeroHeading } from '../components/ui/HeroHeading';

const SERVICES_DATA: Record<string, any> = {
   'email-automation-engines': {
      title: "Email Automation Engines",
      description: "We move beyond newsletters to build sophisticated, data-driven engines that nurture leads and maximize revenue on autopilot, ensuring the right message hits at the right time.",
      pills: ["Klaviyo Flows", "Abandoned Cart Recovery", "Behavioral Triggers", "Hyper-Segmentation"],
      content: "<p>Email marketing automation should behave like a revenue system—not a broadcast channel. We design and implement flow architecture that responds to customer intent, triggers at the right moments, and compounds results over time.</p><h3>What we build</h3><ul><li><strong>Lifecycle flow systems:</strong> Welcome, abandon, browse, post-purchase, winback, and more.</li><li><strong>Segmentation that scales:</strong> Hyper-segmentation driven by real behavior.</li><li><strong>Testing & iteration:</strong> Continuous A/B testing on timing, creative, and offers.</li></ul><p>Ideal for brands that want consistent, predictable retention revenue—without relying on constant campaigns.</p>",
      meta_description: "Email automation engines built with behavioral triggers, segmentation, and revenue-first Klaviyo flows."
   },
   'sms-mobile-messaging': {
      title: "SMS & Mobile Messaging",
      description: "Cut through the noise with personalized, compliant text message campaigns. We drive immediate action and deeply connect with your mobile-first customers where they are most active.",
      pills: ["Omnisend SMS", "98% Open Rates", "TCPA Compliant", "Instant ROI"],
      content: "<p>SMS messaging is where speed wins. We design mobile-first automation and campaigns that feel personal, drive immediate action, and stay compliant—so your list becomes an asset, not a risk.</p><h3>How we approach SMS</h3><ul><li><strong>Compliance-first setup:</strong> TCPA-aware flows, consent capture, and smart throttling.</li><li><strong>Automation sequences:</strong> Abandonment, back-in-stock, post-purchase, and repeat-buyer nudges.</li><li><strong>Revenue clarity:</strong> Attribution that ties SMS directly to ROI.</li></ul><p>Perfect for brands ready to increase repeat purchases with a mobile channel that customers actually read.</p>",
      meta_description: "High-ROI SMS & mobile messaging with compliance-first automation and Omnisend expertise."
   },
   'platform-migration-audit': {
      title: "Platform Migration & Audit",
      description: "Seamlessly move to a top-tier retention platform without losing historical data. We audit, configure, and optimize your technical infrastructure for maximum inbox placement.",
      pills: ["Klaviyo Expert", "Omnisend Partner", "Deliverability Fix", "Data Integrity"],
      content: "<p>Migrations can quietly break retention if data and deliverability aren’t handled correctly. We move your account with a structured, audit-led process—preserving history, validating events, and fixing inbox placement issues along the way.</p><h3>Migration deliverables</h3><ul><li><strong>Data integrity validation:</strong> Event tracking, list hygiene, and historical import checks.</li><li><strong>Deliverability audit:</strong> DNS records, sender setup, and domain alignment.</li><li><strong>Platform configuration:</strong> Klaviyo or Omnisend setup that’s ready for scale.</li></ul><p>The goal: a clean, reliable foundation that supports automation performance from day one.</p>",
      meta_description: "Klaviyo/Omnisend migration and retention platform audits with deliverability fixes and data integrity checks."
   },
   'lifecycle-strategy-cro': {
      title: "Lifecycle Strategy & CRO",
      description: "A holistic approach to increasing Customer Lifetime Value. We analyze behavioral data to plug leaky funnel buckets and continuously optimize every touchpoint in the customer journey.",
      pills: ["Customer LTV", "A/B Testing", "Journey Mapping", "Zero-Party Data"],
      content: "<p>Retention is a system. We combine journey mapping, CRO, and lifecycle strategy to increase Customer LTV—identifying friction points, improving conversion moments, and turning more first-time shoppers into repeat buyers.</p><h3>Optimization focus areas</h3><ul><li><strong>Journey mapping:</strong> From first visit through repeat purchase behavior.</li><li><strong>A/B testing:</strong> Offers, messaging, timing, and creative across touchpoints.</li><li><strong>Data enrichment:</strong> Using zero-party data to personalize and increase relevance.</li></ul><p>Built for brands that want compounding improvements—not one-off tweaks.</p>",
      meta_description: "Lifecycle strategy and CRO focused on increasing Customer LTV through journey mapping, testing, and personalization."
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
         <Seo jsonLdId="infobytes-service-detail-faq-schema" jsonLd={buildFaqPageJsonLd()} />
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 md:pt-60 md:pb-28 px-6 bg-[#050505] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          
               <HeroHeading main={service.title} className="mb-6 animate-slide-up-fade" />
          
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
