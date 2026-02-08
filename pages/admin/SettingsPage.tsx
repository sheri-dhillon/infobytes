import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js'; 
import { User, Lock, Shield, Save, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react';

// Define VITE env vars for manual client creation
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://yzhiautmlscflysrqxtm.supabase.co';
const SUPABASE_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6aGlhdXRtbHNjZmx5c3JxeHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDU2NzcsImV4cCI6MjA4NTI4MTY3N30.1ZL3Db_rUstFttlJ7PKYJYLz9w9CFn2Fk-2bYFpSZcU';

// Reuse upload helper
const uploadImage = async (file: File) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`; // Put in avatars folder

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

export const SettingsPage: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'team'>('profile');

  // --- Profile State ---
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false); // New state
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  // --- Password State ---
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  // --- Team State ---
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null); // For role updates

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    if (activeTab === 'team' && profile?.role === 'admin') {
      fetchTeam();
    }
  }, [activeTab]);

  const fetchTeam = async () => {
    setIsLoadingTeam(true);
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setTeamMembers(data);
    setIsLoadingTeam(false);
  };

  // --- Profile Actions ---

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return;
      setIsUploadingAvatar(true);
      setProfileMsg({ type: '', text: '' });
      try {
          const url = await uploadImage(e.target.files[0]);
          setAvatarUrl(url);
      } catch (error: any) {
          setProfileMsg({ type: 'error', text: 'Failed to upload image: ' + error.message });
      } finally {
          setIsUploadingAvatar(false);
      }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMsg({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq('id', user?.id);

      if (error) throw error;

      await refreshProfile();
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPassMsg({ type: 'error', text: "New passwords don't match." });
      return;
    }
    
    setIsChangingPass(true);
    setPassMsg({ type: '', text: '' });

    try {
      // 1. Verify old password using a TEMPORARY client.
      // We do this to prevent the main session from refreshing/changing which causes infinite loaders or redirects.
      const tempClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
          auth: {
              persistSession: false, // Important: Don't overwrite local storage
              autoRefreshToken: false,
              detectSessionInUrl: false
          }
      });

      const { error: signInError } = await tempClient.auth.signInWithPassword({
        email: user?.email || '',
        password: passwords.old
      });

      if (signInError) throw new Error("Incorrect old password.");

      // 2. Update password using the MAIN client (authenticated user)
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (updateError) throw updateError;

      setPassMsg({ type: 'success', text: 'Password updated successfully.' });
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err: any) {
      setPassMsg({ type: 'error', text: err.message });
    } finally {
      setIsChangingPass(false);
    }
  };

  // --- Team Actions ---

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (profile?.role !== 'admin') return;

    const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
    
    if (!error) {
        fetchTeam();
        setEditingMember(null);
    } else {
        alert("Failed to update role");
    }
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'profile' ? 'border-brand-purple text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          <User className="w-4 h-4" /> My Profile
        </button>
        {profile?.role === 'admin' && (
          <button 
            onClick={() => setActiveTab('team')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'team' ? 'border-brand-purple text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Shield className="w-4 h-4" /> Team & Roles
          </button>
        )}
      </div>

      {activeTab === 'profile' && (
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Public Profile Form */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                   <User className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Public Profile</h3>
             </div>

             <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 overflow-hidden shrink-0 relative group">
                      {isUploadingAvatar ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                      ) : avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                           <User className="w-8 h-8" />
                        </div>
                      )}
                      
                      {/* Upload Overlay */}
                      <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <Upload className="w-6 h-6 text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                      </label>
                   </div>
                   
                   <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Profile Picture</label>
                      <div className="flex items-center gap-3">
                          <label className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white cursor-pointer hover:bg-white/10 transition-colors">
                              Upload New
                              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                          </label>
                          {avatarUrl && (
                              <button 
                                type="button" 
                                onClick={() => setAvatarUrl('')} 
                                className="text-xs text-red-400 hover:text-red-300 underline"
                              >
                                  Remove
                              </button>
                          )}
                      </div>
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                   <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none"
                      placeholder="Your Name"
                   />
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                   <input 
                      type="email" 
                      value={user?.email}
                      disabled
                      className="w-full bg-white/5 border border-transparent rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                   />
                </div>

                {profileMsg.text && (
                  <div className={`text-sm flex items-center gap-2 ${profileMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                     {profileMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                     {profileMsg.text}
                  </div>
                )}

                <button 
                  disabled={isSavingProfile || isUploadingAvatar}
                  className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                   {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                   Save Profile
                </button>
             </form>
          </div>

          {/* Security Form */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                   <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Security</h3>
             </div>

             <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Old Password</label>
                   <input 
                      type="password" 
                      value={passwords.old}
                      onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none"
                      required
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">New Password</label>
                   <input 
                      type="password" 
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none"
                      required
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Confirm New Password</label>
                   <input 
                      type="password" 
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple/50 focus:outline-none"
                      required
                   />
                </div>

                {passMsg.text && (
                  <div className={`text-sm flex items-center gap-2 ${passMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                     {passMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                     {passMsg.text}
                  </div>
                )}

                <button 
                  disabled={isChangingPass}
                  className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg font-bold hover:bg-white/5 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                   {isChangingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                   Update Password
                </button>
             </form>
          </div>

        </div>
      )}

      {activeTab === 'team' && (
        <div>
           <div className="flex justify-between items-end mb-6">
                <div className="bg-[#111] border border-brand-orange/20 rounded-xl p-6 flex items-start gap-4 max-w-2xl">
                    <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Manage Access</h4>
                        <p className="text-gray-400 text-sm mb-2">Manage team roles and permissions.</p>
                        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                            <li><strong className="text-gray-300">Admin:</strong> Full access + Team management.</li>
                            <li><strong className="text-gray-300">Manager:</strong> Read-only access.</li>
                            <li><strong className="text-gray-300">Editor:</strong> Full access to Posts only.</li>
                        </ul>
                    </div>
                </div>
           </div>

           <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                       <th className="p-4 text-xs font-bold text-gray-500 uppercase">User</th>
                       <th className="p-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                       <th className="p-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                       <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {teamMembers.map((member) => (
                       <tr key={member.id} className="hover:bg-white/[0.02]">
                          <td className="p-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                   {member.avatar_url ? <img src={member.avatar_url} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-gray-400" />}
                                </div>
                                <div>
                                   <div className="text-white font-bold text-sm">{member.full_name || 'Unnamed'}</div>
                                   <div className="text-gray-500 text-xs">{member.email}</div>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             {editingMember === member.id ? (
                                <select 
                                  className="bg-black border border-white/20 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-brand-purple"
                                  defaultValue={member.role}
                                  onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                  onBlur={() => setEditingMember(null)}
                                >
                                   <option value="admin">Admin</option>
                                   <option value="manager">Manager</option>
                                   <option value="blogger">Editor</option>
                                </select>
                             ) : (
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${
                                   member.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                   member.role === 'blogger' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                   'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                }`}>
                                   {member.role === 'blogger' ? 'Editor' : member.role}
                                </span>
                             )}
                          </td>
                          <td className="p-4 text-sm text-gray-500">
                             {new Date(member.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                             {member.id !== user?.id && (
                                <button 
                                  onClick={() => setEditingMember(member.id)}
                                  className="text-gray-400 hover:text-white transition-colors text-sm underline"
                                >
                                   Change Role
                                </button>
                             )}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};