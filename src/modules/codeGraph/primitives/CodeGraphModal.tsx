import React from 'react';
import { useCodeGraph } from '../logic/useCodeGraph';
import { CodeGraphNodeCard } from './CodeGraphNodeCard';
import { CodeGraphDetail } from './CodeGraphDetail';
import { SymbolReferencesView } from './SymbolReferencesView';
import { TypeDefinitionView } from './TypeDefinitionView';
import { Network, X, Search, RefreshCw, AlertTriangle, Layers, Hash, Code2 } from 'lucide-react';

interface CodeGraphModalProps {
  onClose: () => void;
}

export function CodeGraphModal({ onClose }: CodeGraphModalProps) {
  const {
    data,
    loading,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    filteredNodes,
    symbolQuery,
    setSymbolQuery,
    symbolResult,
    searchReferences,
    typeQuery,
    setTypeQuery,
    typeResult,
    resolveType,
    refreshGraph,
  } = useCodeGraph();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 border border-zinc-200 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-hidden text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-900 leading-none">Code Graph & AST Symbol Explorer</h3>
              <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                LSP Engine: Navigasi dependensi DAG, pencarian referensi simbol, & resolver tipe instan
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
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

        {activeTab === 'graph' && (
          <>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Cari modul atau berkas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 overflow-hidden min-h-[260px]">
              <div className="overflow-y-auto flex flex-col gap-1.5 pr-1 max-h-[340px]">
                {filteredNodes.map((node) => (
                  <CodeGraphNodeCard
                    key={node.id}
                    node={node}
                    isSelected={node.id === selectedNodeId}
                    onSelect={setSelectedNodeId}
                  />
                ))}
              </div>
              <CodeGraphDetail node={selectedNode} />
            </div>
          </>
        )}

        {activeTab === 'references' && (
          <SymbolReferencesView
            query={symbolQuery}
            setQuery={setSymbolQuery}
            result={symbolResult}
            loading={loading}
            onSearch={searchReferences}
          />
        )}

        {activeTab === 'typedef' && (
          <TypeDefinitionView
            query={typeQuery}
            setQuery={setTypeQuery}
            result={typeResult}
            loading={loading}
            onResolve={resolveType}
          />
        )}
      </div>
    </div>
  );
}
