import React, { useState } from 'react';
import { Plus, Video, Image, Settings as SettingsIcon, Moon, Sun, BarChart3, Users, Calendar, Search, FileText } from 'lucide-react';
import PostManagement from './PostManagement';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import Settings from './Settings';
import LogoutButton from '../auth/LogoutButton';
import { apiRequestJson } from '../../utils/api';

// This interface remains the same
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

  // Tabs data remains the same
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
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
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
        // Render Dashboard by default on initial load or invalid tab
        return <Dashboard isDarkMode={isDarkMode} themeClasses={themeClasses} />;
    }
  };

  return (
    // Added pb-20 for mobile to prevent content from being hidden by the bottom nav
    <div className={`min-h-screen ${themeClasses.bg} pb-20 md:pb-0 transition-colors duration-300`}>
      {/* Header */}
      <header className={`${themeClasses.cardBg} ${themeClasses.border} border-b sticky top-0 z-40 backdrop-blur-sm bg-opacity-80`}>
        {/* Responsive padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Responsive gap and text size */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-xl md:text-2xl font-bold">
                <span className={themeClasses.text}>Across</span>
                <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Media</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}>
                Admin
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl ${themeClasses.hover} transition-colors ${themeClasses.border} border`}
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Layout shifts from column on mobile to row on desktop */}
        <div className="flex flex-col md:flex-row md:gap-8">
          
          {/* Sidebar - Hidden on mobile, visible from medium screens up */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <nav className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.border} border sticky top-24`}>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Bottom Navigation - Visible only on mobile, hidden from medium screens up */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${themeClasses.cardBg} ${themeClasses.border} border-t z-50`}>
         <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => (
              <button
                key={`mobile-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center w-full h-full p-2"
              >
                <tab.icon 
                  size={24} 
                  className={`transition-colors duration-200 ${
                    activeTab === tab.id ? 'text-cyan-400' : themeClasses.textSecondary
                  }`} 
                />
                <span className={`text-xs mt-1 transition-colors duration-200 ${
                  activeTab === tab.id ? 'text-cyan-400' : themeClasses.textSecondary
                }`}>
                  {tab.label}
                </span>
              </button>
            ))}
         </div>
      </nav>
    </div>
  );
};

export default AdminPanel;