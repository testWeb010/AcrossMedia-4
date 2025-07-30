import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import AboutUs from './pages/AboutUs';
import Contact from './components/Contact';
import Gallery from './pages/Gallery';
// import Projects from './pages/Projects';
import IPDetail from './pages/IPDetail';
import PostView from './pages/PostView';
import AdminPanel from './components/admin/AdminPanel';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import PendingApproval from './components/auth/PendingApproval'
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/acs-admin');
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/pending-approval'].includes(location.pathname);

  // Hide header and footer on admin pages and auth pages
  const showHeaderFooter = !isAdminPage && !isAuthPage;

  return (
    <div className="min-h-screen">
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ip/:id" element={<IPDetail />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/acs-admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;