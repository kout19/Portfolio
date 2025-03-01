import React, { useState } from "react";
import computerImgage from '../assets/images/computer-3.jpg';
import Typewriter from 'react-typewriter-effect';

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${computerImgage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70">
        <div className="mx-w-7xl mx-auto px-4 flex flex-col relative z-10 text-center text-white justify-center items-center h-full py-20 mt-10">
          <h1 className="text-4xl md:text-6xl mb-4 font-bold">
            Hi, I am Kefyalew
          </h1>
          
          <p className="text-xl mt-4" style={{ fontFamily: 'monospace' }}>
            <Typewriter
              textStyle={{ fontSize: '25px', fontWeight: 'normal' }}
              startDelay={500}
              cursorColor="black"
              multiText={['Full Stack Web Developer']}
              multiTextDelay={1000}
              typeSpeed={100}
            />
          </p>
          <a
            href="#contact"
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-5 w-full flex justify-center">
        <a href="#about">
          <svg
            className="w-8 h-8 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
