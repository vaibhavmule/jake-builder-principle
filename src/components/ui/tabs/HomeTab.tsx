"use client";

import { SwipeableCards } from '../SwipeableCards';

/**
 * HomeTab component displays swipeable builder principle cards in fullscreen.
 *
 * Ultra-minimal design with no header, no footer, just fullscreen cards.
 *
 * @example
 * ```tsx
 * <HomeTab />
 * ```
 */
export function HomeTab() {
  return (
    <div className="h-full">
      <SwipeableCards />
    </div>
  );
} 