# Modul Atomic Transactional Staging

## Deskripsi Ringkas
Sistem pementasan transaksi perbaikan berkas secara *atomic* dan pengujian bertarget sebelum dilakukan pengaplikasian langsung ke repositori.

## Komponen
- `primitives/AtomicStagingModal.tsx`: Tampilan pementasan transaksi multi-berkas.
- `primitives/TargetedTestRunnerView.tsx`: Eksekutor pengujian bertarget pada berkas ter-stage.
