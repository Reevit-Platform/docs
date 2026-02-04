import { createOpenAPI } from 'fumadocs-openapi/server';

// Replace this with your production OpenAPI spec URL
// e.g., 'https://api.reevit.io/openapi.yaml' or 'https://api.reevit.io/v1/openapi'
export const OPENAPI_DOCUMENT_URL = 'https://api.reevit.io/openapi.yaml';

// Create OpenAPI server instance
// This allows customization of the APIPage component behavior
export const openapi = createOpenAPI({
  // Add any default options here
});












