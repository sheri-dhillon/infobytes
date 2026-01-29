import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Layers, Briefcase, Plus, Search, Trash2, Edit2, BarChart, X, Archive, RotateCcw, AlertTriangle, Check } from 'lucide-react';
import { Logo } from '../../components/Logo';

// --- Data Types & Initials ---

const INITIAL_SERVICES = [
  { id: 1, title: "Web Development", price: "$5,000+", status: "Active" },
  { id: 2, title: "iOS App Development", price: "$12,000+", status: "Active" },
  { id: 3, title: "UI/UX Design", price: "$4,000+", status: "Active" },
  { id: 4, title: "SEO Optimization", price: "$1,500/mo", status: "Draft" },
];

const INITIAL_LEADS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", interest: "Web Dev", status: "New", date: "Oct 24, 2024" },
  { id: 2, name: "Mark Smith", email: "mark@techcorp.com", interest: "App Dev", status: "Contacted", date: "Oct 23, 2024" },
  { id: 3, name: "Sarah Williams", email: "sarah@design.studio", interest: "UI/UX", status: "Closed", date: "Oct 22, 2024" },
];

const INITIAL_POSTS = [
  { id: 1, title: "The Future of AI in Design", category: "Thought Leadership", views: 1240, status: "Published" },
  { id: 2, title: "Scaling Your SaaS Product", category: "Growth", views: 856, status: "Published" },
  { id: 3, title: "React vs Vue: A Comparison", category: "Development", views: 2100, status: "Draft" },
];

const INITIAL_PROJECTS = [
  { id: 1, title: "LuxeStay", client: "Luxury Rentals", category: "Web Dev", status: "Completed" },
  { id: 2, title: "FinFlow", client: "FinTech Co", category: "App Dev", status: "In Progress" },
  { id: 3, title: "Zenith UI", client: "Internal", category: "Product", status: "Live" },
];

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');

  // Data State
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Modal States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; item: any | null; type: string }>({
    isOpen: false,
    item: null,
    type: ''
  });

  // Reset view mode when tab changes
  useEffect(() => {
    setViewMode('active');
  }, [activeTab]);

  // --- Actions ---

  const handleSaveService = (serviceData: any) => {
    if (editingItem) {
        // Update existing
        setServices(prev => prev.map(item => item.id === serviceData.id ? serviceData : item));
    } else {
        // Create new
        const newId = Math.max(...services.map(s => s.id), 0) + 1;
        setServices(prev => [...prev, { ...serviceData, id: newId }]);
    }
    setIsServiceModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenAddService = () => {
    setEditingItem(null); // Ensure clean state for "Add"
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (item: any) => {
    setEditingItem(item);
    setIsServiceModalOpen(true);
  };

  const requestDelete = (item: any, type: string) => {
    setDeleteConfirmation({ isOpen: true, item, type });
  };

  const confirmDelete = () => {
    const { item, type } = deleteConfirmation;
    if (!item) return;

    const archiveItem = (dataList: any[], setList: Function) => {
        setList(dataList.map(i => i.id === item.id ? { ...i, status: 'Archived' } : i));
    };

    switch (type) {
        case 'services': archiveItem(services, setServices); break;
        case 'posts': archiveItem(posts, setPosts); break;
        case 'casestudies': archiveItem(projects, setProjects); break;
        case 'leads': archiveItem(leads, setLeads); break;
    }

    setDeleteConfirmation({ isOpen: false, item: null, type: '' });
  };

  const handleRestore = (item: any, type: string) => {
      const restoreItem = (dataList: any[], setList: Function, defaultStatus: string) => {
          setList(dataList.map(i => i.id === item.id ? { ...i, status: defaultStatus } : i));
      };

      switch(type) {
          case 'services': restoreItem(services, setServices, 'Draft'); break;
          case 'posts': restoreItem(posts, setPosts, 'Draft'); break;
          case 'casestudies': restoreItem(projects, setProjects, 'In Progress'); break;
          case 'leads': restoreItem(leads, setLeads, 'New'); break;
      }
  };


  // --- Render Helpers ---

  const getFilteredData = (data: any[]) => {
      if (viewMode === 'archived') {
          return data.filter(item => item.status === 'Archived');
      }
      return data.filter(item => item.status !== 'Archived');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />;
      case 'services':
        return (
            <TableView 
                title="Services" 
                data={getFilteredData(services)} 
                columns={['Title', 'Price', 'Status']} 
                onEdit={handleOpenEditService}
                onDelete={(item) => requestDelete(item, 'services')}
                onAdd={handleOpenAddService}
                onRestore={(item) => handleRestore(item, 'services')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'posts':
        return (
            <TableView 
                title="Blog Posts" 
                data={getFilteredData(posts)} 
                columns={['Title', 'Category', 'Views', 'Status']} 
                onDelete={(item) => requestDelete(item, 'posts')}
                // Add Post functionality can be added similarly later
                onAdd={() => {}} 
                onRestore={(item) => handleRestore(item, 'posts')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'casestudies':
        return (
            <TableView 
                title="Case Studies" 
                data={getFilteredData(projects)} 
                columns={['Project Title', 'Client', 'Category', 'Status']} 
                onDelete={(item) => requestDelete(item, 'casestudies')}
                onAdd={() => {}}
                onRestore={(item) => handleRestore(item, 'casestudies')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'leads':
        return (
            <TableView 
                title="Leads & Inquiries" 
                data={getFilteredData(leads)} 
                columns={['Name', 'Email', 'Interest', 'Status', 'Date']} 
                onDelete={(item) => requestDelete(item, 'leads')}
                onAdd={() => {}}
                onRestore={(item) => handleRestore(item, 'leads')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
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

      {/* Modals */}
      {isServiceModalOpen && (
        <ServiceModal 
            item={editingItem} 
            onClose={() => setIsServiceModalOpen(false)} 
            onSave={handleSaveService} 
        />
      )}

      {deleteConfirmation.isOpen && (
          <DeleteConfirmationModal 
             isOpen={deleteConfirmation.isOpen}
             onClose={() => setDeleteConfirmation({ isOpen: false, item: null, type: '' })}
             onConfirm={confirmDelete}
          />
      )}
    </div>
  );
};

// --- Sub-Components ---

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

interface TableViewProps {
    title: string;
    data: any[];
    columns: string[];
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    onAdd?: () => void;
    onRestore?: (item: any) => void;
    viewMode: 'active' | 'archived';
    onToggleView: () => void;
}

const TableView: React.FC<TableViewProps> = ({ 
    title, data, columns, onEdit, onDelete, onAdd, onRestore, viewMode, onToggleView 
}) => {
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">
                        {viewMode === 'archived' ? `Archived ${title}` : title}
                    </h2>
                    {viewMode === 'archived' && (
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full border border-red-500/20">
                            Archive Mode
                        </span>
                    )}
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={onToggleView}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border ${
                            viewMode === 'archived' 
                            ? 'bg-brand-purple text-white border-brand-purple' 
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        <Archive className="w-4 h-4" /> 
                        {viewMode === 'archived' ? 'Back to Active' : 'Archive'}
                    </button>

                    {viewMode === 'active' && onAdd && (
                        <button 
                            onClick={onAdd}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add New
                        </button>
                    )}
                </div>
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
                                            ) : val === "Archived" ? (
                                                <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                                                    {val}
                                                </span>
                                            ) : (
                                                val
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {viewMode === 'active' ? (
                                                <>
                                                    {onEdit && (
                                                        <button 
                                                            onClick={() => onEdit(row)}
                                                            className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {onDelete && (
                                                        <button 
                                                            onClick={() => onDelete(row)}
                                                            className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400 transition-colors"
                                                            title="Archive"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                onRestore && (
                                                    <button 
                                                        onClick={() => onRestore(row)}
                                                        className="p-1.5 hover:bg-green-500/10 rounded-md text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 text-xs font-bold"
                                                        title="Restore"
                                                    >
                                                        <RotateCcw className="w-4 h-4" /> Restore
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        {viewMode === 'archived' ? 'No archived items found.' : 'No records found.'}
                    </div>
                )}
            </div>
        </div>
    );
};

// Modal Components
const ServiceModal: React.FC<{ item: any, onClose: () => void, onSave: (item: any) => void }> = ({ item, onClose, onSave }) => {
    // If item is null, we are adding new, so default to empty
    const [formData, setFormData] = useState(item || { title: '', price: '', status: 'Draft' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-6">{item ? 'Edit Service' : 'Add New Service'}</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Title</label>
                        <input 
                            name="title"
                            value={formData.title} 
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                            placeholder="e.g. Web Development"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price</label>
                        <input 
                            name="price"
                            value={formData.price} 
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                            placeholder="e.g. $5,000+"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                        <div className="relative">
                            <select 
                                name="status"
                                value={formData.status} 
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none appearance-none cursor-pointer transition-colors"
                            >
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onSave(formData)}
                        className="w-full bg-white text-black font-bold py-3.5 rounded-lg mt-4 hover:bg-gray-200 transition-colors"
                    >
                        {item ? 'Save Changes' : 'Create Service'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmationModal: React.FC<{ isOpen: boolean, onClose: () => void, onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6 relative text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Archive Item?</h3>
                <p className="text-gray-400 text-sm mb-6">
                    Are you sure you want to remove this item? It will be moved to the archive list and can be restored later.
                </p>

                <div className="flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Confirm
                    </button>
                </div>
             </div>
        </div>
    );
};