import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { resolveFiles } from 'fumadocs-mdx';
import * as allIcons from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createElement } from 'react';

// Create source with resolved files
// fumadocs-core expects { files: VirtualFile[] }
const files = resolveFiles({ docs: docs.docs, meta: docs.meta });

export const reevitSource = loader({
  baseUrl: '/docs/reevit',
  url(slugs) {
    return '/docs/reevit/' + slugs.slice(1).join('/');
  },
  icon(icon) {
    if (icon && icon in allIcons)
      return createElement(HugeiconsIcon, { icon: allIcons[icon as keyof typeof allIcons] as any });
  },
  source: { files },
});

// Backward-compatible aggregate source
export const source = loader({
  baseUrl: '/docs',
  url(slugs) {
    return '/docs/' + slugs.join('/');
  },
  icon(icon) {
    if (icon && icon in allIcons)
      return createElement(HugeiconsIcon, { icon: allIcons[icon as keyof typeof allIcons] as any });
  },
  source: { files },
});
