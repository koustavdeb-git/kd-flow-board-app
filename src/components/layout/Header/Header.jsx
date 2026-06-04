import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between">
      {/* Left Side */}
      <h1 className="text-xl font-bold">
        Welcome Koustav!
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Theme Switch */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-gray-300"
            }`}
        >
          <span
            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${isDark ? "translate-x-6" : ""
              }`}
          />
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              KD
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <button className="w-full px-4 py-3 text-left hover:bg-gray-100">
                My Profile
              </button>

              <button className="w-full px-4 py-3 text-left hover:bg-gray-100">
                Settings
              </button>

              <div className="border-t border-gray-200" />

              <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;