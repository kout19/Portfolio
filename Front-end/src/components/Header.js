import React, { useEffect, useState } from "react";

const Header = ({ onSignInClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const headerLinks = ["about", "skills", "projects", "contact"];

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${
        isScrolled
          ? "bg-[#0B0016]/80 backdrop-blur-lg border-b border-purple-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-semibold text-white tracking-wide"
        >
          Kefyalew
        </a>

        {/* Mobile Button */}
        <button
          className="lg:hidden text-purple-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Nav */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex absolute lg:static top-full right-0 w-full 
          bg-[#120022] lg:bg-transparent lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:ml-auto lg:space-x-8 text-sm">
            {headerLinks.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={() => handleSetActive(section)}
                  className={`block py-3 px-4 transition-all duration-300
                  ${
                    activeSection === section
                      ? "text-[#9B4DFF] border-b border-[#9B4DFF]"
                      : "text-purple-200 hover:text-[#9B4DFF]"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}

            <li className="px-4 py-3 lg:py-0">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onSignInClick();
                }}
                className="px-5 py-2 rounded-md text-sm font-medium 
                bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF] 
                hover:opacity-90 transition-all duration-300"
              >
                Sign In
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
