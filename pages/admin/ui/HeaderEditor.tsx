import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, GripVertical, Trash2, Plus, Image as ImageIcon, CheckCircle, RotateCcw } from 'lucide-react';

interface MenuItem {
    label: string;
    href: string;
    id: string; // Internal ID for keying
}

interface HeaderConfig {
    logo_url: string;
    logo_alt: string; // Added alt text
    cta_text: string;
    cta_link: string;
    availability_status: 'available' | 'partially_available' | 'not_available';
    menu_items: MenuItem[];
}

// Custom Image Picker Reused logic
const ImagePicker: React.FC<{ value: string; onChange: (url: string) => void }> = ({ value, onChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `logos/${Date.now()}_logo.${fileExt}`;

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
        <div className="flex items-center gap-6 bg-black border border-white/10 rounded-xl p-4">
            <div className="w-32 h-16 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center overflow-hidden relative group">
                {value ? (
                    <img src={value} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
                ) : (
                    <ImageIcon className="text-gray-600" />
                )}
            </div>
            <div>
                <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload Logo'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
                <p className="text-[10px] text-gray-500 mt-2">Recommended height: 48px. PNG or SVG.</p>
            </div>
        </div>
    );
};

export const HeaderEditor: React.FC = () => {
    const [config, setConfig] = useState<HeaderConfig>({
        logo_url: '',
        logo_alt: 'InfoBytes',
        cta_text: 'Book Call',
        cta_link: '#',
        availability_status: 'available',
        menu_items: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    // --- Drag and Drop State ---
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'header')
                .single();
            
            if (data && data.value) {
                // Ensure IDs exist for menu items and availability_status defaults
                const loadedConfig = data.value;
                if(loadedConfig.menu_items) {
                    loadedConfig.menu_items = loadedConfig.menu_items.map((item: any) => ({
                        ...item,
                        id: item.id || Math.random().toString(36).substr(2, 9)
                    }));
                }
                if (!loadedConfig.availability_status) {
                    loadedConfig.availability_status = 'available';
                }
                if (!loadedConfig.logo_alt) {
                    loadedConfig.logo_alt = 'InfoBytes';
                }
                setConfig(loadedConfig);
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
                    key: 'header', 
                    value: config 
                });

            if (error) throw error;
            setMsg('Header updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Menu Actions ---

    const addMenuItem = () => {
        setConfig(prev => ({
            ...prev,
            menu_items: [...prev.menu_items, { label: 'New Link', href: '/', id: Math.random().toString(36).substr(2, 9) }]
        }));
    };

    const updateMenuItem = (index: number, field: 'label' | 'href', value: string) => {
        const newItems = [...config.menu_items];
        newItems[index] = { ...newItems[index], [field]: value };
        setConfig(prev => ({ ...prev, menu_items: newItems }));
    };

    const removeMenuItem = (index: number) => {
        const newItems = config.menu_items.filter((_, i) => i !== index);
        setConfig(prev => ({ ...prev, menu_items: newItems }));
    };

    // --- DnD Logic ---
    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        
        const _menuItems = [...config.menu_items];
        const draggedItemContent = _menuItems.splice(dragItem.current, 1)[0];
        
        _menuItems.splice(dragOverItem.current, 0, draggedItemContent);
        
        dragItem.current = null;
        dragOverItem.current = null;
        
        setConfig(prev => ({ ...prev, menu_items: _menuItems }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Header Configuration</h2>
                    <p className="text-gray-400 text-sm">Update logo, menu links, and call-to-action button.</p>
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
                
                {/* Logo Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Branding</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Website Logo</label>
                            <ImagePicker value={config.logo_url} onChange={(url) => setConfig({...config, logo_url: url})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Logo Alt Text (SEO)</label>
                            <input 
                                type="text" 
                                value={config.logo_alt}
                                onChange={(e) => setConfig({...config, logo_alt: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                                placeholder="e.g. InfoBytes Agency Logo"
                            />
                            <p className="text-[10px] text-gray-500 mt-2">Descriptive text for accessibility and search engines.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Call to Action (Right Button)</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Button Text</label>
                            <input 
                                type="text" 
                                value={config.cta_text}
                                onChange={(e) => setConfig({...config, cta_text: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Button Link</label>
                            <input 
                                type="text" 
                                value={config.cta_link}
                                onChange={(e) => setConfig({...config, cta_link: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Availability Status</label>
                        <div className="relative">
                            <select
                                value={config.availability_status}
                                onChange={(e) => setConfig({...config, availability_status: e.target.value as any})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors appearance-none"
                            >
                                <option value="available">Available (Green Dot)</option>
                                <option value="partially_available">Partially Available (Yellow Dot)</option>
                                <option value="not_available">Not Available (Red Dot)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <div className={`w-3 h-3 rounded-full ${
                                    config.availability_status === 'available' ? 'bg-green-500' :
                                    config.availability_status === 'partially_available' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Builder Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                        <h3 className="text-lg font-bold text-white">Menu Items</h3>
                        <button onClick={addMenuItem} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {config.menu_items.map((item, index) => (
                            <div 
                                key={item.id}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() => (dragOverItem.current = index)}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                                className="group flex items-center gap-4 bg-[#111] border border-white/5 p-4 rounded-xl hover:border-white/20 transition-all cursor-move relative"
                            >
                                <div className="text-gray-600 group-hover:text-white cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4 flex-1">
                                    <div className="flex flex-col">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1">Label</label>
                                        <input 
                                            value={item.label}
                                            onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                                            className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1">Destination URL</label>
                                        <input 
                                            value={item.href}
                                            onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                                            className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300 focus:border-white/30 outline-none"
                                        />
                                    </div>
                                </div>

                                <button 
                                    onClick={() => removeMenuItem(index)}
                                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                                    title="Remove Item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        
                        {config.menu_items.length === 0 && (
                            <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-white/10 rounded-xl">
                                No menu items defined. Click "Add Link" to start.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
