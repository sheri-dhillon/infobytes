
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { ContactPage } from './pages/ContactPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';

// Admin Pages
import { LoginPage } from './pages/admin/LoginPage';
import { ForgotPasswordPage } from './pages/admin/ForgotPasswordPage';
import { AdminLayout } from './layouts/AdminLayout';
import { DashboardHome } from './pages/admin/DashboardHome';
import { ContentManager } from './pages/admin/ContentManager';
import { SettingsPage } from './pages/admin/SettingsPage';
import { FileManager } from './pages/admin/FileManager';
import { HeaderEditor } from './pages/admin/ui/HeaderEditor';
import { HeroEditor } from './pages/admin/ui/HeroEditor';
import { PricingEditor } from './pages/admin/ui/PricingEditor';
import { FAQEditor } from './pages/admin/ui/FAQEditor';
import { CarouselsEditor } from './pages/admin/ui/CarouselsEditor';
import { FooterEditor } from './pages/admin/ui/FooterEditor';
import { AboutEditor } from './pages/admin/ui/AboutEditor';
import { IndustriesEditor } from './pages/admin/ui/IndustriesEditor';
import { ContactEditor } from './pages/admin/ui/ContactEditor';

// Scroll to top component that listens to route changes
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper for public pages to include Header/Footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans selection:bg-purple-500/30 selection:text-white flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full relative z-0 flex flex-col">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTopOnNavigate />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/ibloginpage" element={<LoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Legacy Redirect for old login URL */}
          <Route path="/admin/login" element={<Navigate to="/admin/ibloginpage" replace />} />
          
          <Route element={<ProtectedRoute />}>
             <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="files" element={<FileManager />} />
                {/* UI Components Routes */}
                <Route path="ui-components/header" element={<HeaderEditor />} />
                <Route path="ui-components/hero" element={<HeroEditor />} />
                <Route path="ui-components/about" element={<AboutEditor />} />
                <Route path="ui-components/pricing" element={<PricingEditor />} />
                <Route path="ui-components/faq" element={<FAQEditor />} />
                <Route path="ui-components/carousels" element={<CarouselsEditor />} />
                <Route path="ui-components/industries" element={<IndustriesEditor />} />
                <Route path="ui-components/contact" element={<ContactEditor />} />
                <Route path="ui-components/footer" element={<FooterEditor />} />
                <Route path=":section" element={<ContentManager />} />
             </Route>
          </Route>

          {/* Public Routes (Wrapped with Header/Footer) */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
          <Route path="/work" element={<PublicLayout><WorkPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><TestimonialsPage /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />

          {/* Catch-all 404 - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
