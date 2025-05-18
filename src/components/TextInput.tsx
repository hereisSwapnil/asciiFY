
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Theme } from '@/components/ThemeSwitcher';

interface TextInputProps {
  onTextChange: (text: string) => void;
  theme: Theme;
}

const TextInput: React.FC<TextInputProps> = ({ onTextChange, theme }) => {
  const [text, setText] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'border-pink-500/60 bg-purple-950/30 focus:border-pink-400';
      case 'hacker':
        return 'border-green-500/60 bg-green-950/30 focus:border-green-400';
      case 'crt':
        return 'border-blue-500/60 bg-blue-950/30 focus:border-blue-400';
      default:
        return 'border-slate-700/60 bg-slate-900/30 focus:border-slate-500';
    }
  };

  const getPlaceholder = () => {
    switch (theme) {
      case 'vaporwave':
        return 'Type here for vaporwave ASCII art...';
      case 'hacker':
        return '> Enter text for hacking sequence...';
      case 'crt':
        return 'C:\\> Type command...';
      default:
        return 'Type something to convert to ASCII art...';
    }
  };

  return (
    <div className={`w-full transition-all duration-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Textarea
        placeholder={getPlaceholder()}
        value={text}
        onChange={handleTextChange}
        className={`min-h-[100px] font-mono resize-y ${getThemeClasses()} glass-morphism transition-colors duration-300`}
      />
    </div>
  );
};

export default TextInput;
