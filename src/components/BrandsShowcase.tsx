import React from 'react';
import { motion } from 'framer-motion';

const BrandsShowcase = () => {
  const mainBrands = [
    'VIRGIO', 'TVS RAIDER', 'NESTERRA', 'AMANTE', 'CARATLANE',
    'TOOTHSI', 'BIBA', 'HELIOS', 'PRESTIGE', 'MARS',
    'DERMA', 'HAPPILO', 'RED CHIEF', 'RADIO CITY', 'LOOKS SALON'
  ];

  const additionalBrands = [
    'HUNGAMA', 'AMAZON FIRE TV', 'MI LED TV', 'ONEPLUS', 'TCL', 
    'AIRTEL', 'WATCHOO', 'NET TV', 'VI', 'MX PLAYER', 
    'TATA PLAY BINGE', 'CLOUDWALKER', 'JIO STREAM', 'ACT',
    'DISH SMRT', 'YUPPTV', 'X STREAM', 'ZEE5', 'SONY LIV'
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase">Partners</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              50+ Brands Trust Us
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Partnering with leading brands across industries to create exceptional experiences and drive meaningful results.
          </p>
        </div>

        {/* Main Brands Grid */}
        <div className="mb-16">
          <motion.div 
            className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8 items-center justify-items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {mainBrands.map((brand, index) => (
              <motion.div
                key={index}
                className="group flex items-center justify-center w-24 h-16 bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-white/80 text-xs font-bold text-center leading-tight group-hover:text-white transition-colors">
                  {brand}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent w-full max-w-md"></div>
          <span className="mx-4 text-gray-500 text-sm">And Many More</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent w-full max-w-md"></div>
        </div>

        {/* Additional Partners */}
        <motion.div 
          className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 items-center justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {additionalBrands.map((brand, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center w-20 h-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/20 rounded-md hover:border-primary/20 hover:bg-gray-800/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-gray-400 text-[10px] font-medium text-center leading-tight hover:text-gray-300 transition-colors">
                {brand}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <div className="text-center mt-16">
          <motion.div
            className="inline-flex items-center gap-6 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl px-8 py-6"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
