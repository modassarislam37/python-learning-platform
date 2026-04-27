// Extra topics appended to curriculum tracks to reach 28 total.
// Each track id must match curriculum.js.

export const extraTopics = {
  basics: [
    {
      id: 'fileio',
      title: 'Files & I/O',
      minutes: 10,
      lesson: `Read and write files using the built-in open() function. Always pair files with a context manager so they close automatically.

with open("data.txt", "w") as f:
    f.write("hello\\nworld")

with open("data.txt") as f:
    for line in f:
        print(line.strip())

Modes: "r" read, "w" write (overwrite), "a" append, "b" binary.

For structured data, use the json module:
    import json
    json.dump(obj, f); json.load(f)`,
      example: `import json\nuser = {"name": "Ada", "lang": "Python"}\nprint(json.dumps(user))\nprint(json.loads('{"x": 10}'))`,
      exam: [
        { type: 'mcq', q: 'Which mode overwrites a file?', options: ['"r"', '"w"', '"a"', '"x"'], answer: 1 },
        { type: 'fill', q: 'Use a ____ manager so files auto-close: with open(...)', answer: 'context' },
        { type: 'output', q: 'import json\nprint(json.dumps({"a":1}))', answer: '{"a": 1}' },
        { type: 'mcq', q: 'Append mode is:', options: ['"r"', '"w"', '"a"', '"+"'], answer: 2 },
        { type: 'mcq', q: 'json.load reads from:', options: ['a string', 'a file object', 'a dict', 'a URL'], answer: 1 },
      ],
    },
  ],
  advanced: [
    {
      id: 'testing',
      title: 'Testing & Packaging',
      minutes: 12,
      lesson: `Reliable code is tested code. pytest is the de-facto standard.

# test_math.py
def add(a, b): return a + b

def test_add():
    assert add(2, 3) == 5

Run with: pytest

Fixtures (@pytest.fixture) prepare shared setup. Parametrize tests with @pytest.mark.parametrize.

Packaging: create a pyproject.toml, then "pip install -e ." for local dev. Publish to PyPI with build + twine upload.`,
      example: `def add(a, b):\n    return a + b\n\n# inline "test"\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint("all tests passed")`,
      exam: [
        { type: 'mcq', q: 'Dominant Python test runner:', options: ['nose', 'unittest2', 'pytest', 'mocha'], answer: 2 },
        { type: 'fill', q: 'Tests use the ____ statement to verify results.', answer: 'assert' },
        { type: 'mcq', q: 'Modern packaging metadata lives in:', options: ['setup.py', 'pyproject.toml', 'package.json', 'Pipfile'], answer: 1 },
        { type: 'mcq', q: 'Publish to PyPI with:', options: ['pip publish', 'twine upload', 'pytest push', 'yarn deploy'], answer: 1 },
        { type: 'mcq', q: '@pytest.fixture provides:', options: ['speed', 'reusable setup', 'assertions', 'coverage'], answer: 1 },
      ],
    },
  ],
  datasci: [
    {
      id: 'pandasadv',
      title: 'Pandas Advanced: groupby, merge, pivot',
      minutes: 14,
      lesson: `Advanced pandas turns raw tables into insights.

groupby + agg summarises:
  df.groupby("category")["sales"].agg(["sum", "mean", "count"])

merge joins tables (like SQL):
  pd.merge(orders, customers, on="customer_id", how="left")

pivot_table reshapes long → wide:
  df.pivot_table(index="month", columns="product", values="sales", aggfunc="sum")

apply / map run custom functions over rows/cols.`,
      example: `import pandas as pd\norders = pd.DataFrame({"cid":[1,1,2], "amt":[10,20,30]})\nprint(orders.groupby("cid")["amt"].sum())`,
      exam: [
        { type: 'mcq', q: 'Best for SQL-like joins in pandas:', options: ['concat', 'merge', 'join_sql', 'unionby'], answer: 1 },
        { type: 'fill', q: 'Summarise per category with ____ + agg.', answer: 'groupby' },
        { type: 'mcq', q: 'Reshape long → wide with:', options: ['stack', 'pivot_table', 'transpose', 'wide()'], answer: 1 },
        { type: 'mcq', q: 'how="left" in merge keeps rows from:', options: ['right only', 'both', 'left only', 'inner'], answer: 2 },
        { type: 'mcq', q: 'apply() runs a function over:', options: ['only columns', 'only rows', 'rows or columns', 'the whole file'], answer: 2 },
      ],
    },
  ],
  aiml: [
    {
      id: 'prompting',
      title: 'Prompt Engineering & RAG',
      minutes: 12,
      lesson: `Modern AI engineers spend as much time shaping prompts as training models.

Core prompting principles:
- Be specific: state role, task, format, constraints
- Provide examples (few-shot) when possible
- Ask for step-by-step reasoning ("chain of thought")
- Specify output format (JSON, bullet list)

Retrieval-Augmented Generation (RAG):
1. Embed your documents into a vector database (e.g. FAISS, Chroma).
2. On each query, retrieve top-k relevant chunks.
3. Stuff them into the LLM prompt as context.

This grounds an LLM in your private or up-to-date data without retraining.`,
      example: `# Pseudo-pipeline\nquery = "What is our refund policy?"\ncontext = ["Refunds within 30 days...", "No returns on sale items..."]\nprompt = f"Use ONLY the context to answer.\\nContext: {context}\\nQ: {query}"\nprint(prompt[:60], "...")`,
      exam: [
        { type: 'mcq', q: 'RAG stands for:', options: ['Rapid API Generation', 'Retrieval-Augmented Generation', 'Random Agent Grid', 'Recurrent Attention Gate'], answer: 1 },
        { type: 'fill', q: 'Asking the model to think step-by-step is called chain-of-____.', answer: 'thought' },
        { type: 'mcq', q: 'Vector databases store:', options: ['SQL rows', 'embeddings', 'logs', 'images only'], answer: 1 },
        { type: 'mcq', q: 'Few-shot prompting means:', options: ['short prompts', 'including examples', 'low temperature', 'streaming'], answer: 1 },
        { type: 'mcq', q: 'RAG avoids the need to:', options: ['use embeddings', 'retrain the LLM', 'query a DB', 'use a tokenizer'], answer: 1 },
      ],
    },
  ],
};

export const extraProjects = [
  { id: 'p10', track: 'basics',   title: 'Expense Tracker CLI',    level: 'Beginner',     brief: 'Save expenses to a JSON file, categorise them, and print a weekly summary using file I/O.' },
  { id: 'p11', track: 'advanced', title: 'Unit-tested Library',    level: 'Intermediate', brief: 'Build a small utility library (string/date helpers). Add pytest tests with ≥90% coverage. Package with pyproject.toml.' },
  { id: 'p12', track: 'datasci',  title: 'Real-estate Price EDA',  level: 'Intermediate', brief: 'Use groupby + merge + pivot_table on a housing dataset. Surface the 3 biggest price drivers with visualisations.' },
  { id: 'p13', track: 'aiml',     title: 'RAG Chatbot over Notes', level: 'Advanced',     brief: 'Embed a small corpus of your notes, build a vector store, and answer questions via an LLM grounded in retrieved chunks.' },
];
