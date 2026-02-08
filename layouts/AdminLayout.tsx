import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Logo } from '../components/Logo';
import { LayoutDashboard, FolderOpen, Layers, MessageSquare, FileText, Briefcase, Users, Settings, LogOut, Bell, User, RefreshCw } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logout, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Notification State
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refreshes
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const isBlogger = profile?.role === 'blogger';

  // --- Notification Logic ---
  const fetchNotifications = async () => {
      const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
      
      if (!error && data) {
          setNotifications(data);
      }
  };

  const markAllAsRead = async () => {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      if (unreadIds.length === 0) return;

      const { error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .in('id', unreadIds);

      if (!error) {
          setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      }
  };

  useEffect(() => {
      if (!isBlogger) {
        fetchNotifications();
        const channel = supabase
            .channel('public:notifications')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
                setNotifications(prev => [payload.new, ...prev]);
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
      }
  }, [isBlogger]);

  const handleRefresh = () => {
      setIsRefreshing(true);
      setRefreshKey(prev => prev + 1);
      // Simulate a small delay for visual feedback if data fetches are too fast
      setTimeout(() => setIsRefreshing(false), 500);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-[#050505] flex font-sans text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed h-full z-20 hidden md:flex">
         <div className="p-8 border-b border-white/5">
            <Logo className="h-6 w-auto" />
         </div>
         
         <nav className="flex-1 p-4 space-y-1">
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Menu</div>
            <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Home" href="/admin/dashboard" active={location.pathname === '/admin/dashboard'} />
            
            {/* Conditional Rendering based on Role */}
            {!isBlogger && (
                <>
                    <NavItem icon={<Layers className="w-4 h-4" />} label="Services" href="/admin/dashboard/services" active={location.pathname.includes('/services')} />
                    <NavItem icon={<MessageSquare className="w-4 h-4" />} label="Testimonials" href="/admin/dashboard/testimonials" active={location.pathname.includes('/testimonials')} />
                </>
            )}
            
            <NavItem icon={<FileText className="w-4 h-4" />} label="Posts" href="/admin/dashboard/posts" active={location.pathname.includes('/posts')} />
            
            {!isBlogger && (
                <>
                    <NavItem icon={<Briefcase className="w-4 h-4" />} label="Case Studies" href="/admin/dashboard/casestudies" active={location.pathname.includes('/casestudies')} />
                    <NavItem icon={<Users className="w-4 h-4" />} label="Leads" href="/admin/dashboard/leads" active={location.pathname.includes('/leads')} />
                </>
            )}
            
            <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-widest mt-8 mb-2">System</div>
            <NavItem icon={<FolderOpen className="w-4 h-4" />} label="Files" href="/admin/dashboard/files" active={location.pathname.includes('/files')} />
            <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" href="/admin/dashboard/settings" active={location.pathname.includes('/settings')} />
         </nav>

         <div className="p-4 border-t border-white/5 space-y-2">
            <div className="px-4 py-2 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple border border-brand-purple/30">
                  {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover rounded-full" /> : <User className="w-4 h-4" />}
               </div>
               <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-bold truncate">{profile?.full_name || 'Admin'}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{profile?.role || 'User'}</div>
               </div>
            </div>
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
            </button>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen bg-[#050505] flex flex-col">
         <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
            <h1 className="text-white font-bold text-lg capitalize">{location.pathname.split('/').pop()}</h1>
            <div className="flex items-center gap-4">
                
                {/* Refresh Button */}
                <button 
                    onClick={handleRefresh} 
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/10"
                    title="Refresh Data"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-orange' : ''}`} />
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
                        <Bell className="w-4 h-4" />
                        {unreadCount > 0 && <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-black shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>}
                    </button>
                    {isNotificationOpen && (
                        <div className="absolute right-0 top-12 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                            <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h4 className="text-sm font-bold text-white">Notifications</h4>
                                <button onClick={markAllAsRead} className="text-[10px] font-medium text-brand-orange hover:text-white underline underline-offset-2 transition-colors">Mark all as read</button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length === 0 ? <div className="p-8 text-center text-gray-500 text-xs">No notifications yet.</div> : notifications.map((notif) => (
                                    <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${!notif.is_read ? 'bg-white/[0.02]' : ''}`}>
                                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.is_read ? 'bg-brand-orange' : 'bg-transparent'}`}></div>
                                        <div className="flex-1">
                                            <p className={`text-xs mb-1 ${!notif.is_read ? 'text-white font-medium' : 'text-gray-400'}`}>{notif.message}</p>
                                            <span className="text-[10px] text-gray-600">{new Date(notif.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
         </header>

         <div className="p-6 md:p-8 flex-1">
            <Outlet context={{ refreshKey }} />
         </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; href: string }> = ({ icon, label, active, href }) => {
    const navigate = useNavigate();
    return (
        <button 
            onClick={() => navigate(href)}
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
};