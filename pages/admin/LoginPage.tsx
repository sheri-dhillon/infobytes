import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Specific credentials as requested
    const ADMIN_EMAIL = "infobytes883@gmail.com";
    const ADMIN_PASS = "McITp@2026/1Me";

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      login();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
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

        <h2 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h2>
        <p className="text-gray-400 text-center text-sm mb-8">Please enter your secure credentials.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div className="flex justify-end">
            <Link to="/admin/forgot-password" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600">
                Unauthorized access is strictly prohibited.<br/>
                IP Address logged for security.
            </p>
        </div>
      </div>
    </div>
  );
};