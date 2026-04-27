import React from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { loadState, isTopicUnlocked } from '../lib/storage';
import { Lock, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function Curriculum() {
  const state = loadState();

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">// curriculum</div>
      <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter mt-2">The Full Path</h1>
      <p className="font-mono text-sm text-neutral-700 mt-3 max-w-2xl">
        Each topic unlocks after you pass the previous one with 70%+. Work your way from first line
        of Python to deploying ML models.
      </p>

      <div className="mt-10 space-y-16">
        {curriculum.map((track, ti) => (
          <div key={track.id} data-testid={`track-${track.id}`}>
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">Track / {track.code}</div>
                <h2 className="font-display font-extrabold text-4xl tracking-tight mt-1">{track.name}</h2>
                <p className="font-mono text-sm text-neutral-700 mt-1">{track.description}</p>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest border-2 border-black px-3 py-2">
                {track.topics.length} topics
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {track.topics.map((topic, idx) => {
                const unlocked = isTopicUnlocked(topic, curriculum, state);
                const done = !!state.completed[topic.id];
                const score = state.completed[topic.id]?.score;

                const tile = (
                  <div className={`h-full border-2 p-5 transition-all ${done ? 'bg-black text-white border-black' : unlocked ? 'bg-white border-black hover:-translate-y-1 shadow-brutal' : 'bg-[#F4F4F5] border-dashed border-neutral-400 text-neutral-500'}`}>
                    <div className="flex items-center justify-between">
                      <div className={`font-mono text-[11px] uppercase tracking-[0.2em] ${done ? 'text-white/60' : 'text-neutral-500'}`}>
                        {track.code}.{String(idx + 1).padStart(2, '0')}
                      </div>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : unlocked ? <Circle className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div className="font-display font-bold text-xl tracking-tight mt-3 leading-tight">{topic.title}</div>
                    <div className={`font-mono text-xs mt-2 ${done ? 'text-white/70' : 'text-neutral-600'}`}>{topic.minutes} min · {topic.exam.length} questions</div>
                    {done && <div className="mt-4 font-mono text-xs uppercase tracking-widest inline-block bg-[#00FF66] text-black px-2 py-1 border border-white">Passed · {score}%</div>}
                    {unlocked && !done && (
                      <div className="mt-4 font-mono text-xs uppercase tracking-widest inline-flex items-center gap-1">Start <ArrowRight className="w-3 h-3" /></div>
                    )}
                    {!unlocked && <div className="mt-4 font-mono text-xs uppercase tracking-widest">Locked</div>}
                  </div>
                );

                return unlocked ? (
                  <Link key={topic.id} to={`/learn/${topic.id}`} data-testid={`topic-link-${topic.id}`} className="block h-full">{tile}</Link>
                ) : (
                  <div key={topic.id} data-testid={`topic-locked-${topic.id}`} className="h-full cursor-not-allowed">{tile}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
