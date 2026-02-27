import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Globe,
  Award,
  Loader2,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useJob, createJobSlug } from '../hooks/useJobs';

// Redirect URL after form submission (will be updated later)
const INTERVIEW_REDIRECT_URL = '#!';

// Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACjfmGW_Yt9s_jaf';

// Turnstile type declaration
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

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

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  currentStatus: string;
  applyingForRole: string;
  resume: File | null;
  currentSalary: string;
  expectedSalary: string;
  timezoneComfort: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  currentStatus?: string;
  resume?: string;
  currentSalary?: string;
  expectedSalary?: string;
  timezoneComfort?: string;
}

export const JobApplicationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { job, loading, error } = useJob(slug);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    currentStatus: '',
    applyingForRole: '',
    resume: null,
    currentSalary: '',
    expectedSalary: '',
    timezoneComfort: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  // Load Turnstile script
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

  // Render Turnstile widget when job is loaded
  useEffect(() => {
    if (!job) return;

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
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark'
      });
      window.clearInterval(intervalId);
    }, 150);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [job]);

  // Cleanup Turnstile widget on unmount
  useEffect(() => {
    return () => {
      const widgetId = turnstileWidgetIdRef.current;
      if (widgetId && window.turnstile?.remove) {
        window.turnstile.remove(widgetId);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  // Update applyingForRole when job loads
  useEffect(() => {
    if (job) {
      setFormData(prev => ({ ...prev, applyingForRole: job.title }));
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF file only' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.currentStatus) {
      newErrors.currentStatus = 'Please select your current status';
    }

    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }

    if (!formData.currentSalary.trim()) {
      newErrors.currentSalary = 'Current salary is required';
    }

    if (!formData.expectedSalary.trim()) {
      newErrors.expectedSalary = 'Expected salary is required';
    }

    if (!formData.timezoneComfort) {
      newErrors.timezoneComfort = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Get Turnstile token
    const formElement = e.currentTarget as HTMLFormElement;
    const formPayload = new window.FormData(formElement);
    const turnstileToken = String(formPayload.get('cf-turnstile-response') || '');

    if (!turnstileToken) {
      setTurnstileError('Please complete the security verification.');
      return;
    }

    setTurnstileError(null);
    setIsSubmitting(true);

    try {
      const submitData = new window.FormData();
      submitData.append('cf-turnstile-response', turnstileToken);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('currentStatus', formData.currentStatus);
      submitData.append('applyingForRole', formData.applyingForRole);
      submitData.append('currentSalary', formData.currentSalary);
      submitData.append('expectedSalary', formData.expectedSalary);
      submitData.append('timezoneComfort', formData.timezoneComfort);

      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitData
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        const snippet = text.substring(0, 200);
        console.error('Non-JSON response:', response.status, snippet);
        throw new Error(`Server error (${response.status}). Details: ${snippet.replace(/<[^>]*>?/gm, '').substring(0, 100)}...`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong while submitting.');
      }

      setSubmitSuccess(true);

    } catch (err) {
      console.error('Form submission error:', err);
      setTurnstileError(err instanceof Error ? err.message : 'An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-32">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-brand-orange animate-spin mb-4" />
          <p className="text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-32 px-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
          <p className="text-gray-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-32 px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Application Submitted!</h1>
          <p className="text-gray-400 mb-4">Thank you for applying for the <span className="text-white font-medium">{job.title}</span> position.</p>
          <p className="text-gray-500 text-sm">We have received your resume and our team will review your application shortly.</p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View Other Roles
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="min-h-screen bg-brand-dark pt-40 md:pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Button */}
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left Column - Job Details */}
            <div className="order-2 lg:order-1">
              <div>
                {/* Job Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-medium">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      Hiring
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{job.title}</h1>
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Job Type</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-brand-orange" />
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Location</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-orange" />
                      {job.location}
                    </span>
                  </div>
                  {job.salary_range && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Salary (PKR)</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-4 h-4 text-brand-orange text-xs font-bold flex items-center justify-center">₨</span>
                        {job.salary_range}
                      </span>
                    </div>
                  )}
                  {job.timezone && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Timezone</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 text-brand-orange" />
                        {job.timezone}
                      </span>
                    </div>
                  )}
                  {job.experience && (
                    <div className="flex flex-col gap-1 col-span-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Experience Required</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-orange" />
                        {job.experience}
                      </span>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">About This Role</h2>
                  <div
                    className="text-gray-400 leading-relaxed job-description-content"
                    dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(job.description) }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-32 self-start">
              <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-2">Apply for This Role</h2>
                <p className="text-gray-400 text-sm mb-8">Fill out the form below to submit your application.</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.fullName ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Current Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="currentStatus"
                      value={formData.currentStatus}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.currentStatus ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Select your current status</option>
                      <option value="employed" className="bg-[#0a0a0a]">Employed</option>
                      <option value="unemployed" className="bg-[#0a0a0a]">Unemployed</option>
                      <option value="freelancer" className="bg-[#0a0a0a]">Freelancer</option>
                    </select>
                    {errors.currentStatus && <p className="mt-1 text-sm text-red-500">{errors.currentStatus}</p>}
                  </div>

                  {/* Applying For Role (Disabled) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Applying for Role
                    </label>
                    <input
                      type="text"
                      name="applyingForRole"
                      value={formData.applyingForRole}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Attach Resume (PDF only) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full px-4 py-4 rounded-xl border-2 border-dashed ${errors.resume ? 'border-red-500' : 'border-white/10 hover:border-white/20'} bg-white/[0.02] flex items-center justify-center gap-3 transition-colors group`}
                    >
                      {formData.resume ? (
                        <>
                          <FileText className="w-5 h-5 text-green-500" />
                          <span className="text-gray-300">{formData.resume.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
                          <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Click to upload PDF</span>
                        </>
                      )}
                    </button>
                    {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume}</p>}
                  </div>

                  {/* Current & Expected Salary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Salary (PKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentSalary"
                        value={formData.currentSalary}
                        onChange={handleInputChange}
                        placeholder="e.g. 150,000"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.currentSalary ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors`}
                      />
                      {errors.currentSalary && <p className="mt-1 text-sm text-red-500">{errors.currentSalary}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expected Salary (PKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        placeholder="e.g. 200,000"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${errors.expectedSalary ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors`}
                      />
                      {errors.expectedSalary && <p className="mt-1 text-sm text-red-500">{errors.expectedSalary}</p>}
                    </div>
                  </div>

                  {/* Timezone Comfort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Are you comfortable working in {job.timezone || 'the mentioned'} timezone? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.timezoneComfort === 'yes' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'}`}>
                        <input
                          type="radio"
                          name="timezoneComfort"
                          value="yes"
                          checked={formData.timezoneComfort === 'yes'}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        Yes
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.timezoneComfort === 'no' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'}`}>
                        <input
                          type="radio"
                          name="timezoneComfort"
                          value="no"
                          checked={formData.timezoneComfort === 'no'}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        No
                      </label>
                    </div>
                    {errors.timezoneComfort && <p className="mt-1 text-sm text-red-500">{errors.timezoneComfort}</p>}
                  </div>

                  {/* Turnstile Container */}
                  <div
                    ref={turnstileContainerRef}
                    className="min-h-[65px]"
                  ></div>

                  {/* Turnstile Error */}
                  {turnstileError && (
                    <p className="text-sm text-red-500 text-center">{turnstileError}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-purple text-white font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Apply for This Role'
                    )}
                  </button>

                  {/* Redirect Notice */}
                  <p className="text-center text-gray-500 text-sm">
                    After submitting, you'll be redirected to a short initial interview.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
