# Personal Notes App (Phase 2)

Aplikasi catatan pribadi berbasis React yang sudah di-upgrade ke **Phase 2** dengan integrasi REST API Dicoding, autentikasi pengguna, proteksi halaman, tema, bahasa, dan UI neo-brutalism yang lebih clean.

## Live Demo

Anda dapat melihat live demo dari projek ini di link berikut.
[https://belajar-membuat-web-dengan-react.netlify.app](https://belajar-membuat-web-dengan-react.netlify.app)

## Fitur Utama

- Registrasi dan login user via API.
- Menyimpan access token ke `localStorage`.
- Proteksi route (halaman notes/detail hanya untuk user login).
- Logout dan reset sesi.
- Menampilkan catatan aktif & arsip dari API.
- Tambah, hapus, arsip, batal arsip catatan.
- Halaman detail catatan (`/notes/:id`).
- Pencarian real-time + highlight keyword.
- Grouping catatan per bulan/tahun.
- Validasi input catatan (judul max 50 karakter, isi minimal 10 karakter).
- Loading indicator untuk proses fetch data.
- Ubah tema `light/dark` dengan persistensi.
- Ubah bahasa `id/en` dengan persistensi.

## Stack

- React
- React Router DOM
- Vite
- ESLint (Dicoding config)
- Fetch API

## Integrasi API

Semua helper API ada di:

- `src/utils/network-data.js`

Helper yang digunakan:

- `register`, `login`, `getUserLogged`
- `getActiveNotes`, `getArchivedNotes`, `getNote`
- `addNote`, `deleteNote`, `archiveNote`, `unarchiveNote`
- `getAccessToken`, `putAccessToken`

Base URL API:

- `https://notes-api.dicoding.dev/v1`

## Struktur Singkat

```bash
src/
├── App.jsx
├── components/
├── contexts/
├── hooks/
├── pages/
├── styles/
└── utils/
    ├── dictionaries.js
    ├── index.js
    └── network-data.js
```

## Routing

- `/login` → halaman login
- `/register` → halaman registrasi
- `/notes` → daftar catatan (protected)
- `/notes/:id` → detail catatan (protected)

## Menjalankan Project

### Prasyarat

- Node.js 18+

### Instalasi

```bash
npm install
```

### Development

```bash
npm run dev
```

Buka: `http://localhost:5173`

### Build Production

```bash
npm run build
```

### Preview Build

```bash
npm run serve
```

## Penyimpanan Lokal

Aplikasi menggunakan `localStorage` untuk:

- `accessToken`
- `theme`
- `locale`

## AI Attribution / Acknowledgements

Dalam pengerjaan proyek ini, saya menggunakan bantuan AI sebagai **asisten**, dengan batasan bahwa keputusan akhir, penyesuaian, pengerjaan, dan validasi tetap dilakukan secara manual.

Ruang lingkup bantuan AI:

- **Perencanaan implementasi Phase 2**: membantu merinci langkah kerja untuk auth, protected route, context, dan integrasi API.
- **Refactor & dokumentasi kode**: membantu mempercepat penulisan ulang komponen dan pembaruan `README.md`.
