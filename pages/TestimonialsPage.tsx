import React from 'react';
import { PageHero } from '../components/PageHero';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  // Category: Email Marketing & Automation
  {
    quote: "Working with this team changed our entire retention strategy. They didn't just set up email flows; they built a high-converting revenue engine.",
    name: "Jonas Wadel",
    role: "Founder, E-com Collective",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "The communication was exceptional. They took our messy email list and turned it into an automated profit center.",
    name: "Thomas Poppa",
    role: "Marketing Director",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "Simply the best. They mapped out our entire customer journey and implemented flows that actually feel personal to our users.",
    name: "Brittany Miller",
    role: "CEO, Glow Brands",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "Exceptional work! They simplified a very complex automation task for us. Their knowledge of email deliverability is top-tier.",
    name: "Edward Sullivan",
    role: "Operations Manager",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "They built a lifecycle marketing system that works while we sleep. It's rare to find an agency that understands both creative and data.",
    name: "Dionne Richards",
    role: "Founder, Lifestyle Co.",
    service: "Email Marketing & Automation",
    stars: 5
  },

  // Category: Web Design & Development
  {
    quote: "Our new site is lightning fast and looks incredible. They engineered a web experience that improved our conversion rate by 40%.",
    name: "Muhammad Afzaal",
    role: "Tech Lead",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "They handled our complex web development needs with total ease. Even when we ran into heavy workloads, they remained professional.",
    name: "Uzma Khan",
    role: "Creative Director",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "They didn't just build a website; they built a digital storefront that sells. Speed, SEO, and style—they nailed it all.",
    name: "Daniel Townes",
    role: "Startup Founder",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "Great and fast! They turned our outdated site into a modern, responsive powerhouse. The code is remarkably clean.",
    name: "Sarah Pointer",
    role: "E-commerce Manager",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "Communication was great, but the final build was even better. They have a unique ability to blend technical development with design.",
    name: "Brooklyn Wilson",
    role: "Managing Partner",
    service: "Web Design & Development",
    stars: 5
  },

  // Category: UI/UX Design
  {
    quote: "The UI/UX work was transformative. They identified friction points we didn't even know existed and redesigned our user flow.",
    name: "Marcus Sterling",
    role: "Head of Product",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "They have a deep understanding of human-centric design. Our new interface isn't just beautiful; it's functional.",
    name: "Elena Vance",
    role: "App Founder",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "Highly professional design process. From wireframes to high-fidelity prototypes, every step was handled with precision.",
    name: "Julian Thorne",
    role: "CEO, Fintech Solutions",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "They took our rough ideas and polished them into a high-end user experience. Attention to detail is what sets them apart.",
    name: "Sarah Jenkins",
    role: "Marketing Lead",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "The UI/UX strategy they delivered helped us secure our next round of funding. Investors were blown away.",
    name: "Robert Chen",
    role: "CTO",
    service: "UI/UX Design",
    stars: 5
  },

  // Category: iOS App Development
  {
    quote: "The technical precision of our iOS app is outstanding. It’s fast, stable, and follows all of Apple’s latest HIG standards.",
    name: "David Rossi",
    role: "Founder, HealthTech App",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "Working with this team on our native iOS app was the best decision we made. The technical execution was flawless.",
    name: "Lisa Kensington",
    role: "Product Manager",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "Clean code, great architecture, and a beautiful front-end. Our app is scaling perfectly, and user feedback is 100% positive.",
    name: "Michael Park",
    role: "Tech Entrepreneur",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "They delivered our iOS project ahead of schedule and with zero bugs. Their ability to solve complex technical problems is impressive.",
    name: "Karen Wu",
    role: "Director of Innovation",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "From initial consultation to the App Store launch, the journey was perfect. They are strategic partners who care.",
    name: "Alex Turner",
    role: "Founder, Social Ventures",
    service: "iOS App Development",
    stars: 5
  }
];

export const TestimonialsPage: React.FC = () => {
  // Group testimonials by service
  const groupedData = testimonials.reduce((acc, curr) => {
    if (!acc[curr.service]) {
      acc[curr.service] = [];
    }
    acc[curr.service].push(curr);
    return acc;
  }, {} as Record<string, typeof testimonials>);

  const services = Object.keys(groupedData);

  return (
    <>
      <PageHero 
        title="Client Reviews" 
        subtitle="Don't just take our word for it. See how we've helped founders and brands scale their digital presence." 
      />
      
      <div className="bg-black pb-32 overflow-hidden">
        {services.map((service, index) => (
          <div key={service} className="mb-20">
            {/* Service Header */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
               <div className="flex items-center gap-4">
                 <div className="h-px w-12 bg-white/20"></div>
                 <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">{service}</h2>
                 <div className="h-px flex-1 bg-white/20"></div>
               </div>
            </div>

            {/* Marquee Row */}
            <div className="relative flex overflow-hidden">
               {/* Gradients to fade edges */}
               <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
               <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

               <div className={`flex gap-6 min-w-full shrink-0 ${index % 2 === 0 ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
                  {/* We duplicate the array 3 times to ensure smooth infinite loop */}
                  {[...groupedData[service], ...groupedData[service], ...groupedData[service]].map((t, i) => (
                    <div 
                      key={i} 
                      className="w-[350px] md:w-[450px] bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shrink-0 hover:border-white/30 hover:bg-white/5 transition-all duration-300 relative group"
                    >
                       <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-brand-orange/20 transition-colors" />
                       
                       <div className="flex gap-1 mb-4">
                         {[...Array(5)].map((_, starIdx) => (
                           <Star key={starIdx} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                         ))}
                       </div>
                       
                       <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                         "{t.quote}"
                       </p>

                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                             <div className="text-white font-bold text-sm">{t.name}</div>
                             <div className="text-xs text-gray-500">{t.role}</div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};