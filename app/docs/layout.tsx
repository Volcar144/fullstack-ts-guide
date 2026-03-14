import type { ReactNode } from 'react';
import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <DocsSidebar />
      <main className="flex-1 min-w-0 py-10 px-6 md:px-10">
        {children}
      </main>
    </div>
  );
}
