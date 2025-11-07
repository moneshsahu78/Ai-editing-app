import React from 'react';
import { Edit3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 md:px-8 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Edit3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">AI Image Editor</h1>
          <p className="text-sm text-gray-400">Edit images with text prompts using Gemini</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
