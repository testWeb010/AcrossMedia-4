import React from 'react';
import { motion } from 'framer-motion';

const BrandsShowcase = () => {
  const presentingSponsor = {
    name: 'VIRGIO',
    category: 'Presenting Sponsor'
  };

  const mainPartners = [
    { name: 'TVS RAIDER', category: 'DRIVEN BY', subtitle: 'THE WICKED RIDE' },
    { name: 'NESTERRA', category: 'POWERED BY PARTNER', subtitle: 'HOME DESIGN EXCELLENCE' },
    { name: 'AMANTE', category: 'POWERED BY PARTNER', subtitle: 'FEELS LIKE AIR' }
  ];

  const categoryPartners = [
    { name: 'CARATLANE', category: 'Stylish Jewellery Partner', logo: 'C' },
    { name: 'TOOTHSI', category: 'Smile Partner', logo: 'T' },
    { name: 'BIBA', category: 'Style Partner', logo: 'B' },
    { name: 'HELIOS', category: 'Stylish Watches Partner', logo: 'H' },
    { name: 'PRESTIGE', category: 'Stylish Kitchen Partner', logo: 'P' },
    { name: 'MARS', category: 'Beauty Partner', logo: 'M' },
    { name: 'DERMA', category: 'Skincare Partner', logo: 'D' },
    { name: 'HAPPILO', category: 'Healthy Snacking Partner', logo: 'H' },
    { name: 'RED CHIEF', category: 'Stylish Footwear Partner', logo: 'R' },
    { name: 'RADIO CITY', category: 'Radio Partner', logo: 'R' },
    { name: 'LOOKS SALON', category: 'Glam Partner', logo: 'L' },
    { name: 'FNP', category: 'Celebration Partner', logo: 'F' },
    { name: 'SPRITE', category: 'Official Partner', logo: 'S' },
    { name: 'JIOTV', category: 'Streaming Partner', logo: 'J' }
  ];

  const promotionalPartners = [
    'HUNGAMA', 'AMAZON FIRE TV', 'MI LED TV', 'ONEPLUS', 'TCL', 
    'AIRTEL', 'WATCHOO', 'NET TV', 'VI', 'MX PLAYER', 
    'TATA PLAY BINGE', 'CLOUDWALKER', 'JIO STREAM', 'ACT'
  ];

  const associationPartners = [
    'DISH SMRT', 'YUPPTV', 'X STREAM', 'ZEE5', 'SONY LIV', 'HOTSTAR'
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="text-primary/60 text-sm tracking-[0.3em] font-light">
              / PARTNERS /
            </span>
          </div>
        </motion.div>

        {/* Presenting Sponsor */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span className="text-primary text-xs tracking-wider">{presentingSponsor.category}</span>
          </div>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-wide">
            {presentingSponsor.name}
          </h1>
        </motion.div>

        {/* Main Partners */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {mainPartners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <span className="text-primary/80 text-xs tracking-wider uppercase">
                  {partner.category}
                </span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-sm tracking-wider">
                  {partner.subtitle}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Partners Grid */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categoryPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="group text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-2">
                  <span className="text-primary/60 text-[10px] tracking-wider uppercase">
                    {partner.category}
                  </span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-20 flex items-center justify-center hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{partner.logo}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-white text-xs font-medium">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-2xl"></div>
        </div>

        {/* Promotional Partners */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <span className="text-white text-lg font-light tracking-wider">Promotional Partners</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {promotionalPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-white/80 text-sm font-medium tracking-wide">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-2xl"></div>
        </div>

        {/* In Association With */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="mb-8">
            <span className="text-primary/60 text-sm tracking-[0.3em] font-light">
              / IN ASSOCIATION WITH /
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {associationPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="bg-white/3 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 hover:border-primary/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-white/60 text-xs font-medium tracking-wide">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
