'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import { useEffect, useState } from 'react';

export function ApiExplorer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-background animate-pulse" />;
  }

  return (
    <div className="w-full h-screen">
      <style>{`
        /* Color theme matching */
        .scalar-app {
          --scalar-background-1: var(--background);
          --scalar-background-2: var(--card);
          --scalar-background-3: var(--muted);
          --scalar-color-1: var(--foreground);
          --scalar-color-2: var(--muted-foreground);
          --scalar-color-3: var(--muted-foreground);
          --scalar-color-accent: var(--primary);
          --scalar-border-color: var(--border);
          height: 100%;
        }
      `}</style>
      <ApiReferenceReact
        configuration={{
          url: '/openapi-public.yaml',
          theme: 'default',
          darkMode: true,
          hideDownloadButton: false,
          showTestRequestButton: true,
          layout: 'modern',
        } as any}
      />
    </div>
  );
}
