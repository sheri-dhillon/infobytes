import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, UserPlus, LogIn, WifiOff } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle state
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLoginMode) {
        // --- LOGIN LOGIC ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          navigate('/admin/dashboard');
        }
      } else {
        // --- SIGN UP LOGIC ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'admin' // Optional metadata, actual role handled by DB trigger
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          if (data.session) {
             // If session exists, user is logged in automatically (Email confirmation might be off)
             navigate('/admin/dashboard');
          } else {
             // If no session, email confirmation likely required
             setMessage('Account created! Please check your email to confirm your account before logging in.');
             setIsLoginMode(true); // Switch back to login mode
          }
        }
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      
      let errorMessage = err.message || 'Authentication failed.';
      
      // Handle "Failed to fetch" specifically
      if (errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Network error: Could not connect to Supabase. Your project might be paused or your internet is down.';
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Incorrect email or password. If you just signed up, please check your email for a confirmation link.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl backdrop-blur-xl">
        <div className="flex justify-center mb-8">
            <Link to="/">
                <Logo className="h-10 w-auto" />
            </Link>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">
            {isLoginMode ? 'Admin Access' : 'Create Admin'}
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
            {isLoginMode ? 'Please enter your secure credentials.' : 'Set up a new administrative account.'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-start gap-2 text-sm animate-fade-in">
            {error.includes('Network') ? <WifiOff className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 pl-12 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                placeholder="admin@infobytes.io"
                required
              />
              <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 pl-12 pr-12 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isLoginMode && (
            <div className="flex justify-end">
                <Link to="/admin/forgot-password" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">
                Forgot Password?
                </Link>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLoginMode ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />)}
            {loading ? 'Processing...' : (isLoginMode ? 'Authenticate' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button 
                onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setError('');
                    setMessage('');
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
                {isLoginMode ? 'Create new admin account' : 'Back to Login'}
            </button>
        </div>
      </div>
    </div>
  );
};