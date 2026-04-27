import React, { useState } from 'react';
import { projects, curriculum } from '../data/curriculum';
import { loadState, saveState } from '../lib/storage';
import { CheckCircle2, Circle, FolderKanban } from 'lucide-react';

export default function Projects() {
  const [state, setState] = useState(loadState());
  const toggle = (pid) => {
    const s = loadState();
    s.projectsDone = { ...s.projectsDone };
    if (s.projectsDone[pid]) delete s.projectsDone[pid];
    else s.projectsDone[pid] = new Date().toISOString();
    saveState(s);
    setState(s);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">// projects</div>
      <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter mt-2">Build to Learn</h1>
      <p className="font-mono text-sm text-neutral-700 mt-3 max-w-2xl">
        Projects are where lessons become skills. Pick one, build it locally in your IDE, then mark it done.
      </p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => {
          const track = curriculum.find(t => t.id === p.track);
          const done = !!state.projectsDone?.[p.id];
          return (
            <div key={p.id} className={`border-2 border-black p-6 flex flex-col ${done ? 'bg-black text-white' : 'bg-white'}`} data-testid={`project-${p.id}`}>
              <div className="flex items-center justify-between">
                <div className={`font-mono text-[11px] uppercase tracking-widest ${done ? 'text-white/60' : 'text-neutral-500'}`}>{track?.name}</div>
                <span className={`font-mono text-[11px] uppercase tracking-widest border px-2 py-1 ${done ? 'border-white text-white' : 'border-black bg-[#FFD700] text-black'}`}>{p.level}</span>
              </div>
              <div className="font-display font-bold text-2xl tracking-tight mt-4 flex items-center gap-2">
                <FolderKanban className="w-5 h-5" /> {p.title}
              </div>
              <p className={`font-mono text-sm mt-3 leading-relaxed ${done ? 'text-white/80' : 'text-neutral-700'}`}>{p.brief}</p>
              <button
                onClick={() => toggle(p.id)}
                data-testid={`project-toggle-${p.id}`}
                className={`mt-auto pt-5 font-mono uppercase tracking-widest text-xs inline-flex items-center gap-2 self-start`}
              >
                {done ? <><CheckCircle2 className="w-4 h-4" /> Completed</> : <><Circle className="w-4 h-4" /> Mark done</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
