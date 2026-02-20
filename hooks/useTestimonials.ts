import { useState, useEffect } from 'react';

export interface Testimonial {
  id: number;
  name: string;
  business_name: string;
  service_name: string;
  review: string;
  stars: number;
  status: 'active' | 'inactive';
}

// Airtable Configuration
const AIRTABLE_BASE_ID = 'app4HU1eGrqtRzFen';
const AIRTABLE_TABLE_NAME = 'Testimonials';
const AIRTABLE_API_TOKEN = 'patUqPTLJ623v59RU.9e2484e36da59837d5b729a33232952183439ec1bfbd9f19afcc1e362fc7e895';

// Cache for testimonials to avoid multiple API calls
let cachedTestimonials: Testimonial[] | null = null;
let fetchPromise: Promise<Testimonial[]> | null = null;

// Function to fetch testimonials from Airtable
const fetchTestimonialsFromAirtable = async (): Promise<Testimonial[]> => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
  
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
    
    // Map Airtable records to Testimonial format
    const testimonials = data.records
      .map((record: any, index: number) => ({
        id: record.fields.id || index + 1,
        name: record.fields.name || '',
        business_name: record.fields.business_name || '',
        service_name: record.fields.service_name || '',
        review: record.fields.review || '',
        stars: record.fields.stars || 5,
        status: (record.fields.status || 'active').toLowerCase() as 'active' | 'inactive',
      }))
      .filter((t: Testimonial) => t.name && t.review && t.status === 'active');
    
    return testimonials;
    
  } catch (error) {
    console.error('Error fetching testimonials from Airtable:', error);
    return [];
  }
};

// Shared fetch function with caching
const getTestimonials = async (): Promise<Testimonial[]> => {
  // Return cached data if available
  if (cachedTestimonials) {
    return cachedTestimonials;
  }
  
  // If already fetching, wait for that promise
  if (fetchPromise) {
    return fetchPromise;
  }
  
  // Start new fetch
  fetchPromise = fetchTestimonialsFromAirtable().then((data) => {
    cachedTestimonials = data;
    fetchPromise = null;
    return data;
  });
  
  return fetchPromise;
};

// Hook to use testimonials in components
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError('Failed to load testimonials');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTestimonials();
  }, []);

  return { testimonials, loading, error };
};

// Function to clear cache (useful for refreshing data)
export const clearTestimonialsCache = () => {
  cachedTestimonials = null;
  fetchPromise = null;
};
