import React, { useState, useEffect } from 'react';
import { Video, Image, Eye, Heart, TrendingUp, Calendar, Users, BarChart3, Activity, Play } from 'lucide-react';
import { apiRequestJson } from '../../utils/api';
import AuthenticatedWrapper from './AuthenticatedWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardData {
  totalVideos: number;
  totalProjects: number;
  totalUsers: number;
  totalViews: number;
  pendingUsers: number;
  recentActivity: { 
    type: string; 
    title: string; 
    time: string; 
    id?: string;
  }[];
  analytics: { 
    month: string; 
    views: number; 
    videos?: number;
  }[];
}

interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
}

const Dashboard = ({ isDarkMode, themeClasses }: { isDarkMode: boolean; themeClasses: ThemeClasses }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalVideos: 0,
    totalProjects: 0,
    totalUsers: 0,
    totalViews: 0,
    pendingUsers: 0,
    recentActivity: [],
    analytics: []
  });

  const stats = [
    {
      title: 'Total Videos',
      value: dashboardData.totalVideos.toString(),
      change: '+12%',
      icon: Video,
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Active video content'
    },
    {
      title: 'Total Projects',
      value: dashboardData.totalProjects.toString(),
      change: '+8%',
      icon: Image,
      gradient: 'from-pink-500 to-purple-600',
      description: 'Completed projects'
    },
    {
      title: 'Total Views',
      value: dashboardData.totalViews.toLocaleString(),
      change: '+24%',
      icon: Eye,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Video impressions'
    },
    {
      title: 'Total Users',
      value: dashboardData.totalUsers.toString(),
      change: '+5%',
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      description: 'Registered users'
    }
  ];

  const recentActivity = dashboardData.recentActivity.length > 0 ? dashboardData.recentActivity : [
    { type: 'video', title: 'New video added: "Brand Campaign 2024"', time: '2 hours ago' },
    { type: 'project', title: 'Project updated: "Celebrity Collaboration"', time: '4 hours ago' },
    { type: 'video', title: 'Video published: "Sports Sponsorship"', time: '6 hours ago' },
    { type: 'project', title: 'New project created: "Tech Innovation"', time: '1 day ago' },
    { type: 'video', title: 'Video analytics updated', time: '2 days ago' },
    { type: 'video', title: 'New video added: "Summer Fest Highlights"', time: '3 days ago' },
    { type: 'project', title: 'Project "Q3 Report" marked as complete', time: '4 days ago' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiRequestJson('/api/admin/dashboard');
      setDashboardData(data as DashboardData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedWrapper themeClasses={themeClasses}>
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className={`${themeClasses.textSecondary} text-sm`}>Loading dashboard data...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-center p-8">
          <div className={`${themeClasses.cardBg} rounded-2xl p-8 ${themeClasses.border} border`}>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="text-red-500" size={24} />
            </div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Error Loading Dashboard</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <div className="space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <div className={`${themeClasses.cardBg} rounded-2xl p-4 sm:p-6 lg:p-8 ${themeClasses.border} border`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${themeClasses.text} mb-2`}>
                  Welcome back, Admin! 👋
                </h1>
                <p className={`${themeClasses.textSecondary} text-sm sm:text-base`}>
                  Here's what's happening with your AcrossMedia content today.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar size={16} />
                <span className="hidden sm:inline">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span className="sm:hidden">{new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000`}></div>
                <div className={`relative ${themeClasses.cardBg} rounded-2xl p-4 sm:p-6 ${themeClasses.border} border hover:border-gray-600 transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                      <stat.icon size={16} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-green-500 text-sm font-medium">
                      <TrendingUp size={14} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <div className={`text-lg sm:text-2xl font-bold ${themeClasses.text} mb-1`}>{stat.value}</div>
                    <div className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>{stat.title}</div>
                    <div className="sm:hidden text-xs text-green-500 mt-1">{stat.change}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recent Activity */}
            <div className={`${themeClasses.cardBg} rounded-2xl p-4 sm:p-6 ${themeClasses.border} border`}>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Activity className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className={`text-lg sm:text-xl font-bold ${themeClasses.text}`}>Recent Activity</h2>
              </div>
    
              <ScrollArea className="h-64 sm:h-80 pr-3">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-500/5 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'video' 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        {activity.type === 'video' ? <Play size={14} /> : <Image size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${themeClasses.text} mb-1 line-clamp-2`}>{activity.title}</p>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>{activity.time}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Activity className={`mx-auto mb-3 ${themeClasses.textSecondary}`} size={32} />
                      <p className={`text-sm ${themeClasses.textSecondary}`}>No recent activity</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Quick Actions */}
            <div className={`${themeClasses.cardBg} rounded-2xl p-4 sm:p-6 ${themeClasses.border} border`}>
              <h2 className={`text-lg sm:text-xl font-bold ${themeClasses.text} mb-4 sm:mb-6`}>Quick Actions</h2>
              <div className="space-y-3 sm:space-y-4">
                <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-cyan-500 to-pink-600 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">Add New Video</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all">
                  <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">Create New Project</span>
                </button>
                <button className={`w-full flex items-center gap-3 p-3 sm:p-4 ${themeClasses.border} border rounded-xl ${themeClasses.textSecondary} ${themeClasses.hover} transition-all`}>
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedWrapper>
  );
};

export default Dashboard;