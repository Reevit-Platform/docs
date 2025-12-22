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
    href: "/docs/reevit/api-reference",
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
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bg: string;
}) {
  return (
    <a href={href} className="group block h-full">
      <div className="glass-card relative h-full overflow-hidden p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/4">
        <div className="flex flex-col gap-4">
          {/* Icon */}
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110", bg)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3
              className={cn(
                spaceGrotesk.className,
                "text-xl font-semibold text-white transition-colors group-hover:text-fd-primary"
              )}
            >
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50 group-hover:text-white/70">
              {description}
            </p>
          </div>

          {/* Learn More link */}
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-fd-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            Learn more
            <ArrowRight className="h-3.5 w-3.5" />
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
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-white/60 uppercase">
          <span className="size-2 animate-pulse rounded-full bg-fd-primary" />
          Documentation
        </div>

        {/* Title */}
        <h1
          className={cn(
            spaceGrotesk.className,
            "text-5xl font-bold tracking-tight text-white md:text-7xl"
          )}
        >
          Reevit <span className="text-white/40">Docs</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
          Everything you need to integrate unified payments, billing, and orchestration for African
          businesses.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/docs/reevit"
            className="flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-gray-200"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
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
      <div className="relative z-10 mt-auto flex w-full flex-wrap items-center justify-center gap-8 border-t border-white/5 bg-black/20 py-12 text-sm font-medium">
        <a href="https://reevit.io" className="text-white/40 transition-colors hover:text-white">
          reevit.io
        </a>
        <a href="/docs/reevit/changelog" className="text-white/40 transition-colors hover:text-white">
          Changelog
        </a>
        <a
          href="https://github.com/reevitinc/docs"
          className="text-white/40 transition-colors hover:text-white"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
