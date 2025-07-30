// src/components/layout/Footer.jsx

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';
import {
  Facebook, Instagram, Linkedin, Youtube, ArrowUp, Mail, Phone, MapPin, Send,
  Building2,
  Globe, ExternalLink
} from 'lucide-react';
import logo from '@/assets/images/ams-Photoroom.png';

// --- Reusable Animated Link Component (UPDATED) ---
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isInternal = href.startsWith('/');

  const linkContent = (
    <div className="group relative inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 py-1">
      {/* Bullet point now uses the matching cyan color */}
      <span className="text-cyan-400">•</span>
      <span>{children}</span>
      
      <ExternalLink 
        size={16} 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1" 
      />
      
      <div 
        className="absolute bottom-0 left-0 h-px w-full bg-white origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" 
      />
    </div>
  );

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
      }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {isInternal ? (
        <Link to={href}>
          {linkContent}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {linkContent}
        </a>
      )}
    </motion.li>
  );
};


// --- Data ---
const socialLinks = [
  { Icon: Facebook, href: 'https://www.facebook.com/people/Across-Media-Solutions/61575659826246/', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/acrossmedia.in/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/across-media-solutions-ams/?originalSubdomain=in', label: 'LinkedIn' },
  { Icon: Youtube, href: 'https://youtube.com/@acrossmediasolutions?si=BZZXwU6l2er38LyH', label: 'YouTube' },
];

const servicesLinks = [
  { label: 'Branded Content Creation', href: '/projects?category=Branded%20Content' },
  { label: 'Celebrity Engagement', href: '/projects?category=Celebrity%20Engagement' },
  { label: 'Sponsorships', href: '/projects?category=Sponsorships' },
  { label: 'Intellectual Properties', href: '/projects?category=Intellectual%20Properties' },
  { label: 'Digital Marketing', href: '/projects?category=Digital%20Marketing' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const contactInfo = [
  { Icon: Mail, label: 'hello@acrossmedia.com', href: 'mailto:hello@acrossmedia.com' },
  { Icon: Phone, label: '+91 9876543210', href: 'tel:+919876543210' },
  { Icon: MapPin, label: 'Mumbai, India', href: 'https://maps.google.com' },
];

// --- Animation Variants ---
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const listVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Main Footer Component ---
const Footer = () => {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2, easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter form submitted");
  };

  return (
    <motion.footer
      className="relative overflow-hidden bg-[#0A0F18] text-slate-300 py-20"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-12 mb-16">
          
          <motion.div className="md:col-span-6 lg:col-span-3 space-y-6" variants={sectionVariants}>
            <Link to="/" className="inline-block">
              <motion.img
                src={logo}
                alt="AcrossMedia Solutions Logo"
                className="h-12"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Transforming brands through strategic media solutions that drive meaningful results.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon size={20} className="text-slate-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="md:col-span-3 lg:col-span-3" variants={sectionVariants}>
            <h3 className="flex items-center gap-3 mb-6 text-lg font-semibold text-white tracking-wide">
              <Globe size={22} className="text-cyan-400" /> Services
            </h3>
            <motion.ul variants={listVariants}>
              {servicesLinks.map(link => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
            </motion.ul>
          </motion.div>

          <motion.div className="md:col-span-3 lg:col-span-2" variants={sectionVariants}>
            <h3 className="flex items-center gap-3 mb-6 text-lg font-semibold text-white tracking-wide">
              <Building2 size={22} className="text-cyan-400" /> Company
            </h3>
            <motion.ul variants={listVariants}>
              {companyLinks.map(link => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
            </motion.ul>
          </motion.div>

          <motion.div className="md:col-span-6 lg:col-span-4 space-y-10" variants={sectionVariants}>
            <div>
              <h3 className="flex items-center gap-3 mb-6 text-lg font-semibold text-white tracking-wide">
                <Mail size={22} className="text-cyan-400" /> Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="group flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                    <Icon size={18} className="text-cyan-400 flex-shrink-0" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-md shadow-lg shadow-cyan-500/10"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(34, 211, 238, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div className="pt-8 border-t border-slate-800/70 flex flex-col sm:flex-row justify-between items-center gap-6" variants={sectionVariants}>
          <p className="text-slate-500 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Across Media Solutions. All Rights Reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20"
            whileHover={{ scale: 1.1, y: -5, rotate: -15, boxShadow: "0px 0px 25px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowUp size={24} className="text-white" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;