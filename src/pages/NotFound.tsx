import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-black">
      <div className="text-center glass-morphism p-10 rounded-lg">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <a 
          href="/" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform inline-block"
        >
          Return to ASCIIfy
        </a>
      </div>
    </div>
  );
};

export default NotFound;
