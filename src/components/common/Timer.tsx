'use client';

import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
  className?: string;
  showIcon?: boolean;
}

export function Timer({ seconds, className = '', showIcon = true }: TimerProps) {
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {showIcon && <Clock className="w-4 h-4" />}
      <span className="font-mono">{formatTime(seconds)}</span>
    </div>
  );
}
