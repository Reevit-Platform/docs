import React from 'react';

export function WorkflowBuilderIllustration({ className }: { className?: string }) {
  return (
    <div className={`w-full p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Grid Background */}
        <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-zinc-200 dark:fill-zinc-800" />
        </pattern>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* Connection Lines */}
        <path d="M200 200 H300" stroke="currentColor" className="text-zinc-300 dark:text-zinc-600" strokeWidth="2" />
        <path d="M480 200 H550" stroke="currentColor" className="text-zinc-300 dark:text-zinc-600" strokeWidth="2" />
        <path d="M480 200 C515 200 515 120 550 120" stroke="currentColor" className="text-zinc-300 dark:text-zinc-600" strokeWidth="2" />
        <path d="M480 200 C515 200 515 280 550 280" stroke="currentColor" className="text-zinc-300 dark:text-zinc-600" strokeWidth="2" />

        {/* Trigger Node: Payment Succeeded */}
        <g transform="translate(50, 160)">
          <rect width="150" height="80" rx="12" className="fill-white dark:fill-zinc-900 stroke-violet-500 stroke-2 shadow-sm" />
          <circle cx="25" cy="25" r="4" className="fill-violet-500" />
          <text x="40" y="30" className="fill-zinc-900 dark:fill-zinc-100 text-xs font-semibold font-mono">Trigger</text>
          <text x="25" y="55" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Payment Success</text>
        </g>

        {/* Condition Node */}
        <g transform="translate(300, 160)">
          <rect width="180" height="80" rx="12" className="fill-white dark:fill-zinc-900 stroke-amber-500 stroke-2 shadow-sm" />
          <path d="M25 25 L35 35 M35 25 L25 35" stroke="currentColor" className="text-amber-500" strokeWidth="2" />
          <text x="40" y="30" className="fill-zinc-900 dark:fill-zinc-100 text-xs font-semibold font-mono">Condition</text>
          <text x="25" y="55" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Amount &gt; $100</text>
        </g>

        {/* Action Node 1: Send Email */}
        <g transform="translate(550, 80)">
          <rect width="160" height="80" rx="12" className="fill-white dark:fill-zinc-900 stroke-blue-500 stroke-2 shadow-sm" />
          <rect x="20" y="20" width="14" height="10" rx="1" className="stroke-blue-500 fill-none" strokeWidth="1.5" />
          <text x="45" y="30" className="fill-zinc-900 dark:fill-zinc-100 text-xs font-semibold font-mono">Action</text>
          <text x="25" y="55" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Send Receipt</text>
        </g>

        {/* Action Node 2: Slack Alert */}
        <g transform="translate(550, 240)">
          <rect width="160" height="80" rx="12" className="fill-white dark:fill-zinc-900 stroke-emerald-500 stroke-2 shadow-sm" />
          <path d="M22 28 L28 22 M22 22 L28 28" stroke="currentColor" className="text-emerald-500" strokeWidth="1.5" />
          <text x="45" y="30" className="fill-zinc-900 dark:fill-zinc-100 text-xs font-semibold font-mono">Action</text>
          <text x="25" y="55" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Notify Team</text>
        </g>

      </svg>
    </div>
  );
}

