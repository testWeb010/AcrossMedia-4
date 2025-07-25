import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Video, Users, Handshake, ArrowUpRight, Target, Key } from 'lucide-react';

// --- Service Data ---
const services = [
  {
    icon: Video,
    title: "Branded Content Creation",
    description: "Crafting compelling narratives that resonate with your audience and drive meaningful engagement across all digital platforms.",
    features: ["Video Production", "Social Media Content", "Campaign Strategy", "Creative Direction"],
    gradient: "from-cyan-400 to-pink-500"
  },
  {
    icon: Users,
    title: "Celebrity Engagement",
    description: "Strategic partnerships with celebrities and influencers to amplify your brand message and reach new audiences authentically.",
    features: ["Celebrity Partnerships", "Influencer Marketing", "Event Appearances", "Brand Ambassadorships"],
    gradient: "from-pink-500 to-purple-500"
  },
  {
    icon: Handshake,
    title: "Sponsorships & IP",
    description: "Curated sponsorship opportunities and unique IP development that align with your brand values, creating lasting value and memorable experiences.",
    features: ["Event Sponsorships", "IP Development", "Content Licensing", "Sports Marketing"],
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    icon: Target,
    title: "Digital Marketing",
    description: "Comprehensive digital strategies that amplify brand presence across all channels and drive measurable results.",
    features: ["Social Media Strategy", "Performance Marketing", "Brand Positioning", "Analytics & Insights"],
    gradient: "from-indigo-500 to-cyan-400"
  }
];

// --- Animation Variants for Scroll & Stagger ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: 'spring', stiffness: 100 }
  }
};


// --- Main Services Component ---
const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Enhanced background glow for more depth */}
      <div className="absolute inset-0 -z-10 bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-6">
            <Key className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Our Specializations</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            What We Do
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We deliver comprehensive media solutions that transform brands through innovative content 
            and strategic partnerships, creating lasting impact.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              // The card itself is a motion component for the hover animation
              className="group relative"
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Sharper gradient border appears on hover */}
              <div className={`absolute -inset-px bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}/>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 h-full overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  {/* Icon with hover animation */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]`}>
                    <service.icon size={32} className="text-white" />
                  </div>
                  {/* Arrow with hover animation */}
                  <ArrowUpRight className="w-6 h-6 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full transition-colors duration-300 group-hover:bg-cyan-400"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;