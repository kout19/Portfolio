import React,{useState} from "react";
import { FaBlog, FaBell, FaUser, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const SideBar = ({setSelectedComponenet}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const handleBlog = () => {
    setIsBlogOpen(!isBlogOpen);
  }
  return (
    <>
      <button 
        className="md:hidden p-2 bg-gray-800 text-white fixed top-10 left-0 z-50"
        onClick={()=>setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes/> : <FaBars/>}
      </button>
      <div className={`h-screen  w-64 absolute text-sm md:w-64 bg-gray-800 text-white   left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full" } transition-transform md:relative md:translate-x-0`}>
      {/* <div className="p-4 text-xl font-bold border-b border-gray-700">
         Admin panel 
      </div> */}
      <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
              <button
                onClick={() => setSelectedComponenet("fetchBlogs")}
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Home
              </button>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
              <button 
                onClick={handleBlog}
                className=" flex items-center gap-2 text-left px-1 py-1 rounded hover:bg-gray-700">
                <FaBlog/> <span>Manage Blogs</span>
              </button>
              </li>
            {isBlogOpen && (
                <ul className="pl-6 space-2 mt-2">
                  <li>
                  <button onClick={()=> setSelectedComponenet("postBlog")}
                    className="block px-4 py-2 rounded hover:bg-gray-700">
                      Post Blog
                    </button>
                  </li>
                </ul>
              )}
            
          <li className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
            <FaBell/> <span>Notifications</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
            <FaUser/> <span>Profile</span>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 ">
        <button className="flex items-center gap-2 w-full  hover:text-red-400">
         <FaSignInAlt/><span>Logout</span>
        </button>
      </div>
    </div>
    </>
    
  );
}
export default SideBar;