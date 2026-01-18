import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [source, setSource] = useState('');

  return (
    <>
      {/* Custom Hero Section matching screenshot */}
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
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Get in touch</h3>
                <p className="text-gray-400 mb-8">
                  Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/10">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Email</div>
                      <div className="text-gray-400">hello@infobytes.io</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/10">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Phone</div>
                      <div className="text-gray-400">+1 (555) 000-0000</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Office</div>
                      <div className="text-gray-400">123 Design Street, Creative City, NY 10012</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">First Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Last Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Company Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Mobile Number</label>
                    <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Project Budget</label>
                  <div className="relative">
                    <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer">
                        <option value="" disabled selected>Select a range</option>
                        <option value="less_1000">Less than $1,000</option>
                        <option value="1000_2000">$1,000 - $2,000</option>
                        <option value="2000_3000">$2,000 - $3,000</option>
                        <option value="3000_plus">$3,000+</option>
                        <option value="unknown">Don't know</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Where did you hear about us?</label>
                  <div className="relative">
                    <select 
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
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
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {source === 'Others' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-sm font-medium text-gray-400">Please specify</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="e.g. Podcast, Event..." />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Project Details</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Tell us about your project goals, timeline, and requirements..."></textarea>
                </div>

                <Button className="w-full justify-between group">
                  Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};