import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-[#00205B] dark:bg-[#60A5FA] flex items-center justify-center">
              <span className="text-white dark:text-white font-bold text-sm" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>T</span>
            </div>
            <span
              className={`font-bold text-lg tracking-tight transition-colors ${
                scrolled ? "text-[#00205B] dark:text-white" : "text-white"
              }`}
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              TURFBOOK
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {["search", "featured", "how-it-works", "testimonials"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 relative group ${
                  scrolled 
                    ? "text-[#334155] dark:text-gray-300 hover:text-[#00205B] dark:hover:text-[#60A5FA]" 
                    : "text-white/90 hover:text-white"
                }`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {id === "how-it-works" ? "How It Works" : id.charAt(0).toUpperCase() + id.slice(1)}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-[#00205B] dark:bg-[#60A5FA]" : "bg-white"
                }`}></span>
              </button>
            ))}
          </div>

          {/* Right side: Dark Mode Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-[#00205B] dark:text-[#60A5FA]"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CTA Button */}
            <button
              data-testid="navbar-cta"
              onClick={() => scrollTo("search")}
              className="flex-1 bg-[#00205B] dark:bg-[#60A5FA] text-white dark:text-white text-sm font-bold uppercase tracking-widest px-6 py-2.5 transition-all hover:bg-[#001840] dark:hover:bg-[#3B82F6]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Find a Turf
            </button>
          </div>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            className={`lg:hidden transition-colors ${
              scrolled ? "text-[#00205B] dark:text-white" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {["search", "featured", "how-it-works", "testimonials"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left text-sm font-semibold uppercase tracking-wider text-[#334155] dark:text-gray-300 hover:text-[#00205B] dark:hover:text-[#60A5FA] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {id === "how-it-works" ? "How It Works" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={toggleDarkMode}
                  className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-800 text-[#00205B] dark:text-[#60A5FA] rounded-lg"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => scrollTo("search")}
                  className="flex-1 bg-[#00205B] dark:bg-[#60A5FA] text-white dark:text-white text-sm font-bold uppercase tracking-widest px-6 py-3"
                >
                  Find a Turf
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
