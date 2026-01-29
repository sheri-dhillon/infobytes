import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Layers, Briefcase, Plus, Search, Trash2, Edit2, BarChart } from 'lucide-react';
import { Logo } from '../../components/Logo';

// Mock Data for Views
const MOCK_LEADS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", interest: "Web Dev", status: "New", date: "Oct 24, 2024" },
  { id: 2, name: "Mark Smith", email: "mark@techcorp.com", interest: "App Dev", status: "Contacted", date: "Oct 23, 2024" },
  { id: 3, name: "Sarah Williams", email: "sarah@design.studio", interest: "UI/UX", status: "Closed", date: "Oct 22, 2024" },
];

const MOCK_SERVICES = [
  { id: 1, title: "Web Development", price: "$5,000+", status: "Active" },
  { id: 2, title: "iOS App Development", price: "$12,000+", status: "Active" },
  { id: 3, title: "UI/UX Design", price: "$4,000+", status: "Active" },
  { id: 4, title: "SEO Optimization", price: "$1,500/mo", status: "Draft" },
];

const MOCK_POSTS = [
  { id: 1, title: "The Future of AI in Design", category: "Thought Leadership", views: 1240, status: "Published" },
  { id: 2, title: "Scaling Your SaaS Product", category: "Growth", views: 856, status: "Published" },
  { id: 3, title: "React vs Vue: A Comparison", category: "Development", views: 2100, status: "Draft" },
];

const MOCK_PROJECTS = [
  { id: 1, title: "LuxeStay", client: "Luxury Rentals", category: "Web Dev", status: "Completed" },
  { id: 2, title: "FinFlow", client: "FinTech Co", category: "App Dev", status: "In Progress" },
  { id: 3, title: "Zenith UI", client: "Internal", category: "Product", status: "Live" },
];

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />;
      case 'services':
        return <TableView title="Services" data={MOCK_SERVICES} columns={['Title', 'Price', 'Status']} />;
      case 'posts':
        return <TableView title="Blog Posts" data={MOCK_POSTS} columns={['Title', 'Category', 'Views', 'Status']} />;
      case 'casestudies':
        return <TableView title="Case Studies" data={MOCK_PROJECTS} columns={['Project Title', 'Client', 'Category', 'Status']} />;
      case 'leads':
        return <TableView title="Leads & Inquiries" data={MOCK_LEADS} columns={['Name', 'Email', 'Interest', 'Status', 'Date']} />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex font-sans text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed h-full z-20 hidden md:flex">
         <div className="p-8 border-b border-white/5">
            <Logo className="h-6 w-auto" />
         </div>
         
         <nav className="flex-1 p-4 space-y-1">
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Menu</div>
            <NavItem 
                icon={<LayoutDashboard className="w-4 h-4" />} 
                label="Home" 
                active={activeTab === 'home'} 
                onClick={() => setActiveTab('home')}
            />
            <NavItem 
                icon={<Layers className="w-4 h-4" />} 
                label="Services" 
                active={activeTab === 'services'} 
                onClick={() => setActiveTab('services')}
            />
            <NavItem 
                icon={<FileText className="w-4 h-4" />} 
                label="Posts" 
                active={activeTab === 'posts'} 
                onClick={() => setActiveTab('posts')}
            />
            <NavItem 
                icon={<Briefcase className="w-4 h-4" />} 
                label="Case Studies" 
                active={activeTab === 'casestudies'} 
                onClick={() => setActiveTab('casestudies')}
            />
            <NavItem 
                icon={<Users className="w-4 h-4" />} 
                label="Leads" 
                active={activeTab === 'leads'} 
                onClick={() => setActiveTab('leads')}
            />
            
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mt-8 mb-2">System</div>
            <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" onClick={() => {}} />
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
      <main className="flex-1 md:ml-64 relative min-h-screen bg-[#050505]">
         {/* Top Bar */}
         <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
            <h1 className="text-white font-bold text-lg capitalize">{activeTab === 'casestudies' ? 'Case Studies' : activeTab}</h1>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white focus:outline-none focus:border-brand-purple/50 w-64 hidden lg:block"
                    />
                    <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 hidden lg:block" />
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-brand-orange rounded-full border border-black"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    AD
                </div>
            </div>
         </header>

         <div className="p-6 md:p-8">
            {renderContent()}
         </div>
      </main>
    </div>
  );
};

// Sub-Components
const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-all duration-200 group ${
            active 
            ? 'bg-white text-black font-bold shadow-lg shadow-white/5' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
    >
        <span className={`${active ? 'text-black' : 'group-hover:text-white'}`}>{icon}</span>
        <span className="text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-orange"></div>}
    </button>
);

const DashboardHome: React.FC = () => {
    const stats = [
        { title: "Total Traffic", value: "45.2K", change: "+12%" },
        { title: "Active Projects", value: "24", change: "0%" },
        { title: "New Leads", value: "156", change: "+24%" },
        { title: "Revenue (MoM)", value: "$84.3K", change: "+8%" },
    ];

    return (
        <div className="animate-fade-in">
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

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-[400px] overflow-y-auto">
                    <h3 className="text-white font-bold mb-6 sticky top-0 bg-[#0a0a0a] py-2 z-10">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1,2,3,4,5].map((i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <Bell className="w-3.5 h-3.5 text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">New lead captured from <span className="text-white font-bold">Contact Form</span></p>
                                    <span className="text-xs text-gray-500">{i * 2} mins ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TableView: React.FC<{ title: string, data: any[], columns: string[] }> = ({ title, data, columns }) => {
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{col}</th>
                                ))}
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                    {Object.values(row).slice(1).map((val: any, vIdx) => (
                                        <td key={vIdx} className="p-4 text-sm text-gray-300 font-medium">
                                            {val === "Active" || val === "Published" || val === "Completed" || val === "New" ? (
                                                <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                                    {val}
                                                </span>
                                            ) : val === "Draft" || val === "In Progress" || val === "Contacted" ? (
                                                <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
                                                    {val}
                                                </span>
                                            ) : (
                                                val
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">No records found.</div>
                )}
            </div>
        </div>
    );
};