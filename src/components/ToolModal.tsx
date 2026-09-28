import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Play,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Info,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToolModal: React.FC = () => {
  const { activeModalTool, closeToolModal, isFavorite, toggleFavorite, addHistory, showToast } = useApp();

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize input values when modal opens
  useEffect(() => {
    if (activeModalTool) {
      const initial: Record<string, string> = {};
      activeModalTool.inputSpecs.forEach((spec) => {
        initial[spec.id] = spec.defaultValue || '';
      });
      setInputValues(initial);
      setOutput(null);
      setIsRunning(false);
      setCopied(false);
    }
  }, [activeModalTool]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeToolModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeToolModal]);

  if (!activeModalTool) return null;

  const favorite = isFavorite(activeModalTool.id);

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleApplySamplePrompt = (prompt: string) => {
    const primaryInputId = activeModalTool.inputSpecs[0]?.id;
    if (primaryInputId) {
      setInputValues((prev) => ({ ...prev, [primaryInputId]: prompt }));
      showToast('Sample prompt applied', 'info');
    }
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate sandbox compilation / processing (500ms)
    setTimeout(() => {
      setIsRunning(false);
      setOutput(activeModalTool.defaultMockOutput);
      addHistory(
        'launch_tool',
        `Executed test sandbox simulation for ${activeModalTool.name}`,
        activeModalTool.id,
        activeModalTool.name
      );
      showToast('Sandbox preview generated', 'success');
    }, 600);
  };

  const handleCopyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast('Copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {activeModalTool.categoryLabel}
              </div>
              <h2
                id="modal-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {activeModalTool.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(activeModalTool.id)}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors ${
                favorite
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                  : 'text-slate-400 hover:text-rose-500'
              }`}
              aria-label={favorite ? 'Remove favorite' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={closeToolModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Phase 1 Notice Banner */}
          <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60 rounded-2xl flex items-start gap-3">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Phase 1 Architecture Foundation Ready:{' '}
              </span>
              This workspace has been modeled with production-grade input schema contracts and validation. Live model inference pipeline attaches in Phase 2. You can test parameters and run sandbox preview below.
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalTool.longDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              {activeModalTool.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Prompt Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Preset Prompt Starters
            </label>
            <div className="flex flex-wrap gap-2">
              {activeModalTool.samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplySamplePrompt(prompt)}
                  className="text-left text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl transition-colors border border-slate-200/60 dark:border-slate-700/60"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Input Specs */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {activeModalTool.inputSpecs.map((spec) => (
              <div key={spec.id} className="space-y-1.5">
                <label
                  htmlFor={spec.id}
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {spec.label}
                </label>

                {spec.type === 'textarea' ? (
                  <textarea
                    id={spec.id}
                    rows={4}
                    value={inputValues[spec.id] || ''}
                    onChange={(e) => handleInputChange(spec.id, e.target.value)}
                    placeholder={spec.placeholder}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : spec.type === 'select' ? (
                  <select
                    id={spec.id}
                    value={inputValues[spec.id] || ''}
                    onChange={(e) => handleInputChange(spec.id, e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {spec.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={spec.id}
                    type="text"
                    value={inputValues[spec.id] || ''}
                    onChange={(e) => handleInputChange(spec.id, e.target.value)}
                    placeholder={spec.placeholder}
                    className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Test Run Action Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                const initial: Record<string, string> = {};
                activeModalTool.inputSpecs.forEach((spec) => {
                  initial[spec.id] = spec.defaultValue || '';
                });
                setInputValues(initial);
                setOutput(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Values</span>
            </button>

            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Executing Sandbox...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Run Sandbox Simulation</span>
                </>
              )}
            </button>
          </div>

          {/* Sandbox Output Preview Container */}
          {output && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Sandbox Engine Output
                </span>
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 border border-slate-200 dark:border-slate-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-white dark:bg-slate-950 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap overflow-x-auto border border-slate-200/80 dark:border-slate-800">
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
