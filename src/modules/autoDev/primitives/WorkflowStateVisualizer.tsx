import React, { useState } from 'react';
import { Cpu, FileCode2, ShieldAlert, GitMerge, CheckCircle2, RefreshCw, ArrowRight, Layers } from 'lucide-react';

export interface WorkflowStep {
  id: 'analysis' | 'planning' | 'staging' | 'boundary';
  label: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'idle' | 'running' | 'success' | 'warning';
  details: string;
  durationMs: number;
}

export function WorkflowStateVisualizer() {
  const [activeStepId, setActiveStepId] = useState<string>('analysis');

  const steps: WorkflowStep[] = [
    {
      id: 'analysis',
      label: 'Analysis',
      subLabel: 'Symbol Navigation & AST',
      icon: Cpu,
      status: 'success',
      details: 'Memetakan 28 modul & 42 relasi AST impor dengan performa ~18ms',
      durationMs: 18,
    },
    {
      id: 'planning',
      label: 'Planning',
      subLabel: 'Memory & Blueprint',
      icon: FileCode2,
      status: 'success',
      details: 'Mengekstrak 3 aturan ADR & menghasilkan blueprint 2-fase eksekusi',
      durationMs: 340,
    },
    {
      id: 'staging',
      label: 'Staging',
      subLabel: 'Transactional Atomic Staging',
      icon: GitMerge,
      status: 'success',
      details: 'Menyiapkan pementasan atomic multi-berkas tanpa mutasi langsung',
      durationMs: 42,
    },
    {
      id: 'boundary',
      label: 'Boundary Enforcement',
      subLabel: 'Living Rules Check',
      icon: ShieldAlert,
      status: 'success',
      details: '0 Pelanggaran batas seluler (<125 baris/berkas & isolasi modul)',
      durationMs: 12,
    },
  ];

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div className="p-3 bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 text-white rounded-xl border border-indigo-900/60 shadow-sm flex flex-col gap-2.5 text-xs">
      <div className="flex items-center justify-between border-b border-indigo-800/40 pb-2">
        <div className="flex items-center gap-1.5 font-bold">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-indigo-100">Auto-Dev Workflow State Visualizer</span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Pipeline Active</span>
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = step.id === activeStepId;
          return (
            <button
              key={`wf-step-${step.id}-${idx}`}
              onClick={() => setActiveStepId(step.id)}
              className={`p-2 rounded-xl border transition-all text-left flex flex-col gap-1 cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md ring-1 ring-indigo-400'
                  : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[8.5px] font-mono text-emerald-400 font-bold">{step.durationMs}ms</span>
              </div>
              <div>
                <h4 className="font-bold text-[10.5px] text-zinc-100 leading-tight">{step.label}</h4>
                <p className="text-[8.5px] text-zinc-400 font-medium truncate">{step.subLabel}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Details Banner */}
      <div className="p-2 bg-black/40 border border-indigo-800/40 rounded-lg flex items-center justify-between text-[10px] text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="font-bold font-mono text-indigo-300 uppercase tracking-wider">[{activeStep.label}]</span>
          <span className="font-medium text-zinc-200">{activeStep.details}</span>
        </div>
        <span className="text-[9px] font-mono text-zinc-400">Target: All Modules</span>
      </div>
    </div>
  );
}
