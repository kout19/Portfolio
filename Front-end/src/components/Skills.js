import React, { useState } from "react";
import "devicon/devicon.min.css";
import { motion } from "framer-motion";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const categories = {
    frontend: [
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "React", icon: "devicon-react-original colored" },
      { name: "jQuery", icon: "devicon-jquery-plain colored" },
    ],
    backend: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Express", icon: "devicon-express-original colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
    ],
    database: [
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
      { name: "SQLite", icon: "devicon-sqlite-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    ],
    tools: [
      { name: "Stripe", icon: "devicon-stripe-plain colored" },
      { name: "npm", icon: "devicon-npm-original-wordmark colored" },
      { name: "REST", icon: "devicon-postgresql-plain colored" },
      { name: "Postman", icon: "devicon-postman-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
    ],
  };

  return (
    <section
      id="skills"
      className="relative py-24 bg-[#0B0016] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-20 w-[500px] h-[500px] 
      bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-12">
          My <span className="text-[#9B4DFF]">Skills</span>
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300
              ${
                activeCategory === key
                  ? "bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF] text-white"
                  : "bg-[#1A0033] text-purple-300 hover:text-white hover:bg-[#240046]"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories[activeCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center 
              p-6 rounded-xl 
              bg-gradient-to-br from-[#1A0033] to-[#240046]
              border border-purple-900/40
              hover:border-[#9B4DFF]/60
              transition-all duration-300
              hover:scale-105"
            >
              <i className={`${skill.icon} text-4xl mb-3`} />
              <p className="text-purple-200 text-sm">{skill.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
