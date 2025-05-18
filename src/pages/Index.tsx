import React, { useState, useEffect } from 'react';
import { AsciiOptions, convertToAscii } from '@/lib/ascii-service';
import TextInput from '@/components/TextInput';
import AsciiOutput from '@/components/AsciiOutput';
import ThemeSwitcher, { Theme } from '@/components/ThemeSwitcher';
import FontSelector from '@/components/FontSelector';
import Header from '@/components/Header';

const Index = () => {
  const [inputText, setInputText] = useState<string>('');
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('default');
  const [selectedFont, setSelectedFont] = useState<string>('Standard');
  const [options, setOptions] = useState<AsciiOptions>({
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });

  // Generate ASCII art when input text or options change
  useEffect(() => {
    const generateAsciiArt = async () => {
      if (!inputText.trim()) {
        setAsciiArt('');
        return;
      }

      setIsLoading(true);
      try {
        const result = await convertToAscii(inputText, options);
        // Increased artificial delay to showcase animations
        setTimeout(() => {
          setAsciiArt(result);
          setIsLoading(false);
        }, 2000); // Increased from 300ms to 2000ms
      } catch (error) {
        console.error('Error converting to ASCII:', error);
        setAsciiArt('Error converting to ASCII');
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(generateAsciiArt, 500);
    return () => clearTimeout(debounceTimeout);
  }, [inputText, options]);

  useEffect(() => {
    // Update font option when selectedFont changes
    setOptions(prevOptions => ({
      ...prevOptions,
      font: selectedFont
    }));
  }, [selectedFont]);

  // Handle theme changes
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Update document body background based on theme
    const body = document.body;
    body.className = ''; // Reset classes
    
    switch (newTheme) {
      case 'vaporwave':
        body.classList.add('bg-gradient-to-br', 'from-purple-950', 'to-pink-950');
        break;
      case 'hacker':
        body.classList.add('bg-gradient-to-br', 'from-black', 'to-green-950');
        break;
      case 'crt':
        body.classList.add('bg-gradient-to-br', 'from-black', 'to-blue-950');
        break;
      default:
        body.classList.add('bg-gradient-to-br', 'from-slate-950', 'to-black');
    }
  };

  // Set initial theme
  useEffect(() => {
    handleThemeChange('default');
  }, []);

  return (
    <div className="min-h-screen p-4 pt-8 transition-all duration-500">
      <div className="container mx-auto max-w-4xl">
        <Header theme={theme} />
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
            
            <div className="glass-morphism rounded-lg p-6 animate-fade-in">
              <div className="mb-4">
                <FontSelector 
                  onFontChange={setSelectedFont} 
                  selectedFont={selectedFont} 
                  theme={theme} 
                />
              </div>
              
              <TextInput onTextChange={setInputText} theme={theme} />
            </div>
            
            <AsciiOutput asciiArt={asciiArt} theme={theme} isLoading={isLoading} />
            
            <footer className="text-center text-sm text-gray-400 mt-8">
              <p>Made with ❤️ by ASCIIfy</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
