# Modul AI Studio Pro Playground Suite

## Deskripsi Ringkas
Playground interaktif untuk menguji, membandingkan (*Arena Mode*), dan mengekspor prompt AI Studio Pro ke berbagai format SDK (Python, TypeScript, cURL) serta melakukan sintesis kode 1-klik.

## Komponen
- `primitives/PlaygroundModal.tsx`: Modal utama AI Studio Pro Playground dengan dukungan multi-sistem prompt.
- `primitives/ModelArenaCard.tsx`: Komponen kartu komparasi per performa model (latensi, token, output).
- `primitives/SdkExporterModal.tsx`: Modal penjelajah dan pengekspor SDK universal.
- `logic/usePlayground.ts`: State management eksekusi arena dan sintesis proposal.
- `storage/playgroundApi.ts`: Client API pengiriman prompt ke backend.
