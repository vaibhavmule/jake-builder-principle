'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { principles } from '~/lib/principles';
import { PrincipleCard } from './PrincipleCard';

const SWIPE_THRESHOLD = 100; // pixels
const VELOCITY_THRESHOLD = 0.5; // pixels/ms

type SwipeDirection = 'left' | 'right' | null;

export function SwipeableCards() {
  const searchParams = useSearchParams();
  const principleParam = searchParams.get('principle');

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
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle URL parameter changes
  useEffect(() => {
    if (principleParam) {
      const index = Math.max(0, Math.min(parseInt(principleParam) - 1, principles.length - 1));
      setCurrentIndex(index);
    }
  }, [principleParam]);

  const handleNavigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;

    if (direction === 'next' && currentIndex < principles.length - 1) {
      setIsAnimating(true);
      setSwipeDirection('left');

      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 300);
    } else if (direction === 'prev' && currentIndex > 0) {
      setIsAnimating(true);
      setSwipeDirection('right');

      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentIndex, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate]);


  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;

    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartX.current;

    // Prevent swiping beyond boundaries
    if ((currentIndex === 0 && offset > 0) ||
        (currentIndex === principles.length - 1 && offset < 0)) {
      setSwipeOffset(offset * 0.2); // Reduced resistance at boundaries
    } else {
      setSwipeOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    const distance = Math.abs(swipeOffset);
    const duration = Date.now() - touchStartTime.current;
    const velocity = distance / duration;

    // Check if swipe threshold is met
    if (distance > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      if (swipeOffset < 0 && currentIndex < principles.length - 1) {
        // Swipe left - next principle
        handleNavigate('next');
      } else if (swipeOffset > 0 && currentIndex > 0) {
        // Swipe right - previous principle
        handleNavigate('prev');
      } else {
        // At boundary, spring back
        setSwipeOffset(0);
      }
    } else {
      // Didn't meet threshold, spring back
      setSwipeOffset(0);
    }

    // Reset swipe offset
    setTimeout(() => setSwipeOffset(0), 50);
  };

  const currentPrinciple = principles[currentIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Card container - fullscreen */}
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={cardRef}
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.02}deg)`,
            opacity: isAnimating ? 0 : Math.max(0.5, 1 - Math.abs(swipeOffset) / 400),
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`h-full transition-opacity duration-300 ${
              swipeDirection === 'left' ? 'animate-[slideOutLeft_300ms_ease-out]' :
              swipeDirection === 'right' ? 'animate-[slideOutRight_300ms_ease-out]' : ''
            }`}
          >
            <PrincipleCard
              principle={currentPrinciple}
              currentIndex={currentIndex + 1}
              total={principles.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
