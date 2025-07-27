// src/components/About.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// KeyRound has been added to the import list
import { PenTool, Speaker, Globe, BarChart2, KeyRound } from 'lucide-react';

// A reusable component for animated section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 
    className="text-4xl md:text-5xl font-bold text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.h2>
);

const About = () => {
  const animatedWords = [
    { word: "Vision", className: "from-cyan-400 to-sky-500" },
    { word: "Strategy", className: "from-fuchsia-500 to-pink-500" },
    { word: "Impact", className: "from-lime-400 to-teal-500" },
  ];

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  const services = [
    { icon: PenTool, title: "Branded Content", description: "Crafting compelling narratives that resonate with your audience and embody your brand's essence." },
    { icon: Speaker, title: "Celebrity Engagement", description: "Connecting your brand with influential personalities for authentic and impactful endorsements." },
    { icon: Globe, title: "Intellectual Properties", description: "Developing and managing unique, ownable media properties that provide long-term value." },
    { icon: BarChart2, title: "Digital Marketing", description: "Executing data-driven digital strategies across all platforms to maximize reach and ROI." },
  ];

  const approachSteps = [
    { number: "01", title: "Discover & Analyze", description: "We dive deep into your brand, audience, and objectives to build a foundational understanding." },
    { number: "02", title: "Strategize & Plan", description: "A bespoke, data-informed strategy is crafted, outlining a clear roadmap for success." },
    { number: "03", title: "Create & Execute", description: "Our creative team brings the vision to life with exceptional production and meticulous execution." },
    { number: "04", title: "Amplify & Measure", description: "We deploy the campaign, analyze performance in real-time, and optimize for maximum impact." },
  ];

  return (
    <div className="bg-black text-white">
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center justify-center min-h-screen text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 p-6">
          
          {/* === THIS IS THE UPDATED HEADING TAG === */}
          <motion.div
            className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <KeyRound className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">
              About Us
            </span>
          </motion.div>
          {/* === END OF UPDATE === */}

          <h1 className="text-5xl md:text-8xl font-black leading-tight text-gray-300">
            <span className="block">Turning Your Brand's</span>
            <div className="relative inline-block h-[1.2em] w-[8em] align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className={`absolute inset-0 bg-gradient-to-r ${animatedWords[wordIndex].className} bg-clip-text text-transparent`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {animatedWords[wordIndex].word}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="block">into an Experience.</span>
          </h1>
          <motion.p 
            className="max-w-2xl mx-auto mt-8 text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At Across Media, we don't just create content; we build universes around your brand. We merge creative storytelling with strategic precision to deliver campaigns that captivate, convert, and conquer.
          </motion.p>
        </div>
      </section>
      
      {/* 3. OUR APPROACH SECTION */}
      <section className="py-24 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionTitle>
            <span className="text-gray-100">Our Blueprint for</span> <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Success</span>
          </SectionTitle>
          <div className="mt-20 relative">
            <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-gray-800 -translate-x-1/2" aria-hidden="true"></div>
            <div className="space-y-16">
              {approachSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:order-2'}`}>
                    <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-xl">
                       <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                       <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <div className={`w-full md:w-1/2 flex items-center ${index % 2 === 0 ? 'md:order-2' : 'md:pr-12'}`}>
                    <div className="z-10 w-12 h-12 rounded-full bg-black border-2 border-fuchsia-500 flex items-center justify-center font-bold text-fuchsia-400 flex-shrink-0">
                      {step.number}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;