import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, Edit2, CheckCircle, AlertCircle, X, ChevronLeft } from 'lucide-react';

interface PricingPlan {
    id: string;
    name: string;
    tagline: string;
    description: string;
    price: string;
    frequency: 'month' | 'year' | 'one-time';
    isCustom: boolean;
    features: string[];
    highlight: boolean;
}

const DEFAULT_PLAN: PricingPlan = {
    id: '',
    name: '',
    tagline: '',
    description: '',
    price: '',
    frequency: 'month',
    isCustom: false,
    features: [],
    highlight: false
};

export const PricingEditor: React.FC = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });
    
    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<PricingPlan>(DEFAULT_PLAN);
    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'pricing_plans')
                .single();
            
            if (data && data.value) {
                setPlans(data.value);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const saveToDb = async (updatedPlans: PricingPlan[]) => {
        setSaving(true);
        setMsg({ type: '', text: '' });
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ 
                    key: 'pricing_plans', 
                    value: updatedPlans 
                });

            if (error) throw error;
            setPlans(updatedPlans);
            setMsg({ type: 'success', text: 'Pricing plans updated successfully!' });
            setIsEditing(false);
            setCurrentPlan(DEFAULT_PLAN);
            
            setTimeout(() => setMsg({ type: '', text: '' }), 3000);
        } catch (err: any) {
            setMsg({ type: 'error', text: err.message });
        } finally {
            setSaving(false);
        }
    };

    // --- CRUD Operations ---

    const handleDeletePlan = (id: string) => {
        if (!window.confirm("Are you sure you want to delete this plan?")) return;
        const updated = plans.filter(p => p.id !== id);
        saveToDb(updated);
    };

    const handleEditPlan = (plan: PricingPlan) => {
        setCurrentPlan(plan);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentPlan({ ...DEFAULT_PLAN, id: Date.now().toString() });
        setIsEditing(true);
    };

    const handleFormSubmit = () => {
        // Validate
        if (!currentPlan.name || !currentPlan.tagline) {
            alert("Name and Type/Tagline are required.");
            return;
        }

        let updatedPlans = [...plans];
        const index = updatedPlans.findIndex(p => p.id === currentPlan.id);

        // If highligted is selected, unselect others (assuming only 1 highlighted allowed)
        if (currentPlan.highlight) {
            updatedPlans = updatedPlans.map(p => ({ ...p, highlight: false }));
        }

        if (index > -1) {
            // Update existing
            updatedPlans[index] = currentPlan;
        } else {
            // Add new
            if (plans.length >= 3) {
                alert("Maximum of 3 plans allowed.");
                return;
            }
            updatedPlans.push(currentPlan);
        }

        saveToDb(updatedPlans);
    };

    // --- Feature Management ---

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setCurrentPlan(prev => ({
            ...prev,
            features: [...prev.features, featureInput.trim()]
        }));
        setFeatureInput('');
    };

    const removeFeature = (idx: number) => {
        setCurrentPlan(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== idx)
        }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    // --- LIST VIEW ---
    if (!isEditing) {
        return (
            <div className="max-w-5xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Pricing Plans</h2>
                        <p className="text-gray-400 text-sm">Manage your service pricing packages (Max 3).</p>
                    </div>
                    {plans.length < 3 && (
                        <button 
                            onClick={handleAddNew}
                            className="bg-white text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add Pricing Plan
                        </button>
                    )}
                </div>

                {msg.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {msg.text}
                    </div>
                )}

                {plans.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                        <p className="text-gray-400 mb-4">No pricing plans active.</p>
                        <button onClick={handleAddNew} className="text-brand-orange hover:underline font-bold">Create your first plan</button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`bg-[#0a0a0a] border rounded-2xl p-6 relative group transition-all ${plan.highlight ? 'border-brand-orange shadow-[0_0_20px_rgba(255,107,74,0.1)]' : 'border-white/10 hover:border-white/20'}`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                
                                <div className="mb-4">
                                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">{plan.tagline}</div>
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                </div>

                                <div className="mb-6">
                                    {plan.isCustom ? (
                                        <span className="text-2xl font-bold text-white">Custom Quote</span>
                                    ) : (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg text-gray-500">$</span>
                                            <span className="text-3xl font-bold text-white">{plan.price}</span>
                                            {plan.frequency !== 'one-time' && (
                                                <span className="text-xs text-gray-500">/ {plan.frequency}</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {plan.features.slice(0, 3).map((f, i) => (
                                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                            <span className="w-1 h-1 bg-gray-500 rounded-full mt-1.5 shrink-0"></span>
                                            <span className="line-clamp-1">{f}</span>
                                        </li>
                                    ))}
                                    {plan.features.length > 3 && <li className="text-xs text-gray-600 italic">+{plan.features.length - 3} more features</li>}
                                </ul>

                                <div className="flex gap-2 mt-auto">
                                    <button 
                                        onClick={() => handleEditPlan(plan)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeletePlan(plan.id)}
                                        className="w-10 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-2 rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // --- FORM VIEW ---
    return (
        <div className="max-w-3xl mx-auto animate-fade-in pb-20">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setIsEditing(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-white">{currentPlan.id && plans.find(p => p.id === currentPlan.id) ? 'Edit Plan' : 'New Pricing Plan'}</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8">
                
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Plan Type / Tagline</label>
                        <input 
                            value={currentPlan.tagline}
                            onChange={(e) => setCurrentPlan({...currentPlan, tagline: e.target.value})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            placeholder="e.g. Design Focus"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Plan Name</label>
                        <input 
                            value={currentPlan.name}
                            onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                            placeholder="e.g. The Accelerator"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Short Description</label>
                    <textarea 
                        value={currentPlan.description}
                        onChange={(e) => setCurrentPlan({...currentPlan, description: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-20 resize-none"
                        placeholder="Best for..."
                    />
                </div>

                {/* Pricing Configuration */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Pricing Details</h3>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={currentPlan.isCustom}
                                onChange={(e) => setCurrentPlan({...currentPlan, isCustom: e.target.checked})}
                                className="w-4 h-4 rounded border-gray-600 bg-black text-brand-orange focus:ring-offset-black focus:ring-brand-orange"
                            />
                            <span className="text-sm text-gray-300">Custom Quote (No Price)</span>
                        </label>
                    </div>

                    {!currentPlan.isCustom && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input 
                                        type="text"
                                        value={currentPlan.price}
                                        onChange={(e) => setCurrentPlan({...currentPlan, price: e.target.value})}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 pl-8 text-white focus:border-brand-purple outline-none font-mono"
                                        placeholder="5,000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Billing Frequency</label>
                                <select
                                    value={currentPlan.frequency}
                                    onChange={(e) => setCurrentPlan({...currentPlan, frequency: e.target.value as any})}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none"
                                >
                                    <option value="month">Per Month</option>
                                    <option value="year">Per Year</option>
                                    <option value="one-time">One Time</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Features Included</label>
                    <div className="space-y-2 mb-3">
                        {currentPlan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/5 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0"></div>
                                <span className="text-sm text-gray-200 flex-1">{feature}</span>
                                <button onClick={() => removeFeature(idx)} className="text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex gap-2">
                        <input 
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                            className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none text-sm"
                            placeholder="Add a feature (e.g. 24/7 Support)"
                        />
                        <button 
                            onClick={addFeature}
                            className="bg-white/10 border border-white/10 text-white px-4 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Highlight Toggle */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <input 
                        type="checkbox" 
                        id="highlight"
                        checked={currentPlan.highlight}
                        onChange={(e) => setCurrentPlan({...currentPlan, highlight: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-600 bg-black text-brand-orange focus:ring-offset-black focus:ring-brand-orange"
                    />
                    <label htmlFor="highlight" className="text-sm text-white font-medium cursor-pointer">
                        Mark as "Popular" Plan (Highlights the card on frontend)
                    </label>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 text-gray-400 hover:text-white font-bold transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleFormSubmit}
                        disabled={saving}
                        className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Plan
                    </button>
                </div>

            </div>
        </div>
    );
};
