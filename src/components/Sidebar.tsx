import React from 'react';
import {
  Home,
  MessageSquare,
  GraduationCap,
  PenTool,
  Languages,
  Image as ImageIcon,
  Code,
  FolderArchive,
  Heart,
  History,
  Settings,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  group?: 'main' | 'tools' | 'user';
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, favorites, history } = useApp();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, group: 'main' },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, group: 'tools' },
    { id: 'study', label: 'Study', icon: GraduationCap, group: 'tools' },
    { id: 'writer', label: 'Writer', icon: PenTool, group: 'tools' },
    { id: 'translator', label: 'Translator', icon: Languages, group: 'tools' },
    { id: 'image-tools', label: 'Image Tools', icon: ImageIcon, group: 'tools' },
    { id: 'coding', label: 'Coding', icon: Code, group: 'tools' },
    { id: 'files', label: 'Files', icon: FolderArchive, group: 'tools' },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: favorites.length, group: 'user' },
    { id: 'history', label: 'History', icon: History, badge: history.length, group: 'user' },
    { id: 'settings', label: 'Settings', icon: Settings, group: 'user' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-white/70 dark:bg-slate-900/70 border-r border-slate-200/80 dark:border-slate-800 p-4 justify-between transition-colors overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation Categories */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Workspace
          </div>
          {navItems
            .filter((i) => i.group === 'main')
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Specialized Tool Suites */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            AI Tool Suites
          </div>
          {navItems
            .filter((i) => i.group === 'tools')
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Activity & Preferences */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Workspace Hub
          </div>
          {navItems
            .filter((i) => i.group === 'user')
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (typeof item.badge === 'number' ? item.badge > 0 : Boolean(item.badge)) ? (
                    <span className="text-[11px] font-mono tabular-nums text-slate-400 dark:text-slate-500">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
        </div>
      </div>

      {/* Foundation Status Box */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>AI HUB 360 Foundation</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            15 core tools registered · Workspace engine ready for scaling.
          </p>
        </div>
      </div>
    </aside>
  );
};
