
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { supabase } from '../../lib/supabase';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/admin/dashboard', // Or a dedicated reset password page
        });

        if (error) throw error;
        
        setSubmitted(true);
    } catch (err: any) {
        console.error("Reset error:", err);
        setError(err.message || 'Failed to send reset email.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl backdrop-blur-xl">
        <Link to="/admin/ibloginpage" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        
        <div className="flex justify-center mb-6">
            <Logo className="h-8 w-auto opacity-80" />
        </div>

        {!submitted ? (
            <>
                <h2 className="text-2xl font-bold text-white text-center mb-2">Reset Password</h2>
                <p className="text-gray-400 text-center text-sm mb-8">Enter your registered email address to receive reset instructions.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-brand-orange to-brand-purple text-white font-bold py-3.5 rounded-full hover:opacity-90 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Send Reset Link
                </button>
                </form>
            </>
        ) : (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                <p className="text-gray-400 text-sm mb-8">
                    We have sent password recovery instructions to <strong>{email}</strong>
                </p>
                <button 
                    onClick={() => { setSubmitted(false); setEmail(''); }}
                    className="text-brand-orange hover:text-white text-sm font-medium transition-colors"
                >
                    Try another email
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
