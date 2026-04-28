import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllTopics } from '../data/curriculum';
import { loadState, saveState, touchStreak, isExamUnlocked } from '../lib/storage';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Lightbulb, Dumbbell, Lock } from 'lucide-react';

export default function Exam() {
  const { topicId } = useParams();
  const nav = useNavigate();
  const topic = useMemo(() => getAllTopics().find(t => t.id === topicId), [topicId]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [hints, setHints] = useState({});

  const questions = topic?.exam || [];

  const normalize = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase();

  const isCorrect = (q, a) => {
    if (a === undefined || a === null || a === '') return false;
    if (q.type === 'mcq') return Number(a) === q.answer;
    return normalize(a) === normalize(q.answer);
  };

  const score = useMemo(() => {
    if (!questions.length) return 0;
    const correct = questions.reduce((acc, q, i) => {
      if (answers[i] === undefined || answers[i] === null || answers[i] === '') return acc;
      if (q.type === 'mcq') return acc + (Number(answers[i]) === q.answer ? 1 : 0);
      return acc + (normalize(answers[i]) === normalize(q.answer) ? 1 : 0);
    }, 0);
    return Math.round((correct / questions.length) * 100);
  }, [answers, questions]);

  if (!topic) return <div className="p-10 font-mono">Topic not found.</div>;

  const passed = score >= 70;

  const submit = () => {
    setSubmitted(true);
    if (score >= 70) {
      const s = loadState();
      s.completed = { ...s.completed, [topic.id]: { score, passedAt: new Date().toISOString() } };
      saveState(touchStreak(s));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retry = () => { setAnswers({}); setSubmitted(false); };

  const allTopics = getAllTopics();
  const idx = allTopics.findIndex(t => t.id === topic.id);
  const next = idx < allTopics.length - 1 ? allTopics[idx + 1] : null;

  const state = loadState();
  const examReady = isExamUnlocked(topic.id, state);

  if (!examReady) {
    return (
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20">
        <div className="border-2 border-black p-8 bg-[#FFD700]" data-testid="exam-locked-screen">
          <Lock className="w-10 h-10" />
          <div className="font-display font-black text-4xl tracking-tight mt-3">Exam locked</div>
          <p className="font-mono text-sm mt-3 max-w-lg">
            Complete the practice set first so you know you're ready. Pass all practice
            questions (unlimited retries) to unlock this exam.
          </p>
          <Link to={`/practice/${topic.id}`} data-testid="goto-practice-link"
            className="mt-6 inline-flex items-center gap-2 font-mono uppercase tracking-widest text-sm px-5 py-3 bg-black text-white border-2 border-black hover:bg-[#0055FF]">
            <Dumbbell className="w-4 h-4" /> Start Practice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">Exam / {topic.trackName}</div>
      <h1 className="font-display font-black text-5xl tracking-tighter mt-2" data-testid="exam-title">{topic.title}</h1>
      <div className="font-mono text-xs uppercase tracking-widest text-neutral-600 mt-2">Pass with 70% or higher · {questions.length} questions</div>

      {submitted && (
        <div className={`mt-8 border-2 border-black p-6 ${passed ? 'bg-[#00FF66]' : 'bg-[#FF3333] text-white'}`} data-testid="exam-result">
          <div className="flex items-center gap-3 flex-wrap">
            {passed ? <Trophy className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <div className="font-display font-black text-3xl tracking-tight">
              {passed ? 'Passed' : 'Not yet'} · {score}%
            </div>
          </div>
          <p className="font-mono text-sm mt-2">
            {passed
              ? `Excellent. ${next ? `Next topic unlocked: ${next.title}.` : 'You just completed the final topic!'}`
              : `You need 70% to pass. Review the lesson and try again.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {passed && next && (
              <Link to={`/learn/${next.id}`} data-testid="exam-next-topic" className="font-mono uppercase tracking-widest text-sm px-5 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black inline-flex items-center gap-2">
                Next Topic <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {passed && !next && (
              <Link to="/certificate" data-testid="exam-go-cert" className="font-mono uppercase tracking-widest text-sm px-5 py-3 bg-[#FFD700] text-black border-2 border-black hover:bg-white inline-flex items-center gap-2">
                View Certificate <Trophy className="w-4 h-4" />
              </Link>
            )}
            <button onClick={retry} data-testid="exam-retry" className="font-mono uppercase tracking-widest text-sm px-5 py-3 border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2 bg-white text-black">
              <RotateCcw className="w-4 h-4" /> Retry
            </button>
            <Link to={`/learn/${topic.id}`} data-testid="exam-review" className="font-mono uppercase tracking-widest text-sm px-5 py-3 border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2 bg-white text-black">
              Review Lesson
            </Link>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-8">
        {questions.map((q, i) => (
          <div key={q.q} className="border-2 border-black p-6" data-testid={`question-${i}`}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Q{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest border border-black px-2 py-0.5">{q.type}</span>
              {!submitted && (
                <button
                  type="button"
                  onClick={() => setHints(h => ({ ...h, [i]: !h[i] }))}
                  data-testid={`q${i}-hint-btn`}
                  className="ml-auto font-mono text-[11px] uppercase tracking-widest inline-flex items-center gap-1 border border-black px-2 py-0.5 hover:bg-[#FFD700]"
                >
                  <Lightbulb className="w-3 h-3" /> {hints[i] ? 'Hide hint' : 'Hint'}
                </button>
              )}
            </div>
            {hints[i] && !submitted && (
              <div className="mt-3 p-3 border border-dashed border-black bg-[#F4F4F5] font-mono text-xs" data-testid={`q${i}-hint`}>
                {q.type === 'mcq'
                  ? `Tip: only ${q.options.length} options — eliminate the obviously wrong ones first.`
                  : q.type === 'output'
                    ? `Tip: the expected answer has ${String(q.answer).length} characters and starts with "${String(q.answer).charAt(0)}".`
                    : `Tip: the answer starts with "${String(q.answer).charAt(0)}" and has ${String(q.answer).length} characters.`
                }
              </div>
            )}
            <pre className="font-mono text-[15px] leading-relaxed whitespace-pre-wrap mt-3">{q.q}</pre>

            <div className="mt-4">
              {q.type === 'mcq' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oi) => {
                    const sel = answers[i] === oi;
                    const correct = submitted && oi === q.answer;
                    const wrong = submitted && sel && oi !== q.answer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => !submitted && setAnswers(a => ({ ...a, [i]: oi }))}
                        data-testid={`q${i}-opt-${oi}`}
                        className={`text-left font-mono text-sm px-4 py-3 border-2 transition-all
                          ${correct ? 'bg-[#00FF66] border-black' :
                            wrong ? 'bg-[#FF3333] text-white border-black' :
                            sel ? 'bg-black text-white border-black' :
                            'bg-white border-black hover:-translate-y-0.5'}`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {(q.type === 'fill' || q.type === 'output') && (
                <div>
                  <input
                    type="text"
                    disabled={submitted}
                    value={answers[i] || ''}
                    onChange={(e) => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                    placeholder={q.type === 'output' ? 'Exact output...' : 'Your answer...'}
                    data-testid={`q${i}-input`}
                    className="w-full border-2 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#0055FF]"
                  />
                  {submitted && (
                    <div className={`mt-2 font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 ${isCorrect(q, answers[i]) ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect(q, answers[i]) ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      Answer: <span className="bg-[#FFD700] text-black px-2 py-0.5 border border-black">{q.answer}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <button onClick={() => nav(`/learn/${topic.id}`)} className="font-mono uppercase tracking-widest text-sm px-5 py-3 border-2 border-black hover:bg-black hover:text-white">
            Back to Lesson
          </button>
          <button onClick={submit} data-testid="submit-exam-btn"
            className="font-mono uppercase tracking-widest text-sm px-6 py-3 bg-[#0055FF] text-white border-2 border-black hover:bg-black inline-flex items-center gap-2">
            Submit Exam <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
