'use client';

import { BuilderPrinciple } from '~/lib/principles';
import { ShareButton } from './Share';
import { APP_URL } from '~/lib/constants';
import { Share2 } from 'lucide-react';

interface PrincipleCardProps {
  principle: BuilderPrinciple;
  currentIndex: number;
  total: number;
}

export function PrincipleCard({ principle, currentIndex, total }: PrincipleCardProps) {
  // Share link for this specific principle
  const shareUrl = `${APP_URL}/share/${principle.id}`;

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex flex-col justify-between p-8 md:p-12 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Floating share button - top right */}
      <div className="absolute top-6 right-6 z-10">
        <div className="group w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 backdrop-blur-md border border-purple-100 dark:border-purple-800 [&>button]:w-full [&>button]:h-full [&>button]:rounded-full [&>button]:bg-transparent [&>button]:hover:bg-transparent [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:p-0 [&>button]:min-w-0">
          <ShareButton
            buttonText=""
            cast={{
              text: `"${principle.text}"\n\n#${principle.id} of 44 Builder Principles\n\nView all at:`,
              embeds: [shareUrl],
            }}
            className="!bg-transparent !hover:bg-transparent !shadow-none !border-none !p-0"
          />
          <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400 absolute pointer-events-none group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>

      {/* Principle number badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 backdrop-blur-sm border border-purple-200 dark:border-purple-700">
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            #{principle.id}
          </span>
        </div>
      </div>

      {/* Centered principle text */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl lg:text-4xl text-center leading-relaxed font-medium text-gray-800 dark:text-gray-100 drop-shadow-sm">
            {principle.text}
          </p>
        </div>
      </div>

      {/* Progress at bottom */}
      <div className="relative text-center pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i < Math.floor((currentIndex / total) * 10)
                    ? 'bg-purple-500 dark:bg-purple-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {currentIndex} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
