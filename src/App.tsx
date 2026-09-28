import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { ToolModal } from './components/ToolModal';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { FavoritesView } from './views/FavoritesView';
import { HistoryView } from './views/HistoryView';
import { SettingsView } from './views/SettingsView';

const WorkspaceContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'favorites':
        return <FavoritesView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-chat':
      case 'study':
      case 'writer':
      case 'translator':
      case 'image-tools':
      case 'coding':
      case 'files':
        return <CategoryView navTab={activeTab} />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 min-w-0 pb-20 md:pb-12 overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Compact One-Handed Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Interactive Tool Sandbox Modal */}
      <ToolModal />

      {/* Toast Feedback Notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <WorkspaceContent />
    </AppProvider>
  );
}
