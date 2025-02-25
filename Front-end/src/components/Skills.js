import React, { useState } from 'react'
import 'devicon/devicon.min.css';

const Skills = () => {
  const [showSkills, setShowSkills] = useState(true);
  const [activeButton, setActiveButton] = useState('button');
  const frontEndSkills = [
    { name: "HTML", icon: "devicon-html5-plain colored" },
    { name: "CSS", icon: "devicon-css3-plain colored" },
    { name: "Tailwind", icon: "devicon-tailwind-original colored" },
    {name:"Bootstrap",icon:"devicon-bootstrap-plain colored"},
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "React", icon: "devicon-react-original colored" }
  ];
  const backEndSkills = [
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "express", icon: "devicon-express-original colored" },
    {
      name: "PHP", icon:"devicon-php-plain colored"},
    { name: "mongoDB", icon: "devicon-mongodb-plain colored" }
  ];
  const versionControlSkills = [
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Github", icon: "devicon-github-original colored" },
  ];
  const apiSkills = [
    { name: "REST", icon: "devicon-api-plain colored" },
    { name: "graphQL", icon: "devicon-graphql-plain colored" },
  ];
  const toolsSkills =[
    { name: "Docker", icon: "devicon-docker-plain colored" },
    {name:"npm", icon:"devicon-npm-original-wordmark colored"}, 
  ]
  const renderSkills = () => {
    switch (showSkills) {
      case "frontend":
        return frontEndSkills;
      case "backend":
        return backEndSkills;
      case "versioncontrol":
        return versionControlSkills;
      case "api":
        return apiSkills;
      case "tools":
        return toolsSkills;
      default:
        return frontEndSkills;
    }
  };

  return (
    <section id="skills" className="skills-section  bg-blue-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
          <button onClick={() => setShowSkills("frontend")}
            className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-auto">
            Front End
          </button>
          <button onClick={() => setShowSkills("backend")}
            className="px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-auto">
            Back End
          </button>
        <button onClick={() => setShowSkills("versioncontrol")}
            className="px-1 py-1  w-auto bg-blue-500 text-white rounded-xl hover:bg-blue-600">
            Version Control
        </button>
         <button onClick={() => setShowSkills("api")}
            className="px-1 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-auto">
            APIs
        </button>
         <button onClick={() => setShowSkills("tools")}
            className="px-1 py-1 bg-blue-500  text-white rounded-xl hover:bg-blue-600 w-auto">
            Tools
        </button>
        </div>
        
       <div className="skills-icon  grid grid-cols-5 lg:grid-cols-8   gap-2 ">
          {renderSkills().map((skill) => (
            <div key={skill.name}
              className={`text-center rounded text-white border mt-3 lg:w-[100px] sm:p-2`}>
              <i className={`${skill.icon} text-2xl`}/>
              <p className="mt-1">{skill.name}</p>
            </div>
          ))}
        </div>
     </div>
    </section>

  );
}
export default Skills;