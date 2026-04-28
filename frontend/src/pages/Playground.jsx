import React from 'react';
import CodePlayground from '../components/CodePlayground';

const starter = `# Python playground — experiment freely
import random

def flip(n=10):
    return [random.choice(["H", "T"]) for _ in range(n)]

flips = flip(20)
print("flips:", flips)
print("heads:", flips.count("H"))
print("tails:", flips.count("T"))
`;

export default function Playground() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">// playground</div>
      <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter mt-2">Free Playground</h1>
      <p className="font-mono text-sm text-neutral-700 mt-3 max-w-2xl">
        Write and run any Python. Powered by Pyodide — a full Python runtime in your browser. Your
        code is saved locally between visits.
      </p>

      <div className="mt-8">
        <CodePlayground initialCode={starter} storageKey="free_playground" testId="free-playground" minHeight={420} />
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          { t: 'Tip', d: 'Use print() to see values. The stdout panel captures everything.' },
          { t: 'Tip', d: 'Loading scientific packages (numpy, pandas) can be done via micropip inside code.' },
          { t: 'Tip', d: 'Press Run anytime. Reset reverts to the starter snippet.' },
        ].map((x) => (
          <div key={x.d} className="border-2 border-black p-4 bg-white">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{x.t}</div>
            <div className="font-mono text-sm mt-2">{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
