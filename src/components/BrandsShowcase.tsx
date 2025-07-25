import React from 'react';
import { motion } from 'framer-motion';

// Using white/transparent logos is crucial. You can find them on sites like 'worldvectorlogo.com' or 'svgl.app'.
const brandLogos: string[] = [
  'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
  'https://cdn.worldvectorlogo.com/logos/google-g-2015.svg',
  'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
  'https://cdn.worldvectorlogo.com/logos/spotify-1.svg',
  'https://cdn.worldvectorlogo.com/logos/amazon-2.svg',
  'https://cdn.worldvectorlogo.com/logos/airbnb.svg',
  'https://cdn.worldvectorlogo.com/logos/uber-2.svg',
  'https://cdn.worldvectorlogo.com/logos/lyft-3.svg',
];

const BrandShowcase: React.FC = () => {
  // We duplicate the logos array to create a seamless loop
  const extendedLogos = [...brandLogos, ...brandLogos];

  // Animation variants for the marquee
  const marqueeVariants = {
    animate: {
      x: [0, -1080], 
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop' as const, // It's best practice to keep 'loop' for seamless animation
          duration: 25,
          ease: 'linear' as const,
        },
      },
    },
  };

  const marqueeVariantsReverse = {
    animate: {
      x: [-1080, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop' as const,
          duration: 25,
          ease: 'linear' as const,
        },
      },
    },
  };

  return (
    // --- THIS IS THE MODIFIED LINE ---
    <section className="w-full flex flex-col items-center overflow-hidden bg-black py-16 md:py-20">
      <div className="text-center mb-16 px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
          Trusted by the World's Best
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          We partner with leading brands and startups to create exceptional digital experiences.
        </p>
      </div>

      {/* --- Marquee Container --- */}
      <div className="w-full py-6">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {extendedLogos.map((url, index) => (
            <div key={`logo-a-${index}`} className="flex-shrink-0 flex items-center justify-center px-6 md:px-10">
              <img
                src={url}
                alt={`Brand logo ${index + 1}`}
                className="h-9 md:h-12 w-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* --- Reverse Marquee Container --- */}
      <div className="w-full py-6">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariantsReverse}
          animate="animate"
        >
          {extendedLogos.map((url, index) => (
            <div key={`logo-b-${index}`} className="flex-shrink-0 flex items-center justify-center px-6 md:px-10">
              <img
                src={url}
                alt={`Brand logo ${index + 1}`}
                className="h-9 md:h-12 w-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* 
        The 100vh spacer div has been removed to make the section compact.
      */}
    </section>
  );
};

export default BrandShowcase;