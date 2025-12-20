import { readdirSync, statSync, existsSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const openapiDir = './content/docs/reevit/openapi';

// Title mappings for tag folders
const tagTitles: Record<string, string> = {
  'activity-logs': 'Activity Logs',
  'admin': 'Admin',
  'api-keys': 'API Keys',
  'authentication': 'Authentication',
  'connections': 'Connections',
  'fraud': 'Fraud Policies',
  'invoices': 'Invoices',
  'kyc-verification': 'KYC Verification',
  'oauth': 'OAuth',
  'observability': 'Observability',
  'payments': 'Payments',
  'retry-policies': 'Retry Policies',
  'routing-rules': 'Routing Rules',
  'subscriptions': 'Subscriptions',
  'two-factor-authentication': 'Two-Factor Auth',
  'user-preferences': 'User Preferences',
  'webauthn': 'WebAuthn/Passkeys',
  'webhooks': 'Webhooks',
  'workflows': 'Workflows',
};

interface MetaEntry {
  title?: string;
  pages?: (string | MetaEntry)[];
  [key: string]: any;
}

function collectPages(dirPath: string, basePath: string = ''): string[] {
  const pages: string[] = [];

  if (!existsSync(dirPath)) return pages;

  const items = readdirSync(dirPath)
    .filter(item => !item.startsWith('.') && item !== 'meta.json')
    .sort();

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;

    try {
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        pages.push(...collectPages(fullPath, relativePath));
      } else if (item.endsWith('.mdx')) {
        pages.push(relativePath.replace('.mdx', ''));
      }
    } catch (e) {
      // Skip
    }
  }

  return pages;
}

function generateTagMeta(tagDir: string, tagName: string) {
  const pages = collectPages(tagDir);
  const title = tagTitles[tagName] || tagName.charAt(0).toUpperCase() + tagName.slice(1);

  const meta: MetaEntry = {
    title,
    root: true,
    pages: pages,
  };

  const metaPath = join(tagDir, 'meta.json');
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`Generated meta.json for ${tagName} with ${pages.length} pages`);
}

// Process each tag folder
const tagFolders = readdirSync(openapiDir)
  .filter(item => {
    const fullPath = join(openapiDir, item);
    return statSync(fullPath).isDirectory();
  });

console.log('Processing tag folders:', tagFolders);

for (const tag of tagFolders) {
  const tagDir = join(openapiDir, tag);
  generateTagMeta(tagDir, tag);
}

console.log('Done!');
