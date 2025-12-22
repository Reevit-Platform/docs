import { reevitSource } from '@/lib/source';
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
  if (product !== 'reevit') {
    notFound();
  }

  const currentSource = reevitSource;

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
      <PageArticle className="max-w-none!">
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

        <div className="prose max-w-none! flex-1 text-fd-foreground/80">
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
  const reevitParams = reevitSource.generateParams().map((p) => ({
    product: 'reevit',
    slug: p.slug.slice(1),
  }));
  return [...reevitParams];
}

export async function generateMetadata(props: {
  params: Promise<{ product: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const { product, slug } = params;

  if (product !== 'reevit') {
    return {};
  }

  const currentSource = reevitSource;

  const normalizedSlug = slug?.[0] === product ? slug.slice(1) : slug;
  const page = currentSource.getPage([product, ...(normalizedSlug || [])]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}