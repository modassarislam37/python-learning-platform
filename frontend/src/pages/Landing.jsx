import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, BarChart3, Brain, Rocket, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { loadState, saveState } from '../lib/storage';
import { curriculum, projects as projectList, getAllTopics } from '../data/curriculum';

export default function Landing() {
  const nav = useNavigate();
  const [name, setName] = useState(() => loadState().studentName || '');
  const totalTopics = getAllTopics().length;
  const totalQuestions = getAllTopics().reduce((s, t) => s + t.exam.length, 0);
  const totalProjects = projectList.length;

  const start = () => {
    const trimmed = name.trim() || 'Student';
    const s = loadState();
    s.studentName = trimmed;
    if (!s.startedAt) s.startedAt = new Date().toISOString();
    saveState(s);
    nav('/dashboard');
  };

  const tracks = [
    { icon: Terminal, title: 'Python Basics', desc: 'Syntax, functions, collections.' },
    { icon: Rocket, title: 'Python Advanced', desc: 'OOP, async, decorators, modules.' },
    { icon: BarChart3, title: 'Data Science', desc: 'NumPy, Pandas, stats, visualisation.' },
    { icon: Brain, title: 'AI / ML Engineering', desc: 'Models, transformers, MLOps.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6 flex items-center gap-3" data-testid="hero-overline">
              <span className="w-8 h-px bg-black inline-block" />
              Ed.01 / Curriculum for Future AI Engineers
            </div>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter" data-testid="hero-title">
              Learn Python.<br />
              <span className="inline-block px-3 bg-[#FFD700] border-2 border-black">Master</span> AI.<br />
              Get certified.
            </h1>
            <p className="mt-8 max-w-2xl font-mono text-base leading-relaxed text-neutral-700" data-testid="hero-sub">
              A focused, no-nonsense path from your first print() to training neural networks.
              Practice in a real in-browser Python playground. Pass exams to unlock the next topic.
              Finish the path and download your certificate.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-testid="name-input"
                className="flex-1 border-2 border-black px-4 py-3 font-mono uppercase tracking-widest text-sm focus:outline-none focus:border-[#0055FF]"
              />
              <button
                onClick={start}
                data-testid="start-learning-btn"
                className="group bg-black text-white font-mono uppercase tracking-widest text-sm px-6 py-3 border-2 border-black hover:bg-[#0055FF] transition-colors inline-flex items-center gap-2 justify-center"
              >
                Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              <Stat n={String(totalTopics)} l="Topics" />
              <Stat n={`${totalQuestions}+`} l="Exam Qs" />
              <Stat n={String(totalProjects)} l="Projects" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border-2 border-black p-5 bg-[#F4F4F5] shadow-brutal">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-3">// signal / sample</div>
              <pre className="font-mono text-[13px] leading-relaxed text-black whitespace-pre-wrap">
{`from academy import learn

for topic in path:
    study(topic)
    practice(topic)
    if exam(topic) >= 0.7:
        unlock(next)

ship("you as an AI engineer")`}
              </pre>
            </div>
            <div className="mt-4 border-2 border-black p-5 bg-[#0055FF] text-white">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">// why py/academy</div>
              <ul className="mt-3 space-y-2 font-mono text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Real in-browser Python (Pyodide).</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> 70% exams gate every topic.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> Certificate on completion.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> No sign-up, saved on device.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">02 / The Path</div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mt-2">Four tracks. One outcome.</h2>
            </div>
            <Link to="/curriculum" data-testid="view-curriculum-link"
              className="font-mono uppercase tracking-widest text-sm border-2 border-black px-5 py-3 hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2">
              Full Curriculum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((t, i) => {
              const Icon = t.icon;
              const count = curriculum[i].topics.length;
              return (
                <div key={t.title} className="border-2 border-black p-6 bg-white shadow-brutal transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white">
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest bg-[#FFD700] border border-black px-2 py-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl mt-5 tracking-tight">{t.title}</h3>
                  <p className="font-mono text-sm text-neutral-700 mt-2 leading-relaxed">{t.desc}</p>
                  <div className="mt-5 pt-5 border-t border-black/20 font-mono text-xs uppercase tracking-widest text-neutral-600">
                    {count} topics · {count * 5} exam questions
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid md:grid-cols-4 gap-6">
          <Step n="01" t="Learn" d="Read focused lessons, watch a short tutorial, run real Python in the browser." />
          <Step n="02" t="Practice" d="Answer MCQs with instant explanations. Unlimited retries. Must get 100% to unlock the exam." />
          <Step n="03" t="Prove" d="Pass a 70% exam (MCQ + output + fill-ins) to unlock the next topic." />
          <Step n="04" t="Earn" d="Build projects, complete all tracks, and download your certificate." />
        </div>
      </section>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div className="border-2 border-black p-4">
      <div className="font-display font-black text-3xl leading-none">{n}</div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-600 mt-2">{l}</div>
    </div>
  );
}
function Step({ n, t, d }) {
  return (
    <div className="border-2 border-black p-6">
      <div className="font-mono text-xs uppercase tracking-widest text-neutral-500">{n}</div>
      <div className="font-display font-bold text-2xl tracking-tight mt-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5" />{t}</div>
      <p className="font-mono text-sm text-neutral-700 mt-3 leading-relaxed">{d}</p>
    </div>
  );
}
