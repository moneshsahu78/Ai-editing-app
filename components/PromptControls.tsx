import React from 'react';
import { Sparkles, LoaderCircle, XCircle } from 'lucide-react';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onClear: () => void;
}

const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onGenerate, isLoading, onClear }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-white">Describe your edit</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add a retro cinematic filter'"
          className="flex-grow w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
          disabled={isLoading}
        />
        <div className="flex gap-2">
            <button
                onClick={onGenerate}
                disabled={isLoading || !prompt.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-900/50"
            >
                {isLoading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                ) : (
                    <Sparkles className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Generating...' : 'Generate'}</span>
            </button>
             <button
                onClick={onClear}
                title="Start over"
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                <XCircle className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromptControls;
