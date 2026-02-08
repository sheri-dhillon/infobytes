import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, CheckCircle, Type, MousePointer2 } from 'lucide-react';

interface HeroConfig {
    pills: string[];
    headline_part1: string;
    headline_part2: string;
    cta_text: string;
    cta_link: string;
}

export const HeroEditor: React.FC = () => {
    const [config, setConfig] = useState<HeroConfig>({
        pills: ['', '', '', ''],
        headline_part1: 'Design. Develop.',
        headline_part2: '& SCALE.',
        cta_text: "Let's Talk",
        cta_link: '/contact'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'hero')
                .single();
            
            if (data && data.value) {
                // Ensure 4 pills exist
                const loadedConfig = data.value;
                if (!loadedConfig.pills || loadedConfig.pills.length < 4) {
                    loadedConfig.pills = [...(loadedConfig.pills || []), '', '', '', ''].slice(0, 4);
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
                    key: 'hero', 
                    value: config 
                });

            if (error) throw error;
            setMsg('Hero section updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const updatePill = (index: number, value: string) => {
        const newPills = [...config.pills];
        newPills[index] = value;
        setConfig({ ...config, pills: newPills });
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Hero Section</h2>
                    <p className="text-gray-400 text-sm">Update the main headline, floating pills, and CTA button.</p>
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
                
                {/* Pills Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Floating Pills (Top)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {config.pills.map((pill, index) => (
                            <div key={index}>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Pill {index + 1}</label>
                                <input 
                                    type="text" 
                                    value={pill}
                                    onChange={(e) => updatePill(index, e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                                    placeholder={`e.g. Service ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Headlines Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                        <Type className="w-5 h-5 text-gray-400" /> Typography
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Headline Part 1 (Serif / Italic)</label>
                            <input 
                                type="text" 
                                value={config.headline_part1}
                                onChange={(e) => setConfig({...config, headline_part1: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-4 text-white text-2xl font-serif italic focus:border-brand-purple focus:outline-none transition-colors"
                            />
                            <p className="text-[10px] text-gray-500 mt-2">Displays in Serif font, Italic style.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Headline Part 2 (Bold / Sans)</label>
                            <input 
                                type="text" 
                                value={config.headline_part2}
                                onChange={(e) => setConfig({...config, headline_part2: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-4 text-white text-4xl font-black uppercase tracking-tighter focus:border-brand-purple focus:outline-none transition-colors"
                            />
                            <p className="text-[10px] text-gray-500 mt-2">Displays Huge, Bold, Uppercase.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                        <MousePointer2 className="w-5 h-5 text-gray-400" /> Call to Action
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
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
                </div>

            </div>
        </div>
    );
};
