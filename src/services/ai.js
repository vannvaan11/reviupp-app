// ai.js - Integrasi Google Gemini AI untuk penyusunan narasi reviu

import { settingsStore } from '../store.js';

/**
 * Panggil Gemini API
 */
async function callGemini(prompt) {
  const settings = settingsStore.get();
  const apiKey = settings.ai_api_key;

  if (!apiKey) {
    throw new Error('API Key AI belum dikonfigurasi. Silakan masuk ke menu Pengaturan untuk menambahkan Gemini API Key.');
  }

  const model = settings.ai_model || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${response.status}`;
    throw new Error(`Gagal menghubungi AI: ${msg}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Generate narasi untuk bagian tertentu dari laporan reviu
 */
export async function generateNarasi({ jenisReviu, perihal, namaOpd, sectionId, sectionLabel, dasarHukum, existingContent, settings, customInstruction }) {
  const dasarHukumText = dasarHukum && dasarHukum.length > 0
    ? dasarHukum.map(d => `- ${d.kode}: ${d.judul}`).join('\n')
    : '(belum dipilih)';

  const instansi = settings?.instansi_nama || 'Instansi Pengawas';
  const namaJabatan = settings?.jabatan_ppupd || 'PPUPD';

  let prompt = '';

  if (sectionId === 'uraian_hasil') {
    prompt = `Anda adalah seorang ${namaJabatan} dari ${instansi} yang sedang menyusun Laporan Hasil Reviu.

Jenis Reviu: ${jenisReviu}
Perihal/Objek Reviu: ${perihal}
OPD Pemohon: ${namaOpd}
Dasar Hukum yang Digunakan:
${dasarHukumText}

Tugas Anda: Susunlah narasi "Uraian Hasil Reviu" yang profesional, formal, dan sesuai dengan standar penulisan laporan APIP/inspektorat daerah.

Narasi harus mencakup:
1. Uraian objek yang direviu secara singkat
2. Penelaahan kesesuaian dengan peraturan perundang-undangan yang telah disebutkan
3. Temuan-temuan yang perlu diperhatikan (gunakan frasa umum yang bisa disesuaikan, seperti "Tim Reviu menemukan bahwa...")
4. Gunakan bahasa Indonesia formal dan baku
5. Format dengan penomoran/abjad yang rapi

${customInstruction ? `Instruksi Khusus dari Pengguna:\n${customInstruction}\n` : ''}
Tulis hanya isi narasinya saja, tanpa judul bagian.`;

  } else if (sectionId === 'simpulan') {
    prompt = `Anda adalah seorang ${namaJabatan} dari ${instansi} yang sedang menyusun Laporan Hasil Reviu.

Jenis Reviu: ${jenisReviu}
Perihal/Objek Reviu: ${perihal}
OPD Pemohon: ${namaOpd}

Tugas Anda: Susunlah narasi "Simpulan" laporan hasil reviu yang profesional dan formal.

Simpulan harus:
1. Merujuk pada hasil penelaahan yang telah dilakukan
2. Menyebutkan objek reviu secara spesifik
3. Menyebutkan tingkat kesesuaian dengan peraturan yang berlaku
4. Menggunakan bahasa Indonesia formal dan baku
5. Padat dan tidak terlalu panjang (2-4 paragraf)

${customInstruction ? `Instruksi Khusus dari Pengguna:\n${customInstruction}\n` : ''}
Tulis hanya isi simpulannya saja, tanpa judul bagian.`;

  } else {
    prompt = `Anda adalah seorang ${namaJabatan} dari ${instansi} yang sedang menyusun Laporan Hasil Reviu.

Jenis Reviu: ${jenisReviu}
Perihal/Objek Reviu: ${perihal}
OPD Pemohon: ${namaOpd}
Bagian yang perlu ditulis: ${sectionLabel}
Dasar Hukum:
${dasarHukumText}

${existingContent ? `Konten yang sudah ada (untuk diperbaiki/dilengkapi):\n${existingContent}\n` : ''}

Tugas Anda: Susunlah narasi untuk bagian "${sectionLabel}" dari Laporan Hasil Reviu dengan bahasa Indonesia yang formal, profesional, dan sesuai standar penulisan laporan inspektorat daerah.

${customInstruction ? `Instruksi Khusus dari Pengguna:\n${customInstruction}\n` : ''}
Tulis hanya isi narasinya saja, tanpa judul bagian.`;
  }

  return await callGemini(prompt);
}

/**
 * Generate keseluruhan laporan reviu sekaligus
 */
export async function generateFullReport({ jenisReviu, perihal, namaOpd, dasarHukum, settings }) {
  const dasarHukumText = dasarHukum && dasarHukum.length > 0
    ? dasarHukum.map(d => `- ${d.kode}: ${d.judul}`).join('\n')
    : '(belum dipilih)';

  const instansi = settings?.instansi_nama || 'Instansi Pengawas';
  const namaJabatan = settings?.jabatan_ppupd || 'PPUPD';

  const prompt = `Anda adalah seorang ${namaJabatan} dari ${instansi} yang sedang menyusun Laporan Hasil Reviu ${jenisReviu}.

Jenis Reviu: ${jenisReviu}
Perihal/Objek Reviu: ${perihal}
OPD Pemohon: ${namaOpd}
Dasar Hukum yang Digunakan:
${dasarHukumText}

Tugas Anda: Susunlah draft narasi untuk bagian-bagian berikut dari Laporan Hasil Reviu:

1. URAIAN HASIL REVIU - Narasi lengkap dan profesional, mencakup penelaahan substansi, kesesuaian dengan peraturan, dan temuan-temuan penting
2. SIMPULAN - Kesimpulan berdasarkan hasil reviu
3. REKOMENDASI - Saran perbaikan jika ada temuan

Format output:
=== URAIAN HASIL REVIU ===
[narasi]

=== SIMPULAN ===
[narasi]

=== REKOMENDASI ===
[narasi]

Gunakan bahasa Indonesia formal, baku, dan profesional sesuai standar penulisan laporan APIP/inspektorat daerah.`;

  const result = await callGemini(prompt);

  // Parse hasil AI
  const sections = {};
  const parts = result.split(/===\s*(.*?)\s*===/);
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i].toLowerCase().replace(/\s+/g, '_');
    sections[key] = parts[i + 1]?.trim() || '';
  }

  return {
    uraian_hasil: sections['uraian_hasil_reviu'] || sections['uraian_hasil'] || '',
    simpulan: sections['simpulan'] || '',
    rekomendasi: sections['rekomendasi'] || '',
    raw: result,
  };
}
