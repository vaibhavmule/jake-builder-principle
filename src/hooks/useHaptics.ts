"use client";

import { useMiniApp } from '@neynar/react';
import { useCallback } from 'react';
import { type Haptics } from '@farcaster/miniapp-sdk';

/**
 * Custom hook for centralized haptic feedback management.
 * 
 * Provides easy-to-use functions for triggering haptic feedback throughout the app.
 * All methods gracefully handle cases where haptics are not available.
 * 
 * Based on Farcaster Haptics SDK: https://miniapps.farcaster.xyz/docs/sdk/haptics
 * 
 * @example
 * ```tsx
 * const { triggerSelection, triggerImpact, triggerNotification } = useHaptics();
 * 
 * // On button tap
 * <button onClick={() => triggerSelection()}>Tap me</button>
 * 
 * // On swipe
 * triggerImpact('medium');
 * 
 * // On success
 * triggerNotification('success');
 * ```
 */
export function useHaptics() {
  const { haptics } = useMiniApp();
  
  /**
   * Triggers selection feedback - perfect for UI element selections.
   * Use for button taps, toggle switches, list item selections.
   */
  const triggerSelection = useCallback(async () => {
    try {
      await haptics.selectionChanged();
    } catch (e) {
      // Silently fail if haptics not available
      // This is expected on devices/clients that don't support haptics
    }
  }, [haptics]);
  
  /**
   * Triggers impact feedback - useful for simulating physical impacts.
   * 
   * @param type - Intensity and style: 'light', 'medium', 'heavy', 'soft', 'rigid'
   * - 'light': Minor interactions (hover states, light taps)
   * - 'medium': Card swipes, primary actions
   * - 'heavy': Significant actions (completing all principles)
   * - 'soft': Dampened, gentle impact
   * - 'rigid': Sharp, rigid impact
   */
  const triggerImpact = useCallback(async (
    type: Haptics.ImpactOccurredType = 'medium'
  ) => {
    try {
      await haptics.impactOccurred(type);
    } catch (e) {
      // Silently fail if haptics not available
    }
  }, [haptics]);
  
  /**
   * Triggers notification feedback - ideal for indicating task outcomes.
   * 
   * @param type - Notification type: 'success', 'warning', 'error'
   * - 'success': Successful operations (shares, tips, completions)
   * - 'warning': Warning or caution states
   * - 'error': Error or failure states
   */
  const triggerNotification = useCallback(async (
    type: 'success' | 'warning' | 'error' = 'success'
  ) => {
    try {
      await haptics.notificationOccurred(type);
    } catch (e) {
      // Silently fail if haptics not available
    }
  }, [haptics]);
  
  return {
    triggerSelection,
    triggerImpact,
    triggerNotification,
  };
}
