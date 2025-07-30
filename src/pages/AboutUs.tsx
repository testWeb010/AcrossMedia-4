// src/pages/AboutUs.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Blueprint from '../components/Blueprint';
import Team from './Team';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const animatedWords = [
    { word: 'Influence', className: 'from-fuchsia-500 to-pink-500' },
    { word: 'Impact', className: 'from-cyan-400 to-blue-500' },
    { word: 'Innovation', className: 'from-yellow-400 to-orange-500' }
  ];

  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero/About Section with Full-Width Gradients */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        
        {/* Full-width container for Gradient Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-1/4 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-1/4 right-0 w-[50rem] h-[50rem] bg-fuchsia-600/15 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Centered container for the content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl md:text-8xl font-black leading-tight text-gray-300 mb-8"
              variants={itemVariants}
            >
              <span className="block">Turning Your Brand's</span>
              <div className="relative inline-block h-[1.2em] w-[8em] align-middle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className={`absolute inset-0 bg-gradient-to-r ${animatedWords[wordIndex].className} bg-clip-text text-transparent`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {animatedWords[wordIndex].word}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="block">into an Experience.</span>
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-lg text-gray-400"
              variants={itemVariants}
            >
              At Across Media, we don't just create content; we build universes around your brand. We merge creative storytelling with strategic precision to deliver campaigns that captivate, convert, and conquer.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Include the Blueprint and Team components */}
      <Blueprint />
      <Team/>
    </div>
  );
};

export default AboutUs;