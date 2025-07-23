import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Share2 } from 'lucide-react';
import { apiRequestJson } from '../utils/api';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

interface IP {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

const IPDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [ip, setIp] = useState<IP | null>(location.state?.ip as IP || null);
  const [loading, setLoading] = useState(!ip);
  
  useEffect(() => {
    if (!ip && id) {
      const fetchIP = async () => {
        try {
          setLoading(true);
          const response = await apiRequestJson<IP>(`/api/projects/${id}`);
          setIp(response);
        } catch (error) {
          console.error('Error fetching IP:', error);
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchIP();
    }
  }, [id, ip, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!ip) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">IP Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={ip.image}
              alt={ip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeft size={20} />
              <span>Back to IP Showcase</span>
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
                      {ip.category}
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-primary bg-clip-text text-transparent">
                      {ip.title}
                    </span>
                  </h1>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    {ip.description}
                  </p>

                  <div className="flex items-center gap-8 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} />
                      <span className="text-lg">{new Date(ip.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <Play size={20} />
                      <span>View Details</span>
                    </div>
                  </button>

                  <button className="group border-2 border-gray-600 text-gray-300 px-6 py-4 rounded-2xl font-semibold hover:border-primary hover:text-white transition-all duration-300">
                    <Share2 size={20} />
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 aspect-video">
                  <img
                    src={ip.image}
                    alt={ip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
                      <Play size={40} className="text-white ml-2" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Simple Details Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                {ip.title}
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {ip.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default IPDetail;

