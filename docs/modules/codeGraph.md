# Modul Code Graph & AST Explorer

## Deskripsi Ringkas
Mesin penjelajah dependensi berkas (DAG) berbasis AST dan LSP symbol resolver untuk mencari referensi simbol serta menyelesaikan tipe data (*type-definition*).

## Komponen
- `primitives/CodeGraphModal.tsx`: Modal navigasi grafik dependensi dan simbol AST.
- `primitives/CodeGraphHeader.tsx`: Header informasi mesin LSP Code Graph.
- `primitives/CodeGraphTabs.tsx`: Tab pemilih mode (Graph, References, TypeDef).
- `primitives/SymbolReferencesView.tsx`: Pencari referensi simbol dan fungsi.
- `primitives/TypeDefinitionView.tsx`: Resolver definisi tipe TypeScript/JS.
