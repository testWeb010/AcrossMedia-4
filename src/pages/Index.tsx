import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import IPShowcase from '@/components/IPShowcase';
import BrandsShowcase from '@/components/BrandsShowcase';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <IPShowcase />
      <BrandsShowcase />
      <Contact />
    </div>
  );
};

export default Index;
