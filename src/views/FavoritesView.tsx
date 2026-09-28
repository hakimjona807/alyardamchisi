import React, { useState } from 'react';
import { Heart, Search, ArrowRight, BookmarkX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TOOLS_DATA } from '../data/tools';
import { ToolCard } from '../components/ToolCard';

export const FavoritesView: React.FC = () => {
  const { favorites, setActiveTab } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  const favoritedTools = TOOLS_DATA.filter((tool) => favorites.includes(tool.id));

  const filtered = favoritedTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.categoryLabel.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Favorited Tools
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your pinned quick-access AI workspace tools ({favoritedTools.length})
          </p>
        </div>

        {/* Filter within favorites */}
        {favoritedTools.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search saved tools..."
              className="w-full h-9 pl-9 pr-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoritedTools.length > 0 ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center max-w-sm mx-auto">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No favorites match &ldquo;{filterQuery}&rdquo;.
            </p>
          </div>
        )
      ) : (
        /* Rich Empty State */
        <div className="py-16 px-4 text-center max-w-md mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center mb-3">
            <BookmarkX className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            No saved tools yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Click the heart icon on any tool card in the workspace to save it here for fast one-click access.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
