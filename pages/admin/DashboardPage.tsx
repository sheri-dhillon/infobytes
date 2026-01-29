import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Layers, Briefcase, Plus, Search, Trash2, Edit2, BarChart, X, Archive, RotateCcw, AlertTriangle, Check, Loader2, Wifi, WifiOff, Activity, MessageSquare, Star, ArrowLeft, Globe, Type, AlignLeft, List, Link as LinkIcon, Image as ImageIcon, Bold, Italic, Tag, FolderOpen, Upload, Copy } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
  const [loading, setLoading] = useState(false);

  // Data State
  const [services, setServices] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Connection State
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Modal & Editor States
  const [isServiceEditorOpen, setIsServiceEditorOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; item: any | null; type: string }>({
    isOpen: false,
    item: null,
    type: ''
  });

  // --- Fetch Data Logic ---

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'services') {
        const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true });
        if (!error && data) setServices(data);
      } else if (activeTab === 'leads') {
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (!error && data) setLeads(data);
      } else if (activeTab === 'posts') {
        const { data: postsData, error: postsError } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (!postsError && postsData) setPosts(postsData);
        
        const { data: catsData, error: catsError } = await supabase.from('categories').select('*').order('name', { ascending: true });
        if (!catsError && catsData) setCategories(catsData);
      } else if (activeTab === 'casestudies') {
        const { data, error } = await supabase.from('case_studies').select('*').order('id', { ascending: true });
        if (!error && data) setProjects(data);
      } else if (activeTab === 'testimonials') {
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (!error && data) setTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check Connection on Mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Lightweight check
        const { error } = await supabase.from('services').select('count', { count: 'exact', head: true });
        if (error && error.code !== 'PGRST116') throw error; 
        setIsConnected(true);
      } catch (err) {
        console.error('Connection check failed:', err);
        setIsConnected(false);
      }
    };
    checkConnection();
  }, []);

  // Fetch on mount and tab change
  useEffect(() => {
    if (activeTab !== 'home' && activeTab !== 'files') {
        fetchData();
    }
  }, [activeTab]);

  // Reset view mode when tab changes
  useEffect(() => {
    setViewMode('active');
    setIsPostEditorOpen(false); 
    setIsServiceEditorOpen(false);
    setIsCategoryModalOpen(false);
  }, [activeTab]);

  // --- Actions ---

  const handleSaveService = async (serviceData: any) => {
    // 1. Sanitize Data (Only valid columns)
    const payload = {
        title: serviceData.title,
        slug: serviceData.slug,
        description: serviceData.description,
        content: serviceData.content,
        image: serviceData.image,
        status: serviceData.status,
        pills: serviceData.pills || [], // Ensure array
        seo_title: serviceData.seo_title,
        meta_description: serviceData.meta_description
    };
    
    let error;
    const id = serviceData.id;
    
    if (id) {
        const { error: updateError } = await supabase.from('services').update(payload).eq('id', id);
        error = updateError;
    } else {
        const { error: insertError } = await supabase.from('services').insert([payload]);
        error = insertError;
    }

    if (!error) {
        await fetchData();
        setIsServiceEditorOpen(false);
        setEditingItem(null);
    } else {
        console.error(error);
        alert("Error saving service: " + error.message);
    }
  };

  const handleSaveTestimonial = async (itemData: any) => {
    const { id, created_at, ...rawPayload } = itemData;
    // Sanitizing for testimonials isn't strictly necessary if itemData comes from modal state, but safe
    const payload = {
        name: rawPayload.name,
        designation: rawPayload.designation,
        business_name: rawPayload.business_name,
        service_name: rawPayload.service_name,
        review: rawPayload.review,
        stars: rawPayload.stars,
        status: rawPayload.status
    };

    let error;

    if (editingItem && id) {
        const { error: updateError } = await supabase.from('testimonials').update(payload).eq('id', id);
        error = updateError;
    } else {
        const { error: insertError } = await supabase.from('testimonials').insert([payload]);
        error = insertError;
    }

    if (!error) {
        await fetchData();
        setIsTestimonialModalOpen(false);
        setEditingItem(null);
    } else {
        alert("Error saving testimonial: " + error.message);
    }
  };

  const handleSavePost = async (postData: any) => {
      // 1. Sanitize Data
      const payload = {
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          image: postData.image,
          category: postData.category,
          status: postData.status,
          seo_title: postData.seo_title,
          meta_description: postData.meta_description
      };

      const id = postData.id;
      let error;

      if (id) {
          const { error: updateError } = await supabase.from('posts').update(payload).eq('id', id);
          error = updateError;
      } else {
          const { error: insertError } = await supabase.from('posts').insert([payload]);
          error = insertError;
      }

      if (!error) {
          await fetchData();
          setIsPostEditorOpen(false);
          setEditingItem(null);
      } else {
          console.error(error);
          alert("Error saving post: " + error.message);
      }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    if (activeTab === 'services') setIsServiceEditorOpen(true);
    if (activeTab === 'testimonials') setIsTestimonialModalOpen(true);
    if (activeTab === 'posts') setIsPostEditorOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'services') setIsServiceEditorOpen(true);
    if (activeTab === 'testimonials') setIsTestimonialModalOpen(true);
    if (activeTab === 'posts') setIsPostEditorOpen(true);
  };

  const requestDelete = (item: any, type: string) => {
    setDeleteConfirmation({ isOpen: true, item, type });
  };

  const getTableName = (type: string) => {
      switch(type) {
          case 'services': return 'services';
          case 'posts': return 'posts';
          case 'casestudies': return 'case_studies';
          case 'leads': return 'leads';
          case 'testimonials': return 'testimonials';
          default: return '';
      }
  };

  const confirmDelete = async () => {
    const { item, type } = deleteConfirmation;
    if (!item) return;

    const tableName = getTableName(type);
    
    if (tableName) {
        const { error } = await supabase
            .from(tableName)
            .update({ status: 'Archived' })
            .eq('id', item.id);
        
        if (!error) {
            await fetchData();
        } else {
            console.error(error);
        }
    }

    setDeleteConfirmation({ isOpen: false, item: null, type: '' });
  };

  const handleRestore = async (item: any, type: string) => {
      const tableName = getTableName(type);
      let defaultStatus = 'Draft';
      
      if (type === 'leads') defaultStatus = 'New';
      if (type === 'casestudies') defaultStatus = 'In Progress';
      if (type === 'services') defaultStatus = 'Active';
      if (type === 'testimonials') defaultStatus = 'Active';
      if (type === 'posts') defaultStatus = 'Draft';

      if (tableName) {
          const { error } = await supabase
              .from(tableName)
              .update({ status: defaultStatus })
              .eq('id', item.id);
          
          if (!error) {
              await fetchData();
          }
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
    if (loading && activeTab !== 'files') {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
            </div>
        );
    }

    switch (activeTab) {
      case 'home':
        return <DashboardHome />;
      case 'files':
        return <FileManager />;
      case 'services':
        if (isServiceEditorOpen) {
            return (
                <ServiceEditor
                    service={editingItem}
                    onSave={handleSaveService}
                    onCancel={() => { setIsServiceEditorOpen(false); setEditingItem(null); }}
                />
            );
        }
        const servicesView = getFilteredData(services).map(s => ({
            id: s.id,
            title: s.title,
            pills: s.pills,
            status: s.status,
            description: s.description,
            created_at: s.created_at,
            // Pass full object for editing to retain other fields like content/seo
            _original: s 
        }));
        return (
            <TableView 
                title="Services" 
                activeTab={activeTab}
                data={servicesView} 
                columns={['Title', 'Pills', 'Status']} 
                onEdit={(viewItem) => handleOpenEdit(viewItem._original)}
                onDelete={(item) => requestDelete(item, 'services')}
                onAdd={handleOpenAdd}
                onRestore={(item) => handleRestore(item, 'services')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'testimonials':
        return (
            <TableView 
                title="Testimonials" 
                activeTab={activeTab}
                data={getFilteredData(testimonials)} 
                columns={['Name', 'Business', 'Service', 'Rating', 'Status']} 
                onEdit={handleOpenEdit}
                onDelete={(item) => requestDelete(item, 'testimonials')}
                onAdd={handleOpenAdd}
                onRestore={(item) => handleRestore(item, 'testimonials')}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'posts':
        if (isPostEditorOpen) {
            return (
                <PostEditor 
                    post={editingItem} 
                    categories={categories}
                    onSave={handleSavePost} 
                    onCancel={() => { setIsPostEditorOpen(false); setEditingItem(null); }} 
                />
            );
        }
        return (
            <TableView 
                title="Blog Posts" 
                activeTab={activeTab}
                data={getFilteredData(posts)} 
                columns={['Title', 'Category', 'Views', 'Status']} 
                onEdit={handleOpenEdit}
                onDelete={(item) => requestDelete(item, 'posts')}
                onAdd={handleOpenAdd} 
                onRestore={(item) => handleRestore(item, 'posts')}
                onManageCategories={() => setIsCategoryModalOpen(true)}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
            />
        );
      case 'casestudies':
        return (
            <TableView 
                title="Case Studies" 
                activeTab={activeTab}
                data={getFilteredData(projects)} 
                columns={['Title', 'Client', 'Category', 'Status']} 
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
                activeTab={activeTab}
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
                icon={<FolderOpen className="w-4 h-4" />} 
                label="Files" 
                active={activeTab === 'files'} 
                onClick={() => setActiveTab('files')}
            />
            <NavItem 
                icon={<Layers className="w-4 h-4" />} 
                label="Services" 
                active={activeTab === 'services'} 
                onClick={() => setActiveTab('services')}
            />
            <NavItem 
                icon={<MessageSquare className="w-4 h-4" />} 
                label="Testimonials" 
                active={activeTab === 'testimonials'} 
                onClick={() => setActiveTab('testimonials')}
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

         <div className="p-4 border-t border-white/5 space-y-2">
            {/* Connection Status Indicator */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                isConnected === true
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : isConnected === false
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
                {isConnected === true ? (
                    <Wifi className="w-4 h-4" />
                ) : isConnected === false ? (
                    <WifiOff className="w-4 h-4" />
                ) : (
                    <Activity className="w-4 h-4 animate-spin" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                    {isConnected === true ? 'System Online' : isConnected === false ? 'Offline' : 'Checking...'}
                </span>
            </div>

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
      
      {isTestimonialModalOpen && (
        <TestimonialModal
            item={editingItem}
            onClose={() => setIsTestimonialModalOpen(false)}
            onSave={handleSaveTestimonial}
        />
      )}

      {isCategoryModalOpen && (
          <CategoryManagerModal 
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
            categories={categories}
            onUpdate={fetchData}
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

// ... (NavItem, DashboardHome, TableView, TestimonialModal, DeleteConfirmationModal, CategoryManagerModal components remain unchanged) ...
// For brevity, I am not repeating them, but they MUST be included in the final file.
// I will include them below to ensure the file is complete.

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
    onManageCategories?: () => void;
    viewMode: 'active' | 'archived';
    onToggleView: () => void;
    activeTab: string;
}

const TableView: React.FC<TableViewProps> = ({ 
    title, data, columns, onEdit, onDelete, onAdd, onRestore, onManageCategories, viewMode, onToggleView, activeTab
}) => {
    const formatTabName = (tab: string) => {
        if (tab === 'casestudies') return 'Case Studies';
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    };

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
                        {viewMode === 'archived' ? `Return to ${formatTabName(activeTab)}` : 'Archive'}
                    </button>

                    {viewMode === 'active' && onManageCategories && (
                        <button 
                            onClick={onManageCategories}
                            className="bg-transparent text-white border border-white/10 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors"
                        >
                            <Tag className="w-4 h-4" /> Categories
                        </button>
                    )}

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
                                    {/* Exclude ID, created_at, and description for table view, map specific fields */}
                                    {columns.map((col, cIdx) => {
                                        // Mapping columns to data fields logic
                                        let content = null;
                                        if (col === 'Title') content = row.title;
                                        if (col === 'Name') content = row.name; // Testimonial Name
                                        if (col === 'Pills') content = row.pills;
                                        if (col === 'Business') content = row.business_name;
                                        if (col === 'Service') content = row.service_name;
                                        if (col === 'Rating') content = row.stars;
                                        if (col === 'Status') content = row.status;
                                        if (col === 'Category') content = row.category;
                                        if (col === 'Client') content = row.client;
                                        if (col === 'Views') content = row.views;
                                        if (col === 'Email') content = row.email;
                                        if (col === 'Interest') content = row.interest;
                                        if (col === 'Date') content = new Date(row.created_at).toLocaleDateString();

                                        return (
                                            <React.Fragment key={cIdx}>
                                            {Array.isArray(content) ? (
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-2 max-w-xs">
                                                        {content.length > 0 ? (
                                                            content.map((tag: string, tIdx: number) => (
                                                                <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 border border-white/5 whitespace-nowrap">
                                                                    {tag}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-600 text-xs italic">No pills</span>
                                                        )}
                                                    </div>
                                                </td>
                                            ) : col === 'Rating' ? (
                                                <td className="p-4">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-3 h-3 ${i < Number(content) ? 'fill-brand-orange text-brand-orange' : 'text-gray-700'}`} />
                                                        ))}
                                                    </div>
                                                </td>
                                            ) : (
                                                <td className="p-4 text-sm text-gray-300 font-medium">
                                                    {content === "Active" || content === "Published" || content === "Completed" || content === "New" ? (
                                                        <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                                            {content}
                                                        </span>
                                                    ) : content === "Draft" || content === "In Progress" || content === "Contacted" ? (
                                                        <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
                                                            {content}
                                                        </span>
                                                    ) : content === "Archived" ? (
                                                        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                                                            {content}
                                                        </span>
                                                    ) : (
                                                        content
                                                    )}
                                                </td>
                                            )}
                                            </React.Fragment>
                                        );
                                    })}
                                    
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

const TestimonialModal: React.FC<{ item: any, onClose: () => void, onSave: (item: any) => void }> = ({ item, onClose, onSave }) => {
    // ... same as before
    const [formData, setFormData] = useState({ 
        name: '', 
        designation: '',
        business_name: '',
        service_name: '',
        review: '',
        stars: 5,
        status: 'Active'
    });

    const [serviceList, setServiceList] = useState<any[]>([]);

    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        } else {
            setFormData({ 
                name: '', 
                designation: '',
                business_name: '',
                service_name: '',
                review: '',
                stars: 5,
                status: 'Active'
            });
        }
    }, [item]);

    // Fetch services specifically for the dropdown
    useEffect(() => {
        const getServices = async () => {
            const { data } = await supabase.from('services').select('title, status').order('created_at', { ascending: false });
            if (data) setServiceList(data);
        };
        getServices();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const activeServices = serviceList.filter(s => s.status === 'Active');
    const inactiveServices = serviceList.filter(s => s.status !== 'Active');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-6">{item ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Client Name</label>
                        <input 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Designation</label>
                        <input 
                            name="designation"
                            value={formData.designation} 
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                            placeholder="CEO, Founder"
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Business Name</label>
                        <input 
                            name="business_name"
                            value={formData.business_name} 
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                            placeholder="Acme Corp"
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Provided</label>
                        <div className="relative">
                            <select 
                                name="service_name"
                                value={formData.service_name} 
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none appearance-none cursor-pointer transition-colors"
                            >
                                <option value="" disabled>Select a Service</option>
                                {activeServices.map((s, i) => (
                                    <option key={`active-${i}`} value={s.title}>{s.title}</option>
                                ))}
                                {inactiveServices.length > 0 && (
                                    <>
                                         <option disabled>────────────────</option>
                                         {inactiveServices.map((s, i) => (
                                             <option key={`inactive-${i}`} value={s.title} disabled className="text-gray-500">
                                                 {s.title} (Inactive)
                                             </option>
                                         ))}
                                    </>
                                )}
                            </select>
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Review</label>
                        <textarea 
                            name="review"
                            value={formData.review} 
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors resize-none"
                            placeholder="The client's feedback..."
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Star Rating</label>
                        <div className="relative">
                            <select 
                                name="stars"
                                value={formData.stars} 
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none appearance-none cursor-pointer transition-colors"
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
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
                </div>
                
                <button 
                    onClick={() => onSave(formData)}
                    className="w-full bg-white text-black font-bold py-3.5 rounded-lg mt-6 hover:bg-gray-200 transition-colors"
                >
                    {item ? 'Save Changes' : 'Create Testimonial'}
                </button>
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

const CategoryManagerModal: React.FC<{ isOpen: boolean, onClose: () => void, categories: any[], onUpdate: () => void }> = ({ isOpen, onClose, categories, onUpdate }) => {
    // ... same as before
    const [newCategory, setNewCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleAdd = async () => {
        if (!newCategory.trim()) return;
        setIsSubmitting(true);
        
        const trimmedName = newCategory.trim();
        const slug = trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        const { error } = await supabase.from('categories').insert([{ name: trimmedName, slug }]);
        
        if (!error) {
            setNewCategory('');
            onUpdate();
        } else {
            alert('Error adding category: ' + error.message);
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (category: any) => {
        try {
            // 1. Check if used in posts
            const { count, error: countError } = await supabase
                .from('posts')
                .select('id', { count: 'exact', head: true })
                .eq('category', category.name);

            if (countError) {
                console.error("Error checking post usage:", countError);
                alert("Could not verify if category is in use. Please check console for errors.");
                return;
            }

            if (count !== null && count > 0) {
                alert(`Cannot delete category "${category.name}" because it is used in ${count} blog post(s).\n\nPlease reassign or delete those posts first.`);
                return;
            }

            if (!window.confirm(`Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`)) return;
            
            const { error: deleteError } = await supabase.from('categories').delete().eq('id', category.id);
            
            if (deleteError) {
                throw deleteError;
            }
            
            // Success
            onUpdate();
            
        } catch (error: any) {
            console.error("Delete failed:", error);
            alert('Error deleting category: ' + (error.message || 'Unknown error'));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 relative max-h-[80vh] flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-6">Manage Categories</h3>
                
                <div className="flex gap-2 mb-6">
                    <input 
                        type="text" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                    <button 
                        onClick={handleAdd}
                        disabled={isSubmitting}
                        className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {categories.length === 0 ? (
                        <p className="text-gray-500 text-center text-sm py-4">No categories found.</p>
                    ) : (
                        categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 group">
                                <span className="text-gray-300 font-medium">{cat.name}</span>
                                <button 
                                    type="button"
                                    onClick={() => handleDelete(cat)}
                                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// --- FILE MANAGER & UPLOADER COMPONENTS ---

const uploadImage = async (file: File) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const FileManager: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        const { data, error } = await supabase.storage.from('media').list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        });

        if (data) {
            setFiles(data);
        } else {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        try {
            await uploadImage(e.target.files[0]);
            await fetchFiles();
        } catch (error: any) {
            alert(`Upload failed: ${error.message || 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (name: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(name);
        navigator.clipboard.writeText(data.publicUrl);
        alert("URL Copied to clipboard!");
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Media Library</h2>
                <div className="relative">
                    <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    <label 
                        htmlFor="file-upload"
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold cursor-pointer hover:bg-gray-200 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
                    </div>
                ) : files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                        <p>No files uploaded yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {files.map((file) => {
                            const { data } = supabase.storage.from('media').getPublicUrl(file.name);
                            return (
                                <div key={file.id} className="group relative aspect-square bg-black border border-white/10 rounded-xl overflow-hidden">
                                    <img 
                                        src={data.publicUrl} 
                                        alt={file.name} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => copyToClipboard(file.name)}
                                            className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
                                            title="Copy URL"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={async () => {
                                                if(confirm('Delete file?')) {
                                                    await supabase.storage.from('media').remove([file.name]);
                                                    fetchFiles();
                                                }
                                            }}
                                            className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-black/80 p-2 text-xs text-gray-300 truncate">
                                        {file.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const ImageUploader: React.FC<{ value: string, onChange: (url: string) => void }> = ({ value, onChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        try {
            const url = await uploadImage(e.target.files[0]);
            onChange(url);
        } catch (error: any) {
            alert(`Upload failed: ${error.message || 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group relative">
                <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    accept="image/*"
                    disabled={uploading}
                />
                {uploading ? (
                    <Loader2 className="w-8 h-8 text-brand-purple animate-spin mb-2" />
                ) : (
                    <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-white mb-2 transition-colors" />
                )}
                <span className="text-xs text-gray-500">{uploading ? 'Uploading...' : 'Click or Drag to Upload'}</span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 uppercase font-bold">OR</span>
                <input 
                    className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-brand-purple/50 focus:outline-none"
                    placeholder="Paste image URL..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            {value && (
                <div className="rounded-lg overflow-hidden border border-white/10 relative group">
                    <img src={value} alt="Preview" className="w-full h-48 object-cover" />
                    <button 
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

const ServiceEditor: React.FC<{ service: any; onSave: (data: any) => void; onCancel: () => void }> = ({ service, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '', // Short description
        content: '', // Full page content
        seo_title: '',
        meta_description: '',
        status: 'Draft',
        image: '', // Featured image/icon
        pills: ['', '', '', ''] 
    });

    useEffect(() => {
        if (service) {
            const existingPills = Array.isArray(service.pills) ? service.pills : [];
            const paddedPills = [...existingPills, '', '', '', ''].slice(0, 4);
            
            setFormData({
                title: service.title || '',
                slug: service.slug || '',
                description: service.description || '',
                content: service.content || '',
                seo_title: service.seo_title || service.title || '',
                meta_description: service.meta_description || '',
                status: service.status || 'Draft',
                image: service.image || '',
                pills: paddedPills
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                description: '',
                content: '',
                seo_title: '',
                meta_description: '',
                status: 'Draft',
                image: '',
                pills: ['', '', '', '']
            });
        }
    }, [service]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug && service ? prev.slug : slug, 
            seo_title: prev.seo_title && service ? prev.seo_title : title 
        }));
    };

    const handlePillChange = (index: number, value: string) => {
        const newPills = [...formData.pills];
        newPills[index] = value;
        setFormData({ ...formData, pills: newPills });
    };

    return (
        <div className="animate-fade-in w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <button onClick={onCancel} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Services
                </button>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium">
                        Discard
                    </button>
                    <button 
                        onClick={() => onSave({ ...service, ...formData, pills: formData.pills.filter(p => p.trim() !== '') })}
                        className="px-6 py-2.5 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Save Service
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Editor Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Title & Slug */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Title</label>
                            <input 
                                type="text" 
                                placeholder="Enter service title..." 
                                className="w-full bg-transparent text-3xl md:text-4xl font-bold text-white placeholder-gray-600 focus:outline-none"
                                value={formData.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                            <Globe className="w-4 h-4 shrink-0" />
                            <span>https://infobytes.io/services/</span>
                            <input 
                                type="text" 
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="bg-transparent text-white focus:outline-none flex-1 font-mono text-xs md:text-sm"
                                placeholder="service-url-slug"
                            />
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Short Description (For Cards)</label>
                        <textarea 
                            rows={3}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief summary of the service..."
                        />
                    </div>

                    {/* Rich Text Content (Detailed Page) */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 min-h-[500px] flex flex-col">
                        <div className="px-6 py-4 border-b border-white/10">
                            <label className="text-xs font-bold text-gray-500 uppercase">Full Page Content</label>
                        </div>
                        <RichTextEditor 
                            content={formData.content} 
                            onChange={(html) => setFormData({ ...formData, content: html })} 
                        />
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
                            <Search className="w-5 h-5 text-brand-purple" />
                            <h3>On-Page SEO</h3>
                        </div>

                        <div className="mb-8 p-4 bg-black rounded-xl border border-white/5">
                            <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                                <Globe className="w-3 h-3" /> Preview
                            </div>
                            <div className="font-sans">
                                <div className="text-[#9aa0a6] text-xs mb-1">infobytes.io › services › {formData.slug || 'service'}</div>
                                <div className="text-[#8ab4f8] text-xl font-medium mb-1 truncate cursor-pointer hover:underline">
                                    {formData.seo_title || formData.title || 'Service Title'}
                                </div>
                                <div className="text-[#bdc1c6] text-sm line-clamp-2">
                                    {formData.meta_description || "Please provide a meta description to see how your page will look in search engine results."}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Meta Title</label>
                                    <span className={`text-xs ${(formData.seo_title?.length || 0) > 60 ? 'text-red-400' : 'text-green-400'}`}>
                                        {formData.seo_title?.length || 0} / 60
                                    </span>
                                </div>
                                <input 
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                                    value={formData.seo_title}
                                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                    placeholder="Enter meta title..."
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Meta Description</label>
                                    <span className={`text-xs ${(formData.meta_description?.length || 0) > 160 ? 'text-red-400' : 'text-green-400'}`}>
                                        {formData.meta_description?.length || 0} / 160
                                    </span>
                                </div>
                                <textarea 
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors resize-none"
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="Enter meta description..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Publishing</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Status</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-purple/50 focus:outline-none"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Active">Active</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Floating Pills</h4>
                        <p className="text-xs text-gray-500 mb-4">Add up to 4 tags displayed on the service card.</p>
                        <div className="space-y-3">
                            {formData.pills.map((pill, idx) => (
                                <div key={idx}>
                                    <input 
                                        value={pill}
                                        onChange={(e) => handlePillChange(idx, e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-orange/50 focus:outline-none transition-colors"
                                        placeholder={`Pill #${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Featured Image</h4>
                        <ImageUploader 
                            value={formData.image} 
                            onChange={(url) => setFormData({ ...formData, image: url })} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostEditor: React.FC<{ post: any; categories: any[]; onSave: (data: any) => void; onCancel: () => void }> = ({ post, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        seo_title: '',
        meta_description: '',
        category: '',
        status: 'Draft',
        image: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                slug: post.slug || '',
                content: post.content || '',
                seo_title: post.seo_title || post.title || '',
                meta_description: post.meta_description || '',
                category: post.category || (categories[0]?.name || ''),
                status: post.status || 'Draft',
                image: post.image || ''
            });
        } else {
             setFormData(prev => ({ ...prev, category: categories[0]?.name || '' }));
        }
    }, [post, categories]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug && post ? prev.slug : slug, // Only auto-update slug if creating new or slug empty
            seo_title: prev.seo_title && post ? prev.seo_title : title // Auto update SEO title if likely new
        }));
    };

    return (
        <div className="animate-fade-in w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <button onClick={onCancel} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Posts
                </button>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium">
                        Discard
                    </button>
                    <button 
                        onClick={() => onSave({ ...post, ...formData })}
                        className="px-6 py-2.5 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Save Post
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Editor Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Title & Slug */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="mb-6">
                            <input 
                                type="text" 
                                placeholder="Enter post title..." 
                                className="w-full bg-transparent text-3xl md:text-4xl font-bold text-white placeholder-gray-600 focus:outline-none"
                                value={formData.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                            <Globe className="w-4 h-4 shrink-0" />
                            <span>https://infobytes.io/blog/</span>
                            <input 
                                type="text" 
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="bg-transparent text-white focus:outline-none flex-1 font-mono text-xs md:text-sm"
                                placeholder="url-slug-goes-here"
                            />
                        </div>
                    </div>

                    {/* Rich Text Content */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 min-h-[500px] flex flex-col">
                        <RichTextEditor 
                            content={formData.content} 
                            onChange={(html) => setFormData({ ...formData, content: html })} 
                        />
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
                            <Search className="w-5 h-5 text-brand-purple" />
                            <h3>Search Engine Optimization</h3>
                        </div>

                        <div className="mb-8 p-4 bg-black rounded-xl border border-white/5">
                            <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                                <Globe className="w-3 h-3" /> Preview
                            </div>
                            <div className="font-sans">
                                <div className="text-[#9aa0a6] text-xs mb-1">infobytes.io › blog › {formData.slug || 'post-url'}</div>
                                <div className="text-[#8ab4f8] text-xl font-medium mb-1 truncate cursor-pointer hover:underline">
                                    {formData.seo_title || formData.title || 'Post Title'}
                                </div>
                                <div className="text-[#bdc1c6] text-sm line-clamp-2">
                                    {formData.meta_description || "Please provide a meta description to see how your post will look in search engine results."}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">SEO Title</label>
                                    <span className={`text-xs ${(formData.seo_title?.length || 0) > 60 ? 'text-red-400' : 'text-green-400'}`}>
                                        {formData.seo_title?.length || 0} / 60
                                    </span>
                                </div>
                                <input 
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors"
                                    value={formData.seo_title}
                                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                    placeholder="Enter meta title..."
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Meta Description</label>
                                    <span className={`text-xs ${(formData.meta_description?.length || 0) > 160 ? 'text-red-400' : 'text-green-400'}`}>
                                        {formData.meta_description?.length || 0} / 160
                                    </span>
                                </div>
                                <textarea 
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none transition-colors resize-none"
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="Enter meta description..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Publishing</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Status</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-purple/50 focus:outline-none"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Category</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-purple/50 focus:outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Featured Image</h4>
                        <ImageUploader 
                            value={formData.image} 
                            onChange={(url) => setFormData({ ...formData, image: url })} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... RichTextEditor component ...
const RichTextEditor: React.FC<{ content: string; onChange: (html: string) => void }> = ({ content, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Sync initial content
    useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            if (editorRef.current.innerHTML === '' || content === '') {
                editorRef.current.innerHTML = content;
            }
        }
    }, []);

    const exec = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/5 rounded-t-xl overflow-x-auto">
                <EditorBtn onClick={() => exec('bold')} icon={<Bold className="w-4 h-4" />} title="Bold" />
                <EditorBtn onClick={() => exec('italic')} icon={<Italic className="w-4 h-4" />} title="Italic" />
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <EditorBtn onClick={() => exec('formatBlock', 'H2')} icon={<Type className="w-4 h-4" />} title="Heading 2" />
                <EditorBtn onClick={() => exec('formatBlock', 'H3')} icon={<span className="text-xs font-bold">H3</span>} title="Heading 3" />
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <EditorBtn onClick={() => exec('insertUnorderedList')} icon={<List className="w-4 h-4" />} title="List" />
                <EditorBtn onClick={() => {
                    const url = prompt('Enter URL:');
                    if (url) exec('createLink', url);
                }} icon={<LinkIcon className="w-4 h-4" />} title="Link" />
                <EditorBtn onClick={() => exec('justifyLeft')} icon={<AlignLeft className="w-4 h-4" />} title="Left Align" />
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <EditorBtn onClick={() => exec('removeFormat')} icon={<X className="w-4 h-4" />} title="Clear Format" />
            </div>
            <div 
                ref={editorRef}
                contentEditable 
                onInput={handleInput}
                className="flex-1 p-6 focus:outline-none text-gray-300 leading-relaxed prose prose-invert max-w-none overflow-y-auto min-h-[300px]"
                style={{ minHeight: '300px' }}
            />
        </div>
    );
};

const EditorBtn: React.FC<{ onClick: () => void; icon: React.ReactNode; title: string }> = ({ onClick, icon, title }) => (
    <button 
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        title={title}
        type="button"
    >
        {icon}
    </button>
);