import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, getAllTopics } from '../data/curriculum';
import { loadState, exportAllData, importAllData } from '../lib/storage';
import { Flame, Trophy, BookOpen, ArrowRight, ChevronRight, Circle, CheckCircle2, HardDrive, Download, Upload } from 'lucide-react';

export default function Dashboard() {
  const [state, setState] = useState(() => loadState());
  const all = getAllTopics();
  const completed = Object.keys(state.completed || {}).length;
  const total = all.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const fileRef = useRef(null);
  const [importMsg, setImportMsg] = useState('');

  const nextTopic = useMemo(() => all.find(t => !state.completed[t.id]) || null, [all, state]);

  const avgScore = useMemo(() => {
    const scores = Object.values(state.completed || {}).map(x => x.score);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [state]);

  const onExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `py-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setImportMsg('Progress exported.');
    setTimeout(() => setImportMsg(''), 2500);
  };

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      importAllData(json);
      setState(loadState());
      setImportMsg('Progress imported successfully.');
    } catch (err) {
      setImportMsg('Could not import: ' + err.message);
    } finally {
      e.target.value = '';
      setTimeout(() => setImportMsg(''), 3500);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">// dashboard</div>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight mt-2" data-testid="dashboard-heading">
            Hi, {state.studentName || 'Student'}.
          </h1>
          <p className="font-mono text-sm text-neutral-700 mt-2">
            {completed === 0 ? 'Start with your first lesson below.' : `You've completed ${completed}/${total} topics.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div
            data-testid="saved-locally-badge"
            className="font-mono text-[11px] uppercase tracking-widest border-2 border-black px-3 py-2 bg-[#F4F4F5] inline-flex items-center gap-2"
            title="Your progress is saved in this browser"
          >
            <HardDrive className="w-3.5 h-3.5" /> Saved on this device
          </div>
          <button onClick={onExport} data-testid="export-progress-btn"
            className="font-mono uppercase tracking-widest text-xs px-3 py-2 border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} data-testid="import-progress-btn"
            className="font-mono uppercase tracking-widest text-xs px-3 py-2 border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2">
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onImportFile} data-testid="import-file-input" />
          {completed === total && total > 0 && (
            <Link to="/certificate" data-testid="get-certificate-btn"
              className="font-mono uppercase tracking-widest text-sm px-5 py-3 bg-[#FFD700] border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Get Certificate
            </Link>
          )}
        </div>
      </div>

      {importMsg && (
        <div data-testid="import-message" className="mb-6 font-mono text-xs uppercase tracking-widest border-2 border-black bg-[#00FF66] px-4 py-2">
          {importMsg}
        </div>
      )}

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Progress" value={`${pct}%`} icon={BookOpen} accent="#0055FF" testId="stat-progress" />
        <StatCard label="Topics Done" value={`${completed}/${total}`} icon={CheckCircle2} accent="#00FF66" testId="stat-topics" />
        <StatCard label="Avg Score" value={`${avgScore}%`} icon={Trophy} accent="#FFD700" testId="stat-avg-score" />
        <StatCard label="Streak" value={`${state.streak?.count || 0}d`} icon={Flame} accent="#FF3333" testId="stat-streak" />
      </div>

      {/* Progress bar */}
      <div className="mt-10 border-2 border-black p-6">
        <div className="flex justify-between items-baseline">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">// overall progress</div>
          <div className="font-mono text-xs">{completed} / {total} topics</div>
        </div>
        <div className="mt-4 h-8 border-2 border-black relative bg-[#F4F4F5]">
          <div className="absolute left-0 top-0 bottom-0 bg-[#0055FF]" style={{ width: `${pct}%` }} data-testid="progress-bar" />
        </div>
      </div>

      {/* Continue card */}
      {nextTopic && (
        <Link to={`/learn/${nextTopic.id}`} data-testid="continue-learning-link"
          className="block mt-8 border-2 border-black p-6 shadow-brutal-lg hover:-translate-y-1 transition-all bg-[#0A0A0A] text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">// continue</div>
              <div className="font-display font-extrabold text-3xl tracking-tight mt-1">{nextTopic.title}</div>
              <div className="font-mono text-xs uppercase tracking-widest mt-2 text-white/70">{nextTopic.trackName} · {nextTopic.minutes} min</div>
            </div>
            <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-sm">
              Resume <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      )}

      {/* Tracks summary */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {curriculum.map(track => {
          const done = track.topics.filter(t => state.completed[t.id]).length;
          const tot = track.topics.length;
          const tp = Math.round((done / tot) * 100);
          return (
            <Link key={track.id} to="/curriculum" data-testid={`track-card-${track.id}`}
              className="border-2 border-black p-6 hover:-translate-y-1 hover:shadow-brutal transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">Track {track.code}</div>
                  <div className="font-display font-bold text-2xl mt-1 tracking-tight">{track.name}</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="font-mono text-sm text-neutral-700 mt-3">{track.description}</p>
              <div className="mt-4 h-2 border border-black relative bg-white">
                <div className="absolute left-0 top-0 bottom-0 bg-black" style={{ width: `${tp}%` }} />
              </div>
              <div className="mt-2 font-mono text-xs text-neutral-600">{done}/{tot} topics · {tp}%</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent, testId }) {
  return (
    <div className="border-2 border-black p-5 bg-white" data-testid={testId}>
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 border-2 border-black flex items-center justify-center" style={{ background: accent }}>
          <Icon className="w-4 h-4" strokeWidth={2.5} />
        </div>
        <Circle className="w-3 h-3" />
      </div>
      <div className="font-display font-black text-3xl mt-4 leading-none">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-600 mt-2">{label}</div>
    </div>
  );
}
