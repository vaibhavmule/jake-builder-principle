'use client';

import { ShareButton } from './Share';
import { Share2, Heart } from 'lucide-react';
import { TipButtonWithModal } from './wallet/TipButtonWithModal';
import { APP_URL } from '~/lib/constants';

interface EndCardProps {
  onRestart: () => void;
}

export function EndCard({ onRestart }: EndCardProps) {
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
        {/* Header - Back to #1 button */}
        <div className="flex justify-end">
          <button
            onClick={onRestart}
            className="text-xs text-[var(--fid-color)] hover:text-white transition-colors duration-300 uppercase tracking-wider font-mono"
            style={{ letterSpacing: '1px' }}
          >
            ← Back to #1
          </button>
        </div>

        {/* Center - Main content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
          {/* Large Jake avatar */}
          <div
            className="w-16 h-16 rounded-full border-2 border-white/30"
            style={{ backgroundColor: '#0000FF' }}
            aria-label="Jake"
          />

          {/* Thank you message */}
          <h2
            className="text-center text-white leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              fontWeight: 600,
              textShadow: '0 0 5px rgba(255,255,255,0.1)'
            }}
          >
            You've read all 44 principles
          </h2>

          {/* Subheading */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--fid-color)]">Builder principles by</span>
            <div
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: '#0000FF' }}
              aria-label="Jake"
            />
            <span className="text-sm text-[var(--fid-color)]">@Jake</span>
          </div>

          {/* CTA Button */}
          <a
            href="https://farcaster.xyz/jake/0x23e58327"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}
          >
            View Original Post →
          </a>
        </div>

        {/* Footer - Share and Tip buttons */}
        <div className="flex justify-center items-center gap-8">
          {/* Share button */}
          <div className="relative [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!shadow-none [&>button]:!p-0 [&>button]:!min-w-0">
            <ShareButton
              buttonText=""
              cast={{
                text: "I just read all 44 Builder Principles by @Jake\n\nView them all at:",
                embeds: [APP_URL],
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

          {/* Tip button */}
          <div className="relative [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!shadow-none [&>button]:!p-0 [&>button]:!min-w-0">
            <TipButtonWithModal
              recipientFid={1356870}
              recipientAddress="0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad"
              buttonText=""
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
                const tipBtn = document.querySelector('[data-tip]') as HTMLButtonElement;
                tipBtn?.click();
              }}
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
              text: "I just read all 44 Builder Principles by @Jake\n\nView them all at:",
              embeds: [APP_URL],
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
