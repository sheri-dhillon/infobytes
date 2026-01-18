import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [source, setSource] = useState('');

  return (
    <>
      {/* Custom Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 bg-[#050505] flex flex-col items-center justify-center text-center min-h-[60vh]">
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
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">First Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Last Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email</label>
                      <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Company Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Mobile Number</label>
                        <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Project Budget</label>
                      <div className="relative">
                        <select className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer">
                            <option value="" disabled selected>Select a range</option>
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
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                            onChange={(e) => setSource(e.target.value)}
                            value={source}
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
                    
                    {source === 'Others' && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-gray-400">Please specify</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="e.g. Podcast, Event..." />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Project Details</label>
                      <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Tell us about your project goals, timeline, and requirements..."></textarea>
                    </div>

                    <Button className="w-full justify-between group py-4 text-base">
                      Send Inquiry <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
               </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};