import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LayoutDashboard, GraduationCap, FolderKanban, Terminal, Award } from 'lucide-react';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, id: 'nav-dashboard' },
  { to: '/curriculum', label: 'Curriculum', icon: GraduationCap, id: 'nav-curriculum' },
  { to: '/playground', label: 'Playground', icon: Terminal, id: 'nav-playground' },
  { to: '/projects', label: 'Projects', icon: FolderKanban, id: 'nav-projects' },
  { to: '/certificate', label: 'Certificate', icon: Award, id: 'nav-certificate' },
];

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Marquee */}
      <div className="border-b-2 border-black bg-[#0055FF] text-white overflow-hidden">
        <div className="animate-marquee flex gap-10 py-2 font-mono text-xs uppercase tracking-[0.25em] whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Python</span><span>/</span><span>Data Science</span><span>/</span><span>AI Engineering</span><span>/</span><span>Build. Practice. Master.</span><span>/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Top nav */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" data-testid="brand-link">
            <div className="w-10 h-10 border-2 border-black bg-[#FFD700] flex items-center justify-center">
              <Code2 className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-black text-lg leading-none tracking-tight">PY/ACADEMY</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">v1.0 — learn.practice.certify</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(n => {
              const active = location.pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link key={n.to} to={n.to} data-testid={n.id}
                  className={`font-mono uppercase text-xs tracking-widest px-3 py-2 border-2 ${active ? 'bg-black text-white border-black' : 'border-transparent hover:border-black'}`}>
                  <span className="inline-flex items-center gap-2"><Icon className="w-3.5 h-3.5" />{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-2 border-black py-6 mt-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-wrap gap-4 items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-600">
          <span>© PY/ACADEMY — Built for future data scientists</span>
          <span>Progress stored locally · no account needed</span>
        </div>
      </footer>
    </div>
  );
}
