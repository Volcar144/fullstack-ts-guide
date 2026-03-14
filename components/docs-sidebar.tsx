'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/docs';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <nav className="w-64 shrink-0">
      <div className="mb-6">
        <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
          TS Full-Stack Guide
        </Link>
      </div>
      <div className="space-y-6">
        {NAV.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2">
              {section.section}
            </p>
            <ul className="space-y-0.5">
              {section.pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-2 py-1.5 rounded-md text-sm transition-colors',
                      pathname === page.href
                        ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-950 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                    )}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/playground"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
        >
          <span>⚡</span> Live Playground
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-600" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={cn(
        'md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-xl transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen overflow-y-auto py-10 pl-6 pr-4">
        {sidebar}
      </div>
    </>
  );
}
