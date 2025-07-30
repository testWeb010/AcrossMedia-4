import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Play,
  FolderOpen,
  Video,
  MoreVertical,
  Share2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { apiRequestJson } from "@/utils/api";
import { formatTimeAgo } from "@/lib/utils";
import {
  fetchYouTubeVideoData,
  extractVideoId,
  formatViews,
} from "@/utils/youtube";

// Interfaces
interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  status: string;
  createdAt: string;
  type: "project";
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
  type: "video";
  duration?: string;
  views?: string;
  publishedAt?: string;
  channelTitle?: string;
}

type GalleryItem = Project | VideoItem;

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // UI state
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const [projectsResponse, videosResponse] = await Promise.all([
          apiRequestJson<{ projects: Project[] }>(
            "/api/projects?status=published"
          ),
          apiRequestJson<{ videos: VideoItem[] }>("/api/videos?status=active"),
        ]);
        const projects: GalleryItem[] = (projectsResponse.projects || []).map(
          (p) => ({ ...p, type: "project" as const })
        );
        const enhancedVideos: GalleryItem[] = await Promise.all(
          (videosResponse.videos || []).map(async (video) => {
            try {
              const youtubeData = await fetchYouTubeVideoData(video.url);
              return {
                ...video,
                type: "video" as const,
                title: youtubeData?.title || video.title,
                description: youtubeData?.description || video.description,
                thumbnailUrl: youtubeData?.thumbnail || video.thumbnailUrl,
                duration: youtubeData?.duration || "0:00",
                views: youtubeData?.views || "0",
                publishedAt: youtubeData?.publishedAt || video.createdAt,
                channelTitle: youtubeData?.channelTitle || "AcrossMedia",
              };
            } catch (error) {
              console.error(
                "Error fetching YouTube data for video:",
                video._id,
                error
              );
              return {
                ...video,
                type: "video" as const,
                views: "0",
                channelTitle: "AcrossMedia",
              };
            }
          })
        );
        const allItems = [...projects, ...enhancedVideos].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setItems(allItems);
      } catch (err) {
        console.error("Failed to fetch gallery items:", err);
        setError("Failed to load gallery items");
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedCategory]);

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    if (items.length === 0) return [];
    const allCategories = items.map((item) => item.category);
    return ["All", ...Array.from(new Set(allCategories)).sort()];
  }, [items]);

  // Memoize the filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchMatch =
        searchTerm.toLowerCase() === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = selectedType === "all" || item.type === selectedType;
      const categoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;
      return searchMatch && typeMatch && categoryMatch;
    });
  }, [items, searchTerm, selectedType, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    const handleClickOutside = () => openShareMenu && setOpenShareMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openShareMenu]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 animate-pulse"
        >
          <div className="aspect-video bg-slate-700"></div>
          <div className="p-4">
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const getVideoId = (url: string): string => extractVideoId(url) || "";

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[500px] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-slate-300 text-xs font-medium tracking-wider uppercase">
              Gallery
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore our diverse collection of projects and videos showcasing
            innovative media solutions and creative excellence.
          </p>
        </div>

        {/* --- FILTER AND SEARCH BAR --- */}
        {items.length > ITEMS_PER_PAGE && (
          <div className="my-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-2 bg-slate-900/70 border border-slate-700/50 rounded-xl p-2">
              <div className="relative flex-grow w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 bg-slate-800 rounded-lg pl-11 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all"
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-4 px-2">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`text-sm font-medium transition-colors ${
                    selectedType === "all"
                      ? "bg-cyan-500 text-white px-4 py-1.5 rounded-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType("project")}
                  className={`text-sm font-medium transition-colors ${
                    selectedType === "project"
                      ? "bg-cyan-500 text-white px-4 py-1.5 rounded-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setSelectedType("video")}
                  className={`text-sm font-medium transition-colors ${
                    selectedType === "video"
                      ? "bg-cyan-500 text-white px-4 py-1.5 rounded-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Videos
                </button>
              </div>
              <div className="relative flex-shrink-0 w-full md:w-40">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-11 appearance-none bg-slate-800 rounded-lg py-2.5 pl-4 pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-slate-800 text-white"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronLeft
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-[-90deg]"
                  size={16}
                />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSkeleton />
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="mx-auto h-16 w-16 text-slate-500" />
            <h3 className="mt-2 text-2xl font-semibold text-white">
              No items yet
            </h3>
            <p className="mt-1 text-lg text-slate-400">
              Check back later for new projects and videos.
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <Search className="mx-auto h-16 w-16 text-slate-500" />
            <h3 className="mt-2 text-2xl font-semibold text-white">
              No Results Found
            </h3>
            <p className="mt-1 text-lg text-slate-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedItems.map((item) => (
                <div key={item._id} className="group relative">
                  <div className="flex flex-col h-full bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-pink-500/80 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1">
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() =>
                        navigate(`/post/${item._id}?type=${item.type}`)
                      }
                    >
                      {item.type === "project" ? (
                        item.image ? (
                          <div className="aspect-video relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-purple-600/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                                <FolderOpen className="w-3.5 h-3.5" />
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-video bg-slate-700 flex items-center justify-center">
                            <FolderOpen className="w-12 h-12 text-slate-500" />
                          </div>
                        )
                      ) : (
                        <div className="aspect-video relative">
                          <img
                            src={
                              item.thumbnailUrl ||
                              `https://i.ytimg.com/vi/${getVideoId(
                                item.url
                              )}/hqdefault.jpg`
                            }
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop";
                            }}
                          />
                          {item.duration && (
                            <div className="absolute bottom-2 right-2">
                              <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                                {item.duration}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="bg-pink-600/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5" />
                              {item.category}
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
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-start gap-3 flex-grow">
                        <div className="flex-1 min-w-0 flex flex-col h-full">
                          {/* --- MODIFICATION: Title hover color changed to pink --- */}
                          <h3
                            className="font-semibold text-slate-100 mb-1 line-clamp-2 group-hover:text-pink-500 transition-colors cursor-pointer"
                            title={item.title}
                            onClick={() =>
                              navigate(`/post/${item._id}?type=${item.type}`)
                            }
                          >
                            {item.title}
                          </h3>
                          {item.type === "video" && (
                            <p className="text-sm text-slate-400 mb-2 truncate">
                              {item.channelTitle || "AcrossMedia"}
                            </p>
                          )}
                          <p className="text-sm text-slate-500 line-clamp-2 flex-grow">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-x-3 text-xs text-slate-400 whitespace-nowrap mt-3">
                            {item.type === "video" ? (
                              <>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3.5 h-3.5" />
                                  {formatViews(item.views)} views
                                </span>
                                <span className="text-slate-600">•</span>
                                <span>
                                  {formatTimeAgo(
                                    item.publishedAt || item.createdAt
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="capitalize">
                                  {item.status}
                                </span>
                                <span className="text-slate-600">•</span>
                                <span>
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="relative flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenShareMenu(
                                openShareMenu === item._id ? null : item._id
                              );
                            }}
                            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700/50 z-10 transition-colors"
                            aria-label="More options"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {openShareMenu === item._id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-full right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 animate-in fade-in-0 zoom-in-95"
                            >
                              <button
                                onClick={() => {
                                  const shareUrl =
                                    item.type === "video"
                                      ? item.url
                                      : `${window.location.origin}/post/${item._id}?type=${item.type}`;
                                  navigator.clipboard.writeText(shareUrl);
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                    setOpenShareMenu(null);
                                  }, 2000);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 rounded-lg transition-colors"
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

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-slate-400 text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
