import { primeflowSource } from '@/lib/source';
import {
  PageArticle,
  PageBreadcrumb,
  PageFooter,
  PageLastUpdate,
  PageRoot,
  PageTOC,
  PageTOCItems,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverItems,
  PageTOCPopoverTrigger,
  PageTOCTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { LLMCopyButton, ViewOptions } from '@/components/llm-copy-button';

export default async function Page(props: {
  params: Promise<{ product: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { product, slug } = params;

  // Validate product parameter
  if (product !== 'primeflow') {
    notFound();
  }

  const currentSource = primeflowSource;

  const normalizedSlug = slug?.[0] === product ? slug.slice(1) : slug;
  const lookupPath = [product, ...(normalizedSlug || [])];

  const page = currentSource.getPage(lookupPath);
  if (!page) {
    notFound();
  }

  const MDXContent = (page.data as any).body;

  // Generate URLs for the LLM copy button
  const fullSlug = [product, ...(normalizedSlug || [])].join('/');
  const markdownUrl = `/api/source/${fullSlug}`;
  const githubUrl = `https://github.com/felixyeboah/docs-combined/blob/main/content/docs/${fullSlug}.mdx`;

  return (
    <PageRoot
      toc={{
        toc: (page.data as any).toc,
        single: false,
      }}
    >
      {(page.data as any).toc.length > 0 && (
        <PageTOCPopover>
          <PageTOCPopoverTrigger />
          <PageTOCPopoverContent>
            <PageTOCPopoverItems />
          </PageTOCPopoverContent>
        </PageTOCPopover>
      )}
      <PageArticle>
        <PageBreadcrumb />
        <h1 className="text-3xl font-semibold">{page.data.title}</h1>
        <p className="text-lg text-fd-muted-foreground">
          {page.data.description}
        </p>

        {/* LLM Copy Button with border */}
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={markdownUrl} />
          <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
        </div>

        <div className="prose flex-1 text-fd-foreground/80">
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(currentSource, page),
            })}
          />
        </div>
        <PageFooter />
      </PageArticle>
      {(page.data as any).toc.length > 0 && (
        <PageTOC>
          <PageTOCTitle />
          <PageTOCItems variant="clerk" />
        </PageTOC>
      )}
    </PageRoot>
  );
}

export async function generateStaticParams() {
  const primeflowParams = primeflowSource.generateParams().map((p) => ({
    product: 'primeflow',
    slug: p.slug.slice(1),
  }));
  return [...primeflowParams];
}

export async function generateMetadata(props: {
  params: Promise<{ product: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { product, slug } = params;

  if (product !== 'primeflow') {
    return {};
  }

  const currentSource = primeflowSource;

  const normalizedSlug = slug?.[0] === product ? slug.slice(1) : slug;
  const page = currentSource.getPage([product, ...(normalizedSlug || [])]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}