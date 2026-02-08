import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { TableView, ServiceEditor, PostEditor, CaseStudyEditor, TestimonialModal, LeadDetailsModal, DeleteConfirmationModal, CategoryManagerModal } from '../../components/admin/AdminComponents';
import { Loader2, ShieldAlert, RefreshCw } from 'lucide-react';

export const ContentManager: React.FC = () => {
    const { section } = useParams<{ section: string }>();
    const { profile, user } = useAuth();
    
    // Safely consume refresh context
    const context = useOutletContext<{ refreshKey: number }>();
    const refreshKey = context?.refreshKey || 0;
    
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // New error state
    const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
    
    // Editor States
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]); // To populate service dropdown for case studies
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; item: any | null }>({ isOpen: false, item: null });

    const isBlogger = profile?.role === 'blogger';
    const isManager = profile?.role === 'manager';
    const canEdit = !isManager; 

    const isRestricted = isBlogger && (section !== 'posts');

    const fetchData = useCallback(async () => {
        if (isRestricted || !section) return;
        
        setLoading(true);
        setError(null);

        try {
            let query: any;
            let table = '';

            switch(section) {
                case 'services': table = 'services'; break;
                case 'posts': table = 'posts'; break;
                case 'testimonials': table = 'testimonials'; break;
                case 'leads': table = 'leads'; break;
                case 'casestudies': table = 'case_studies'; break;
                default: table = '';
            }

            if (!table) { 
                setData([]); 
                setLoading(false); 
                return; 
            }

            // Categories fetch (non-blocking)
            if (table === 'posts') {
                supabase.from('categories').select('*').then(({ data: catData }) => {
                    if (catData) setCategories(catData);
                });
                
                query = supabase
                    .from(table)
                    .select(`*, author:author_id(full_name, avatar_url)`)
                    .order('created_at', { ascending: false });
            } else if (table === 'case_studies') {
                // If viewing case studies, fetch services for the dropdown selector
                supabase.from('services').select('title, id').eq('status', 'Active').then(({ data: serviceData }) => {
                    if (serviceData) setServices(serviceData);
                });
                query = supabase
                    .from(table)
                    .select('*')
                    .order('created_at', { ascending: false });
            } else {
                query = supabase
                    .from(table)
                    .select('*')
                    .order('created_at', { ascending: false });
            }

            // Add a safety timeout to the fetch (increased to 60s)
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 60000)
            );

            const response: any = await Promise.race([query, timeoutPromise]);
            
            if (response.error) throw response.error;
            
            if (response.data) {
                setData(response.data);
            }
            
        } catch (err: any) {
            console.error("Fetch data error:", err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, [section, isRestricted]);

    // Re-fetch when section changes or refreshKey updates
    useEffect(() => {
        fetchData();
        if (section) {
            setViewMode('active');
            setIsEditorOpen(false);
            setEditingItem(null);
        }
    }, [fetchData, refreshKey, section]);

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

    const handleSave = async (itemData: any) => {
        if (!canEdit && section !== 'leads') return; 
        
        let table = section === 'casestudies' ? 'case_studies' : section;
        
        let payload = { ...itemData };
        let id = itemData.id;

        // Cleanup before send
        delete payload.id;
        delete payload.author;
        delete payload.fullname;
        delete payload.created_at; 

        if (section === 'services') {
            payload = {
                title: itemData.title,
                slug: itemData.slug,
                description: itemData.description,
                content: itemData.content,
                image: itemData.image,
                status: itemData.status,
                pills: Array.isArray(itemData.pills) ? JSON.stringify(itemData.pills) : itemData.pills,
                seo_title: itemData.seo_title,
                meta_description: itemData.meta_description
            };
        } else if (section === 'posts') {
            payload = {
                title: itemData.title,
                slug: itemData.slug,
                content: itemData.content,
                image: itemData.image,
                category: itemData.category,
                status: itemData.status,
                seo_title: itemData.seo_title,
                meta_description: itemData.meta_description,
                views: itemData.views || 0
            };
            if (!id) {
                payload.author_id = user?.id; 
            }
        } else if (section === 'casestudies') {
            payload = {
                title: itemData.title,
                subtitle: itemData.subtitle,
                slug: itemData.slug,
                content: itemData.content,
                status: itemData.status,
                client_logo: itemData.client_logo,
                service_category: itemData.service_category, // Service Select
                before_image: itemData.before_image,
                after_image: itemData.after_image,
                image: itemData.after_image, // Auto-set main listing image to the 'after' image
                seo_title: itemData.seo_title,
                meta_description: itemData.meta_description,
                keywords: itemData.keywords
            };
        }

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
            alert("Error saving: " + error.message);
        }
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.item) return;
        let table = section === 'casestudies' ? 'case_studies' : section;
        const isPermanent = deleteConfirmation.item.status === 'Archived' || viewMode === 'archived';

        if (isPermanent) {
             const { error } = await supabase.from(table!).delete().eq('id', deleteConfirmation.item.id);
             if (error) alert("Failed to delete: " + error.message);
        } else {
             const { error } = await supabase.from(table!).update({ status: 'Archived' }).eq('id', deleteConfirmation.item.id);
             if (error) alert("Failed to archive: " + error.message);
        }
        
        await fetchData();
        setDeleteConfirmation({ isOpen: false, item: null });
    };

    const handleRestore = async (item: any) => {
        if (!item) return;
        let table = section === 'casestudies' ? 'case_studies' : section;
        const { error } = await supabase.from(table!).update({ status: 'Draft' }).eq('id', item.id);
        if (error) alert("Failed to restore: " + error.message);
        else await fetchData();
    };

    if (isRestricted) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 text-red-500">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-gray-400 max-w-md">Your role ({profile?.role}) cannot access {getTableTitle()}.</p>
            </div>
        );
    }

    if (isEditorOpen) {
        if (section === 'services') return <ServiceEditor service={editingItem} onSave={handleSave} onCancel={() => setIsEditorOpen(false)} />;
        if (section === 'posts') return <PostEditor post={editingItem} categories={categories} onSave={handleSave} onCancel={() => setIsEditorOpen(false)} />;
        if (section === 'casestudies') return <CaseStudyEditor caseStudy={editingItem} services={services} onSave={handleSave} onCancel={() => setIsEditorOpen(false)} />;
    }

    if (loading) return <div className="flex h-64 w-full items-center justify-center"><Loader2 className="w-8 h-8 text-brand-purple animate-spin" /></div>;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full text-center">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Failed to load content</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-md">{error}</p>
                <button onClick={fetchData} className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Retry
                </button>
            </div>
        );
    }

    const viewData = section === 'leads' ? getFilteredData().map(l => ({ ...l, fullname: `${l.first_name} ${l.last_name}` })) : getFilteredData();

    return (
        <>
            <TableView 
                title={getTableTitle()}
                data={viewData}
                columns={getColumns()}
                viewMode={viewMode}
                onToggleView={() => setViewMode(prev => prev === 'active' ? 'archived' : 'active')}
                canEdit={canEdit || (section === 'posts' && isBlogger)}
                onAdd={section !== 'leads' ? () => { setEditingItem(null); setIsEditorOpen(true); } : undefined}
                onEdit={(item) => { setEditingItem(item); setIsEditorOpen(true); }}
                onView={section === 'leads' ? (item) => { setEditingItem(item); setIsEditorOpen(true); } : undefined}
                onDelete={(item) => setDeleteConfirmation({ isOpen: true, item })}
                onRestore={handleRestore}
                onManageCategories={section === 'posts' ? () => setIsCategoryModalOpen(true) : undefined}
            />

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