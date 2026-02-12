import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B0016] border-t border-purple-900/40 py-10 overflow-hidden">
      {/* Subtle Glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[200px] 
      bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Copyright */}
        <p className="text-purple-300 text-sm">
          © 2025 <span className="text-[#9B4DFF]">Kefyalew</span>. All rights
          reserved.
        </p>

        {/* Social Links */}
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/kout19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-[#9B4DFF] transition-colors duration-300"
          >
            GitHub
          </a>

          {/* Add more when needed */}
          {/* 
          <a
            href="#"
            className="text-purple-400 hover:text-[#9B4DFF] transition-colors duration-300"
          >
            LinkedIn
          </a>
          */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
