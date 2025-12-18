import React from 'react';

export function WorkflowLogicIllustration({ className }: { className?: string }) {
  return (
    <div className={`w-full p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <svg viewBox="0 0 800 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Timeline Line */}
        <line x1="50" y1="125" x2="750" y2="125" stroke="currentColor" className="text-zinc-200 dark:text-zinc-700" strokeWidth="4" />
        
        {/* Step 1: Trigger */}
        <g transform="translate(100, 85)">
          <circle cx="40" cy="40" r="30" className="fill-white dark:fill-zinc-900 stroke-violet-500 stroke-2" />
          <text x="40" y="45" textAnchor="middle" className="fill-violet-500 text-lg font-bold">1</text>
          <text x="40" y="90" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Trigger</text>
        </g>

        {/* Step 2: Logic */}
        <g transform="translate(300, 85)">
          <rect x="10" y="10" width="60" height="60" transform="rotate(45 40 40)" className="fill-white dark:fill-zinc-900 stroke-amber-500 stroke-2" />
          <text x="40" y="45" textAnchor="middle" className="fill-amber-500 text-lg font-bold">?</text>
          <text x="40" y="110" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Conditions</text>
        </g>

        {/* Step 3: Action */}
        <g transform="translate(500, 85)">
          <rect x="10" y="10" width="60" height="60" rx="10" className="fill-white dark:fill-zinc-900 stroke-blue-500 stroke-2" />
          <path d="M30 40 L40 50 L50 30" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="40" y="90" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Action</text>
        </g>

        {/* Step 4: Logs */}
        <g transform="translate(700, 85)">
          <path d="M10 10 H70 V70 H10 Z" className="fill-white dark:fill-zinc-900 stroke-zinc-400 stroke-2" />
          <line x1="25" y1="30" x2="55" y2="30" stroke="currentColor" className="text-zinc-400" strokeWidth="2" />
          <line x1="25" y1="45" x2="55" y2="45" stroke="currentColor" className="text-zinc-400" strokeWidth="2" />
          <text x="40" y="90" textAnchor="middle" className="fill-zinc-600 dark:fill-zinc-400 text-sm font-medium">Logs</text>
        </g>
      </svg>
    </div>
  );
}

