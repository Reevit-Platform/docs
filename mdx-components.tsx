import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { IntroDiagram } from '@/components/IntroDiagram';
import { ShopDiagram } from '@/components/ShopDiagram';
import { ChannelDiagram } from '@/components/ChannelDiagram';
import { LinkDiagram } from '@/components/LinkDiagram';
import { MatchDiagram } from '@/components/MatchDiagram';
import { DocShowcase } from '@/components/ui/showcase';
import { APIPage } from 'fumadocs-openapi/ui';
import { ApiExplorer } from '@/components/ApiExplorer';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    HugeiconsIcon: (props: any) => <HugeiconsIcon {...props} />,
    Button,
    IntroDiagram,
    ShopDiagram,
    ChannelDiagram,
    LinkDiagram,
    MatchDiagram,
    DocShowcase,
    APIPage,
    ApiExplorer,
    ...components,
  };
}
