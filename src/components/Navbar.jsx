// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/auth/login");
//   };

//   return (
//     <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
//       <div className="flex gap-6 items-center">
//         <Link to="/" className="font-bold text-blue-700">Home</Link>
//         <Link to="/products">Product</Link>
//         {isHome ? (
//           <>
//             <a href="#services">Services</a>
//             <a href="#contact">Contact</a>
//           </>
//         ) : (
//           <>
//             <Link to="/#services">Services</Link>
//             <Link to="/#contact">Contact</Link>
//           </>
//         )}
//       </div>
//       {localStorage.getItem("token") && (
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// }


import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  const navLinks = [
    { to: "/", label: "Home", isHome: true },
    { to: "/products", label: "Products" },
    { 
      to: isHome ? "#services" : "/#services", 
      label: "Services",
      isAnchor: true 
    },
    { 
      to: isHome ? "#contact" : "/#contact", 
      label: "Contact",
      isAnchor: true 
    },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              B2C
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={index}
                  href={link.to}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className={`relative font-medium transition-colors duration-200 group ${
                    location.pathname === link.to
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              )
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 animate-pulse" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Logout button */}
            {localStorage.getItem("token") && (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg transform"
              >
                Logout
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {navLinks.map((link, index) => (
              link.isAnchor ? (
                <a
                  key={index}
                  href={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 transform hover:translate-x-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 transform hover:translate-x-2 ${
                    location.pathname === link.to
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Mobile logout button */}
            {localStorage.getItem("token") && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:translate-x-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}