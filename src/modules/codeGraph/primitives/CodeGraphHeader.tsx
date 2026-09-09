import React from 'react';
import { Network, X } from 'lucide-react';

interface CodeGraphHeaderProps {
  onClose: () => void;
}

export function CodeGraphHeader({ onClose }: CodeGraphHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
          <Network className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-zinc-900 leading-none">Code Graph &amp; AST Symbol Explorer</h3>
          <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
            LSP Engine: Navigasi dependensi DAG, pencarian referensi simbol, &amp; resolver tipe instan
          </p>
        </div>
      </div>
      <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
