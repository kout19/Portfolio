import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative py-24 bg-[#120022] overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
      bg-purple-700/20 blur-[140px] rounded-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto px-6 text-center"
      >
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-10">
          About <span className="text-[#9B4DFF]">Me</span>
        </h2>

        {/* Content Card */}
        <div
          className="bg-gradient-to-br from-[#1A0033] to-[#240046] 
        p-8 md:p-12 rounded-xl border border-purple-900/40 
        backdrop-blur-lg shadow-lg"
        >
          <p className="text-purple-200 text-lg leading-relaxed mb-6">
            I am a passionate Full Stack Web Developer focused on building
            dynamic and scalable web applications. With experience in both
            frontend and backend technologies, I enjoy transforming ideas into
            functional, elegant digital solutions.
          </p>

          <p className="text-purple-300 text-lg leading-relaxed">
            I love working on projects that challenge creativity, performance,
            and user experience — constantly improving and refining my craft.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
