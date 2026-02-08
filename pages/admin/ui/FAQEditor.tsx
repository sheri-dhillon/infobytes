import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, Edit2, CheckCircle, ChevronDown, GripVertical, PlusCircle, MinusCircle, ArrowRight, ArrowDown } from 'lucide-react';

interface FAQItem {
    id: string;
    q: string;
    a: string;
    cta?: string;
    link?: string;
}

interface FAQConfig {
    title: string;
    subtitle: string;
    icon_style: 'plus_minus' | 'chevron' | 'arrow';
    items: FAQItem[];
}

const DEFAULT_CONFIG: FAQConfig = {
    title: 'Common questions',
    subtitle: 'Removing the friction between your vision and execution.',
    icon_style: 'plus_minus',
    items: []
};

export const FAQEditor: React.FC = () => {
    const [config, setConfig] = useState<FAQConfig>(DEFAULT_CONFIG);
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
                .eq('key', 'faq_section')
                .single();
            
            if (data && data.value) {
                // Ensure default values for missing properties
                setConfig({
                    ...DEFAULT_CONFIG,
                    ...data.value,
                    items: data.value.items || []
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
            const { error } = await supabase
                .from('site_settings')
                .upsert({ 
                    key: 'faq_section', 
                    value: config 
                });

            if (error) throw error;
            setMsg('FAQ section updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Item Management ---

    const addItem = () => {
        const newItem: FAQItem = {
            id: Date.now().toString(),
            q: 'New Question',
            a: 'Enter answer here...',
            cta: '',
            link: ''
        };
        setConfig(prev => ({ ...prev, items: [...prev.items, newItem] }));
        setEditingId(newItem.id);
    };

    const updateItem = (id: string, field: keyof FAQItem, value: string) => {
        setConfig(prev => ({
            ...prev,
            items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const deleteItem = (id: string) => {
        if (!window.confirm("Delete this FAQ item?")) return;
        setConfig(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...config.items];
        if (direction === 'up' && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        } else if (direction === 'down' && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        }
        setConfig(prev => ({ ...prev, items: newItems }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">FAQ Manager</h2>
                    <p className="text-gray-400 text-sm">Manage Frequently Asked Questions.</p>
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

            {/* Global Settings */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Section Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Section Title</label>
                        <input 
                            value={config.title}
                            onChange={(e) => setConfig({...config, title: e.target.value})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Icon Style</label>
                        <select 
                            value={config.icon_style}
                            onChange={(e) => setConfig({...config, icon_style: e.target.value as any})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none appearance-none"
                        >
                            <option value="plus_minus">Plus (+) / Minus (-)</option>
                            <option value="chevron">Chevron Down (v) / Up (^)</option>
                            <option value="arrow">Arrow Right (&gt;) / Down (v)</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subtitle</label>
                    <input 
                        value={config.subtitle}
                        onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Questions</h3>
                    <button onClick={addItem} className="text-sm bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Question
                    </button>
                </div>

                {config.items.map((item, index) => (
                    <div key={item.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/20">
                        {/* Header / Summary */}
                        <div 
                            className="p-4 flex items-center justify-between cursor-pointer bg-white/[0.02]"
                            onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="text-gray-600 cursor-move">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-white text-sm line-clamp-1">{item.q}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1 mr-2">
                                    <button onClick={(e) => { e.stopPropagation(); moveItem(index, 'up'); }} disabled={index === 0} className="p-1 text-gray-600 hover:text-white disabled:opacity-30"><ChevronDown className="w-3 h-3 rotate-180" /></button>
                                    <button onClick={(e) => { e.stopPropagation(); moveItem(index, 'down'); }} disabled={index === config.items.length - 1} className="p-1 text-gray-600 hover:text-white disabled:opacity-30"><ChevronDown className="w-3 h-3" /></button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setEditingId(editingId === item.id ? null : item.id); }} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {/* Editor Body */}
                        {editingId === item.id && (
                            <div className="p-6 border-t border-white/5 space-y-4 bg-black/30 animate-fade-in">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Question</label>
                                    <input 
                                        value={item.q}
                                        onChange={(e) => updateItem(item.id, 'q', e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Answer</label>
                                    <textarea 
                                        value={item.a}
                                        onChange={(e) => updateItem(item.id, 'a', e.target.value)}
                                        rows={4}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none resize-none"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Call to Action Text (Optional)</label>
                                        <input 
                                            value={item.cta || ''}
                                            onChange={(e) => updateItem(item.id, 'cta', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                                            placeholder="e.g. Learn More"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Call to Action Link (Optional)</label>
                                        <input 
                                            value={item.link || ''}
                                            onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                                            placeholder="e.g. /services"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {config.items.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl">
                        No questions added yet.
                    </div>
                )}
            </div>
        </div>
    );
};
