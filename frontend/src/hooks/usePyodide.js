import { useEffect, useState } from 'react';

let _pyodide = null;
let _loading = null;

export function usePyodide() {
  const [ready, setReady] = useState(!!_pyodide);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (_pyodide) { setReady(true); return; }
    if (!_loading) {
      _loading = (async () => {
        try {
          // eslint-disable-next-line no-undef
          _pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
          });
          return _pyodide;
        } catch (e) {
          _loading = null;
          throw e;
        }
      })();
    }
    _loading.then(() => setReady(true)).catch(e => setError(e.message));
  }, []);

  const run = async (code) => {
    if (!_pyodide) throw new Error('Pyodide not ready');
    let stdout = '';
    let stderr = '';
    _pyodide.setStdout({ batched: (s) => { stdout += s + '\n'; } });
    _pyodide.setStderr({ batched: (s) => { stderr += s + '\n'; } });
    try {
      const result = await _pyodide.runPythonAsync(code);
      return { stdout, stderr, result: result === undefined ? '' : String(result) };
    } catch (e) {
      return { stdout, stderr: (stderr + String(e.message)).trim(), result: '' };
    }
  };

  const loadPackages = async (pkgs) => {
    if (!_pyodide) return;
    await _pyodide.loadPackage(pkgs);
  };

  return { ready, error, run, loadPackages };
}
