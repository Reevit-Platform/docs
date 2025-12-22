import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, Instrument_Serif } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PostHogPageView, PostHogProvider } from '@/components/posthog-provider';

const inter = Inter({
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reevit Documentation | Unified Payment Orchestration",
  description: "Learn how to integrate Reevit's unified payment API, automate subscriptions, and manage failover between African payment providers.",
  openGraph: {
    title: "Reevit Documentation | Unified Payment Orchestration",
    description: "Learn how to integrate Reevit's unified payment API across African markets.",
    url: "https://docs.reevit.io",
    siteName: "Reevit Docs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reevit Documentation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reevit Documentation | Unified Payment Orchestration",
    description: "Learn how to integrate Reevit's unified payment API across African markets.",
    images: ["/og-image.png"],
    creator: "@reevit_io",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <RootProvider>{children}</RootProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
