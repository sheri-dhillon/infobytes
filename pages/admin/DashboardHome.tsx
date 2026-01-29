import React from 'react';
import { BarChart } from 'lucide-react';

export const DashboardHome: React.FC = () => {
    const stats = [
        { title: "Total Traffic", value: "45.2K", change: "+12%" },
        { title: "Active Projects", value: "24", change: "0%" },
        { title: "New Leads", value: "156", change: "+24%" },
        { title: "Revenue (MoM)", value: "$84.3K", change: "+8%" },
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
                            <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
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
                        <p className="text-sm opacity-50">Chart visualization placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};