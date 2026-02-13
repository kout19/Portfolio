import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/about";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/ContactForm";
import Footer from "../components/Footer";
import SingInForms from "../components/singin";

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <Header onSignInClick={toggleFormVisibility} />
      <Hero />
      <SingInForms visible={isFormVisible} onClose={closeForm} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
