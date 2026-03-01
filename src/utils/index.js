const getInitialData = () => [
  {
    id: 1,
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2025-04-01T04:27:34.572Z",
    archived: false,
  },
  {
    id: 2,
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2025-04-02T04:27:34.572Z",
    archived: false,
  },
  {
    id: 3,
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2025-04-03T04:27:34.572Z",
    archived: false,
  },
  {
    id: 4,
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2025-04-08T04:27:34.572Z",
    archived: false,
  },
  {
    id: 5,
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2025-05-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 6,
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2025-05-20T04:27:34.572Z",
    archived: false,
  },
  {
    id: 7,
    title: "Keindahan Alam",
    body: "Menikmati keindahan alam, seperti matahari terbenam atau pegunungan, dapat memberikan ketenangan jiwa dan mengurangi stres dalam kehidupan sehari-hari.",
    createdAt: "2025-05-25T04:27:34.572Z",
    archived: false,
  },
  {
    id: 8,
    title: "Membangun Kebiasaan Membaca",
    body: "Membaca buku secara rutin dapat memperkaya wawasan dan meningkatkan kreativitas. Cobalah untuk membaca setidaknya 20 menit setiap hari.",
    createdAt: "2025-06-01T04:27:34.572Z",
    archived: true,
  },
  {
    id: 9,
    title: "Kesehatan Mental",
    body: "Penting untuk menjaga kesehatan mental dengan cara seperti meditasi, berolahraga, atau hanya sekedar meluangkan waktu untuk diri sendiri.",
    createdAt: "2025-06-05T04:27:34.572Z",
    archived: false,
  },
  {
    id: 10,
    title: "Menjaga Hubungan Sosial",
    body: "Memelihara hubungan dengan teman dan keluarga adalah kunci kebahagiaan dan kesejahteraan. Luangkan waktu untuk berbicara dan saling mendukung.",
    createdAt: "2025-06-10T04:27:34.572Z",
    archived: true,
  },
];

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export { getInitialData, showFormattedDate };
