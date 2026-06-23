// store.js - Data Store Manager menggunakan localStorage

const KEYS = {
  REVIEWS: 'ppupd_reviews',
  OPDS: 'ppupd_opds',
  SETTINGS: 'ppupd_settings',
};

// =============================
// HELPER
// =============================
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function now() {
  return new Date().toISOString();
}

function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// =============================
// SETTINGS
// =============================
export const settingsStore = {
  get() {
    return load(KEYS.SETTINGS) || {
      instansi_nama: '',
      instansi_kota: '',
      jabatan_ppupd: '',
      nama_ppupd: '',
      nip_ppupd: '',
      ai_api_key: '',
      ai_model: 'gemini-2.0-flash',
    };
  },
  save(settings) {
    save(KEYS.SETTINGS, settings);
  },
};

// =============================
// OPD STORE
// =============================
export const opdStore = {
  getAll() {
    return load(KEYS.OPDS) || [];
  },
  getById(id) {
    return this.getAll().find(o => o.id === id) || null;
  },
  create(data) {
    const opds = this.getAll();
    const newOpd = { id: generateId(), ...data, created_at: now() };
    opds.push(newOpd);
    save(KEYS.OPDS, opds);
    return newOpd;
  },
  update(id, data) {
    const opds = this.getAll();
    const idx = opds.findIndex(o => o.id === id);
    if (idx === -1) return null;
    opds[idx] = { ...opds[idx], ...data, updated_at: now() };
    save(KEYS.OPDS, opds);
    return opds[idx];
  },
  delete(id) {
    const opds = this.getAll().filter(o => o.id !== id);
    save(KEYS.OPDS, opds);
  },
  search(q) {
    const all = this.getAll();
    if (!q) return all;
    const lower = q.toLowerCase();
    return all.filter(o => o.nama.toLowerCase().includes(lower) || (o.kode && o.kode.toLowerCase().includes(lower)));
  },
};

// =============================
// REVIEW STORE
// =============================
export const reviewStore = {
  getAll() {
    return load(KEYS.REVIEWS) || [];
  },
  getById(id) {
    return this.getAll().find(r => r.id === id) || null;
  },
  create(data) {
    const reviews = this.getAll();
    const newReview = {
      id: generateId(),
      status: 'draft',
      dasar_hukum_terpilih: [],
      konten_laporan: {},
      ...data,
      created_at: now(),
      updated_at: now(),
    };
    reviews.unshift(newReview);
    save(KEYS.REVIEWS, reviews);
    return newReview;
  },
  update(id, data) {
    const reviews = this.getAll();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reviews[idx] = { ...reviews[idx], ...data, updated_at: now() };
    save(KEYS.REVIEWS, reviews);
    return reviews[idx];
  },
  delete(id) {
    const reviews = this.getAll().filter(r => r.id !== id);
    save(KEYS.REVIEWS, reviews);
  },
  getStats() {
    const all = this.getAll();
    return {
      total: all.length,
      draft: all.filter(r => r.status === 'draft').length,
      selesai: all.filter(r => r.status === 'selesai').length,
      bulan_ini: all.filter(r => {
        const d = new Date(r.created_at);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
    };
  },
  filterByType(type) {
    if (!type || type === 'semua') return this.getAll();
    return this.getAll().filter(r => r.jenis_reviu === type);
  },
};

export const JENIS_REVIU = [
  { value: 'sk', label: 'Reviu Surat Keputusan (SK Umum)', icon: '📋' },
  { value: 'sk_narasumber', label: 'Reviu SK Narasumber/Kepanitiaan', icon: '📝' },
  { value: 'kegiatan', label: 'Reviu Kegiatan', icon: '📊' },
  { value: 'surat_perjanjian', label: 'Reviu Surat Perjanjian', icon: '📄' },
  { value: 'rka', label: 'Reviu RKA/RKPA', icon: '💰' },
  { value: 'laporan_keuangan', label: 'Reviu Laporan Keuangan', icon: '📑' },
  { value: 'lainnya', label: 'Reviu Lainnya', icon: '📌' },
];
