'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Monaco editor must be dynamically loaded (no SSR)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const EXAMPLES: Record<string, string> = {
  'Hello World': `// Simple React component with Tailwind
function App() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Hello, World!
        </h1>
        <p className="text-gray-600 text-lg">
          Edit this code to see live updates →
        </p>
      </div>
    </div>
  );
}

render(<App />);`,

  'Counter (useState)': `// useState hook example
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h1 className="text-2xl font-bold">Counter Demo</h1>
      <div className="text-6xl font-mono font-bold text-blue-600">
        {count}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          − Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
        >
          + Increment
        </button>
      </div>
    </div>
  );
}

render(<Counter />);`,

  'Todo List': `// A full todo list with useState
function TodoApp() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn TypeScript', done: false },
    { id: 3, text: 'Build something awesome', done: false },
  ]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggle = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const remove = (id) => setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Todos</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 group">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo.id)}
              className="w-4 h-4 accent-blue-500"
            />
            <span className={`flex-1 text-sm ${todo.done ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => remove(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-opacity"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-4 text-center">
        {todos.filter(t => t.done).length} of {todos.length} completed
      </p>
    </div>
  );
}

render(<TodoApp />);`,

  'Card Component': `// Building a reusable card component
function Badge({ children, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

function Card({ title, description, tags, status }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <Badge color={status === 'Done' ? 'green' : status === 'In Progress' ? 'blue' : 'yellow'}>
          {status}
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {tags.map(t => <Badge key={t}>{t}</Badge>)}
      </div>
    </div>
  );
}

function App() {
  const cards = [
    { title: 'Build auth system', description: 'Implement login and session management with BetterAuth.', tags: ['auth', 'next.js'], status: 'Done' },
    { title: 'Add Prisma ORM', description: 'Set up database schema and connect to PostgreSQL.', tags: ['prisma', 'database'], status: 'In Progress' },
    { title: 'Set up PostHog', description: 'Add analytics and feature flags to the app.', tags: ['analytics'], status: 'Todo' },
  ];

  return (
    <div className="p-6 space-y-3 max-w-md mx-auto">
      <h1 className="font-bold text-lg mb-4">📝 Project Board</h1>
      {cards.map(c => <Card key={c.title} {...c} />)}
    </div>
  );
}

render(<App />);`,
};

export default function PlaygroundPage() {
  const [code, setCode] = useState(EXAMPLES['Hello World']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedExample, setSelectedExample] = useState('Hello World');

  const runCode = useCallback(() => {
    setError('');
    setOutput('');

    try {
      // Build a self-contained HTML document that runs the code in an iframe
      const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script src="https://cdn.tailwindcss.com"><\/script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head>
<body>
<div id="root" style="height:100vh"></div>
<script type="text/babel" data-presets="react">
const render = (el) => ReactDOM.createRoot(document.getElementById('root')).render(el);
${code}
<\/script>
</body>
</html>`;
      setOutput(html);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [code]);

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">⚡ Live Playground</span>
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
            {Object.keys(EXAMPLES).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <Button
            onClick={runCode}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2 rounded-lg text-sm"
          >
            ▶ Run
          </Button>
        </div>
      </div>

      {/* Main split pane */}
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
                <div className="text-4xl">▶</div>
                <p>Press <kbd className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">Run</kbd> to see your code rendered here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
