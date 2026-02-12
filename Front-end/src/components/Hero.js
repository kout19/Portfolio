import React from "react";
import Typewriter from "react-typewriter-effect";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center 
      bg-[#0B0016] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        {/* Small Intro */}
        <p className="text-purple-300 mb-4 tracking-wide">
          Hello! I am Kefyalew
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          I’m a Software Engineer.
        </h1>

        {/* Typewriter Line */}
        <div className="mt-6 text-lg md:text-xl text-purple-200">
          <Typewriter
            textStyle={{ fontSize: "22px" }}
            startDelay={500}
            cursorColor="#9B4DFF"
            multiText={[
              "Software Engineer",
              "Full Stack Web Developer",
              "Technical Instructor"
              ,
            ]}
            multiTextDelay={1000}
            typeSpeed={80}
            multiTextLoop={true}
          />
        </div>

        {/* Description */}
        <p className="mt-6 text-purple-300 max-w-2xl mx-auto leading-relaxed">
          A passionate full-stack developer building meaningful and
          high-performance digital products that balance user experience and
          business goals.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <a
            href="#contact"
            className="px-8 py-3 rounded-md font-medium text-white
            bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF]
            hover:opacity-90 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <a href="#about">
          <svg
            className="w-8 h-8 text-purple-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
