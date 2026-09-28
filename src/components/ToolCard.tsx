import React from 'react';
import {
  MessageSquare,
  PenTool,
  Bot,
  BookOpen,
  Calculator,
  SpellCheck,
  Image as ImageIcon,
  Sparkle,
  Feather,
  Languages,
  FolderArchive,
  AlignLeft,
  Code,
  Bug,
  FileCode,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import { ToolItem } from '../types';
import { useApp } from '../context/AppContext';

interface ToolCardProps {
  tool: ToolItem;
}

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  PenTool,
  Bot,
  BookOpen,
  Calculator,
  SpellCheck,
  Image: ImageIcon,
  Sparkle,
  Feather,
  Languages,
  FolderArchive,
  AlignLeft,
  Code,
  Bug,
  FileCode,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { openToolModal, isFavorite, toggleFavorite, settings } = useApp();
  const favorite = isFavorite(tool.id);
  const Icon = ICON_MAP[tool.iconName] || Code;

  const isCompact = settings.cardDensity === 'compact';

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/80 shadow-xs hover:shadow-md transition-all duration-200 ${
        isCompact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div>
        {/* Card Header: Icon & Favorite */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 transition-all duration-200">
            <Icon className="w-5 h-5" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            className={`p-2 rounded-xl transition-colors ${
              favorite
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={favorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Unboxed Metadata & Title (Anti-slop rule: NO static pill boxes) */}
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
            <span>{tool.categoryLabel}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Card Footer: Open Workspace Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          Ready for test
        </span>

        <button
          type="button"
          onClick={() => openToolModal(tool)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-semibold transition-all duration-150 group/btn"
          aria-label={`Open ${tool.name} workspace`}
        >
          <span>Open</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
