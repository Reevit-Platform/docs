import { ReactNode } from "react";
import { ArrowRight, BookOpen, Code2, CreditCard, Route, Webhook, Zap } from "lucide-react";
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
  },
  {
    title: "Payments",
    description: "Accept payments via cards, MoMo, and bank transfers",
    icon: CreditCard,
    href: "/docs/reevit/payments",
  },
  {
    title: "Smart Routing",
    description: "Configure failover rules and optimize success rates",
    icon: Route,
    href: "/docs/reevit/routing",
  },
  {
    title: "Webhooks",
    description: "Receive unified event notifications across all PSPs",
    icon: Webhook,
    href: "/docs/reevit/webhooks",
  },
  {
    title: "SDKs & Libraries",
    description: "Official client libraries for TypeScript, Python, Go, PHP",
    icon: Code2,
    href: "/docs/reevit/sdks",
  },
  {
    title: "API Reference",
    description: "Complete REST API documentation and examples",
    icon: BookOpen,
    href: "/docs/reevit/api-reference",
  },
];

function DocCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <a href={href} className="group block">
      <div className="relative h-full rounded-xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-fd-primary/30 hover:bg-card">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fd-primary/10">
            <Icon className="h-5 w-5 text-fd-primary" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3
              className={cn(
                spaceGrotesk.className,
                "font-semibold text-foreground transition-colors group-hover:text-fd-primary"
              )}
            >
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Arrow */}
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-fd-primary group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        {/* Badge */}
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Documentation
        </p>

        {/* Title */}
        <h1
          className={cn(
            spaceGrotesk.className,
            "text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          )}
        >
          Reevit Docs
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Everything you need to integrate unified payments, billing, and orchestration for African
          businesses.
        </p>

        {/* CTA */}
        <a
          href="/docs/reevit"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-fd-primary px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-fd-primary/90"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Documentation grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {DOC_CATEGORIES.map((category) => (
          <DocCard key={category.title} {...category} />
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-border/50 pt-8 text-sm text-muted-foreground">
        <a href="https://reevit.io" className="transition-colors hover:text-foreground">
          reevit.io
        </a>
        <span className="text-border">•</span>
        <a href="/docs/reevit/changelog" className="transition-colors hover:text-foreground">
          Changelog
        </a>
        <span className="text-border">•</span>
        <a
          href="https://github.com/reevitinc/docs"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
