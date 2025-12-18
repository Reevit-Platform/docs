import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { primeflowSource } from '@/lib/source';
import { DocsSwitcher } from '@/components/DocsSwitcher';
import { notFound } from 'next/navigation';
import { Book, FileCode } from 'lucide-react';

export default async function Layout({ 
  children, 
  params,
}: { 
  children: ReactNode;
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  
  if (product !== 'primeflow') {
    notFound();
  }

  return (
    <DocsLayout
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        title: <DocsSwitcher />,
      }}
      tree={primeflowSource.pageTree}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta = primeflowSource.getNodeMeta(node);
            if (!meta) return option;

            // Define colors and icons for each tab
            const tabConfig: Record<string, { color: string; icon: React.ReactNode }> = {
              docs: {
                color: '#10b981', // emerald-500
                icon: <Book className="size-4" />,
              },
              openapi: {
                color: '#8b5cf6', // violet-500
                icon: <FileCode className="size-4" />,
              },
            };

            // Extract the tab identifier from the path
            const pathSegments = meta.path.split('/');
            const tabId = pathSegments[0] || 'docs';
            const config = tabConfig[tabId] || tabConfig.docs;

            return {
              ...option,
              icon: (
                <div
                  className="[&_svg]:size-full rounded-lg size-full max-md:border max-md:p-1.5"
                  style={{
                    color: config.color,
                    backgroundColor: `${config.color}10`,
                  }}
                >
                  {config.icon}
                </div>
              ),
              description: option.description,
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
