'use client';

import { BuilderPrinciple } from '~/lib/principles';
import { ShareButton } from './Share';
import { APP_URL } from '~/lib/constants';
import { Share2, Heart } from 'lucide-react';
import { TipButtonWithModal } from './wallet/TipButtonWithModal';
import { useHaptics } from '~/hooks/useHaptics';

interface PrincipleCardProps {
  principle: BuilderPrinciple;
  currentIndex: number;
  total: number;
}

export function PrincipleCard({ principle, currentIndex, total }: PrincipleCardProps) {
  const { triggerSelection } = useHaptics();
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
        <div className="flex items-center justify-between flex-nowrap">
          <a
            href="https://farcaster.xyz/jake/0x23e58327"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-wider uppercase font-mono text-[var(--fid-color)] hover:text-white transition-colors duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 min-h-[44px] touch-manipulation"
            style={{ letterSpacing: '1.5px' }}
            onClick={() => triggerSelection()}
          >
            <span>Builder Principles</span>
            <div
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: '#0000FF' }}
              aria-label="Jake"
            />
            <span>@Jake</span>
          </a>
          <p
            className="text-xs text-[var(--fid-color)] tracking-wider whitespace-nowrap ml-4"
            style={{ letterSpacing: '1px' }}
          >
            {currentIndex} / {total}
          </p>
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

        {/* Footer - Share and Tip buttons with glow */}
        <div className="flex justify-center items-center gap-8">
          {/* Share button */}
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
              className="group flex items-center gap-2 text-white transition-all duration-300 cursor-pointer bg-transparent border-none active:scale-95 min-h-[44px] min-w-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                fontStyle: 'italic',
                textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                letterSpacing: '0px'
              }}
              onClick={() => {
                triggerSelection();
                const shareBtn = document.querySelector('[data-principle-share]') as HTMLButtonElement;
                shareBtn?.click();
              }}
              aria-label="Share this principle"
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

          {/* Tip button */}
          <div className="relative [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!shadow-none [&>button]:!p-0 [&>button]:!min-w-0">
            <TipButtonWithModal
              recipientFid={1356870}
              recipientAddress="0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad"
              buttonText=""
              className="!bg-transparent"
            />
            <button
              className="group flex items-center gap-2 text-white transition-all duration-300 cursor-pointer bg-transparent border-none active:scale-95 min-h-[44px] min-w-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                fontStyle: 'italic',
                textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                letterSpacing: '0px'
              }}
              onClick={() => {
                triggerSelection();
                const tipBtn = document.querySelector('[data-tip]') as HTMLButtonElement;
                tipBtn?.click();
              }}
              aria-label="Tip the creator"
            >
              <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span
                className="group-hover:tracking-wide transition-all"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)'
                }}
              >
                tip
              </span>
            </button>
          </div>
        </div>

        {/* Hidden buttons for functionality */}
        <div className="hidden">
          <ShareButton
            buttonText=""
            cast={{
              text: `"${principle.text}"\n\n#${principle.id} of 44 Builder Principles\n\nView all at:`,
              embeds: [shareUrl],
            }}
            className="!bg-transparent"
          />
          <TipButtonWithModal
            recipientFid={1356870}
            recipientAddress="0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad"
            buttonText=""
            className="!bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
