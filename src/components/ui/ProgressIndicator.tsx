'use client';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mt-4">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        <span className="text-primary font-medium">{current}</span> / {total}
      </span>
    </div>
  );
}
