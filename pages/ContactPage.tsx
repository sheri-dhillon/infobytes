
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, Plus, Minus, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormField {
    id: string;
    key: string; // DB column or 'custom'
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    width: 'half' | 'full';
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select inputs
}

interface ContactConfig {
    hero: {
        title: string;
        subtitle: string;
    };
    info: {
        heading: string;
        subheading: string;
        email: string;
        phone: string;
        address: string;
        booking_link: string;
    };
    form_fields: FormField[];
}

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  
  // Dynamic Form State
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Magnetic button logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const footerSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // 1. Fetch Contact Page Config
              const { data: pageData } = await supabase
                  .from('site_settings')
                  .select('value')
                  .eq('key', 'contact_page')
                  .single();
              
              if (pageData) setConfig(pageData.value);

              // 2. Fetch FAQs (Global Data)
              const { data: faqData } = await supabase
                  .from('site_settings')
                  .select('value')
                  .eq('key', 'faq_section')
                  .single();
              
              if (faqData?.value?.items) {
                  setFaqs(faqData.value.items);
              }

          } catch (err) {
              console.error(err);
          } finally {
              setLoadingConfig(false);
          }
      };
      fetchData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerSectionRef.current) return;
    const rect = footerSectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
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
        if (!config) throw new Error("Configuration missing");

        // Map dynamic form data to Supabase 'leads' table columns
        const dbPayload: any = {
            first_name: formData['first_name'] || '',
            last_name: formData['last_name'] || '',
            email: formData['email'] || '',
            company_name: formData['company_name'] || '',
            mobile_number: formData['mobile_number'] || '',
            project_budget: formData['project_budget'] || '',
            source: formData['source'] || '',
            status: 'New'
        };

        // If there are extra fields not in the standard columns, append them to project_details
        const standardKeys = ['first_name', 'last_name', 'email', 'company_name', 'mobile_number', 'project_budget', 'source', 'project_details'];
        let customDetails = formData['project_details'] || '';

        // Iterate through submitted data to find non-standard fields
        Object.keys(formData).forEach(key => {
            if (!standardKeys.includes(key)) {
                const label = config.form_fields.find(f => f.key === key)?.label || key;
                customDetails += `\n\n[${label}]: ${formData[key]}`;
            }
        });

        dbPayload.project_details = customDetails.trim();

        const { error } = await supabase.from('leads').insert([dbPayload]);

        if (error) throw error;

        setSubmitStatus('success');
        setFormData({});
    } catch (err: any) {
        console.error('Error submitting form:', err);
        setSubmitStatus('error');
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loadingConfig) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
          </div>
      );
  }

  if (!config) return null;

  return (
    <>
      {/* Dynamic Hero Section */}
      <section className="pt-52 pb-20 md:pt-72 md:pb-32 px-6 bg-[#050505] flex flex-col items-center justify-center text-center min-h-[60vh]">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6 animate-slide-up-fade whitespace-pre-line">
            {config.hero.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
            {config.hero.subtitle}
          </p>
      </section>
      
      <section className="pb-24 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Dynamic Contact Info */}
            <div className="lg:col-span-5 space-y-16">
              
              <div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-none tracking-tight">{config.info.heading}</h2>
                 <p className="text-gray-400 text-lg mb-8">{config.info.subheading}</p>
                 
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
                      href={config.info.booking_link} 
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
                      <a href={`mailto:${config.info.email}`} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{config.info.email}</span>
                      </a>
                      
                      <a href={`tel:${config.info.phone}`} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{config.info.phone}</span>
                      </a>

                      <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{config.info.address}</span>
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

            {/* Right Column: Dynamic Form */}
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
                            {config.form_fields.map((field, idx) => (
                                <div 
                                    key={field.id || idx} 
                                    className={`space-y-2 ${field.width === 'full' ? 'md:col-span-2' : 'md:col-span-1'}`}
                                >
                                    <label className="text-sm font-medium text-gray-400">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    
                                    {field.type === 'select' ? (
                                        <div className="relative">
                                            <select 
                                                name={field.key}
                                                value={formData[field.key] || ''}
                                                onChange={handleInputChange}
                                                required={field.required}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select an option</option>
                                                {field.options?.map((opt, i) => (
                                                    <option key={i} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    ) : field.type === 'textarea' ? (
                                        <textarea 
                                            name={field.key}
                                            value={formData[field.key] || ''}
                                            onChange={handleInputChange}
                                            required={field.required}
                                            rows={4} 
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                            placeholder={field.placeholder}
                                        ></textarea>
                                    ) : (
                                        <input 
                                            name={field.key}
                                            value={formData[field.key] || ''}
                                            onChange={handleInputChange}
                                            type={field.type}
                                            required={field.required}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" 
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {submitStatus === 'error' && (
                            <p className="text-red-400 text-sm animate-fade-in">{errorMessage}</p>
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

      {/* Magnetic Marquee CTA */}
      <section 
        ref={footerSectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="py-32 md:py-48 bg-black relative overflow-hidden flex items-center justify-center border-t border-white/5 cursor-default"
      >
        <div className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-8 select-none pointer-events-none opacity-20">
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

        <div 
             className="relative z-10 transition-transform duration-100 ease-out"
             style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
        >
             <a 
               href={`mailto:${config.info.email}`} 
               className="flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple text-white shadow-[0_0_60px_rgba(255,107,74,0.4)] hover:shadow-[0_0_100px_rgba(185,109,243,0.6)] hover:scale-105 transition-all duration-300 group text-center p-8"
             >
                <span className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">Get In Touch</span>
                <span className="text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">{config.info.email}</span>
             </a>
        </div>
      </section>

      {/* Dynamic FAQ Section with Accordion Style */}
      {faqs.length > 0 && (
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
                    <a href={`mailto:${config.info.email}`} className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-orange transition-colors group">
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
      )}
    </>
  );
};
