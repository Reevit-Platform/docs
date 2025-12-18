'use client';

import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export function DocsSwitcher() {
  return (
    <div className={cn('flex items-center gap-2', spaceGrotesk.className)}>
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-white">
                      <div className="size-5">
          <CreditCard className="w-5 h-5" />
                      </div>
                      <h1 className="mb-1 text-xl font-semibold tracking-tight">
          prime<span className="font-normal">flow</span>
                      </h1>
                    </div>
    </div>
  );
}