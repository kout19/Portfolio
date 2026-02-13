import React from "react";
import "devicon/devicon.min.css";
import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Express", icon: "devicon-express-original" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "PHP", icon: "devicon-php-plain colored" },
];

const Skills = () => {
  const radius = 220;

  return (
    <section
      id="skills"
      className="relative py-24 bg-[#0B0016] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full " />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-white mb-20">
          My <span className="text-[#9B4DFF]">Tech Stack</span>
        </h2>

        <div className="relative flex items-center justify-center h-[300px]">
          {/* Center Core */}
          <div
            className="absolute w-40 h-40 rounded-full
            bg-gradient-to-br from-[#7B2FF7] to-[#9B4DFF]
            flex items-center justify-center
            text-white text-5xl font-bold
            shadow-[0_0_80px_rgba(155,77,255,0.6)]"
          >
            Σ
          </div>

          {/* 3D Perspective Wrapper */}
          <div
            className="absolute sm:w-[400px] sm:h-[400px] w-[300px] h-[300px]"
            style={{
              width: radius * 2,
              height: radius * 2,
              transform: "perspective(1000px) rotateX(65deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Orbit Ring */}
            <div
              className="absolute border border-purple-800/40 rounded-full"
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            {/* Rotating Orbit */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {skills.map((skill, index) => {
                const angle = (360 / skills.length) * index;

                return (
                  <div
                    key={skill.name}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `
                        rotate(${angle}deg)
                        translateY(-${radius}px)
                        rotate(-${angle}deg)
                      `,
                      transformOrigin: "center",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full
                      bg-gradient-to-br from-[#1A0033] to-[#240046]
                      border border-purple-900/40
                      hover:border-[#9B4DFF]/60
                      flex items-center justify-center
                      shadow-lg transition duration-300 hover:scale-110"
                    >
                      <i className={`${skill.icon} text-3xl`} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
