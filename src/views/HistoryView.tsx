import React, { useState } from 'react';
import {
  History as HistoryIcon,
  Trash2,
  Clock,
  Play,
  Search,
  Sliders,
  Heart,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HistoryActionType, HistoryItem } from '../types';

export const HistoryView: React.FC = () => {
  const { history, clearHistory, deleteHistoryItem, openToolModal, setActiveTab } = useApp();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredHistory = history.filter((item) => {
    if (filterAction === 'all') return true;
    return item.action === filterAction;
  });

  const getActionBadge = (action: HistoryActionType) => {
    switch (action) {
      case 'launch_tool':
        return { label: 'Tool Sandbox', icon: Play, color: 'text-indigo-600 dark:text-indigo-400' };
      case 'ask_query':
        return { label: 'Prompt Query', icon: HelpCircle, color: 'text-cyan-600 dark:text-cyan-400' };
      case 'search':
        return { label: 'Tool Search', icon: Search, color: 'text-emerald-600 dark:text-emerald-400' };
      case 'favorite_toggle':
        return { label: 'Favorite Saved', icon: Heart, color: 'text-rose-600 dark:text-rose-400' };
      case 'preference_change':
        return { label: 'Setting Change', icon: Sliders, color: 'text-amber-600 dark:text-amber-400' };
      default:
        return { label: 'Activity', icon: Clock, color: 'text-slate-500' };
    }
  };

  const formatTimestamp = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-indigo-500" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Activity History
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log of your workspace queries, sandbox runs, and tool interactions
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-medium transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Clear Activity History?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This will remove all {history.length} logged queries and tool launch records from your local storage. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      {history.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
          {['all', 'launch_tool', 'ask_query', 'favorite_toggle', 'preference_change'].map(
            (action) => (
              <button
                key={action}
                type="button"
                onClick={() => setFilterAction(action)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                  filterAction === action
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700'
                }`}
              >
                {action === 'all'
                  ? 'All Activities'
                  : action.replace('_', ' ')}
              </button>
            )
          )}
        </div>
      )}

      {/* History List or Empty State */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-2">
          {filteredHistory.map((item: HistoryItem) => {
            const badge = getActionBadge(item.action);
            const ActionIcon = badge.icon;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    <ActionIcon className={`w-4 h-4 ${badge.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.toolName}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        · {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono tabular-nums text-slate-400 dark:text-slate-500">
                    {formatTimestamp(item.timestamp)}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 px-4 text-center max-w-md mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 mx-auto flex items-center justify-center mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            No activity logged yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            As you ask questions in the hero input box and test tools in the sandbox, records will be saved here in your browser.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Exploring Tools
          </button>
        </div>
      )}
    </div>
  );
};
