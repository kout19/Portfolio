import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../index.css'
const Header = ({onSignInClick}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerLinks = [
    "about","skills","projects","contact"
  ];
  const hanldeSetActive = (section) => {
    setActiveSection(section);
    isClicked();
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = ()=> {
    setIsMenuOpen(!isMenuOpen);
  }
  const isClicked = () => {
    setIsMenuOpen(false);
  }
  return (
    <header id="header" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-30 text-white ${isScrolled?'bg-gray-800' : 'bg-transparent'}`
}>
      <div className="max-w-7xl  py-4 mx-auto flex justify-between items-center">
     <a href="#hero" className="text-xl font-bold ">Kefyalew</a>
        <button className="lg:hidden block"
          onClick={toggleMenu}>
          <svg 
            xmlns="http:/www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
        <nav className={`${isMenuOpen?'block':'hidden'} lg:flex absolute lg:static top-full right-0 w-full bg-gray-700 lg:bg-transparent lg:w-atuo `}> 
          <ul className="flex  flex-col lg:flex-row lg:items-center lg:ml-auto lg:space-x-6">
            {headerLinks.map((section) => (
              <li key={section}>
                <a href={`#${section}`} onClick={()=>hanldeSetActive(section)} className={`block py-2 px-4 font-medium
                ${activeSection === section ? "text-blue-500 border-b-1 border-blue-500" : " hover:text-blue-500"} `} >
                  {section.charAt(0).toUpperCase()+section.slice(1)}
                  
                </a>
               
                </li>
            ))}
            <li>
             <Link to="/blog" className="block py-2 px-4 hover:text-blue-500">Blog</Link>
            </li>
            <li
            ><button
                onClick={() => { isClicked(); onSignInClick() }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign In</button></li>
            {/* <li><a href="#about" className=" block py-2 px-4 hover:text-gray-400" onClick={isClicked}>About</a></li>
            <li><a href="#skills" className="block py-2 px-4 hover:text-gray-400 " onClick={isClicked}>Skills</a></li>
            <li><a href="#projects" className=" block py-2 px-4 hover:text-gray-400" onClick={isClicked}>Projects</a></li>
            <li><a href="#contact" className=" block py-2 px-4 hover:text-gray-400" onClick={isClicked}>Contact</a></li>
            <li ><Link to="/blog" className="block py-2 px-4 hover:text-gray-400" onClick={isClicked}>Blog</Link></li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;