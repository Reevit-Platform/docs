# Reevit Docs

This repository contains the Reevit documentation site, built with Next.js + Fumadocs.

## Local development

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Project layout

- `content/`: MDX documentation content.
- `app/`: Next.js app routes and layouts.
- `lib/source.ts`: Content source adapter (`loader()`), used by Fumadocs to access docs content.
- `source.config.ts`: Fumadocs MDX configuration.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev)
