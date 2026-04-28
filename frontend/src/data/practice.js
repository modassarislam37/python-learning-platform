// Practice MCQs — 5 per topic, each with an "explain" string shown after the user answers.
// Passing all 5 (unlimited retries) unlocks the exam for that topic.

export const practiceBank = {
  // ─── Python Basics ─────────────────────────────────────────
  intro: [
    { q: 'Which symbol starts a single-line comment in Python?', options: ['//', '#', '/*', '--'], a: 1, e: '# starts a comment; everything after it on that line is ignored.' },
    { q: 'What does print() do?', options: ['Prints files', 'Sends text to stdout', 'Saves to disk', 'Compiles code'], a: 1, e: 'print() writes its arguments to standard output, typically the terminal or browser console.' },
    { q: 'Python source files end with which extension?', options: ['.py', '.pyt', '.python', '.p'], a: 0, e: 'Python source files use the .py extension.' },
    { q: 'Which statement is valid?', options: ['Print "hi"', 'print("hi")', 'echo "hi"', 'console.log("hi")'], a: 1, e: 'print is a function in Python 3 — arguments go inside parentheses.' },
    { q: 'Python is best described as:', options: ['Compiled and typed', 'Interpreted and dynamic', 'Assembly-level', 'Markup language'], a: 1, e: 'Python is an interpreted, dynamically-typed language.' },
  ],
  variables: [
    { q: 'Which is NOT a valid Python identifier?', options: ['my_var', '_total', '2fast', 'count1'], a: 2, e: 'Identifiers cannot start with a digit.' },
    { q: 'type(3.14) returns:', options: ['int', 'float', 'decimal', 'number'], a: 1, e: 'Numbers with a decimal point are floats in Python.' },
    { q: 'After x = "5", what is x + "3"?', options: ['8', '"53"', 'error', '15'], a: 1, e: 'Both operands are strings, so + concatenates them → "53".' },
    { q: 'Which reassignment is valid?', options: ['int x = 5', 'let x = 5', 'x = 5', 'var x := 5'], a: 2, e: 'Python uses plain assignment — no keyword and no type declaration.' },
    { q: 'What is None?', options: ['Zero', 'Empty string', 'Absence of a value', 'False'], a: 2, e: 'None represents the intentional absence of any value.' },
  ],
  strings: [
    { q: '"hello"[1] evaluates to:', options: ['"h"', '"e"', '"l"', 'error'], a: 1, e: 'Indexing is 0-based, so index 1 is the second character "e".' },
    { q: 'len("python") is:', options: ['5', '6', '7', 'error'], a: 1, e: '"python" has 6 characters.' },
    { q: 'f"{2+2}" produces:', options: ['"{2+2}"', '"4"', '"2+2"', 'error'], a: 1, e: 'f-strings evaluate expressions inside {} at runtime.' },
    { q: '"HI".lower() returns:', options: ['"HI"', '"hi"', '"Hi"', 'None'], a: 1, e: '.lower() returns a new lowercase version of the string.' },
    { q: '"abc" * 2 produces:', options: ['"ab"', '"abcabc"', 'error', '"abc2"'], a: 1, e: 'Multiplying a string by an integer repeats it that many times.' },
  ],
  control: [
    { q: 'Which forms the block body in Python?', options: ['Curly braces', 'Indentation', 'BEGIN/END', 'Parentheses'], a: 1, e: 'Python uses indentation (typically 4 spaces) to define code blocks.' },
    { q: 'Which evaluates to True?', options: ['0', '""', '[]', '"0"'], a: 3, e: 'Any non-empty string is truthy, even "0".' },
    { q: 'elif is short for:', options: ['else-if', 'ensure-if', 'end-if', 'either-if'], a: 0, e: 'elif chains an "else if" branch.' },
    { q: 'print("yes" if 5>3 else "no") prints:', options: ['yes', 'no', 'True', 'None'], a: 0, e: 'Ternary expressions return the first value when the condition is true.' },
    { q: 'not True and False evaluates to:', options: ['True', 'False', 'None', 'error'], a: 1, e: 'not True is False; False and False is False.' },
  ],
  loops: [
    { q: 'range(3) yields:', options: ['1,2,3', '0,1,2,3', '0,1,2', '3'], a: 2, e: 'range(n) produces 0..n-1.' },
    { q: 'Which keyword skips to the next iteration?', options: ['break', 'skip', 'continue', 'next'], a: 2, e: 'continue jumps to the next loop iteration.' },
    { q: 'Which loop runs at least zero times?', options: ['for', 'while', 'do-while', 'repeat'], a: 1, e: 'A while loop may not execute if its condition is false on entry; for loops over empty iterables also run zero times.' },
    { q: 'sum(range(5)) is:', options: ['10', '15', '5', '0'], a: 0, e: '0+1+2+3+4 = 10.' },
    { q: 'Which exits a loop immediately?', options: ['return', 'break', 'exit', 'stop'], a: 1, e: 'break terminates the nearest enclosing loop.' },
  ],
  functions: [
    { q: 'Which defines a function?', options: ['function', 'def', 'fun', 'lambda only'], a: 1, e: 'def is the keyword to define named functions.' },
    { q: 'What does a function return if no return statement runs?', options: ['0', 'None', '""', 'error'], a: 1, e: 'Functions without a return yield None.' },
    { q: 'def f(a, b=2): return a+b  →  f(3) is:', options: ['3', '5', '2', 'error'], a: 1, e: 'b defaults to 2, so 3+2 = 5.' },
    { q: '*args inside a signature collects:', options: ['keyword args', 'extra positional args', 'types', 'docstrings'], a: 1, e: '*args packs additional positional arguments into a tuple.' },
    { q: 'lambda x: x*x is:', options: ['a class', 'an anonymous function', 'a dict', 'invalid'], a: 1, e: 'lambda creates a small anonymous function.' },
  ],
  collections: [
    { q: 'Which is mutable?', options: ['tuple', 'str', 'list', 'frozenset'], a: 2, e: 'Lists can be modified after creation; tuples and strings cannot.' },
    { q: 'len({1,1,2,3}) is:', options: ['3', '4', '1', 'error'], a: 0, e: 'Sets de-duplicate, so {1,2,3} has 3 elements.' },
    { q: 'd = {"a":1}; d.get("b", 0) returns:', options: ['None', 'error', '0', '""'], a: 2, e: '.get returns the default (0) when the key is missing.' },
    { q: '[x*x for x in range(3)] produces:', options: ['[0,1,2]', '[1,4,9]', '[0,1,4]', '[1,2,3]'], a: 2, e: 'Squares of 0,1,2 are 0,1,4.' },
    { q: 'Which datatype preserves insertion order AND allows duplicates?', options: ['set', 'list', 'frozenset', 'dict keys only'], a: 1, e: 'Lists are ordered and allow duplicates.' },
  ],
  fileio: [
    { q: 'Which mode appends to a file?', options: ['"r"', '"w"', '"a"', '"x"'], a: 2, e: '"a" opens for appending; "w" truncates.' },
    { q: 'Why use "with open(...)"?', options: ['Faster reads', 'Auto-closes the file', 'Required syntax', 'Encrypts data'], a: 1, e: 'The with-statement guarantees the file is closed even on errors.' },
    { q: 'json.dumps({"a":1}) returns:', options: ['a dict', 'a string', 'a file', 'bytes'], a: 1, e: 'dumps → "s"tring; dump (without s) writes to a file object.' },
    { q: 'To read a file line-by-line, you can:', options: ['Use a for loop on the file object', 'Call f.lines()', 'Call f.each()', 'Use while True only'], a: 0, e: 'Iterating over a file object yields one line per iteration.' },
    { q: 'Open a binary file for reading with mode:', options: ['"rb"', '"br"', '"binary"', '"b"'], a: 0, e: '"rb" = read + binary.' },
  ],

  // ─── Python Advanced ───────────────────────────────────────
  oop: [
    { q: 'In a method, self refers to:', options: ['The class', 'The current instance', 'The parent class', 'The module'], a: 1, e: 'self is the first parameter passed to instance methods and points to the instance.' },
    { q: 'Constructor method name:', options: ['__start__', '__init__', '__new__', '__construct__'], a: 1, e: '__init__ initialises a new object.' },
    { q: 'Inheritance syntax:', options: ['class B : A', 'class B(A):', 'class B extends A:', 'B inherits A'], a: 1, e: 'Put parent classes inside parentheses.' },
    { q: 'Calling parent method from child:', options: ['parent.method()', 'super().method()', 'self.super.method()', 'ancestor()'], a: 1, e: 'super() returns a proxy to call the parent class\'s version.' },
    { q: 'A @staticmethod differs from a normal method because:', options: ['It takes no self/cls', 'It runs faster', 'It can\'t use args', 'It is private'], a: 0, e: 'Static methods don\'t receive self or cls and behave like plain functions namespaced on the class.' },
  ],
  errors: [
    { q: 'Which block is guaranteed to run?', options: ['try', 'except', 'else', 'finally'], a: 3, e: 'finally always runs — success or failure.' },
    { q: 'Raise an error with:', options: ['throw', 'raise', 'error', 'panic'], a: 1, e: 'Python uses raise to throw exceptions.' },
    { q: 'Base class of all exceptions:', options: ['Error', 'BaseException', 'Throwable', 'RuntimeError'], a: 1, e: 'BaseException is the root; most user exceptions inherit from Exception which inherits from BaseException.' },
    { q: 'Catch multiple types with:', options: ['except (A, B):', 'except A | B:', 'except A or B:', 'catch A, B'], a: 0, e: 'A tuple of exception classes in the except clause catches any of them.' },
    { q: 'When should you catch bare "except:"?', options: ['Always', 'Almost never', 'Only in debug', 'In loops'], a: 1, e: 'Bare except hides bugs; prefer specific exception types.' },
  ],
  iterators: [
    { q: 'yield is used to define:', options: ['a class', 'a generator', 'a decorator', 'a coroutine'], a: 1, e: 'A function with yield is a generator — it produces values lazily.' },
    { q: 'Generators are:', options: ['Eager', 'Lazy', 'Both', 'Neither'], a: 1, e: 'They produce values one at a time, on demand, saving memory.' },
    { q: 'Which creates a generator expression?', options: ['[x for x in L]', '(x for x in L)', '{x for x in L}', '{x:x for x in L}'], a: 1, e: 'Parentheses around a comprehension make a generator expression.' },
    { q: 'next(iter([1,2,3])) returns:', options: ['1', '2', '3', 'None'], a: 0, e: 'iter() wraps the list; next() pulls its first element.' },
    { q: 'A generator is exhausted after:', options: ['the first call', 'it yields StopIteration', 'a reset()', 'never'], a: 1, e: 'Once a generator raises StopIteration, it is done.' },
  ],
  decorators: [
    { q: 'A decorator is:', options: ['A class', 'A function that wraps another function', 'Metadata only', 'A CSS property'], a: 1, e: 'Decorators take a function and return a new (often enhanced) function.' },
    { q: 'Syntax to apply one:', options: ['@name', '#name', '!name', '$name'], a: 0, e: 'Prefix the target function definition with @decorator.' },
    { q: 'functools.wraps is used to:', options: ['Cache results', 'Preserve metadata (name, docstring)', 'Speed up code', 'Add threads'], a: 1, e: '@wraps copies __name__, __doc__, etc. from the wrapped function to the wrapper.' },
    { q: 'Decorators rely on which Python feature?', options: ['First-class functions', 'Threads', 'C extensions', 'Type hints'], a: 0, e: 'Because functions are objects you can pass and return.' },
    { q: '@property turns a method into:', options: ['a private var', 'an attribute accessor', 'a class method', 'a decorator'], a: 1, e: '@property lets you access obj.prop instead of obj.prop().' },
  ],
  modules: [
    { q: 'Load a module with:', options: ['include', 'require', 'import', 'using'], a: 2, e: 'Python uses the import statement.' },
    { q: 'Rename on import:', options: ['import math as m', 'import math -> m', 'import math.m', 'alias math m'], a: 0, e: 'Use "as" to create an alias.' },
    { q: 'File marking a folder as a (traditional) package:', options: ['__main__.py', '__init__.py', 'package.json', 'setup.cfg'], a: 1, e: '__init__.py signals "this folder is a package".' },
    { q: 'Virtualenv tool shipped with Python:', options: ['virtualenv', 'venv', 'poetry', 'conda'], a: 1, e: 'python -m venv creates isolated environments.' },
    { q: 'Install a package with:', options: ['npm install', 'pip install', 'apt-get', 'brew'], a: 1, e: 'pip is the standard Python package manager.' },
  ],
  async: [
    { q: 'Define an async function with:', options: ['def', 'async def', 'function', 'coroutine def'], a: 1, e: 'async def makes the function a coroutine.' },
    { q: 'await is legal:', options: ['anywhere', 'only in async functions', 'only at top-level', 'only in main()'], a: 1, e: 'await can only appear inside async def.' },
    { q: 'Run an async program from sync code with:', options: ['asyncio.run(main())', 'main()', 'await main()', 'thread.run(main)'], a: 0, e: 'asyncio.run drives the event loop until the coroutine completes.' },
    { q: 'Best for CPU-bound parallelism:', options: ['asyncio', 'threading', 'multiprocessing', 'select'], a: 2, e: 'The GIL limits CPU-bound threads; separate processes sidestep it.' },
    { q: 'The GIL in CPython:', options: ['Speeds IO', 'Serialises Python bytecode execution', 'Encrypts memory', 'Compiles to C'], a: 1, e: 'Only one thread runs Python bytecode at a time in CPython.' },
  ],
  testing: [
    { q: 'Dominant test runner:', options: ['nose', 'unittest2', 'pytest', 'mocha'], a: 2, e: 'pytest is the de-facto standard in the Python ecosystem.' },
    { q: 'Core verification statement:', options: ['check', 'assert', 'expect', 'must'], a: 1, e: 'Tests use plain assert statements.' },
    { q: 'Modern packaging metadata lives in:', options: ['setup.py', 'pyproject.toml', 'Pipfile', 'package.json'], a: 1, e: 'PEP 621 standardised pyproject.toml.' },
    { q: '@pytest.fixture provides:', options: ['Speed', 'Shared, reusable setup', 'Assertions', 'Coverage'], a: 1, e: 'Fixtures prepare resources (db, files) and inject them into tests.' },
    { q: 'Publish to PyPI using:', options: ['pip publish', 'twine upload', 'pytest push', 'pypi push'], a: 1, e: 'Build the distribution then upload it with twine.' },
  ],

  // ─── Data Science ──────────────────────────────────────────
  numpy: [
    { q: 'Core array type:', options: ['list', 'ndarray', 'matrix', 'Series'], a: 1, e: 'numpy.ndarray powers almost every scientific library.' },
    { q: 'Vectorised operations are usually:', options: ['Slower than loops', 'Faster than loops', 'The same', 'Unavailable'], a: 1, e: 'They run in optimised C under the hood — much faster than Python loops.' },
    { q: 'Reshape method:', options: ['.shape()', '.reshape()', '.resize_all()', '.mold()'], a: 1, e: '.reshape returns a view with the new shape.' },
    { q: 'np.arange(6).sum() equals:', options: ['15', '21', '10', '6'], a: 0, e: '0+1+2+3+4+5 = 15.' },
    { q: 'Broadcasting lets you:', options: ['Call networks', 'Operate on arrays of different shapes', 'Stream video', 'Read CSVs'], a: 1, e: 'NumPy auto-expands compatible shapes so element-wise ops work.' },
  ],
  pandas: [
    { q: '2-D labelled structure:', options: ['Array', 'DataFrame', 'Matrix', 'Table'], a: 1, e: 'DataFrame is the main tabular type.' },
    { q: 'Label-based selection:', options: ['.iloc', '.loc', '.at[]', '.sel'], a: 1, e: '.loc uses labels; .iloc uses integer positions.' },
    { q: 'Read CSV:', options: ['pd.read_csv("f.csv")', 'pd.csv("f.csv")', 'pd.load("f.csv")', 'pd.open("f.csv")'], a: 0, e: 'pandas.read_csv parses a CSV into a DataFrame.' },
    { q: 'df.head() default rows:', options: ['3', '5', '10', '20'], a: 1, e: '5 rows by default.' },
    { q: 'Filter rows where col > 0:', options: ['df.filter(col>0)', 'df[df.col > 0]', 'df.where(col>0).only()', 'df.col>0'], a: 1, e: 'Boolean masks select rows.' },
  ],
  viz: [
    { q: 'Best chart for a distribution:', options: ['pie', 'histogram', 'line', 'scatter'], a: 1, e: 'Histograms show the frequency distribution of a numeric variable.' },
    { q: 'seaborn is built on:', options: ['plotly', 'bokeh', 'matplotlib', 'd3'], a: 2, e: 'seaborn is a high-level interface to matplotlib.' },
    { q: 'Best chart for relationship between two numeric variables:', options: ['bar', 'pie', 'scatter', 'histogram'], a: 2, e: 'Scatter plots reveal correlation/clusters.' },
    { q: 'Heatmap is best for:', options: ['matrix-like values', 'time-series', 'parts-of-whole', 'flows'], a: 0, e: 'Heatmaps encode 2D matrix values as colour intensity.' },
    { q: 'Interactive charts are easiest with:', options: ['matplotlib', 'plotly', 'seaborn', 'PIL'], a: 1, e: 'plotly renders interactive, web-native charts.' },
  ],
  stats: [
    { q: 'Middle value of sorted data:', options: ['mean', 'median', 'mode', 'range'], a: 1, e: 'Median is the 50th-percentile value.' },
    { q: 'Std deviation measures:', options: ['centre', 'spread', 'skew', 'shape'], a: 1, e: 'Std tells you how far values typically deviate from the mean.' },
    { q: 'Correlation coefficient ranges:', options: ['0..1', '-1..1', '-∞..∞', '0..100'], a: 1, e: 'Pearson correlation is bounded between -1 and +1.' },
    { q: 'p < 0.05 commonly means:', options: ['Accept null', 'Reject null', 'No effect', 'Ambiguous'], a: 1, e: 'Low p-value = evidence against the null hypothesis.' },
    { q: 'Normal distribution is defined by:', options: ['just mean', 'mean & std', 'median only', 'min & max'], a: 1, e: 'N(μ, σ²) is fully specified by mean and variance.' },
  ],
  datawrangle: [
    { q: 'Drop rows with NaN:', options: ['df.dropna()', 'df.clean()', 'df.remove_null()', 'df.noNA()'], a: 0, e: '.dropna removes missing values.' },
    { q: 'Fill missing with mean:', options: ['df.fillna(df.mean())', 'df.set_na(mean)', 'df.replace_na(mean)', 'df.mean_fill()'], a: 0, e: '.fillna accepts a value or a Series of per-column fills.' },
    { q: 'Best imputation for skewed numeric:', options: ['mean', 'median', 'mode', 'zero'], a: 1, e: 'Median is robust to outliers in skewed data.' },
    { q: 'One-hot encoding is used for:', options: ['dates', 'images', 'categoricals', 'tokens'], a: 2, e: 'It creates a 0/1 column per category.' },
    { q: 'IQR = Q3 − ?', options: ['Q1', 'Q2', 'Q4', 'mean'], a: 0, e: 'Interquartile range is the 75th − 25th percentile.' },
  ],
  pandasadv: [
    { q: 'Summarise per group:', options: ['df.sort_values()', 'df.groupby("k").agg(...)', 'df.merge()', 'df.pivot()'], a: 1, e: 'groupby + agg is the summary workhorse.' },
    { q: 'SQL-like join:', options: ['concat', 'merge', 'stack', 'pivot'], a: 1, e: 'pd.merge mirrors SQL joins with how="inner|left|right|outer".' },
    { q: 'Reshape long→wide:', options: ['stack', 'melt', 'pivot_table', 'transpose'], a: 2, e: 'pivot_table pivots rows into columns with aggregation.' },
    { q: 'df.apply() operates on:', options: ['rows only', 'columns only', 'rows OR columns', 'whole file'], a: 2, e: 'Pass axis=0 (default, columns) or axis=1 (rows).' },
    { q: 'how="left" in merge keeps:', options: ['rows in right only', 'rows in both', 'all rows from left', 'neither'], a: 2, e: 'Left joins retain every row from the left DataFrame.' },
  ],

  // ─── AI / ML ───────────────────────────────────────────────
  mlintro: [
    { q: 'Predicting a price is a:', options: ['classification', 'regression', 'clustering', 'RL'], a: 1, e: 'Regression predicts continuous numeric targets.' },
    { q: 'k-means is:', options: ['supervised', 'unsupervised', 'RL', 'symbolic'], a: 1, e: 'It finds clusters without using labels.' },
    { q: 'High variance ≈', options: ['underfitting', 'overfitting', 'regularisation', 'normalisation'], a: 1, e: 'Model memorises training noise → overfitting.' },
    { q: 'Holding out data to estimate real-world error:', options: ['train/test split', 'hyper-tuning', 'feature scaling', 'encoding'], a: 0, e: 'Always test on unseen data.' },
    { q: 'Cross-validation helps estimate:', options: ['training time', 'generalisation', 'memory', 'GPU usage'], a: 1, e: 'CV averages performance across multiple splits.' },
  ],
  sklearn: [
    { q: 'Primary training method:', options: ['train()', 'fit()', 'learn()', 'build()'], a: 1, e: 'Every sklearn estimator exposes fit().' },
    { q: 'Split data with:', options: ['train_test_split', 'split_data', 'holdout', 'partition'], a: 0, e: 'From sklearn.model_selection.' },
    { q: 'Chain preprocessing + model with:', options: ['Pipeline', 'Flow', 'Chain', 'ModelSet'], a: 0, e: 'Pipeline applies steps in order and prevents data leakage.' },
    { q: 'Best metric for imbalanced classification:', options: ['accuracy', 'F1', 'MSE', 'R²'], a: 1, e: 'F1 balances precision and recall on imbalanced data.' },
    { q: 'StandardScaler transforms to:', options: ['min-max', 'mean 0 std 1', 'log space', 'one-hot'], a: 1, e: 'z = (x − μ) / σ.' },
  ],
  neuralnet: [
    { q: 'ReLU(x) equals:', options: ['1/(1+e^-x)', 'max(0,x)', 'tanh(x)', 'x²'], a: 1, e: 'Rectified linear unit: negative values clip to zero.' },
    { q: 'Loss for binary classification:', options: ['MSE', 'MAE', 'binary cross-entropy', 'hinge'], a: 2, e: 'BCE penalises confident wrong predictions strongly.' },
    { q: 'Weights update via:', options: ['voting', 'gradient descent', 'random walk', 'bubble sort'], a: 1, e: 'Backprop gives gradients; gradient descent moves weights.' },
    { q: 'Best architecture for images:', options: ['RNN', 'CNN', 'GAN-only', 'Transformer-only'], a: 1, e: 'CNNs exploit spatial locality with convolutions and pooling.' },
    { q: 'Transformer\'s core mechanism:', options: ['convolution', 'recurrence', 'attention', 'pooling'], a: 2, e: 'Self-attention lets every token look at every other token.' },
  ],
  deeplearning: [
    { q: 'GPT is a:', options: ['CNN', 'RNN', 'Transformer-based LLM', 'Decision tree'], a: 2, e: 'GPT uses a stack of transformer decoder blocks.' },
    { q: 'Transfer learning =', options: ['moving files', 'reusing pretrained weights', 'port forwarding', 'data migration'], a: 1, e: 'Fine-tune an already-trained model on your smaller task.' },
    { q: 'Hugging Face is famous for:', options: ['image filters', 'the transformers library & model hub', 'databases', 'browsers'], a: 1, e: 'Hub + transformers library = easy access to SOTA models.' },
    { q: 'Which family powers modern image generation?', options: ['SVM', 'Decision tree', 'Diffusion', 'k-means'], a: 2, e: 'Diffusion models (Stable Diffusion, DALL·E-3) dominate image gen.' },
    { q: 'A common DL framework from Meta:', options: ['Keras', 'PyTorch', 'JAX', 'MXNet'], a: 1, e: 'PyTorch was open-sourced by Meta and is widely used in research.' },
  ],
  mlops: [
    { q: 'Best regression metric:', options: ['F1', 'ROC-AUC', 'RMSE', 'accuracy'], a: 2, e: 'RMSE measures average prediction error in the target units.' },
    { q: 'Precision = TP / ?', options: ['TP+FN', 'TP+FP', 'FP+FN', 'TP+TN'], a: 1, e: 'Precision = true positives over all predicted positives.' },
    { q: 'Track experiments with:', options: ['MLflow', 'Nginx', 'Redis', 'Kafka'], a: 0, e: 'MLflow logs runs, params, metrics and artifacts.' },
    { q: 'Data drift means:', options: ['Network lag', 'Input distribution changes over time', 'Weight decay', 'Encryption'], a: 1, e: 'Monitor drift to catch silent model degradation.' },
    { q: 'SHAP/LIME are used for:', options: ['deployment', 'explainability', 'scaling', 'CI/CD'], a: 1, e: 'They attribute predictions to input features.' },
  ],
  prompting: [
    { q: 'RAG stands for:', options: ['Random Attention Grouping', 'Retrieval-Augmented Generation', 'Reliable Agent Graph', 'Regularised Approx Gradient'], a: 1, e: 'Retrieve relevant chunks, then generate grounded in them.' },
    { q: 'Chain-of-thought prompting asks the model to:', options: ['be shorter', 'think step-by-step', 'use tools', 'speak in bullets'], a: 1, e: 'Intermediate reasoning steps boost multi-step task accuracy.' },
    { q: 'Embeddings are stored in a:', options: ['SQL table only', 'vector database', 'text file only', 'CSV'], a: 1, e: 'Vector DBs (FAISS, Chroma, Pinecone) support similarity search.' },
    { q: 'Few-shot prompting means:', options: ['short prompts', 'including examples in the prompt', 'low temperature', 'streaming output'], a: 1, e: 'Examples in-context steer the model without fine-tuning.' },
    { q: 'RAG is preferred when:', options: ['You need LLM knowledge updated without retraining', 'You need smaller prompts', 'You want offline only', 'You have no data'], a: 0, e: 'RAG injects fresh/private context at inference time.' },
  ],
};

export function getPractice(topicId) {
  return practiceBank[topicId] || [];
}
