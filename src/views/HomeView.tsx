import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryFilter } from '../components/CategoryFilter';
import { ToolCard } from '../components/ToolCard';
import { useApp } from '../context/AppContext';
import { TOOLS_DATA, CATEGORIES_DATA } from '../data/tools';
import { SearchX, Sparkles, Compass } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { searchQuery, selectedCategory, setSearchQuery } = useApp();

  // Filter tools based on search query and selected category
  const filteredTools = TOOLS_DATA.filter((tool) => {
    // Search query matching
    const matchesSearch =
      !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching (if no active search query)
    const matchesCategory =
      searchQuery || selectedCategory === 'all' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Hero with AI Input Box */}
      <HeroSection />

      {/* Main Workspace Tools Catalog */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Workspace Tool Catalog
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {searchQuery
                ? `Showing ${filteredTools.length} results for "${searchQuery}"`
                : '15 enterprise AI tools across 5 specialized cognitive domains'}
            </p>
          </div>

          <CategoryFilter />
        </div>

        {/* Tools Display */}
        {filteredTools.length > 0 ? (
          searchQuery || selectedCategory !== 'all' ? (
            // Flat grid when filtered or searched
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            // Grouped by Category on Default Home view for maximum clarity & scannability
            <div className="space-y-10">
              {CATEGORIES_DATA.map((cat) => {
                const categoryTools = TOOLS_DATA.filter((t) => t.category === cat.id);
                return (
                  <div key={cat.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {cat.label}
                        </h3>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          · {cat.description}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                        {categoryTools.length} tools
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {categoryTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          // Empty State for Search
          <div className="py-16 px-4 text-center max-w-md mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              No matching AI tools found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              We couldn&apos;t find any tools matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;code&rdquo;, &ldquo;writer&rdquo;, &ldquo;math&rdquo;, or reset filters.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Foundation Architecture Banner */}
        <div className="mt-12 p-6 bg-slate-900 dark:bg-slate-900/90 text-white rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">
                AI HUB 360 Scalable Architecture
              </h4>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Designed with modular TypeScript contracts, persistent local storage, and dark/light mode. New AI micro-tools can be registered in seconds via the centralized tool registry.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
              Phase 1 Active
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
