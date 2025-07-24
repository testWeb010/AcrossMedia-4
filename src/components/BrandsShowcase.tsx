import React from 'react';
import { motion } from 'framer-motion';

const BrandsShowcase = () => {
  const brands = [
    { name: 'VIRGIO', category: 'Presenting Sponsor', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'TVS Raider', category: 'Driven By', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Nesterra', category: 'Powered By Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Amante', category: 'Powered By Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Caratlane', category: 'Stylish Jewellery Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Toothsi', category: 'Smile Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'BIBA', category: 'Style Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Helios', category: 'Stylish Watches Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Prestige', category: 'Stylish Kitchen Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Mars', category: 'Beauty Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Derma', category: 'Skincare Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Happilo', category: 'Healthy Snacking Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Red Chief', category: 'Stylish Footwear Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Virgio', category: 'Stylish Laminates Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Radio City', category: 'Radio Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Looks Salon', category: 'Glam Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'FNP', category: 'Celebration Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'Sprite', category: 'Official Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
    { name: 'JioTV', category: 'Streaming Partner', logo: '/lovable-uploads/2ce7f718-29ca-4d5b-852d-d95abd87d4a4.png' },
  ];

  const additionalBrands = [
    'Hungama', 'Amazon Fire TV Stick', 'Mi LED TV', 'OnePlus', 'TCL', 'Airtel', 
    'Watchoo', 'Net TV', 'VI', 'MX Player', 'Tata Play Binge', 'CloudWalker', 
    'Jio Stream', 'ACT', 'Dish SMRT', 'YuppTV', 'X Stream', 'Dish SMRT', 'ZEE5'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
            <span className="text-primary text-sm font-medium tracking-wider uppercase">Trusted By Industry Leaders</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              50+ Brands Trust Us
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Partnering with leading brands across industries to create exceptional experiences and drive meaningful results.
          </p>
        </div>

        {/* Main Partners Grid */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/30 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="aspect-square flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{brand.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-white text-sm font-semibold text-center mb-1">{brand.name}</h3>
                <p className="text-gray-400 text-xs text-center">{brand.category}</p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Partners Section */}
        <div className="border-t border-gray-800 pt-16">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            And Many More Industry Leaders
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {additionalBrands.map((brand, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-full px-4 py-2 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-gray-300 text-sm font-medium">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-purple-500/20 backdrop-blur-sm border border-primary/30 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Ready to join our success stories?</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;