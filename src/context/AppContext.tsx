import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  NavigationTab,
  ToolItem,
  ToolCategory,
  HistoryItem,
  HistoryActionType,
  ThemeMode,
  UserSettings,
  ToastNotification,
} from '../types';
import { TOOLS_DATA } from '../data/tools';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ToolCategory | 'all';
  setSelectedCategory: (cat: ToolCategory | 'all') => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  history: HistoryItem[];
  addHistory: (action: HistoryActionType, details: string, toolId?: string, toolName?: string) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeModalTool: ToolItem | null;
  openToolModal: (tool: ToolItem) => void;
  closeToolModal: () => void;
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  dismissToast: () => void;
  findMatchingTool: (query: string) => ToolItem | null;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'English (US)',
  cardDensity: 'comfortable',
  soundEffects: false,
  autoSaveHistory: true,
  showShortcutsHint: true,
};

const INITIAL_FAVORITES: string[] = ['ai-chat', 'math-solver', 'code-assistant'];

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    action: 'launch_tool',
    toolId: 'ai-chat',
    toolName: 'AI Chat',
    details: 'Initiated conversation workspace for micro-frontends architecture review',
    timestamp: Date.now() - 1000 * 60 * 18,
  },
  {
    id: 'hist-2',
    action: 'launch_tool',
    toolId: 'code-assistant',
    toolName: 'Code Assistant',
    details: 'Generated TypeScript useDebounce hook specification',
    timestamp: Date.now() - 1000 * 60 * 45,
  },
  {
    id: 'hist-3',
    action: 'ask_query',
    toolName: 'AI HUB 360 Search',
    details: 'Queried: "solve quadratic equation step by step"',
    timestamp: Date.now() - 1000 * 60 * 120,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Filter States
  const [activeTab, setActiveTabState] = useState<NavigationTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [activeModalTool, setActiveModalTool] = useState<ToolItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Settings State with LocalStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem('aihub360_settings');
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Favorites State with LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('aihub360_favorites');
      return stored ? JSON.parse(stored) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  });

  // History State with LocalStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('aihub360_history');
      return stored ? JSON.parse(stored) : INITIAL_HISTORY;
    } catch {
      return INITIAL_HISTORY;
    }
  });

  // Apply Theme Mode (Light / Dark / System)
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark =
        settings.theme === 'dark' || (settings.theme === 'system' && mediaQuery.matches);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    const listener = () => {
      if (settings.theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [settings.theme]);

  // Persist Settings
  useEffect(() => {
    try {
      localStorage.setItem('aihub360_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('aihub360_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Persist History
  useEffect(() => {
    try {
      localStorage.setItem('aihub360_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Toast Notification Timeout
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({ id: String(Date.now()), message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const setActiveTab = useCallback((tab: NavigationTab) => {
    setActiveTabState(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addHistory = useCallback(
    (action: HistoryActionType, details: string, toolId?: string, toolName?: string) => {
      if (!settings.autoSaveHistory) return;
      const newItem: HistoryItem = {
        id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        action,
        toolId,
        toolName: toolName || 'AI HUB 360',
        details,
        timestamp: Date.now(),
      };
      setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // maintain last 50 entries
    },
    [settings.autoSaveHistory]
  );

  const toggleFavorite = useCallback(
    (toolId: string) => {
      const tool = TOOLS_DATA.find((t) => t.id === toolId);
      const toolName = tool ? tool.name : toolId;
      setFavorites((prev) => {
        const isFav = prev.includes(toolId);
        const updated = isFav ? prev.filter((id) => id !== toolId) : [...prev, toolId];
        showToast(
          isFav ? `Removed ${toolName} from favorites` : `Saved ${toolName} to favorites`,
          'info'
        );
        addHistory(
          'favorite_toggle',
          isFav ? `Removed ${toolName} from favorites` : `Added ${toolName} to favorites`,
          toolId,
          toolName
        );
        return updated;
      });
    },
    [showToast, addHistory]
  );

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('aihub360_history');
    } catch {}
    showToast('Activity history cleared', 'success');
  }, [showToast]);

  const deleteHistoryItem = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
      showToast('Activity record removed', 'info');
    },
    [showToast]
  );

  const updateSettings = useCallback(
    (partial: Partial<UserSettings>) => {
      setSettings((prev) => ({ ...prev, ...partial }));
      showToast('Preferences updated', 'success');
      addHistory('preference_change', `Updated settings: ${Object.keys(partial).join(', ')}`);
    },
    [showToast, addHistory]
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    showToast('Settings reset to system defaults', 'info');
  }, [showToast]);

  const setTheme = useCallback(
    (theme: ThemeMode) => {
      updateSettings({ theme });
    },
    [updateSettings]
  );

  const openToolModal = useCallback(
    (tool: ToolItem) => {
      setActiveModalTool(tool);
      addHistory('launch_tool', `Opened ${tool.name} sandbox workspace`, tool.id, tool.name);
    },
    [addHistory]
  );

  const closeToolModal = useCallback(() => {
    setActiveModalTool(null);
  }, []);

  // Keyword matcher to recommend tools from freeform text
  const findMatchingTool = useCallback((query: string): ToolItem | null => {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    if (q.includes('math') || q.includes('calcul') || q.includes('equat') || q.includes('deriv') || q.includes('algebra')) {
      return TOOLS_DATA.find((t) => t.id === 'math-solver') || null;
    }
    if (q.includes('code') || q.includes('react') || q.includes('typescr') || q.includes('python') || q.includes('api')) {
      return TOOLS_DATA.find((t) => t.id === 'code-assistant') || null;
    }
    if (q.includes('bug') || q.includes('error') || q.includes('debug') || q.includes('stack')) {
      return TOOLS_DATA.find((t) => t.id === 'debugger') || null;
    }
    if (q.includes('translat') || q.includes('spanish') || q.includes('japanese') || q.includes('french')) {
      return TOOLS_DATA.find((t) => t.id === 'translator') || null;
    }
    if (q.includes('image') || q.includes('draw') || q.includes('visual') || q.includes('render') || q.includes('art')) {
      return TOOLS_DATA.find((t) => t.id === 'image-tools') || null;
    }
    if (q.includes('write') || q.includes('essay') || q.includes('article') || q.includes('draft') || q.includes('blog')) {
      return TOOLS_DATA.find((t) => t.id === 'ai-writer') || null;
    }
    if (q.includes('homework') || q.includes('study') || q.includes('school') || q.includes('explain')) {
      return TOOLS_DATA.find((t) => t.id === 'homework-helper') || null;
    }
    if (q.includes('file') || q.includes('pdf') || q.includes('csv') || q.includes('extract')) {
      return TOOLS_DATA.find((t) => t.id === 'file-tools') || null;
    }
    if (q.includes('summar') || q.includes('tldr') || q.includes('condense') || q.includes('bullet')) {
      return TOOLS_DATA.find((t) => t.id === 'summarizer') || null;
    }
    if (q.includes('story') || q.includes('character') || q.includes('novel') || q.includes('plot')) {
      return TOOLS_DATA.find((t) => t.id === 'story-generator') || null;
    }
    if (q.includes('prompt') || q.includes('few-shot') || q.includes('guardrail')) {
      return TOOLS_DATA.find((t) => t.id === 'prompt-generator') || null;
    }
    if (q.includes('grammar') || q.includes('proofread') || q.includes('english')) {
      return TOOLS_DATA.find((t) => t.id === 'english-helper') || null;
    }
    if (q.includes('task') || q.includes('schedule') || q.includes('plan') || q.includes('meeting')) {
      return TOOLS_DATA.find((t) => t.id === 'ai-assistant') || null;
    }

    // Fallback: match any tag or name
    return (
      TOOLS_DATA.find(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tags.some((tag) => q.includes(tag)) ||
          t.description.toLowerCase().includes(q)
      ) || TOOLS_DATA[0]
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        favorites,
        toggleFavorite,
        isFavorite,
        history,
        addHistory,
        clearHistory,
        deleteHistoryItem,
        settings,
        updateSettings,
        resetSettings,
        theme: settings.theme,
        setTheme,
        activeModalTool,
        openToolModal,
        closeToolModal,
        toast,
        showToast,
        dismissToast,
        findMatchingTool,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
