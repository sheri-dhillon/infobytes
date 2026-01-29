import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();

  const stats = [
    { title: "Total Traffic", value: "45.2K", change: "+12%" },
    { title: "Active Projects", value: "24", change: "0%" },
    { title: "New Leads", value: "156", change: "+24%" },
    { title: "Revenue (MoM)", value: "$84.3K", change: "+8%" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed h-full z-20 hidden md:flex">
         <div className="p-8 border-b border-white/5">
            <Logo className="h-6 w-auto" />
         </div>
         
         <nav className="flex-1 p-4 space-y-1">
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Overview</div>
            <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
            <NavItem icon={<Users className="w-4 h-4" />} label="Clients" />
            <NavItem icon={<FileText className="w-4 h-4" />} label="Inquiries" />
            
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mt-8 mb-2">System</div>
            <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
         </nav>

         <div className="p-4 border-t border-white/5">
            <button 
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
            >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative">
         {/* Top Bar */}
         <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
            <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
                    AD
                </div>
            </div>
         </header>

         <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
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

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-[400px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <p className="mb-2">Content Management System Area</p>
                    <p className="text-sm opacity-50">Select a module from the sidebar</p>
                </div>
            </div>
            
            {/* Mobile Logout (visible only on mobile) */}
            <div className="md:hidden mt-8">
                <button onClick={logout} className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold">
                    Sign Out
                </button>
            </div>
         </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <button className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${active ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);