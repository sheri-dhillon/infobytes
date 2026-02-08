import React, { createContext, useState, useContext, useEffect, ReactNode, useRef } from 'react';
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
  
  // Track mounting to prevent state updates on unmount
  const mounted = useRef(true);
  
  // Track current user ID to prevent redundant fetches or stale state logic
  const currentUserIdRef = useRef<string | null>(null);

  useEffect(() => {
      mounted.current = true;
      return () => { mounted.current = false; };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data && mounted.current) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  useEffect(() => {
    // 1. Get initial session with timeout safety
    const initSession = async () => {
      try {
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Connection timeout")), 60000)
        );

        const { data } = await Promise.race([
            supabase.auth.getSession(),
            timeout.then(() => { throw new Error("Timeout") })
        ]) as any;

        if (mounted.current) {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            currentUserIdRef.current = data.session?.user?.id ?? null;
            
            if (data.session?.user) {
              await fetchProfile(data.session.user.id);
            }
        }
      } catch (error: any) {
        console.error("Session init error:", error);
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    initSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted.current) return;
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
        currentUserIdRef.current = null;
        setLoading(false);
        return;
      }

      // Optimization: Only update if session/user actually changed significantly
      const newUserId = session?.user?.id;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (newUserId && newUserId !== currentUserIdRef.current) {
         currentUserIdRef.current = newUserId;
         await fetchProfile(newUserId);
      } else if (!newUserId) {
         setProfile(null);
         currentUserIdRef.current = null;
      }
      
      setLoading(false);
    });

    return () => {
        subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      if (mounted.current) setLoading(true);
      await supabase.auth.signOut();
      if (mounted.current) {
          setSession(null);
          setUser(null);
          setProfile(null);
      }
      localStorage.clear(); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      if (mounted.current) setLoading(false);
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