import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between">
      <h1 className="text-xl font-bold">
        Welcome Koustav!
      </h1>

      <div className="flex items-center gap-6">

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