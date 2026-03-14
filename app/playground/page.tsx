'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { EXAMPLES } from '@/lib/playground-examples';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function PlaygroundPage() {
  const [code, setCode] = useState(EXAMPLES['Hello World']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedExample, setSelectedExample] = useState('Hello World');

  const runCode = useCallback(() => {
    setError('');
    setOutput('');
    try {
      const parts = [
        '<!DOCTYPE html><html><head>',
        '<meta charset="UTF-8" />',
        '<script src="https://cdn.tailwindcss.com"><\/script>',
        '<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>',
        '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>',
        '<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>',
        '</head><body>',
        '<div id="root" style="height:100vh"></div>',
        '<script type="text/babel" data-presets="react">',
        'const render = (el) => ReactDOM.createRoot(document.getElementById(\'root\')).render(el);',
        code,
        '<\/script>',
        '</body></html>',
      ];
      setOutput(parts.join('\n'));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [code]);

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Live Playground</span>
          <span className="text-xs text-slate-400">React + Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedExample}
            onChange={(e) => {
              setSelectedExample(e.target.value);
              setCode(EXAMPLES[e.target.value]);
            }}
            className="text-sm bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-white"
          >
            {Object.keys(EXAMPLES).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <Button
            onClick={runCode}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2 rounded-lg text-sm"
          >
            Run
          </Button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex flex-col w-1/2 border-r border-slate-700">
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-900 border-b border-slate-700">
            Editor
          </div>
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(v) => setCode(v ?? '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              tabSize: 2,
              lineNumbers: 'on',
              renderLineHighlight: 'line',
              padding: { top: 16 },
            }}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col w-1/2 bg-white">
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border-b border-slate-200">
            Preview
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-mono border-b border-red-200">
              {error}
            </div>
          )}
          {output ? (
            <iframe
              srcDoc={output}
              className="flex-1 w-full border-none"
              sandbox="allow-scripts"
              title="preview"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              <div className="text-center space-y-2">
                <div className="text-4xl">&#9654;</div>
                <p>
                  Press{' '}
                  <kbd className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">
                    Run
                  </kbd>{' '}
                  to see your code rendered here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
