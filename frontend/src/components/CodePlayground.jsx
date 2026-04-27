import React, { useEffect, useState } from 'react';
import { usePyodide } from '../hooks/usePyodide';
import { Play, Loader2, RotateCcw } from 'lucide-react';

export default function CodePlayground({ initialCode = '', testId = 'playground', storageKey = null, minHeight = 260 }) {
  const { ready, error, run } = usePyodide();
  const [code, setCode] = useState(() => {
    if (storageKey) {
      const saved = localStorage.getItem(`code:${storageKey}`);
      if (saved !== null) return saved;
    }
    return initialCode;
  });
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (storageKey) localStorage.setItem(`code:${storageKey}`, code);
  }, [code, storageKey]);

  const onRun = async () => {
    setRunning(true);
    setOutput('> running...\n');
    const { stdout, stderr } = await run(code);
    const out = (stdout || '') + (stderr ? `\n${stderr}` : '');
    setOutput(out.trim() || '> (no output)');
    setRunning(false);
  };

  const reset = () => setCode(initialCode);

  return (
    <div className="border-2 border-black bg-white" data-testid={`${testId}-wrapper`}>
      <div className="flex items-center justify-between border-b-2 border-black px-4 py-2 bg-[#0A0A0A] text-white">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em]">python · main.py</div>
        <div className="flex gap-2">
          <button onClick={reset} data-testid={`${testId}-reset`}
            className="font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border border-white/40 hover:bg-white hover:text-black inline-flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3" />Reset
          </button>
          <button onClick={onRun} disabled={!ready || running} data-testid={`${testId}-run`}
            className="font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 bg-[#00FF66] text-black hover:bg-white disabled:opacity-50 inline-flex items-center gap-1.5">
            {running ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
            {ready ? (running ? 'Running' : 'Run') : 'Loading Py...'}
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          data-testid={`${testId}-editor`}
          className="w-full font-mono text-[13px] leading-relaxed p-4 outline-none resize-y border-r-2 border-black bg-white text-black"
          style={{ minHeight }}
        />
        <pre
          data-testid={`${testId}-output`}
          className="p-4 bg-[#0A0A0A] text-[#00FF66] font-mono text-[13px] leading-relaxed overflow-auto whitespace-pre-wrap"
          style={{ minHeight }}
        >
          {error ? `Error loading Python: ${error}` : (output || '> output appears here when you click Run')}
        </pre>
      </div>
    </div>
  );
}
