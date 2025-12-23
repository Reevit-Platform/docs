import { ReactNode } from "react";
import {
  ArrowRight02Icon as ArrowRight,
  BookOpen01Icon as BookOpen,
  CodeIcon as Code2,
  CreditCardIcon as CreditCard,
  FlashIcon as Zap,
  Route01Icon as Route,
  WebhookIcon as Webhook,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

// Documentation categories
const DOC_CATEGORIES = [
  {
    title: "Getting Started",
    description: "Quick setup guide to get Reevit running in minutes",
    icon: Zap,
    href: "/docs/reevit",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Payments",
    description: "Accept payments via cards, MoMo, and bank transfers",
    icon: CreditCard,
    href: "/docs/reevit/payments",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Smart Routing",
    description: "Configure failover rules and optimize success rates",
    icon: Route,
    href: "/docs/reevit/routing",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Webhooks",
    description: "Receive unified event notifications across all PSPs",
    icon: Webhook,
    href: "/docs/reevit/webhooks",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "SDKs & Libraries",
    description: "Official client libraries for TypeScript, Python, Go, PHP",
    icon: Code2,
    href: "/docs/reevit/sdks",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "API Reference",
    description: "Complete REST API documentation and examples",
    icon: BookOpen,
    href: "/api-reference",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

function DocCard({
  title,
  description,
  icon: Icon,
  href,
  color,
  bg,
}: {
  title: string;
  description: string;
  icon: IconSvgElement;
  href: string;
  color: string;
  bg: string;
}) {
  return (
    <a href={href} className="group block h-full">
      <div className="bg-card border relative h-full overflow-hidden p-6 transition-all duration-300 border-input rounded-md">
        <div className="flex flex-col gap-4">
          {/* Icon */}
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110", bg)}>
            <HugeiconsIcon icon={Icon} className={cn("h-6 w-6", color)} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3
              className={cn(
                spaceGrotesk.className,
                "text-xl font-semibold text-foreground transition-colors group-hover:text-fd-primary"
              )}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground">
              {description}
            </p>
          </div>

          {/* Learn More link */}
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-fd-primary transition-all duration-300 group-hover:translate-x-1">
            Learn more
            <HugeiconsIcon icon={ArrowRight} className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="bg-grid-pattern mask-image-gradient absolute inset-0 opacity-[0.3]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-24 pb-16 text-center md:pt-32 md:pb-24">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          <span className="size-2 animate-pulse rounded-full bg-fd-primary" />
          Documentation
        </div>

        {/* Title */}
        <h1
          className={cn(
            spaceGrotesk.className,
            "text-5xl font-bold tracking-tight text-foreground md:text-7xl"
          )}
        >
          Reevit <span className="text-muted-foreground/40">Docs</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Everything you need to integrate unified payments, billing, and orchestration for African
          businesses.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/docs/reevit"
            className="flex h-12 items-center gap-2 rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-all hover:opacity-90"
          >
            Get Started
            <HugeiconsIcon icon={ArrowRight} className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Documentation grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_CATEGORIES.map((category) => (
            <DocCard key={category.title} {...category} />
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="relative z-10 mt-auto flex w-full flex-wrap items-center justify-center gap-8 border-t border-border bg-muted/30 py-12 text-sm font-medium">
        <a href="https://reevit.io" className="text-muted-foreground transition-colors hover:text-foreground">
          reevit.io
        </a>
        <a href="/docs/reevit/changelog" className="text-muted-foreground transition-colors hover:text-foreground">
          Changelog
        </a>
        <a
          href="https://github.com/reevitinc/docs"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
