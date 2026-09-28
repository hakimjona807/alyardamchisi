import React from 'react';
import {
  Home,
  Heart,
  History,
  Settings,
  X,
  MessageSquare,
  GraduationCap,
  PenTool,
  Languages,
  Image as ImageIcon,
  Code,
  FolderArchive,
  Grid,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const MobileNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favorites,
    history,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useApp();

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const allNavItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'study', label: 'Study Tools', icon: GraduationCap },
    { id: 'writer', label: 'AI Writer', icon: PenTool },
    { id: 'translator', label: 'Translator', icon: Languages },
    { id: 'image-tools', label: 'Image Tools', icon: ImageIcon },
    { id: 'coding', label: 'Coding Suite', icon: Code },
    { id: 'files', label: 'File Tools', icon: FolderArchive },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'history', label: 'Activity History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Slide-Over Menu (when hamburger or "Tools" clicked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  AI HUB 360
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">All Navigation Suites</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Grid */}
            <div className="p-4 grid grid-cols-2 gap-2 overflow-y-auto max-h-[60vh]">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl text-left text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* One-Handed Ergonomic Bottom Navigation Bar (Height <= 60px, <= 15% mobile viewport) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 h-15 px-3 flex items-center justify-around transition-colors"
        aria-label="Quick mobile navigation"
      >
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'home'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 text-[10px] font-medium transition-colors ${
            mobileMenuOpen
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Open all tools menu"
        >
          <Grid className="w-5 h-5" />
          <span>Tools</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('favorites')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'favorites'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Favorites"
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
          {favorites.length > 0 && (
            <span className="absolute top-1.5 right-3 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center tabular-nums">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('history')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="History"
        >
          <History className="w-5 h-5" />
          <span>History</span>
          {history.length > 0 && (
            <span className="absolute top-1.5 right-3 w-3.5 h-3.5 bg-indigo-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center tabular-nums">
              {history.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('settings')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>
    </>
  );
};
