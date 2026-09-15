import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { ThinkBrightAiWidget } from './components/ThinkBrightAiWidget';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { CoursesView } from './views/CoursesView';
import { ApprenticeshipView } from './views/ApprenticeshipView';
import { ServicesView } from './views/ServicesView';
import { LabsView } from './views/LabsView';
import { VerificationView } from './views/VerificationView';
import { ProjectsView } from './views/ProjectsView';
import { ImpactView } from './views/ImpactView';
import { BlogView } from './views/BlogView';
import { EventsView } from './views/EventsView';
import { ContactView } from './views/ContactView';
import { PortalView } from './views/PortalView';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    serviceOrProgramme: string;
    amount: number;
  }>({
    isOpen: false,
    serviceOrProgramme: '',
    amount: 0,
  });

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenPayment = (serviceOrProgramme: string, amount: number) => {
    setPaymentModalData({
      isOpen: true,
      serviceOrProgramme,
      amount,
    });
  };

  const handleClosePayment = () => {
    setPaymentModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative bg-subtle-pattern transition-colors duration-300">
      
      {/* Top Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            onOpenPaymentModal={handleOpenPayment} 
          />
        )}
        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'courses' && (
          <CoursesView 
            onOpenPaymentModal={handleOpenPayment}
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'apprenticeship' && (
          <ApprenticeshipView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'services' && (
          <ServicesView 
            onOpenPaymentModal={handleOpenPayment}
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'labs' && (
          <LabsView />
        )}
        {activeTab === 'verification' && (
          <VerificationView />
        )}
        {activeTab === 'projects' && (
          <ProjectsView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'impact' && (
          <ImpactView setActiveTab={setActiveTab} />
        )}
        {activeTab === 'blog' && (
          <BlogView />
        )}
        {activeTab === 'events' && (
          <EventsView />
        )}
        {activeTab === 'contact' && (
          <ContactView />
        )}
        {activeTab === 'portal' && (
          <PortalView 
            onOpenPaymentModal={handleOpenPayment}
            setActiveTab={setActiveTab} 
          />
        )}
      </main>

      {/* Global Interactive Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalData.isOpen}
        serviceOrProgramme={paymentModalData.serviceOrProgramme}
        amount={paymentModalData.amount}
        onClose={handleClosePayment}
      />

      {/* Floating AI Assistant (Gemini Powered) */}
      <ThinkBrightAiWidget />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
