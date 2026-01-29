export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Frontend Display Testimonial
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

// Database Testimonial
export interface TestimonialDB {
  id: number;
  created_at: string;
  name: string;
  designation: string;
  business_name: string;
  service_name: string;
  review: string;
  stars: number;
  status: 'Active' | 'Draft' | 'Archived';
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

// Database Service Entity
export interface Service {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  status: 'Draft' | 'Active' | 'Archived';
  pills: string[]; 
  seo_title?: string;
  meta_description?: string;
}

// Database Post Entity
export interface Post {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  content?: string;
  image?: string;
  category?: string;
  status: 'Draft' | 'Published' | 'Archived';
  views: number;
  seo_title?: string;
  meta_description?: string;
}

// Database Lead Entity
export interface Lead {
  id: number;
  created_at: string;
  first_name?: string;
  last_name?: string;
  email: string;
  company_name?: string;
  mobile_number?: string;
  project_budget?: string;
  source?: string;
  project_details?: string;
  status: 'New' | 'Contacted' | 'Archived';
}