import React, { useState } from 'react';
import { Archive, Eye, Edit2, Trash2, Plus, Star, Tag, X, User, Upload, Check, Search, Filter } from 'lucide-react';
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
}

export const TableView: React.FC<TableViewProps> = ({ 
    title, data, columns, onEdit, onView, onDelete, onAdd, onManageCategories, viewMode, onToggleView, canEdit
}) => {
    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white capitalize">
                        {viewMode === 'archived' ? `Archived ${title}` : title}
                    </h2>
                    {viewMode === 'archived' && (
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full border border-red-500/20">
                            Archive Mode
                        </span>
                    )}
                </div>
                
                <div className="flex gap-3">
                    <button onClick={onToggleView} className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white">
                        <Archive className="w-4 h-4" /> {viewMode === 'archived' ? `Return` : 'Archive'}
                    </button>

                    {viewMode === 'active' && canEdit && onManageCategories && (
                        <button onClick={onManageCategories} className="bg-transparent text-white border border-white/10 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
                            <Tag className="w-4 h-4" /> Categories
                        </button>
                    )}

                    {viewMode === 'active' && canEdit && onAdd && (
                        <button onClick={onAdd} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                            <Plus className="w-4 h-4" /> Add New
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{col}</th>
                                ))}
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-8 text-center text-gray-500 text-sm">
                                        No items found.
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                        {columns.map((col, cIdx) => {
                                            let content = null;
                                            if (col === 'Title') content = row.title;
                                            if (col === 'Full Name' || col === 'Name') content = row.fullname || row.name;
                                            if (col === 'Status') content = row.status;
                                            if (col === 'Category') content = row.category;
                                            if (col === 'Client') content = row.client;
                                            if (col === 'Views') content = row.views;
                                            if (col === 'Email') content = row.email;
                                            if (col === 'Company') content = row.company;
                                            if (col === 'Date') content = new Date(row.created_at).toLocaleDateString();
                                            
                                            if (col === 'Author') {
                                                return (
                                                    <td key={cIdx} className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-white/10 overflow-hidden flex items-center justify-center">
                                                                {row.author?.avatar_url ? <img src={row.author.avatar_url} className="w-full h-full object-cover"/> : <User className="w-3 h-3 text-gray-400" />}
                                                            </div>
                                                            <span className="text-sm text-gray-300">{row.author?.full_name || 'Unknown'}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (col === 'Pills') {
                                                return (
                                                    <td key={cIdx} className="p-4">
                                                        <div className="flex gap-2 flex-wrap">{Array.isArray(row.pills) && row.pills.map((p:string, i:number) => <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 border border-white/5">{p}</span>)}</div>
                                                    </td>
                                                )
                                            }
                                            if (col === 'Rating') {
                                                return <td key={cIdx} className="p-4"><div className="flex">{[...Array(5)].map((_,i) => <Star key={i} className={`w-3 h-3 ${i<Number(row.stars)?'text-brand-orange fill-brand-orange':'text-gray-800'}`} />)}</div></td>
                                            }

                                            return (
                                                <td key={cIdx} className="p-4 text-sm text-gray-300 font-medium">
                                                    {content}
                                                </td>
                                            );
                                        })}
                                        
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {onView && <button onClick={() => onView(row)} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="View"><Eye className="w-4 h-4" /></button>}
                                                {canEdit && onEdit && <button onClick={() => onEdit(row)} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>}
                                                {canEdit && onDelete && <button onClick={() => onDelete(row)} className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400 transition-colors" title="Archive"><Trash2 className="w-4 h-4" /></button>}
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
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl text-center max-w-sm w-full">
                <h3 className="text-white font-bold mb-2 text-lg">Archive Item?</h3>
                <p className="text-gray-400 text-sm mb-6">This item will be hidden from the public site but can be restored later.</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="px-4 py-2 text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export const ServiceEditor: React.FC<{ service: any; onSave: (data: any) => void; onCancel: () => void }> = ({ service, onSave, onCancel }) => {
    const [formData, setFormData] = useState(service || { title: '', slug: '', description: '', status: 'Draft', pills: [] });
    
    // Simple pills editor
    const handlePills = (val: string) => {
        setFormData({...formData, pills: val.split(',').map(s => s.trim())});
    };

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-6">{service ? 'Edit Service' : 'New Service'}</h3>
            <div className="space-y-4">
                <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Slug (e.g. web-development)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                <textarea className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white h-24" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Pills (comma separated)" value={Array.isArray(formData.pills) ? formData.pills.join(', ') : ''} onChange={e => handlePills(e.target.value)} />
                <div className="flex justify-end gap-3 pt-4">
                    <button onClick={onCancel} className="px-4 py-2 text-white">Cancel</button>
                    <button onClick={() => onSave(formData)} className="px-6 py-2 bg-white text-black rounded font-bold">Save</button>
                </div>
            </div>
        </div>
    );
};

export const PostEditor: React.FC<{ post: any; categories: any[]; onSave: (data: any) => void; onCancel: () => void }> = ({ post, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState(post || { title: '', slug: '', content: '', status: 'Draft', category: '' });

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-6">{post ? 'Edit Post' : 'New Post'}</h3>
            <div className="space-y-4">
                <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <div className="flex gap-4">
                    <input className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                    <select className="bg-black border border-white/10 rounded px-4 py-2 text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="">Select Category</option>
                        {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <textarea className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white h-64 font-mono text-sm" placeholder="Content (HTML or Text)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                
                <div className="flex justify-between items-center pt-4">
                    <select className="bg-black border border-white/10 rounded px-4 py-2 text-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                    </select>
                    <div className="flex gap-3">
                        <button onClick={onCancel} className="px-4 py-2 text-white">Cancel</button>
                        <button onClick={() => onSave(formData)} className="px-6 py-2 bg-white text-black rounded font-bold">Save Post</button>
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
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-bold text-white mb-6">{item ? 'Edit Testimonial' : 'New Testimonial'}</h3>
                <div className="space-y-4">
                    <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Client Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Business / Role" value={formData.business_name} onChange={e => setFormData({...formData, business_name: e.target.value})} />
                    <input className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" placeholder="Service Provided" value={formData.service_name} onChange={e => setFormData({...formData, service_name: e.target.value})} />
                    <textarea className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white h-24" placeholder="Review" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} />
                    <div className="flex items-center gap-4">
                        <label className="text-white text-sm">Stars:</label>
                        <input type="number" min="1" max="5" className="bg-black border border-white/10 rounded px-2 py-1 text-white w-16" value={formData.stars} onChange={e => setFormData({...formData, stars: e.target.value})} />
                    </div>
                    <button onClick={() => onSave(formData)} className="w-full py-3 bg-white text-black rounded font-bold mt-2">Save</button>
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
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-bold text-white mb-6">Lead Details</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label><div className="text-white">{lead.first_name} {lead.last_name}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-black border border-white/10 rounded px-2 py-1 text-white text-sm w-full"><option value="New">New</option><option value="Contacted">Contacted</option><option value="Archived">Archived</option></select>
                    </div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label><div className="text-white select-all">{lead.email}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label><div className="text-white select-all">{lead.mobile_number || '-'}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Budget</label><div className="text-white">{lead.project_budget || '-'}</div></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Source</label><div className="text-white">{lead.source || '-'}</div></div>
                    <div className="col-span-2 bg-white/5 p-4 rounded-lg"><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label><p className="text-gray-300 text-sm">{lead.project_details}</p></div>
                </div>
                <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 border border-white/10 text-white rounded">Close</button><button onClick={() => onSave({...lead, status})} className="px-4 py-2 bg-white text-black rounded font-bold">Update Status</button></div>
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
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6">
                <h3 className="text-white font-bold mb-4">Manage Categories</h3>
                <div className="flex gap-2 mb-4">
                    <input className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-white text-sm" placeholder="New Category" value={newCat} onChange={e => setNewCat(e.target.value)} />
                    <button onClick={handleAdd} className="bg-white text-black px-3 rounded font-bold text-sm">Add</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {categories.map(c => (
                        <div key={c.id} className="flex justify-between items-center text-sm text-gray-300 bg-white/5 px-3 py-2 rounded">
                            {c.name}
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="mt-4 w-full border border-white/10 py-2 rounded text-white text-sm hover:bg-white/5">Close</button>
            </div>
        </div>
    );
};
