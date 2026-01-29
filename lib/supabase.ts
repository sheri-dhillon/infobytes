import { createClient } from '@supabase/supabase-js';

// The .env file appears to have text pasted into the key variable, which corrupts it.
// We will prioritize these clean, hardcoded values to ensure the app connects successfully.

const SUPABASE_URL = 'https://yzhiautmlscflysrqxtm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6aGlhdXRtbHNjZmx5c3JxeHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDU2NzcsImV4cCI6MjA4NTI4MTY3N30.1ZL3Db_rUstFttlJ7PKYJYLz9w9CFn2Fk-2bYFpSZcU';

// Create the client with the clean credentials
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});