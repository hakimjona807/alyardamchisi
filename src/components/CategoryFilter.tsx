import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Palette,
  Zap,
  Terminal,
  LayoutGrid,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ToolCategory } from '../types';
import { CATEGORIES_DATA, TOOLS_DATA } from '../data/tools';

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery } = useApp();

  const getCategoryCount = (catId: ToolCategory | 'all') => {
    if (catId === 'all') return TOOLS_DATA.length;
    return TOOLS_DATA.filter((t) => t.category === catId).length;
  };

  const getCategoryIcon = (catId: ToolCategory | 'all') => {
    switch (catId) {
      case 'ai':
        return Sparkles;
      case 'study':
        return GraduationCap;
      case 'create':
        return Palette;
      case 'productivity':
        return Zap;
      case 'developer':
        return Terminal;
      default:
        return LayoutGrid;
    }
  };

  const categories: Array<{ id: ToolCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Tools' },
    ...CATEGORIES_DATA.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="w-full flex items-center justify-between pb-3 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          const isSelected = selectedCategory === cat.id && !searchQuery;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/40'
              }`}
              aria-pressed={isSelected}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-60 tabular-nums">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
