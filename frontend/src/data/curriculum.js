// Full curriculum: Python Basics -> Advanced -> Data Science -> AI/ML
// Each topic contains lesson content, examples and a 5-question exam.
// Exam question types: 'mcq' | 'output' | 'fill'

import { extraTopics, extraProjects } from './extra';

const _baseCurriculum = [
  {
    id: 'basics',
    name: 'Python Basics',
    code: '01',
    description: 'Foundations: syntax, variables, control flow, functions.',
    topics: [
      {
        id: 'intro',
        title: 'Introduction & Hello World',
        minutes: 8,
        lesson: `Python is a high-level, interpreted programming language known for its readability. You write code, run it with the Python interpreter, and get results immediately.

# First program
Use the built-in print() function to send output to the screen.

print("Hello, Python!")

# Comments
Anything after a # on a line is ignored by Python — useful for explaining your code.`,
        example: `# Your first Python program\nprint("Hello, Python!")\nprint("I am learning to code.")`,
        exam: [
          { type: 'mcq', q: 'Which function prints output in Python?', options: ['echo()', 'print()', 'log()', 'write()'], answer: 1 },
          { type: 'output', q: 'What does this print?\n\nprint("Py" + "thon")', answer: 'Python' },
          { type: 'fill', q: 'Lines beginning with ____ are comments in Python.', answer: '#' },
          { type: 'mcq', q: 'Python is a _____ language.', options: ['compiled', 'interpreted', 'assembly', 'markup'], answer: 1 },
          { type: 'output', q: 'print(2 + 3)', answer: '5' },
        ],
      },
      {
        id: 'variables',
        title: 'Variables & Data Types',
        minutes: 10,
        lesson: `Variables are named references to values. Python is dynamically typed — you don't declare types.

Common types:
- int: whole numbers (5, -2)
- float: decimals (3.14)
- str: text ("hello")
- bool: True / False
- None: absence of value

Use type() to inspect a value's type.`,
        example: `name = "Ada"\nage = 36\nheight = 1.72\nis_coder = True\nprint(name, age, height, is_coder)\nprint(type(age))`,
        exam: [
          { type: 'mcq', q: 'What is the type of 3.14?', options: ['int', 'float', 'str', 'bool'], answer: 1 },
          { type: 'output', q: 'x = 5\ny = 2\nprint(x // y)', answer: '2' },
          { type: 'fill', q: 'The boolean values in Python are True and ____.', answer: 'False' },
          { type: 'mcq', q: 'Which is NOT a valid variable name?', options: ['my_var', '_name', '2cool', 'x1'], answer: 2 },
          { type: 'output', q: 'print(type("hi").__name__)', answer: 'str' },
        ],
      },
      {
        id: 'strings',
        title: 'Strings & Formatting',
        minutes: 10,
        lesson: `Strings are sequences of characters, created with single or double quotes.

Common operations:
- Concatenation: "a" + "b"
- Repetition: "ab" * 3
- Indexing: s[0], s[-1]
- Slicing: s[1:4]
- Methods: .upper(), .lower(), .split(), .strip()

F-strings (Python 3.6+) embed expressions inside strings: f"Hello, {name}"`,
        example: `name = "world"\ngreeting = f"Hello, {name.upper()}!"\nprint(greeting)\nprint(greeting[:5])\nprint(len(greeting))`,
        exam: [
          { type: 'output', q: 'print("abc"[1])', answer: 'b' },
          { type: 'output', q: 'print("ha" * 3)', answer: 'hahaha' },
          { type: 'mcq', q: 'Which method converts string to uppercase?', options: ['.caps()', '.upper()', '.toUpper()', '.big()'], answer: 1 },
          { type: 'fill', q: 'f"1+1={1+1}" produces "1+1=____"', answer: '2' },
          { type: 'output', q: 'print(len("python"))', answer: '6' },
        ],
      },
      {
        id: 'control',
        title: 'Control Flow: if / else',
        minutes: 10,
        lesson: `Use if / elif / else to branch logic. Indentation (4 spaces) defines blocks.

Comparison operators: == != < > <= >=
Logical operators: and or not

Truthy / falsy: 0, "", [], None are falsy; most other values are truthy.`,
        example: `score = 72\nif score >= 90:\n    grade = "A"\nelif score >= 70:\n    grade = "B"\nelse:\n    grade = "C"\nprint(grade)`,
        exam: [
          { type: 'mcq', q: 'What operator checks equality?', options: ['=', '==', 'eq', '==='], answer: 1 },
          { type: 'output', q: 'x = 10\nprint("big" if x > 5 else "small")', answer: 'big' },
          { type: 'fill', q: 'The keyword for "otherwise if" is ____.', answer: 'elif' },
          { type: 'mcq', q: 'Which is falsy?', options: ['"0"', '[0]', '0', '{0}'], answer: 2 },
          { type: 'output', q: 'print(not (5 > 3))', answer: 'False' },
        ],
      },
      {
        id: 'loops',
        title: 'Loops: for & while',
        minutes: 10,
        lesson: `Loops repeat a block of code.

for loops iterate over a sequence:
  for item in iterable: ...

while loops run as long as a condition is true.

range(n) produces 0..n-1. range(a,b,step) gives a flexible counter.

Use break to exit, continue to skip to next iteration.`,
        example: `total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)  # 15\n\nn = 3\nwhile n > 0:\n    print(n)\n    n -= 1`,
        exam: [
          { type: 'output', q: 'total = 0\nfor i in range(4): total += i\nprint(total)', answer: '6' },
          { type: 'mcq', q: 'range(5) produces:', options: ['1..5', '0..5', '0..4', '1..4'], answer: 2 },
          { type: 'fill', q: 'Use ____ to exit a loop early.', answer: 'break' },
          { type: 'output', q: 'for i in range(3):\n    if i == 1: continue\n    print(i)', answer: '0\n2' },
          { type: 'mcq', q: 'Which loop runs while a condition is true?', options: ['for', 'while', 'do', 'until'], answer: 1 },
        ],
      },
      {
        id: 'functions',
        title: 'Functions & Scope',
        minutes: 12,
        lesson: `Functions package reusable logic. Define with def, return values with return.

def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

Positional args, keyword args, default values.
*args collects extra positional args; **kwargs collects extra keyword args.

Variables inside a function are local; use global sparingly.`,
        example: `def add(a, b=0):\n    return a + b\nprint(add(3))\nprint(add(3, 4))\nprint(add(b=10, a=5))`,
        exam: [
          { type: 'fill', q: 'Use ____ keyword to define a function.', answer: 'def' },
          { type: 'output', q: 'def sq(x): return x*x\nprint(sq(5))', answer: '25' },
          { type: 'mcq', q: '*args allows:', options: ['keyword args', 'default values', 'variable positional args', 'type hints'], answer: 2 },
          { type: 'output', q: 'def f(a, b=2): return a+b\nprint(f(3))', answer: '5' },
          { type: 'mcq', q: 'Which returns None?', options: ['return 0', 'return', 'return ""', 'all above'], answer: 1 },
        ],
      },
      {
        id: 'collections',
        title: 'Lists, Tuples, Sets, Dicts',
        minutes: 14,
        lesson: `Python's core containers:

- list [1,2,3] — ordered, mutable
- tuple (1,2,3) — ordered, immutable
- set {1,2,3} — unique, unordered
- dict {"a":1} — key-value map

Common ops: len(), in, append/extend/pop, keys(), values(), items()

List comprehension: [x*x for x in range(5)]`,
        example: `nums = [1,2,3,4]\nsquares = [n*n for n in nums]\nprint(squares)\n\nd = {"a":1, "b":2}\nfor k,v in d.items():\n    print(k, v)`,
        exam: [
          { type: 'output', q: 'print(len({1,1,2,3}))', answer: '3' },
          { type: 'mcq', q: 'Which is immutable?', options: ['list', 'set', 'dict', 'tuple'], answer: 3 },
          { type: 'fill', q: 'To retrieve a value from dict d for key "k": d[____]', answer: '"k"' },
          { type: 'output', q: 'print([x*2 for x in [1,2,3]])', answer: '[2, 4, 6]' },
          { type: 'mcq', q: 'What does list.append do?', options: ['inserts at start', 'adds at end', 'removes last', 'sorts'], answer: 1 },
        ],
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Python Advanced',
    code: '02',
    description: 'OOP, iterators, decorators, concurrency, modules.',
    topics: [
      {
        id: 'oop',
        title: 'Classes & Objects',
        minutes: 14,
        lesson: `OOP organises code around objects — bundles of data (attributes) and behaviour (methods).

class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name} says woof"

__init__ is the constructor; self refers to the instance.`,
        example: `class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def dist(self):\n        return (self.x**2 + self.y**2) ** 0.5\np = Point(3, 4)\nprint(p.dist())`,
        exam: [
          { type: 'fill', q: 'The constructor method in Python is named ____.', answer: '__init__' },
          { type: 'mcq', q: 'self refers to:', options: ['the class', 'the module', 'the instance', 'the parent'], answer: 2 },
          { type: 'output', q: 'class A:\n    x = 1\nprint(A().x)', answer: '1' },
          { type: 'mcq', q: 'Inheritance is declared by:', options: ['class B(A):', 'class B extends A:', 'class B: A', 'inherit A class B'], answer: 0 },
          { type: 'output', q: 'class C:\n    def __init__(self,v): self.v=v\n    def dbl(self): return self.v*2\nprint(C(5).dbl())', answer: '10' },
        ],
      },
      {
        id: 'errors',
        title: 'Exceptions & Error Handling',
        minutes: 10,
        lesson: `Use try/except/finally to handle runtime errors gracefully.

try:
    risky()
except ValueError as e:
    print(e)
except (TypeError, KeyError):
    pass
finally:
    cleanup()

Raise errors with raise ValueError("msg"). Create custom exception classes by subclassing Exception.`,
        example: `def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\nprint(safe_div(10, 0))\nprint(safe_div(10, 2))`,
        exam: [
          { type: 'fill', q: 'Catch exceptions with try / ____ blocks.', answer: 'except' },
          { type: 'mcq', q: 'Which always runs, error or not?', options: ['try', 'except', 'finally', 'else'], answer: 2 },
          { type: 'output', q: 'try:\n    1/0\nexcept ZeroDivisionError:\n    print("caught")', answer: 'caught' },
          { type: 'mcq', q: 'To raise an error use:', options: ['throw', 'raise', 'error', 'panic'], answer: 1 },
          { type: 'mcq', q: 'Base class for exceptions:', options: ['Error', 'Throwable', 'Exception', 'BaseError'], answer: 2 },
        ],
      },
      {
        id: 'iterators',
        title: 'Iterators & Generators',
        minutes: 12,
        lesson: `An iterator produces values one at a time via __next__().

Generators are a concise way to build iterators using yield:

def counter(n):
    i = 0
    while i < n:
        yield i
        i += 1

Generator expressions: (x*x for x in range(10)) — memory efficient over large data.`,
        example: `def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\nprint(list(fib(6)))`,
        exam: [
          { type: 'fill', q: 'Generators use the ____ keyword to produce values.', answer: 'yield' },
          { type: 'output', q: 'g = (x for x in range(3))\nprint(sum(g))', answer: '3' },
          { type: 'mcq', q: 'Which is lazy?', options: ['list comp', 'gen expr', 'tuple', 'set'], answer: 1 },
          { type: 'output', q: 'def f():\n    yield 1\n    yield 2\nprint(list(f()))', answer: '[1, 2]' },
          { type: 'mcq', q: 'next(iter([1,2])) returns:', options: ['1', '2', 'None', 'error'], answer: 0 },
        ],
      },
      {
        id: 'decorators',
        title: 'Decorators & Higher-Order Functions',
        minutes: 12,
        lesson: `Functions are first-class objects — pass them, return them, store them.

A decorator wraps a function to add behaviour:

def log(fn):
    def wrapper(*a, **k):
        print("calling", fn.__name__)
        return fn(*a, **k)
    return wrapper

@log
def greet(name): print("hi", name)`,
        example: `def timer(fn):\n    import time\n    def wrapped(*a, **k):\n        t = time.time()\n        r = fn(*a, **k)\n        print(f"took {time.time()-t:.4f}s")\n        return r\n    return wrapped\n\n@timer\ndef work():\n    return sum(range(100000))\nprint(work())`,
        exam: [
          { type: 'mcq', q: 'Decorators are applied with:', options: ['@name', '#name', '!name', '&name'], answer: 0 },
          { type: 'fill', q: 'A decorator is a function that takes a function and returns a ____.', answer: 'function' },
          { type: 'output', q: 'def d(f):\n    def w(): return f()*2\n    return w\n@d\ndef n(): return 5\nprint(n())', answer: '10' },
          { type: 'mcq', q: 'Which is a higher-order function?', options: ['print', 'map', 'len', 'abs'], answer: 1 },
          { type: 'mcq', q: 'functools.wraps is used to:', options: ['speed up', 'preserve metadata', 'cache', 'log'], answer: 1 },
        ],
      },
      {
        id: 'modules',
        title: 'Modules, Packages & Virtual Envs',
        minutes: 10,
        lesson: `A module is a .py file you can import. A package is a folder containing __init__.py (Python 3 treats folders as namespace packages too).

import math
from math import sqrt
from math import sqrt as s

Standard useful modules: os, sys, json, datetime, collections, itertools, pathlib, random.

Virtual environments (venv) isolate project dependencies.`,
        example: `import math\nfrom collections import Counter\nprint(math.pi)\nprint(Counter("mississippi"))`,
        exam: [
          { type: 'fill', q: 'Use the ____ statement to load a module.', answer: 'import' },
          { type: 'mcq', q: 'Which marks a folder as a package?', options: ['package.py', '__init__.py', '__main__.py', 'setup.py'], answer: 1 },
          { type: 'output', q: 'import math\nprint(math.floor(3.7))', answer: '3' },
          { type: 'mcq', q: 'Counter is in module:', options: ['math', 'collections', 'itertools', 'functools'], answer: 1 },
          { type: 'mcq', q: 'Virtual env tool in stdlib:', options: ['virtualenv', 'venv', 'poetry', 'pipenv'], answer: 1 },
        ],
      },
      {
        id: 'async',
        title: 'Async / await & Concurrency',
        minutes: 12,
        lesson: `asyncio enables cooperative multitasking.

async def fetch():
    await some_io()

Run with asyncio.run(main()). Use await inside async functions to yield control while waiting.

For CPU-bound work use multiprocessing; for IO-bound use asyncio or threading.`,
        example: `import asyncio\nasync def hello():\n    await asyncio.sleep(0.1)\n    return "done"\nprint(asyncio.run(hello()))`,
        exam: [
          { type: 'fill', q: 'Async functions are defined with ____ def.', answer: 'async' },
          { type: 'mcq', q: 'For IO-bound concurrent tasks, use:', options: ['multiprocessing', 'asyncio', 'threading.Lock', 'GIL'], answer: 1 },
          { type: 'mcq', q: 'asyncio.run() requires:', options: ['a coroutine', 'a thread', 'a process', 'a file'], answer: 0 },
          { type: 'mcq', q: 'The GIL in CPython:', options: ['improves IO', 'limits thread parallelism', 'encrypts memory', 'compiles to C'], answer: 1 },
          { type: 'mcq', q: 'Best for CPU-bound parallelism:', options: ['asyncio', 'threading', 'multiprocessing', 'select'], answer: 2 },
        ],
      },
    ],
  },
  {
    id: 'datasci',
    name: 'Data Science',
    code: '03',
    description: 'NumPy, Pandas, visualisation, statistics.',
    topics: [
      {
        id: 'numpy',
        title: 'NumPy Fundamentals',
        minutes: 14,
        lesson: `NumPy provides fast n-dimensional arrays (ndarray) and vectorised operations.

import numpy as np
a = np.array([1,2,3])
a * 2  # [2,4,6]

Key: shape, dtype, reshape, broadcasting, slicing, aggregation (sum, mean, std), linear algebra.`,
        example: `import numpy as np\na = np.arange(1, 10).reshape(3,3)\nprint(a)\nprint(a.sum(axis=0))\nprint(a.mean())`,
        exam: [
          { type: 'mcq', q: 'NumPy main array type:', options: ['list', 'ndarray', 'matrix', 'series'], answer: 1 },
          { type: 'output', q: 'import numpy as np\nprint(np.arange(4).sum())', answer: '6' },
          { type: 'fill', q: 'To reshape an array use the ____ method.', answer: 'reshape' },
          { type: 'mcq', q: 'Which broadcasts?', options: ['[1,2]+[3,4]', 'np.array([1,2])+3', 'dict + int', 'str + int'], answer: 1 },
          { type: 'output', q: 'import numpy as np\nprint(np.array([[1,2],[3,4]]).mean())', answer: '2.5' },
        ],
      },
      {
        id: 'pandas',
        title: 'Pandas DataFrames',
        minutes: 16,
        lesson: `Pandas offers labelled tabular data via Series (1D) and DataFrame (2D).

import pandas as pd
df = pd.DataFrame({"a":[1,2,3], "b":[4,5,6]})

Essentials: reading CSV (pd.read_csv), df.head(), df.describe(), selection (df["col"], df.loc, df.iloc), filtering (df[df.a > 1]), groupby, merge, pivot.`,
        example: `import pandas as pd\ndf = pd.DataFrame({"name":["Ada","Grace","Linus"],"age":[36,52,54]})\nprint(df)\nprint(df["age"].mean())\nprint(df[df.age > 40])`,
        exam: [
          { type: 'mcq', q: 'Main 2D structure in pandas:', options: ['Array', 'Table', 'DataFrame', 'Frame2D'], answer: 2 },
          { type: 'fill', q: 'Load CSV with pd.____("file.csv")', answer: 'read_csv' },
          { type: 'mcq', q: 'Label-based selection uses:', options: ['.iloc', '.loc', '.pick', '.sel'], answer: 1 },
          { type: 'output', q: 'import pandas as pd\ns = pd.Series([1,2,3])\nprint(s.sum())', answer: '6' },
          { type: 'mcq', q: 'df.head() by default shows:', options: ['1 row', '5 rows', '10 rows', 'all'], answer: 1 },
        ],
      },
      {
        id: 'viz',
        title: 'Data Visualization',
        minutes: 12,
        lesson: `Good visuals reveal patterns. Core libraries: matplotlib (foundation), seaborn (statistical charts), plotly (interactive).

import matplotlib.pyplot as plt
plt.plot([1,2,3],[1,4,9])
plt.title("Squares")
plt.show()

Pick the right chart: line for trends, bar for categories, histogram for distributions, scatter for relationships, heatmap for matrices.`,
        example: `# Conceptual — run locally\n# import matplotlib.pyplot as plt\n# plt.hist([1,2,2,3,3,3,4,4,5])\n# plt.show()\nprint("viz libs: matplotlib, seaborn, plotly")`,
        exam: [
          { type: 'mcq', q: 'Best chart for a distribution:', options: ['pie', 'histogram', 'line', 'bar'], answer: 1 },
          { type: 'mcq', q: 'Base viz library in Python:', options: ['seaborn', 'plotly', 'matplotlib', 'bokeh'], answer: 2 },
          { type: 'fill', q: 'A scatter plot shows the ____ between two variables.', answer: 'relationship' },
          { type: 'mcq', q: 'Heatmap is best for:', options: ['trends over time', 'matrix values', 'parts of whole', 'flow'], answer: 1 },
          { type: 'mcq', q: 'Seaborn is built on top of:', options: ['plotly', 'matplotlib', 'numpy', 'd3'], answer: 1 },
        ],
      },
      {
        id: 'stats',
        title: 'Statistics for Data Science',
        minutes: 14,
        lesson: `Core stats concepts:

- Central tendency: mean, median, mode
- Spread: variance, std deviation, IQR
- Distributions: normal, binomial, poisson
- Correlation vs. causation
- Hypothesis testing: null/alternative, p-value, t-test
- Confidence intervals

These power almost every ML algorithm.`,
        example: `import statistics as st\ndata = [2, 4, 4, 4, 5, 5, 7, 9]\nprint("mean:", st.mean(data))\nprint("median:", st.median(data))\nprint("stdev:", round(st.stdev(data), 3))`,
        exam: [
          { type: 'mcq', q: 'Middle value of sorted data:', options: ['mean', 'mode', 'median', 'range'], answer: 2 },
          { type: 'output', q: 'import statistics as s\nprint(s.mean([1,2,3,4]))', answer: '2.5' },
          { type: 'fill', q: 'A normal distribution is defined by mean and ____.', answer: 'std' },
          { type: 'mcq', q: 'p-value < 0.05 typically means:', options: ['accept null', 'reject null', 'no effect', 'ambiguous'], answer: 1 },
          { type: 'mcq', q: 'Correlation coefficient ranges:', options: ['0 to 1', '-1 to 1', '0 to 100', '-inf to inf'], answer: 1 },
        ],
      },
      {
        id: 'datawrangle',
        title: 'Data Cleaning & Wrangling',
        minutes: 12,
        lesson: `Real data is messy. Typical cleaning steps:

- Handle missing values: dropna, fillna (mean/median/mode)
- Remove duplicates: df.drop_duplicates()
- Fix dtypes: astype
- Parse dates: pd.to_datetime
- Normalise strings: .str.lower().str.strip()
- Outliers: IQR rule or z-score
- Feature encoding: one-hot, label encoding`,
        example: `import pandas as pd\ndf = pd.DataFrame({"age":[25, None, 30, 25]})\ndf["age"] = df["age"].fillna(df["age"].mean())\nprint(df)\nprint(df.drop_duplicates())`,
        exam: [
          { type: 'fill', q: 'Use ____ to drop rows with NaN.', answer: 'dropna' },
          { type: 'mcq', q: 'One-hot encoding is used for:', options: ['dates', 'categoricals', 'images', 'text tokens'], answer: 1 },
          { type: 'mcq', q: 'IQR = Q3 - ___', options: ['Q1', 'Q2', 'Q4', 'mean'], answer: 0 },
          { type: 'mcq', q: 'to_datetime belongs to:', options: ['numpy', 'pandas', 'datetime', 'time'], answer: 1 },
          { type: 'mcq', q: 'Best imputation for skewed numeric:', options: ['mean', 'median', 'mode', 'zero'], answer: 1 },
        ],
      },
    ],
  },
  {
    id: 'aiml',
    name: 'AI / ML Engineering',
    code: '04',
    description: 'ML fundamentals, scikit-learn, deep learning & production.',
    topics: [
      {
        id: 'mlintro',
        title: 'ML Fundamentals',
        minutes: 14,
        lesson: `Machine learning learns patterns from data. Three paradigms:

- Supervised: labelled data (classification, regression)
- Unsupervised: unlabelled (clustering, dim. reduction)
- Reinforcement: agent + rewards

Workflow: problem → data → features → model → train → evaluate → deploy.

Key: train/test split, bias–variance tradeoff, overfitting, cross-validation.`,
        example: `# Concept check\nsupervised = ["regression", "classification"]\nunsupervised = ["clustering", "pca"]\nprint("supervised:", supervised)\nprint("unsupervised:", unsupervised)`,
        exam: [
          { type: 'mcq', q: 'Predicting a price is:', options: ['classification', 'regression', 'clustering', 'ranking'], answer: 1 },
          { type: 'mcq', q: 'Spam vs ham is:', options: ['regression', 'clustering', 'classification', 'RL'], answer: 2 },
          { type: 'fill', q: 'High variance = ____.', answer: 'overfitting' },
          { type: 'mcq', q: 'Which is unsupervised?', options: ['linear regression', 'k-means', 'logistic regression', 'random forest'], answer: 1 },
          { type: 'mcq', q: 'Cross-validation helps estimate:', options: ['training time', 'generalisation', 'memory', 'GPU usage'], answer: 1 },
        ],
      },
      {
        id: 'sklearn',
        title: 'scikit-learn Workflow',
        minutes: 14,
        lesson: `scikit-learn gives a unified API:

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(X, y)
model = LogisticRegression().fit(X_train, y_train)
print(accuracy_score(y_test, model.predict(X_test)))

Estimators implement fit / predict / score. Pipelines combine preprocessing + model cleanly.`,
        example: `# Conceptual (sklearn not bundled in Pyodide by default)\nfrom_api = ["fit", "predict", "score", "transform"]\nprint(from_api)`,
        exam: [
          { type: 'mcq', q: 'Primary method to train a sklearn model:', options: ['train()', 'fit()', 'learn()', 'build()'], answer: 1 },
          { type: 'mcq', q: 'train_test_split lives in:', options: ['sklearn.metrics', 'sklearn.model_selection', 'sklearn.data', 'sklearn.utils'], answer: 1 },
          { type: 'fill', q: 'Use a ____ to chain preprocessing and model.', answer: 'Pipeline' },
          { type: 'mcq', q: 'Best metric for imbalanced classification:', options: ['accuracy', 'F1', 'MSE', 'R2'], answer: 1 },
          { type: 'mcq', q: 'StandardScaler does:', options: ['one-hot', 'mean=0 std=1', 'min-max', 'log'], answer: 1 },
        ],
      },
      {
        id: 'neuralnet',
        title: 'Neural Networks',
        minutes: 14,
        lesson: `A neural network is stacked layers of linear transforms + non-linear activations (ReLU, sigmoid, tanh).

Forward pass: inputs → hidden layers → output.
Loss: measures error (MSE for regression, cross-entropy for classification).
Backpropagation + gradient descent update weights.

Frameworks: PyTorch (research-friendly), TensorFlow/Keras (production).

Architectures: CNN for images, RNN/Transformer for sequences.`,
        example: `# Pseudo forward pass\nimport math\ndef relu(x): return max(0, x)\ndef neuron(x, w, b): return relu(sum(xi*wi for xi, wi in zip(x, w)) + b)\nprint(neuron([1.0, 2.0], [0.5, -0.2], 0.1))`,
        exam: [
          { type: 'mcq', q: 'ReLU(x) = ?', options: ['1/(1+e^-x)', 'max(0,x)', 'tanh(x)', 'x^2'], answer: 1 },
          { type: 'mcq', q: 'Loss for binary classification:', options: ['MSE', 'MAE', 'cross-entropy', 'hinge'], answer: 2 },
          { type: 'fill', q: 'Weights are updated via ____ descent.', answer: 'gradient' },
          { type: 'mcq', q: 'Best architecture for images:', options: ['RNN', 'CNN', 'GAN only', 'Transformer only'], answer: 1 },
          { type: 'mcq', q: 'Transformer key mechanism:', options: ['convolution', 'recurrence', 'attention', 'pooling'], answer: 2 },
        ],
      },
      {
        id: 'deeplearning',
        title: 'Deep Learning & Modern AI',
        minutes: 14,
        lesson: `Modern AI is dominated by transformer-based models: GPT, BERT, T5 for text; ViT, CLIP for vision; diffusion models for images.

Training requires big data + GPUs. Transfer learning lets you fine-tune a pretrained model with far less data.

Hugging Face ecosystem: transformers, datasets, accelerate — quickly load and fine-tune state-of-the-art models.

Prompt engineering + RAG (retrieval-augmented generation) are essential LLM skills.`,
        example: `# Conceptual\nstack = ["PyTorch", "HuggingFace Transformers", "Accelerate", "LangChain"]\nfor s in stack:\n    print("→", s)`,
        exam: [
          { type: 'mcq', q: 'Which is a transformer-based LLM?', options: ['ResNet', 'GPT', 'YOLO', 'VAE'], answer: 1 },
          { type: 'fill', q: 'Using a pretrained model on new data is called transfer ____.', answer: 'learning' },
          { type: 'mcq', q: 'RAG stands for:', options: ['Random Attention Grouping', 'Retrieval-Augmented Generation', 'Reliable Agent Graph', 'Regularised Approx Gradient'], answer: 1 },
          { type: 'mcq', q: 'Popular DL framework from Meta:', options: ['Keras', 'PyTorch', 'JAX', 'MXNet'], answer: 1 },
          { type: 'mcq', q: 'Image generation family:', options: ['SVM', 'Diffusion', 'Decision tree', 'Boosting'], answer: 1 },
        ],
      },
      {
        id: 'mlops',
        title: 'Model Evaluation & MLOps',
        minutes: 12,
        lesson: `Ship models reliably:

- Metrics: accuracy, precision, recall, F1, ROC-AUC for classification; RMSE, MAE, R² for regression.
- Validation: k-fold CV, stratified splits.
- Experiment tracking: MLflow, Weights & Biases.
- Deployment: REST APIs (FastAPI), containers (Docker), model registries.
- Monitoring: data drift, latency, accuracy drop.
- Responsible AI: fairness, privacy, explainability (SHAP, LIME).`,
        example: `y_true = [1,0,1,1,0]\ny_pred = [1,0,0,1,0]\ntp = sum(1 for t,p in zip(y_true,y_pred) if t==1 and p==1)\nfp = sum(1 for t,p in zip(y_true,y_pred) if t==0 and p==1)\nfn = sum(1 for t,p in zip(y_true,y_pred) if t==1 and p==0)\nprecision = tp/(tp+fp) if tp+fp else 0\nrecall = tp/(tp+fn) if tp+fn else 0\nprint("P:", precision, "R:", recall)`,
        exam: [
          { type: 'mcq', q: 'Best metric for regression:', options: ['F1', 'ROC-AUC', 'RMSE', 'accuracy'], answer: 2 },
          { type: 'fill', q: 'TP / (TP + FP) is the formula for ____.', answer: 'precision' },
          { type: 'mcq', q: 'Tool for experiment tracking:', options: ['MLflow', 'Nginx', 'Redis', 'Kafka'], answer: 0 },
          { type: 'mcq', q: 'SHAP is used for:', options: ['deployment', 'explainability', 'scaling', 'CI/CD'], answer: 1 },
          { type: 'mcq', q: 'Data drift refers to:', options: ['network lag', 'input distribution change', 'model weights decay', 'data encryption'], answer: 1 },
        ],
      },
    ],
  },
];

// Merge extra topics into the appropriate track
export const curriculum = _baseCurriculum.map(track => ({
  ...track,
  topics: [...track.topics, ...(extraTopics[track.id] || [])],
}));

const _baseProjects = [
  { id: 'p1', track: 'basics', title: 'Number Guessing Game', level: 'Beginner', brief: 'Build a CLI number-guessing game that gives hints after each guess, tracks attempts, and announces the winner.' },
  { id: 'p2', track: 'basics', title: 'Todo List (CLI)', level: 'Beginner', brief: 'Add, remove, mark-complete and list todos. Persist to a JSON file.' },
  { id: 'p3', track: 'advanced', title: 'Password Manager', level: 'Intermediate', brief: 'Use classes + file I/O. Store services and credentials; encrypt with a simple cipher.' },
  { id: 'p4', track: 'advanced', title: 'Web Scraper', level: 'Intermediate', brief: 'Use requests + BeautifulSoup to scrape article titles from a news page. Handle errors gracefully.' },
  { id: 'p5', track: 'datasci', title: 'Sales EDA', level: 'Intermediate', brief: 'Use pandas on a CSV of sales. Find top products, monthly trends and build 2 charts.' },
  { id: 'p6', track: 'datasci', title: 'Titanic Survival Analysis', level: 'Intermediate', brief: 'Explore Titanic dataset. Build features, handle missing values, visualise survival by class and age.' },
  { id: 'p7', track: 'aiml', title: 'Iris Classifier', level: 'Advanced', brief: 'Train a logistic regression & a random forest on the Iris dataset. Compare metrics. Deploy as a small FastAPI endpoint.' },
  { id: 'p8', track: 'aiml', title: 'Movie Recommender', level: 'Advanced', brief: 'Content-based recommender using TF-IDF + cosine similarity. Bonus: collaborative filter variant.' },
  { id: 'p9', track: 'aiml', title: 'Image Classifier (Transfer Learning)', level: 'Advanced', brief: 'Fine-tune a pretrained ResNet/CNN on a small image dataset. Track metrics, export weights.' },
];

export const projects = [..._baseProjects, ...extraProjects];

export function getAllTopics() {
  return curriculum.flatMap(t => t.topics.map(tp => ({ ...tp, trackId: t.id, trackName: t.name })));
}
