import { ApiExplorer } from '@/components/ApiExplorer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Reference - Reevit',
  description: 'Interactive OpenAPI documentation for Reevit',
};

export default function ApiReferencePage() {
  return (
    <div className="w-full min-h-screen">
      <ApiExplorer />
    </div>
  );
}
