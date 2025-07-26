import React, { useState, useEffect } from 'react';
// Import Link from react-router-dom to navigate to the detail page
import { Link } from 'react-router-dom';
import { Plus, Video, Image, Edit, Trash2, Eye, Search, Upload, Calendar, Tag, ExternalLink, Youtube, Loader2, X } from 'lucide-react';
import { apiRequestJson } from '../../utils/api';
import { fetchYouTubeVideoData, extractVideoId, getVideoThumbnail } from '../../utils/youtube';
import AuthenticatedWrapper from './AuthenticatedWrapper';

// --- INTERFACES (No changes) ---

interface BasePost {
  _id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  status: string;
  createdAt: string;
}

interface VideoPost extends BasePost {
  type: 'video';
  url: string;
  duration: string;
  views: string;
}

interface ProjectPost extends BasePost {
  type: 'project';
  image: string;
  client: string;
}

type Post = VideoPost | ProjectPost;

interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
}

// --- MAIN COMPONENT (No logical changes, only card components are updated) ---

const PostManagement = ({ isDarkMode, themeClasses }: { isDarkMode: boolean; themeClasses: ThemeClasses }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [postTypeToAdd, setPostTypeToAdd] = useState<'video' | 'project' | null>(null);
  
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateSort, setDateSort] = useState('newest');

  const [formData, setFormData] = useState({
    title: '', description: '', keywords: '', category: 'Branded Content', status: 'active',
    url: '', thumbnail: '', image: null as File | null, imagePreview: '', client: '',
  });

  const [loadingYouTube, setLoadingYouTube] = useState(false);
  
  const categories = [...new Set(['Branded Content', 'Celebrity Engagement', 'Sponsorships', 'Intellectual Properties', 'Digital Marketing Solutions'])];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const [videoData, projectData] = await Promise.all([
        apiRequestJson('/api/videos'),
        apiRequestJson('/api/projects')
      ]);
      const fetchedVideos: VideoPost[] = (Array.isArray(videoData) ? videoData : (videoData as any).videos || []).map((v: any) => ({ ...v, type: 'video' }));
      const fetchedProjects: ProjectPost[] = (Array.isArray(projectData) ? projectData : (projectData as any).projects || []).map((p: any) => ({ ...p, type: 'project' }));
      const allPosts = [...fetchedVideos, ...fetchedProjects].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPosts(allPosts);
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', keywords: '', category: 'Branded Content', status: 'active',
      url: '', thumbnail: '', image: null, imagePreview: '', client: ''
    });
    setEditingPost(null);
    setShowAddForm(false);
    setPostTypeToAdd(null);
  };
  
  const handleSelectPostType = (type: 'video' | 'project') => {
    setPostTypeToAdd(type);
    setShowTypeSelector(false);
    setShowAddForm(true);
  };

  const handleYouTubeUrlChange = async (url: string) => {
    setFormData(prev => ({ ...prev, url }));
    if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      setLoadingYouTube(true);
      try {
        const videoId = extractVideoId(url);
        if (videoId) {
          const thumbnail = getVideoThumbnail(videoId);
          const youtubeData = await fetchYouTubeVideoData(url);
          if (youtubeData) {
            setFormData(prev => ({
              ...prev, url,
              title: youtubeData.title !== 'YouTube Video' ? youtubeData.title : prev.title,
              description: youtubeData.description !== 'Video from YouTube' ? youtubeData.description : prev.description,
              thumbnail
            }));
          }
        }
      } catch (error) { console.error('Error fetching YouTube data:', error); } 
      finally { setLoadingYouTube(false); }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: file, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const type = editingPost?.type || postTypeToAdd;
    const isEditing = !!editingPost;
    let payload: any = {
      title: formData.title,
      description: formData.description,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
      category: formData.category,
      status: formData.status,
    };
    let url = `/api/${type}s`;
    if(isEditing) url += `/${editingPost!._id}`;
    try {
      if (type === 'video') {
        const youtubeData = await fetchYouTubeVideoData(formData.url);
        const videoId = extractVideoId(formData.url);
        payload = {
            ...payload,
            url: formData.url,
            views: youtubeData?.views || '0',
            duration: youtubeData?.duration || 'N/A',
            thumbnail: videoId ? getVideoThumbnail(videoId) : '',
        };
      } else if (type === 'project') {
        payload = {
            ...payload,
            client: formData.client,
            image: formData.imagePreview || "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=800",
        };
      }
      const response = await apiRequestJson(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      }) as Omit<Post, 'type'>;
      const updatedPost = { ...response, type } as Post;
      if (isEditing) {
        setPosts(posts.map(p => p._id === editingPost!._id ? updatedPost : p));
      } else {
        setPosts([updatedPost, ...posts]);
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to save ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setPostTypeToAdd(post.type);
    setFormData({
      title: post.title,
      description: post.description,
      keywords: post.keywords.join(', '),
      category: post.category,
      status: post.status,
      url: post.type === 'video' ? post.url : '',
      thumbnail: '',
      image: null,
      imagePreview: post.type === 'project' ? post.image : '',
      client: post.type === 'project' ? post.client : '',
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string, type: 'video' | 'project') => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
        try {
            await apiRequestJson(`/api/${type}s/${id}`, { method: 'DELETE' });
            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to delete ${type}`);
        }
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (dateSort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });
  
  return (
    <AuthenticatedWrapper themeClasses={themeClasses}>
        <div className="space-y-6">
            {/* Header */}
            <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.border} border`}>
                <div className="flex items-center justify-between">
                <div>
                    <h1 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Post Management</h1>
                    <p className={themeClasses.textSecondary}>Manage all your projects and video content</p>
                </div>
                <button
                    onClick={() => setShowTypeSelector(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                    <Plus size={20} />
                    <span>Add Post</span>
                </button>
                </div>
            </div>

            {/* Post Type Selector Modal */}
            {showTypeSelector && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className={`${themeClasses.cardBg} rounded-2xl p-8 ${themeClasses.border} border-2 text-center shadow-2xl`}>
                        <h2 className={`text-xl font-bold ${themeClasses.text} mb-6`}>What would you like to add?</h2>
                        <div className="flex gap-4">
                            <button onClick={() => handleSelectPostType('video')} className="flex flex-col items-center gap-3 p-6 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl border border-gray-700 transition-all w-40">
                                <Video size={32} className="text-cyan-400"/>
                                <span className="font-semibold text-white">Video</span>
                            </button>
                            <button onClick={() => handleSelectPostType('project')} className="flex flex-col items-center gap-3 p-6 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl border border-gray-700 transition-all w-40">
                                <Image size={32} className="text-emerald-400"/>
                                <span className="font-semibold text-white">Project</span>
                            </button>
                        </div>
                        <button onClick={() => setShowTypeSelector(false)} className="mt-8 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                    </div>
                </div>
            )}

            {/* Add/Edit Form */}
            {showAddForm && (
                 <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.border} border`}>
                 <div className="flex items-center justify-between mb-6">
                     <h2 className={`text-xl font-bold ${themeClasses.text}`}>{editingPost ? 'Edit' : 'Add New'} {postTypeToAdd === 'video' ? 'Video' : 'Project'}</h2>
                     <button onClick={resetForm} className={`px-4 py-2 ${themeClasses.textSecondary} ${themeClasses.hover} rounded-lg transition-colors`}>Cancel</button>
                 </div>
                 
                 <form onSubmit={handleSubmit} className="space-y-6">
                     <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`} placeholder="Title" required />
                     <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all resize-none`} placeholder="Description" required />
                     <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`}>
                         {categories.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                     <input type="text" value={formData.keywords} onChange={(e) => setFormData({...formData, keywords: e.target.value})} className={`w-full px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`} placeholder="keyword1, keyword2" />
                     {postTypeToAdd === 'video' && (
                         <div>
                             <label className={`block text-sm font-semibold ${themeClasses.text} mb-2 flex items-center gap-2`}><Youtube size={16} className="text-red-500"/>YouTube URL</label>
                             <div className="relative">
                                 <input type="url" value={formData.url} onChange={(e) => handleYouTubeUrlChange(e.target.value)} className={`w-full px-4 py-3 pr-12 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`} placeholder="https://www.youtube.com/watch?v=..." required />
                                 {loadingYouTube && <Loader2 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-cyan-500" />}
                             </div>
                             {formData.thumbnail && <img src={formData.thumbnail} alt="Video thumbnail" className="w-32 h-18 mt-3 object-cover rounded-lg border border-gray-600"/>}
                         </div>
                     )}
                     {postTypeToAdd === 'project' && (
                         <div>
                             <label className={`block text-sm font-semibold ${themeClasses.text} mb-2`}>Project Image</label>
                             <div className={`border-2 border-dashed ${themeClasses.border} rounded-xl p-8 text-center`}>
                                 {formData.imagePreview ? (
                                 <div className="relative inline-block">
                                     <img src={formData.imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                     <button type="button" onClick={() => setFormData({...formData, image: null, imagePreview: ''})} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"><X size={16} /></button>
                                 </div>
                                 ) : (
                                 <div>
                                     <Upload size={48} className={`${themeClasses.textSecondary} mx-auto mb-4`} />
                                     <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                                     <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                                     <Upload size={16} /> Choose File
                                     </label>
                                 </div>
                                 )}
                             </div>
                         </div>
                     )}
                     <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                         {postTypeToAdd === 'video' ? <Video size={20} /> : <Image size={20} />}
                         <span>{editingPost ? 'Save Changes' : `Add ${postTypeToAdd}`}</span>
                     </button>
                 </form>
                 </div>
            )}
            
            {/* Filters */}
            <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.border} border`}>
                <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSecondary}`} size={16} />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search posts..." className={`w-full pl-10 pr-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`} />
                </div>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={`px-4 py-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:ring-2 focus:ring-cyan-500 transition-all`}>
                    <option value="all">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                </div>
            </div>

            {/* Posts List / Grid */}
            {loading && <div className="text-center p-8"><Loader2 className="animate-spin inline-block" /> Loading...</div>}
            {error && <div className="text-center p-8 text-red-500">Error: {error}</div>}
            {!loading && !error && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedPosts.map((post) => (
                        post.type === 'video' 
                            ? <VideoCard key={post._id} video={post} themeClasses={themeClasses} onDelete={() => handleDelete(post._id, 'video')} onEdit={() => handleEdit(post)} />
                            : <ProjectCard key={post._id} project={post} themeClasses={themeClasses} onDelete={() => handleDelete(post._id, 'project')} onEdit={() => handleEdit(post)} />
                    ))}
                </div>
            )}

            {!loading && sortedPosts.length === 0 && (
                <div className={`${themeClasses.cardBg} rounded-2xl p-12 ${themeClasses.border} border text-center`}>
                    <Image size={48} className={`${themeClasses.textSecondary} mx-auto mb-4`} />
                    <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>No Posts Found</h3>
                    <p className={themeClasses.textSecondary}>Try adding a new post or adjusting your filters.</p>
                </div>
            )}
        </div>
    </AuthenticatedWrapper>
  );
};

// --- REVAMPED CARD COMPONENTS ---

const VideoCard = ({ video, themeClasses, onDelete, onEdit }: { video: VideoPost, themeClasses: ThemeClasses, onDelete: () => void, onEdit: () => void }) => (
    <div className={`${themeClasses.cardBg} rounded-2xl ${themeClasses.border} border hover:border-cyan-500/50 transition-all flex flex-col h-full`}>
      <div className="p-6 flex flex-col flex-grow">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-lg font-bold ${themeClasses.text} line-clamp-2 pr-4`}>{video.title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={onEdit} className={`p-2 ${themeClasses.hover} rounded-lg transition-colors`}><Edit size={16} className={themeClasses.textSecondary} /></button>
              <button onClick={onDelete} className={`p-2 ${themeClasses.hover} rounded-lg transition-colors`}><Trash2 size={16} className="text-red-400" /></button>
          </div>
        </div>
  
        {/* Category */}
        <div className="mb-4">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{video.category}</span>
        </div>
  
        {/* Content Body - this part will grow */}
        <div className="flex-grow">
          <p className={`${themeClasses.textSecondary} mb-4 line-clamp-3 text-sm`}>{video.description || 'No description available.'}</p>
        </div>
      </div>
      
      {/* Card Footer - always at the bottom */}
      <div className="border-t border-white/10 p-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye size={14} className={themeClasses.textSecondary} />
              <span className={themeClasses.textSecondary}>{video.views || 'N/A'} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className={themeClasses.textSecondary} />
              <span className={themeClasses.textSecondary}>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Link to={`/posts/${video._id}?type=video`} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
            <ExternalLink size={14} />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
  
  const ProjectCard = ({ project, themeClasses, onDelete, onEdit }: { project: ProjectPost, themeClasses: ThemeClasses, onDelete: () => void, onEdit: () => void }) => (
    <div className={`group relative ${themeClasses.cardBg} rounded-2xl overflow-hidden ${themeClasses.border} border hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col`}>
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {/* Edit/Delete overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex gap-3">
                  <button onClick={onEdit} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 border border-white/20"><Edit size={20} className="text-white" /></button>
                  <button onClick={onDelete} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 border border-white/20"><Trash2 size={20} className="text-red-400" /></button>
              </div>
          </div>
      </div>
  
      {/* Content Area */}
      <div className="p-6 flex-grow flex flex-col">
          {/* Category */}
          <div className="mb-4">
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">{project.category}</span>
          </div>
          
          {/* Title and Description */}
          <div className="flex-grow">
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-2 line-clamp-2`}>{project.title}</h3>
            <p className={`${themeClasses.textSecondary} text-sm mb-4 line-clamp-2`}>{project.description || 'No description available'}</p>
          </div>
  
          {/* Footer - Pushed to the bottom */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className={themeClasses.textSecondary} />
                    <span className={themeClasses.textSecondary}>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <Link to={`/posts/${project._id}?type=project`} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                    <ExternalLink size={14} />
                    <span>View</span>
                </Link>
            </div>
          </div>
      </div>
    </div>
  );

export default PostManagement;