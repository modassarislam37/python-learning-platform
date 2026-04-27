const KEY = 'py_academy_v1';

const defaultState = {
  studentName: '',
  startedAt: null,
  completed: {}, // { topicId: { score, passedAt } }
  savedCode: {}, // { topicId: code }
  projectsDone: {}, // { projectId: doneAt }
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

export function isTopicUnlocked(topic, curriculum, state) {
  // First topic of each track always unlocked; others require previous topic passed
  const allTopics = curriculum.flatMap(t => t.topics);
  const idx = allTopics.findIndex(x => x.id === topic.id);
  if (idx === 0) return true;
  const prev = allTopics[idx - 1];
  return !!state.completed[prev.id];
}

export function touchStreak(state) {
  const today = new Date().toDateString();
  const last = state.streak?.last;
  if (last === today) return state;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const count = last === yesterday ? (state.streak.count || 0) + 1 : 1;
  return { ...state, streak: { last: today, count } };
}
