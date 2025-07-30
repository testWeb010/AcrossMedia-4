import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Play,
  ArrowUpRight,
  Video,
  MoreVertical,
  Share2,
  Copy,
  FolderOpen,
  X,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import {
  fetchYouTubeVideoData,
  extractVideoId,
  formatViews,
} from "@/utils/youtube";

// --- VIDEO MODAL COMPONENT ---
interface VideoModalProps {
  url: string;
  onClose: () => void;
}
const VideoModal = ({ url, onClose }: VideoModalProps) => {
  const videoId = extractVideoId(url);
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  if (!videoId) {
    return null;
  }
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Close video player"
        >
          <X size={24} />
        </button>
        <iframe
          className="w-full h-full rounded-lg"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// --- PORTFOLIO COMPONENT ---
interface VideoItem {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  thumbnailUrl?: string;
  status: string;
  createdAt: string;
  type: "video";
  duration?: string;
  views?: string;
  publishedAt?: string;
  channelTitle?: string;
}

const featuredVideoUrls = [
  "https://youtube.com/shorts/i0hQSDmj62I?si=NhEiEH1YNAx0Ydb9",
  "https://youtube.com/shorts/TrIcT_qasfs?si=3hcyBkkkTRiG43T6",
  "https://youtube.com/shorts/sArj28k5ICk?si=baLLaSdk8dsRFpTf",
];

const Portfolio = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchStaticVideos = async () => {
      try {
        setLoading(true);
        const videoDataPromises = featuredVideoUrls.map(async (url) => {
          try {
            const youtubeData = await fetchYouTubeVideoData(url);
            if (!youtubeData) throw new Error(`No data for URL: ${url}`);
            return {
              _id: url,
              type: "video" as const,
              status: "active",
              url: url,
              title: youtubeData.title,
              description: youtubeData.description,
              thumbnailUrl: youtubeData.thumbnail,
              duration: youtubeData.duration,
              views: youtubeData.views,
              publishedAt: youtubeData.publishedAt,
              channelTitle: youtubeData.channelTitle,
              category: "Featured",
              createdAt: youtubeData.publishedAt,
            };
          } catch (error) {
            console.error(`Failed to fetch data for ${url}:`, error);
            return null;
          }
        });
        const resolvedVideos = await Promise.all(videoDataPromises);
        const validVideos = resolvedVideos.filter((v) => v !== null);
        setVideos(validVideos as VideoItem[]);
      } catch (err) {
        console.error("Failed to fetch static video highlights:", err);
        setError("Failed to load video content");
      } finally {
        setLoading(false);
      }
    };
    fetchStaticVideos();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => openShareMenu && setOpenShareMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openShareMenu]);

  useEffect(() => {
    if (playingVideoUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [playingVideoUrl]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-xl overflow-hidden border border-border animate-pulse"
        >
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

  return (
    <>
      <section id="work" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* --- HEADING BLOCK RESTORED HERE --- */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                Our Work
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Media Highlights
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover our latest videos showcasing innovative campaigns, brand
              partnerships, and creative excellence.
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <FolderOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Highlights Coming Soon
              </h3>
              <p className="text-gray-400">
                We're preparing our latest work. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video._id} className="group relative">
                    <div className="flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                      <div
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => setPlayingVideoUrl(video.url)}
                      >
                        <div className="aspect-video relative">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop";
                            }}
                          />
                          {video.duration && (
                            <div className="absolute bottom-3 right-3">
                              <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                                {video.duration}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              {video.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                              <Play
                                className="w-5 h-5 text-white ml-0.5"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex items-start gap-3 flex-grow">
                          <div className="flex-1 min-w-0 flex flex-col h-full">
                            <h3
                              className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors"
                              title={video.title}
                            >
                              {video.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-1 truncate">
                              {video.channelTitle}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                              {video.description}
                            </p>
                            <div className="flex items-center gap-x-2.5 text-xs text-muted-foreground whitespace-nowrap mt-auto">
                              <span className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                {formatViews(video.views)} views
                              </span>
                              <span className="text-gray-600">•</span>
                              <span>{video.duration}</span>
                              <span className="text-gray-600">•</span>
                              <span>{formatTimeAgo(video.publishedAt)}</span>
                            </div>
                          </div>
                          <div className="relative flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenShareMenu(
                                  openShareMenu === video._id ? null : video._id
                                );
                              }}
                              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 z-10 transition-colors"
                              aria-label="More options"
                            >
                              <MoreVertical size={18} />
                            </button>
                            {openShareMenu === video._id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-full right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl z-20 animate-in fade-in-0 zoom-in-95"
                              >
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(video.url);
                                    setCopied(true);
                                    setTimeout(() => {
                                      setCopied(false);
                                      setOpenShareMenu(null);
                                    }, 2000);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-muted rounded-lg transition-colors"
                                >
                                  {copied ? (
                                    <>
                                      <Copy
                                        size={16}
                                        className="text-green-400"
                                      />{" "}
                                      <span className="text-green-400">
                                        Copied!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Share2 size={16} /> <span>Share</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <button
                  onClick={() => navigate("/gallery")}
                  className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <span>View More</span>
                    <ArrowUpRight
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      {playingVideoUrl && (
        <VideoModal
          key={playingVideoUrl}
          url={playingVideoUrl}
          onClose={() => setPlayingVideoUrl(null)}
        />
      )}
    </>
  );
};

export default Portfolio;
