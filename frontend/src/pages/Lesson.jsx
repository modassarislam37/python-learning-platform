import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { curriculum, getAllTopics } from '../data/curriculum';
import { getTopicMeta } from '../data/meta';
import { loadState, isTopicUnlocked, saveState } from '../lib/storage';
import CodePlayground from '../components/CodePlayground';
import { ArrowRight, ArrowLeft, GraduationCap, Play, ExternalLink, Lightbulb, NotebookPen, Save } from 'lucide-react';

export default function Lesson() {
  const { topicId } = useParams();
  const nav = useNavigate();
  const all = getAllTopics();
  const topic = all.find(t => t.id === topicId);
  const state = loadState();
  const meta = topic ? getTopicMeta(topic.id) : null;

  const [showVideo, setShowVideo] = useState(false);
  const [notes, setNotes] = useState(() => localStorage.getItem(`notes:${topicId}`) || '');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => { setNotes(localStorage.getItem(`notes:${topicId}`) || ''); setNoteSaved(false); }, [topicId]);

  const saveNote = () => {
    localStorage.setItem(`notes:${topicId}`, notes);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  if (!topic) {
    return <div className="max-w-[900px] mx-auto px-6 py-20 font-mono">Topic not found. <Link to="/curriculum" className="underline">Go back</Link></div>;
  }
  if (!isTopicUnlocked(topic, curriculum, state)) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-20 font-mono">
        This topic is locked. Pass the previous topic's exam first.
        <div className="mt-6"><Link to="/curriculum" className="border-2 border-black px-4 py-2 uppercase tracking-widest text-xs hover:bg-black hover:text-white">Back to curriculum</Link></div>
      </div>
    );
  }

  const idx = all.findIndex(t => t.id === topic.id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const nextUnlocked = next ? isTopicUnlocked(next, curriculum, { ...state, completed: { ...state.completed, [topic.id]: state.completed[topic.id] || { score: 100 } } }) : false;

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic.title + ' python tutorial')}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${meta.yt}?start=${meta.ytStart || 0}&rel=0`;

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
      <Link to="/curriculum" data-testid="back-to-curriculum" className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:underline">
        <ArrowLeft className="w-3 h-3" /> Curriculum
      </Link>

      <div className="mt-4 border-b-2 border-black pb-6">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">{topic.trackName}</div>
        <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter mt-2" data-testid="lesson-title">{topic.title}</h1>
        <div className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-600">~{topic.minutes} min read · {topic.exam.length} exam questions</div>
      </div>

      {/* Video row */}
      <div className="mt-8 border-2 border-black" data-testid="video-block">
        <div className="flex items-center justify-between bg-[#0A0A0A] text-white px-4 py-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em]">// video · {topic.title}</div>
          <a href={searchUrl} target="_blank" rel="noreferrer" data-testid="yt-search-link"
            className="font-mono text-[11px] uppercase tracking-widest inline-flex items-center gap-1.5 border border-white/40 px-3 py-1 hover:bg-white hover:text-black">
            Search YouTube <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        {showVideo ? (
          <div className="aspect-video bg-black">
            <iframe
              src={embedUrl}
              title={topic.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              data-testid="video-iframe"
            />
          </div>
        ) : (
          <button onClick={() => setShowVideo(true)} data-testid="play-video-btn"
            className="w-full aspect-video bg-[#0A0A0A] text-white flex flex-col items-center justify-center hover:bg-[#0055FF] transition-colors group">
            <div className="w-16 h-16 border-2 border-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-white" />
            </div>
            <div className="font-display font-extrabold text-2xl tracking-tight">Watch a short tutorial</div>
            <div className="font-mono text-[11px] uppercase tracking-widest mt-2 text-white/60">Click to load YouTube player</div>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-10 mt-10">
        <article className="lg:col-span-7 space-y-6">
          <div className="font-mono text-[15px] leading-[1.85] whitespace-pre-wrap text-neutral-900" data-testid="lesson-content">
            {topic.lesson}
          </div>

          <div className="border-2 border-black">
            <div className="bg-[#0A0A0A] text-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em]">// example</div>
            <pre className="bg-[#0A0A0A] text-[#F4F4F5] p-5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap overflow-auto">{topic.example}</pre>
          </div>

          {/* Key takeaways */}
          {meta.takeaways?.length > 0 && (
            <div className="border-2 border-black p-5 bg-[#F4F4F5]" data-testid="takeaways-block">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-600">
                <Lightbulb className="w-3.5 h-3.5" /> key takeaways
              </div>
              <ul className="mt-3 space-y-2">
                {meta.takeaways.map((t, i) => (
                  <li key={t} className="flex gap-3 font-mono text-sm">
                    <span className="w-5 h-5 shrink-0 bg-[#FFD700] border border-black text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Personal notes */}
          <div className="border-2 border-black" data-testid="notes-block">
            <div className="flex items-center justify-between bg-white border-b-2 border-black px-4 py-2">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] inline-flex items-center gap-2">
                <NotebookPen className="w-3.5 h-3.5" /> your notes
              </div>
              <button onClick={saveNote} data-testid="save-notes-btn"
                className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 bg-black text-white hover:bg-[#0055FF] inline-flex items-center gap-1.5">
                <Save className="w-3 h-3" /> {noteSaved ? 'Saved' : 'Save'}
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); setNoteSaved(false); }}
              placeholder="Jot down anything — explanations in your own words, questions, code snippets…"
              rows={5}
              data-testid="notes-textarea"
              className="w-full p-4 font-mono text-sm leading-relaxed outline-none resize-y"
            />
          </div>
        </article>

        <aside className="lg:col-span-5 space-y-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">// try it live</div>
          <CodePlayground
            initialCode={topic.example}
            storageKey={topic.id}
            testId={`lesson-${topic.id}-playground`}
            minHeight={320}
          />

          <div className="border-2 border-black p-5 bg-[#FFD700]">
            <div className="font-display font-extrabold text-2xl tracking-tight">Ready to prove it?</div>
            <p className="font-mono text-sm mt-2">
              Pass a 5-question exam with 70%+ to unlock the next topic.
            </p>
            <button
              onClick={() => nav(`/exam/${topic.id}`)}
              data-testid="take-exam-btn"
              className="mt-4 w-full font-mono uppercase tracking-widest text-sm px-5 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black inline-flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" /> Take the Exam
            </button>
          </div>

          {state.completed[topic.id] && (
            <div className="border-2 border-black p-4 bg-[#00FF66] font-mono text-xs uppercase tracking-widest">
              Topic completed · score {state.completed[topic.id].score}%
            </div>
          )}
        </aside>
      </div>

      <div className="mt-14 flex items-center justify-between border-t-2 border-black pt-6">
        <div>
          {prev && isTopicUnlocked(prev, curriculum, state) && (
            <Link to={`/learn/${prev.id}`} data-testid="prev-topic" className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3 h-3" /> {prev.title}
            </Link>
          )}
        </div>
        <div>
          {next && nextUnlocked && (
            <Link to={`/learn/${next.id}`} data-testid="next-topic" className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:underline">
              {next.title} <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// avoid unused-var lint
void saveState;
