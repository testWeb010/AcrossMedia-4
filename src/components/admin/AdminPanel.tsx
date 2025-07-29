import React, { useState } from 'react';
import { Plus, Video, Image, Settings as SettingsIcon, Moon, Sun, BarChart3, Users, Calendar, Search, FileText, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PostManagement from './PostManagement';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Settings from './Settings';
import LogoutButton from '../auth/LogoutButton';
import { apiRequestJson } from '../../utils/api';

interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const themeClasses: ThemeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} themeClasses={themeClasses} />;
      case 'users':
        return <UserManagement isDarkMode={isDarkMode} themeClasses={themeClasses} />;
      case 'posts':
        return <PostManagement isDarkMode={isDarkMode} themeClasses={themeClasses} />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} themeClasses={themeClasses} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${themeClasses.cardBg} ${themeClasses.border} border-b sticky top-0 z-50 backdrop-blur-sm`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-xl ${themeClasses.hover} transition-colors`}
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              <div className="text-xl sm:text-2xl font-bold">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Across</span>
                <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Media</span>
              </div>
              <div className={`hidden sm:block px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}>
                Admin Panel
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl ${themeClasses.hover} transition-colors ${themeClasses.border} border`}
              >
                {isDarkMode ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-gray-600" />
                )}
              </button>
              
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-pink-600 flex items-center justify-center`}>
                <Users size={16} className="text-white" />
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64 flex-shrink-0'}
          ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
          ${themeClasses.bg}
        `}>
          <div className="h-full p-4">
            <nav className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border h-fit`}>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-pink-600 text-white shadow-lg'
                        : `${themeClasses.textSecondary} ${themeClasses.hover}`
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
