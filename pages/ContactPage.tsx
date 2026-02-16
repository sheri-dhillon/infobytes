
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, Plus, Minus, Loader2, CheckCircle } from 'lucide-react';
import { Seo } from '../components/Seo';
import { FAQ_CONTENT, buildFaqPageJsonLd } from '../components/FAQ';

const STATIC_CONTACT_CONFIG = {
    hero: {
        title: "Start your journey to predictable revenue.",
        subtitle: "Whether you’re looking to migrate to Klaviyo, optimize your Omnisend flows, or audit your entire retention lifecycle, our experts are ready to build your engine."
    },
    info: {
        heading: "LET'S CHAT",
        subheading: "Let's bring your vision to life.",
        email: "hello@infobytes.io",
        phone: "+1 (555) 000-0000",
        address: "123 Design Street, Creative City, NY 10012",
        booking_link: "https://calendly.com/shehryar-infobytes/30min"
    },
    form_fields: [
      { id: "1", key: "first_name", label: "First Name", type: "text", width: "half", required: true, placeholder: "John" },
      { id: "2", key: "last_name", label: "Last Name", type: "text", width: "half", required: true, placeholder: "Doe" },
      { id: "3", key: "email", label: "Email", type: "email", width: "full", required: true, placeholder: "john@example.com" },
      { id: "4", key: "company_name", label: "Company Name", type: "text", width: "half", required: false, placeholder: "Acme Inc." },
      { id: "5", key: "mobile_number", label: "Mobile Number", type: "tel", width: "half", required: false, placeholder: "+1 (555) 000-0000" },
      {
        id: "6",
        key: "project_goal",
        label: "Project Goal",
        type: "select",
        width: "full",
        required: true,
        options: [
          "Klaviyo Setup/Migration",
          "Omnisend Strategy",
          "Full Lifecycle Automation",
          "Email & SMS Audit"
        ]
      },
      {
        id: "7",
        key: "monthly_store_revenue",
        label: "Monthly Store Revenue",
        type: "select",
        width: "half",
        required: true,
        options: ["Under $20k", "$20k - $100k", "$100k+"]
      },
      {
        id: "8",
        key: "current_platform",
        label: "Current Platform",
        type: "select",
        width: "half",
        required: true,
        options: ["Klaviyo", "Omnisend", "Mailchimp", "Other"]
      },
      { id: "9", key: "project_details", label: "Project Details", type: "textarea", width: "full", required: true, placeholder: "Tell us about your retention goals, current setup, and what you'd like us to audit..." }
    ]
};

const TRUST_BRANDS = [
  { name: 'Fritz und Frei' },
  { name: 'GeniusPack' },
  { name: 'ObjectsHQ' },
  { name: 'Zyron Tech' }
];

const FORM_STEPS = [
  {
    id: 1,
    title: 'Basic Information',
    fieldKeys: ['first_name', 'last_name', 'email']
  },
  {
    id: 2,
    title: 'Business Details',
    fieldKeys: ['company_name', 'mobile_number', 'project_goal']
  },
  {
    id: 3,
    title: 'Project Context',
    fieldKeys: ['monthly_store_revenue', 'current_platform', 'project_details']
  }
];

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export const ContactPage: React.FC = () => {
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACd9k8squSr31WmB';

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Dynamic Form State
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [stepMessage, setStepMessage] = useState('');
  const currentStepConfig = FORM_STEPS[currentStep - 1];
  const isFinalStep = currentStep === FORM_STEPS.length;

  // Magnetic button logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const footerSectionRef = useRef<HTMLElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (document.querySelector('script[data-turnstile-script="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-turnstile-script', 'true');
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isFinalStep) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;

    const intervalId = window.setInterval(() => {
      const turnstileApi = window.turnstile;
      const container = turnstileContainerRef.current;

      if (!turnstileApi?.render || !container || turnstileWidgetIdRef.current) {
        attempts += 1;
        if (attempts >= maxAttempts) {
          window.clearInterval(intervalId);
        }
        return;
      }

      container.innerHTML = '';
      turnstileWidgetIdRef.current = turnstileApi.render(container, {
        sitekey: turnstileSiteKey,
        theme: 'dark'
      });
      window.clearInterval(intervalId);
    }, 150);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isFinalStep, turnstileSiteKey]);

  useEffect(() => {
    if (isFinalStep) {
      return;
    }

    const widgetId = turnstileWidgetIdRef.current;
    if (widgetId && window.turnstile?.remove) {
      window.turnstile.remove(widgetId);
      turnstileWidgetIdRef.current = null;
    }
  }, [isFinalStep]);

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
    setStepMessage('');
  };

  const visibleFields = STATIC_CONTACT_CONFIG.form_fields.filter((field: any) =>
    currentStepConfig.fieldKeys.includes(field.key)
  );

  const validateStep = (stepNumber: number) => {
    const stepConfig = FORM_STEPS[stepNumber - 1];
    const requiredStepFields = STATIC_CONTACT_CONFIG.form_fields.filter(
      (field: any) => stepConfig.fieldKeys.includes(field.key) && field.required
    );

    const firstMissing = requiredStepFields.find((field: any) => !String(formData[field.key] || '').trim());
    return firstMissing ? firstMissing.label : null;
  };

  const handleNextStep = () => {
    const missingLabel = validateStep(currentStep);
    if (missingLabel) {
      setStepMessage(`Please fill ${missingLabel} before continuing.`);
      return;
    }

    setStepMessage('');
    setSubmitStatus('idle');
    setSubmitMessage('');
    setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length));
  };

  const handleBackStep = () => {
    setStepMessage('');
    setSubmitStatus('idle');
    setSubmitMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFinalStep) {
      return;
    }

    const formElement = e.currentTarget as HTMLFormElement;
    const formPayload = new FormData(formElement);
    const turnstileToken = String(formPayload.get('cf-turnstile-response') || '');

    const payload = STATIC_CONTACT_CONFIG.form_fields.reduce<Record<string, string>>((acc, field: any) => {
      const stateValue = String(formData[field.key] || '').trim();
      const formValue = String(formPayload.get(field.key) || '').trim();
      acc[field.key] = formValue || stateValue;
      return acc;
    }, {});

    const missingField = STATIC_CONTACT_CONFIG.form_fields.find(
      (field: any) => field.required && !String(payload[field.key] || '').trim()
    );

    if (missingField) {
      const stepForField = FORM_STEPS.find((step) => step.fieldKeys.includes(missingField.key));
      if (stepForField) {
        setCurrentStep(stepForField.id);
      }
      setStepMessage(`Please fill ${missingField.label} before submitting.`);
      return;
    }

    if (!turnstileToken) {
      setSubmitStatus('error');
      setSubmitMessage('Please complete bot verification before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const formRowsText = STATIC_CONTACT_CONFIG.form_fields
        .map((field: any) => `${field.label}: ${payload[field.key] || 'N/A'}`)
        .join('\n');

      const mailtoUrl = `mailto:shehryar@infobytes.io?subject=${encodeURIComponent('New Brand Inquiry Received')}&body=${encodeURIComponent(formRowsText)}`;
      window.location.href = mailtoUrl;

      setSubmitStatus('success');
      setSubmitMessage('Your email client was opened with your inquiry details. Please send the email to complete submission.');
      setFormData({});
      setStepMessage('');
      setCurrentStep(1);
      window.turnstile?.reset(turnstileWidgetIdRef.current || undefined);
    } catch (error) {
      console.error('Contact form submit failed:', error);
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        jsonLdId="infobytes-contactpage-schema"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact INFOBYTES - Schedule Your Revenue Audit',
          description:
            'Contact the INFOBYTES team to discuss your Klaviyo or Omnisend retention strategy and schedule a free revenue audit.',
          url: 'https://infobytes.io/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'INFOBYTES',
            contactPoint: {
              '@type': 'ContactPoint',
              email: STATIC_CONTACT_CONFIG.info.email,
              contactType: 'sales',
              availableLanguage: 'English'
            }
          }
        }}
      />
      <Seo jsonLdId="infobytes-contact-faq-schema" jsonLd={buildFaqPageJsonLd()} />
      {/* Dynamic Hero Section */}
      <section className="pt-40 pb-16 md:pt-56 md:pb-24 px-6 bg-[#050505] flex flex-col items-center justify-center text-center min-h-[60vh]">
          <div className="w-full max-w-[56rem] lg:max-w-[62rem] mx-auto relative z-20 text-center">
            <h1
              className="text-[clamp(2.1rem,4vw,4.8rem)] leading-[0.95] font-serif italic text-white mb-3 animate-slide-up-fade"
              style={{ animationDelay: '0ms' }}
            >
              Start your journey to
            </h1>
            <h2
              className="text-[clamp(3.1rem,6.8vw,6.9rem)] leading-[0.92] md:leading-[0.9] font-black tracking-tighter text-white mix-blend-overlay opacity-90 animate-slide-up-fade"
              style={{ animationDelay: '100ms' }}
            >
              predictable revenue.
            </h2>
          </div>
          <p className="mt-6 md:mt-8 text-gray-400 text-lg md:text-xl animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
            {STATIC_CONTACT_CONFIG.hero.subtitle}
          </p>
      </section>
      
      <section className="pb-24 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Dynamic Contact Info */}
            <div className="lg:col-span-5 space-y-16">
              
              <div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-none tracking-tight">{STATIC_CONTACT_CONFIG.info.heading}</h2>
                 <p className="text-gray-400 text-lg mb-8">{STATIC_CONTACT_CONFIG.info.subheading}</p>
                 
                 {/* Booking Card */}
                 <div className="bg-[#111] rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8 border border-white/10">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80" alt="Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    
                    <div className="mb-10">
                      <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-[0.95] font-serif italic text-white mb-2 tracking-tight">
                        Book Your Free
                      </h3>
                      <h4 className="text-[clamp(2.1rem,4vw,3.2rem)] leading-[0.9] font-black tracking-tighter text-white mix-blend-overlay opacity-90">
                        Revenue Audit
                      </h4>
                    </div>
                    
                    <a 
                      href={STATIC_CONTACT_CONFIG.info.booking_link} 
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
                      <a href={`mailto:${STATIC_CONTACT_CONFIG.info.email}`} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{STATIC_CONTACT_CONFIG.info.email}</span>
                      </a>
                      
                      <a href={`tel:${STATIC_CONTACT_CONFIG.info.phone}`} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{STATIC_CONTACT_CONFIG.info.phone}</span>
                      </a>

                      <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all border border-white/10 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{STATIC_CONTACT_CONFIG.info.address}</span>
                      </div>
                   </div>
                </div>

              </div>

            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-7">
               <div className="bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-white/10 sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-8">Schedule Your Revenue Audit</h3>
                  
                  {submitStatus === 'success' ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-fade-in">
                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                              <CheckCircle className="w-8 h-8" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                          <p className="text-gray-400">{submitMessage || 'Thank you for reaching out. We will get back to you shortly.'}</p>
                          <button 
                            onClick={() => {
                              setSubmitStatus('idle');
                              setSubmitMessage('');
                              setStepMessage('');
                              setCurrentStep(1);
                            }}
                            className="mt-6 text-brand-orange hover:text-white font-medium transition-colors"
                          >
                            Send another message
                          </button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                            Step {currentStep} of {FORM_STEPS.length}
                          </div>
                          <div className="mt-1 text-sm font-medium text-white">{currentStepConfig.title}</div>
                          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-white transition-all duration-300"
                              style={{ width: `${(currentStep / FORM_STEPS.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {visibleFields.map((field: any, idx: number) => (
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
                                                {field.options?.map((opt: string, i: number) => (
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

                        {isFinalStep && (
                          <div
                            ref={turnstileContainerRef}
                            className="min-h-[65px]"
                          ></div>
                        )}

                        {stepMessage && (
                          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                            {stepMessage}
                          </div>
                        )}

                        {submitStatus === 'error' && (
                          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                            {submitMessage || 'Message could not be sent. Please try again.'}
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          {currentStep > 1 && (
                            <button
                              type="button"
                              onClick={handleBackStep}
                              className="px-5 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition-colors"
                            >
                              Back
                            </button>
                          )}

                          {isFinalStep ? (
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 justify-between group py-4 text-base disabled:opacity-50"
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
                          ) : (
                            <Button
                              type="button"
                              onClick={handleNextStep}
                              className="flex-1 justify-between group py-4 text-base"
                            >
                              Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          )}
                        </div>

                        {/* Trust Bar */}
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-sm font-semibold text-white">
                            You're in good company. Join 150+ brands scaling with INFOBYTES.
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {TRUST_BRANDS.map((brand) => (
                              <div
                                key={brand.name}
                                className="px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-xs font-bold tracking-widest uppercase text-gray-400"
                                aria-label={brand.name}
                                title={brand.name}
                              >
                                {brand.name}
                              </div>
                            ))}
                          </div>
                        </div>
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
               href={`mailto:${STATIC_CONTACT_CONFIG.info.email}`} 
               className="flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple text-white shadow-[0_0_60px_rgba(255,107,74,0.4)] hover:shadow-[0_0_100px_rgba(185,109,243,0.6)] hover:scale-105 transition-all duration-300 group text-center p-8"
             >
                <span className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">Get In Touch</span>
                <span className="text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">{STATIC_CONTACT_CONFIG.info.email}</span>
             </a>
        </div>
      </section>

      {/* Dynamic FAQ Section with Accordion Style */}
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
                    <a href={`mailto:${STATIC_CONTACT_CONFIG.info.email}`} className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-orange transition-colors group">
                        Email our team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                </div>

                {/* Accordion / Right Side */}
                <div className="lg:col-span-8">
                <div className="divide-y divide-white/10">
                    {FAQ_CONTENT.items.map((faq, idx) => (
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
