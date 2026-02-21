import React, { useState, useRef } from 'react';
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
const INTERVIEW_REDIRECT_URL = 'https://form.jotform.com/260511821030036';

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

  // Update applyingForRole when job loads
  React.useEffect(() => {
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
    
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Redirect to interview page after 2 seconds
      setTimeout(() => {
        window.location.href = INTERVIEW_REDIRECT_URL;
      }, 2000);
      
    } catch (err) {
      console.error('Form submission error:', err);
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
          <p className="text-gray-500 text-sm">Redirecting you to the initial interview...</p>
          <Loader2 className="w-6 h-6 text-brand-orange animate-spin mx-auto mt-6" />
        </div>
      </div>
    );
  }

  return (
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
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
                <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-32 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
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
  );
};
