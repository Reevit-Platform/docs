import { join } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Import fumadocs-openapi
const fumadocsOpenAPI = require(join(__dirname, '../node_modules/fumadocs-openapi/dist/index.js'));
const { generateFiles } = fumadocsOpenAPI;

const INPUT_SPEC = 'content/docs/reevit/openapi/openapi.yaml';
const OUTPUT_SPEC = 'public/openapi-public.yaml';

const allowedTags = [
  'Payments',
  'Subscriptions',
  'Invoices',
  'Connections',
  'Webhooks',
  'Routing Rules',
  'Fraud',
  'Retry Policies',
  'Workflows',
  'API Keys',
];

async function generate() {
  console.log('Filtering OpenAPI spec...');
  const spec = yaml.load(fs.readFileSync(INPUT_SPEC, 'utf8')) as any;

  if (spec.paths) {
    const filteredPaths: any = {};
    for (const [path, pathItem] of Object.entries(spec.paths)) {
      const filteredPathItem: any = {};
      let hasAllowedOp = false;

      for (const [method, operation] of Object.entries(pathItem as any)) {
        if (typeof operation !== 'object' || operation === null) continue;
        const opTags = (operation as any).tags || [];
        if (opTags.some((tag: string) => allowedTags.includes(tag))) {
          filteredPathItem[method] = operation;
          hasAllowedOp = true;
        }
      }

      if (hasAllowedOp) {
        filteredPaths[path] = filteredPathItem;
      }
    }
    spec.paths = filteredPaths;
  }

  fs.writeFileSync(OUTPUT_SPEC, yaml.dump(spec));
  console.log('✅ Filtered spec saved to:', OUTPUT_SPEC);

  console.log('Generating OpenAPI documentation pages...');

  await generateFiles({
    input: [OUTPUT_SPEC],
    output: 'content/docs/reevit/openapi',
    per: 'operation',
    groupBy: 'tag',
    cwd: process.cwd(),
    frontmatter: (title: string, description: string) => ({
      title,
      description: description || `API endpoint: ${title}`,
      full: true,
    }),
  });

  console.log('✅ OpenAPI pages generated successfully!');
}

generate().catch((error) => {
  console.error('❌ Error generating OpenAPI pages:', error);
  process.exit(1);
});
