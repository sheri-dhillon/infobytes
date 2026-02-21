import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, MapPin, Clock, Briefcase, Loader2, DollarSign, Globe, Award, X, Maximize2 } from 'lucide-react';
import { HeroHeading } from '../components/ui/HeroHeading';
import { Link, useNavigate } from 'react-router-dom';

interface JobOpening {
  id: number;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  status: 'active' | 'inactive';
  salary_range: string;
  timezone: string;
  experience: string;
}

// Airtable Configuration
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;

// Helper function to truncate text (strips HTML/markdown for preview)
const truncateText = (text: string, maxLength: number): string => {
  // Remove markdown formatting for plain text preview
  const plainText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
};

// Helper function to convert markdown-style text to HTML
const parseMarkdownToHtml = (text: string): string => {
  if (!text) return '';
  
  let html = text;
  
  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em> (but not inside strong tags)
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  
  // Check if text contains numbered list pattern (1. followed by 2. etc)
  const hasNumberedList = /\d+\.\s+.+\d+\.\s+/.test(html);
  
  if (hasNumberedList) {
    // Use regex to find all numbered items and split the text
    // Match pattern: number followed by period and space, then content until next number or end
    const numberedItemRegex = /(\d+)\.\s+([^]*?)(?=\s*\d+\.\s+|$)/g;
    const introMatch = html.match(/^(.*?)(?=\s*1\.\s+)/s);
    const introText = introMatch ? introMatch[1].trim() : '';
    
    const items: string[] = [];
    let match;
    
    while ((match = numberedItemRegex.exec(html)) !== null) {
      const content = match[2].trim();
      if (content) {
        items.push(`<li>${content}</li>`);
      }
    }
    
    let result = '';
    
    // Add intro paragraph if exists
    if (introText) {
      result += `<p>${introText}</p>`;
    }
    
    // Add numbered list
    if (items.length > 0) {
      result += `<ol>${items.join('')}</ol>`;
    }
    
    return result;
  }
  
  // Handle text with line breaks (fallback for non-inline lists)
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for numbered list items (e.g., "1. Item" or "1) Item")
    const numberedMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    
    // Check for bullet points (e.g., "- Item" or "• Item")
    const bulletMatch = line.match(/^[-•]\s+(.+)$/);
    
    if (numberedMatch) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(`<li>${numberedMatch[2]}</li>`);
    } else if (bulletMatch) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(`<li>${bulletMatch[1]}</li>`);
    } else {
      // End of list
      if (inList && listItems.length > 0) {
        processedLines.push(`<ol>${listItems.join('')}</ol>`);
        inList = false;
        listItems = [];
      }
      
      // Regular paragraph
      if (line) {
        processedLines.push(`<p>${line}</p>`);
      }
    }
  }
  
  // Handle any remaining list items
  if (inList && listItems.length > 0) {
    processedLines.push(`<ol>${listItems.join('')}</ol>`);
  }
  
  return processedLines.join('');
};

// Function to fetch jobs from Airtable
const fetchJobs = async (): Promise<JobOpening[]> => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Careers`;
  
  console.log('Fetching jobs from Airtable...');
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error:', response.status, errorText);
      throw new Error(`Airtable API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Airtable response:', data);
    
    // Map Airtable records to JobOpening format
    const jobs = (data.records || []).map((record: any, index: number) => ({
      id: record.fields.id || index + 1,
      title: record.fields.title || '',
      type: record.fields.type || '',
      location: record.fields.location || '',
      department: record.fields.department || '',
      description: record.fields.description || '',
      status: (record.fields.status || 'inactive').toLowerCase() as 'active' | 'inactive',
      salary_range: record.fields.salary_range || '',
      timezone: record.fields.timezone || '',
      experience: record.fields.experience || '',
    })).filter((job: JobOpening) => job.title);
    
    console.log('Parsed jobs:', jobs);
    return jobs;
    
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

const STATIC_CONFIG = {
  hero: {
    pills: ['Remote-First', 'Growth Culture', 'Competitive Pay', 'Learning & Development'],
    title_line1: "Build Your Career",
    title_line2: "With Us.",
    description: "Join a team of passionate marketers, strategists, and creatives who are redefining retention marketing for eCommerce brands worldwide.",
  },
  perks: [
    { icon: MapPin, title: "Remote-First", description: "Work from anywhere in the world. We believe great talent isn't limited by location." },
    { icon: Clock, title: "Flexible Hours", description: "We focus on results, not hours. Manage your own schedule and maintain work-life balance." },
    { icon: Briefcase, title: "Growth Path", description: "Clear career progression with mentorship, learning budgets, and promotion opportunities." },
  ],
  culture: {
    title: "Why Join INFOBYTES?",
    points: [
      "Work with exciting eCommerce brands generating millions in revenue",
      "Collaborative, no-ego environment where ideas are valued",
      "Continuous learning with access to courses and certifications",
      "Competitive compensation with performance bonuses",
      "Annual team retreats and virtual team-building events"
    ]
  }
};

export const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedJob(null), 300);
  };

  const handleApply = () => {
    if (selectedJob) {
      closeModal();
      // Create URL-friendly slug from job title
      const slug = selectedJob.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      navigate(`/careers/apply/${slug}`);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
      setLoading(false);
    };
    
    loadJobs();
  }, []);

  return (
    <>
      {/* Styles for rich text job description */}
      <style>{`
        .job-description-content ul,
        .job-description-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .job-description-content ul {
          list-style-type: disc;
        }
        .job-description-content ol {
          list-style-type: decimal;
        }
        .job-description-content li {
          margin-bottom: 0.5rem;
          color: #9ca3af;
        }
        .job-description-content p {
          margin-bottom: 1rem;
        }
        .job-description-content h1,
        .job-description-content h2,
        .job-description-content h3,
        .job-description-content h4 {
          color: white;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .job-description-content h1 { font-size: 1.5rem; }
        .job-description-content h2 { font-size: 1.25rem; }
        .job-description-content h3 { font-size: 1.125rem; }
        .job-description-content strong,
        .job-description-content b {
          color: white;
          font-weight: 600;
        }
        .job-description-content a {
          color: #f97316;
          text-decoration: underline;
        }
        .job-description-content a:hover {
          color: #fb923c;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] w-full flex flex-col bg-brand-dark overflow-hidden">
        
        {/* Background Fluid Gradient */}
        <div className="absolute top-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[60vh] md:h-[80vh] bg-gradient-to-bl from-green-500 via-emerald-600 to-transparent opacity-30 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col flex-grow justify-center pt-40 md:pt-52 pb-16">
          
          {/* Floating Pills */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 animate-slide-up-fade justify-center">
            {STATIC_CONFIG.hero.pills.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs font-medium text-gray-300 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>

          {/* Hero Heading - Centered */}
          <div className="w-full max-w-[56rem] lg:max-w-[62rem] mx-auto text-center">
            <HeroHeading
              pre={STATIC_CONFIG.hero.title_line1}
              main={STATIC_CONFIG.hero.title_line2}
              align="center"
              className="mb-6 animate-slide-up-fade"
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-10 leading-relaxed animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
            {STATIC_CONFIG.hero.description}
          </p>

          {/* CTA Button */}
          <div className="w-full flex justify-center relative z-30 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <a
              href="#openings"
              className="group relative px-5 py-2.5 md:px-7 md:py-3.5 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center gap-3 md:gap-4 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_40px_rgba(185,109,243,0.4)]"
            >
              <span className="font-bold text-sm md:text-base">View Open Positions</span>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* Perks Section */}
      <section className="bg-black py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {STATIC_CONFIG.perks.map((perk, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-purple/20 flex items-center justify-center mb-6">
                  <perk.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{perk.title}</h3>
                <p className="text-gray-400 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-[#080808] py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{STATIC_CONFIG.culture.title}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {STATIC_CONFIG.culture.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="bg-black py-20 md:py-28 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-4 block">Open Positions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Join Our Growing Team</h2>
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-brand-orange animate-spin mb-4" />
                <p className="text-gray-400">Loading open positions...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400">No open positions at the moment. Check back soon!</p>
              </div>
            ) : jobs.map((job) => {
              const isActive = job.status === 'active';
              
              return isActive ? (
                <button
                  key={job.id}
                  onClick={() => openModal(job)}
                  className="group p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-left w-full"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-white text-lg md:text-xl font-bold">{job.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-medium">{job.department}</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Hiring</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{truncateText(job.description, 250)}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        {job.experience && (
                          <span className="flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            {job.experience}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all flex-shrink-0">
                      <Maximize2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </button>
              ) : (
                <div
                  key={job.id}
                  className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] opacity-60 cursor-not-allowed"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-gray-500 text-lg md:text-xl font-bold">{job.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-500 text-xs font-medium">{job.department}</span>
                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400/70 text-xs font-medium">Closed</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{truncateText(job.description, 250)}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        {job.experience && (
                          <span className="flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            {job.experience}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center flex-shrink-0">
                      <Maximize2 className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* General Application */}
          <div className="mt-12 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent text-center">
            <Mail className="w-10 h-10 text-brand-orange mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Don't see your role?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.</p>
            <a
              href="mailto:careers@infobytes.io?subject=General Application"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Send Your Resume
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Modal Content */}
        <div 
          className={`relative w-full max-w-2xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col transform transition-all duration-300 ${
            isModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
          }`}
        >
          {selectedJob && (
            <>
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-medium">{selectedJob.department}</span>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Hiring</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedJob.title}</h2>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-white mb-3">About This Role</h3>
                  <div 
                    className="text-gray-400 leading-relaxed job-description-content"
                    dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(selectedJob.description) }}
                  />
                </div>

                {/* Apply Button */}
                <div className="mt-8">
                  <button
                    onClick={handleApply}
                    className="w-full group relative px-6 py-4 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_40px_rgba(185,109,243,0.4)]"
                  >
                    <span className="font-bold text-base">Apply for This Role</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-white/10 bg-white/[0.02]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Job Type</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-brand-orange" />
                      {selectedJob.type}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Location</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-orange" />
                      {selectedJob.location}
                    </span>
                  </div>
                  {selectedJob.salary_range && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Salary (PKR)</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-4 h-4 text-brand-orange text-xs font-bold flex items-center justify-center">₨</span>
                        {selectedJob.salary_range}
                      </span>
                    </div>
                  )}
                  {selectedJob.timezone && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Timezone</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 text-brand-orange" />
                        {selectedJob.timezone}
                      </span>
                    </div>
                  )}
                  {selectedJob.experience && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Experience</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-orange" />
                        {selectedJob.experience}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
