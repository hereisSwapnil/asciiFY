import React, { useState, useEffect } from 'react';
import { Theme } from '@/components/ThemeSwitcher';

interface LoadingScreenProps {
  theme: Theme;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme }) => {
  const [animationIndex, setAnimationIndex] = useState(() => 
    Math.floor(Math.random() * 10)
  );
  const [frame, setFrame] = useState(0);

  // Collection of ASCII animations
  const animations = [
    // Cat animation
    [
      `
 /\\_/\\  
( o.o ) 
 > ^ <  
      `,
      `
 /\\_/\\  
( -.- ) 
 > ^ <  
      `
    ],
    // Spinner animation
    [
      `
  ◜   
     
     
      `,
      `
   ◝  
     
     
      `,
      `
     
   ◞  
     
      `,
      `
     
  ◟   
     
      `
    ],
    // Computer animation
    [
      `
 ┌───────┐
 │ ASCII │
 │ ... ◠ │
 └───────┘
      `,
      `
 ┌───────┐
 │ ASCII │
 │ ... ◡ │
 └───────┘
      `
    ],
    // Text animation
    [
      `
 Loading.  
 Sass ready
 Art soon  
      `,
      `
 Loading.. 
 Sass ready
 Art soon  
      `,
      `
 Loading...
 Sass ready
 Art soon  
      `
    ],
    // Pac-Man animation
    [
      `
   ᗧ···ᗣ   
      `,
      `
   ᗧ··ᗣ·   
      `,
      `
   ᗧ·ᗣ··   
      `,
      `
   ᗧᗣ···   
      `
    ],
    // ASCII art block
    [
      `
   ▄▀▀▀▄   
   █   █   
  ███████  
 ▄▀     ▀▄ 
      `,
      `
   ▄▀▀▀▄   
   █   █   
 ▄███████▄ 
▄▀ ▀   ▀ ▀▄
      `
    ],
    // Clock animation
    [
      `
   ┌─────┐
   │  ╱  │
   │     │
   └─────┘
      `,
      `
   ┌─────┐
   │  │  │
   │     │
   └─────┘
      `,
      `
   ┌─────┐
   │  ╲  │
   │     │
   └─────┘
      `,
      `
   ┌─────┐
   │     │
   │  ─  │
   └─────┘
      `
    ],
    // Heart beat animation
    [
      `
     /\\  /\\
    /  \\/  \\
    \\      /
     \\    /
      \\  /
       \\/
      `,
      `
     /\\  /\\
    /  \\/  \\
    \\      /
     \\    /
      \\  /
       \\/
      `,
      `
   /\\    /\\
  /  \\  /  \\
 /    \\/    \\
 \\          /
  \\        /
   \\      /
    \\    /
     \\  /
      \\/
      `,
      `
     /\\  /\\
    /  \\/  \\
    \\      /
     \\    /
      \\  /
       \\/
      `
    ],
    // Matrix-like effect
    [
      `
 01010101
 10101010
 01010101
 10101010
      `,
      `
 10101010
 01010101
 10101010
 01010101 
      `
    ],
    // Progress bar
    [
      `
 [          ]
 Loading... 0%
      `,
      `
 [▓         ]
 Loading... 10%
      `,
      `
 [▓▓        ]
 Loading... 20%
      `,
      `
 [▓▓▓       ]
 Loading... 30%
      `,
      `
 [▓▓▓▓      ]
 Loading... 40%
      `,
      `
 [▓▓▓▓▓     ]
 Loading... 50%
      `,
      `
 [▓▓▓▓▓▓    ]
 Loading... 60%
      `,
      `
 [▓▓▓▓▓▓▓   ]
 Loading... 70%
      `,
      `
 [▓▓▓▓▓▓▓▓  ]
 Loading... 80%
      `,
      `
 [▓▓▓▓▓▓▓▓▓ ]
 Loading... 90%
      `,
      `
 [▓▓▓▓▓▓▓▓▓▓]
 Loading... 99%
      `
    ]
  ];

  const getThemeClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'text-theme-vaporwave1 glow vaporwave-gradient';
      case 'hacker':
        return 'text-theme-hacker glow hacker-gradient';
      case 'crt':
        return 'text-theme-crt1 crt-effect crt-gradient';
      default:
        return 'text-white';
    }
  };

  const getSassyMessages = () => {
    const messages = [
      "Brewing your sassy pixels...",
      "Art loading... attitude included",
      "Rendering sassiness...",
      "Configuring perfect snark levels...",
      "Adding extra sass...",
      "Converting caffeine to ASCII...",
      "Finding the right amount of attitude...",
      "Sass in progress...",
      "Making ASCII fabulous...",
      "Loading pure text magic...",
      "ASCII with a side of sass...",
      "Turning text into art...",
      "Injecting personality into pixels...",
      "Character art with character...",
      "Calculating the perfect level of snark...",
      "Formatting sarcasm in plain text..."
    ];
    
    return messages[Math.floor(animationIndex % messages.length)];
  };

  // Cycle through animations every few seconds
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % animations.length);
    }, 3000);

    return () => clearInterval(animationTimer);
  }, [animations.length]);

  // Cycle through frames of current animation
  useEffect(() => {
    const currentAnimation = animations[animationIndex];
    const frameTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % currentAnimation.length);
    }, 300);

    return () => clearInterval(frameTimer);
  }, [animationIndex, animations]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-8">
      <pre className={`font-mono text-center ${getThemeClasses()} animate-pulse`}>
        {animations[animationIndex][frame]}
      </pre>
      
      <div className={`mt-4 text-center text-sm ${getThemeClasses()}`}>
        {getSassyMessages()}
      </div>
    </div>
  );
};

export default LoadingScreen; 