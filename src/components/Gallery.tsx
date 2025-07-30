import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Play, ArrowUpRight, FolderOpen, Video, MoreVertical, Share2, Copy } from 'lucide-react';
import { apiRequestJson } from '@/utils/api';
import { formatTimeAgo } from '@/lib/utils';
import { fetchYouTubeVideoData, extractVideoId, formatViews } from '@/utils/youtube';

// Define TypeScript interfaces for our data
interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  status: string;
  createdAt: string;
  type: 'project';
}

interface VideoItem {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  thumbnailUrl?: string;
  status: string;
  createdAt: string;
  type: 'video';
  duration?: string;
  views?: string;
  publishedAt?: string;
  channelTitle?: string;
}

type GalleryItem = Project | VideoItem;

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // State for the "share" dropdown menu
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        
        // Fetch both projects and videos in parallel
        const [projectsResponse, videosResponse] = await Promise.all([
          apiRequestJson<{ projects: Project[] }>('/api/projects?limit=6&status=published'),
          apiRequestJson<{ videos: VideoItem[] }>('/api/videos?limit=6&status=active')
        ]);

        const projects: GalleryItem[] = (projectsResponse.projects || []).map(p => ({ ...p, type: 'project' as const }));

        // Enhance videos with fresh YouTube data
        const enhancedVideos: GalleryItem[] = await Promise.all(
          (videosResponse.videos || []).map(async (video) => {
            try {
              const youtubeData = await fetchYouTubeVideoData(video.url);
              return {
                ...video,
                type: 'video' as const,
                title: youtubeData?.title || video.title,
                description: youtubeData?.description || video.description,
                thumbnailUrl: youtubeData?.thumbnail || video.thumbnailUrl,
                duration: youtubeData?.duration || '0:00',
                views: youtubeData?.views || '0',
                publishedAt: youtubeData?.publishedAt || video.createdAt,
                channelTitle: youtubeData?.channelTitle || 'AcrossMedia',
              };
            } catch (error) {
              console.error('Error fetching YouTube data for video:', video._id, error);
              return { ...video, type: 'video' as const, views: '0', channelTitle: 'AcrossMedia' };
            }
          })
        );
        
        const allItems = [...projects, ...enhancedVideos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setItems(allItems);
      } catch (err) {
        console.error('Failed to fetch gallery items:', err);
        setError('Failed to load gallery items');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Close share menu if clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => openShareMenu && setOpenShareMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openShareMenu]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
          <div className="aspect-video bg-muted"></div>
          <div className="p-4"><div className="h-4 bg-muted rounded mb-2"></div><div className="h-3 bg-muted rounded mb-2"></div><div className="h-3 bg-muted rounded w-3/4"></div></div>
        </div>
      ))}
    </div>
  );

  const getVideoId = (url: string): string => extractVideoId(url) || '';

  return (
    <section id="gallery" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Gallery</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Creative Gallery</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects and videos showcasing innovative media solutions and creative excellence.
          </p>
        </div>

        {loading ? <LoadingSkeleton /> : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center"><FolderOpen className="w-12 h-12 text-gray-400" /></div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-400">We're curating amazing content for you. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item._id} className="group relative">
                  <div className="flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => navigate(`/post/${item._id}?type=${item.type}`)}>
                      {item.type === 'project' ? (
                          item.image ? (<div className="aspect-video relative"><img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute top-3 left-3"><span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">{item.category}</span></div></div>) : (<div className="aspect-video bg-muted flex items-center justify-center"><FolderOpen className="w-12 h-12 text-muted-foreground" /></div>)
                      ) : (
                        <div className="aspect-video relative">
                          <img src={item.thumbnailUrl || `https://i.ytimg.com/vi/${getVideoId(item.url)}/hqdefault.jpg`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop'; }}/>
                          {item.duration && (<div className="absolute bottom-3 right-3"><span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">{item.duration}</span></div>)}
                          <div className="absolute top-3 left-3"><span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1"><Video className="w-3 h-3" />{item.category}</span></div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center"><div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"><Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" /></div></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      {item.type === 'project' ? (
                        <>
                          <div className="flex-grow"><h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/post/${item._id}?type=${item.type}`)}>{item.title}</h3><p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p></div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto"><span className="capitalize">{item.status}</span><span>{new Date(item.createdAt).toLocaleDateString()}</span></div>
                        </>
                      ) : (
                        <div className="flex items-start gap-3 flex-grow">
                          <div className="flex-1 min-w-0 flex flex-col h-full">
                            <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" title={item.title} onClick={() => navigate(`/post/${item._id}?type=${item.type}`)}>{item.title}</h3>
                            <p className="text-xs text-gray-500 mb-1 truncate">{item.channelTitle || 'AcrossMedia'}</p>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{item.description}</p>
                            
                            {/* --- THE FIX IS HERE --- */}
                            {/* Replaced 'flex-wrap' with 'whitespace-nowrap' to prevent line breaking */}
                            <div className="flex items-center gap-x-2.5 text-xs text-muted-foreground whitespace-nowrap mt-auto">
                              <span className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                {formatViews(item.views)} views
                              </span>
                              <span className="text-gray-600">•</span>
                              <span>{item.duration || 'N/A'}</span>
                              <span className="text-gray-600">•</span>
                              <span>{formatTimeAgo(item.publishedAt || item.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div className="relative flex-shrink-0">
                            <button onClick={(e) => { e.stopPropagation(); setOpenShareMenu(openShareMenu === item._id ? null : item._id); }} className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 z-10 transition-colors" aria-label="More options"><MoreVertical size={18} /></button>
                            {openShareMenu === item._id && (
                              <div onClick={(e) => e.stopPropagation()} className="absolute top-full right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl z-20 animate-in fade-in-0 zoom-in-95">
                                <button onClick={() => { navigator.clipboard.writeText(item.url); setCopied(true); setTimeout(() => { setCopied(false); setOpenShareMenu(null); }, 2000); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-muted rounded-lg transition-colors">
                                  {copied ? (<><Copy size={16} className="text-green-400" /> <span className="text-green-400">Copied!</span></>) : (<><Share2 size={16} /> <span>Share</span></>)}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button onClick={() => navigate('/projects')} className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3"><span>Explore Full Gallery</span><ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;