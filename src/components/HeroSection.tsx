import React, { useState } from 'react';
import { ArrowRight, Sparkles, CornerDownLeft, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_HERO_QUERIES } from '../data/tools';
import { ToolItem } from '../types';

export const HeroSection: React.FC = () => {
  const { findMatchingTool, openToolModal, addHistory, showToast } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [matchedTool, setMatchedTool] = useState<ToolItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const tool = findMatchingTool(inputValue);
    setMatchedTool(tool);

    addHistory(
      'ask_query',
      `Prompt inquiry: "${inputValue.trim()}"`,
      tool?.id,
      tool ? tool.name : 'AI HUB 360'
    );

    if (tool) {
      showToast(`Recommended engine: ${tool.name}`, 'info');
    }
  };

  const handleSelectSample = (sample: string) => {
    setInputValue(sample);
    const tool = findMatchingTool(sample);
    setMatchedTool(tool);
  };

  const handleLaunchMatched = () => {
    if (matchedTool) {
      openToolModal(matchedTool);
    }
  };

  return (
    <section className="relative pt-6 pb-10 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Decorative subtle backdrop radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none rounded-full -z-10" />

      {/* Hero Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto text-balance">
          Everything AI. <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">One powerful workspace.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-balance">
          Chat, learn, create, translate, code and work smarter in one place.
        </p>
      </div>

      {/* Prominent AI Input Box */}
      <div className="mt-8 max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-2 sm:p-2.5 transition-all focus-within:ring-2 focus-within:ring-indigo-500/70 focus-within:border-indigo-500"
        >
          <div className="pl-3 pr-2 text-indigo-500 dark:text-indigo-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (matchedTool) setMatchedTool(null);
            }}
            placeholder="Ask anything... (e.g. solve 2x^2 + 5x - 3 = 0, draft an article, debug code)"
            aria-label="Ask anything"
            className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none px-2"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Submit query"
          >
            <span>Ask</span>
            <CornerDownLeft className="w-4 h-4 hidden sm:inline" />
          </button>
        </form>

        {/* Intelligent Engine Route Match Card */}
        {matchedTool && (
          <div className="mt-4 p-3.5 bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 rounded-2xl text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5 sm:mt-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Matched Tool: {matchedTool.name}</span>
                  <span className="text-[11px] font-normal text-indigo-600 dark:text-indigo-400">
                    · {matchedTool.categoryLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  {matchedTool.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLaunchMatched}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors shrink-0 shadow-xs"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Sample Prompt Starters */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Try:</span>
          </span>
          {SAMPLE_HERO_QUERIES.slice(0, 4).map((query, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSample(query)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-800 px-2.5 py-1 rounded-lg transition-colors border border-slate-200/50 dark:border-slate-700/50"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
