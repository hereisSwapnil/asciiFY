
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFontList } from '@/lib/ascii-service';
import { Theme } from '@/components/ThemeSwitcher';

interface FontSelectorProps {
  onFontChange: (font: string) => void;
  selectedFont: string;
  theme: Theme;
}

const FontSelector = ({ onFontChange, selectedFont, theme }: FontSelectorProps) => {
  const [fonts, setFonts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontList = await getFontList();
        setFonts(fontList);
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  const getThemeClasses = () => {
    switch (theme) {
      case 'vaporwave':
        return 'border-pink-500/60 bg-purple-950/30';
      case 'hacker':
        return 'border-green-500/60 bg-green-950/30';
      case 'crt':
        return 'border-blue-500/60 bg-blue-950/30';
      default:
        return 'border-slate-700/60 bg-slate-900/30';
    }
  };

  return (
    <div className="w-full mb-4 animate-fade-in">
      <label htmlFor="font-select" className="block text-sm font-medium mb-2">
        Font Style
      </label>
      <Select 
        disabled={loading}
        value={selectedFont} 
        onValueChange={onFontChange}
      >
        <SelectTrigger 
          id="font-select"
          className={`w-full ${getThemeClasses()} glass-morphism`}
        >
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading fonts...
            </SelectItem>
          ) : (
            fonts.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelector;
