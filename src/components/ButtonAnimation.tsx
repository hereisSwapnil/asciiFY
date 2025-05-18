import React, { useState, useEffect } from 'react';
import { Theme } from '@/components/ThemeSwitcher';

type AnimationType = 'copy' | 'export';

interface ButtonAnimationProps {
  type: AnimationType;
  isActive: boolean;
  theme: Theme;
}

const ButtonAnimation: React.FC<ButtonAnimationProps> = ({ type, isActive, theme }) => {
  const [frame, setFrame] = useState(0);
  
  // Animation frames for Copy button
  const copyFrames = [
    `
 ┌───┐
 │   │
 └───┘
    `,
    `
 ┌───┐
 │▒  │
 └───┘
    `,
    `
 ┌───┐
 │▒▒ │
 └───┘
    `,
    `
 ┌───┐
 │▒▒▒│
 └───┘
    `,
    `
 ┌───┐
 │▒▒▒│ ✓
 └───┘
    `
  ];
  
  // Animation frames for Export button
  const exportFrames = [
    `
   ↑
  ┌─┐
  │ │
    `,
    `
   ↑
  ┌─┐
  │▒│
    `,
    `
   ↑
 /┌─┐\\
 \\│▒│/
    `,
    `
   ↑
 /┌─┐\\
 \\│▒│/ →
    `
  ];
  
  // Determine which frames to use based on button type
  const frames = type === 'copy' ? copyFrames : exportFrames;
  
  // Cycle through animation frames when active
  useEffect(() => {
    if (!isActive) {
      setFrame(0);
      return;
    }
    
    const animationTimer = setInterval(() => {
      setFrame((prev) => (prev < frames.length - 1 ? prev + 1 : prev));
    }, 150);
    
    return () => clearInterval(animationTimer);
  }, [isActive, frames.length]);
  
  // Return empty if not active and not at frame 0
  if (!isActive && frame === 0) {
    return null;
  }
  
  // Apply theme styles
  const getThemeClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'text-pink-300';
      case 'hacker':
        return 'text-green-300';
      case 'crt':
        return 'text-blue-300';
      default:
        return 'text-white';
    }
  };
  
  return (
    <div className={`fixed z-50 ${isActive ? 'animate-pulse' : ''}`}>
      <pre className={`text-xs font-mono whitespace-pre ${getThemeClasses()}`}>
        {frames[frame]}
      </pre>
    </div>
  );
};

export default ButtonAnimation; 