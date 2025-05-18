
import figlet from 'figlet';

export interface AsciiOptions {
  font?: string;
  horizontalLayout?: 'default' | 'full' | 'fitted' | 'controlled smushing' | 'universal smushing';
  verticalLayout?: 'default' | 'full' | 'fitted' | 'controlled smushing' | 'universal smushing';
}

// Predefined fonts to use as a fallback
const DEFAULT_FONTS = [
  'Standard', 'Big', 'Slant', 'Small', 'Ivrit',
  'Block', 'Banner', 'Doom', 'Digital', 'Mini'
];

export const convertToAscii = (text: string, options: AsciiOptions = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    figlet.text(text, {
      font: options.font || 'Standard',
      horizontalLayout: options.horizontalLayout || 'default',
      verticalLayout: options.verticalLayout || 'default',
    }, (err, data) => {
      if (err) {
        console.error('Error converting to ASCII:', err);
        reject('Error converting to ASCII');
        return;
      }
      resolve(data || 'No ASCII art generated');
    });
  });
};

// Fix the getFontList function to work properly with the figlet API
export const getFontList = (): Promise<string[]> => {
  return new Promise((resolve) => {
    try {
      // Check if the figlet.fonts function exists as expected
      if (typeof figlet.defaults === 'function') {
        figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts" });
      }
      
      // Try to get font list, if it fails return default list
      if (typeof figlet.fontsSync === 'function') {
        try {
          const fonts = figlet.fontsSync();
          if (Array.isArray(fonts) && fonts.length > 0) {
            resolve(fonts);
            return;
          }
        } catch (e) {
          console.error('Error getting font list from fontsSync:', e);
        }
      }
      
      console.warn('Falling back to default font list');
      resolve(DEFAULT_FONTS);
    } catch (err) {
      console.error('Error in getFontList:', err);
      resolve(DEFAULT_FONTS);
    }
  });
};

// Add a new function to animate ASCII art
export const animateAscii = async (
  text: string, 
  frames: number = 5, 
  options: AsciiOptions = {}
): Promise<string[]> => {
  const result: string[] = [];
  
  for (let i = 0; i < frames; i++) {
    // Create slightly different font options for each frame
    // Fixed: Use type-safe horizontalLayout values
    const frameOptions: AsciiOptions = {
      ...options,
      horizontalLayout: i % 2 === 0 ? 'default' : 'fitted'
    };
    
    try {
      const frame = await convertToAscii(text, frameOptions);
      result.push(frame);
    } catch (error) {
      console.error('Error in animation frame generation:', error);
    }
  }
  
  return result.length > 0 ? result : [await convertToAscii(text, options)];
};
