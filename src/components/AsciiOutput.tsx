import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { Theme } from '@/components/ThemeSwitcher';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import LoadingScreen from './LoadingScreen';
import ButtonAnimation from './ButtonAnimation';

interface AsciiOutputProps {
  asciiArt: string;
  theme: Theme;
  isLoading: boolean;
}

const AsciiOutput: React.FC<AsciiOutputProps> = ({ asciiArt, theme, isLoading }) => {
  const outputRef = useRef<HTMLPreElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const exportBtnRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyActive, setCopyActive] = useState(false);
  const [exportActive, setExportActive] = useState(false);
  const [copyPosition, setCopyPosition] = useState({ top: 0, left: 0 });
  const [exportPosition, setExportPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Update button animation positions
  useEffect(() => {
    const updatePositions = () => {
      if (copyBtnRef.current) {
        const rect = copyBtnRef.current.getBoundingClientRect();
        setCopyPosition({ 
          top: rect.top - 60, 
          left: rect.left + rect.width / 2 - 15 
        });
      }
      
      if (exportBtnRef.current) {
        const rect = exportBtnRef.current.getBoundingClientRect();
        setExportPosition({ 
          top: rect.top - 60, 
          left: rect.left + rect.width / 2 - 15 
        });
      }
    };
    
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

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

  const getWrapperClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'bg-gradient-to-br from-purple-900/30 to-pink-600/30';
      case 'hacker':
        return 'bg-gradient-to-br from-green-900/30 to-green-500/10';
      case 'crt':
        return 'crt bg-gradient-to-br from-blue-900/30 to-blue-600/30';
      default:
        return 'bg-gradient-to-br from-slate-800/50 to-slate-900/50';
    }
  };

  const exportAsImage = async () => {
    if (!outputRef.current || !hasContent) {
      if (!hasContent) {
        toast('Nothing to export!', {
          description: 'Type something to generate ASCII art first.'
        });
      }
      return;
    }
    
    // Show export animation
    setExportActive(true);
    
    try {
      const canvas = await html2canvas(outputRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      // Add a short delay for the animation to be visible
      setTimeout(() => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'ascii-art.png';
        link.click();
        
        toast('Image exported successfully!', {
          description: 'Your ASCII art has been saved as an image.'
        });
        
        // Hide export animation after a delay
        setTimeout(() => {
          setExportActive(false);
        }, 1000);
      }, 800);
    } catch (error) {
      console.error('Error exporting image:', error);
      toast('Error exporting image', {
        description: 'There was a problem exporting your ASCII art.'
      });
      setExportActive(false);
    }
  };

  // Check if there's actual content to copy or export
  const hasContent = Boolean(asciiArt && asciiArt.trim());

  // Handle copy button animation
  const handleCopy = () => {
    if (hasContent) {
      setCopyActive(true);
      setCopied(true);
      toast('Copied to clipboard!');
      
      // Reset copy animation after showing the complete animation
      setTimeout(() => {
        setCopyActive(false);
      }, 1500);
    } else {
      toast('Nothing to copy!', {
        description: 'Type something to generate ASCII art first.'
      });
    }
  };

  return (
    <div className={`w-full rounded-lg overflow-hidden transition-all duration-500 ${getWrapperClasses()} neo-blur relative`}>
      {theme === 'crt' && <div className="scanline"></div>}
      
      {/* Button animations */}
      {copyActive && (
        <div style={{ position: 'fixed', top: copyPosition.top, left: copyPosition.left }}>
          <ButtonAnimation type="copy" isActive={copyActive} theme={theme} />
        </div>
      )}
      
      {exportActive && (
        <div style={{ position: 'fixed', top: exportPosition.top, left: exportPosition.left }}>
          <ButtonAnimation type="export" isActive={exportActive} theme={theme} />
        </div>
      )}
      
      <div className="p-2 sm:p-4 relative z-10 min-h-[300px]">
        <div className="flex justify-end space-x-2 mb-2">
          <CopyToClipboard text={asciiArt || ' '} onCopy={handleCopy}>
            <Button 
              ref={copyBtnRef}
              size="sm" 
              variant="outline"
              className="animate-fade-in relative overflow-hidden group"
              disabled={isLoading || !hasContent}
              title="Copy ASCII art to clipboard"
              onMouseEnter={() => hasContent && setCopyActive(true)}
              onMouseLeave={() => !copied && setCopyActive(false)}
            >
              <span className="relative z-10">{copied ? 'Copied!' : 'Copy'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </CopyToClipboard>

          <Button 
            ref={exportBtnRef}
            size="sm" 
            variant="outline" 
            onClick={exportAsImage}
            className="animate-fade-in relative overflow-hidden group"
            disabled={isLoading || !hasContent}
            title="Export as image"
            onMouseEnter={() => hasContent && setExportActive(true)}
            onMouseLeave={() => setExportActive(false)}
          >
            <span className="relative z-10">Export</span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>

        {isLoading ? (
          <LoadingScreen theme={theme} />
        ) : (
          <pre 
            ref={outputRef} 
            className={`font-mono whitespace-pre overflow-x-auto p-4 rounded-md transition-all duration-300 ${getThemeClasses()}`}
          >
            {asciiArt || 'Type something to convert to ASCII art...'}
          </pre>
        )}
      </div>
    </div>
  );
};

export default AsciiOutput;
