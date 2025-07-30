// src/components/Approach.tsx

import React from 'react';
import { motion } from 'framer-motion';

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

const Blueprint = () => {
  const approachSteps = [
    { number: "01", title: "Discover & Analyze", description: "We dive deep into your brand, audience, and objectives to build a foundational understanding." },
    { number: "02", title: "Strategize & Plan", description: "A bespoke, data-informed strategy is crafted, outlining a clear roadmap for success." },
    { number: "03", title: "Create & Execute", description: "Our creative team brings the vision to life with exceptional production and meticulous execution." },
    { number: "04", title: "Amplify & Measure", description: "We deploy the campaign, analyze performance in real-time, and optimize for maximum impact." },
  ];

  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionTitle>
          <span className="text-gray-100">Our Blueprint for</span> <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Success</span>
        </SectionTitle>
        <div className="mt-20 relative">
          {/* Vertical timeline bar */}
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
                {/* Content Box */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:order-2'}`}>
                  <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-xl">
                     <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                     <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                {/* Timeline Number */}
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
  );
};

export default Blueprint;