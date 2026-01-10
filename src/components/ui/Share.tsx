'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from './Button';
import { useMiniApp } from '@neynar/react';
import { type ComposeCast } from "@farcaster/miniapp-sdk";
import { APP_URL } from '~/lib/constants';
import { useHaptics } from '~/hooks/useHaptics';

interface EmbedConfig {
  path?: string;
  url?: string;
  imageUrl?: () => Promise<string>;
}

interface CastConfig extends Omit<ComposeCast.Options, 'embeds'> {
  bestFriends?: boolean;
  embeds?: (string | EmbedConfig)[];
}

interface ShareButtonProps {
  buttonText: string;
  cast: CastConfig;
  className?: string;
  isLoading?: boolean;
}

export function ShareButton({ buttonText, cast, className = '', isLoading = false }: ShareButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bestFriends, setBestFriends] = useState<{ fid: number; username: string; }[] | null>(null);
  const [isLoadingBestFriends, setIsLoadingBestFriends] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { context, actions } = useMiniApp();
  const { triggerSelection, triggerNotification } = useHaptics();

  // Fetch best friends if needed
  useEffect(() => {
    if (cast.bestFriends && context?.user?.fid) {
      setIsLoadingBestFriends(true);
      fetch(`/api/best-friends?fid=${context.user.fid}`)
        .then(res => res.json())
        .then(data => setBestFriends(data.bestFriends))
        .catch(err => console.error('Failed to fetch best friends:', err))
        .finally(() => setIsLoadingBestFriends(false));
    }
  }, [cast.bestFriends, context?.user?.fid]);

  const handleShare = useCallback(async () => {
    try {
      setIsProcessing(true);
      setShareStatus('idle');
      triggerSelection(); // Haptic feedback on share button tap

      let finalText = cast.text || '';

      // Process best friends if enabled and data is loaded
      if (cast.bestFriends) {
        if (bestFriends) {
          // Replace @N with usernames, or remove if no matching friend
          finalText = finalText.replace(/@\d+/g, (match) => {
            const friendIndex = parseInt(match.slice(1)) - 1;
            const friend = bestFriends[friendIndex];
            if (friend) {
              return `@${friend.username}`;
            }
            return ''; // Remove @N if no matching friend
          });
        } else {
          // If bestFriends is not loaded but bestFriends is enabled, remove @N patterns
          finalText = finalText.replace(/@\d+/g, '');
        }
      }

      // Process embeds
      const processedEmbeds = await Promise.all(
        (cast.embeds || []).map(async (embed) => {
          if (typeof embed === 'string') {
            return embed;
          }
          if (embed.path) {
            const baseUrl = APP_URL || window.location.origin;
            const url = new URL(`${baseUrl}${embed.path}`);

            // Add UTM parameters
            url.searchParams.set('utm_source', `share-cast-${context?.user?.fid || 'unknown'}`);

            // If custom image generator is provided, use it
            if (embed.imageUrl) {
              const imageUrl = await embed.imageUrl();
              url.searchParams.set('share_image_url', imageUrl);
            }

            return url.toString();
          }
          return embed.url || '';
        })
      );

      // Open cast composer with all supported intents
      await actions.composeCast({
        text: finalText,
        embeds: processedEmbeds as [string] | [string, string] | undefined,
        parent: cast.parent,
        channelKey: cast.channelKey,
        close: cast.close,
      });
      
      // Success feedback
      setShareStatus('success');
      triggerNotification('success');
    } catch (error) {
      console.error('Failed to share:', error);
      setShareStatus('error');
      triggerNotification('error');
    } finally {
      setIsProcessing(false);
      // Reset status after animation
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  }, [cast, bestFriends, context?.user?.fid, actions, triggerSelection, triggerNotification]);

  const isSimple = className?.includes('bg-transparent') || className?.includes('flex items-center');
  
  if (isSimple) {
    // Render as simple text link - no button styling, just plain text
    return (
      <button
        onClick={handleShare}
        disabled={isLoading || isProcessing || isLoadingBestFriends}
        className="text-white text-base font-normal bg-transparent border-none shadow-none p-0 m-0 cursor-pointer hover:opacity-70 active:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity min-h-[44px] touch-manipulation focus:outline-none"
        aria-label={shareStatus === 'success' ? 'Successfully shared' : shareStatus === 'error' ? 'Share failed, click to try again' : 'Share this content'}
      >
        {isLoading || isProcessing ? (
          <span className="opacity-70">...</span>
        ) : shareStatus === 'success' ? (
          '✓ shared'
        ) : shareStatus === 'error' ? (
          'try again'
        ) : (
          buttonText
        )}
      </button>
    );
  }

  // Default: Use Button component for styled buttons
  return (
    <div className="relative">
      <Button
        onClick={handleShare}
        className={`${className} ${shareStatus === 'success' ? 'success-animation' : ''} ${shareStatus === 'error' ? 'error-animation' : ''}`}
        isLoading={isLoading || isProcessing}
        disabled={isLoadingBestFriends}
        data-principle-share
        aria-label={shareStatus === 'success' ? 'Successfully shared' : shareStatus === 'error' ? 'Share failed, click to try again' : 'Share this content'}
      >
        {shareStatus === 'success' ? '✓ Shared!' : shareStatus === 'error' ? 'Try Again' : buttonText}
      </Button>
      {shareStatus === 'error' && (
        <p className="text-xs text-red-400 mt-2 text-center" role="alert">
          Share failed. Please try again.
        </p>
      )}
    </div>
  );
}
