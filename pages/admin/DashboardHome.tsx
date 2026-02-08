import React, { useState, useEffect } from 'react';
import { BarChart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useOutletContext } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
    // Safely consume refresh context
    const context = useOutletContext<{ refreshKey: number }>();
    const refreshKey = context?.refreshKey || 0;
    
    const [counts, setCounts] = useState({
        leads: 0,
        projects: 0,
        posts: 0
    });

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            try {
                // Get counts
                const { count: leadCount } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New');
                const { count: projectCount } = await supabase.from('case_studies').select('*', { count: 'exact', head: true }).neq('status', 'Archived');
                const { count: postCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'Published');

                if (isMounted) {
                    setCounts({
                        leads: leadCount || 0,
                        projects: projectCount || 0,
                        posts: postCount || 0
                    });
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();

        return () => { isMounted = false; };
    }, [refreshKey]);

    const stats = [
        { title: "New Leads", value: counts.leads.toString(), change: "Active" },
        { title: "Active Projects", value: counts.projects.toString(), change: "Portfolio" },
        { title: "Published Posts", value: counts.posts.toString(), change: "Blog" },
        { title: "Total Traffic", value: "45.2K", change: "+12% (Est)" }, // Static placeholder for traffic
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-8">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Charts Area Placeholder */}
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