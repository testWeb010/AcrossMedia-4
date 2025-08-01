import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import YouTube from 'react-youtube';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// --- A simple hook to detect screen size for conditional animations ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

// --- Framer Motion Animation Variants (work on all devices) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const targetRef = useRef<HTMLElement>(null);
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { scrollYProgress } = useScroll({
    target: isDesktop ? targetRef : undefined,
    offset: ['start start', 'end start'],
  });

  // These hooks are always called at the top level
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yVideo = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacityVideo = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // FIX: Move the other useTransform calls here to be unconditional.
  const yBlob1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const videoId = '0P8ftvWlCUQ';
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 1, controls: 1, modestbranding: 1, rel: 0 },
  };

  return (
    <section ref={targetRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background elements */}
        <div className="absolute inset-0 z-0">
<iframe
            src="https://www.pexels.com/video/a-dark-abstract-background-3172308/embed/"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="absolute inset-0 object-cover w-full h-full opacity-30 mix-blend-overlay"
          ></iframe>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50"></div>

          {/* FIX: Use the results of the hooks conditionally, not the hooks themselves */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl"
            style={isDesktop ? { y: yBlob1 } : {}}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl"
            style={isDesktop ? { y: yBlob2 } : {}}
          ></motion.div>
        </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-center min-h-screen pt-28 pb-20 lg:pt-0 lg:pb-0">
          
          {/* Left Side: Text Content (Responsive) */}
          <motion.div
            style={isDesktop ? { y: yText } : {}}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 md:space-y-10 z-10 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Creative Excellence</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif">
              <span className="text-white">
                We are
              </span>
              <br />
              <span className="text-cyan-400">
                Across Media
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              We specialise in <span className="text-cyan-200 font-semibold">Branded Content</span>, 
              <span className="text-cyan-200 font-semibold"> Celebrity Engagement</span>, 
              <span className="text-cyan-200 font-semibold"> Sponsorships</span>, and 
              <span className="text-cyan-200 font-semibold"> IPs</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-pink-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Play size={20} className="mr-2" />
                <span>Watch More</span>
              </button>
              
              <button className="group relative inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-gray-300 bg-transparent border-2 border-gray-700 rounded-2xl transition-all duration-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10">
                <span>Get Started</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Video Player (Responsive) */}
          <motion.div
            style={isDesktop ? { y: yVideo, opacity: opacityVideo, scale: scaleVideo } : {}}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-lg mx-auto"
          >
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl overflow-hidden border border-gray-700 aspect-video p-2 backdrop-blur-sm">
              {isPlaying ? (
                <YouTube videoId={videoId} opts={opts} className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden" />
              ) : (
                <div onClick={() => setIsPlaying(true)} className="cursor-pointer group">
                  <img src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} alt="Hero Video Thumbnail" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full animate-ping absolute bg-white/20 opacity-75"></div>
                      <Play fill="white" className="text-white h-8 w-8 sm:h-9 sm:w-9" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;