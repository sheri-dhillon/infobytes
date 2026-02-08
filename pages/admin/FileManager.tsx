import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Copy, Trash2, Image as ImageIcon, Loader2, Check, RefreshCw, AlertTriangle } from 'lucide-react';

export const FileManager: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.storage.from('media').list('uploads', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            });

            if (error) throw error;
            setFiles(data || []);
        } catch (err: any) {
            console.error('Error fetching files:', err);
            setError(err.message || 'Failed to load files.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `uploads/${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`;

        try {
            const { error } = await supabase.storage.from('media').upload(fileName, file);
            if (error) throw error;
            await fetchFiles();
        } catch (err: any) {
            alert('Error uploading file: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (fileName: string) => {
        if (!window.confirm('Are you sure you want to delete this file?')) return;

        try {
            const { error } = await supabase.storage.from('media').remove([`uploads/${fileName}`]);
            if (error) throw error;
            await fetchFiles();
        } catch (err: any) {
            alert('Error deleting file: ' + err.message);
        }
    };

    const copyToClipboard = (fileName: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(`uploads/${fileName}`);
        navigator.clipboard.writeText(data.publicUrl);
        setCopiedId(fileName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">File Manager</h2>
                    <p className="text-gray-400 text-sm">Upload images for your blog posts and services.</p>
                </div>
                
                <label className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold cursor-pointer transition-colors ${uploading ? 'bg-gray-600 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'}`}>
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload File'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {loading ? (
                <div className="flex h-64 w-full items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
                </div>
            ) : error ? (
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Error Loading Files</h3>
                    <p className="text-gray-500 text-sm mb-6">{error}</p>
                    <button onClick={fetchFiles} className="px-4 py-2 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Retry
                    </button>
                </div>
            ) : files.length === 0 ? (
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">No files yet</h3>
                    <p className="text-gray-500 text-sm">Upload your first image to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {files.map((file) => {
                        const publicUrl = supabase.storage.from('media').getPublicUrl(`uploads/${file.name}`).data.publicUrl;
                        
                        return (
                            <div key={file.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden aspect-square">
                                <img src={publicUrl} alt={file.name} className="w-full h-full object-cover" />
                                
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                    <button 
                                        onClick={() => copyToClipboard(file.name)}
                                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 w-full justify-center backdrop-blur-sm"
                                    >
                                        {copiedId === file.name ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                        {copiedId === file.name ? 'Copied!' : 'Copy URL'}
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(file.name)}
                                        className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 mt-2"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};