'use client';

import { ShareButton } from './Share';
import { TipButtonWithModal } from './wallet/TipButtonWithModal';
import { APP_URL } from '~/lib/constants';
import { useHaptics } from '~/hooks/useHaptics';

interface EndCardProps {
  onRestart: () => void;
}

export function EndCard({ onRestart }: EndCardProps) {
  const { triggerSelection } = useHaptics();

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
            onClick={() => {
              triggerSelection();
              onRestart();
            }}
            className="text-xs text-[var(--fid-color)] hover:text-white transition-colors duration-300 uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 min-h-[44px] touch-manipulation active:scale-95"
            style={{ letterSpacing: '1px' }}
            aria-label="Restart from first principle"
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
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 600,
              textShadow: '0 0 5px rgba(255,255,255,0.1)',
              lineHeight: '1.4'
            }}
          >
            principles for building in crypto
          </h2>

          {/* Subheading */}
          <div>
            <span className="text-sm text-[var(--fid-color)]">@jake</span>
          </div>

          {/* CTA Button */}
          <a
            href="https://farcaster.xyz/jake/0x23e58327"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent inline-flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}
            aria-label="View original post by Jake"
          >
            View Original Post →
          </a>
        </div>

        {/* Footer - Simple Share and Tip buttons */}
        <div className="flex justify-center items-center gap-8">
          <ShareButton
            buttonText="share"
            cast={{
              text: "I just read all 44 Principles for Building in Crypto by @Jake\n\nView them all at:",
              embeds: [APP_URL],
            }}
            className="flex items-center gap-2 text-white text-base bg-transparent border-none shadow-none hover:opacity-70 active:opacity-50 min-h-[44px] touch-manipulation focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2"
          />
          <TipButtonWithModal
            recipientFid={1356870}
            recipientAddress="0xFFe16898FC0af80ee9BCF29D2B54a0F20F9498ad"
            buttonText="tip"
            className="flex items-center gap-2 text-white text-base bg-transparent border-none shadow-none hover:opacity-70 active:opacity-50 min-h-[44px] touch-manipulation focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2"
          />
        </div>
      </div>
    </div>
  );
}
