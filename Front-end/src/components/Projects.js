import React from "react";
const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio showcasing my skills and projects",
    tech: ["React", "Tailwind CSS", "Node.js"],
    liveDemo: "https://example.com",
    github:"https://github.com/my-repo",
  }
];
const Projects = () => {
  return (
    <div id="projects" className="projects-section p-6 ">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
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
      
      </div>
    </div>
  );
}
export default Projects;