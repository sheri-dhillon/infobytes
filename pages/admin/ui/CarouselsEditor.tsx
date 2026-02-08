import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, CheckCircle, Image as ImageIcon, RefreshCw, Upload, Pause, ArrowLeft, ArrowRight, Mail } from 'lucide-react';

interface CarouselItem {
    url: string;
    alt: string;
}

interface CarouselConfig {
    direction: 'left' | 'right';
    speed: 'slow' | 'normal' | 'fast';
    pauseOnHover: boolean;
    items: CarouselItem[]; // Generic name 'items' to handle both logos and templates
}

const DEFAULT_CONFIG: CarouselConfig = {
    direction: 'left',
    speed: 'normal',
    pauseOnHover: true,
    items: []
};

// --- Helper: Image Upload Component ---
const ImageUploader: React.FC<{ onUpload: (url: string) => void; label?: string }> = ({ onUpload, label = "Upload Image" }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `carousel/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        try {
            const { error } = await supabase.storage.from('media').upload(fileName, file);
            if (error) throw error;
            const { data } = supabase.storage.from('media').getPublicUrl(fileName);
            onUpload(data.publicUrl);
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-2">
            {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
            {label}
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
    );
};

export const CarouselsEditor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'logos' | 'templates'>('logos');
    
    // Separate states for each carousel to avoid conflicts
    const [logoConfig, setLogoConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
    const [templateConfig, setTemplateConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            // Fetch Logos
            const { data: logoData } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'client_logos')
                .single();
            
            // Fetch Templates
            const { data: templateData } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'email_templates')
                .single();
            
            if (logoData && logoData.value) {
                setLogoConfig({
                    ...DEFAULT_CONFIG,
                    ...logoData.value,
                    items: logoData.value.logos || logoData.value.items || [] // Handle legacy 'logos' key if present
                });
            }

            if (templateData && templateData.value) {
                setTemplateConfig({
                    ...DEFAULT_CONFIG,
                    ...templateData.value,
                    items: templateData.value.images || templateData.value.items || [] // Handle 'images' vs 'items'
                });
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
            if (activeTab === 'logos') {
                const { error } = await supabase
                    .from('site_settings')
                    .upsert({ 
                        key: 'client_logos', 
                        value: { ...logoConfig, logos: logoConfig.items } // Store as 'logos' to match previous schema if preferred, or standardise to items
                    });
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('site_settings')
                    .upsert({ 
                        key: 'email_templates', 
                        value: { ...templateConfig, images: templateConfig.items } // Store as 'images' to match context
                    });
                if (error) throw error;
            }

            setMsg('Carousel settings updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Helpers for Active Tab ---
    const currentConfig = activeTab === 'logos' ? logoConfig : templateConfig;
    const setCurrentConfig = activeTab === 'logos' ? setLogoConfig : setTemplateConfig;

    // --- Actions ---

    const addItem = (url: string) => {
        setCurrentConfig(prev => ({
            ...prev,
            items: [...prev.items, { url, alt: activeTab === 'logos' ? 'Client Logo' : 'Email Template' }]
        }));
    };

    const removeItem = (index: number) => {
        setCurrentConfig(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const updateItemAlt = (index: number, alt: string) => {
        const newItems = [...currentConfig.items];
        newItems[index] = { ...newItems[index], alt };
        setCurrentConfig(prev => ({ ...prev, items: newItems }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Carousels Manager</h2>
                    <p className="text-gray-400 text-sm">Manage infinite scroll carousels for your site.</p>
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
            <div className="flex border-b border-white/10 mb-8">
                <button 
                    onClick={() => setActiveTab('logos')}
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'logos' ? 'border-brand-purple text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    <ImageIcon className="w-4 h-4" /> Client Logos
                </button>
                <button 
                    onClick={() => setActiveTab('templates')}
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'templates' ? 'border-brand-orange text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    <Mail className="w-4 h-4" /> Email Templates
                </button>
            </div>

            <div className="space-y-8 animate-fade-in">
                {/* Settings Panel */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Speed */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> Animation Speed
                        </label>
                        <div className="flex gap-2">
                            {['slow', 'normal', 'fast'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setCurrentConfig({...currentConfig, speed: s as any})}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-colors border ${currentConfig.speed === s ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Direction */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Direction
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentConfig({...currentConfig, direction: 'left'})}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors border flex items-center justify-center gap-2 ${currentConfig.direction === 'left' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                            >
                                <ArrowLeft className="w-3 h-3" /> Left
                            </button>
                            <button
                                onClick={() => setCurrentConfig({...currentConfig, direction: 'right'})}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors border flex items-center justify-center gap-2 ${currentConfig.direction === 'right' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                            >
                                Right <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Hover Behavior */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <Pause className="w-3 h-3" /> Hover Behavior
                        </label>
                        <div className="flex items-center justify-between h-full pb-2">
                            <span className="text-sm text-gray-300">Pause on mouse hover?</span>
                            <div 
                                onClick={() => setCurrentConfig({...currentConfig, pauseOnHover: !currentConfig.pauseOnHover})}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${currentConfig.pauseOnHover ? 'bg-brand-purple' : 'bg-gray-700'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${currentConfig.pauseOnHover ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Management */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">Manage {activeTab === 'logos' ? 'Logos' : 'Templates'}</h3>
                            <p className="text-xs text-gray-500">Drag and drop reordering coming soon.</p>
                        </div>
                        <ImageUploader onUpload={addItem} label={`Upload ${activeTab === 'logos' ? 'Logo' : 'Template'}`} />
                    </div>

                    {currentConfig.items.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl">
                            No {activeTab === 'logos' ? 'logos' : 'templates'} added. Upload one to get started.
                        </div>
                    ) : (
                        <div className={`grid gap-6 ${activeTab === 'logos' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 md:grid-cols-3'}`}>
                            {currentConfig.items.map((item, index) => (
                                <div key={index} className="group relative bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/30 transition-colors">
                                    <div className={`bg-white/5 rounded-lg flex items-center justify-center overflow-hidden relative ${activeTab === 'logos' ? 'aspect-square' : 'aspect-[3/4]'}`}>
                                        <img 
                                            src={item.url} 
                                            alt={item.alt} 
                                            className={`object-contain ${activeTab === 'logos' ? 'w-3/4 h-3/4' : 'w-full h-full'}`} 
                                        />
                                        <button 
                                            onClick={() => removeItem(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Alt Text</label>
                                        <input 
                                            type="text" 
                                            value={item.alt}
                                            onChange={(e) => updateItemAlt(index, e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:border-white/30 outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
