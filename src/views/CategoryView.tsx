import React from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS_DATA, CATEGORIES_DATA } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { NavigationTab, ToolCategory } from '../types';
import {
  MessageSquare,
  GraduationCap,
  PenTool,
  Languages,
  Image as ImageIcon,
  Code,
  FolderArchive,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface CategoryViewProps {
  navTab: NavigationTab;
}

const TAB_TO_CATEGORY: Record<string, ToolCategory> = {
  'ai-chat': 'ai',
  'study': 'study',
  'writer': 'ai',
  'translator': 'productivity',
  'image-tools': 'create',
  'coding': 'developer',
  'files': 'productivity',
};

const TAB_CONFIGS: Record<
  string,
  { title: string; subtitle: string; icon: React.ElementType; color: string }
> = {
  'ai-chat': {
    title: 'Conversational AI Suite',
    subtitle: 'Contextual reasoning, multi-turn brainstorms, and intelligent task assistance',
    icon: MessageSquare,
    color: 'indigo',
  },
  'study': {
    title: 'Study & Academic Mastery',
    subtitle: 'Step-by-step problem solver, homework breakdown, and grammar analysis',
    icon: GraduationCap,
    color: 'blue',
  },
  'writer': {
    title: 'AI Editorial & Writer Studio',
    subtitle: 'Long-form essays, executive briefings, story drafting, and marketing copy',
    icon: PenTool,
    color: 'purple',
  },
  'translator': {
    title: 'Global Translation Suite',
    subtitle: 'Multi-lingual nuance adaptation, formal Keigo, and cultural localization',
    icon: Languages,
    color: 'emerald',
  },
  'image-tools': {
    title: 'Generative Visual & Prompt Lab',
    subtitle: 'Visual concept framing, system prompt design, and artistic asset creation',
    icon: ImageIcon,
    color: 'cyan',
  },
  'coding': {
    title: 'Developer Engineering Suite',
    subtitle: 'Type-safe polyglot code synthesis, runtime error debugger, and architecture analyst',
    icon: Code,
    color: 'amber',
  },
  'files': {
    title: 'Files, PDF & Document Engine',
    subtitle: 'Structured data extraction, invoice parsing, and executive TL;DR synthesis',
    icon: FolderArchive,
    color: 'emerald',
  },
};

export const CategoryView: React.FC<CategoryViewProps> = ({ navTab }) => {
  const { openToolModal } = useApp();
  const config = TAB_CONFIGS[navTab] || {
    title: 'Specialized AI Suite',
    subtitle: 'Workspace tools configured for this productivity domain',
    icon: Sparkles,
    color: 'indigo',
  };

  const categoryId = TAB_TO_CATEGORY[navTab] || 'ai';
  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === categoryId);

  // Filter tools tailored for this navigation view
  const categoryTools = TOOLS_DATA.filter((tool) => {
    if (navTab === 'ai-chat') return tool.category === 'ai';
    if (navTab === 'study') return tool.category === 'study';
    if (navTab === 'writer') return tool.id === 'ai-writer' || tool.id === 'story-generator';
    if (navTab === 'translator') return tool.id === 'translator';
    if (navTab === 'image-tools') return tool.category === 'create';
    if (navTab === 'coding') return tool.category === 'developer';
    if (navTab === 'files') return tool.id === 'file-tools' || tool.id === 'summarizer';
    return tool.category === categoryId;
  });

  const Icon = config.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Category Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                AI HUB 360 · {categoryMeta?.label || 'Suite'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {config.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {config.subtitle}
            </p>
          </div>

          {categoryTools.length > 0 && (
            <button
              type="button"
              onClick={() => openToolModal(categoryTools[0])}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-sm"
            >
              <span>Quick Launch {categoryTools[0].name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Available Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Available Tools in this Suite ({categoryTools.length})
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Phase 1 Foundation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};
