import React from "react";
import Typewriter from "react-typewriter-effect";
import avatar from "../assets/images/avater.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center 
      bg-[#0B0016] overflow-hidden pt-4"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* LEFT SIDE — AVATAR */}
          <div className="flex justify-center relative mt-16">
            {/* Soft halo */}
            <div className="absolute w-32 h-32 bg-[#9B4DFF]/40 rounded-full blur-[70px]" />

            <img
              src={avatar}
              alt="Kefyalew Avatar"
              className="relative w-24 h-24 md:w-32 md:h-32
              rounded-full object-cover border border-purple-500/40 "
            />
          </div>

          {/* RIGHT SIDE — TEXT */}
          <div className="text-center text-white max-w-xl">
            <p className="text-purple-300 mb-3 tracking-wide text-sm md:text-base">
              Hi, I am <span className="text-[#9B4DFF]">Kefyalew</span>
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              I’m a Software Engineer.
            </h1>

            {/* Looping Typewriter */}
            <div className="mt-4 text-base md:text-lg text-purple-200">
              <Typewriter
                textStyle={{ fontSize: "20px" }}
                startDelay={500}
                cursorColor="#9B4DFF"
                multiText={[
                  "Full Stack Web Developer",
                  "Technical Instructor",
                ]}
                multiTextDelay={1000}
                typeSpeed={80}
                multiTextLoop={true}
              />
            </div>

            <p className="mt-5 text-purple-300 leading-relaxed text-sm md:text-base">
              A passionate full-stack developer building meaningful and
              high-performance digital products that balance user experience and{" "}
              <span className="text-[#9B4DFF] inline-block">
                <Typewriter
                  textStyle={{ fontSize: "16px", display: "inline" }}
                  startDelay={500}
                  cursorColor="#9B4DFF"
                  multiText={[
                    "business goals.",
                    "business impact.",
                    "measurable outcomes.",
                  ]}
                  multiTextDelay={1900}
                  typeSpeed={80}
                />
              </span>
            </p>

            <div className="mt-6">
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-md text-sm md:text-base font-medium text-white
                bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF]
                hover:opacity-90 transition-all duration-300"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
