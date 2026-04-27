import React, { useRef } from 'react';
import { loadState } from '../lib/storage';
import { getAllTopics } from '../data/curriculum';
import { Download, Award, Lock } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Certificate() {
  const state = loadState();
  const all = getAllTopics();
  const completedCount = all.filter(t => state.completed[t.id]).length;
  const isEligible = completedCount === all.length && all.length > 0;
  const name = state.studentName || 'Student';
  const certRef = useRef(null);

  const avg = (() => {
    const scores = Object.values(state.completed || {}).map(x => x.score);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  })();

  const issued = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = 'PY-' + btoa(name + issued).replace(/[^A-Z0-9]/gi, '').slice(0, 10).toUpperCase();

  const download = () => {
    // Build PDF programmatically for crisp output
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // Outer thick border
    doc.setLineWidth(4);
    doc.setDrawColor(10, 10, 10);
    doc.rect(24, 24, W - 48, H - 48);
    doc.setLineWidth(1);
    doc.rect(36, 36, W - 72, H - 72);

    // Accent stripe top-left
    doc.setFillColor(0, 85, 255);
    doc.rect(36, 36, 160, 14, 'F');
    doc.setFillColor(255, 215, 0);
    doc.rect(196, 36, 80, 14, 'F');

    // Overline
    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text('PY / ACADEMY  ·  CERTIFICATE OF COMPLETION  ·  ' + certId, 60, 100);

    // Big title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(10, 10, 10);
    doc.setFontSize(60);
    doc.text('CERTIFIED', 60, 180);
    doc.setFontSize(28);
    doc.text('Python · Data Science · AI/ML', 60, 220);

    // Recipient
    doc.setFont('courier', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(90);
    doc.text('This certifies that', 60, 280);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(48);
    doc.setTextColor(10, 10, 10);
    doc.text(name.toUpperCase(), 60, 330);

    doc.setFont('courier', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(40);
    const body = 'has successfully completed all 28 topics across Python Basics, Python Advanced,\nData Science and AI / ML Engineering — including projects and exams passed at 70% or higher.';
    doc.text(body, 60, 370);

    // Stats block (right side)
    const rx = W - 280, ry = 260;
    doc.setLineWidth(1.5);
    doc.rect(rx, ry, 220, 160);
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('// RESULTS', rx + 12, ry + 20);
    doc.setFontSize(38);
    doc.setTextColor(10, 10, 10);
    doc.text(String(avg) + '%', rx + 12, ry + 70);
    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text('Average exam score', rx + 12, ry + 88);
    doc.setFont('courier', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(10, 10, 10);
    doc.text(completedCount + ' / ' + all.length + ' topics', rx + 12, ry + 125);
    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text('Curriculum completion', rx + 12, ry + 140);

    // Signature line + issuer
    const sy = H - 120;
    doc.setDrawColor(10, 10, 10);
    doc.setLineWidth(1.2);
    doc.line(60, sy, 260, sy);
    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(10, 10, 10);
    doc.text('PY / ACADEMY — Head of Curriculum', 60, sy + 16);

    doc.line(W - 260, sy, W - 60, sy);
    doc.text('Issued: ' + issued, W - 260, sy + 16);

    doc.save('Python-AI-Certificate-' + name.replace(/\s+/g, '_') + '.pdf');
  };

  if (!isEligible) {
    return (
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-20 text-center">
        <div className="border-2 border-black p-10 bg-white shadow-brutal">
          <Lock className="w-10 h-10 mx-auto" />
          <h1 className="font-display font-black text-4xl tracking-tight mt-4">Certificate locked</h1>
          <p className="font-mono text-sm text-neutral-700 mt-3">
            Complete all {all.length} topics by passing each exam with 70%+ to unlock your certificate.
          </p>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest">
            Progress: {completedCount} / {all.length}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">// certificate</div>
          <h1 className="font-display font-black text-5xl tracking-tighter mt-2">Congratulations, {state.studentName || 'Student'}.</h1>
        </div>
        <button onClick={download} data-testid="download-cert-btn"
          className="font-mono uppercase tracking-widest text-sm px-5 py-3 bg-[#0055FF] text-white border-2 border-black hover:bg-black inline-flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Visual preview */}
      <div ref={certRef} className="relative border-[6px] border-black bg-white p-10 md:p-14 shadow-brutal-lg" data-testid="certificate-preview">
        <div className="absolute top-6 left-6 flex gap-1">
          <div className="w-28 h-3 bg-[#0055FF] border-2 border-black" />
          <div className="w-12 h-3 bg-[#FFD700] border-2 border-black" />
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-10">
          PY / ACADEMY · CERTIFICATE OF COMPLETION · {certId}
        </div>
        <h2 className="font-display font-black text-7xl md:text-8xl tracking-tighter mt-3">CERTIFIED</h2>
        <div className="font-display font-bold text-2xl md:text-3xl tracking-tight mt-1">Python · Data Science · AI / ML</div>

        <div className="mt-10 font-mono text-xs uppercase tracking-widest text-neutral-500">this certifies that</div>
        <div className="font-display font-black text-5xl md:text-6xl tracking-tighter mt-3 bg-[#FFD700] inline-block px-4 py-1 border-2 border-black">
          {(state.studentName || 'Student').toUpperCase()}
        </div>

        <p className="font-mono text-sm leading-relaxed mt-6 max-w-2xl text-neutral-800">
          has successfully completed all {all.length} topics across Python Basics, Python Advanced,
          Data Science and AI / ML Engineering — including exams passed at 70% or higher.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <div className="border-2 border-black p-4">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">Average Score</div>
            <div className="font-display font-black text-4xl mt-1">{avg}%</div>
          </div>
          <div className="border-2 border-black p-4">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">Completion</div>
            <div className="font-display font-black text-4xl mt-1">{completedCount}/{all.length}</div>
          </div>
          <div className="border-2 border-black p-4 bg-[#00FF66]">
            <div className="font-mono text-[11px] uppercase tracking-widest">Status</div>
            <div className="font-display font-black text-4xl mt-1 flex items-center gap-2"><Award className="w-8 h-8" /> PASSED</div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div>
            <div className="h-px bg-black" />
            <div className="font-mono text-[11px] uppercase tracking-widest mt-2">PY/ACADEMY — Head of Curriculum</div>
          </div>
          <div>
            <div className="h-px bg-black" />
            <div className="font-mono text-[11px] uppercase tracking-widest mt-2">Issued: {issued}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
