# Modul Auto-Dev Engine

## Deskripsi Ringkas
Modul orkestrasi otomatis yang menggabungkan 5 poin infrastruktur utama (Symbol Navigation, Blast-Radius, Architectural Memory, Transactional Staging, dan Boundary Enforcement) ke dalam satu pipa eksekusi (*pipeline*) terotomatisasi berbasis instruksi bahasa alami.

## Komponen
- `primitives/AutoDevModal.tsx`: Modal visualisasi eksekusi *stage-by-stage* Auto-Dev.
- `primitives/WorkflowStateVisualizer.tsx`: Diagram alur interaktif (*real-time flow diagram*) pada AiAgentDashboard.
- `primitives/AutoDevProposalCard.tsx`: Tampilan proposal sintetis kode AI.
- `primitives/AutoDevArchitectureVisualizer.tsx`: Peta dampak arsitektur berkas target.
- `logic/useAutoDev.ts`: Custom React hook pengelola state eksekusi Auto-Dev.
- `storage/autoDevApi.ts`: Client API pemicu pipa eksekusi Auto-Dev di backend.
