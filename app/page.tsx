import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center min-h-screen">
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Beginner Friendly
        </span>
        <h1 className="text-5xl font-bold tracking-tight">
          TypeScript Full-Stack Guide
        </h1>
        <p className="text-xl text-gray-500 max-w-xl">
          From zero to full-stack. Learn HTML, JavaScript, TypeScript, React, Next.js,
          Tailwind CSS and beyond — with an interactive playground built in.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
          >
            Start Learning →
          </Link>
          <Link
            href="/playground"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Open Playground
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
        {[
          { emoji: '🧱', title: 'The Foundations', desc: 'HTML, CSS, JavaScript and TypeScript — no prior experience needed.' },
          { emoji: '⚛️', title: 'React & Hooks', desc: 'Components, state, effects, context and everything that makes React tick.' },
          { emoji: '🚀', title: 'Next.js & Beyond', desc: 'Build a real app with Next.js, Tailwind, Prisma, BetterAuth, Sentry and PostHog.' },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-gray-200 p-6 text-left bg-white shadow-sm">
            <div className="text-3xl mb-3">{card.emoji}</div>
            <h2 className="font-semibold text-lg mb-1">{card.title}</h2>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
