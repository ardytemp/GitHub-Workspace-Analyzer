import { performHybridSearch } from './hybridSearchService';
import { scanCodeGraph } from './codeGraphService';
import { detectBreakingChangesInFile } from './breakingChangeDetectorService';
import { generateArchitecturalPlan } from './planEngineService';
import { getChangedOrCandidateFiles, scanFileStatically } from './preFlightScanner';
import { scanRepoLanguageFingerprint } from './languageSupportService';
import { AutoDevStageResult } from './autoDevTypes';

export async function runAnalysisStages(workspaceRoot: string, taskGoal: string): Promise<{ stages: AutoDevStageResult[]; graphFileCount: number }> {
  const stages: AutoDevStageResult[] = [];

  // Point 1: Symbol Navigation (AST & Symbol Resolution)
  const t1 = Date.now();
  const graph = scanCodeGraph(workspaceRoot);
  stages.push({
    stageId: 1,
    stageName: 'Symbol Navigation & AST Resolution',
    toolName: 'Code Graph Symbol Navigator',
    status: 'success',
    durationMs: Date.now() - t1,
    summary: `Symbol Navigation: Memetakan ${graph.totalFiles} modul & ${graph.totalDependencies} relasi AST`,
    details: { totalFiles: graph.totalFiles, totalDependencies: graph.totalDependencies },
  });

  // Point 2: Blast-Radius Analysis (Impact & Breaking Changes)
  const t2 = Date.now();
  const breaking = detectBreakingChangesInFile(workspaceRoot, 'src/modules/ai/logic/useAiChat.ts');
  stages.push({
    stageId: 2,
    stageName: 'Blast-Radius Impact Analysis',
    toolName: 'Blast-Radius Analyzer Engine',
    status: 'success',
    durationMs: Date.now() - t2,
    summary: `Blast-Radius: Menganalisis potensi dampak perubahan (${breaking.length} breaking changes)`,
    details: { breakingCount: breaking.length },
  });

  // Point 3: Architectural Memory (ADR Indexing & Knowledge)
  const t3 = Date.now();
  const adrs = performHybridSearch(workspaceRoot, taskGoal);
  stages.push({
    stageId: 3,
    stageName: 'Architectural Memory Retrieval',
    toolName: 'Architectural Memory Indexer',
    status: 'success',
    durationMs: Date.now() - t3,
    summary: `Architectural Memory: Mengambil ${adrs.length} aturan ADR & memori proyek`,
    details: { matchedCount: adrs.length, matchedTitles: adrs.map((r) => r.title) },
  });

  // Point 4: Transactional Staging & Architectural Planning
  const t4 = Date.now();
  const plan = await generateArchitecturalPlan(workspaceRoot, taskGoal);
  stages.push({
    stageId: 4,
    stageName: 'Transactional Staging & Plan Orchestration',
    toolName: 'Atomic Transactional Staging Engine',
    status: 'success',
    durationMs: Date.now() - t4,
    summary: `Transactional Staging: Menyusun ${plan.phases.length} fase eksekusi atomic (Risiko: ${plan.overallRisk.toUpperCase()})`,
    details: { phasesCount: plan.phases.length, risk: plan.overallRisk },
  });

  // Point 5: Boundary Enforcement (Pre-Flight Rules & Security Audit)
  const t5 = Date.now();
  const candidateFiles = getChangedOrCandidateFiles(workspaceRoot);
  let issueCount = 0;
  for (const file of candidateFiles) {
    issueCount += scanFileStatically(file, workspaceRoot).length;
  }
  stages.push({
    stageId: 5,
    stageName: 'Boundary Enforcement & Pre-Flight Rules',
    toolName: 'Living Architectural Boundary Enforcer',
    status: issueCount === 0 ? 'success' : 'warning',
    durationMs: Date.now() - t5,
    summary: issueCount === 0 ? `Boundary Enforcement: 0 Pelanggaran pada ${candidateFiles.length} berkas` : `Boundary Enforcement: Terdeteksi ${issueCount} pelanggaran batas`,
    details: { scannedFiles: candidateFiles.length, issueCount },
  });

  // Extra: Polyglot Language Scanner
  const t6 = Date.now();
  const fingerprint = scanRepoLanguageFingerprint(workspaceRoot);
  stages.push({
    stageId: 6,
    stageName: 'Polyglot Repository Fingerprint',
    toolName: 'Polyglot Language Fingerprint Analyzer',
    status: 'success',
    durationMs: Date.now() - t6,
    summary: `Fingerprint: ${fingerprint.breakdownText}`,
    details: { topLanguages: fingerprint.topLanguages },
  });

  return { stages, graphFileCount: graph.totalFiles };
}
