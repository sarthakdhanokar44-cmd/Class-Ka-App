import React from 'react';
import { ClassProvider, useClassHub } from './context/ClassContext';
import { Header } from './components/Header';
import { MainDashboard } from './components/MainDashboard';
import { UpdatesPortal } from './components/UpdatesPortal';
import { AcademicsPortal } from './components/AcademicsPortal';
import { EventsPortal } from './components/EventsPortal';
import { BatchPortal } from './components/BatchPortal';
import { AssignmentsPortal } from './components/AssignmentsPortal';
import { CopyPortal } from './components/CopyPortal';
import { LiveTestSession } from './components/LiveTestSession';
import { StealthCloakModal } from './components/StealthCloakModal';
import { ToastContainer } from './components/ToastContainer';

const AppContent: React.FC = () => {
  const { currentPortal, setCurrentPortal, currentUser, liveTest } = useClassHub();

  const renderActivePortal = () => {
    switch (currentPortal) {
      case 'dashboard':
        return <MainDashboard />;
      case 'updates':
        return <UpdatesPortal />;
      case 'academics':
        return <AcademicsPortal />;
      case 'events':
        return <EventsPortal />;
      case 'batch':
        return <BatchPortal />;
      case 'assignments':
        return <AssignmentsPortal />;
      case 'copy-portal':
        return <CopyPortal />;
      case 'live-test':
        return <LiveTestSession />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Stealth Panic Mode Screen (Esc Key) */}
      <StealthCloakModal />

      {/* Main App Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePortal()}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ClassHub</span>
            <span>·</span>
            <span>Department of Computer Science & Engineering</span>
            <span>·</span>
            <span>Batch of 2026</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setCurrentPortal('copy-portal')}
              className="hover:text-slate-800 hover:underline cursor-pointer"
            >
              Test Answers Bank
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentPortal('live-test')}
              className="hover:text-slate-800 hover:underline cursor-pointer"
            >
              Live Test Room
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentPortal('academics')}
              className="hover:text-slate-800 hover:underline cursor-pointer"
            >
              CR Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ClassProvider>
      <AppContent />
    </ClassProvider>
  );
}
