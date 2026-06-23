// templates.js - Template laporan baku per jenis reviu

export const TEMPLATES = {
  sk: {
    judul_laporan: 'LAPORAN HASIL REVIU SURAT KEPUTUSAN',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        placeholder: 'Tuliskan dasar penugasan reviu, misalnya: Surat Tugas Nomor ..., tanggal ..., yang ditandatangani oleh ...',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ... yang diterbitkan oleh Inspektur ..., dalam rangka memenuhi permohonan reviu dari ... Nomor ... tanggal ..., perihal Permohonan Reviu ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        placeholder: 'Tuliskan tujuan dilaksanakannya reviu ini...',
        default_content: 'Reviu ini bertujuan untuk memberikan keyakinan terbatas bahwa Surat Keputusan tentang {perihal} telah disusun sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        placeholder: 'Tuliskan ruang lingkup reviu...',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas substansi, dasar hukum, dan prosedur penerbitan Surat Keputusan tentang {perihal}.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        placeholder: 'Dasar hukum yang digunakan (akan terisi otomatis dari pilihan regulasi)...',
        default_content: ''
      },
      {
        id: 'uraian_hasil',
        label: 'V. URAIAN HASIL REVIU',
        placeholder: 'Tuliskan uraian hasil reviu secara lengkap...',
        default_content: 'Berdasarkan hasil reviu yang telah dilakukan terhadap Surat Keputusan tentang {perihal}, dapat disampaikan hal-hal sebagai berikut:\n\n1. [Uraian temuan/hasil 1]\n\n2. [Uraian temuan/hasil 2]\n\n3. [Uraian temuan/hasil 3]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VI. SIMPULAN',
        placeholder: 'Tuliskan simpulan hasil reviu...',
        default_content: 'Berdasarkan hasil reviu terhadap Surat Keputusan tentang {perihal}, Tim Reviu menyimpulkan bahwa secara substansi dan prosedur, Surat Keputusan tersebut [telah/belum] sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VII. REKOMENDASI',
        placeholder: 'Tuliskan rekomendasi jika ada temuan yang perlu ditindaklanjuti...',
        default_content: 'Berdasarkan simpulan tersebut di atas, Tim Reviu merekomendasikan kepada {nama_opd} untuk:\n1. [Rekomendasi 1]\n2. [Rekomendasi 2]'
      },
    ]
  },

  sk_narasumber: {
    judul_laporan: 'LAPORAN HASIL REVIU',
    sections: [
      {
        id: 'pembuka',
        label: 'A. PEMBUKAAN & TUJUAN',
        placeholder: 'Yth... Menindaklanjuti...',
        default_content: 'Yth, Gubernur / Bupati / Walikota\nDi-\nTempat\n\nMenindaklanjuti surat Kepala {nama_opd} Nomor: ... tanggal ... perihal Permintaan Reviu terhadap usulan Surat Keputusan tentang {perihal}. Adapun hasil reviu kami sampaikan sebagai berikut:'
      },
      {
        id: 'tujuan_sk',
        label: 'B. TUJUAN SK (Poin 1)',
        default_content: '1. Usulan penetapan Surat Keputusan tentang {perihal} sebagaimana dimaksud bertujuan untuk memberikan edukasi, penyampaian materi, menjawab pertanyaan, serta memandu jalannya acara.'
      },
      {
        id: 'dasar_hukum',
        label: 'C. DASAR HUKUM (Poin 2 & 3)',
        default_content: '' 
      },
      {
        id: 'hasil_reviu',
        label: 'D. HASIL REVIU & ANALISIS (Poin 4)',
        default_content: 'Hasil reviu atas Usulan Surat Keputusan tentang {perihal} adalah sebagai berikut:\n\n[TABEL/DAFTAR NARASUMBER]\n1. Nama: ... | Jabatan: ... | Honorarium: ... | Ket: Sesuai\n2. Nama: ... | Jabatan: ... | Honorarium: ... | Ket: Sesuai\n\nBerdasarkan Standar Harga Satuan yang berlaku, honorarium narasumber tersebut telah sesuai dengan peraturan.\n\n[TABEL/DAFTAR PEMBAWA ACARA]\n1. Nama: ... | Jabatan: ... | Honorarium: ... | Ket: Sesuai\n\nBerdasarkan Standar Harga Satuan, honorarium Pembawa Acara tersebut tidak melebihi standar yang ditetapkan.',
        ai_assisted: true
      },
      {
        id: 'catatan_perbaikan',
        label: 'E. CATATAN PERBAIKAN (Poin 5)',
        default_content: 'Terdapat kesalahan pengetikan pada draft SK, yaitu tertulis kata "..." yang seharusnya ditulis "...". Dimohon kepada Satuan Kerja pemohon agar melakukan perbaikan redaksional sebelum dokumen ditetapkan lebih lanjut.'
      },
      {
        id: 'tanggung_jawab',
        label: 'F. PERNYATAAN TANGGUNG JAWAB (Poin 6)',
        default_content: 'Kebenaran dokumen dan data/informasi pendukung lainnya yang diserahkan sebagai bahan reviu, secara formil dan materil sepenuhnya menjadi tanggung jawab {nama_opd}.'
      },
      {
        id: 'kesimpulan_penutup',
        label: 'G. KESIMPULAN & PENUTUP',
        default_content: 'Berdasarkan uraian tersebut di atas, bahwa Usulan Surat Keputusan tentang {perihal} sudah sesuai dengan ketentuan yang berlaku dengan memperhatikan catatan perbaikan redaksional.\n\nDemikian kami sampaikan, atas perkenan pimpinan kami ucapkan terima kasih.',
        ai_assisted: true
      },
      {
        id: 'tembusan',
        label: 'H. TEMBUSAN',
        default_content: 'Tembusan :\n1. Pj. Sekretaris Daerah;\n2. Kepala {nama_opd}.'
      }
    ]
  },

  kegiatan: {
    judul_laporan: 'LAPORAN HASIL REVIU KEGIATAN',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        placeholder: 'Tuliskan dasar penugasan reviu...',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ... yang diterbitkan oleh Inspektur ..., dalam rangka memenuhi permohonan reviu dari ... Nomor ... tanggal ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        placeholder: 'Tuliskan tujuan reviu...',
        default_content: 'Reviu ini bertujuan untuk memberikan keyakinan terbatas bahwa pelaksanaan Kegiatan {perihal} telah sesuai dengan ketentuan peraturan perundang-undangan yang berlaku, dokumen perencanaan, dan anggaran yang telah ditetapkan.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        placeholder: 'Tuliskan ruang lingkup reviu...',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas:\na. Kesesuaian kegiatan dengan dokumen perencanaan (RKPD, Renja, DPA);\nb. Kesesuaian realisasi anggaran dengan ketentuan yang berlaku;\nc. Ketepatan sasaran dan output kegiatan;\nd. Kelengkapan pertanggungjawaban pelaksanaan kegiatan.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        placeholder: 'Dasar hukum...',
        default_content: ''
      },
      {
        id: 'gambaran_umum',
        label: 'V. GAMBARAN UMUM KEGIATAN',
        placeholder: 'Tuliskan gambaran umum kegiatan yang direviu...',
        default_content: 'Kegiatan {perihal} dilaksanakan oleh {nama_opd} dengan pagu anggaran sebesar Rp. ... yang bersumber dari APBD Tahun Anggaran ...'
      },
      {
        id: 'uraian_hasil',
        label: 'VI. URAIAN HASIL REVIU',
        placeholder: 'Tuliskan uraian hasil reviu...',
        default_content: 'Berdasarkan hasil reviu terhadap pelaksanaan Kegiatan {perihal}, dapat disampaikan hal-hal sebagai berikut:\n\nA. Perencanaan Kegiatan\n[Uraikan kesesuaian perencanaan]\n\nB. Pelaksanaan Kegiatan\n[Uraikan hasil pelaksanaan]\n\nC. Pertanggungjawaban Keuangan\n[Uraikan pertanggungjawaban keuangan]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VII. SIMPULAN',
        placeholder: 'Tuliskan simpulan...',
        default_content: 'Berdasarkan hasil reviu, Tim Reviu menyimpulkan bahwa pelaksanaan Kegiatan {perihal} secara umum [telah/belum] sesuai dengan ketentuan yang berlaku.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VIII. REKOMENDASI',
        placeholder: 'Tuliskan rekomendasi...',
        default_content: 'Tim Reviu merekomendasikan kepada {nama_opd} untuk:\n1. [Rekomendasi 1]\n2. [Rekomendasi 2]'
      },
    ]
  },

  surat_perjanjian: {
    judul_laporan: 'LAPORAN HASIL REVIU SURAT PERJANJIAN',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        placeholder: 'Tuliskan dasar penugasan reviu...',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ... yang diterbitkan oleh Inspektur ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        placeholder: 'Tuliskan tujuan reviu...',
        default_content: 'Reviu ini bertujuan untuk memberikan keyakinan terbatas bahwa Surat Perjanjian tentang {perihal} telah disusun sesuai dengan ketentuan peraturan perundang-undangan yang berlaku dan klausul-klausulnya tidak merugikan pihak Pemerintah Daerah.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        placeholder: 'Tuliskan ruang lingkup reviu...',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas:\na. Legalitas para pihak yang menandatangani perjanjian;\nb. Substansi dan klausul-klausul dalam perjanjian;\nc. Kesesuaian dengan peraturan perundang-undangan yang berlaku;\nd. Hak dan kewajiban para pihak.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        placeholder: 'Dasar hukum...',
        default_content: ''
      },
      {
        id: 'identitas_perjanjian',
        label: 'V. IDENTITAS SURAT PERJANJIAN',
        placeholder: 'Tuliskan identitas surat perjanjian...',
        default_content: 'Surat Perjanjian yang direviu adalah:\n- Judul/Perihal : {perihal}\n- Nomor Surat Perjanjian : ...\n- Tanggal : ...\n- Para Pihak : Pihak Pertama: ... / Pihak Kedua: ...\n- Nilai Perjanjian : Rp. ...\n- Jangka Waktu : ...'
      },
      {
        id: 'uraian_hasil',
        label: 'VI. URAIAN HASIL REVIU',
        placeholder: 'Tuliskan uraian hasil reviu...',
        default_content: 'Berdasarkan hasil penelaahan terhadap Surat Perjanjian tentang {perihal}, dapat disampaikan hal-hal sebagai berikut:\n\nA. Aspek Legalitas Para Pihak\n[Uraikan legalitas para pihak]\n\nB. Substansi Perjanjian\n[Uraikan substansi klausul perjanjian]\n\nC. Kesesuaian dengan Peraturan Perundang-Undangan\n[Uraikan kesesuaian]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VII. SIMPULAN',
        placeholder: 'Tuliskan simpulan...',
        default_content: 'Berdasarkan hasil reviu, Surat Perjanjian tentang {perihal} secara substansi [telah/belum] memenuhi syarat-syarat sahnya perjanjian sebagaimana diatur dalam ketentuan perundang-undangan yang berlaku.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VIII. REKOMENDASI',
        placeholder: 'Tuliskan rekomendasi...',
        default_content: 'Tim Reviu merekomendasikan kepada {nama_opd} untuk:\n1. [Rekomendasi 1]\n2. [Rekomendasi 2]'
      },
    ]
  },

  rka: {
    judul_laporan: 'LAPORAN HASIL REVIU RKA/RKPA',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        default_content: 'Reviu RKA/RKPA bertujuan untuk memberikan keyakinan terbatas bahwa RKA/RKPA yang disusun oleh {nama_opd} telah sesuai dengan peraturan perundang-undangan, RKPD, dan KUA-PPAS yang telah ditetapkan.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas:\na. Kesesuaian RKA-SKPD dengan KUA-PPAS;\nb. Kelengkapan dan kebenaran pengisian formulir RKA-SKPD;\nc. Kewajaran anggaran yang direncanakan;\nd. Kesesuaian dengan standar biaya.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        default_content: ''
      },
      {
        id: 'uraian_hasil',
        label: 'V. URAIAN HASIL REVIU',
        default_content: 'Berdasarkan hasil reviu terhadap RKA/RKPA {perihal}, diperoleh hal-hal sebagai berikut:\n\nA. Kesesuaian dengan KUA-PPAS\n[Uraikan]\n\nB. Kelengkapan Dokumen\n[Uraikan]\n\nC. Kewajaran Anggaran\n[Uraikan]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VI. SIMPULAN',
        default_content: 'Berdasarkan hasil reviu, RKA/RKPA {perihal} yang disusun oleh {nama_opd} secara umum [telah/belum] sesuai dengan ketentuan yang berlaku.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VII. REKOMENDASI',
        default_content: 'Tim Reviu merekomendasikan agar:\n1. [Rekomendasi 1]\n2. [Rekomendasi 2]'
      },
    ]
  },

  laporan_keuangan: {
    judul_laporan: 'LAPORAN HASIL REVIU LAPORAN KEUANGAN',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        default_content: 'Reviu ini bertujuan untuk memberikan keyakinan terbatas bahwa Laporan Keuangan {perihal} telah disajikan sesuai dengan Standar Akuntansi Pemerintahan (SAP) dan peraturan perundang-undangan yang berlaku.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas penyajian Laporan Realisasi Anggaran, Neraca, Laporan Operasional, dan Catatan atas Laporan Keuangan.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        default_content: ''
      },
      {
        id: 'uraian_hasil',
        label: 'V. URAIAN HASIL REVIU',
        default_content: 'Berdasarkan hasil reviu terhadap Laporan Keuangan {perihal}:\n\nA. Laporan Realisasi Anggaran\n[Uraikan]\n\nB. Neraca\n[Uraikan]\n\nC. Catatan atas Laporan Keuangan\n[Uraikan]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VI. SIMPULAN',
        default_content: 'Berdasarkan hasil reviu, Laporan Keuangan {perihal} secara umum [telah/belum] disajikan sesuai dengan SAP.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VII. REKOMENDASI',
        default_content: 'Tim Reviu merekomendasikan:\n1. [Rekomendasi 1]'
      },
    ]
  },

  lainnya: {
    judul_laporan: 'LAPORAN HASIL REVIU',
    sections: [
      {
        id: 'dasar_penugasan',
        label: 'I. DASAR PENUGASAN',
        default_content: 'Reviu ini dilaksanakan berdasarkan Surat Tugas Nomor ... tanggal ...'
      },
      {
        id: 'tujuan',
        label: 'II. TUJUAN REVIU',
        default_content: 'Reviu ini bertujuan untuk memberikan keyakinan terbatas bahwa {perihal} telah sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.'
      },
      {
        id: 'ruang_lingkup',
        label: 'III. RUANG LINGKUP',
        default_content: 'Ruang lingkup reviu meliputi penelaahan atas substansi dan kesesuaian {perihal} dengan peraturan perundang-undangan yang berlaku.'
      },
      {
        id: 'dasar_hukum',
        label: 'IV. DASAR HUKUM',
        default_content: ''
      },
      {
        id: 'uraian_hasil',
        label: 'V. URAIAN HASIL REVIU',
        default_content: 'Berdasarkan hasil reviu terhadap {perihal}, dapat disampaikan hal-hal sebagai berikut:\n\n1. [Uraian hasil 1]\n\n2. [Uraian hasil 2]',
        ai_assisted: true
      },
      {
        id: 'simpulan',
        label: 'VI. SIMPULAN',
        default_content: 'Berdasarkan hasil reviu, {perihal} secara umum [telah/belum] sesuai dengan ketentuan yang berlaku.',
        ai_assisted: true
      },
      {
        id: 'rekomendasi',
        label: 'VII. REKOMENDASI',
        default_content: 'Tim Reviu merekomendasikan:\n1. [Rekomendasi 1]'
      },
    ]
  }
};

/**
 * Dapatkan template berdasarkan jenis reviu
 * @param {string} jenisReviu
 */
export function getTemplate(jenisReviu) {
  return TEMPLATES[jenisReviu] || TEMPLATES.lainnya;
}

/**
 * Isi placeholder dalam template dengan data reviu
 */
export function fillTemplate(text, reviewData, opdData) {
  if (!text) return '';
  return text
    .replace(/{perihal}/g, reviewData.perihal || '[Perihal]')
    .replace(/{nama_opd}/g, opdData?.nama || '[Nama OPD]')
    .replace(/{jenis_reviu}/g, reviewData.jenis_reviu || '[Jenis Reviu]');
}
