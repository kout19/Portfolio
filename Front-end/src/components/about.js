import React from "react";
import {motion} from "framer-motion";
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <motion.div 
      initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
      whileInView={{ opacity: 1, y: 0 }} // Animate into view
      transition={{ duration: 1 }} // Smooth transition
      viewport={{ once: true }}
      className="about-content max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <p className="text-lg text-gray-700">
          I am a passionate Full Stack Web Developer with a focus
           creating dynamic web applications. 
           With exprience in both front-end and back-end technologies, 
           I love bringing ideas to life throuch code.
        </p>
        <p className="text-lg text-gray-700">
        I enjoy working on projects that push the boundaries of 
        web development and design.
        </p>
      </motion.div>
    </section>
  );
}

export default About;