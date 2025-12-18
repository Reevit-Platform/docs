import React from 'react';

export function IntegrationGridIllustration({ className }: { className?: string }) {
  return (
    <div className={`w-full p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="800" y2="0">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central Hub */}
        <circle cx="400" cy="100" r="40" className="fill-white dark:fill-zinc-900 stroke-violet-500 stroke-2" />
        <path d="M385 100 L395 110 L415 90" stroke="currentColor" className="text-violet-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Connecting Lines */}
        <path d="M280 100 H360" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M440 100 H520" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M320 50 L370 80" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M430 80 L480 50" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M320 150 L370 120" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M430 120 L480 150" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Provider Icons (Simplified) */}
        {/* Left Side */}
        <g transform="translate(200, 80)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-blue-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-blue-500 text-[10px] font-bold">Stripe</text>
        </g>
        <g transform="translate(260, 30)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-sky-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-sky-500 text-[10px] font-bold">PayPal</text>
        </g>
        <g transform="translate(260, 130)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-green-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-green-500 text-[10px] font-bold">M-Pesa</text>
        </g>

        {/* Right Side */}
        <g transform="translate(560, 80)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-pink-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-pink-500 text-[10px] font-bold">Slack</text>
        </g>
        <g transform="translate(500, 30)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-orange-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-orange-500 text-[10px] font-bold">Email</text>
        </g>
        <g transform="translate(500, 130)">
          <rect width="40" height="40" rx="8" className="fill-white dark:fill-zinc-900 stroke-indigo-500" />
          <text x="20" y="25" textAnchor="middle" className="fill-indigo-500 text-[10px] font-bold">Teams</text>
        </g>
      </svg>
    </div>
  );
}

