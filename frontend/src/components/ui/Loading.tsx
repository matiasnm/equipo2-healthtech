import React from 'react';

type Props = {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
};

export const Loading = ({ fullScreen = false, size = 'md', text, className = '' }: Props) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-b-2',
    md: 'h-10 w-10 border-b-2',
    lg: 'h-16 w-16 border-b-4',
  } as const;

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-[var(--color-primary)] border-opacity-90`}></div>
      {text && <div className="mt-3 text-sm text-[var(--color-muted)]">{text}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        {spinner}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center justify-center">
      {spinner}
    </div>
  );
};

export default Loading;
