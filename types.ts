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

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}
