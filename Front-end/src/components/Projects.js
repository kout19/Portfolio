import React from "react";
import { motion } from "framer-motion";
const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio showcasing my skills and projects",
    tech: [" React", "Tailwind CSS", "Node.js"],
    liveDemo: "https://example.com",
    github:"https://github.com/",
  },
  {
    title: "Amazon Clone",
    description: "A fully functional clone of the Amazon e-commerce platform. This project replicates the key features of Amazon, including product listings, user authentication, and a shopping cart.",
    tech: [" React", " CSS", " Node.js"," Firebase"],
    liveDemo: "https://example.com",
    github:"https://github.com/kout19/amazon-clone",
  },
  {
    title: "Netflix Clone",
    description: "A clone of Netflix's user interface to display movies and TV shows. This project replicates Netflix’s sleek, responsive design.",
    tech: [" React", " CSS", " API"],
    liveDemo: "https://example.com",
    github:"https://github.com/",
  },
  {
    title: "Apple Clone",
    description: "A clone of Apple's website user interface just for practice purpose  to HTML and CSS.",
    tech: ["HTML", " CSS"],
    liveDemo: "https://example.com",
    github:"https://github.com/",
    
  }
];
const Projects = () => {
  return (
    <div id="projects" className="projects-section p-6 bg-gradient-to-r from-yellow-700 via-red-500 to-teal-600 ">
      <h2 className="text-2xl font-bold  mb-4 flex justify-center">Projects</h2>
      < motion.div className="grid gap-6 md:grid-cols-2 text-white"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        >
        {projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg  shadow-lg">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
            <p className="text-sm mt-2"><strong>Tech:</strong>{project.tech.join(",")}</p>
            <div className="mt-4 flex space-x-4">
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-500">Live Demo</a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">Github</a>
            </div>
          </div>
        ))}
      
      </motion.div>
    </div>
  );
}
export default Projects;