import { useState, useEffect } from 'react';

export interface JobOpening {
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

// Airtable Configuration (using environment variables)
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Careers';
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;

// Cache for jobs to avoid multiple API calls
let cachedJobs: JobOpening[] | null = null;
let fetchPromise: Promise<JobOpening[]> | null = null;

// Function to fetch jobs from Airtable
const fetchJobsFromAirtable = async (): Promise<JobOpening[]> => {
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
    
    return jobs;
    
  } catch (error) {
    console.error('Error fetching jobs from Airtable:', error);
    return [];
  }
};

// Shared fetch function with caching
const getJobs = async (): Promise<JobOpening[]> => {
  // Return cached data if available
  if (cachedJobs) {
    return cachedJobs;
  }
  
  // If already fetching, wait for that promise
  if (fetchPromise) {
    return fetchPromise;
  }
  
  // Start new fetch
  fetchPromise = fetchJobsFromAirtable().then((data) => {
    cachedJobs = data;
    fetchPromise = null;
    return data;
  });
  
  return fetchPromise;
};

// Hook to use jobs in components
export const useJobs = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load job openings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  return { jobs, loading, error };
};

// Helper function to create URL-friendly slug from job title
export const createJobSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Hook to get a single job by slug (derived from title)
export const useJob = (slug: string | undefined) => {
  const [job, setJob] = useState<JobOpening | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!slug) {
        setLoading(false);
        setError('No job specified');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const jobs = await getJobs();
        const foundJob = jobs.find(j => createJobSlug(j.title) === slug);
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadJob();
  }, [slug]);

  return { job, loading, error };
};

// Function to clear cache (useful for refreshing data)
export const clearJobsCache = () => {
  cachedJobs = null;
  fetchPromise = null;
};
