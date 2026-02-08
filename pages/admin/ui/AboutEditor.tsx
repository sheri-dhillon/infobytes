import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, CheckCircle, Upload, GripVertical, Linkedin, Move, Smartphone, Monitor } from 'lucide-react';

// --- Types ---
interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin: string; // Added LinkedIn field
    span: string; // 'col-span-1' | 'col-span-2 row-span-2'
}

interface StatItem {
    id: number;
    value: string;
    label: string;
    theme: string;
    x: number; // Desktop X
    y: number; // Desktop Y
    mx: number; // Mobile X
    my: number; // Mobile Y
}

interface AboutConfig {
    hero: {
        pill: string;
        title_line1: string;
        title_line2: string;
        description: string;
        cta_text: string;
        cta_link: string;
        secondary_text: string;
    };
    team: TeamMember[];
    impact: {
        label: string;
        content: string;
    };
    culture_images: string[];
    stats: StatItem[];
}

const DEFAULT_CONFIG: AboutConfig = {
    hero: {
        pill: "Design studio",
        title_line1: "Good design",
        title_line2: "makes life better.",
        description: "",
        cta_text: "Book Call",
        cta_link: "#",
        secondary_text: "Got an idea?"
    },
    team: [],
    impact: { label: "", content: "" },
    culture_images: [],
    stats: []
};

// --- Image Picker Component ---
const ImagePicker: React.FC<{ value: string; onChange: (url: string) => void }> = ({ value, onChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `about/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        try {
            const { error } = await supabase.storage.from('media').upload(fileName, file);
            if (error) throw error;
            const { data } = supabase.storage.from('media').getPublicUrl(fileName);
            onChange(data.publicUrl);
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative group w-full h-full min-h-[100px] bg-black border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
            {value ? (
                <>
                    <img src={value} alt="Uploaded" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                    <button 
                        onClick={() => onChange('')} 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-6 h-6 text-red-500" />
                    </button>
                </>
            ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2 w-full h-full text-gray-500 hover:text-white transition-colors">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                    <span className="text-xs">Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
            )}
        </div>
    );
};

export const AboutEditor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hero' | 'team' | 'impact' | 'culture' | 'stats'>('hero');
    const [config, setConfig] = useState<AboutConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'about_page')
                .single();
            
            if (data && data.value) {
                // Merge with default to ensure no crashes
                const merged = { ...DEFAULT_CONFIG, ...data.value };
                // Ensure stats exists
                if (!merged.stats) merged.stats = [];
                // Ensure team linkedin field exists
                if (merged.team) {
                    merged.team = merged.team.map((t: any) => ({ ...t, linkedin: t.linkedin || '' }));
                }
                setConfig(merged);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ 
                    key: 'about_page', 
                    value: config 
                });

            if (error) throw error;
            setMsg('About page updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Helpers ---
    const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
        const newTeam = [...config.team];
        newTeam[index] = { ...newTeam[index], [field]: value };
        setConfig({ ...config, team: newTeam });
    };

    const addTeamMember = () => {
        setConfig({
            ...config,
            team: [...config.team, { name: 'New Member', role: 'Role', image: '', linkedin: '', span: 'col-span-1' }]
        });
    };

    const removeTeamMember = (index: number) => {
        const newTeam = config.team.filter((_, i) => i !== index);
        setConfig({ ...config, team: newTeam });
    };

    const addStat = () => {
        setConfig({
            ...config,
            stats: [
                ...config.stats,
                { id: Date.now(), value: '00+', label: 'New Stat', theme: 'white', x: 0, y: 0, mx: 0, my: 0 }
            ]
        });
    };

    const updateStat = (index: number, field: keyof StatItem, value: any) => {
        const newStats = [...config.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setConfig({ ...config, stats: newStats });
    };

    const removeStat = (index: number) => {
        const newStats = config.stats.filter((_, i) => i !== index);
        setConfig({ ...config, stats: newStats });
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">About Page Manager</h2>
                    <p className="text-gray-400 text-sm">Update hero content, team members, and stats.</p>
                </div>
                <div className="flex items-center gap-3">
                    {msg && <span className="text-green-400 text-sm flex items-center gap-1 animate-fade-in"><CheckCircle className="w-4 h-4"/> Saved</span>}
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="bg-white text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
                {['hero', 'team', 'impact', 'culture', 'stats'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab ? 'border-brand-purple text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* --- Hero Tab --- */}
            {activeTab === 'hero' && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Top Pill Text</label>
                        <input 
                            value={config.hero.pill}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, pill: e.target.value}})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Headline Line 1</label>
                            <input 
                                value={config.hero.title_line1}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, title_line1: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Headline Line 2</label>
                            <input 
                                value={config.hero.title_line2}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, title_line2: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                        <textarea 
                            value={config.hero.description}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, description: e.target.value}})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-24 resize-none"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CTA Text</label>
                            <input 
                                value={config.hero.cta_text}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, cta_text: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CTA Link</label>
                            <input 
                                value={config.hero.cta_link}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, cta_link: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Secondary Text</label>
                            <input 
                                value={config.hero.secondary_text}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, secondary_text: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* --- Team Tab --- */}
            {activeTab === 'team' && (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <button onClick={addTeamMember} className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
                            <Plus className="w-4 h-4" /> Add Member
                        </button>
                    </div>
                    <div className="space-y-4">
                        {config.team.map((member, index) => (
                            <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 relative group flex flex-col md:flex-row gap-6">
                                <button 
                                    onClick={() => removeTeamMember(index)} 
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="w-32 h-32 shrink-0">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Photo</label>
                                    <ImagePicker value={member.image} onChange={(url) => updateTeamMember(index, 'image', url)} />
                                </div>

                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                                        <input 
                                            value={member.name}
                                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label>
                                        <input 
                                            value={member.role}
                                            onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                            placeholder="Role"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                                            <Linkedin className="w-3 h-3 text-blue-400" /> LinkedIn URL
                                        </label>
                                        <input 
                                            value={member.linkedin}
                                            onChange={(e) => updateTeamMember(index, 'linkedin', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Layout Size</label>
                                        <select 
                                            value={member.span}
                                            onChange={(e) => updateTeamMember(index, 'span', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                        >
                                            <option value="col-span-1">Regular (1x1)</option>
                                            <option value="col-span-2 row-span-2">Large (2x2)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Impact Tab --- */}
            {activeTab === 'impact' && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Section Label (Small)</label>
                        <input 
                            value={config.impact.label}
                            onChange={(e) => setConfig({...config, impact: {...config.impact, label: e.target.value}})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Main Content (Large)</label>
                        <textarea 
                            value={config.impact.content}
                            onChange={(e) => setConfig({...config, impact: {...config.impact, content: e.target.value}})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-32 resize-none"
                        />
                    </div>
                </div>
            )}

            {/* --- Culture Tab --- */}
            {activeTab === 'culture' && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Culture Scroll Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {config.culture_images.map((img, index) => (
                            <div key={index} className="aspect-video relative group">
                                <ImagePicker value={img} onChange={(url) => {
                                    const newImgs = [...config.culture_images];
                                    if(url) newImgs[index] = url;
                                    else newImgs.splice(index, 1);
                                    setConfig({...config, culture_images: newImgs});
                                }} />
                            </div>
                        ))}
                        {/* Add New Slot */}
                        <div className="aspect-video border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:border-white/30 transition-colors">
                            <label className="cursor-pointer flex flex-col items-center gap-2">
                                <Plus className="w-6 h-6 text-gray-500" />
                                <span className="text-xs text-gray-500">Add Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                    if (e.target.files?.[0]) {
                                        // Quick inline upload for new item
                                        const file = e.target.files[0];
                                        const fileName = `about/${Date.now()}_culture.${file.name.split('.').pop()}`;
                                        const { data } = await supabase.storage.from('media').upload(fileName, file);
                                        if (data) {
                                            const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(fileName);
                                            setConfig(prev => ({...prev, culture_images: [...prev.culture_images, publicUrl.publicUrl]}));
                                        }
                                    }
                                }} />
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Stats Tab --- */}
            {activeTab === 'stats' && (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <button onClick={addStat} className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
                            <Plus className="w-4 h-4" /> Add Stat Card
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {config.stats.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-gray-500">
                                No stats added yet. Click "Add Stat Card" to begin.
                            </div>
                        ) : (
                            config.stats.map((stat, index) => (
                                <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 relative">
                                    <button 
                                        onClick={() => removeStat(index)} 
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="flex items-center gap-2 mb-4">
                                        <h4 className="text-sm font-bold text-white">Stat #{index + 1}</h4>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Data */}
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Value</label>
                                                    <input 
                                                        value={stat.value}
                                                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                                                        className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                        placeholder="e.g. 150+"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Theme</label>
                                                    <select 
                                                        value={stat.theme}
                                                        onChange={(e) => updateStat(index, 'theme', e.target.value)}
                                                        className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                    >
                                                        <option value="white">White</option>
                                                        <option value="orange">Orange</option>
                                                        <option value="purple">Purple</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Label</label>
                                                <input 
                                                    value={stat.label}
                                                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                    placeholder="e.g. Clients Served"
                                                />
                                            </div>
                                        </div>

                                        {/* Coordinates */}
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-bold uppercase">
                                                <Move className="w-3 h-3" /> Position Settings
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-300">
                                                        <Monitor className="w-3 h-3" /> Desktop
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div><label className="text-[9px] text-gray-500">X Offset</label><input type="number" value={stat.x} onChange={e => updateStat(index, 'x', Number(e.target.value))} className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-xs"/></div>
                                                        <div><label className="text-[9px] text-gray-500">Y Offset</label><input type="number" value={stat.y} onChange={e => updateStat(index, 'y', Number(e.target.value))} className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-xs"/></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-300">
                                                        <Smartphone className="w-3 h-3" /> Mobile
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div><label className="text-[9px] text-gray-500">X Offset</label><input type="number" value={stat.mx} onChange={e => updateStat(index, 'mx', Number(e.target.value))} className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-xs"/></div>
                                                        <div><label className="text-[9px] text-gray-500">Y Offset</label><input type="number" value={stat.my} onChange={e => updateStat(index, 'my', Number(e.target.value))} className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-xs"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};
