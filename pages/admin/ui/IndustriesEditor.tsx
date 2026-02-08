
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, CheckCircle, GripVertical, Box, CreditCard, GraduationCap, Heart, Layers, ShoppingBag, Building2, Globe, Cpu, Shield } from 'lucide-react';

// Icon Mapping for Dropdown
const ICONS: Record<string, any> = {
    Box, CreditCard, GraduationCap, Heart, Layers, ShoppingBag, Building2, Globe, Cpu, Shield
};

const THEMES = ['purple', 'yellow', 'green', 'teal', 'blue', 'orange', 'indigo', 'pink', 'red'];

interface IndustryItem {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    theme: string;
}

interface IndustriesConfig {
    title: string;
    description: string;
    items: IndustryItem[];
}

const DEFAULT_CONFIG: IndustriesConfig = {
    title: "Industries",
    description: "We work across high-impact industries...",
    items: []
};

export const IndustriesEditor: React.FC = () => {
    const [config, setConfig] = useState<IndustriesConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'industries_section')
                .single();
            
            if (data && data.value) {
                // PATCH: Ensure all items have a String ID to prevent delete issues
                const loadedItems = data.value.items || [];
                const patchedItems = loadedItems.map((item: any, idx: number) => ({
                    ...item,
                    id: item.id ? String(item.id) : `auto-${idx}-${Date.now()}`
                }));

                setConfig({ ...DEFAULT_CONFIG, ...data.value, items: patchedItems });
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
                    key: 'industries_section', 
                    value: config 
                });

            if (error) throw error;
            setMsg('Industries section updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Item Management ---

    const addItem = () => {
        const newItem: IndustryItem = {
            id: Date.now().toString(),
            title: 'New Industry',
            description: 'Industry description...',
            icon_name: 'Box',
            theme: 'purple'
        };
        setConfig(prev => ({ ...prev, items: [...prev.items, newItem] }));
        setEditingId(newItem.id);
    };

    const updateItem = (id: string, field: keyof IndustryItem, value: string) => {
        setConfig(prev => ({
            ...prev,
            items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeItem = (id: string) => {
        if (!window.confirm("Remove this industry?")) return;
        // String comparison ensures '1' (string) removes 1 (number) if type mismatch exists in DB
        setConfig(prev => ({
            ...prev,
            items: prev.items.filter(item => String(item.id) !== String(id))
        }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Industries Section</h2>
                    <p className="text-gray-400 text-sm">Manage the industries horizontal scroll list.</p>
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

            <div className="space-y-8">
                
                {/* Global Settings */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Section Header</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                            <input 
                                value={config.title}
                                onChange={(e) => setConfig({...config, title: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                            <textarea 
                                value={config.description}
                                onChange={(e) => setConfig({...config, description: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-24 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Industries List */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                        <h3 className="text-lg font-bold text-white">Industry Cards</h3>
                        <button onClick={addItem} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add Industry
                        </button>
                    </div>

                    <div className="space-y-4">
                        {config.items.map((item, index) => {
                            const IconComponent = ICONS[item.icon_name] || Box;
                            return (
                                <div key={item.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/20">
                                    <div 
                                        className="p-4 flex items-center justify-between cursor-pointer bg-white/[0.02]"
                                        onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Preview Icon with dynamic style approximation for editor */}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 ${item.theme === 'purple' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 bg-white/5'}`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-white text-sm">{item.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2 relative z-10">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5`}>{item.theme}</span>
                                            <button 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    e.stopPropagation(); 
                                                    removeItem(item.id); 
                                                }} 
                                                className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {editingId === item.id && (
                                        <div className="p-6 border-t border-white/5 space-y-4 bg-black/30 animate-fade-in">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                                                    <input 
                                                        value={item.title}
                                                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Icon</label>
                                                        <select 
                                                            value={item.icon_name}
                                                            onChange={(e) => updateItem(item.id, 'icon_name', e.target.value)}
                                                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                        >
                                                            {Object.keys(ICONS).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Color Theme</label>
                                                        <select 
                                                            value={item.theme}
                                                            onChange={(e) => updateItem(item.id, 'theme', e.target.value)}
                                                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-purple outline-none"
                                                        >
                                                            {THEMES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                                                <textarea 
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    rows={3}
                                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-brand-purple outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};
