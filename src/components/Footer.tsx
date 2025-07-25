// src/components/layout/Footer.jsx

import React from 'react';
// Import the 'Variants' type from framer-motion
import { motion, Variants } from 'framer-motion'; 
import { Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

import logo from '@/assets/images/ams-Photoroom.png';

// --- Data for Footer Links ---
const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/across-media-solutions-ams/?originalSubdomain=in', label: 'LinkedIn' },
  { Icon: Youtube, href: 'https://youtube.com/@acrossmediasolutions?si=BZZXwU6l2er38LyH', label: 'YouTube' },
];

const footerSections = [
  {
    title: 'Services',
    links: [
      { label: 'Branded Content Creation', href: '/services/branded-content' },
      { label: 'Celebrity Engagement', href: '/services/celebrity-engagement' },
      { label: 'Sponsorships', href: '/services/sponsorships' },
      { label: 'Intellectual Properties', href: '/services/ip' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

// --- Animation Variants (with explicit type) ---
const containerVariants: Variants = { // <-- FIX 1: Add Variants type
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = { // <-- FIX 2: Add Variants type
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
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
      className="bg-black text-gray-300 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Glow Effect */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/50 to-pink-600/50 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-pink-600/40 to-cyan-500/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        {/* Top Section: Logo, Description, Socials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <Link to="/">
              <motion.img
                src={logo}
                alt="AcrossMedia Solutions Logo"
                className="h-12"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Transforming brands through strategic media solutions, celebrity engagement, and innovative content that drives meaningful results.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-cyan-400"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.div whileHover={{ x: 4, color: '#06b6d4' }} transition={{ type: 'spring', stiffness: 400 }}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="hover:text-cyan-400 transition-colors duration-300" onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            {link.label}
                          </motion.div>
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:text-cyan-400 transition-colors duration-300">
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            {link.label}
                          </motion.div>
                        </a>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section: Copyright and Scroll-to-Top */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-6"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Across Media Solutions. All Rights Reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group w-10 h-10 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20"
            whileHover={{ 
              scale: 1.15,
              rotate: -15,
              boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowUp size={20} className="text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;