import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  Sun,
  Moon,
  Laptop,
  Heart,
  Menu,
  Sparkles,
  User,
  Settings as SettingsIcon,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    theme,
    setTheme,
    favorites,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    settings,
  } = useApp();

  const [profileOpen, setProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Global Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    if (theme === 'dark') return <Moon className="w-4 h-4 text-indigo-400" />;
    return <Laptop className="w-4 h-4 text-slate-400" />;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg py-1 px-1.5"
            aria-label="AI HUB 360 Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                AI HUB 360
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Enterprise AI Suite
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Global Search Bar */}
        <div className="flex-1 max-w-xl mx-2 md:mx-6">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15+ AI tools (e.g. math solver, code, write)..."
              aria-label="Search tools"
              className="w-full h-10 pl-10 pr-20 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : settings.showShortcutsHint ? (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-200/70 dark:bg-slate-700/60 rounded border border-slate-300 dark:border-slate-600">
                  ⌘K
                </kbd>
              ) : null}
            </div>
          </div>
        </div>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Theme Toggle */}
          <button
            type="button"
            onClick={cycleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
            title={`Current theme: ${theme}. Click to change.`}
            aria-label={`Toggle theme, current is ${theme}`}
          >
            {getThemeIcon()}
          </button>

          {/* Favorites Shortcut */}
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Saved Favorites"
            aria-label="View Favorites"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="User profile options"
              aria-expanded={profileOpen}
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <img
                  src="/src/assets/images/avatar_workspace_user_1790576858696.jpg"
                  alt="Workspace User Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('fallback-user');
                  }}
                />
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400 hidden group-[.fallback-user]:block" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    Executive Workspace
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    Production Environment · Ready
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Phase 1 Architecture Active</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-slate-400" />
                    <span>Settings & Preferences</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('favorites');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>Favorited Tools ({favorites.length})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
