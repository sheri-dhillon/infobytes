import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-black relative" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex -space-x-2 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                   <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] text-white">
                +150
              </div>
            </div>

            <div className="text-brand-text text-sm mb-4">
              Trusted by 150+ Global eCommerce Brands
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold mb-6 leading-tight">
              Retention with Intent.<br />
              Scaled for Profit.
            </h2>
            <p className="text-brand-text text-base md:text-lg mb-10 max-w-md">
              We bridge the gap between expensive customer acquisition and long-term brand loyalty. As a dedicated retention marketing agency, we don't just send newsletters—we architect high-performance email marketing automation systems. Whether we are auditing your Klaviyo email marketing or engineering a multi-channel Omnisend SMS marketing strategy, our focus remains on one thing: your bottom line.
            </p>

            <div className="flex gap-12 mb-10">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">$50M+</div>
                <div className="text-xs md:text-sm text-brand-text">In Retention Revenue Generated</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs md:text-sm text-brand-text">High-Converting Flows Launched</div>
              </div>
            </div>

            <button className="group relative px-6 py-3 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,107,74,0.3)] hover:shadow-[0_0_30px_rgba(185,109,243,0.4)] font-bold text-sm tracking-wide">
              The INFOBYTES Blueprint
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-card p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 mix-blend-overlay"></div>

                {/* Dashboard-style content (replaces image) */}
                <div className="relative rounded-xl w-full h-[400px] md:h-[500px] bg-black/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

                  <div className="relative h-full w-full p-4 md:p-6 flex flex-col gap-4 pb-24">
                    {/* Sales performance */}
                    <div className="glass-card rounded-xl p-4 md:p-5">
                      <div className="text-xs text-brand-text mb-3">Sales performance</div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                        <div>
                          <div className="text-xs text-brand-text">Revenue from Omnisend</div>
                          <div className="text-2xl md:text-3xl font-bold text-white mt-1">
                            €235,969.54 <span className="text-sm text-brand-text font-medium">(+72.9%)</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                              <div className="text-[11px] text-brand-text">Campaigns</div>
                              <div className="text-lg md:text-xl font-semibold text-white">€17,518.01</div>
                            </div>
                            <div>
                              <div className="text-[11px] text-brand-text">Automation</div>
                              <div className="text-lg md:text-xl font-semibold text-white">€218,451.53</div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="text-[11px] text-brand-text">Total store revenue</div>
                            <div className="text-lg md:text-xl font-semibold text-white">€451,421.07</div>
                          </div>
                        </div>

                        {/* Simple bar + line chart */}
                        <div className="relative h-40 md:h-44">
                          <div className="absolute inset-0 grid grid-rows-3 gap-0">
                            <div className="border-t border-white/5" />
                            <div className="border-t border-white/5" />
                            <div className="border-t border-white/5" />
                          </div>
                          <div className="absolute inset-0 flex items-end gap-2 px-2 pb-2">
                            {[10, 35, 42, 60, 38, 70, 55, 85].map((h, idx) => (
                              <div
                                key={idx}
                                className="flex-1 rounded-sm bg-emerald-300/50"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 50"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M 5 40 L 18 28 L 30 26 L 42 18 L 55 30 L 67 14 L 80 22 L 95 10"
                              fill="none"
                              stroke="rgba(255,255,255,0.55)"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Contacts */}
                    <div className="glass-card rounded-xl p-4 md:p-5 flex-1 flex flex-col justify-between">
                      <div className="text-xs text-brand-text mb-4">Contacts</div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-[11px] text-brand-text">Total contacts</div>
                          <div className="text-lg md:text-xl font-semibold text-white">11.3K</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-brand-text">Email subscribers</div>
                          <div className="text-lg md:text-xl font-semibold text-white">4,260</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-brand-text">SMS subscribers</div>
                          <div className="text-lg md:text-xl font-semibold text-white">461</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-brand-text">Push notification subscribers</div>
                          <div className="text-lg md:text-xl font-semibold text-white">1,517</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};