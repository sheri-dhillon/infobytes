import React, { useState, useEffect, useRef } from 'react';
import { Archive, Eye, Edit2, Trash2, Plus, Star, Tag, X, User, Upload, Check, Search, Filter, Globe, Info, LayoutTemplate, Monitor, Image as ImageIcon, Loader2, Link as LinkIcon, RefreshCw, ChevronRight, Bold, Italic, List, Code } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// --- Table View ---
interface TableViewProps {
    title: string;
    data: any[];
    columns: string[];
    onEdit?: (item: any) => void;
    onView?: (item: any) => void;
    onDelete?: (item: any) => void;
    onAdd?: () => void;
    onManageCategories?: () => void;
    viewMode: 'active' | 'archived';
    onToggleView: () => void;
    canEdit: boolean;
    activeTab?: string;
}

export const TableView: React.FC<TableViewProps> = ({ 
    title, data, columns, onEdit, onView, onDelete, onAdd, onManageCategories, viewMode, onToggleView, canEdit
}) => {
    return (
        <div className="animate-fade-in w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white capitalize tracking-tight mb-2">
                        {viewMode === 'archived' ? `Archived ${title}` : title}
                    </h2>
                    <p className="text-gray-400 text-sm">Manage your {title.toLowerCase()} content and settings.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button onClick={onToggleView} className="px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white">
                        <Archive className="w-4 h-4" /> {viewMode === 'archived' ? `View Active` : 'Archive'}
                    </button>

                    {viewMode === 'active' && canEdit && onManageCategories && (
                        <button onClick={onManageCategories} className="bg-[#111] text-gray-300 border border-white/10 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-all">
                            <Tag className="w-4 h-4" /> Categories
                        </button>
                    )}

                    {viewMode === 'active' && canEdit && onAdd && (
                        <button onClick={onAdd} className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <Plus className="w-4 h-4" /> Add {title.slice(0, -1)}
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">{col}</th>
                                ))}
                                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-12 text-center text-gray-500 text-sm">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                <Search className="w-5 h-5 text-gray-600" />
                                            </div>
                                            No items found in {viewMode === 'archived' ? 'archive' : 'active'} list.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                        {columns.map((col, cIdx) => {
                                            let content = null;
                                            if (col === 'Title') content = <span className="text-white font-medium">{row.title || 'Untitled'}</span>;
                                            if (col === 'Full Name' || col === 'Name') content = <span className="text-white font-medium">{row.fullname || row.name || 'Unknown'}</span>;
                                            if (col === 'Status') content = (
                                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${
                                                    row.status === 'Published' || row.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    row.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                    {row.status || 'Draft'}
                                                </span>
                                            );
                                            if (col === 'Category') content = row.category || '-';
                                            if (col === 'Client') content = row.client || '-';
                                            if (col === 'Views') content = <span className="font-mono text-gray-400">{row.views || 0}</span>;
                                            if (col === 'Email') content = row.email || '-';
                                            if (col === 'Company') content = row.company || '-';
                                            if (col === 'Date') content = <span className="text-gray-500 text-xs">{row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}</span>;
                                            
                                            if (col === 'Author') {
                                                return (
                                                    <td key={cIdx} className="p-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/5">
                                                                {row.author?.avatar_url ? <img src={row.author.avatar_url} className="w-full h-full object-cover"/> : <User className="w-4 h-4 text-gray-400" />}
                                                            </div>
                                                            <span className="text-sm text-gray-300">{row.author?.full_name || 'Unknown'}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (col === 'Pills') {
                                                let pillsToRender: any[] = [];
                                                if (Array.isArray(row.pills)) pillsToRender = row.pills;
                                                else if (typeof row.pills === 'string') {
                                                    try {
                                                        const parsed = JSON.parse(row.pills);
                                                        if(Array.isArray(parsed)) pillsToRender = parsed;
                                                        else pillsToRender = row.pills.split(',');
                                                    } catch {
                                                        pillsToRender = row.pills.split(',').filter((p: string) => p.trim());
                                                    }
                                                }

                                                return (
                                                    <td key={cIdx} className="p-5">
                                                        <div className="flex gap-2 flex-wrap max-w-[200px]">
                                                            {pillsToRender.map((p, i) => {
                                                                // Safety check: ensure p is a string or number before rendering
                                                                const val = typeof p === 'object' ? JSON.stringify(p) : p;
                                                                return (
                                                                    <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">{val}</span>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            if (col === 'Rating') {
                                                return <td key={cIdx} className="p-5"><div className="flex gap-0.5">{[...Array(5)].map((_,i) => <Star key={i} className={`w-3 h-3 ${i<Number(row.stars || 0)?'text-brand-orange fill-brand-orange':'text-gray-800'}`} />)}</div></td>
                                            }

                                            return (
                                                <td key={cIdx} className="p-5 text-sm text-gray-300">
                                                    {content}
                                                </td>
                                            );
                                        })}
                                        
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {onView && <button onClick={() => onView(row)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="View"><Eye className="w-4 h-4" /></button>}
                                                {canEdit && onEdit && <button onClick={() => onEdit(row)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>}
                                                {canEdit && onDelete && <button onClick={() => onDelete(row)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors" title="Archive"><Trash2 className="w-4 h-4" /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Modals & Editors ---

export const DeleteConfirmationModal: React.FC<{ isOpen: boolean, onClose: () => void, onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl text-center max-w-sm w-full shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <Trash2 className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-2 text-xl">Archive Item?</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">This item will be hidden from the public site but can be restored later from the archive.</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="px-6 py-3 text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-medium">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20">Confirm</button>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const SimpleEditor: React.FC<{ value: string; onChange: (val: string) => void; placeholder?: string; height?: string }> = ({ value, onChange, placeholder, height = "400px" }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertTag = (tagStart: string, tagEnd: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);

        const newValue = `${before}${tagStart}${selected}${tagEnd}${after}`;
        onChange(newValue);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + tagStart.length, end + tagStart.length);
        }, 0);
    };

    return (
        <div className="w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/5 overflow-x-auto">
                <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Bold"><Bold className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertTag('<em>', '</em>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Italic"><Italic className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button type="button" onClick={() => insertTag('<h2>', '</h2>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white text-xs font-bold" title="H2">H2</button>
                <button type="button" onClick={() => insertTag('<h3>', '</h3>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white text-xs font-bold" title="H3">H3</button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="List"><List className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertTag('<a href="url">', '</a>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Link"><LinkIcon className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertTag('<pre><code>', '</code></pre>')} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Code"><Code className="w-4 h-4" /></button>
            </div>
            <textarea
                ref={textareaRef}
                className="w-full bg-transparent border-none p-4 text-white font-mono text-sm focus:ring-0 outline-none resize-none leading-relaxed"
                style={{ height }}
                placeholder={placeholder || "Start writing..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

const ImagePicker: React.FC<{ value: string; onChange: (url: string) => void }> = ({ value, onChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `uploads/${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`;

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
        <div className="relative group w-full">
            {value ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-[#050505]">
                    <img src={value} alt="Featured" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <label className="cursor-pointer px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> Change Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                        </label>
                        <button onClick={() => onChange('')} className="text-red-400 text-xs font-medium hover:text-red-300 underline">Remove</button>
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-brand-purple animate-spin mb-2" />
                    ) : (
                        <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-white mb-2 transition-colors" />
                    )}
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                        {uploading ? 'Uploading...' : 'Upload Featured Image'}
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
            )}
        </div>
    );
};

const YoastSeoPanel: React.FC<{ formData: any, setFormData: (data: any) => void, type: 'post' | 'service' }> = ({ formData, setFormData, type }) => {
    const baseUrl = "https://infobytes.io";
    const previewTitle = formData.seo_title || formData.title || "Untitled Page";
    const previewDesc = formData.meta_description || formData.description || "Please provide a meta description.";
    const previewSlug = formData.slug || "url-slug";
    
    const TITLE_MAX = 60;
    const DESC_MAX = 160;

    const getBarColor = (len: number, max: number) => {
        if (len === 0) return 'bg-gray-700';
        if (len < max * 0.5) return 'bg-orange-500';
        if (len > max) return 'bg-red-500';
        return 'bg-green-500';
    };

    const getBarWidth = (len: number, max: number) => {
        return Math.min((len / max) * 100, 100) + '%';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden font-sans text-gray-800 mt-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <span className="text-brand-orange font-bold text-lg">Y</span>
                <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Yoast SEO Optimization</h4>
            </div>

            <div className="p-6 md:p-8 grid gap-8">
                {/* Google Preview */}
                <div>
                    <h5 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-sm">
                        <Monitor className="w-4 h-4" /> Google Preview
                    </h5>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-2xl select-none">
                        <div className="flex gap-4 border-b border-gray-100 pb-3 mb-3">
                            <span className="text-xs font-bold text-blue-600 border-b-2 border-blue-600 pb-3 -mb-3.5 cursor-pointer">Desktop result</span>
                            <span className="text-xs font-bold text-gray-400 cursor-pointer hover:text-gray-600">Mobile result</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
                                <img src="https://infobytes.io/favicon.ico" alt="" className="w-4 h-4 opacity-60" onError={(e) => e.currentTarget.style.display='none'}/>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[12px] text-[#202124] font-normal">InfoBytes</span>
                                <span className="text-[12px] text-[#5f6368] truncate">{baseUrl} › {type} › {previewSlug}</span>
                            </div>
                        </div>
                        <h3 className="text-[20px] text-[#1a0dab] font-medium hover:underline cursor-pointer leading-[1.3] truncate font-sans">{previewTitle}</h3>
                        <p className="text-[14px] text-[#4d5156] leading-[1.58] mt-1 line-clamp-2 font-sans">
                            <span className="text-[#70757a]">Oct 24, 2024 — </span>
                            {previewDesc}
                        </p>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* SEO Inputs */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Focus Keyword</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all text-gray-800"
                            placeholder="e.g. digital marketing agency"
                            value={formData.keywords || ''}
                            onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                        />
                        <p className="text-xs text-gray-500">Enter the main keyword you want to rank for.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">SEO Title</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all text-gray-800"
                            placeholder="Page title"
                            value={formData.seo_title || ''}
                            onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                        />
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${getBarColor(formData.seo_title?.length || 0, TITLE_MAX)}`} style={{ width: getBarWidth(formData.seo_title?.length || 0, TITLE_MAX) }} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Meta Description</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all text-gray-800 min-h-[80px]"
                            placeholder="Modify your meta description..."
                            value={formData.meta_description || ''}
                            onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                        />
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${getBarColor(formData.meta_description?.length || 0, DESC_MAX)}`} style={{ width: getBarWidth(formData.meta_description?.length || 0, DESC_MAX) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SlugInput: React.FC<{ baseUrl: string; slug: string; onChange: (val: string) => void }> = ({ baseUrl, slug, onChange }) => (
    <div className="group">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Permalink (Slug)</label>
        <div className="flex items-center w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden focus-within:border-white/30 transition-colors">
            <span className="bg-white/5 px-3 py-3 text-xs text-gray-500 border-r border-white/10 select-none whitespace-nowrap">
                {baseUrl}
            </span>
            <input 
                type="text" 
                value={slug || ''} 
                onChange={(e) => onChange(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="flex-1 bg-transparent px-3 py-3 text-white text-sm focus:outline-none font-mono"
                placeholder="url-slug"
            />
        </div>
    </div>
);

// --- Main Editors ---

export const ServiceEditor: React.FC<{ service: any; onSave: (data: any) => void; onCancel: () => void }> = ({ service, onSave, onCancel }) => {
    // Correctly initialize state with safety checks
    const [formData, setFormData] = useState({ 
        title: service?.title || '', 
        slug: service?.slug || '', 
        description: service?.description || '', 
        content: service?.content || '',
        image: service?.image || '',
        status: service?.status || 'Draft', 
        pills: service?.pills || [], 
        seo_title: service?.seo_title || '', 
        meta_description: service?.meta_description || '', 
        keywords: service?.keywords || '',
        id: service?.id // Preserve ID for updates
    });
    
    // Safely handle pill input (array vs string from DB)
    const handlePills = (val: string) => {
        setFormData({...formData, pills: val.split(',').map(s => s.trim())});
    };

    const getPillsString = () => {
        if (Array.isArray(formData.pills)) return formData.pills.join(', ');
        if (typeof formData.pills === 'string') return formData.pills;
        return '';
    };

    // Auto-generate slug from title if slug is empty
    useEffect(() => {
        if (!service && formData.title && !formData.slug) {
            setFormData(prev => ({...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}));
        }
    }, [formData.title]);

    return (
        <div className="bg-[#0a0a0a] min-h-screen animate-fade-in pb-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                    </button>
                    <h3 className="text-2xl font-bold text-white">{service ? 'Edit Service' : 'Add New Service'}</h3>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => onSave({...formData, status: 'Draft'})} className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors text-sm">Save Draft</button>
                    <button onClick={() => onSave(formData)} className="px-6 py-2.5 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                        {service ? 'Update Service' : 'Publish Service'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Main Editor */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Title</label>
                                <input 
                                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-bold focus:border-white/30 focus:outline-none transition-colors" 
                                    placeholder="Enter service title here..." 
                                    value={formData.title || ''} 
                                    onChange={e => setFormData({...formData, title: e.target.value})} 
                                />
                            </div>

                            <SlugInput 
                                baseUrl="https://infobytes.io/services/" 
                                slug={formData.slug || ''} 
                                onChange={(val) => setFormData({...formData, slug: val})} 
                            />

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">HTML Content</label>
                                <SimpleEditor 
                                    value={formData.content || ''} 
                                    onChange={(val) => setFormData({...formData, content: val})} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <YoastSeoPanel formData={formData} setFormData={setFormData} type="service" />
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6 sticky top-24">
                    {/* Status Card */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Publish Settings</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-white/30 outline-none"
                                    value={formData.status || 'Draft'} 
                                    onChange={e => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Active">Active</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Featured Image</h4>
                        <ImagePicker value={formData.image || ''} onChange={(url) => setFormData({...formData, image: url})} />
                    </div>

                    {/* Tags */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Service Tags (Pills)</h4>
                        <input 
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:border-white/30 outline-none" 
                            placeholder="Web, Mobile, App (comma separated)" 
                            value={getPillsString()} 
                            onChange={e => handlePills(e.target.value)} 
                        />
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(formData.pills) && formData.pills.map((pill: string, idx: number) => (
                                pill && <span key={idx} className="text-[10px] bg-white/10 border border-white/5 px-2 py-1 rounded text-gray-300">{pill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Excerpt</h4>
                        <textarea 
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-24 resize-none focus:border-white/30 outline-none" 
                            placeholder="Brief summary for cards..." 
                            value={formData.description || ''} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PostEditor: React.FC<{ post: any; categories: any[]; onSave: (data: any) => void; onCancel: () => void }> = ({ post, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ 
        title: post?.title || '', 
        slug: post?.slug || '', 
        content: post?.content || '', 
        status: post?.status || 'Draft', 
        category: post?.category || '',
        image: post?.image || '',
        seo_title: post?.seo_title || '', 
        meta_description: post?.meta_description || '', 
        keywords: post?.keywords || '',
        id: post?.id
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (post && post.category) {
            // Split comma separated string back to array for UI
            setSelectedCategories(post.category.split(',').map((c: string) => c.trim()));
        }
    }, [post]);

    // Update form data whenever selection changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, category: selectedCategories.join(', ') }));
    }, [selectedCategories]);

    const toggleCategory = (catName: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(catName)) return prev.filter(c => c !== catName);
            return [...prev, catName];
        });
    };

    // Auto-generate slug
    useEffect(() => {
        if (!post && formData.title && !formData.slug) {
            setFormData(prev => ({...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}));
        }
    }, [formData.title]);

    return (
        <div className="bg-[#0a0a0a] min-h-screen animate-fade-in pb-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                    </button>
                    <h3 className="text-2xl font-bold text-white">{post ? 'Edit Post' : 'Add New Post'}</h3>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => onSave({...formData, status: 'Draft'})} className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors text-sm">Save Draft</button>
                    <button onClick={() => onSave(formData)} className="px-6 py-2.5 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                        {post ? 'Update Post' : 'Publish Post'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Editor */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="space-y-6">
                            <input 
                                className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-gray-600 focus:ring-0 px-0 outline-none" 
                                placeholder="Enter post title..." 
                                value={formData.title || ''} 
                                onChange={e => setFormData({...formData, title: e.target.value})} 
                            />
                            
                            <SlugInput 
                                baseUrl="https://infobytes.io/blog/" 
                                slug={formData.slug || ''} 
                                onChange={(val) => setFormData({...formData, slug: val})} 
                            />

                            <div className="min-h-[500px] border-t border-white/5 pt-6">
                                <SimpleEditor 
                                    height="600px"
                                    placeholder="Write your story... (HTML supported)"
                                    value={formData.content || ''} 
                                    onChange={(val) => setFormData({...formData, content: val})} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <YoastSeoPanel formData={formData} setFormData={setFormData} type="post" />
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6 sticky top-24">
                    {/* Status */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Publish</h4>
                        <select 
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-white/30 outline-none"
                            value={formData.status || 'Draft'} 
                            onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>

                    {/* Categories Multi-Select */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Categories</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {categories && categories.length > 0 ? (
                                categories.map((c: any) => (
                                    <label key={c.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(c.name) ? 'bg-brand-purple border-brand-purple' : 'border-white/30 group-hover:border-white'}`}>
                                            {selectedCategories.includes(c.name) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden" 
                                            checked={selectedCategories.includes(c.name)}
                                            onChange={() => toggleCategory(c.name)}
                                        />
                                        <span className={`text-sm ${selectedCategories.includes(c.name) ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                            {c.name}
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic">No categories found.</p>
                            )}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-[#111] border border-white/10 rounded-xl p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Featured Image</h4>
                        <ImagePicker value={formData.image || ''} onChange={(url) => setFormData({...formData, image: url})} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TestimonialModal: React.FC<{ item: any, onClose: () => void, onSave: (item: any) => void }> = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState(item || { name: '', business_name: '', service_name: '', review: '', stars: 5, status: 'Active' });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-bold text-white mb-6">{item ? 'Edit Testimonial' : 'New Testimonial'}</h3>
                <div className="space-y-4">
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none" placeholder="Client Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none" placeholder="Business / Role" value={formData.business_name || ''} onChange={e => setFormData({...formData, business_name: e.target.value})} />
                    <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none" placeholder="Service Provided" value={formData.service_name || ''} onChange={e => setFormData({...formData, service_name: e.target.value})} />
                    <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white h-24 focus:border-white/30 focus:outline-none" placeholder="Review" value={formData.review || ''} onChange={e => setFormData({...formData, review: e.target.value})} />
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                        <label className="text-gray-400 text-sm font-medium">Rating:</label>
                        <input type="number" min="1" max="5" className="bg-black border border-white/10 rounded px-2 py-1 text-white w-16 text-center" value={formData.stars || 5} onChange={e => setFormData({...formData, stars: e.target.value})} />
                        <div className="flex gap-1">
                            {[...Array(Number(formData.stars) || 0)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}
                        </div>
                    </div>
                    <button onClick={() => onSave(formData)} className="w-full py-3.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors mt-4">Save Testimonial</button>
                </div>
            </div>
        </div>
    );
};

export const LeadDetailsModal: React.FC<{ lead: any, onClose: () => void, onSave: (lead: any) => void }> = ({ lead, onClose, onSave }) => {
    const [status, setStatus] = useState(lead?.status || 'New');
    if (!lead) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                <h3 className="text-2xl font-bold text-white mb-8">Lead Details</h3>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label><div className="text-white text-lg font-medium">{lead.first_name} {lead.last_name}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-full focus:outline-none focus:border-brand-purple"><option value="New">New</option><option value="Contacted">Contacted</option><option value="Archived">Archived</option></select>
                    </div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label><div className="text-white select-all hover:text-brand-purple transition-colors cursor-pointer">{lead.email}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone</label><div className="text-white select-all">{lead.mobile_number || '-'}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Budget</label><div className="text-white">{lead.project_budget || '-'}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Source</label><div className="text-white">{lead.source || '-'}</div></div>
                    <div className="col-span-2 bg-[#050505] p-6 rounded-xl border border-white/5"><label className="block text-xs font-bold text-gray-500 uppercase mb-3">Message</label><p className="text-gray-300 text-sm leading-relaxed">{lead.project_details}</p></div>
                </div>
                <div className="flex justify-end gap-3"><button onClick={onClose} className="px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors">Close</button><button onClick={() => onSave({...lead, status})} className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">Update Status</button></div>
            </div>
        </div>
    );
};

export const CategoryManagerModal: React.FC<{ isOpen: boolean, onClose: () => void, categories: any[], onUpdate: () => void }> = ({ isOpen, onClose, categories, onUpdate }) => {
    const [newCat, setNewCat] = useState('');
    const handleAdd = async () => {
        if(!newCat) return;
        await supabase.from('categories').insert([{name: newCat}]);
        setNewCat('');
        onUpdate();
    };
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                <h3 className="text-white font-bold mb-4">Manage Categories</h3>
                <div className="flex gap-2 mb-4">
                    <input className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30" placeholder="New Category" value={newCat} onChange={e => setNewCat(e.target.value)} />
                    <button onClick={handleAdd} className="bg-white text-black px-4 rounded-lg font-bold text-sm hover:bg-gray-200">Add</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {categories && categories.length > 0 ? categories.map(c => (
                        <div key={c.id} className="flex justify-between items-center text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                            {c.name}
                        </div>
                    )) : <p className="text-gray-500 text-xs italic">No categories yet.</p>}
                </div>
                <button onClick={onClose} className="mt-6 w-full border border-white/10 py-2.5 rounded-lg text-white text-sm hover:bg-white/5 font-medium">Close</button>
            </div>
        </div>
    );
};
