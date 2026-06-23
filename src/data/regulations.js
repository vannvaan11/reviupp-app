// Database Peraturan untuk Reviu PPUPD
// Setiap regulasi memiliki keywords untuk pencocokan otomatis

export const REGULATIONS_DB = [
  // ==============================
  // KEUANGAN DAERAH
  // ==============================
  {
    id: 'uu-17-2003',
    kode: 'UU No. 17 Tahun 2003',
    judul: 'Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara',
    kategori: 'Keuangan Negara/Daerah',
    keywords: ['keuangan negara', 'keuangan daerah', 'anggaran', 'apbn', 'apbd', 'belanja', 'pendapatan', 'pembiayaan', 'pertanggungjawaban keuangan'],
  },
  {
    id: 'uu-1-2004',
    kode: 'UU No. 1 Tahun 2004',
    judul: 'Undang-Undang Nomor 1 Tahun 2004 tentang Perbendaharaan Negara',
    kategori: 'Keuangan Negara/Daerah',
    keywords: ['perbendaharaan', 'kas daerah', 'rekening', 'bendahara', 'pengguna anggaran', 'kuasa pengguna anggaran', 'ppa', 'kpa', 'spm', 'sp2d', 'tagihan'],
  },
  {
    id: 'uu-15-2004',
    kode: 'UU No. 15 Tahun 2004',
    judul: 'Undang-Undang Nomor 15 Tahun 2004 tentang Pemeriksaan Pengelolaan dan Tanggung Jawab Keuangan Negara',
    kategori: 'Pemeriksaan',
    keywords: ['pemeriksaan keuangan', 'bpk', 'audit', 'pemeriksaan laporan keuangan', 'lhp', 'laporan hasil pemeriksaan'],
  },
  {
    id: 'pp-12-2019',
    kode: 'PP No. 12 Tahun 2019',
    judul: 'Peraturan Pemerintah Nomor 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah',
    kategori: 'Keuangan Negara/Daerah',
    keywords: ['pengelolaan keuangan daerah', 'apbd', 'anggaran daerah', 'belanja daerah', 'pendapatan daerah', 'rkpd', 'rka', 'dpa', 'dppa', 'tapd', 'ppkd', 'skpd'],
  },
  {
    id: 'permendagri-77-2020',
    kode: 'Permendagri No. 77 Tahun 2020',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 77 Tahun 2020 tentang Pedoman Teknis Pengelolaan Keuangan Daerah',
    kategori: 'Keuangan Negara/Daerah',
    keywords: ['pedoman teknis keuangan daerah', 'rka-skpd', 'dpa-skpd', 'penatausahaan keuangan', 'spm', 'sp2d', 'bku', 'laporan keuangan skpd', 'apbd'],
  },

  // ==============================
  // PENGADAAN BARANG/JASA
  // ==============================
  {
    id: 'pp-16-2018',
    kode: 'Perpres No. 16 Tahun 2018',
    judul: 'Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah',
    kategori: 'Pengadaan Barang/Jasa',
    keywords: ['pengadaan barang jasa', 'tender', 'lelang', 'pbj', 'lpse', 'pokja', 'ukpbj', 'kontrak pengadaan', 'hps', 'ppk', 'pejabat pengadaan', 'pengadaan langsung'],
  },
  {
    id: 'perpres-12-2021',
    kode: 'Perpres No. 12 Tahun 2021',
    judul: 'Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Atas Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah',
    kategori: 'Pengadaan Barang/Jasa',
    keywords: ['pengadaan barang jasa', 'perpres 16 2018', 'perubahan pengadaan', 'tender', 'kontrak'],
  },
  {
    id: 'perlem-lkpp-12-2021',
    kode: 'Perlem LKPP No. 12 Tahun 2021',
    judul: 'Peraturan Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah Nomor 12 Tahun 2021 tentang Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah melalui Penyedia',
    kategori: 'Pengadaan Barang/Jasa',
    keywords: ['pengadaan melalui penyedia', 'surat perjanjian pengadaan', 'kontrak kerja', 'spmk', 'bast', 'addendum kontrak', 'spk'],
  },

  // ==============================
  // SURAT KEPUTUSAN / KEPEGAWAIAN
  // ==============================
  {
    id: 'uu-5-2014',
    kode: 'UU No. 5 Tahun 2014',
    judul: 'Undang-Undang Nomor 5 Tahun 2014 tentang Aparatur Sipil Negara',
    kategori: 'Kepegawaian',
    keywords: ['asn', 'aparatur sipil negara', 'pns', 'pppk', 'pegawai negeri', 'jabatan', 'karir asn', 'manajemen asn', 'pengangkatan', 'pemberhentian', 'mutasi'],
  },
  {
    id: 'pp-11-2017',
    kode: 'PP No. 11 Tahun 2017',
    judul: 'Peraturan Pemerintah Nomor 11 Tahun 2017 tentang Manajemen Pegawai Negeri Sipil',
    kategori: 'Kepegawaian',
    keywords: ['manajemen pns', 'pengangkatan pns', 'kenaikan pangkat', 'promosi jabatan', 'rotasi', 'mutasi pns', 'pensiun pns', 'formasi', 'sk kepegawaian'],
  },
  {
    id: 'pp-49-2018',
    kode: 'PP No. 49 Tahun 2018',
    judul: 'Peraturan Pemerintah Nomor 49 Tahun 2018 tentang Manajemen Pegawai Pemerintah dengan Perjanjian Kerja',
    kategori: 'Kepegawaian',
    keywords: ['pppk', 'pegawai perjanjian kerja', 'p3k', 'kontrak pppk', 'manajemen pppk'],
  },
  {
    id: 'permendagri-108-2017',
    kode: 'Permenpan-RB No. 17 Tahun 2021',
    judul: 'Peraturan Menteri PANRB Nomor 17 Tahun 2021 tentang Penyetaraan Jabatan Administrasi ke dalam Jabatan Fungsional',
    kategori: 'Kepegawaian',
    keywords: ['penyetaraan jabatan', 'jabatan fungsional', 'jabatan administrasi', 'jabatan struktural', 'sk jabatan'],
  },

  // ==============================
  // ORGANISASI & KELEMBAGAAN
  // ==============================
  {
    id: 'pp-18-2016',
    kode: 'PP No. 18 Tahun 2016',
    judul: 'Peraturan Pemerintah Nomor 18 Tahun 2016 tentang Perangkat Daerah',
    kategori: 'Organisasi/Kelembagaan',
    keywords: ['perangkat daerah', 'opd', 'organisasi perangkat daerah', 'dinas', 'badan', 'kecamatan', 'kelurahan', 'sekretariat daerah', 'struktur organisasi', 'sotk'],
  },
  {
    id: 'permendagri-5-2017',
    kode: 'Permendagri No. 5 Tahun 2017',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 5 Tahun 2017 tentang Pedoman Nomenklatur Perangkat Daerah Provinsi dan Daerah Kabupaten/Kota yang Mempunyai Ciri Khusus',
    kategori: 'Organisasi/Kelembagaan',
    keywords: ['nomenklatur perangkat daerah', 'nama opd', 'struktur organisasi', 'sotk'],
  },

  // ==============================
  // PENGAWASAN INTERNAL / APIP
  // ==============================
  {
    id: 'pp-60-2008',
    kode: 'PP No. 60 Tahun 2008',
    judul: 'Peraturan Pemerintah Nomor 60 Tahun 2008 tentang Sistem Pengendalian Intern Pemerintah',
    kategori: 'Pengawasan Internal',
    keywords: ['spip', 'sistem pengendalian intern', 'pengendalian internal', 'apip', 'pengawasan intern', 'audit intern', 'reviu laporan keuangan', 'reviu internal'],
  },
  {
    id: 'permenpan-rb-5-2021',
    kode: 'Permenpan-RB No. 5 Tahun 2021',
    judul: 'Peraturan Menteri PANRB Nomor 5 Tahun 2021 tentang Pedoman Pengawasan Intern',
    kategori: 'Pengawasan Internal',
    keywords: ['pengawasan intern', 'apip', 'audit intern', 'reviu', 'pemantauan', 'evaluasi', 'inspektorat'],
  },
  {
    id: 'permendagri-88-2022',
    kode: 'Permendagri No. 88 Tahun 2022',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 88 Tahun 2022 tentang Pengawasan Penyelenggaraan Pemerintahan Daerah',
    kategori: 'Pengawasan Internal',
    keywords: ['pengawasan daerah', 'ppupd', 'pengawasan pemerintahan', 'inspektorat daerah', 'pengawasan internal daerah'],
  },

  // ==============================
  // SURAT PERJANJIAN / KONTRAK
  // ==============================
  {
    id: 'kuhperdata-1320',
    kode: 'KUHPerdata Pasal 1320-1338',
    judul: 'Kitab Undang-Undang Hukum Perdata - Syarat Sahnya Perjanjian',
    kategori: 'Hukum Perjanjian',
    keywords: ['surat perjanjian', 'kontrak', 'perjanjian kerjasama', 'mou', 'moa', 'pks', 'syarat perjanjian', 'hukum perdata', 'perikatan'],
  },
  {
    id: 'uu-2-2017',
    kode: 'UU No. 2 Tahun 2017',
    judul: 'Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi',
    kategori: 'Jasa Konstruksi',
    keywords: ['jasa konstruksi', 'kontrak konstruksi', 'pekerjaan konstruksi', 'kontraktor', 'konsultan perencana', 'konsultan pengawas', 'bangunan gedung', 'infrastruktur'],
  },

  // ==============================
  // ASET DAERAH
  // ==============================
  {
    id: 'pp-28-2020',
    kode: 'PP No. 28 Tahun 2020',
    judul: 'Peraturan Pemerintah Nomor 28 Tahun 2020 tentang Pengelolaan Barang Milik Negara/Daerah',
    kategori: 'Aset Daerah',
    keywords: ['barang milik daerah', 'bmd', 'aset daerah', 'inventaris', 'pemanfaatan bmd', 'penghapusan aset', 'pemindahtanganan aset', 'sewa aset', 'kerjasama pemanfaatan'],
  },
  {
    id: 'permendagri-19-2016',
    kode: 'Permendagri No. 19 Tahun 2016',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 19 Tahun 2016 tentang Pedoman Pengelolaan Barang Milik Daerah',
    kategori: 'Aset Daerah',
    keywords: ['pengelolaan barang milik daerah', 'bmd', 'aset tetap', 'penatausahaan aset', 'penyusutan aset', 'sensus barang daerah'],
  },

  // ==============================
  // HIBAH & BANSOS
  // ==============================
  {
    id: 'permendagri-99-2019',
    kode: 'Permendagri No. 99 Tahun 2019',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 99 Tahun 2019 tentang Perubahan Kelima Atas Peraturan Menteri Dalam Negeri Nomor 32 Tahun 2011 tentang Pedoman Pemberian Hibah dan Bantuan Sosial',
    kategori: 'Hibah & Bansos',
    keywords: ['hibah', 'bantuan sosial', 'bansos', 'belanja hibah', 'belanja bansos', 'nphd', 'penerima hibah', 'pertanggungjawaban hibah'],
  },

  // ==============================
  // PERJALANAN DINAS
  // ==============================
  {
    id: 'permendagri-26-2019',
    kode: 'Permendagri No. 26 Tahun 2019',
    judul: 'Peraturan Menteri Dalam Negeri Nomor 26 Tahun 2019 tentang Perjalanan Dinas dan Biaya Pemindahan ke dalam Daerah bagi Pejabat Daerah, Pegawai Negeri Sipil Daerah, dan Pegawai Lainnya',
    kategori: 'Perjalanan Dinas',
    keywords: ['perjalanan dinas', 'sppd', 'biaya perjalanan', 'uang harian', 'tiket pesawat', 'uang representasi', 'biaya penginapan'],
  },

  // ==============================
  // PEMERINTAHAN DAERAH (UMUM)
  // ==============================
  {
    id: 'uu-23-2014',
    kode: 'UU No. 23 Tahun 2014',
    judul: 'Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah',
    kategori: 'Pemerintahan Daerah',
    keywords: ['pemerintahan daerah', 'pemda', 'kewenangan daerah', 'urusan pemerintahan', 'otonomi daerah', 'kepala daerah', 'dprd', 'perda', 'peraturan daerah'],
  },
].map(reg => {
  // Secara otomatis membuat URL pencarian ke BPK RI menggunakan kode atau judul
  const searchQuery = encodeURIComponent(reg.kode);
  return {
    ...reg,
    url: `https://peraturan.bpk.go.id/Search?q=${searchQuery}`
  };
});

// ==============================
// FUNGSI PENCARIAN PERATURAN
// ==============================

/**
 * Cari peraturan berdasarkan perihal/judul yang dimasukkan
 * @param {string} perihal - Judul atau perihal reviu
 * @returns {Array} - Daftar regulasi yang relevan, diurutkan berdasarkan skor relevansi
 */
export function searchRegulations(perihal) {
  if (!perihal || perihal.trim() === '') return [];

  const searchTerms = perihal.toLowerCase().split(/\s+/).filter(t => t.length > 2);

  const scored = REGULATIONS_DB.map(reg => {
    let score = 0;
    const allText = [...reg.keywords, reg.judul.toLowerCase(), reg.kategori.toLowerCase()];

    searchTerms.forEach(term => {
      allText.forEach(kw => {
        if (kw.includes(term)) score += kw === term ? 3 : 1;
      });
    });

    return { ...reg, score };
  });

  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

/**
 * Dapatkan semua kategori unik
 */
export function getCategories() {
  return [...new Set(REGULATIONS_DB.map(r => r.kategori))];
}
