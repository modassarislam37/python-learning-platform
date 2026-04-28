import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllTopics } from '../data/curriculum';
import { getPractice } from '../data/practice';
import { loadState, markPracticeDone } from '../lib/storage';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Dumbbell, BookOpen, Trophy } from 'lucide-react';

export default function Practice() {
  const { topicId } = useParams();
  const nav = useNavigate();
  const topic = useMemo(() => getAllTopics().find(t => t.id === topicId), [topicId]);
  const questions = useMemo(() => getPractice(topicId), [topicId]);

  const [picked, setPicked] = useState({});    // { i: optionIdx }
  const [revealed, setRevealed] = useState({}); // { i: true }
  const [attempts, setAttempts] = useState(1);
  const [finished, setFinished] = useState(() => !!loadState().practiceDone?.[topicId]);

  if (!topic) return <div className="p-10 font-mono">Topic not found.</div>;
  if (questions.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 font-mono">
        No practice set for this topic yet. <Link to={`/exam/${topicId}`} className="underline">Continue to Exam</Link>
      </div>
    );
  }

  const answeredAll = questions.every((_, i) => picked[i] !== undefined);
  const correctCount = questions.reduce((acc, q, i) => acc + (picked[i] === q.a ? 1 : 0), 0);
  const allCorrect = correctCount === questions.length;

  const select = (qi, oi) => {
    if (revealed[qi]) return;
    setPicked(p => ({ ...p, [qi]: oi }));
    setRevealed(r => ({ ...r, [qi]: true }));
  };

  const tryAgain = () => {
    // Reset only the incorrect ones so the learner focuses on what they missed.
    const newPicked = { ...picked };
    const newRevealed = { ...revealed };
    questions.forEach((q, i) => {
      if (picked[i] !== q.a) {
        delete newPicked[i];
        delete newRevealed[i];
      }
    });
    setPicked(newPicked);
    setRevealed(newRevealed);
    setAttempts(a => a + 1);
  };

  const finishPractice = () => {
    markPracticeDone(topic.id, attempts);
    setFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const examUnlocked = finished;

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">Practice · {topic.trackName}</div>
      <h1 className="font-display font-black text-5xl tracking-tighter mt-2" data-testid="practice-title">{topic.title}</h1>
      <div className="font-mono text-xs uppercase tracking-widest text-neutral-600 mt-2">
        Answer all {questions.length} questions correctly to unlock the exam · Attempt {attempts}
      </div>

      {/* Status banner */}
      {answeredAll && (
        <div
          data-testid="practice-status"
          className={`mt-8 border-2 border-black p-5 ${allCorrect ? 'bg-[#00FF66]' : 'bg-[#FFD700]'}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {allCorrect ? <Trophy className="w-5 h-5" /> : <Dumbbell className="w-5 h-5" />}
              <div className="font-display font-extrabold text-2xl tracking-tight">
                {allCorrect ? 'All correct — you\'ve got this.' : `You got ${correctCount}/${questions.length}. Review & retry.`}
              </div>
            </div>
            <div className="flex gap-2">
              {!allCorrect && (
                <button onClick={tryAgain} data-testid="practice-retry"
                  className="font-mono uppercase tracking-widest text-sm px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#0055FF] inline-flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Try again
                </button>
              )}
              {allCorrect && !finished && (
                <button onClick={finishPractice} data-testid="practice-complete-btn"
                  className="font-mono uppercase tracking-widest text-sm px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#0055FF] inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Save & unlock exam
                </button>
              )}
              {examUnlocked && (
                <button onClick={() => nav(`/exam/${topic.id}`)} data-testid="practice-to-exam"
                  className="font-mono uppercase tracking-widest text-sm px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#0055FF] inline-flex items-center gap-2">
                  Take Exam <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="mt-10 space-y-8">
        {questions.map((q, i) => (
          <div key={q.q} data-testid={`practice-q-${i}`} className="border-2 border-black p-6 bg-white">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Q{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest border border-black px-2 py-0.5">MCQ</span>
            </div>
            <div className="font-mono text-[15px] leading-relaxed mt-3">{q.q}</div>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {q.options.map((opt, oi) => {
                const chosen = picked[i] === oi;
                const isAnswer = oi === q.a;
                const show = revealed[i];
                let cls = 'bg-white border-black hover:-translate-y-0.5';
                if (show && isAnswer) cls = 'bg-[#00FF66] border-black';
                else if (show && chosen && !isAnswer) cls = 'bg-[#FF3333] text-white border-black';
                else if (chosen) cls = 'bg-black text-white border-black';
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => select(i, oi)}
                    disabled={show}
                    data-testid={`practice-q${i}-opt-${oi}`}
                    className={`text-left font-mono text-sm px-4 py-3 border-2 transition-all ${cls} ${show ? 'cursor-default' : ''}`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                  </button>
                );
              })}
            </div>

            {revealed[i] && (
              <div
                data-testid={`practice-q${i}-explain`}
                className={`mt-4 p-3 border-2 border-black font-mono text-sm ${picked[i] === q.a ? 'bg-[#F4F4F5]' : 'bg-[#FFD700]'}`}
              >
                <div className="flex items-start gap-2">
                  {picked[i] === q.a
                    ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-700" />
                    : <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-700" />}
                  <div>
                    <span className="font-bold uppercase tracking-widest text-xs">
                      {picked[i] === q.a ? 'Correct · ' : 'Incorrect · '}
                    </span>
                    {q.e}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 flex-wrap border-t-2 border-black pt-6">
        <Link to={`/learn/${topic.id}`} data-testid="practice-review-lesson"
          className="font-mono uppercase tracking-widest text-sm px-5 py-3 border-2 border-black hover:bg-black hover:text-white inline-flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Review lesson
        </Link>
        {examUnlocked ? (
          <Link to={`/exam/${topic.id}`} data-testid="practice-open-exam"
            className="font-mono uppercase tracking-widest text-sm px-5 py-3 bg-black text-white border-2 border-black hover:bg-[#0055FF] inline-flex items-center gap-2">
            Take Exam <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-600">
            Exam unlocks when all {questions.length} practice questions are correct.
          </div>
        )}
      </div>
    </div>
  );
}
