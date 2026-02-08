import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Loader2, WifiOff } from 'lucide-react';

// Define the shape of our Profile
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: 'admin' | 'manager' | 'blogger';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    // 1. Get initial session with timeout safety
    const initSession = async () => {
      try {
        // Create a timeout promise (increased to 60s)
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Connection timeout")), 60000)
        );

        // Race fetching session against timeout
        const { data } = await Promise.race([
            supabase.auth.getSession(),
            timeout.then(() => { throw new Error("Timeout") })
        ]) as any;

        if (mounted) {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            if (data.session?.user) {
              await fetchProfile(data.session.user.id);
            }
        }
      } catch (error: any) {
        console.error("Session init error:", error);
        if (mounted) setError(error.message || "Failed to connect");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      // Handle explicit sign out event
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // If we already have the correct profile, avoid refetching to reduce flickering
        if (session.user.id !== user?.id) {
             await fetchProfile(session.user.id);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
        mounted = false;
        subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      localStorage.clear(); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const value = {
    isAuthenticated: !!session,
    user,
    profile,
    loading,
    logout,
    refreshProfile
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
              <Loader2 className="w-10 h-10 text-brand-purple animate-spin mb-4" />
              <p className="text-sm text-gray-500">Initializing secure connection...</p>
          </div>
      );
  }

  // If critical init error (like Supabase down), allow showing children? 
  // Usually we still want to show the app so they can maybe login or see a friendly error.
  // But if session check failed hard, we might be in an inconsistent state.
  // For now, if loading is done, we render. isAuthenticated will be false if session failed.

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};