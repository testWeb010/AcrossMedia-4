import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Share2, Eye, User } from 'lucide-react';
import YouTube from 'react-youtube';
import { apiRequestJson } from '../utils/api';

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

const PostView = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') as 'video' | 'project';
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!id || !type) {
      navigate('/');
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const endpoint = type === 'video' ? '/api/videos' : '/api/projects';
        const response = await apiRequestJson<Post>(`${endpoint}/${id}`);
        setPost({ ...response, type });
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, type, navigate]);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const videoId = post.type === 'video' && post.url ? getYouTubeVideoId(post.url) : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.type === 'video' ? post.thumbnail : post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeft size={20} />
              <span>Back to {post.type === 'video' ? 'Videos' : 'Projects'}</span>
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      post.type === 'video' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {post.type === 'video' ? 'Video' : 'Project'} • {post.category}
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-primary bg-clip-text text-transparent">
                      {post.title}
                    </span>
                  </h1>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-8 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} />
                      <span className="text-lg">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    {post.views && (
                      <div className="flex items-center gap-2">
                        <Eye size={20} />
                        <span className="text-lg">{post.views} views</span>
                      </div>
                    )}
                    {post.client && (
                      <div className="flex items-center gap-2">
                        <User size={20} />
                        <span className="text-lg">{post.client}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {post.type === 'video' && videoId ? (
                    <button 
                      onClick={() => setShowVideo(true)}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <Play size={20} />
                        <span>Watch Video</span>
                      </div>
                    </button>
                  ) : (
                    <button className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        <Eye size={20} />
                        <span>View Project</span>
                      </div>
                    </button>
                  )}

                  <button 
                    onClick={handleShare}
                    className="group border-2 border-gray-600 text-gray-300 px-6 py-4 rounded-2xl font-semibold hover:border-primary hover:text-white transition-all duration-300 flex items-center gap-3"
                  >
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 aspect-video">
                  {showVideo && post.type === 'video' && videoId ? (
                    <YouTube
                      videoId={videoId}
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          modestbranding: 1,
                          rel: 0
                        }
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <>
                      <img
                        src={post.type === 'video' ? post.thumbnail : post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      {post.type === 'video' && !showVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => setShowVideo(true)}
                            className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300"
                          >
                            <Play size={40} className="text-white ml-2" fill="white" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
                About This {post.type === 'video' ? 'Video' : 'Project'}
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {post.description}
                </p>

                {post.keywords && post.keywords.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">Keywords</h3>
                    <div className="flex flex-wrap gap-3">
                      {post.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <div className="text-center">
                    <h4 className="text-gray-400 text-sm mb-2">Type</h4>
                    <p className="text-white font-semibold capitalize">{post.type}</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-gray-400 text-sm mb-2">Category</h4>
                    <p className="text-white font-semibold">{post.category}</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-gray-400 text-sm mb-2">Created</h4>
                    <p className="text-white font-semibold">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostView;