import React, { useState, useEffect } from 'react';

const PageLoader: React.FC = () => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [frame, setFrame] = useState(0);

  // Collection of ASCII animations for page loading
  const animations = [
    // Arcade machine
    [
      `
┌─────────────┐
│  LOADING..  │
│  ▓▓▓▓▓░░░░  │
│             │
│   ASCIIfy   │
│             │
│             │
│      ○      │
└─────────────┘`,
      `
┌─────────────┐
│  LOADING..  │
│  ▓▓▓▓▓▓░░░  │
│             │
│   ASCIIfy   │
│             │
│             │
│      ○      │
└─────────────┘`,
      `
┌─────────────┐
│  LOADING..  │
│  ▓▓▓▓▓▓▓░░  │
│             │
│   ASCIIfy   │
│             │
│             │
│      ○      │
└─────────────┘`,
      `
┌─────────────┐
│  LOADING..  │
│  ▓▓▓▓▓▓▓▓░  │
│             │
│   ASCIIfy   │
│             │
│             │
│      ○      │
└─────────────┘`,
      `
┌─────────────┐
│  LOADING..  │
│  ▓▓▓▓▓▓▓▓▓  │
│             │
│   ASCIIfy   │
│             │
│             │
│      ○      │
└─────────────┘`
    ],
    // Matrix digital rain
    [
      `
01010 10101 01010
10101 01010 10101
01010 10101 01010
10101 01010 10101
01010 10101 01010
↓↓↓↓↓ ↓↓↓↓↓ ↓↓↓↓↓`,
      `
10101 01010 10101
01010 10101 01010
10101 01010 10101
01010 10101 01010
10101 01010 10101
↓↓↓↓↓ ↓↓↓↓↓ ↓↓↓↓↓`,
      `
01010 10101 01010
10101 01010 10101
01010 10101 01010
10101 01010 10101
01010 10101 01010
↓↓↓↓↓ ↓↓↓↓↓ ↓↓↓↓↓`
    ],
    // ASCII Art Builder
    [
      `
⠋ ASCIIfy loading...
┌───┐
│   │
└───┘`,
      `
⠙ ASCIIfy loading...
┌───┐
│ ░ │
└───┘`,
      `
⠹ ASCIIfy loading...
┌───┐
│ ▒ │
└───┘`,
      `
⠸ ASCIIfy loading...
┌───┐
│ ▓ │
└───┘`,
      `
⠼ ASCIIfy loading...
┌───┐
│ █ │
└───┘`
    ],
    // Glow effect
    [
      `
╭───────────╮
│  WELCOME  │
│           │
│  ASCIIfy  │
╰───────────╯`,
      `
╭───────────╮
*│  WELCOME  │*
│           │
*│  ASCIIfy  │*
╰───────────╯`,
      `
*╭───────────╮*
│  WELCOME  │
*│           │*
│  ASCIIfy  │
*╰───────────╯*`
    ]
  ];

  // Messages to display while loading
  const loadingMessages = [
    "Preparing your ASCIIfy experience...",
    "Transforming text into art...",
    "Summoning pixels from the void...",
    "Converting caffeine to ASCII...",
    "Warming up the art generators...",
    "Loading creative possibilities...",
    "Arranging characters just for you..."
  ];

  // Cycle through animations
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % animations.length);
    }, 2000);

    return () => clearInterval(animationTimer);
  }, [animations.length]);

  // Cycle through frames of current animation
  useEffect(() => {
    const currentAnimation = animations[animationIndex];
    const frameTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % currentAnimation.length);
    }, 250);

    return () => clearInterval(frameTimer);
  }, [animationIndex, animations]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-95 transition-opacity duration-500">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center">
          <pre className="font-mono text-white inline-block text-left animate-pulse mb-4 whitespace-pre">
            {animations[animationIndex][frame]}
          </pre>
        </div>
        
        <p className="text-white text-lg mb-6">
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </p>
        
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader; 