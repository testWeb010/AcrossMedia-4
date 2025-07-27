// src/components/layout/Footer.jsx

import React from 'react';
// Import the 'Variants' type from framer-motion
import { motion, Variants } from 'framer-motion'; 
import { Facebook, Instagram, Linkedin, Youtube, ArrowUp, Mail, Phone, MapPin, ExternalLink, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

import logo from '@/assets/images/ams-Photoroom.png';

// --- Data for Footer Links ---
const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/across-media-solutions-ams/?originalSubdomain=in', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { Icon: Youtube, href: 'https://youtube.com/@acrossmediasolutions?si=BZZXwU6l2er38LyH', label: 'YouTube', color: 'hover:bg-red-600' },
];

const footerSections = [
  {
    title: 'Services',
    icon: Globe,
    links: [
      { label: 'Branded Content Creation', href: '/projects?category=Branded%20Content' },
      { label: 'Celebrity Engagement', href: '/projects?category=Celebrity%20Engagement' },
      { label: 'Sponsorships', href: '/projects?category=Sponsorships' },
      { label: 'Intellectual Properties', href: '/projects?category=Intellectual%20Properties' },
      { label: 'Digital Marketing', href: '/projects?category=Digital%20Marketing' },
    ],
  },
  {
    title: 'Company',
    icon: Sparkles,
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const contactInfo = [
  { Icon: Mail, label: 'hello@acrossmedia.com', href: 'mailto:hello@acrossmedia.com' },
  { Icon: Phone, label: '+91 9876543210', href: 'tel:+919876543210' },
  { Icon: MapPin, label: 'Mumbai, India', href: 'https://maps.google.com' },
];

// --- Animation Variants (with explicit type) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// --- Main Footer Component ---
const Footer = () => {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Enhanced Background Effects with Pink Gradients */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Primary gradient orbs with pink emphasis */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-pink-500/25 via-purple-500/20 to-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-bl from-pink-500/20 via-purple-500/15 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-2xl" />
        
        {/* Enhanced mesh gradient overlay with pink tones */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-gray-900/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,192,203) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Enhanced floating decorative elements with pink theme */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        {/* Top Section: Enhanced Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info Section - Enhanced */}
          <motion.div className="lg:col-span-5 space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              <Link to="/">
                <motion.div 
                  className="relative inline-block group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Enhanced logo background with pink glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-3 border border-pink-500/20">
                    <img
                      src={logo}
                      alt="AcrossMedia Solutions Logo"
                      className="h-12 relative z-10 filter brightness-125 contrast-110"
                    />
                  </div>
                </motion.div>
              </Link>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                  Across Media Solutions
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-md text-lg">
                  Transforming brands through strategic media solutions, celebrity engagement, and innovative content that drives meaningful results across all platforms.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                Get in Touch
              </h4>
              <div className="space-y-3">
                {contactInfo.map(({ Icon, label, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300 border border-pink-500/10">
                      <Icon size={16} className="group-hover:scale-110 transition-transform duration-300 text-pink-100" />
                    </div>
                    <span className="group-hover:underline">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-transparent ${color}`}
                    whileHover={{ scale: 1.1, y: -4, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    <Icon size={20} className="text-pink-100 group-hover:text-white transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services & Company Sections - Enhanced */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title} 
              className="lg:col-span-3 space-y-6"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-pink-500/30">
                  <section.icon size={20} className="text-pink-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-wider uppercase">
                  {section.title}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <motion.div 
                      className="group"
                      whileHover={{ x: 6 }} 
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link 
                          to={link.href} 
                          className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-all duration-300 group-hover:text-white"
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-pink-400 group-hover:scale-150 transition-all duration-300" />
                          <span className="group-hover:underline underline-offset-4">{link.label}</span>
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      ) : (
                        <a 
                          href={link.href} 
                          className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-all duration-300 group-hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-pink-400 group-hover:scale-150 transition-all duration-300" />
                          <span className="group-hover:underline underline-offset-4">{link.label}</span>
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Signup Section */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>           
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Join 10,000+ professionals</span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="relative"
          variants={itemVariants}
        >
          {/* Gradient divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8" />
          
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Across Media Solutions. All Rights Reserved.</p>
            </div>
            
            {/* Enhanced Scroll-to-Top Button */}
            <div className="flex items-center gap-4">
              <motion.div
                className="hidden sm:flex items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span>Back to top</span>
                <div className="w-8 h-px bg-gradient-to-r from-pink-500 to-purple-500" />
              </motion.div>
              
              <motion.button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="group relative w-12 h-12 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                whileHover={{ 
                  scale: 1.15,
                  rotate: -15,
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <ArrowUp size={20} className="text-white transition-transform duration-300 group-hover:-translate-y-1 relative z-10" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
    </motion.footer>
  );
};

export default Footer;