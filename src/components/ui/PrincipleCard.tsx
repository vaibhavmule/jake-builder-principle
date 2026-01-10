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
    <div className="flex items-center justify-center h-full w-full p-4">
      {/* Glassmorphic Card */}
      <div
        className="relative w-full max-w-sm h-[80vh] max-h-[700px] flex flex-col justify-between p-10 rounded-[30px]"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,1)'
        }}
      >
        {/* Header - Attribution link on left, progress on right */}
        <div className="flex items-start justify-between">
          <div>
            <a
              href="https://farcaster.xyz/jake/0x23e58327"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider uppercase font-mono text-[var(--fid-color)] hover:text-white transition-colors duration-300"
              style={{ letterSpacing: '1.5px' }}
            >
              Builder Principles (@Jake)
            </a>
          </div>
          <div className="text-right">
            <p
              className="text-xs text-[var(--fid-color)] tracking-wider"
              style={{ letterSpacing: '1px' }}
            >
              {currentIndex} / {total}
            </p>
          </div>
        </div>

        {/* Center - Main principle text */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <p
            className="text-center text-white leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              textShadow: '0 0 5px rgba(255,255,255,0.1)'
            }}
          >
            {principle.text}
          </p>
        </div>

        {/* Footer - Share button with glow */}
        <div className="flex justify-center">
          <div className="relative [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!shadow-none [&>button]:!p-0 [&>button]:!min-w-0">
            <ShareButton
              buttonText=""
              cast={{
                text: `"${principle.text}"\n\n#${principle.id} of 44 Builder Principles\n\nView all at:`,
                embeds: [shareUrl],
              }}
              className="!bg-transparent"
            />
            <button
              className="group flex items-center gap-2 text-white transition-all duration-300 cursor-pointer bg-transparent border-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                fontStyle: 'italic',
                textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                letterSpacing: '0px'
              }}
              onClick={() => {
                const shareBtn = document.querySelector('[data-principle-share]') as HTMLButtonElement;
                shareBtn?.click();
              }}
            >
              <Share2 className="w-6 h-6 transition-transform group-hover:rotate-12" />
              <span
                className="group-hover:tracking-wide transition-all"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)'
                }}
              >
                share
              </span>
            </button>
          </div>
        </div>

        {/* Hidden ShareButton for functionality */}
        <div className="hidden">
          <ShareButton
            buttonText=""
            cast={{
              text: `"${principle.text}"\n\n#${principle.id} of 44 Builder Principles\n\nView all at:`,
              embeds: [shareUrl],
            }}
            className="!bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
