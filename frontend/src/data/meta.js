// Per-topic video + key takeaways metadata.
// Videos use well-known, embeddable YouTube tutorial IDs.
// If any video becomes unavailable, learners can use the "Search YouTube" button on the lesson page.

const FREECODECAMP_PYTHON = 'rfscVS0vtbw';   // Learn Python - Full Course for Beginners (freeCodeCamp)
const MOSH_PYTHON_FULL   = '_uQrJ0TkZlc';   // Python Full Course (Programming with Mosh)
const MOSH_PYTHON_OOP    = 'JeznW_7DlB0';   // Mosh OOP
const KEITH_GALLI_PANDAS = 'vmEHCJofslg';   // Keith Galli Pandas tutorial
const THREEBLUE_NN       = 'aircAruvnKk';   // 3Blue1Brown: But what is a neural network?
const FCC_ML             = 'NWONeJKn6kc';   // freeCodeCamp Machine Learning basics

export const topicMeta = {
  // Basics
  intro:        { yt: FREECODECAMP_PYTHON, ytStart: 0,    takeaways: ['print() sends output to console', '# starts a comment', 'Python is interpreted, not compiled'] },
  variables:    { yt: FREECODECAMP_PYTHON, ytStart: 420,  takeaways: ['Python is dynamically typed', 'Core types: int, float, str, bool, None', 'type(x) inspects the type'] },
  strings:      { yt: FREECODECAMP_PYTHON, ytStart: 1260, takeaways: ['f"..." embeds expressions', 'Strings are indexed from 0', '.upper() .lower() .strip() are your friends'] },
  control:      { yt: FREECODECAMP_PYTHON, ytStart: 2400, takeaways: ['Indentation defines blocks', 'Use ==, not =, to compare', 'elif chains branches'] },
  loops:        { yt: FREECODECAMP_PYTHON, ytStart: 3600, takeaways: ['range(n) produces 0..n-1', 'break / continue control flow', 'for iterates any iterable'] },
  functions:    { yt: FREECODECAMP_PYTHON, ytStart: 4200, takeaways: ['def creates a function', 'Default args default=0', '*args / **kwargs collect extras'] },
  collections:  { yt: FREECODECAMP_PYTHON, ytStart: 5400, takeaways: ['list is mutable, tuple is immutable', 'set removes duplicates', 'dict stores key→value'] },
  fileio:       { yt: FREECODECAMP_PYTHON, ytStart: 7200, takeaways: ['with open() auto-closes the file', 'read/write/append modes: r, w, a', 'json handles structured data'] },

  // Advanced
  oop:          { yt: MOSH_PYTHON_OOP,  ytStart: 0,    takeaways: ['__init__ is the constructor', 'self = the instance', 'Inherit with class B(A):'] },
  errors:       { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['try/except catches errors', 'finally always runs', 'raise to throw'] },
  iterators:    { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['yield makes a generator', 'Generators are lazy', 'Saves memory on large data'] },
  decorators:   { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['@decorator wraps a function', 'Functions are first-class', 'functools.wraps preserves metadata'] },
  modules:      { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['import loads a module', '__init__.py marks a package', 'venv isolates dependencies'] },
  async:        { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['async def + await for IO', 'asyncio.run() executes coroutines', 'Use multiprocessing for CPU-bound'] },
  testing:      { yt: MOSH_PYTHON_FULL, ytStart: 0,    takeaways: ['pytest is the standard test runner', 'assert statements drive tests', 'pip install + requirements.txt ships code'] },

  // Data Science
  numpy:         { yt: KEITH_GALLI_PANDAS, ytStart: 0, takeaways: ['ndarray is the core type', 'Vectorised ops beat Python loops', 'Broadcasting auto-expands shapes'] },
  pandas:        { yt: KEITH_GALLI_PANDAS, ytStart: 0, takeaways: ['DataFrame = labelled 2D table', '.loc is label-based, .iloc is position-based', 'Chain filters + groupby for insights'] },
  pandasadv:     { yt: KEITH_GALLI_PANDAS, ytStart: 0, takeaways: ['groupby+agg unlocks summaries', 'merge joins two DataFrames', 'pivot reshapes data'] },
  viz:           { yt: KEITH_GALLI_PANDAS, ytStart: 0, takeaways: ['matplotlib = foundation', 'seaborn = statistical defaults', 'Pick the chart to fit the data'] },
  stats:         { yt: FCC_ML,             ytStart: 0, takeaways: ['Mean, median, std describe shape', 'Normal distribution is everywhere', 'p < 0.05 ≈ reject null'] },
  datawrangle:   { yt: KEITH_GALLI_PANDAS, ytStart: 0, takeaways: ['dropna / fillna for missing values', 'Remove duplicates early', 'One-hot for categoricals'] },

  // AI/ML
  mlintro:      { yt: FCC_ML,         ytStart: 0, takeaways: ['Supervised uses labels', 'Bias–variance is the core tradeoff', 'Always split train/test'] },
  sklearn:      { yt: FCC_ML,         ytStart: 0, takeaways: ['fit / predict / score API', 'Use Pipeline for preprocessing', 'Cross-validation beats a single split'] },
  neuralnet:    { yt: THREEBLUE_NN,   ytStart: 0, takeaways: ['Neurons = weighted sum + activation', 'Loss measures error', 'Backprop updates weights'] },
  deeplearning: { yt: THREEBLUE_NN,   ytStart: 0, takeaways: ['Transformers power modern NLP', 'Transfer learning reuses pretrained weights', 'Hugging Face = the LLM toolkit'] },
  mlops:        { yt: FCC_ML,         ytStart: 0, takeaways: ['Right metric > higher accuracy', 'Monitor for data drift', 'Ship with FastAPI + Docker'] },
  prompting:    { yt: THREEBLUE_NN,   ytStart: 0, takeaways: ['Be specific and give examples', 'Chain-of-thought improves reasoning', 'RAG grounds LLMs in your data'] },
};

export function getTopicMeta(topicId) {
  return topicMeta[topicId] || { yt: FREECODECAMP_PYTHON, ytStart: 0, takeaways: [] };
}
