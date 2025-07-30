import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Calendar,
  Share2,
  Eye,
  User,
  Clapperboard,
  Tag,
} from "lucide-react";
import { apiRequestJson } from "../utils/api";
// We need the YouTube utility functions for this page to work correctly
import { fetchYouTubeVideoData, extractVideoId } from "../utils/youtube";

// --- INTERFACES (Updated to match data needs) ---

interface BasePost {
  _id: string;
  title: string;
  description: string;
  category: string;
  keywords?: string[];
  status: string;
  createdAt: string;
}

interface VideoPost extends BasePost {
  type: "video";
  url: string;
  thumbnail?: string;
  views?: string; // Views from YouTube are a string
  channelTitle?: string; // Add channel title
}

interface ProjectPost extends BasePost {
  type: "project";
  image: string;
  client?: string;
}

type Post = VideoPost | ProjectPost;

// --- COMPONENT ---

const PostView = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") as "video" | "project";

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!id || !type) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        let fetchedPost: Post;

        if (type === "video") {
          // 1. Fetch the base video data from our API
          const baseVideo = await apiRequestJson<Omit<VideoPost, "type">>(
            `/api/videos/${id}`
          );

          // 2. Enhance with fresh, live data from YouTube
          const youtubeData = await fetchYouTubeVideoData(baseVideo.url);

          // 3. Merge data, giving YouTube data precedence for accuracy
          fetchedPost = {
            ...baseVideo,
            type: "video",
            title: youtubeData?.title || baseVideo.title,
            description: youtubeData?.description || baseVideo.description,
            thumbnail: youtubeData?.thumbnail || baseVideo.thumbnail,
            views: youtubeData?.views || baseVideo.views || "0",
            channelTitle: youtubeData?.channelTitle || "Across Media",
          };
        } else {
          // type must be 'project'
          const response = await apiRequestJson<Omit<ProjectPost, "type">>(
            `/api/projects/${id}`
          );
          fetchedPost = { ...response, type: "project" };
        }

        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, type, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
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
        <div className="text-center p-4">
          {" "}
          {/* Added padding for mobile */}
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const videoId = post.type === "video" ? extractVideoId(post.url) : null;
  const displayImage = post.type === "video" ? post.thumbnail : post.image;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      <main>
        {/* Hero Section - RESPONSIVE UPDATE */}
        <section className="relative min-h-screen lg:min-h-[80vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            {displayImage && (
              <img
                src={displayImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          </div>

          {/* Responsive: Adjusted padding for different screen sizes */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12">
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>

            {/* Responsive: Grid gap adjusted for mobile */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div
                className="space-y-6 lg:space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4 md:space-y-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      post.type === "video"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                    }`}
                  >
                    {post.category}
                  </span>

                  {/* Responsive: Font size adjusted for mobile, sm, and lg screens */}
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {post.title}
                  </h1>

                  {/* Responsive: flex-wrap ensures this row stacks nicely on small screens with adjusted gaps and text size */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-400 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {post.type === "video" && post.views && (
                      <div className="flex items-center gap-2">
                        <Eye size={18} />
                        <span>{post.views} views</span>
                      </div>
                    )}
                    {post.type === "video" && post.channelTitle && (
                      <div className="flex items-center gap-2">
                        <Clapperboard size={18} />
                        <span>{post.channelTitle}</span>
                      </div>
                    )}
                    {post.type === "project" && post.client && (
                      <div className="flex items-center gap-2">
                        <User size={18} />
                        <span>{post.client}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Responsive: flex-col stacks buttons on mobile, sm:flex-row places them side-by-side on larger screens */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {post.type === "video" && videoId ? (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <Play size={20} />
                      <span>Watch Video</span>
                    </button>
                  ) : (
                    <a
                      href="#details"
                      className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <Eye size={20} />
                      <span>View Details</span>
                    </a>
                  )}
                  <button
                    onClick={handleShare}
                    className="group border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
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
                {/* Responsive: On small screens, this stacks below the text. aspect-video maintains ratio. */}
                <div className="relative bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700 aspect-video shadow-2xl shadow-black/50">
                  {post.type === "video" && showVideo && videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl sm:rounded-3xl"
                    ></iframe>
                  ) : (
                    <>
                      {displayImage && (
                        <img
                          src={displayImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20"></div>
                      {post.type === "video" && !showVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Responsive: Play button size adjusted for mobile */}
                          <button
                            onClick={() => setShowVideo(true)}
                            className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300"
                          >
                            <Play
                              size={32}
                              className="text-white ml-1 sm:ml-2"
                              fill="white"
                            />
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

        {/* Details Section - RESPONSIVE UPDATE */}
        <section
          id="details"
          className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                {/* Responsive: Font size adjusted */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
                  About This {post.type}
                </h2>
                {/* Responsive: Font size adjusted for readability */}
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto whitespace-pre-wrap">
                  {post.description}
                </p>
              </div>

              {post.keywords && post.keywords.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white text-center">
                    Keywords
                  </h3>
                  {/* Responsive: flex-wrap and gap handle mobile layouts perfectly */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {post.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 flex items-center gap-2"
                      >
                        <Tag size={14} />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostView;
