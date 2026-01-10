"use client";

import { useEffect } from "react";
import { useMiniApp } from "@neynar/react";
import { HomeTab, ActionsTab, ContextTab, WalletTab } from "~/components/ui/tabs";

// --- Types ---
export enum Tab {
  Home = "home",
  Actions = "actions",
  Context = "context",
  Wallet = "wallet",
}

export interface AppProps {
  title?: string;
}

/**
 * App component serves as the main container for the mini app interface.
 * 
 * This component orchestrates the overall mini app experience by:
 * - Managing tab navigation and state
 * - Handling Farcaster mini app initialization
 * - Coordinating wallet and context state
 * - Providing error handling and loading states
 * - Rendering the appropriate tab content based on user selection
 * 
 * The component integrates with the Neynar SDK for Farcaster functionality
 * and Wagmi for wallet management. It provides a complete mini app
 * experience with multiple tabs for different functionality areas.
 * 
 * Features:
 * - Tab-based navigation (Home, Actions, Context, Wallet)
 * - Farcaster mini app integration
 * - Wallet connection management
 * - Error handling and display
 * - Loading states for async operations
 * 
 * @param props - Component props
 * @param props.title - Optional title for the mini app (defaults to "Neynar Starter Kit")
 * 
 * @example
 * ```tsx
 * <App title="My Mini App" />
 * ```
 */
export default function App() {
  // --- Hooks ---
  const {
    isSDKLoaded,
    context,
    setInitialTab,
    currentTab,
  } = useMiniApp();

  // --- Effects ---
  /**
   * Sets the initial tab to "home" when the SDK is loaded.
   * 
   * This effect ensures that users start on the home tab when they first
   * load the mini app. It only runs when the SDK is fully loaded to
   * prevent errors during initialization.
   */
  useEffect(() => {
    if (isSDKLoaded) {
      setInitialTab(Tab.Home);
    }
  }, [isSDKLoaded, setInitialTab]);

  // --- Early Returns ---
  if (!isSDKLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="spinner-primary h-12 w-12 mx-auto mb-4"></div>
            <div className="absolute inset-0 spinner-primary h-12 w-12 mx-auto opacity-30" style={{ animationDelay: '0.15s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-lg font-medium">Loading...</p>
            <p className="text-[var(--fid-color)] text-sm">Preparing Principles for Building in Crypto</p>
          </div>
          {/* Skeleton card preview */}
          <div className="mt-8 mx-auto w-full max-w-sm h-[60vh] max-h-[500px] rounded-[30px] skeleton" 
               style={{
                 background: 'var(--glass-bg)',
                 border: '1px solid var(--glass-border)',
               }}>
          </div>
        </div>
      </div>
    );
  }

  // --- Render ---
  const safeAreaTop = context?.client.safeAreaInsets?.top ?? 0;
  const safeAreaBottom = context?.client.safeAreaInsets?.bottom ?? 0;
  const safeAreaLeft = context?.client.safeAreaInsets?.left ?? 0;
  const safeAreaRight = context?.client.safeAreaInsets?.right ?? 0;

  return (
    <div
      className="h-screen overflow-hidden"
      style={{
        paddingTop: `${safeAreaTop}px`,
        paddingBottom: `${safeAreaBottom}px`,
        paddingLeft: `${safeAreaLeft}px`,
        paddingRight: `${safeAreaRight}px`,
        // Ensure content is visible on all devices - use dvh for better mobile support
        minHeight: '100dvh',
      }}
      role="application"
      aria-label="Principles for Building in Crypto mini app"
    >
      {/* Header and Footer hidden for fullscreen ultra-minimal experience */}

      {/* Tab content rendering - fullscreen */}
      <main 
        className="h-full overflow-hidden"
        role="main"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentTab === Tab.Home && <HomeTab />}
        {currentTab === Tab.Actions && <ActionsTab />}
        {currentTab === Tab.Context && <ContextTab />}
        {currentTab === Tab.Wallet && <WalletTab />}
      </main>
    </div>
  );
}

