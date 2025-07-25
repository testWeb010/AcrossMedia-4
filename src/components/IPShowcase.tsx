import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight, Image, Lightbulb, Sparkles, FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiRequestJson } from '../utils/api';

interface IP {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

const IPShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ips, setIps] = useState<IP[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch IP projects from API with category filter
  useEffect(() => {
    const fetchIPProjects = async () => {
      try {
        setLoading(true);
        // First try with category filter in API
        const response = await apiRequestJson<{projects: IP[]}>('/api/projects?category=Intellectual Properties');        
        let ipProjects = response.projects || [];
        
        // If no projects returned or no category filtering in API, filter manually
        if (ipProjects.length === 0) {
          const allResponse = await apiRequestJson<{projects: IP[]}>('/api/projects');
          ipProjects = allResponse.projects?.filter(project => 
            project.category?.toLowerCase() === 'intellectual properties'
          ) || [];
        }
        setIps(ipProjects);
      } catch (error) {
        console.error('Error fetching IP projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIPProjects();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ips.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ips.length) % ips.length);
  };

  const handleIPClick = (ip: IP) => {
    navigate(`/ip/${ip._id}`, { state: { ip } });
  };

  // Auto-advance slides with smooth right-to-left movement
  useEffect(() => {
    if (ips.length > 1) {
      const timer = setInterval(nextSlide, 4000);
      return () => clearInterval(timer);
    }
  }, [ips.length]);

  // Enhanced Empty State Component
  const EmptyState = () => (
    <div className="text-center py-32">
      <div className="relative">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-xl"></div>
        </motion.div>

        {/* Main Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-flex">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Lightbulb size={40} className="text-primary" />
            </motion.div>
            
            {/* Floating sparkles */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={20} className="text-yellow-400" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-1 -left-3"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FileText size={16} className="text-gray-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              No IP Projects Yet
            </span>
          </h3>
          
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed mb-8">
            Our intellectual property showcase is coming soon. 
            Stay tuned for exciting new content and innovative projects.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: Lightbulb, title: "Innovative Content", desc: "Groundbreaking series and formats" },
            { icon: Sparkles, title: "Creative Excellence", desc: "Award-worthy productions" },
            { icon: FileText, title: "Rich Storytelling", desc: "Compelling narratives" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl"
              whileHover={{ 
                scale: 1.05,
                borderColor: '#primary'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <item.icon size={24} className="text-primary" />
              </div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Add your navigation logic here
              console.log('Navigate to create IP or contact page');
            }}
          >
            <Plus size={20} />
            Stay Updated
            <ArrowUpRight size={20} />
          </motion.button>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary/50 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded-full w-64 mx-auto mb-8"></div>
            <div className="h-16 bg-gray-700 rounded-lg w-96 mx-auto mb-12"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase">Our Latest Content</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured IP's
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our latest intellectual properties - from groundbreaking series to innovative formats 
            that captivate audiences worldwide.
          </p>
        </div>

        {/* Conditional Content */}
        {ips.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Main Slideshow */}
            <div className="relative mb-16">
              <div className="overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer group"
                    onClick={() => handleIPClick(ips[currentSlide])}
                  >
                    <img
                      src={ips[currentSlide].image}
                      alt={ips[currentSlide].title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                          {ips[currentSlide].category}
                        </span>
                      </div>
                      
                      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                        {ips[currentSlide].title}
                      </h3>
                      
                      <div className="flex items-center gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} />
                          <span>{new Date(ips[currentSlide].createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Image Indicator */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                        <Image size={24} className="text-white" />
                      </div>
                    </div>

                    {/* View Image Button */}
                    <div className="absolute top-8 right-8">
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <span className="text-sm font-medium">View Image</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/30 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/30 transition-all"
              >
                <ChevronRight size={24} />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                {ips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-primary scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Horizontal Moving Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex gap-6"
                  animate={{ 
                    x: ips.length > 0 ? -((currentSlide * 320) % (ips.length * 320)) : 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeInOut" 
                  }}
                  style={{ width: `${ips.length * 320}px` }}
                >
                  {/* Create infinite loop effect by duplicating items */}
                  {[...ips, ...ips, ...ips].map((ip, index) => (
                    <motion.div
                      key={`${ip._id}-${index}`}
                      className={`relative aspect-video w-80 rounded-xl overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${
                        (index % ips.length) === currentSlide 
                          ? 'border-primary shadow-lg shadow-primary/25' 
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => {
                        setCurrentSlide(index % ips.length);
                        handleIPClick(ip);
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={ip.image}
                        alt={ip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white text-sm font-semibold truncate mb-1">
                          {ip.title}
                        </h4>
                        <p className="text-gray-300 text-xs truncate">
                          {ip.category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Scroll indicators */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                <span>Scroll →</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default IPShowcase;