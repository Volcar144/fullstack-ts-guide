import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIR = path.join(process.cwd(), 'content/docs');

export interface DocMeta {
  title: string;
  description?: string;
  slug: string[];
  href: string;
}

export interface DocPage extends DocMeta {
  content: string;
}

/** Recursively list all .mdx files and return their parsed frontmatter. */
export function getAllDocs(): DocMeta[] {
  const results: DocMeta[] = [];

  function walk(dir: string, prefix: string[]) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'meta.json') continue;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name]);
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const name = entry.name.replace(/\.mdx?$/, '');
        const slug = name === 'index' ? prefix : [...prefix, name];
        const raw = fs.readFileSync(path.join(dir, entry.name), 'utf8');
        const { data } = matter(raw);
        results.push({
          title: data.title ?? name,
          description: data.description,
          slug,
          href: '/docs' + (slug.length ? '/' + slug.join('/') : ''),
        });
      }
    }
  }

  walk(DOCS_DIR, []);
  return results;
}

/** Read a single doc by slug array. */
export function getDoc(slug: string[]): DocPage | null {
  const candidates = [
    path.join(DOCS_DIR, ...slug) + '.mdx',
    path.join(DOCS_DIR, ...slug) + '.md',
    path.join(DOCS_DIR, ...slug, 'index.mdx'),
    path.join(DOCS_DIR, ...slug, 'index.md'),
  ];
  // Root /docs => index.mdx at docs root
  if (slug.length === 0) {
    candidates.push(path.join(DOCS_DIR, 'index.mdx'));
  }

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      return {
        title: data.title ?? slug[slug.length - 1] ?? 'Docs',
        description: data.description,
        slug,
        href: '/docs' + (slug.length ? '/' + slug.join('/') : ''),
        content,
      };
    }
  }
  return null;
}

/** Navigation structure — ordered sections and pages for the sidebar. */
export const NAV = [
  {
    section: 'Getting Started',
    pages: [
      { title: 'Welcome', href: '/docs' },
    ],
  },
  {
    section: 'Foundations',
    pages: [
      { title: 'Choosing a Framework', href: '/docs/foundations/choosing-a-framework' },
      { title: 'Dev Environment', href: '/docs/foundations/dev-environment' },
      { title: 'HTML Basics', href: '/docs/foundations/html-basics' },
      { title: 'CSS Basics', href: '/docs/foundations/css-basics' },
      { title: 'JavaScript Basics', href: '/docs/foundations/javascript-basics' },
      { title: 'TypeScript Basics', href: '/docs/foundations/typescript-basics' },
      { title: 'Package Managers', href: '/docs/foundations/package-managers' },
      { title: 'Type Safety', href: '/docs/foundations/type-safety' },
    ],
  },
  {
    section: 'React',
    pages: [
      { title: 'Introduction to React', href: '/docs/react/intro-to-react' },
      { title: 'Components & Props', href: '/docs/react/components-and-props' },
      { title: 'State & Hooks', href: '/docs/react/state-and-hooks' },
      { title: 'useEffect & Side Effects', href: '/docs/react/useEffect-and-side-effects' },
      { title: 'useRef, useMemo & useCallback', href: '/docs/react/use-ref-and-use-memo' },
      { title: 'Context API', href: '/docs/react/context-api' },
      { title: 'Custom Hooks', href: '/docs/react/custom-hooks' },
      { title: 'Forms', href: '/docs/react/forms' },
      { title: 'TypeScript in React', href: '/docs/react/typescript-in-react' },
    ],
  },
  {
    section: 'Next.js & Tailwind',
    pages: [
      { title: 'Getting Started', href: '/docs/nextjs/getting-started' },
      { title: 'File-Based Routing', href: '/docs/nextjs/file-based-routing' },
      { title: 'Layouts & Pages', href: '/docs/nextjs/layouts-and-pages' },
      { title: 'Server vs Client Components', href: '/docs/nextjs/server-vs-client-components' },
      { title: 'Data Fetching', href: '/docs/nextjs/data-fetching' },
      { title: 'Server Actions', href: '/docs/nextjs/server-actions' },
      { title: 'API Routes', href: '/docs/nextjs/api-routes' },
      { title: 'Middleware', href: '/docs/nextjs/middleware' },
      { title: 'Environment Variables', href: '/docs/nextjs/environment-variables' },
      { title: 'Tailwind Fundamentals', href: '/docs/nextjs/tailwind-fundamentals' },
      { title: 'shadcn/ui', href: '/docs/nextjs/shadcn-ui' },
      { title: 'Building the App', href: '/docs/nextjs/building-the-app' },
      { title: 'Deployment', href: '/docs/nextjs/deployment' },
    ],
  },
  {
    section: 'Ecosystem',
    pages: [
      { title: 'Prisma', href: '/docs/ecosystem/prisma' },
      { title: 'BetterAuth', href: '/docs/ecosystem/betterauth' },
      { title: 'Zod & Validation', href: '/docs/ecosystem/zod-and-validation' },
      { title: 'Sentry', href: '/docs/ecosystem/sentry' },
      { title: 'PostHog', href: '/docs/ecosystem/posthog' },
      { title: 'Testing', href: '/docs/ecosystem/testing' },
      { title: 'Git & GitHub', href: '/docs/ecosystem/git-and-github' },
    ],
  },
];
