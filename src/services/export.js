import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { getTemplate } from '../data/templates.js';

export async function exportToWord(review, opd, settings, selectedRegulations) {
  const template = getTemplate(review.jenis_reviu);
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  // Membuat array konten untuk dokumen docx
  const docChildren = [];

  // Header Instansi
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: settings.instansi_nama || 'INSPEKTORAT', bold: true, size: 28 }), // size is in half-points (28 = 14pt)
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: settings.instansi_kota || '', size: 24 }),
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: template.judul_laporan, bold: true, size: 28 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `Perihal: ${review.perihal}`, size: 24 }),
      ],
      spacing: { after: 400 }
    })
  );

  // Bagian-bagian laporan
  template.sections.forEach(s => {
    let contentText = '';
    
    if (s.id === 'dasar_hukum') {
      contentText = selectedRegulations.length > 0
        ? selectedRegulations.map((r, i) => `${i + 1}. ${r.kode} — ${r.judul};`).join('\n')
        : '(belum dipilih)';
    } else {
      contentText = review.konten_laporan?.[s.id] || '';
    }

    if (contentText) {
      // Judul Bagian
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: s.label, bold: true, size: 24 })
          ],
          spacing: { before: 200, after: 100 }
        })
      );

      // Pisahkan baris konten
      const lines = contentText.split('\n');
      lines.forEach(line => {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: line, size: 24 })
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 100 }
          })
        );
      });
    }
  });

  // Tanda tangan
  docChildren.push(
    new Paragraph({
      spacing: { before: 600 }
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: `${settings.instansi_kota || '___'}, ${today}`, size: 24 })
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: settings.jabatan_ppupd || 'PPUPD', size: 24, italics: true })
      ],
      spacing: { after: 800 } // Ruang untuk tanda tangan
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: settings.nama_ppupd || '______________________', size: 24, bold: true })
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: `NIP. ${settings.nip_ppupd || '__________________'}`, size: 24 })
      ]
    })
  );

  // Buat Dokumen
  const doc = new Document({
    sections: [{
      properties: {},
      children: docChildren
    }]
  });

  // Export dan Download
  const blob = await Packer.toBlob(doc);
  const fileName = `Laporan_Reviu_${review.perihal.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}.docx`;
  saveAs(blob, fileName);
}
