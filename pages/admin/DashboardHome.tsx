
import React, { useState, useEffect } from 'react';
import { BarChart, Loader2, RefreshCw, AlertTriangle, MessageSquare, FileText, Briefcase, Users, Layers, ArrowUpRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useOutletContext, Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
    const context = useOutletContext<{ refreshKey: number }>();
    const refreshKey = context?.refreshKey || 0;
    
    // State for all 5 categories
    const [counts, setCounts] = useState({ 
        testimonials: 0, 
        posts: 0, 
        projects: 0, 
        leads: 0, 
        services: 0 
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            // Increased timeout to 60 seconds
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 60000));

            // Fetch all required counts in parallel
            const [testimonialsRes, postsRes, projectsRes, leadsRes, servicesRes] = await Promise.race([
                Promise.all([
                    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                    supabase.from('posts').select('*', { count: 'exact', head: true }).neq('status', 'Archived'),
                    supabase.from('case_studies').select('*', { count: 'exact', head: true }).neq('status', 'Archived'),
                    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New'),
                    supabase.from('services').select('*', { count: 'exact', head: true }).eq('status', 'Active')
                ]),
                timeoutPromise.then(() => { throw new Error("Timeout") })
            ]) as any;

            // Check for errors
            if (testimonialsRes.error) throw testimonialsRes.error;
            if (postsRes.error) throw postsRes.error;
            if (projectsRes.error) throw projectsRes.error;
            if (leadsRes.error) throw leadsRes.error;
            if (servicesRes.error) throw servicesRes.error;

            setCounts({
                testimonials: testimonialsRes.count || 0,
                posts: postsRes.count || 0,
                projects: projectsRes.count || 0,
                leads: leadsRes.count || 0,
                services: servicesRes.count || 0
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

    // Configuration for the 5 boxes in the requested sequence
    const statBoxes = [
        { 
            id: 'testimonials', 
            title: "Testimonials", 
            value: counts.testimonials, 
            icon: MessageSquare, 
            color: "text-yellow-400", 
            bg: "bg-yellow-400/10", 
            border: "group-hover:border-yellow-400/30",
            link: "/admin/dashboard/testimonials"
        },
        { 
            id: 'posts', 
            title: "Blog Posts", 
            value: counts.posts, 
            icon: FileText, 
            color: "text-blue-400", 
            bg: "bg-blue-400/10", 
            border: "group-hover:border-blue-400/30",
            link: "/admin/dashboard/posts"
        },
        { 
            id: 'projects', 
            title: "Case Studies", 
            value: counts.projects, 
            icon: Briefcase, 
            color: "text-purple-400", 
            bg: "bg-purple-400/10", 
            border: "group-hover:border-purple-400/30",
            link: "/admin/dashboard/casestudies"
        },
        { 
            id: 'leads', 
            title: "New Leads", 
            value: counts.leads, 
            icon: Users, 
            color: "text-green-400", 
            bg: "bg-green-400/10", 
            border: "group-hover:border-green-400/30",
            link: "/admin/dashboard/leads"
        },
        { 
            id: 'services', 
            title: "Services", 
            value: counts.services, 
            icon: Layers, 
            color: "text-brand-orange", 
            bg: "bg-orange-500/10", 
            border: "group-hover:border-orange-500/30",
            link: "/admin/dashboard/services"
        },
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
        <div className="animate-fade-in w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Overview</h2>
                    <p className="text-gray-400 text-sm">Welcome back to your command center.</p>
                </div>
            </div>

            {/* Stats Grid - Responsive for 5 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {statBoxes.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Link 
                            to={stat.link}
                            key={idx} 
                            className={`group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 overflow-hidden ${stat.border}`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 -mr-10 -mt-10 pointer-events-none`}></div>

                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors`}>
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2">
                                        <ArrowUpRight className="w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
                                
                                <div>
                                    {loading ? (
                                        <div className="h-8 w-16 bg-white/10 rounded animate-pulse mb-1"></div>
                                    ) : (
                                        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                                    )}
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">{stat.title}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            
            {/* Charts Placeholder */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 h-[400px] flex items-center justify-center text-gray-500 relative overflow-hidden group">
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                    
                    <div className="text-center relative z-10">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                            <BarChart className="w-8 h-8 opacity-50 text-brand-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Revenue Analytics</h3>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto">Detailed performance charts and growth metrics coming in the next update.</p>
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full"></div>
                    
                    <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3 relative z-10">
                        <Link to="/admin/dashboard/posts" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Write new post</span>
                        </Link>
                        <Link to="/admin/dashboard/casestudies" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:text-purple-300">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Add Case Study</span>
                        </Link>
                        <Link to="/admin/dashboard/leads" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:text-green-300">
                                <Users className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">View recent leads</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
