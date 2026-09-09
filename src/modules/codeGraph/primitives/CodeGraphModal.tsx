import React from 'react';
import { useCodeGraph } from '../logic/useCodeGraph';
import { CodeGraphNodeCard } from './CodeGraphNodeCard';
import { CodeGraphDetail } from './CodeGraphDetail';
import { SymbolReferencesView } from './SymbolReferencesView';
import { TypeDefinitionView } from './TypeDefinitionView';
import { CodeGraphHeader } from './CodeGraphHeader';
import { CodeGraphTabs } from './CodeGraphTabs';
import { Search } from 'lucide-react';

interface CodeGraphModalProps {
  onClose: () => void;
}

export function CodeGraphModal({ onClose }: CodeGraphModalProps) {
  const {
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
  } = useCodeGraph();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 border border-zinc-200 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-hidden text-xs">
        <CodeGraphHeader onClose={onClose} />
        <CodeGraphTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
