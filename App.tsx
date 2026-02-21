
import React, { useEffect, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { IndustryLandingPage } from './pages/IndustryLandingPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { CareersPage } from './pages/CareersPage';
import { JobApplicationPage } from './pages/JobApplicationPage';

// Service Pages (Stubs)
import { EmailAutomationEnginesPage } from './pages/services/EmailAutomationEnginesPage';
import { SMSMobileMessagingPage } from './pages/services/SMSMobileMessagingPage';
import { PlatformMigrationAuditPage } from './pages/services/PlatformMigrationAuditPage';
import { LifecycleStrategyCROPage } from './pages/services/LifecycleStrategyCROPage';

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("ErrorBoundary caught an error:", error, errorInfo); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-4xl font-bold text-brand-orange mb-4">Something went wrong.</h1>
          <p className="text-gray-400 mb-8 max-w-md">The application encountered an unexpected error. Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            Refresh Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="bg-brand-dark text-white min-h-screen font-sans flex flex-col w-full">
    <Header />
    <main className="flex-grow w-full relative z-0 flex flex-col">{children || null}</main>
    <Footer />
    <ScrollToTop />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
        <Router>
          <ScrollToTopOnNavigate />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/industries" element={<PublicLayout><IndustriesPage /></PublicLayout>} />
            <Route path="/industries/:slug" element={<PublicLayout><IndustryLandingPage /></PublicLayout>} />
            <Route path="/services/email-automation-engines" element={<PublicLayout><EmailAutomationEnginesPage /></PublicLayout>} />
            <Route path="/services/sms-mobile-messaging" element={<PublicLayout><SMSMobileMessagingPage /></PublicLayout>} />
            <Route path="/services/platform-migration-audit" element={<PublicLayout><PlatformMigrationAuditPage /></PublicLayout>} />
            <Route path="/services/lifecycle-strategy-cro" element={<PublicLayout><LifecycleStrategyCROPage /></PublicLayout>} />
            <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
            <Route path="/work" element={<PublicLayout><WorkPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><CareersPage /></PublicLayout>} />
            <Route path="/careers/apply/:slug" element={<PublicLayout><JobApplicationPage /></PublicLayout>} />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
    </ErrorBoundary>
  );
}

export default App;
