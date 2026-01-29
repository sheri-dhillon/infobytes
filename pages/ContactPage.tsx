import React, { useState, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, Plus, Minus, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const faqs = [
  {
    q: "How do you bridge the gap between UI/UX and actual revenue?",
    a: "We believe beauty must perform. Our UI/UX process uses behavioral data to map user journeys that lead directly to conversions. When paired with our email automation, we create a closed-loop system that captures, converts, and retains customers."
  },
  {
    q: "Do you build native iOS apps or cross-platform solutions?",
    a: "We specialize in high-performance Native iOS development using Swift and SwiftUI. This ensures your app has the fastest possible response times, seamless integration with Apple’s ecosystem, and a premium \"Apple-level\" feel for your users."
  },
  {
    q: "Can you integrate email marketing into my existing eCommerce store?",
    a: "Absolutely. We specialize in turning \"stale\" stores into profit engines. We audit your current tech stack (Shopify, Magento, etc.) and deploy sophisticated lifecycle automations—like abandoned cart recovery and post-purchase flows—that drive immediate ROI."
  },
  {
    q: "What is the typical timeline for a full Design-to-Launch project?",
    a: "A custom high-end project typically spans 8 to 12 weeks. This includes deep-dive strategy, UI/UX prototyping, full-stack development, and rigorous QA. We work in agile \"sprints\" so you see tangible progress every two weeks."
  },
  {
    q: "Are your designs \"dev-ready\" if I have my own internal team?",
    a: "Yes. We provide a complete Design System, including component libraries, documentation, and high-fidelity prototypes. Our designs are architected with engineering in mind, ensuring a seamless handover to your developers."
  },
  {
    q: "Do you provide long-term support after the \"Scale\" phase?",
    a: "We aren't just a vendor; we’re a partner. After launch, we offer optimization packages that include A/B testing for your email flows, monthly UI/UX refinements, and technical scaling to ensure your product grows with your user base."
  }
];

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    mobile_number: '',
    project_budget: '',
    source: '',
    source_other: '',
    project_details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Magnetic button logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const footerSectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerSectionRef.current) return;
    const rect = footerSectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit movement range and smooth it
    setMousePos({ x: x * 0.2, y: y * 0.2 }); 
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
        const finalSource = formData.source === 'Others' ? formData.source_other : formData.source;

        const { error } = await supabase.from('leads').insert([{
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            company_name: formData.company_name,
            mobile_number: formData.mobile_number,
            project_budget: formData.project_budget,
            source: finalSource,
            project_details: formData.project_details,
            status: 'New'
        }]);

        if (error) throw error;

        setSubmitStatus('success');
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            company_name: '',
            mobile_number: '',
            project_budget: '',
            source: '',
            source_other: '',
            project_details: ''
        });
    } catch (err: any) {
        console.error('Error submitting form:', err);
        setSubmitStatus('error');
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Custom Hero Section matching screenshot */}
      <section className="pt-52 pb-20 md:pt-72 md:pb-32 px-6 bg-[#050505] flex flex-col items-center justify-center text-center min-h-[60vh]">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6 animate-slide-up-fade">
            We'd love to <br />
            hear from you.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
            Whether you're building a brand, designing a product.
          </p>
      </section>
      
      <section className="pb-24 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Contact Info & CTA (Smaller width - col-span-5) */}
            <div className="lg:col-span-5 space-y-16">
              
              {/* "Let's Chat" Header & Book Call Card */}
              <div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-none tracking-tight">LET'S CHAT</h2>
                 <p className="text-gray-400 text-lg mb-8">Let's bring your vision to life.</p>
                 
                 {/* Booking Card */}
                 <div className="bg-[#111] rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8 border border-white/10">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80" alt="Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white leading-none mb-12 uppercase tracking-tight">
                       BOOK A <br/>
                       QUICK CALL
                    </h3>
                    
                    <a 
                      href="https://calendly.com/shehryar-infobytes/30min" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-white font-medium hover:gap-5 transition-all group/link"
                    >
                       Book a call 
                       <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover/link:rotate-[-45deg]">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </a>
                 </div>
              </div>

              {/* Contact Info Details */}
              <div className="space-y-8">
                <div>
                   <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
                   <div className="space-y-6">
                      <a href="mailto:hello@infobytes.io" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">hello@infobytes.io</span>
                      </a>
                      
                      <a href="tel:+15550000000" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">+1 (555) 000-0000</span>
                      </a>

                      <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">123 Design Street, Creative City, NY 10012</span>
                      </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
                   <div className="flex gap-4 flex-wrap">
                      {['facebook-f', 'instagram', 'linkedin-in', 'x-twitter', 'dribbble', 'behance'].map((social) => (
                        <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all hover:scale-110">
                           <i className={`fa-brands fa-${social}`}></i>
                        </a>
                      ))}
                   </div>
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form (Wider - col-span-7) */}
            <div className="lg:col-span-7">
               <div className="bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-white/10 sticky top-32">
                  <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
                  
                  {submitStatus === 'success' ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in">
                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                              <CheckCircle className="w-8 h-8" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                          <p className="text-gray-400">Thank you for reaching out. We will get back to you shortly.</p>
                          <button 
                            onClick={() => setSubmitStatus('idle')}
                            className="mt-6 text-brand-orange hover:text-white font-medium transition-colors"
                          >
                            Send another message
                          </button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">First Name</label>
                            <input 
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                type="text" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                placeholder="John" 
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Last Name</label>
                            <input 
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                type="text" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                placeholder="Doe" 
                                required
                            />
                        </div>
                        </div>
                        
                        <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email" 
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                            placeholder="john@example.com" 
                            required
                        />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Company Name</label>
                            <input 
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                type="text" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                placeholder="Acme Inc." 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Mobile Number</label>
                            <input 
                                name="mobile_number"
                                value={formData.mobile_number}
                                onChange={handleInputChange}
                                type="tel" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                placeholder="+1 (555) 000-0000" 
                            />
                        </div>
                        </div>

                        <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Project Budget</label>
                        <div className="relative">
                            <select 
                                name="project_budget"
                                value={formData.project_budget}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select a range</option>
                                <option value="less_1000">Less than $1,000</option>
                                <option value="1000_2000">$1,000 - $2,000</option>
                                <option value="2000_3000">$2,000 - $3,000</option>
                                <option value="3000_plus">$3,000+</option>
                                <option value="unknown">Don't know</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        </div>

                        <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Where did you hear about us?</label>
                        <div className="relative">
                            <select 
                                name="source"
                                value={formData.source}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="Google">Google</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Dribbble">Dribbble</option>
                                <option value="Behance.net">Behance.net</option>
                                <option value="Referral">Friend's Referral</option>
                                <option value="Email">Email</option>
                                <option value="Others">Others</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        </div>
                        
                        {formData.source === 'Others' && (
                        <div className="space-y-2 animate-fade-in">
                            <label className="text-sm font-medium text-gray-400">Please specify</label>
                            <input 
                                name="source_other"
                                value={formData.source_other}
                                onChange={handleInputChange}
                                type="text" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                placeholder="e.g. Podcast, Event..." 
                            />
                        </div>
                        )}

                        <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Project Details</label>
                        <textarea 
                            name="project_details"
                            value={formData.project_details}
                            onChange={handleInputChange}
                            rows={4} 
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                            placeholder="Tell us about your project goals, timeline, and requirements..."
                        ></textarea>
                        </div>

                        {submitStatus === 'error' && (
                            <p className="text-red-400 text-sm">{errorMessage}</p>
                        )}

                        <Button 
                            disabled={isSubmitting}
                            className="w-full justify-between group py-4 text-base disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                </span>
                            ) : (
                                <>
                                    Send Inquiry <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                  )}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Magnetic Marquee CTA Section */}
      <section 
        ref={footerSectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="py-32 md:py-48 bg-black relative overflow-hidden flex items-center justify-center border-t border-white/5 cursor-default"
      >
        {/* Marquee Background */}
        <div className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-8 select-none pointer-events-none opacity-20">
            {/* Line 1 */}
            <div className="flex whitespace-nowrap animate-scroll-left">
                {[1, 2, 3, 4].map((i) => (
                    <React.Fragment key={i}>
                        <span className="text-[10vw] md:text-[8vw] font-black uppercase text-white leading-none px-4">
                            Let's Work Together
                        </span>
                        <span className="text-[10vw] md:text-[8vw] font-serif italic text-white leading-none px-4">
                            Let's Work Together
                        </span>
                    </React.Fragment>
                ))}
            </div>
            {/* Line 2 */}
            <div className="flex whitespace-nowrap animate-scroll-right">
                 {[1, 2, 3, 4].map((i) => (
                    <React.Fragment key={i}>
                        <span className="text-[10vw] md:text-[8vw] font-serif italic text-white leading-none px-4">
                            Let's Work Together
                        </span>
                        <span className="text-[10vw] md:text-[8vw] font-black uppercase text-white leading-none px-4">
                            Let's Work Together
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </div>

        {/* Magnetic Button */}
        <div 
             className="relative z-10 transition-transform duration-100 ease-out"
             style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
        >
             <a 
               href="mailto:hello@infobytes.io" 
               className="flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple text-white shadow-[0_0_60px_rgba(255,107,74,0.4)] hover:shadow-[0_0_100px_rgba(185,109,243,0.6)] hover:scale-105 transition-all duration-300 group text-center p-8"
             >
                <span className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">Get In Touch</span>
                <span className="text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">hello@infobytes.io</span>
             </a>
        </div>
      </section>

      {/* New FAQ Section with Accordion Design */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Header / Left Side */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                 <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
                   Support
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Got questions? <br/><span className="text-gray-500">We've got answers.</span></h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                   Everything you need to know about our process, pricing, and services. Can't find what you're looking for?
                 </p>
                 <a href="mailto:hello@infobytes.io" className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-orange transition-colors group">
                    Email our team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </a>
              </div>
            </div>

            {/* Accordion / Right Side */}
            <div className="lg:col-span-8">
               <div className="divide-y divide-white/10">
                 {faqs.map((faq, idx) => (
                   <div key={idx} className="py-6 first:pt-0 last:pb-0">
                     <button 
                       onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                       className="w-full flex items-start justify-between text-left group py-2"
                     >
                       <span className={`text-xl font-medium transition-colors duration-300 pr-8 leading-tight ${openFaq === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                         {faq.q}
                       </span>
                       <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${openFaq === idx ? 'bg-white text-black rotate-180' : 'bg-transparent text-white group-hover:bg-white/10'}`}>
                          {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                       </span>
                     </button>
                     <div 
                       className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                     >
                        <div className="overflow-hidden">
                           <p className="text-gray-400 leading-relaxed pr-12 pb-2">
                             {faq.a}
                           </p>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};