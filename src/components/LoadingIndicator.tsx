
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

interface LoadingIndicatorProps {
  color?: string;
  type?: 'pixels' | 'ascii' | 'spinner';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  color = 'currentColor',
  type = 'ascii'
}) => {
  const [frame, setFrame] = useState(0);
  const asciiFrames = [
    '◐ Loading... ◓',
    '◓ Loading... ◑',
    '◑ Loading... ◒',
    '◒ Loading... ◐'
  ];

  // Rotate through ASCII frames
  useEffect(() => {
    if (type === 'ascii') {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % asciiFrames.length);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [type, asciiFrames.length]);

  if (type === 'ascii') {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <pre className="font-mono text-xl animate-pulse glow" style={{ color }}>
          {asciiFrames[frame]}
        </pre>
      </div>
    );
  }
  
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-3">
        <Loader className="animate-spin h-8 w-8" style={{ color }} />
        <div className="font-mono text-sm glow" style={{ color }}>Processing...</div>
      </div>
    );
  }

  // Default pixel animation
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative inline-flex">
        {/* Create animated pixel grid */}
        <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div 
              key={i}
              className="animate-pulse-glow shadow-lg hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: color,
                animationDelay: `${i * 0.06}s`,
                width: '100%',
                height: '100%',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
        
        {/* Animated text */}
        <div 
          className="absolute -bottom-6 left-0 right-0 text-center text-xs font-mono glow animate-bounce"
          style={{ color, animationDuration: '2s' }}
        >
          Processing...
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
