# Aplikasi Catatan Pribadi

Aplikasi catatan pribadi berbasis React yang dibangun sebagai submission untuk kelas **Belajar Membuat Aplikasi Web dengan React**.

## Live Demo

Anda dapat melihat live demo dari projek ini di link berikut.
[https://belajar-membuat-web-dengan-react.netlify.app](https://belajar-membuat-web-dengan-react.netlify.app)

## Fitur

- Tambah catatan baru dengan judul dan isi
- Hapus catatan
- Arsipkan & batalkan arsip catatan
- Pencarian catatan secara real-time (case-insensitive)
- Highlight kata kunci pencarian pada judul dan isi
- Pengelompokan catatan berdasarkan bulan dan tahun
- Character counter dinamis pada input judul (maks. 50 karakter)
- Validasi form: isi catatan minimal 10 karakter

## Teknologi

- React
- Vite
- JavaScript ES6+

## Cara Menjalankan

### Prasyarat

- Node.js versi 18 atau lebih baru

### Instalasi

```bash
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Build

```bash
npm run build
```

## Struktur Komponen

```
src/
└── components/
    ├── App.jsx              # Root component, state management
    ├── NoteSearch.jsx       # Input pencarian
    ├── NoteInput.jsx        # Form tambah catatan
    ├── NotesList.jsx        # Daftar catatan dengan grouping bulan-tahun
    ├── NoteItem.jsx         # Item catatan individual
    └── NoteActionButton.jsx # Tombol aksi reusable (hapus / arsip)
```

## AI Attribution / Acknowledgements

Dalam pengerjaan proyek ini, saya menggunakan bantuan AI untuk:

- **Membuat file README.md** – AI menulis dokumentasi proyek, termasuk cara penggunaan, instalasi, dan fitur utama.
- **Menambahkan contoh data di file `index.js`** – AI menyarankan data contoh untuk mempermudah pengujian.
- **Brainstorming fitur** – AI membantu memverifikasi ide untuk aplikasi.
