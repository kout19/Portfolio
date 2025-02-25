import React from "react";
import computerImgage from '../assets/images/computer-3.jpg'
const Hero = () => {
  return (
    <section id="hero"  className="h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${computerImgage})` }}>
   <div className="absolute inset-0 bg-black opacity-70">
        <div className="mx-w-7xl mx-auto px-4 flex flex-col  relative z-10 text-center text-white  justify-content items-center h-full py-20 mt-10 ">
          <h1 className="text-4xl md:text-6xl mb-4 font-bold">Hi, I am Kefyalew</h1>
          <p className="text-xl mt-4">Full Stack Web Developer</p>
          <a href="#contact" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full">Hire Me</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;