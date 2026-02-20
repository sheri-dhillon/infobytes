import { useState, useEffect } from 'react';

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  frequency: string;
  isCustom: boolean;
  customStartingAt: string;
  features: string[];
  highlight: boolean;
  status: 'active' | 'inactive';
}

// Airtable Configuration (using environment variables)
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Pricing';
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;

// Cache for pricing plans to avoid multiple API calls
let cachedPricingPlans: PricingPlan[] | null = null;
let fetchPromise: Promise<PricingPlan[]> | null = null;

// Function to fetch pricing plans from Airtable
const fetchPricingFromAirtable = async (): Promise<PricingPlan[]> => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?sort[0][field]=id&sort[0][direction]=asc`;
  
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
    
    // Map Airtable records to PricingPlan format
    const plans = data.records
      .map((record: any) => {
        const fields = record.fields;
        
        // Parse features - can be pipe-separated string or array
        let features: string[] = [];
        if (fields.features) {
          if (Array.isArray(fields.features)) {
            features = fields.features;
          } else if (typeof fields.features === 'string') {
            // Split by pipe character
            features = fields.features.split('|').map((f: string) => f.trim()).filter(Boolean);
          }
        }
        
        return {
          id: String(fields.id || record.id),
          name: fields.name || '',
          tagline: fields.tagline || '',
          description: fields.description || '',
          price: fields.price || '',
          frequency: fields.frequency || 'month',
          isCustom: fields.isCustom === true || fields.isCustom === 'true',
          customStartingAt: fields.customStartingAt || '699',
          features,
          highlight: fields.highlight === true || fields.highlight === 'true',
          status: (fields.status || 'active').toLowerCase() as 'active' | 'inactive',
        };
      })
      .filter((plan: PricingPlan) => plan.name && plan.status === 'active');
    
    return plans;
    
  } catch (error) {
    console.error('Error fetching pricing from Airtable:', error);
    return [];
  }
};

// Shared fetch function with caching
const getPricingPlans = async (): Promise<PricingPlan[]> => {
  // Return cached data if available
  if (cachedPricingPlans) {
    return cachedPricingPlans;
  }
  
  // If already fetching, wait for that promise
  if (fetchPromise) {
    return fetchPromise;
  }
  
  // Start new fetch
  fetchPromise = fetchPricingFromAirtable().then((data) => {
    cachedPricingPlans = data;
    fetchPromise = null;
    return data;
  });
  
  return fetchPromise;
};

// Hook to use pricing plans in components
export const usePricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPricing = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getPricingPlans();
        setPlans(data);
      } catch (err) {
        setError('Failed to load pricing plans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPricing();
  }, []);

  return { plans, loading, error };
};

// Function to clear cache (useful for refreshing data)
export const clearPricingCache = () => {
  cachedPricingPlans = null;
  fetchPromise = null;
};
