
import { useEffect, useState } from 'react';
import { Theme } from '@/components/ThemeSwitcher';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  theme: Theme;
}

const Header = ({ theme }: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add a small animation sequence when the component mounts
    const timer = setTimeout(() => {
      const letters = document.querySelectorAll('.header-letter');
      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add('animate-bounce');
          setTimeout(() => {
            letter.classList.remove('animate-bounce');
          }, 500);
        }, i * 100);
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const getThemeClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded shadow-lg glow hover:scale-105 transition-transform';
      case 'hacker':
        return 'bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded shadow-lg glow hover:scale-105 transition-transform';
      case 'crt':
        return 'bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg crt-effect hover:scale-105 transition-transform';
      default:
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform';
    }
  };

  const getSubtitleClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'text-pink-300 animate-fade-in';
      case 'hacker':
        return 'text-green-300 animate-fade-in';
      case 'crt':
        return 'text-blue-300 crt-effect animate-fade-in';
      default:
        return 'text-purple-300 animate-fade-in';
    }
  };

  // Create individual letters for the title with animation
  const renderAnimatedTitle = () => {
    const letters = "ASCII".split('');
    return (
      <span className="inline-flex">
        {letters.map((letter, i) => (
          <span 
            key={i} 
            className={`header-letter inline-block transform transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:text-opacity-90 text-white`}
            style={{ animationDelay: `${i * 0.1}s`, textShadow: '0 0 5px rgba(255,255,255,0.7), 0 0 10px rgba(255,255,255,0.5)' }}
          >
            {letter}
          </span>
        ))}
        <span 
          className="text-4xl align-text-top transform transition-all duration-300 hover:scale-125 hover:rotate-12 header-letter text-white"
          style={{ textShadow: '0 0 5px rgba(255,255,255,0.7), 0 0 10px rgba(255,255,255,0.5)' }}
        >
          fy
        </span>
      </span>
    );
  };

  return (
    <header 
      className={`text-center mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative inline-block p-2 rounded-lg">
        {hover && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse absolute" style={{ top: '-10px', right: '-20px' }} />
            <Sparkles className="w-6 h-6 text-blue-300 animate-pulse absolute" style={{ bottom: '5px', left: '-15px' }} />
          </div>
        )}
        <h1 
          className={`text-5xl md:text-6xl font-extrabold mb-2 ${getThemeClasses()}`}
          data-text="ASCIIfy"
        >
          {renderAnimatedTitle()}
        </h1>
      </div>

      <p className={`text-lg ${getSubtitleClasses()}`}>
        Transform text into <span className="italic hover:underline">animated</span> ASCII art
      </p>
    </header>
  );
};

export default Header;
