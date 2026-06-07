import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const avatarLetter = user?.user_metadata?.full_name?.charAt(0) || 'G'

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  return (
    <header className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between">
      <h1 className="text-xl font-bold">
        Welcome {user?.user_metadata?.full_name || "Guest"}!
      </h1>

      <div className="flex items-center gap-6">

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-300 font-semibold text-black">
              {avatarLetter}
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <button className="w-full px-4 py-3 text-left hover:bg-gray-100 cursor-pointer">
                My Profile
              </button>

              <button className="w-full px-4 py-3 text-left hover:bg-gray-100 cursor-pointer">
                Settings
              </button>

              <div className="border-t border-gray-200" />

              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100 cursor-pointer"
              >
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