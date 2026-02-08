import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, CheckCircle, GripVertical, ChevronDown, ChevronRight, LayoutTemplate } from 'lucide-react';

interface LinkItem {
    label: string;
    href: string;
}

interface Column {
    title: string;
    links: LinkItem[];
}

interface SocialLink {
    name: string;
    icon: string;
    href: string;
}

interface FooterConfig {
    marquee_text_1: string;
    marquee_text_2: string;
    contact_heading: string;
    contact_subheading: string;
    email: string;
    booking_link: string;
    copyright_text: string;
    social_links: SocialLink[];
    columns: Column[];
}

const DEFAULT_CONFIG: FooterConfig = {
    marquee_text_1: "Let's Make Something Great",
    marquee_text_2: "Together",
    contact_heading: "Got a vision?",
    contact_subheading: "Let's architect your digital legacy with precision and style.",
    email: "hello@infobytes.io",
    booking_link: "#",
    copyright_text: "© 2026 InfoBytes Agency. All rights reserved.",
    social_links: [],
    columns: []
};

export const FooterEditor: React.FC = () => {
    const [config, setConfig] = useState<FooterConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');
    const [expandedCol, setExpandedCol] = useState<number | null>(0);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'footer')
                .single();
            
            if (data && data.value) {
                setConfig({ ...DEFAULT_CONFIG, ...data.value });
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
                    key: 'footer', 
                    value: config 
                });

            if (error) throw error;
            setMsg('Footer settings updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Social Links ---
    const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
        const newLinks = [...config.social_links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setConfig({ ...config, social_links: newLinks });
    };

    // --- Columns Logic ---
    const addColumn = () => {
        setConfig(prev => ({
            ...prev,
            columns: [...prev.columns, { title: 'New Column', links: [] }]
        }));
        setExpandedCol(config.columns.length);
    };

    const removeColumn = (index: number) => {
        const newCols = config.columns.filter((_, i) => i !== index);
        setConfig({ ...config, columns: newCols });
        if (expandedCol === index) setExpandedCol(null);
    };

    const updateColumnTitle = (index: number, title: string) => {
        const newCols = [...config.columns];
        newCols[index].title = title;
        setConfig({ ...config, columns: newCols });
    };

    // --- Links Logic ---
    const addLinkToCol = (colIndex: number) => {
        const newCols = [...config.columns];
        newCols[colIndex].links.push({ label: 'New Link', href: '#' });
        setConfig({ ...config, columns: newCols });
    };

    const updateLinkInCol = (colIndex: number, linkIndex: number, field: keyof LinkItem, value: string) => {
        const newCols = [...config.columns];
        newCols[colIndex].links[linkIndex] = { ...newCols[colIndex].links[linkIndex], [field]: value };
        setConfig({ ...config, columns: newCols });
    };

    const removeLinkFromCol = (colIndex: number, linkIndex: number) => {
        const newCols = [...config.columns];
        newCols[colIndex].links = newCols[colIndex].links.filter((_, i) => i !== linkIndex);
        setConfig({ ...config, columns: newCols });
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Footer Configuration</h2>
                    <p className="text-gray-400 text-sm">Manage global footer links, marquee text, and contact info.</p>
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
                
                {/* Marquee Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Marquee Text</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Part (Outline)</label>
                            <input 
                                value={config.marquee_text_1}
                                onChange={(e) => setConfig({...config, marquee_text_1: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Second Part (Italic/Color)</label>
                            <input 
                                value={config.marquee_text_2}
                                onChange={(e) => setConfig({...config, marquee_text_2: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Contact & CTA</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Heading</label>
                            <input 
                                value={config.contact_heading}
                                onChange={(e) => setConfig({...config, contact_heading: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subheading</label>
                            <input 
                                value={config.contact_subheading}
                                onChange={(e) => setConfig({...config, contact_subheading: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                            <input 
                                value={config.email}
                                onChange={(e) => setConfig({...config, email: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Booking Link</label>
                            <input 
                                value={config.booking_link}
                                onChange={(e) => setConfig({...config, booking_link: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Copyright Text</label>
                        <input 
                            value={config.copyright_text}
                            onChange={(e) => setConfig({...config, copyright_text: e.target.value})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Social Media</h3>
                    <div className="grid gap-4">
                        {config.social_links.map((link, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10 shrink-0">
                                    <i className={`${link.icon} text-gray-400 text-sm`}></i>
                                </div>
                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                    <input 
                                        value={link.name}
                                        onChange={(e) => updateSocial(idx, 'name', e.target.value)}
                                        className="bg-transparent border-b border-white/10 py-1 text-sm text-white focus:border-brand-purple outline-none"
                                        placeholder="Platform Name"
                                    />
                                    <input 
                                        value={link.href}
                                        onChange={(e) => updateSocial(idx, 'href', e.target.value)}
                                        className="bg-transparent border-b border-white/10 py-1 text-sm text-gray-300 focus:border-brand-purple outline-none"
                                        placeholder="URL"
                                    />
                                </div>
                                <div className="text-xs text-gray-500 font-mono px-2">{link.icon}</div>
                            </div>
                        ))}
                        <p className="text-xs text-gray-500 italic mt-2">* Icons use FontAwesome class names (e.g. fa-brands fa-twitter)</p>
                    </div>
                </div>

                {/* Link Columns */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                        <h3 className="text-lg font-bold text-white">Footer Columns</h3>
                        <button onClick={addColumn} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add Column
                        </button>
                    </div>

                    <div className="space-y-4">
                        {config.columns.map((col, colIdx) => (
                            <div key={colIdx} className="border border-white/10 rounded-xl overflow-hidden bg-[#111]">
                                <div 
                                    className="flex items-center justify-between p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                                    onClick={() => setExpandedCol(expandedCol === colIdx ? null : colIdx)}
                                >
                                    <div className="flex items-center gap-3">
                                        <LayoutTemplate className="w-4 h-4 text-gray-400" />
                                        <input 
                                            value={col.title}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => updateColumnTitle(colIdx, e.target.value)}
                                            className="bg-transparent border-none text-white font-bold text-sm focus:ring-0 p-0"
                                            placeholder="Column Title"
                                        />
                                        <span className="text-xs text-gray-500">({col.links.length} links)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={(e) => { e.stopPropagation(); removeColumn(colIdx); }} className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded"><Trash2 className="w-4 h-4" /></button>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedCol === colIdx ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>

                                {expandedCol === colIdx && (
                                    <div className="p-4 bg-black/30 border-t border-white/5 space-y-3">
                                        {col.links.map((link, linkIdx) => (
                                            <div key={linkIdx} className="flex items-center gap-3 group">
                                                <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
                                                <input 
                                                    value={link.label}
                                                    onChange={(e) => updateLinkInCol(colIdx, linkIdx, 'label', e.target.value)}
                                                    className="flex-1 bg-black border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:border-brand-purple outline-none"
                                                    placeholder="Link Label"
                                                />
                                                <input 
                                                    value={link.href}
                                                    onChange={(e) => updateLinkInCol(colIdx, linkIdx, 'href', e.target.value)}
                                                    className="flex-1 bg-black border border-white/10 rounded px-3 py-1.5 text-sm text-gray-300 focus:border-brand-purple outline-none"
                                                    placeholder="URL"
                                                />
                                                <button onClick={() => removeLinkFromCol(colIdx, linkIdx)} className="text-gray-600 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => addLinkToCol(colIdx)} className="w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-gray-500 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-1">
                                            <Plus className="w-3 h-3" /> Add Link to Column
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
