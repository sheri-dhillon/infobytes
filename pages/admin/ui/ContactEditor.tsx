
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, CheckCircle, Plus, Trash2, GripVertical, Settings, Smartphone, Mail, MapPin } from 'lucide-react';

interface FormField {
    id: string;
    key: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    width: 'half' | 'full';
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select inputs
}

interface ContactConfig {
    hero: {
        title: string;
        subtitle: string;
    };
    info: {
        heading: string;
        subheading: string;
        email: string;
        phone: string;
        address: string;
        booking_link: string;
    };
    form_fields: FormField[];
}

const DEFAULT_CONFIG: ContactConfig = {
    hero: { title: "Contact Us", subtitle: "We are here to help." },
    info: { heading: "Let's Chat", subheading: "Reach out.", email: "", phone: "", address: "", booking_link: "" },
    form_fields: []
};

// System Keys are mapped to DB Columns
const SYSTEM_KEYS = [
    { value: 'first_name', label: 'First Name (DB Column)' },
    { value: 'last_name', label: 'Last Name (DB Column)' },
    { value: 'email', label: 'Email (DB Column)' },
    { value: 'company_name', label: 'Company Name (DB Column)' },
    { value: 'mobile_number', label: 'Mobile Number (DB Column)' },
    { value: 'project_budget', label: 'Project Budget (DB Column)' },
    { value: 'source', label: 'Source / Heard From (DB Column)' },
    { value: 'project_details', label: 'Project Details / Message (DB Column)' },
];

export const ContactEditor: React.FC = () => {
    const [config, setConfig] = useState<ContactConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');
    const [activeTab, setActiveTab] = useState<'info' | 'form'>('info');
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

    // DnD
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'contact_page')
                .single();
            
            if (data && data.value) {
                // Ensure IDs exist for fields
                const loadedConfig = data.value;
                if(loadedConfig.form_fields) {
                    loadedConfig.form_fields = loadedConfig.form_fields.map((f: any) => ({
                        ...f,
                        id: f.id || Math.random().toString(36).substr(2, 9)
                    }));
                }
                setConfig({ ...DEFAULT_CONFIG, ...loadedConfig });
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
                    key: 'contact_page', 
                    value: config 
                });

            if (error) throw error;
            setMsg('Contact page updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Form Builder Logic ---

    const addField = () => {
        const newField: FormField = {
            id: Date.now().toString(),
            key: `custom_${Date.now()}`,
            label: 'New Field',
            type: 'text',
            width: 'full',
            required: false,
            placeholder: ''
        };
        setConfig(prev => ({ ...prev, form_fields: [...prev.form_fields, newField] }));
        setEditingFieldId(newField.id);
    };

    const updateField = (id: string, field: keyof FormField, value: any) => {
        setConfig(prev => ({
            ...prev,
            form_fields: prev.form_fields.map(f => f.id === id ? { ...f, [field]: value } : f)
        }));
    };

    const removeField = (id: string) => {
        if(!window.confirm("Remove this field?")) return;
        setConfig(prev => ({
            ...prev,
            form_fields: prev.form_fields.filter(f => f.id !== id)
        }));
    };

    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const _items = [...config.form_fields];
        const draggedItemContent = _items.splice(dragItem.current, 1)[0];
        _items.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setConfig(prev => ({ ...prev, form_fields: _items }));
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Contact Page Manager</h2>
                    <p className="text-gray-400 text-sm">Manage Hero text, Contact Details, and customize the Contact Form.</p>
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
                    onClick={() => setActiveTab('info')}
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'info' ? 'border-brand-purple text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    <Settings className="w-4 h-4" /> General Info
                </button>
                <button 
                    onClick={() => setActiveTab('form')}
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'form' ? 'border-brand-orange text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    <GripVertical className="w-4 h-4" /> Form Builder
                </button>
            </div>

            {/* --- General Info Tab --- */}
            {activeTab === 'info' && (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                        <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Hero Section</h3>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                            <textarea 
                                value={config.hero.title}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, title: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-24 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subtitle</label>
                            <textarea 
                                value={config.hero.subtitle}
                                onChange={(e) => setConfig({...config, hero: {...config.hero, subtitle: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple outline-none h-20 resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                        <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Contact Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Heading</label>
                                <input 
                                    value={config.info.heading}
                                    onChange={(e) => setConfig({...config, info: {...config.info, heading: e.target.value}})}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subheading</label>
                                <input 
                                    value={config.info.subheading}
                                    onChange={(e) => setConfig({...config, info: {...config.info, subheading: e.target.value}})}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2"><Mail className="w-3 h-3"/> Email</label>
                            <input 
                                value={config.info.email}
                                onChange={(e) => setConfig({...config, info: {...config.info, email: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2"><Smartphone className="w-3 h-3"/> Phone</label>
                            <input 
                                value={config.info.phone}
                                onChange={(e) => setConfig({...config, info: {...config.info, phone: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2"><MapPin className="w-3 h-3"/> Address</label>
                            <input 
                                value={config.info.address}
                                onChange={(e) => setConfig({...config, info: {...config.info, address: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Booking Link</label>
                            <input 
                                value={config.info.booking_link}
                                onChange={(e) => setConfig({...config, info: {...config.info, booking_link: e.target.value}})}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-purple outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* --- Form Builder Tab --- */}
            {activeTab === 'form' && (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 animate-fade-in">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">Form Fields</h3>
                            <p className="text-xs text-gray-500">Drag to reorder. Define labels and width.</p>
                        </div>
                        <button onClick={addField} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add Field
                        </button>
                    </div>

                    <div className="space-y-3">
                        {config.form_fields.map((field, index) => (
                            <div 
                                key={field.id}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() => (dragOverItem.current = index)}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                                className="bg-[#111] border border-white/5 rounded-xl p-4 transition-all hover:border-white/20"
                            >
                                <div 
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => setEditingFieldId(editingFieldId === field.id ? null : field.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <GripVertical className="text-gray-600 w-5 h-5 cursor-grab" />
                                        <div>
                                            <span className="font-bold text-white text-sm">{field.label}</span>
                                            <span className="ml-2 text-xs text-gray-500 uppercase">({field.type}, {field.width})</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); removeField(field.id); }} 
                                        className="text-gray-600 hover:text-red-500 p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {editingFieldId === field.id && (
                                    <div className="mt-4 pt-4 border-t border-white/5 grid md:grid-cols-2 gap-4 animate-fade-in">
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Label</label>
                                            <input 
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Data Key (DB Map)</label>
                                            <select 
                                                value={SYSTEM_KEYS.some(k => k.value === field.key) ? field.key : 'custom'}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val === 'custom') updateField(field.id, 'key', `custom_${Date.now()}`);
                                                    else updateField(field.id, 'key', val);
                                                }}
                                                className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                            >
                                                {SYSTEM_KEYS.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
                                                <option value="custom">Custom Field (Append to Msg)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Input Type</label>
                                            <select 
                                                value={field.type}
                                                onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                            >
                                                <option value="text">Text</option>
                                                <option value="email">Email</option>
                                                <option value="tel">Phone</option>
                                                <option value="select">Dropdown</option>
                                                <option value="textarea">Text Area</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Width</label>
                                            <select 
                                                value={field.width}
                                                onChange={(e) => updateField(field.id, 'width', e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                            >
                                                <option value="half">Half (50%)</option>
                                                <option value="full">Full (100%)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Placeholder</label>
                                            <input 
                                                value={field.placeholder || ''}
                                                onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center pt-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                                                    className="rounded bg-black border-white/20 text-brand-orange focus:ring-offset-black"
                                                />
                                                <span className="text-sm text-white font-medium">Required Field</span>
                                            </label>
                                        </div>
                                        
                                        {/* Select Options */}
                                        {field.type === 'select' && (
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Dropdown Options (Comma separated)</label>
                                                <input 
                                                    value={field.options?.join(', ') || ''}
                                                    onChange={(e) => updateField(field.id, 'options', e.target.value.split(',').map(s => s.trim()))}
                                                    className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-brand-orange outline-none"
                                                    placeholder="Option 1, Option 2, Option 3"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};
