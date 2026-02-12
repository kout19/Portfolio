import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio showcasing my skills and projects.",
    tech: ["React", "Tailwind CSS", "Node.js"],
    liveDemo: "https://example.com",
    github: "https://github.com/kout19/portfolio",
  },
  {
    title: "Amazon Clone",
    description:
      "A fully functional Amazon clone including product listings, authentication, and cart system.",
    tech: ["React", "CSS", "Node.js", "Firebase"],
    liveDemo: "https://example.com",
    github: "https://github.com/kout19/amazon-clone",
  },
  {
    title: "Netflix Clone",
    description:
      "A Netflix UI replica with responsive layout and movie data integration.",
    tech: ["React", "CSS", "API"],
    liveDemo: "https://example.com",
    github: "https://github.com/kout19/netflix-clone",
  },
  {
    title: "Apple Clone",
    description:
      "Apple website UI recreation built with HTML and CSS for design practice.",
    tech: ["HTML", "CSS"],
    liveDemo: "https://adorable-genie-18a6f9.netlify.app/",
    github: "https://github.com/kout19/Apple-replica",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-24 bg-[#120022] overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className="absolute left-0 bottom-0 w-[600px] h-[600px] 
      bg-purple-700/20 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-16">
          Featured <span className="text-[#9B4DFF]">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl 
              bg-gradient-to-br from-[#1A0033] to-[#240046]
              border border-purple-900/40
              hover:border-[#9B4DFF]/60
              transition-all duration-300
              hover:scale-[1.02]"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-4">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-purple-200 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full 
                    bg-[#0B0016] text-purple-300 
                    border border-purple-800/50"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9B4DFF] hover:text-white transition-colors"
                >
                  Live Demo →
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
