import React from 'react';
import { Network, Hash, Code2 } from 'lucide-react';

interface CodeGraphTabsProps {
  activeTab: 'graph' | 'references' | 'typedef';
  setActiveTab: (tab: 'graph' | 'references' | 'typedef') => void;
}

export function CodeGraphTabs({ activeTab, setActiveTab }: CodeGraphTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
      <button
        onClick={() => setActiveTab('graph')}
        className={`flex-1 py-1 px-2 rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          activeTab === 'graph' ? 'bg-white text-indigo-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        <Network className="w-3 h-3" />
        <span>AST Dependency Graph</span>
      </button>
      <button
        onClick={() => setActiveTab('references')}
        className={`flex-1 py-1 px-2 rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          activeTab === 'references' ? 'bg-white text-indigo-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        <Hash className="w-3 h-3" />
        <span>Find References</span>
      </button>
      <button
        onClick={() => setActiveTab('typedef')}
        className={`flex-1 py-1 px-2 rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          activeTab === 'typedef' ? 'bg-white text-indigo-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        <Code2 className="w-3 h-3" />
        <span>Type-Definition Resolver</span>
      </button>
    </div>
  );
}
