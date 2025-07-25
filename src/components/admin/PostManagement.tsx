import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Play, Image as ImageIcon, Video, Calendar, Eye } from 'lucide-react';
import { apiRequestJson } from '../../utils/api';
import AuthenticatedWrapper from './AuthenticatedWrapper';

interface Post {
  _id: string;
  title: string;
  description: string;
  url?: string; // YouTube URL for videos
  image?: string; // Image URL for projects
  thumbnail?: string; // Video thumbnail
  category: string;
  keywords?: string[];
  status: string;
  views?: number;
  client?: string;
  createdAt: string;
  type: 'video' | 'project';
}

interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
}

interface PostManagementProps {
  isDarkMode: boolean;
  themeClasses: ThemeClasses;
}

const PostManagement: React.FC<PostManagementProps> = ({ isDarkMode, themeClasses }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'video' | 'project'>('all');

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    category: '',
    keywords: '',
    client: '',
    type: 'project' as 'video' | 'project'
  });

  const categories = ['IP', 'Brand', 'Corporate', 'Entertainment', 'Educational', 'Other'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch both videos and projects
      const [videosResponse, projectsResponse] = await Promise.all([
        apiRequestJson<{ videos: any[] }>('/api/videos'),
        apiRequestJson<{ projects: any[] }>('/api/projects')
      ]);

      // Transform and combine data
      const videos = videosResponse.videos?.map(video => ({
        ...video,
        type: 'video' as const
      })) || [];

      const projects = projectsResponse.projects?.map(project => ({
        ...project,
        type: 'project' as const
      })) || [];

      const combinedPosts = [...videos, ...projects].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setPosts(combinedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = formData.type === 'video' ? '/api/videos' : '/api/projects';
      const method = editingPost ? 'PUT' : 'POST';
      const url = editingPost ? `${endpoint}/${editingPost._id}` : endpoint;

      const submitData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        ...(formData.type === 'video' ? { url: formData.url } : { 
          image: formData.image,
          client: formData.client 
        })
      };

      await apiRequestJson(url, {
        method,
        body: JSON.stringify(submitData)
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        url: '',
        image: '',
        category: '',
        keywords: '',
        client: '',
        type: 'project'
      });
      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      url: post.url || '',
      image: post.image || '',
      category: post.category,
      keywords: post.keywords?.join(', ') || '',
      client: post.client || '',
      type: post.type
    });
    setShowForm(true);
  };

  const handleDelete = async (post: Post) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const endpoint = post.type === 'video' ? '/api/videos' : '/api/projects';
      await apiRequestJson(`${endpoint}/${post._id}`, {
        method: 'DELETE'
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  const handleViewDetails = (post: Post) => {
    // Navigate to post view details
    window.open(`/post/${post._id}?type=${post.type}`, '_blank');
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
    const matchesType = typeFilter === 'all' || post.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <AuthenticatedWrapper>
        <div className={`${themeClasses.cardBg} rounded-2xl p-8 ${themeClasses.border} border`}>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </AuthenticatedWrapper>
    );
  }

  return (
    <AuthenticatedWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Post Management</h1>
            <p className={`${themeClasses.textSecondary} mt-2`}>
              Manage videos and projects in one place
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingPost(null);
              setFormData({
                title: '',
                description: '',
                url: '',
                image: '',
                category: '',
                keywords: '',
                client: '',
                type: 'project'
              });
            }}
            className="bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Post
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.border} border`}>
            <h2 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>
              {editingPost ? 'Edit Post' : 'Add New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    Post Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'video' | 'project' })}
                    className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                    required
                  >
                    <option value="project">Project</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                  required
                />
              </div>

              {formData.type === 'video' ? (
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary h-24 resize-none`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className={`w-full px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  {editingPost ? 'Update Post' : 'Add Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold ${themeClasses.border} border ${themeClasses.textSecondary} ${themeClasses.hover} transition-colors`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className={`${themeClasses.cardBg} rounded-2xl p-6 ${themeClasses.border} border`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'video' | 'project')}
              className={`px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="project">Projects</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-4 py-2 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} border ${themeClasses.text} focus:outline-none focus:border-primary`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className={`${themeClasses.textSecondary} text-sm py-2`}>
              Total: {filteredPosts.length} posts
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post._id} className={`${themeClasses.cardBg} rounded-2xl overflow-hidden ${themeClasses.border} border hover:shadow-lg transition-all duration-200`}>
              <div className="aspect-video relative bg-gray-800">
                <img
                  src={post.type === 'video' ? post.thumbnail : post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.type === 'video' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {post.type === 'video' ? (
                      <div className="flex items-center gap-1">
                        <Video size={12} />
                        Video
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <ImageIcon size={12} />
                        Project
                      </div>
                    )}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-black/50 text-white rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2 line-clamp-2`}>
                  {post.title}
                </h3>
                <p className={`${themeClasses.textSecondary} text-sm mb-4 line-clamp-3`}>
                  {post.description}
                </p>

                {post.keywords && post.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${themeClasses.border} border ${themeClasses.textSecondary}`}
                      >
                        {keyword}
                      </span>
                    ))}
                    {post.keywords.length > 3 && (
                      <span className={`px-2 py-1 rounded-full text-xs ${themeClasses.textSecondary}`}>
                        +{post.keywords.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className={`flex items-center justify-between ${themeClasses.textSecondary} text-sm mb-4`}>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  {post.views && (
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{post.views} views</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(post)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.border} border transition-colors`}
                  >
                    <Edit2 size={16} className={themeClasses.textSecondary} />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 rounded-xl hover:bg-red-500/10 border border-red-500/30 text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={`${themeClasses.cardBg} rounded-2xl p-12 text-center ${themeClasses.border} border`}>
            <div className={`${themeClasses.textSecondary} mb-4`}>
              <Video size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>No posts found</h3>
              <p>No posts match your current filters.</p>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedWrapper>
  );
};

export default PostManagement;