import React from "react";
const Footer = () => {
  return (
    <footer className="footer p-4 bg-gray-800 text-white text-center">
      <p>© 2024 Kefyalew. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">Github</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">LinkedIn</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">Twitter</a>
      </div>
    </footer>
  );
}

export default Footer;