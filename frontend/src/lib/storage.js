const KEY = 'py_academy_v1';

const defaultState = {
  studentName: '',
  startedAt: null,
  completed: {},       // { topicId: { score, passedAt } }
  practiceDone: {},    // { topicId: { doneAt, attempts } }
  savedCode: {},
  projectsDone: {},
  streak: { last: null, count: 0 },
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function updateState(mutator) {
  const s = loadState();
  const next = mutator({ ...s });
  saveState(next);
  return next;
}

// Topic is unlocked if it's the first OR the previous topic's EXAM is passed.
export function isTopicUnlocked(topic, curriculum, state) {
  const allTopics = curriculum.flatMap(t => t.topics);
  const idx = allTopics.findIndex(x => x.id === topic.id);
  if (idx === 0) return true;
  const prev = allTopics[idx - 1];
  return !!state.completed[prev.id];
}

// Exam is unlocked for a topic only after practice is completed (all correct).
export function isExamUnlocked(topicId, state) {
  return !!state.practiceDone?.[topicId];
}

export function markPracticeDone(topicId, attempts = 1) {
  const s = loadState();
  s.practiceDone = { ...(s.practiceDone || {}), [topicId]: { doneAt: new Date().toISOString(), attempts } };
  saveState(s);
  return s;
}

export function touchStreak(state) {
  const today = new Date().toDateString();
  const last = state.streak?.last;
  if (last === today) return state;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const count = last === yesterday ? (state.streak.count || 0) + 1 : 1;
  return { ...state, streak: { last: today, count } };
}

// Backup / restore — user can export + import their progress as JSON.
export function exportAllData() {
  const main = JSON.parse(localStorage.getItem(KEY) || '{}');
  const notes = {};
  const code = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith('notes:')) notes[k] = localStorage.getItem(k);
    if (k?.startsWith('code:')) code[k] = localStorage.getItem(k);
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    main,
    notes,
    code,
  };
}

export function importAllData(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid backup file');
  if (payload.main) localStorage.setItem(KEY, JSON.stringify(payload.main));
  Object.entries(payload.notes || {}).forEach(([k, v]) => localStorage.setItem(k, v));
  Object.entries(payload.code || {}).forEach(([k, v]) => localStorage.setItem(k, v));
}
