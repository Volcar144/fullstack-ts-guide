import { getDoc, getAllDocs } from '@/lib/docs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Callout } from '@/components/callout';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

type Props = {
  params: { slug?: string[] };
};

const mdxComponents = {
  Callout,
};

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeHighlight,
  ],
} as const;

export default async function DocPage({ params }: Props) {
  const slug = params.slug ?? [];
  const page = getDoc(slug);
  if (!page) notFound();

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-lg text-gray-500 dark:text-gray-400">{page.description}</p>
        )}
      </div>
      <div className="prose prose-gray dark:prose-invert prose-code:text-sm max-w-none">
        <MDXRemote
          source={page.content}
          components={mdxComponents}
          options={{ mdxOptions }}
        />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug.length ? doc.slug : undefined }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug ?? [];
  const page = getDoc(slug);
  if (!page) return {};
  return {
    title: `${page.title} — TS Full-Stack Guide`,
    description: page.description,
  };
}
