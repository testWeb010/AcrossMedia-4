import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  Variants,
  useAnimation,
  useInView,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import influencerCollage from "../assets/images/influencer-collage.png";

const InfluencerShowcase = () => {
  // --- Refs for measuring DOM elements ---
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // --- State for dynamic animation values ---
  const [yRange, setYRange] = useState([0, 0]);

  // --- Hooks for controlling the animation ---
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const animationControls = useAnimation();

  // --- Effect to calculate the correct scroll distance ---
  useEffect(() => {
    const calculateYRange = () => {
      if (containerRef.current && imageRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const imageHeight = imageRef.current.offsetHeight;
        if (imageHeight > containerHeight) {
          const maxScrollDistance = imageHeight - containerHeight;
          setYRange([0, -maxScrollDistance]);
        } else {
          setYRange([0, 0]);
        }
      }
    };
    
    calculateYRange();
    window.addEventListener("resize", calculateYRange);
    return () => window.removeEventListener("resize", calculateYRange);
  }, []);

  // --- Effect to start/stop the animation based on visibility ---
  useEffect(() => {
    if (isInView && yRange[1] < 0) {
      animationControls.start({
        y: yRange,
        transition: {
          y: {
            duration: 40,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        },
      });
    } else {
      animationControls.stop();
    }
  }, [isInView, yRange, animationControls]);


  // Variants for the text content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-black to-black opacity-80"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Column: Text Content (RESTORED) --- */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="text-indigo-400 font-semibold tracking-wider uppercase"
              variants={itemVariants}
            >
              Our Network
            </motion.h2>
            <motion.h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Connecting Brands with India's Top Influencers
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              We bridge the gap between your brand and the nation's most
              followed celebrities, creators, and thought leaders to create
              authentic and impactful campaigns.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                Start a Campaign
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Animated Image Collage (FIXED) --- */}
          <div
            ref={containerRef}
            className="relative h-[65vh] max-h-[650px] w-full max-w-sm mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]">
              <motion.div
                className="w-full h-auto"
                animate={animationControls}
              >
                <img
                  ref={imageRef}
                  src={influencerCollage}
                  alt="Collage of top influencers and celebrities we work with"
                  className="w-full h-auto"
                  loading="eager"
                  onLoad={() => {
                    if (containerRef.current && imageRef.current) {
                      const containerHeight = containerRef.current.offsetHeight;
                      const imageHeight = imageRef.current.offsetHeight;
                      if (imageHeight > containerHeight) {
                        const maxScrollDistance = imageHeight - containerHeight;
                        setYRange([0, -maxScrollDistance]);
                      }
                    }
                  }}
                />
              </motion.div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerShowcase;