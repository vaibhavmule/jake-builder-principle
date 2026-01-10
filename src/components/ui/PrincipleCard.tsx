'use client';

import { BuilderPrinciple } from '~/lib/principles';
import { ShareButton } from './Share';
import { APP_URL } from '~/lib/constants';
import { TipButtonWithModal } from './wallet/TipButtonWithModal';

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
        className="relative w-full max-w-sm h-[80vh] max-h-[700px] flex flex-col justify-between p-6 md:p-10 rounded-[30px]"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,1)'
        }}
      >
        {/* Header - Title and attribution on left, progress on right */}
        <div className="flex items-start justify-between w-full gap-2 min-w-0">
          <a
            href="https://farcaster.xyz/jake/0x23e58327"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] sm:text-xs tracking-wider uppercase font-mono text-[var(--fid-color)] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 py-1 touch-manipulation min-w-0 flex-wrap max-w-[calc(100%-4rem)]"
            style={{ letterSpacing: '1.2px' }}
          >
            <span>Principles for Building in Crypto</span>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/20 flex-shrink-0"
              style={{ backgroundColor: '#0000FF' }}
              aria-label="Jake"
            />
            <span className="flex-shrink-0">@Jake</span>
          </a>
          <span className="text-[10px] sm:text-xs text-[var(--fid-color)] tracking-wider whitespace-nowrap flex-shrink-0" style={{ letterSpacing: '1px' }}>
            {currentIndex} / {total}
          </span>
        </div>

        {/* Center - Main principle text */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <p
            className="text-center text-white leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: 600,
              textShadow: '0 0 5px rgba(255,255,255,0.1)',
              lineHeight: '1.6'
            }}
          >
            {principle.text}
          </p>
        </div>

        {/* Footer - Simple text links */}
        <div className="flex justify-center items-center gap-8">
          <ShareButton
            buttonText="share"
            cast={{
              text: `"${principle.text}"\n\n#${principle.id} of 44 Principles for Building in Crypto\n\nView all at:`,
              embeds: [shareUrl],
            }}
            className="flex items-center bg-transparent border-none shadow-none"
          />
          <TipButtonWithModal
            recipientFid={1356870}
            recipientAddress="0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad"
            buttonText="tip"
            className="flex items-center bg-transparent border-none shadow-none"
          />
        </div>
      </div>
    </div>
  );
}
