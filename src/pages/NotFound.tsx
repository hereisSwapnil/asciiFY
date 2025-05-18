import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [frame, setFrame] = useState(0);

  // ASCII art frames for 404 animation
  const asciiFrames = [
    `
    _  _    ___  _  _   
   | || |  / _ \\| || |  
   | || |_| | | | || |_ 
   |__   _| | | |__   _|
      | | | |_| |  | |  
      |_|  \\___/   |_|  
                        
    Page Not Found      
    `,
    `
    _  _    ___  _  _   
   | || |  / _ \\| || |  
   | || |_| | | | || |_ 
   |__   _| | | |__   _|
      | | | |_| |  | |  .
      |_|  \\___/   |_|  .
                        .
    Page Not Found      
    `,
    `
    _  _    ___  _  _   .
   | || |  / _ \\| || |  .
   | || |_| | | | || |_ .
   |__   _| | | |__   _|
      | | | |_| |  | |  
      |_|  \\___/   |_|  
                        
    Page Not Found      
    `,
    `
   ._  _    ___  _  _   
   | || |  / _ \\| || |  
   | || |_| | | | || |_ 
   |__   _| | | |__   _|
      | | | |_| |  | |  
      |_|  \\___/   |_|  
                        
    Page Not Found      
    `
  ];

  // Messages to display under the 404 animation
  const errorMessages = [
    "Oops! Looks like this page doesn't exist",
    "We've looked everywhere, but couldn't find this page",
    "Houston, we have a problem finding this page",
    "This page has been ASCII-fied out of existence"
  ];

  // Log the error and set up animation
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Animate the ASCII frames
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % asciiFrames.length);
    }, 300);

    return () => clearInterval(interval);
  }, [location.pathname, asciiFrames.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-black">
      <div className="text-center glass-morphism p-10 rounded-lg max-w-lg w-full">
        <div className="mb-6">
          <pre className="font-mono text-yellow-400 text-sm sm:text-base inline-block text-left whitespace-pre">
            {asciiFrames[frame]}
          </pre>
        </div>
        
        <p className="text-lg text-gray-300 mb-6">
          {errorMessages[frame % errorMessages.length]}
        </p>
        
        <Link 
          to="/" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform inline-block"
        >
          Return to ASCIIfy
        </Link>
        
        <div className="mt-8 text-xs text-gray-500">
          <p>"{location.pathname}" is not a valid path</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
