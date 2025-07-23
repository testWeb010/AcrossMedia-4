import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Award, Users, Star } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  achievements: string[];
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Creative Director',
      description: 'With over 10 years of experience in creative strategy and brand development, Sarah leads our creative vision with passion and innovation. She has worked with Fortune 500 companies and emerging startups alike.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'sarah@acrossmedia.com',
      achievements: ['Creative Excellence Award 2023', 'Brand Strategy Leader', '15+ Years Experience']
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Technical Director',
      description: 'Michael brings cutting-edge technical expertise to every project. His background in software engineering and media technology ensures our solutions are both innovative and reliable.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'michael@acrossmedia.com',
      achievements: ['Tech Innovation Award', 'Full-Stack Expert', '50+ Projects Delivered']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      description: 'Emily ensures every project runs smoothly from conception to delivery. Her exceptional organizational skills and client relationship management make her an invaluable team leader.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'emily@acrossmedia.com',
      achievements: ['PMP Certified', 'Client Satisfaction 98%', 'Team Leadership Expert']
    },
    {
      id: '4',
      name: 'David Thompson',
      role: 'Content Strategist',
      description: 'David crafts compelling narratives that resonate with audiences across all platforms. His expertise in digital storytelling and content marketing drives engagement and results.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'david@acrossmedia.com',
      achievements: ['Content Marketing Expert', 'Award-Winning Campaigns', 'Multi-Platform Specialist']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">Meet Our Team</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Creative Minds Behind
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Across Media
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of creative professionals brings together years of experience, 
              innovative thinking, and a passion for delivering exceptional results for every client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative"
                variants={itemVariants}
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-500">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Profile Image */}
                      <div className="relative">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        
                        {/* Status Indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                            {member.name}
                          </h3>
                          <p className="text-primary font-semibold text-lg">{member.role}</p>
                        </div>

                        <p className="text-gray-400 leading-relaxed">
                          {member.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                            <Award size={16} className="text-yellow-400" />
                            Key Achievements
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.achievements.map((achievement, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs border border-gray-600"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center hover:bg-blue-600/30 transition-colors"
                            >
                              <Linkedin size={18} className="text-blue-400" />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              className="w-10 h-10 bg-sky-600/20 border border-sky-500/30 rounded-xl flex items-center justify-center hover:bg-sky-600/30 transition-colors"
                            >
                              <Twitter size={18} className="text-sky-400" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-10 h-10 bg-gray-600/20 border border-gray-500/30 rounded-xl flex items-center justify-center hover:bg-gray-600/30 transition-colors"
                            >
                              <Mail size={18} className="text-gray-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Impact Together
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: '150+', icon: Award },
              { label: 'Happy Clients', value: '50+', icon: Users },
              { label: 'Team Experience', value: '40+ Years', icon: Star },
              { label: 'Success Rate', value: '98%', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;