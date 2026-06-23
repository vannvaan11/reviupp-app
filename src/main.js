// main.js - Aplikasi Utama REVIUPP

import './style.css';
import { reviewStore, opdStore, settingsStore, JENIS_REVIU } from './store.js';
import { searchRegulations, REGULATIONS_DB, getCategories } from './data/regulations.js';
import { getTemplate, fillTemplate } from './data/templates.js';
import { generateNarasi, generateFullReport } from './services/ai.js';
import { exportToWord } from './services/export.js';

// ============================================================
// STATE
// ============================================================
let currentPage = 'dashboard';
let currentReviewId = null;
let currentReview = null;
let tempSelectedRegulations = []; // for modal
let editorSelectedRegulations = []; // for editor

// ============================================================
// NAVIGATION
// ============================================================
window.navigateTo = function(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');

  const navEl = document.querySelector(`[data-page="${page}"]`);
  if (navEl) navEl.classList.add('active');

  currentPage = page;

  // Update topbar title
  const titles = {
    dashboard: 'Dashboard',
    'new-review': 'Buat Reviu Baru',
    editor: 'Editor Laporan',
    arsip: 'Arsip Reviu',
    opd: 'Data OPD',
    peraturan: 'Database Peraturan',
    settings: 'Pengaturan',
  };
  document.getElementById('topbar-title').textContent = titles[page] || page;

  // Page-specific init
  if (page === 'dashboard') renderDashboard();
  if (page === 'arsip') renderArsip();
  if (page === 'opd') renderOpd();
  if (page === 'peraturan') renderPeraturan();
  if (page === 'settings') loadSettings();
  if (page === 'new-review') initNewReviewForm();
};

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const stats = reviewStore.getStats();
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-draft').textContent = stats.draft;
  document.getElementById('stat-selesai').textContent = stats.selesai;
  document.getElementById('stat-bulan-ini').textContent = stats.bulan_ini;

  // Welcome name
  const settings = settingsStore.get();
  const firstName = settings.nama_ppupd ? settings.nama_ppupd.split(' ')[0] : 'PPUPD';
  document.getElementById('welcome-name').textContent = firstName;

  // Sidebar
  document.getElementById('sidebar-user-name').textContent = settings.nama_ppupd || 'Nama PPUPD';
  document.getElementById('sidebar-instansi').textContent = settings.instansi_nama || 'Inspektorat';

  // Badge
  document.getElementById('nav-badge-arsip').textContent = stats.total;

  // Recent reviews
  const reviews = reviewStore.getAll().slice(0, 5);
  const container = document.getElementById('recent-reviews-list');

  if (reviews.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>Belum ada reviu</h3>
        <p>Mulai buat reviu pertama Anda</p>
        <button class="btn btn-primary mt-4" onclick="navigateTo('new-review')">+ Buat Reviu Baru</button>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Perihal</th>
            <th>OPD</th>
            <th>Jenis</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${reviews.map(r => {
            const opd = opdStore.getById(r.opd_id);
            const jenisLabel = JENIS_REVIU.find(j => j.value === r.jenis_reviu)?.label || r.jenis_reviu;
            return `
              <tr>
                <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${r.perihal}">${r.perihal}</td>
                <td>${opd?.singkatan || opd?.nama || '—'}</td>
                <td><span style="font-size:12px;">${jenisLabel}</span></td>
                <td><span class="badge badge-${r.status}">${r.status}</span></td>
                <td style="font-size:12px;color:var(--text-secondary);">${formatDate(r.created_at)}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openEditor('${r.id}')">Buka</button>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

// ============================================================
// NEW REVIEW FORM
// ============================================================
function initNewReviewForm() {
  // Populate OPD dropdown
  const opds = opdStore.getAll();
  const select = document.getElementById('nr-opd-id');
  select.innerHTML = '<option value="">-- Pilih OPD --</option>';
  opds.forEach(opd => {
    select.innerHTML += `<option value="${opd.id}">${opd.nama}</option>`;
  });

  // Reset form
  document.getElementById('form-new-review').reset();
  document.getElementById('auto-regulations-box').style.display = 'none';
  tempSelectedRegulations = [];
}

let perihalDebounce = null;
window.handlePerihalInput = function(value) {
  clearTimeout(perihalDebounce);
  perihalDebounce = setTimeout(() => {
    const results = searchRegulations(value);
    const box = document.getElementById('auto-regulations-box');
    const list = document.getElementById('auto-regulations-list');

    if (results.length === 0) {
      box.style.display = 'none';
      return;
    }

    box.style.display = 'block';
    list.innerHTML = results.map(r => `
      <label class="regulation-item ${tempSelectedRegulations.find(s => s.id === r.id) ? 'selected' : ''}">
        <input type="checkbox" class="regulation-check" value="${r.id}"
          ${tempSelectedRegulations.find(s => s.id === r.id) ? 'checked' : ''}
          onchange="toggleTempReg('${r.id}', this.checked)">
        <div class="regulation-info">
          <div class="regulation-kode">${r.kode}</div>
          <div class="regulation-judul">${r.judul}</div>
          <div class="regulation-kategori">${r.kategori}</div>
        </div>
        <a href="${r.url}" target="_blank" class="regulation-link" onclick="event.stopPropagation()">🔗 Buka</a>
      </label>`).join('');
  }, 350);
};

window.toggleTempReg = function(id, checked) {
  const reg = REGULATIONS_DB.find(r => r.id === id);
  if (!reg) return;
  if (checked) {
    if (!tempSelectedRegulations.find(r => r.id === id)) {
      tempSelectedRegulations.push(reg);
    }
  } else {
    tempSelectedRegulations = tempSelectedRegulations.filter(r => r.id !== id);
  }

  // Update parent label styling
  document.querySelectorAll('#auto-regulations-list .regulation-item').forEach(item => {
    const cb = item.querySelector('input[type=checkbox]');
    if (cb) item.classList.toggle('selected', cb.checked);
  });
};

document.getElementById('form-new-review').addEventListener('submit', function(e) {
  e.preventDefault();

  const nomor = document.getElementById('nr-nomor-surat').value.trim();
  const tanggal = document.getElementById('nr-tanggal-masuk').value;
  const opdId = document.getElementById('nr-opd-id').value;
  const jenis = document.getElementById('nr-jenis-reviu').value;
  const perihal = document.getElementById('nr-perihal').value.trim();
  const nomorDokumen = document.getElementById('nr-nomor-dokumen').value.trim();
  const catatan = document.getElementById('nr-catatan').value.trim();

  if (!nomor || !tanggal || !opdId || !jenis || !perihal) {
    showToast('Harap lengkapi semua field wajib.', 'error');
    return;
  }

  // Create review with template
  const template = getTemplate(jenis);
  const opd = opdStore.getById(opdId);
  const konten = {};

  template.sections.forEach(section => {
    konten[section.id] = fillTemplate(section.default_content || '', { perihal, jenis_reviu: jenis }, opd);
  });

  const newReview = reviewStore.create({
    nomor_surat_masuk: nomor,
    tanggal_masuk: tanggal,
    opd_id: opdId,
    jenis_reviu: jenis,
    perihal,
    nomor_dokumen: nomorDokumen,
    catatan,
    dasar_hukum_terpilih: tempSelectedRegulations,
    konten_laporan: konten,
  });

  showToast('Reviu berhasil dibuat!', 'success');
  openEditor(newReview.id);
});

// ============================================================
// EDITOR
// ============================================================
window.openEditor = function(reviewId) {
  currentReviewId = reviewId;
  currentReview = reviewStore.getById(reviewId);

  if (!currentReview) {
    showToast('Reviu tidak ditemukan.', 'error');
    return;
  }

  editorSelectedRegulations = [...(currentReview.dasar_hukum_terpilih || [])];

  navigateTo('editor');
  renderEditor();
};

function renderEditor() {
  if (!currentReview) return;

  const opd = opdStore.getById(currentReview.opd_id);
  const template = getTemplate(currentReview.jenis_reviu);
  const jenisLabel = JENIS_REVIU.find(j => j.value === currentReview.jenis_reviu)?.label || currentReview.jenis_reviu;

  // Header info
  document.getElementById('editor-title').textContent = currentReview.perihal || 'Editor Laporan';
  document.getElementById('editor-subtitle').textContent = `${jenisLabel} — ${opd?.nama || '—'} | Status: ${currentReview.status}`;

  // Info panel
  document.getElementById('editor-info').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:6px;">
      <div><span style="color:var(--text-muted);">Perihal:</span> <strong>${currentReview.perihal}</strong></div>
      <div><span style="color:var(--text-muted);">OPD:</span> ${opd?.nama || '—'}</div>
      <div><span style="color:var(--text-muted);">No. Surat:</span> ${currentReview.nomor_surat_masuk || '—'}</div>
      <div><span style="color:var(--text-muted);">Jenis:</span> ${jenisLabel}</div>
      <div><span style="color:var(--text-muted);">Dibuat:</span> ${formatDate(currentReview.created_at)}</div>
    </div>`;

  // Render sections
  const sectionsEl = document.getElementById('editor-sections');
  sectionsEl.innerHTML = template.sections.map(section => `
    <div class="section-editor" id="sec-${section.id}">
      <div class="section-header">
        <span class="section-title">${section.label}</span>
        <div style="display:flex;gap:6px;">
          ${section.ai_assisted ? `<button class="btn btn-ghost btn-sm" style="font-size:11px;color:#60a5fa;" onclick="generateSectionNarasi('${section.id}', '${section.label}')">✨ AI Assist</button>` : ''}
        </div>
      </div>
      <div class="section-body">
        ${section.id === 'dasar_hukum' ? renderDasarHukumSection() : `
          <div id="ai-status-${section.id}"></div>
          <textarea id="content-${section.id}" placeholder="${section.placeholder || ''}">${currentReview.konten_laporan?.[section.id] || ''}</textarea>
        `}
      </div>
    </div>`).join('');

  renderSelectedRegulations();
}

function renderDasarHukumSection() {
  const regs = editorSelectedRegulations;
  if (regs.length === 0) {
    return `<div style="font-size:13px;color:var(--text-muted);padding:8px;">Pilih peraturan dari panel kanan.</div>`;
  }
  return `<div style="font-size:13px;line-height:1.8;">
    ${regs.map((r, i) => `<div>${i + 1}. ${r.kode} — ${r.judul}</div>`).join('')}
  </div>`;
}

function renderSelectedRegulations() {
  const container = document.getElementById('selected-regulations');
  if (editorSelectedRegulations.length === 0) {
    container.innerHTML = `<div style="font-size:13px;color:var(--text-muted);padding:8px 0;">Belum ada peraturan dipilih</div>`;
    return;
  }

  container.innerHTML = editorSelectedRegulations.map(r => `
    <div class="regulation-item selected" style="cursor:default;">
      <div class="regulation-info">
        <div class="regulation-kode">${r.kode}</div>
        <div class="regulation-judul" style="font-size:12px;">${r.judul}</div>
      </div>
      <button class="btn btn-ghost btn-icon" style="color:var(--accent-danger);font-size:14px;"
        onclick="removeSelectedReg('${r.id}')">✕</button>
    </div>`).join('');

  // Also update dasar hukum section if visible
  const dasarHukumBody = document.querySelector('#sec-dasar_hukum .section-body');
  if (dasarHukumBody) {
    dasarHukumBody.innerHTML = renderDasarHukumSection();
  }
}

window.removeSelectedReg = function(id) {
  editorSelectedRegulations = editorSelectedRegulations.filter(r => r.id !== id);
  renderSelectedRegulations();
};

// Save report
window.saveReport = function() {
  if (!currentReviewId) return;

  const template = getTemplate(currentReview.jenis_reviu);
  const konten = {};

  template.sections.forEach(section => {
    if (section.id !== 'dasar_hukum') {
      const textarea = document.getElementById(`content-${section.id}`);
      if (textarea) konten[section.id] = textarea.value;
    }
  });

  reviewStore.update(currentReviewId, {
    konten_laporan: konten,
    dasar_hukum_terpilih: editorSelectedRegulations,
  });

  currentReview = reviewStore.getById(currentReviewId);
  showToast('Laporan berhasil disimpan!', 'success');
};

window.saveAndFinish = function() {
  showConfirm(
    'Tandai Selesai',
    'Tandai laporan ini sebagai selesai? Anda masih bisa membukanya kembali dari Arsip.',
    () => {
      window.saveReport();
      reviewStore.update(currentReviewId, { status: 'selesai' });
      currentReview = reviewStore.getById(currentReviewId);
      document.getElementById('editor-subtitle').textContent = currentReview.perihal + ' — Selesai ✅';
      showToast('Laporan ditandai selesai!', 'success');
      renderDashboard();
    }
  );
};

// ============================================================
// AI FEATURES
// ============================================================
window.generateSectionNarasi = async function(sectionId, sectionLabel) {
  if (!currentReview) return;
  const settings = settingsStore.get();

  if (!settings.ai_api_key) {
    showToast('API Key AI belum dikonfigurasi. Buka menu Pengaturan.', 'error');
    navigateTo('settings');
    return;
  }

  const statusEl = document.getElementById(`ai-status-${sectionId}`);
  const textarea = document.getElementById(`content-${sectionId}`);

  statusEl.innerHTML = `
    <div class="ai-loading">
      <div class="spinner"></div>
      <span>AI sedang menyusun narasi untuk ${sectionLabel}...</span>
    </div>`;

  try {
    const opd = opdStore.getById(currentReview.opd_id);
    const jenisLabel = JENIS_REVIU.find(j => j.value === currentReview.jenis_reviu)?.label || currentReview.jenis_reviu;

    const result = await generateNarasi({
      jenisReviu: jenisLabel,
      perihal: currentReview.perihal,
      namaOpd: opd?.nama || '—',
      sectionId,
      sectionLabel,
      dasarHukum: editorSelectedRegulations,
      existingContent: textarea?.value || '',
      settings,
    });

    if (textarea) textarea.value = result;
    statusEl.innerHTML = '';
    showToast(`Narasi ${sectionLabel} berhasil di-generate!`, 'success');
  } catch (err) {
    statusEl.innerHTML = '';
    showToast(`Gagal: ${err.message}`, 'error');
  }
};

window.generateFullNarasi = async function() {
  if (!currentReview) return;
  const settings = settingsStore.get();

  if (!settings.ai_api_key) {
    showToast('API Key AI belum dikonfigurasi. Buka menu Pengaturan.', 'error');
    navigateTo('settings');
    return;
  }

  // Show global loading
  const aiPanel = document.querySelector('.editor-panel .card:nth-child(2) p');
  const aiBtn = document.querySelector('.editor-panel .card:nth-child(2) button');
  if (aiBtn) {
    aiBtn.disabled = true;
    aiBtn.innerHTML = '<div class="spinner" style="width:16px;height:16px;"></div> Generating...';
  }

  try {
    const opd = opdStore.getById(currentReview.opd_id);
    const jenisLabel = JENIS_REVIU.find(j => j.value === currentReview.jenis_reviu)?.label || currentReview.jenis_reviu;

    const result = await generateFullReport({
      jenisReviu: jenisLabel,
      perihal: currentReview.perihal,
      namaOpd: opd?.nama || '—',
      dasarHukum: editorSelectedRegulations,
      settings,
    });

    // Fill in the textareas
    if (result.uraian_hasil) {
      const ta = document.getElementById('content-uraian_hasil');
      if (ta) ta.value = result.uraian_hasil;
    }
    if (result.simpulan) {
      const ta = document.getElementById('content-simpulan');
      if (ta) ta.value = result.simpulan;
    }
    if (result.rekomendasi) {
      const ta = document.getElementById('content-rekomendasi');
      if (ta) ta.value = result.rekomendasi;
    }

    showToast('Semua narasi berhasil di-generate!', 'success');
  } catch (err) {
    showToast(`Gagal: ${err.message}`, 'error');
  } finally {
    if (aiBtn) {
      aiBtn.disabled = false;
      aiBtn.innerHTML = '✨ Generate Semua Narasi';
    }
  }
};

// ============================================================
// REGULATION MODAL
// ============================================================
window.openRegulationSearch = function() {
  tempSelectedRegulations = [...editorSelectedRegulations];
  searchRegulationsModal('');
  openModal('modal-regulations');
};

window.searchRegulationsModal = function(query) {
  const results = query ? searchRegulations(query) : REGULATIONS_DB;
  const list = document.getElementById('reg-modal-list');

  list.innerHTML = results.map(r => `
    <label class="regulation-item ${tempSelectedRegulations.find(s => s.id === r.id) ? 'selected' : ''}">
      <input type="checkbox" class="regulation-check" value="${r.id}"
        ${tempSelectedRegulations.find(s => s.id === r.id) ? 'checked' : ''}
        onchange="toggleModalReg('${r.id}', this.checked)">
      <div class="regulation-info">
        <div class="regulation-kode">${r.kode}</div>
        <div class="regulation-judul">${r.judul}</div>
        <div class="regulation-kategori">${r.kategori}</div>
      </div>
      <a href="${r.url}" target="_blank" class="regulation-link" onclick="event.stopPropagation()">🔗 Buka</a>
    </label>`).join('');
};

window.toggleModalReg = function(id, checked) {
  const reg = REGULATIONS_DB.find(r => r.id === id);
  if (!reg) return;
  if (checked) {
    if (!tempSelectedRegulations.find(r => r.id === id)) tempSelectedRegulations.push(reg);
  } else {
    tempSelectedRegulations = tempSelectedRegulations.filter(r => r.id !== id);
  }
  document.querySelectorAll('#reg-modal-list .regulation-item').forEach(item => {
    const cb = item.querySelector('input[type=checkbox]');
    if (cb) item.classList.toggle('selected', cb.checked);
  });
};

window.applySelectedRegulations = function() {
  editorSelectedRegulations = [...tempSelectedRegulations];
  renderSelectedRegulations();
  closeModal('modal-regulations');
  showToast(`${editorSelectedRegulations.length} peraturan diterapkan.`, 'success');
};

// ============================================================
// PREVIEW & PRINT
// ============================================================
window.previewReport = function() {
  if (!currentReview) return;
  window.saveReport();

  const review = reviewStore.getById(currentReviewId);
  const opd = opdStore.getById(review.opd_id);
  const settings = settingsStore.get();
  const template = getTemplate(review.jenis_reviu);

  const dasarHukumText = editorSelectedRegulations.length > 0
    ? editorSelectedRegulations.map((r, i) => `${i + 1}. ${r.kode} — ${r.judul};`).join('\n')
    : '(belum dipilih)';

  const sectionsHtml = template.sections.map(s => {
    if (s.id === 'dasar_hukum') {
      return `<div class="print-section">
        <div class="print-section-title">${s.label}</div>
        <div class="print-content" style="white-space:pre-line;">${dasarHukumText}</div>
      </div>`;
    }
    const content = review.konten_laporan?.[s.id] || '';
    return content ? `<div class="print-section">
      <div class="print-section-title">${s.label}</div>
      <div class="print-content">${content}</div>
    </div>` : '';
  }).join('');

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById('preview-content').innerHTML = `
    <div class="print-area" id="printable-area">
      <div class="print-header">
        <div style="font-size:13pt;font-weight:bold;">${settings.instansi_nama || 'INSPEKTORAT'}</div>
        <div style="font-size:11pt;">${settings.instansi_kota || ''}</div>
        <div class="print-divider"></div>
        <div class="print-title">${template.judul_laporan}</div>
        <div style="font-size:11pt;margin-top:4px;">Perihal: ${review.perihal}</div>
        <div class="print-divider thin"></div>
      </div>

      ${sectionsHtml}

      <div class="print-signatures" style="margin-top:40px;">
        <div class="print-signature-block">
        </div>
        <div class="print-signature-block">
          <div style="margin-bottom:8px;">${settings.instansi_kota || '___'}, ${today}</div>
          <div style="font-style:italic;margin-bottom:4px;">Plt. Inspektur</div>
          <div class="print-signature-line"></div>
          <div class="print-name">______________________</div>
          <div style="font-size:10pt;">NIP. __________________</div>
        </div>
      </div>
    </div>`;

  openModal('modal-preview');
};

window.downloadWord = async function() {
  if (!currentReview) return;
  window.saveReport();
  
  const review = reviewStore.getById(currentReviewId);
  const opd = opdStore.getById(review.opd_id);
  const settings = settingsStore.get();
  
  try {
    showToast('Sedang menyiapkan dokumen Word...', 'info');
    await exportToWord(review, opd, settings, editorSelectedRegulations);
    showToast('Berhasil mengunduh dokumen Word!', 'success');
  } catch (error) {
    console.error(error);
    showToast('Gagal mengunduh dokumen Word.', 'error');
  }
};

window.printReport = function() {
  const printContents = document.getElementById('printable-area').innerHTML;
  const w = window.open('', '_blank');
  w.document.write(`
    <!DOCTYPE html><html><head>
    <title>Laporan Reviu</title>
    <style>
      body { font-family: 'Times New Roman', serif; font-size: 12pt; color: #1a1a1a; padding: 2cm; }
      .print-section { margin-bottom: 20px; }
      .print-section-title { font-weight: bold; text-decoration: underline; margin-bottom: 8px; }
      .print-content { text-align: justify; white-space: pre-wrap; line-height: 1.8; }
      .print-header { text-align: center; margin-bottom: 24px; }
      .print-divider { border: 2px solid #1a1a1a; margin: 8px 0; }
      .print-divider.thin { border-width: 1px; }
      .print-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; text-decoration: underline; margin-top: 8px; }
      .print-signatures { display: flex; justify-content: space-between; margin-top: 40px; }
      .print-signature-block { text-align: center; width: 45%; }
      .print-signature-line { height: 60px; border-bottom: 1px solid #1a1a1a; margin-bottom: 8px; }
      .print-name { font-weight: bold; }
    </style>
    </head><body>${printContents}</body></html>`);
  w.document.close();
  setTimeout(() => { w.print(); w.close(); }, 500);
};

// ============================================================
// ARSIP
// ============================================================
function renderArsip(reviews = null) {
  const tbody = document.getElementById('arsip-table-body');
  const allReviews = reviews || reviewStore.getAll();

  if (allReviews.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state"><div class="empty-icon">📭</div><h3>Tidak ada reviu</h3></div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = allReviews.map(r => {
    const opd = opdStore.getById(r.opd_id);
    const jenisLabel = JENIS_REVIU.find(j => j.value === r.jenis_reviu)?.label || r.jenis_reviu;
    return `
      <tr>
        <td class="font-mono" style="font-size:12px;">${r.nomor_surat_masuk || '—'}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${r.perihal}">${r.perihal}</td>
        <td>${opd?.singkatan || opd?.nama?.split(' ').slice(0, 3).join(' ') || '—'}</td>
        <td style="font-size:12px;">${jenisLabel}</td>
        <td><span class="badge badge-${r.status}">${r.status}</span></td>
        <td style="font-size:12px;color:var(--text-secondary);">${formatDate(r.created_at)}</td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-secondary btn-sm" onclick="openEditor('${r.id}')">Buka</button>
            <button class="btn btn-danger btn-sm" onclick="deleteReview('${r.id}')">🗑</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

window.filterArsip = function() {
  const q = document.getElementById('arsip-search').value.toLowerCase();
  const jenis = document.getElementById('arsip-filter-jenis').value;
  const status = document.getElementById('arsip-filter-status').value;

  let reviews = reviewStore.getAll();

  if (jenis !== 'semua') reviews = reviews.filter(r => r.jenis_reviu === jenis);
  if (status !== 'semua') reviews = reviews.filter(r => r.status === status);
  if (q) {
    reviews = reviews.filter(r => {
      const opd = opdStore.getById(r.opd_id);
      return r.perihal?.toLowerCase().includes(q) ||
        opd?.nama?.toLowerCase().includes(q) ||
        r.nomor_surat_masuk?.toLowerCase().includes(q);
    });
  }

  renderArsip(reviews);
};

window.deleteReview = function(id) {
  showConfirm('Hapus Reviu', 'Apakah Anda yakin ingin menghapus reviu ini? Tindakan tidak dapat dibatalkan.', () => {
    reviewStore.delete(id);
    renderArsip();
    renderDashboard();
    showToast('Reviu berhasil dihapus.', 'success');
  });
};

// ============================================================
// OPD MANAGEMENT
// ============================================================
function renderOpd(opds = null) {
  const tbody = document.getElementById('opd-table-body');
  const allOpds = opds || opdStore.getAll();

  if (allOpds.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">
      <div class="empty-state"><div class="empty-icon">🏛️</div><h3>Belum ada OPD</h3><p>Tambahkan OPD pemohon reviu</p></div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = allOpds.map((opd, i) => `
    <tr>
      <td style="color:var(--text-muted);">${i + 1}</td>
      <td>
        <div style="font-weight:600;">${opd.nama}</div>
        ${opd.singkatan ? `<div style="font-size:11px;color:var(--text-secondary);">${opd.singkatan}</div>` : ''}
      </td>
      <td>${opd.singkatan || '—'}</td>
      <td>
        <div>${opd.kepala || '—'}</div>
        ${opd.jabatan_kepala ? `<div style="font-size:11px;color:var(--text-secondary);">${opd.jabatan_kepala}</div>` : ''}
      </td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="openOpdModal('${opd.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteOpd('${opd.id}')">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

window.filterOpd = function() {
  const q = document.getElementById('opd-search').value;
  renderOpd(opdStore.search(q));
};

window.openOpdModal = function(id = null) {
  const form = document.getElementById('form-opd');
  form.reset();
  document.getElementById('opd-edit-id').value = '';

  if (id) {
    const opd = opdStore.getById(id);
    if (!opd) return;
    document.getElementById('modal-opd-title').textContent = 'Edit OPD';
    document.getElementById('opd-edit-id').value = opd.id;
    document.getElementById('opd-nama').value = opd.nama || '';
    document.getElementById('opd-singkatan').value = opd.singkatan || '';
    document.getElementById('opd-kode').value = opd.kode || '';
    document.getElementById('opd-kepala').value = opd.kepala || '';
    document.getElementById('opd-nip-kepala').value = opd.nip_kepala || '';
    document.getElementById('opd-jabatan-kepala').value = opd.jabatan_kepala || '';
    document.getElementById('opd-alamat').value = opd.alamat || '';
  } else {
    document.getElementById('modal-opd-title').textContent = 'Tambah OPD Baru';
  }

  openModal('modal-opd');
};

document.getElementById('form-opd').addEventListener('submit', function(e) {
  e.preventDefault();
  const editId = document.getElementById('opd-edit-id').value;
  const data = {
    nama: document.getElementById('opd-nama').value.trim(),
    singkatan: document.getElementById('opd-singkatan').value.trim(),
    kode: document.getElementById('opd-kode').value.trim(),
    kepala: document.getElementById('opd-kepala').value.trim(),
    nip_kepala: document.getElementById('opd-nip-kepala').value.trim(),
    jabatan_kepala: document.getElementById('opd-jabatan-kepala').value.trim(),
    alamat: document.getElementById('opd-alamat').value.trim(),
  };

  if (editId) {
    opdStore.update(editId, data);
    showToast('OPD berhasil diperbarui!', 'success');
  } else {
    opdStore.create(data);
    showToast('OPD berhasil ditambahkan!', 'success');
  }

  closeModal('modal-opd');
  renderOpd();
});

window.deleteOpd = function(id) {
  showConfirm('Hapus OPD', 'Hapus OPD ini dari database?', () => {
    opdStore.delete(id);
    renderOpd();
    showToast('OPD berhasil dihapus.', 'success');
  });
};

// ============================================================
// PERATURAN PAGE
// ============================================================
function renderPeraturan() {
  // Populate categories
  const cats = getCategories();
  const catSelect = document.getElementById('reg-filter-kategori');
  catSelect.innerHTML = '<option value="">Semua Kategori</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');

  filterRegulations();
}

window.filterRegulations = function() {
  const q = document.getElementById('reg-search').value.toLowerCase();
  const cat = document.getElementById('reg-filter-kategori').value;

  let regs = REGULATIONS_DB;
  if (cat) regs = regs.filter(r => r.kategori === cat);
  if (q) regs = regs.filter(r =>
    r.kode.toLowerCase().includes(q) ||
    r.judul.toLowerCase().includes(q) ||
    r.kategori.toLowerCase().includes(q)
  );

  const list = document.getElementById('regulations-full-list');
  list.innerHTML = regs.map(r => `
    <div class="regulation-item" style="cursor:default;">
      <div class="regulation-info">
        <div class="regulation-kode">${r.kode}</div>
        <div class="regulation-judul">${r.judul}</div>
        <div class="regulation-kategori">${r.kategori}</div>
      </div>
      <a href="${r.url}" target="_blank" class="regulation-link">🔗 Buka BPK RI</a>
    </div>`).join('') || '<div style="color:var(--text-muted);padding:16px;">Tidak ada peraturan ditemukan.</div>';
};

// ============================================================
// SETTINGS
// ============================================================
function loadSettings() {
  const s = settingsStore.get();
  document.getElementById('s-instansi-nama').value = s.instansi_nama || '';
  document.getElementById('s-instansi-kota').value = s.instansi_kota || '';
  document.getElementById('s-nama-ppupd').value = s.nama_ppupd || '';
  document.getElementById('s-nip-ppupd').value = s.nip_ppupd || '';
  document.getElementById('s-jabatan-ppupd').value = s.jabatan_ppupd || '';
  document.getElementById('s-ai-api-key').value = s.ai_api_key || '';
  document.getElementById('s-ai-model').value = s.ai_model || 'gemini-2.0-flash';
}

document.getElementById('form-settings').addEventListener('submit', function(e) {
  e.preventDefault();
  settingsStore.save({
    instansi_nama: document.getElementById('s-instansi-nama').value.trim(),
    instansi_kota: document.getElementById('s-instansi-kota').value.trim(),
    nama_ppupd: document.getElementById('s-nama-ppupd').value.trim(),
    nip_ppupd: document.getElementById('s-nip-ppupd').value.trim(),
    jabatan_ppupd: document.getElementById('s-jabatan-ppupd').value.trim(),
    ai_api_key: document.getElementById('s-ai-api-key').value.trim(),
    ai_model: document.getElementById('s-ai-model').value,
  });
  showToast('Pengaturan berhasil disimpan!', 'success');
  renderDashboard();
});

window.confirmReset = function() {
  showConfirm('Reset Semua Data', 'Semua data reviu, OPD, dan pengaturan akan dihapus permanen. Lanjutkan?', () => {
    localStorage.clear();
    showToast('Semua data telah direset.', 'info');
    setTimeout(() => location.reload(), 1000);
  });
};

// ============================================================
// MODAL HELPERS
// ============================================================
window.openModal = function(id) {
  document.getElementById(id).classList.add('open');
};
window.closeModal = function(id) {
  document.getElementById(id).classList.remove('open');
};

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ============================================================
// CONFIRM DIALOG
// ============================================================
let confirmCallback = null;
function showConfirm(title, message, callback) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  confirmCallback = callback;
  openModal('modal-confirm');
}

document.getElementById('confirm-btn').addEventListener('click', function() {
  closeModal('modal-confirm');
  if (confirmCallback) { confirmCallback(); confirmCallback = null; }
});

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
window.showToast = showToast;

// ============================================================
// UTILITY
// ============================================================
function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    return new Date(isoStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return isoStr; }
}

function updateTopbarDate() {
  const el = document.getElementById('topbar-date');
  if (el) {
    el.textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}

// ============================================================
// INIT
// ============================================================
function init() {
  updateTopbarDate();
  renderDashboard();
}

init();
