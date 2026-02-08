import React, { useState, useEffect } from 'react';
import { BarChart, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useOutletContext } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
    const context = useOutletContext<{ refreshKey: number }>();
    const refreshKey = context?.refreshKey || 0;
    
    const [counts, setCounts] = useState({ leads: 0, projects: 0, posts: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            // Increased timeout to 60 seconds
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 60000));

            const [leadRes, projectRes, postRes] = await Promise.race([
                Promise.all([
                    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New'),
                    supabase.from('case_studies').select('*', { count: 'exact', head: true }).neq('status', 'Archived'),
                    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'Published')
                ]),
                timeoutPromise.then(() => { throw new Error("Timeout") })
            ]) as any;

            if (leadRes.error) throw leadRes.error;
            if (projectRes.error) throw projectRes.error;
            if (postRes.error) throw postRes.error;

            setCounts({
                leads: leadRes.count || 0,
                projects: projectRes.count || 0,
                posts: postRes.count || 0
            });
        } catch (err: any) {
            console.error("Error fetching stats:", err);
            setError(err.message || 'Failed to load statistics.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [refreshKey]);

    const stats = [
        { title: "New Leads", value: counts.leads.toString(), change: "Active" },
        { title: "Active Projects", value: counts.projects.toString(), change: "Portfolio" },
        { title: "Published Posts", value: counts.posts.toString(), change: "Blog" },
        { title: "Total Traffic", value: "45.2K", change: "+12% (Est)" }, 
    ];

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] border border-white/10 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
                <p className="text-gray-400 mb-4">{error}</p>
                <button onClick={fetchStats} className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                    <RefreshCw className="w-4 h-4" /> Retry
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-8">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-[#0a0a0a]/80 z-10 flex items-center justify-center">
                                <Loader2 className="w-6 h-6 text-brand-purple animate-spin" />
                            </div>
                        )}
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5`}>
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-[400px] flex items-center justify-center text-gray-500 relative overflow-hidden group">
                    <div className="text-center relative z-10">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <BarChart className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="mb-2 font-medium text-gray-300">Revenue Analytics</p>
                        <p className="text-sm opacity-50">Chart visualization coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};