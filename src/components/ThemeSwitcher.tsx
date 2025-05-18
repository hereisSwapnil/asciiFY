import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export type Theme = 'default' | 'vaporwave' | 'hacker' | 'crt';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
  // Create a fade-in animation when component mounts
  const [visible, setVisible] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  const getButtonStyles = (theme: Theme) => {
    const isActive = currentTheme === theme;
    const isHovered = hoveredTheme === theme;
    
    const baseClasses = "relative overflow-hidden group transition-all duration-300";
    const activeClasses = isActive ? "shadow-lg transform scale-105 font-semibold" : "";
    const hoverAnimation = isHovered ? "animate-pulse" : "";
    
    return `${baseClasses} ${activeClasses} ${hoverAnimation}`;
  };

  return (
    <div 
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} 
                 p-4 rounded-lg glass-morphism mb-6`}
    >
      <h3 className="text-lg font-bold mb-3 text-gradient">Choose Theme</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={currentTheme === 'default' ? 'default' : 'outline'}
          className={getButtonStyles('default')}
          onClick={() => onThemeChange('default')}
          onMouseEnter={() => setHoveredTheme('default')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          <span className="z-10 relative">Default</span>
          <span className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 opacity-0 group-hover:opacity-70 transition-opacity"></span>
        </Button>
        
        <Button 
          variant={currentTheme === 'vaporwave' ? 'default' : 'outline'}
          className={`${getButtonStyles('vaporwave')} ${currentTheme === 'vaporwave' ? 'text-purple-100' : ''}`}
          onClick={() => onThemeChange('vaporwave')}
          onMouseEnter={() => setHoveredTheme('vaporwave')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          <span className="z-10 relative">Vaporwave</span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-70 transition-opacity"></span>
        </Button>
        
        <Button 
          variant={currentTheme === 'hacker' ? 'default' : 'outline'}
          className={`${getButtonStyles('hacker')} ${currentTheme === 'hacker' ? 'text-green-100' : ''}`}
          onClick={() => onThemeChange('hacker')}
          onMouseEnter={() => setHoveredTheme('hacker')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          <span className="z-10 relative">Hacker</span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-70 transition-opacity"></span>
        </Button>
        
        <Button 
          variant={currentTheme === 'crt' ? 'default' : 'outline'}
          className={`${getButtonStyles('crt')} ${currentTheme === 'crt' ? 'text-blue-100' : ''}`}
          onClick={() => onThemeChange('crt')}
          onMouseEnter={() => setHoveredTheme('crt')}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          <span className="z-10 relative">CRT</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-70 transition-opacity"></span>
        </Button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
