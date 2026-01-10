"use client";

import { useMiniApp } from "@neynar/react";

/**
 * ContextTab component displays the current mini app context in JSON format.
 * 
 * This component provides a developer-friendly view of the Farcaster mini app context,
 * including user information, client details, and other contextual data. It's useful
 * for debugging and understanding what data is available to the mini app.
 * 
 * The context includes:
 * - User information (FID, username, display name, profile picture)
 * - Client information (safe area insets, platform details)
 * - Mini app configuration and state
 * 
 * @example
 * ```tsx
 * <ContextTab />
 * ```
 */
export function ContextTab() {
  const { context } = useMiniApp();
  
  return (
    <div className="mx-6 py-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Context</h2>
      <div 
        className="p-4 rounded-lg glass-card overflow-auto max-h-[calc(100vh-200px)]"
        role="region"
        aria-label="Mini app context information"
        tabIndex={0}
      >
        <pre className="font-mono text-xs whitespace-pre-wrap break-words w-full text-[var(--fid-color)] focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-2">
          {JSON.stringify(context, null, 2)}
        </pre>
      </div>
      <p className="text-xs text-[var(--fid-color)] mt-4">
        Press Tab to focus and use arrow keys to scroll
      </p>
    </div>
  );
} 