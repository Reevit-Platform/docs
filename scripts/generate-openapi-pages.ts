import { join } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Import fumadocs-openapi
const fumadocsOpenAPI = require(join(__dirname, '../node_modules/fumadocs-openapi/dist/index.js'));
const { generateFiles } = fumadocsOpenAPI;

// ========================================
// CONFIGURATION - Update this URL to your production OpenAPI spec
// ========================================
const OPENAPI_SPEC_URL = 'https://api.primeflow.com/openapi.yaml';
// You can also use a local file path for development:
// const OPENAPI_SPEC_URL = 'content/docs/primeflow/openapi/openapi.yaml';

async function generate() {
  console.log('Generating OpenAPI documentation pages...');
  console.log('Input:', OPENAPI_SPEC_URL);
  console.log('CWD:', process.cwd());

  await generateFiles({
    input: [OPENAPI_SPEC_URL],
    output: 'content/docs/primeflow/openapi',
    // Generate a page for each operation, grouped by tag
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
