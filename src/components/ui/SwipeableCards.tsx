'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { principles } from '~/lib/principles';
import { PrincipleCard } from './PrincipleCard';
import { EndCard } from './EndCard';
import { useHaptics } from '~/hooks/useHaptics';

const SWIPE_THRESHOLD = 100; // pixels
const VELOCITY_THRESHOLD = 0.5; // pixels/ms

type SwipeDirection = 'left' | 'right' | null;

export function SwipeableCards() {
  const searchParams = useSearchParams();
  const principleParam = searchParams.get('principle');
  const { triggerImpact, triggerSelection } = useHaptics();

  // Initialize with URL parameter if present
  const initialIndex = principleParam
    ? Math.max(0, Math.min(parseInt(principleParam) - 1, principles.length - 1))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);

  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const touchVelocity = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle URL parameter changes
  useEffect(() => {
    if (principleParam) {
      const index = Math.max(0, Math.min(parseInt(principleParam) - 1, principles.length - 1));
      setCurrentIndex(index);
    }
  }, [principleParam]);

  const handleNavigate = useCallback((direction: 'next' | 'prev', source: 'swipe' | 'tap' | 'keyboard' = 'swipe') => {
    if (isAnimating) return;

    if (direction === 'next' && currentIndex < principles.length) {
      setIsAnimating(true);
      setSwipeDirection('left');

      // Trigger haptics based on source
      if (source === 'swipe') {
        // Check if this is the final card (completing all principles)
        if (currentIndex === principles.length - 1) {
          triggerImpact('heavy'); // Heavy haptic for completing all principles
        } else {
          triggerImpact('medium'); // Medium haptic for card swipes
        }
      } else if (source === 'tap' || source === 'keyboard') {
        triggerImpact('light'); // Light haptic for tap/keyboard navigation
      }

      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 300);
    } else if (direction === 'prev' && currentIndex > 0) {
      setIsAnimating(true);
      setSwipeDirection('right');

      // Light haptic for going back
      if (source === 'swipe') {
        triggerImpact('medium');
      } else {
        triggerImpact('light');
      }

      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentIndex, isAnimating, triggerImpact]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleNavigate('prev', 'keyboard');
        triggerSelection(); // Selection haptic for keyboard navigation
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next', 'keyboard');
        triggerSelection(); // Selection haptic for keyboard navigation
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate, triggerSelection]);


  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;

    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartX.current;
    const timeDelta = Date.now() - touchStartTime.current;
    
    // Calculate velocity for smoother animations
    if (timeDelta > 0) {
      touchVelocity.current = Math.abs(offset / timeDelta);
    }

    // Prevent swiping beyond boundaries with spring resistance
    if ((currentIndex === 0 && offset > 0) ||
        (currentIndex === principles.length && offset < 0)) {
      setSwipeOffset(offset * 0.2); // Reduced resistance at boundaries
    } else {
      setSwipeOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    const distance = Math.abs(swipeOffset);
    const duration = Date.now() - touchStartTime.current;
    const velocity = distance / Math.max(duration, 1); // Avoid division by zero

    // Check if swipe threshold is met (consider both distance and velocity)
    // Higher velocity allows for smaller distance to trigger swipe
    const effectiveThreshold = velocity > VELOCITY_THRESHOLD 
      ? SWIPE_THRESHOLD * 0.6 // Lower threshold for fast swipes
      : SWIPE_THRESHOLD;

    if (distance > effectiveThreshold || velocity > VELOCITY_THRESHOLD) {
      if (swipeOffset < 0 && currentIndex < principles.length) {
        // Swipe left - next principle (or end card)
        handleNavigate('next', 'swipe');
      } else if (swipeOffset > 0 && currentIndex > 0) {
        // Swipe right - previous principle
        handleNavigate('prev', 'swipe');
      } else {
        // At boundary, spring back with light haptic
        triggerImpact('light');
        setSwipeOffset(0);
      }
    } else {
      // Didn't meet threshold, spring back
      setSwipeOffset(0);
    }

    // Reset swipe offset and velocity
    setTimeout(() => {
      setSwipeOffset(0);
      touchVelocity.current = 0;
    }, 50);
  };

  const currentPrinciple = principles[currentIndex];

  const handleRestart = useCallback(() => {
    setIsAnimating(true);
    setSwipeDirection('right');
    triggerImpact('heavy'); // Heavy haptic for restart action

    setTimeout(() => {
      setCurrentIndex(0);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [triggerImpact]);

  const handleTapNavigation = (e: React.MouseEvent) => {
    if (isAnimating) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const cardWidth = rect.width;

    // Left 40% goes back, right 40% goes forward, middle 20% does nothing
    if (clickX < cardWidth * 0.4) {
      handleNavigate('prev', 'tap');
      triggerSelection(); // Selection haptic for tap navigation
    } else if (clickX > cardWidth * 0.6) {
      handleNavigate('next', 'tap');
      triggerSelection(); // Selection haptic for tap navigation
    }
  };

  return (
    <div className="h-full flex flex-col" role="region" aria-label="Swipeable principle cards">
      {/* Card container - fullscreen */}
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={cardRef}
          className="w-full h-full transition-transform duration-300 ease-out cursor-pointer touch-none"
          style={{
            transform: `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.02}deg) scale(${1 - Math.abs(swipeOffset) / 1200})`,
            opacity: isAnimating ? 0 : Math.max(0.6, 1 - Math.abs(swipeOffset) / 500),
            transition: isAnimating 
              ? 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease-out'
              : 'none',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleTapNavigation}
          role="article"
          aria-label={`Principle ${currentIndex + 1} of ${principles.length}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              handleNavigate('prev', 'keyboard');
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              handleNavigate('next', 'keyboard');
            }
          }}
        >
          <div
            className={`h-full transition-opacity duration-300 ${
              swipeDirection === 'left' ? 'animate-[slideOutLeft_300ms_ease-out]' :
              swipeDirection === 'right' ? 'animate-[slideOutRight_300ms_ease-out]' : ''
            }`}
          >
            {currentIndex < principles.length ? (
              <PrincipleCard
                principle={currentPrinciple}
                currentIndex={currentIndex + 1}
                total={principles.length}
              />
            ) : (
              <EndCard onRestart={handleRestart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
