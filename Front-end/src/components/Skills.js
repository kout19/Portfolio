import React, { useState } from 'react'
import 'devicon/devicon.min.css';
import { motion } from "framer-motion";

const Skills = () => {
  const [showSkills, setShowSkills] = useState(true);
  const [activeButton, setActiveButton] = useState('button');
  const frontEndSkills = [
    { name: "HTML", icon: "devicon-html5-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "CSS", icon: "devicon-css3-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored", gradient: "from-red-500 to-yellow-500" },
    {name:"Bootstrap",icon:"devicon-bootstrap-plain colored", gradient: "from-red-500 to-yellow-500"},
    { name: "JavaScript", icon: "devicon-javascript-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "React", icon: "devicon-react-original colored", gradient: "from-red-500 to-yellow-500" },
    { name: "jQuery", icon: "devicon-jquery-plain colored", gradient: "from-red-500 to-yellow-500" },
  ];
  const backEndSkills = [
    { name: "Node.js", icon: "devicon-nodejs-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "Express", icon: "devicon-express-original colored", gradient: "from-red-500 to-yellow-500" },
    {
      name: "PHP", icon:"devicon-php-plain colored", gradient: "from-red-500 to-yellow-500"},
  ];
  const databaseSkills = [
    { name: "MySQL", icon: "devicon-mysql-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "firebase", icon: "devicon-firebase-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "SQLite", icon: "devicon-sqlite-plain colored", gradient: "from-red-500 to-yellow-500" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored", gradient: "from-red-500 to-yellow-500" },
  ];
  const toolsSkills =[
    { name: "Stripe", icon: "devicon-stripe-plain colored", gradient: "from-red-500 to-yellow-500" },
    {name:"npm", icon:"devicon-npm-original-wordmark colored", gradient: "from-red-500 to-yellow-500"}, 
    { name: "REST", icon: "devicon-postgresql-plain colored", gradient: "from-red-500 to-yellow-500" },
    {name: "Postman", icon:"devicon-postman-plain colored", gradient: "from-red-500 to-yellow-500"},
    { name: "Git", icon: "devicon-git-plain colored", gradient: "from-red-500 to-yellow-500" },
  ]
  const renderSkills = () => {
    switch (showSkills) {
      case "frontend":
        return frontEndSkills;
      case "backend":
        return backEndSkills;
        case "database":
        return databaseSkills;
      case "tools":
        return toolsSkills;
      default:
        return frontEndSkills;
    }
  };

  return (
    <section id="skills"
     className="skills-section bg-blue-900 py-8 min-h-[500px]  "> 
      <div className="max-w-7xl mx-auto px-3 ">
        <h2 className="text-3xl font-bold text-center mb-8 flex-grow">Skills</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 md:grid-cols-5">
          <button onClick={() => setShowSkills("frontend")}
            className="px-2 py-3 bg-blue-700 text-white rounded-sm hover:bg-blue-600 w-auto h-auto">
            Front End
          </button>
          <button onClick={() => setShowSkills("backend")}
            className="px-2 py-1 bg-blue-700 text-white rounded-sm hover:bg-blue-600 w-auto">
            Back End
          </button>
          <button onClick={() => setShowSkills("database")}
            className="px-2 py-1 bg-blue-700 text-white rounded-sm hover:bg-blue-600 w-auto">
            Database
          </button>
         <button onClick={() => setShowSkills("tools")}
            className="px-1 py-1 bg-blue-700  text-white rounded-sm hover:bg-blue-600 w-auto h-auto">
            Tools
        </button>
        </div>
        
       <div className="skills-icon grid grid-cols-4 lg:grid-cols-6 gap-2 h-32">
          {renderSkills().map((skill,index) => (

            <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.1 }}
             className={`flex flex-col mt-3 items-center p-5 rounded-xl 
              shadow-md bg-gradient-to-r ${skill.gradient} 
              text-white transition-transform transform 
              duration-300 hover:scale-110`}>
              <i className={`${skill.icon} text-2xl`}/>
              <p className="mt-1">{skill.name}</p>
            </motion.div>
          ))}
        </div>
     </div>
    </section>

  );
}
export default Skills;