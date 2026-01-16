import React from 'react';
import { PageHero } from '../components/PageHero';

export const BlogPage: React.FC = () => {
  const posts = [
    { title: "The Future of AI in Design", category: "Thought Leadership", date: "Oct 24, 2024", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80" },
    { title: "Scaling Your SaaS Product", category: "Growth", date: "Oct 12, 2024", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
    { title: "Building a Design System", category: "Engineering", date: "Sep 28, 2024", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" },
    { title: "Minimalism in 2025", category: "Design", date: "Sep 15, 2024", img: "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?auto=format&fit=crop&w=600&q=80" },
    { title: "React vs Vue: A Comparison", category: "Development", date: "Aug 30, 2024", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80" },
    { title: "The Art of Typography", category: "Design", date: "Aug 12, 2024", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <>
      <PageHero 
        title="Insights & Articles" 
        subtitle="Thoughts, trends, and strategies from our team of digital experts." 
      />
      
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gray-900 border border-white/5 relative">
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight mb-3">{post.title}</h3>
                <div className="text-sm font-medium text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-purple-500 transition-all">Read Article</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};