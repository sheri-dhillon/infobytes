import React from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="Ready to start your next project? We're here to help you achieve your digital goals." 
      />
      
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                <p className="text-gray-400 mb-8">
                  Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Email</div>
                      <div className="text-gray-400">hello@soale.studio</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Phone</div>
                      <div className="text-gray-400">+1 (555) 000-0000</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
                </div>

                <Button className="w-full justify-between group">
                  Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};