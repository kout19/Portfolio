import React from "react";
import { motion } from "framer-motion";
import saccoImg from "../assets/projects/SACCO.PNG";
import bookImg from "../assets/projects/Book.PNG";

const projects = [
  {
    title: "SACCO Management System",
    description:
      "A full-featured SACCO platform handling member registration, loan processing, savings tracking, and reporting.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: saccoImg,
    github: "https://github.com/kout19/sacco-system",
    liveDemo: "#",
  },
  {
    title: "Book Rental System",
    description:
      "A modern rental platform for managing book inventory, user rentals, due dates, and return workflows.",
    tech: ["React", "Node.js", "MongoDB"],
    image: bookImg,
    github: "https://github.com/kout19/Book_Rental",
    liveDemo: "https://book-rental-one.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-32 bg-[#120022] overflow-hidden  h-full"
    >
      {/* section glow */}
      <div className="absolute left-[100px] bottom-[-100px] w-[600px] h-[600px] bg-purple-700/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-20">
          Featured <span className="text-[#9B4DFF]">Projects</span>
        </h2>

        <div className="space-y-28">
          {projects.map((project, index) => {
            const isReverse = index % 2 === 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                {/* GRID CONTAINER */}
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center w-full max-w-5xl ${
                    isReverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* ================= IMAGE ================= */}
                  <div className="relative flex justify-center ">
                    {/* glow */}
                    <div className="absolute -inset-2 bg-[#9B4DFF]/15 blur-[60px] rounded-full pointer-events-none" />

                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        transform:
                          "perspective(1200px) rotateY(-6deg) rotateX(3deg)",
                      }}
                      className="relative w-[400px] ml-8 max-w-sm md:max-w-md rounded-2xl border border-purple-900/40 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* ================= DESCRIPTION ================= */}
                  <div className="relative flex justify-center  h-[190px] text-sm ">
                    <div
                      className={`
                                relative
                                w-full max-w-sm
                                p-7 rounded-2xl
                                backdrop-blur-2xl
                                bg-gradient-to-r from-[#1A0033]/75 to-[#240046]/75
                                border border-purple-700/40
                                shadow-[0_20px_50px_rgba(155,77,255,0.35)]
                                transition-all duration-500 hover:scale-105
                                text-center lg:text-left

                                /* ⭐ PERFECT SYMMETRIC OVERLAP */
                                lg:translate-x-[-40px]
                                ${isReverse ? "lg:translate-x-[40px]" : ""}
                              `}
                      style={{
                        transform:
                          "perspective(1200px) rotateY(6deg) translateZ(10px)",
                      }}
                    >
                      <p className="text-sm text-purple-300 mb-2">
                        Featured Project
                      </p>

                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                        {project.title}
                      </h3>

                      <p className="text-purple-200 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* tech */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-[#0B0016] text-purple-300 border border-purple-800/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* links */}
                      <div className="flex justify-center lg:justify-start gap-6">
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9B4DFF] hover:text-white transition"
                        >
                          Live Demo →
                        </a>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-300 hover:text-white transition"
                        >
                          GitHub →
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* ================================= */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
