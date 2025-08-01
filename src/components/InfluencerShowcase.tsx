import React, { useEffect, useRef, useState } from "react"; // <-- Import useState
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
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the masking container
  const imageRef = useRef<HTMLImageElement>(null);   // Ref for the image itself

  // --- State for dynamic animation values ---
  const [yRange, setYRange] = useState([0, 0]); // Will store [start, end] pixel values for the animation

  // --- Hooks for controlling the animation ---
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const animationControls = useAnimation();

  // --- Effect to calculate the correct scroll distance ---
  useEffect(() => {
    const calculateYRange = () => {
      if (containerRef.current && imageRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const imageHeight = imageRef.current.offsetHeight;

        // If the image is smaller than the container, no scroll is needed.
        if (imageHeight <= containerHeight) {
          setYRange([0, 0]);
          return;
        }

        // The maximum distance to scroll up without showing empty space
        const maxScrollDistance = imageHeight - containerHeight;
        setYRange([0, -maxScrollDistance]);
      }
    };
    
    // Calculate on initial load and on window resize
    calculateYRange();
    window.addEventListener("resize", calculateYRange);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", calculateYRange);
  }, []); // Run only once on mount

  // --- Effect to start/stop the animation based on visibility ---
  useEffect(() => {
    // Only animate if there is a scroll range to animate
    if (isInView && yRange[1] < 0) {
      animationControls.start({
        y: yRange, // Use the dynamically calculated pixel range
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


  // Variants for the text content (no changes)
  const containerVariants: Variants = {
    // ... (no changes here)
  };
  const itemVariants: Variants = {
    // ... (no changes here)
  };

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 overflow-hidden">
      {/* ... (no changes to background or main layout) ... */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- Left Column: Text Content (No changes) --- */}
          <motion.div
            /* ... (no changes here) ... */
          >
            {/* ... (no changes here) ... */}
          </motion.div>

          {/* --- Right Column: Animated Image Collage (FIXED) --- */}
          <div
            ref={containerRef} // Attach the container ref here
            className="relative h-[65vh] max-h-[650px] w-full max-w-sm mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]">
              <motion.div
                className="w-full h-auto"
                animate={animationControls}
              >
                <img
                  ref={imageRef} // Attach the image ref here
                  src={influencerCollage}
                  alt="Collage of top influencers and celebrities we work with"
                  className="w-full h-auto"
                  loading="eager" // Load this image eagerly since it's above the fold
                  // Re-calculate when the image has finished loading to get its correct height
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