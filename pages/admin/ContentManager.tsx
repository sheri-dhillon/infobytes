import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { TableView, ServiceEditor, PostEditor, TestimonialModal, LeadDetailsModal, DeleteConfirmationModal, CategoryManagerModal } from '../../components/admin/AdminComponents';
import { Loader2, ShieldAlert } from 'lucide-react';

export const ContentManager: React.FC = () => {
    const { section } = useParams<{ section: string }>();
    const { profile, user } = useAuth();
    
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
    
    // Editor States
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; item: any | null }>({ isOpen: false, item: null });

    const isBlogger = profile?.role === 'blogger';
    const isManager = profile?.role === 'manager';
    // Managers can view but not edit (unless it's leads status, etc - simplified here to read-only for table structure)
    const canEdit = !isManager; 

    // Access Control Logic
    const isRestricted = isBlogger && (section !== 'posts');

    // Fetch Data Logic
    const fetchData = async () => {
        if (isRestricted) return;
        setLoading(true);
        try {
            let query: any;
            let table = '';

            // Map URL section to DB table
            switch(section) {
                case 'services': table = 'services'; break;
                case 'posts': table = 'posts'; break;
                case 'testimonials': table = 'testimonials'; break;
                case 'leads': table = 'leads'; break;
                case 'casestudies': table = 'case_studies'; break;
                default: table = '';
            }

            if (!table) { setData([]); setLoading(false); return; }

            // Special query for posts to get author
            if (table === 'posts') {
                query = supabase.from(table).select(`*, author:author_id(full_name, avatar_url)`).order('created_at', { ascending: false });
                // Also fetch categories for posts
                const { data: catData } = await supabase.from('categories').select('*');
                if(catData) setCategories(catData);
            } else {
                query = supabase.from(table).select('*').order('created_at', { ascending: false });
            }

            const { data: result, error } = await query;
            if (!error && result) setData(result);
            
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setViewMode('active');
        setIsEditorOpen(false);
        setEditingItem(null);
    }, [section]);

    // Helpers
    const getColumns = () => {
        switch(section) {
            case 'services': return ['Title', 'Pills', 'Status'];
            case 'posts': return ['Title', 'Author', 'Category', 'Views', 'Status'];
            case 'testimonials': return ['Name', 'Business', 'Service', 'Rating', 'Status'];
            case 'leads': return ['Full Name', 'Email', 'Company', 'Status', 'Date'];
            case 'casestudies': return ['Title', 'Client', 'Category', 'Status'];
            default: return [];
        }
    };

    const getFilteredData = () => {
        if (viewMode === 'archived') return data.filter(i => i.status === 'Archived');
        return data.filter(i => i.status !== 'Archived');
    };

    const getTableTitle = () => {
        switch(section) {
            case 'casestudies': return 'Case Studies';
            default: return section ? section.charAt(0).toUpperCase() + section.slice(1) : 'Items';
        }
    };

    // Actions
    const handleSave = async (itemData: any) => {
        if (!canEdit && section !== 'leads') return; // Leads can update status by managers often, but keeping simple
        
        let table = section === 'casestudies' ? 'case_studies' : section;
        
        // Deep copy payload to avoid mutating original
        let payload = { ...itemData };
        let id = itemData.id;

        // Specific payload cleaning
        if (section === 'services') {
            // Ensure pills are JSON stringified if they are an array, as DB might expect text
            if (Array.isArray(payload.pills)) {
                payload.pills = JSON.stringify(payload.pills);
            }
        }

        if (section === 'posts') {
            // Ensure author is set on creation
            if (!id) payload.author_id = user?.id;
            delete payload.author; // Remove joined object
        }

        console.log('Saving to', table, payload); // Debug

        let error;
        if (id) {
            const { error: err } = await supabase.from(table!).update(payload).eq('id', id);
            error = err;
        } else {
            const { error: err } = await supabase.from(table!).insert([payload]);
            error = err;
        }

        if (!error) {
            await fetchData();
            setIsEditorOpen(false);
            setEditingItem(null);
        } else {
            console.error("Supabase Save Error:", error);
            alert("Error saving: " + error.message);
        }
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.item) return;
        let table = section === 'casestudies' ? 'case_studies' : section;
        
        const { error } = await supabase.from(table!).update({ status: 'Archived' }).eq('id', deleteConfirmation.item.id);
        
        if (error) {
            console.error("Delete error:", error);
            alert("Failed to delete: " + error.message);
        } else {
            await fetchData();
            setDeleteConfirmation({ isOpen: false, item: null });
        }
    };

    // Access Denied View
    if (isRestricted) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 text-red-500">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-gray-400 max-w-md">Your account role ({profile?.role}) does not have permission to access the <strong>{getTableTitle()}</strong> section.</p>
            </div>
        );
    }

    // Render Editor
    if (isEditorOpen) {
        if (section === 'services') return <ServiceEditor service={editingItem} onSave={handleSave} onCancel={() => setIsEditorOpen(false)} />;
        if (section === 'posts') return <PostEditor post={editingItem} categories={categories} onSave={handleSave} onCancel={() => setIsEditorOpen(false)} />;
    }

    if (loading) return <div className="flex h-64 w-full items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    // View data transformation for Leads
    const viewData = section === 'leads' ? getFilteredData().map(l => ({ ...l, fullname: `${l.first_name} ${l.last_name}` })) : getFilteredData();

    return (
        <>
            <TableView 
                title={getTableTitle()}
                data={viewData}
                columns={getColumns()}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
                canEdit={canEdit || (section === 'posts' && isBlogger)} // Bloggers can edit posts
                onAdd={section !== 'leads' ? () => { setEditingItem(null); setIsEditorOpen(true); } : undefined}
                onEdit={(item) => { setEditingItem(item); setIsEditorOpen(true); }}
                onView={section === 'leads' ? (item) => { setEditingItem(item); setIsEditorOpen(true); } : undefined}
                onDelete={(item) => setDeleteConfirmation({ isOpen: true, item })}
                onManageCategories={section === 'posts' ? () => setIsCategoryModalOpen(true) : undefined}
            />

            {/* Specific Modals */}
            {isEditorOpen && section === 'testimonials' && (
                <TestimonialModal item={editingItem} onClose={() => setIsEditorOpen(false)} onSave={handleSave} />
            )}
            {isEditorOpen && section === 'leads' && (
                <LeadDetailsModal lead={editingItem} onClose={() => setIsEditorOpen(false)} onSave={handleSave} />
            )}
            
            <CategoryManagerModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} categories={categories} onUpdate={fetchData} />
            <DeleteConfirmationModal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({isOpen:false, item: null})} onConfirm={confirmDelete} />
        </>
    );
};