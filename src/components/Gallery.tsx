import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, ArrowUpRight, FolderOpen, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiRequestJson } from '@/utils/api';
import { fetchYouTubeVideoData, extractVideoId } from '@/utils/youtube';

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
}

type GalleryItem = Project | VideoItem;

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const gradients = [
    "from-cyan-500 to-pink-600",
    "from-pink-500 to-purple-600",
    "from-purple-500 to-pink-600",
    "from-pink-500 to-red-600",
    "from-cyan-500 to-pink-600",
    "from-pink-500 to-purple-600"
  ];

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        
        // Fetch both projects and videos
        const [projectsResponse, videosResponse] = await Promise.all([
          apiRequestJson<{ projects: Project[] }>('/api/projects?limit=6&status=published'),
          apiRequestJson<{ videos: VideoItem[] }>('/api/videos?limit=6&status=active')
        ]);

        const projects: GalleryItem[] = (projectsResponse.projects || []).map(project => ({
          ...project,
          type: 'project' as const
        }));

        // Enhance videos with YouTube data
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
              };
            } catch (error) {
              console.error('Error fetching YouTube data for video:', video._id, error);
              return {
                ...video,
                type: 'video' as const,
                duration: '0:00',
                views: '0',
                publishedAt: video.createdAt
              };
            }
          })
        );

        // Combine and sort by creation date
        const allItems = [...projects, ...enhancedVideos].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setItems(allItems);
      } catch (err) {
        console.error('Failed to fetch gallery items:', err);
        setError('Failed to load gallery items');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="relative bg-card rounded-xl overflow-hidden border border-border animate-pulse">
          <div className="aspect-video bg-muted"></div>
          <div className="p-4">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const getVideoId = (url: string): string => {
    return extractVideoId(url) || '';
  };

  return (
    <section id="gallery" className="py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
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
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Creative Gallery
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects and videos showcasing innovative media solutions,
            strategic partnerships, and creative excellence across all platforms.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <FolderOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-400">
              We're curating amazing content for you. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div 
                  key={item._id} 
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/post/${item._id}?type=${item.type}`)}
                >
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      {item.type === 'project' ? (
                        item.image ? (
                          <div className="aspect-video relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <FolderOpen className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )
                      ) : (
                        <div className="aspect-video relative">
                          <img 
                            src={item.thumbnailUrl || `https://i.ytimg.com/vi/${getVideoId(item.url)}/hqdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop';
                            }}
                          />
                          
                          {/* Video duration overlay */}
                          {item.duration && (
                            <div className="absolute bottom-3 right-3">
                              <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                                {item.duration}
                              </span>
                            </div>
                          )}
                          
                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              {item.category}
                            </span>
                          </div>
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description?.length > 80 
                          ? `${item.description.substring(0, 80)}...` 
                          : item.description}
                      </p>
                      
                      {/* Video metadata */}
                      {item.type === 'video' && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.views ? `${parseInt(item.views).toLocaleString()} views` : '0 views'}</span>
                          <span>{new Date(item.publishedAt || item.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {/* Project metadata */}
                      {item.type === 'project' && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="capitalize">{item.status}</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button 
                onClick={() => navigate('/projects')}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <span>Explore Full Gallery</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;