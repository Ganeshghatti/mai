import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <section id="hero">
      <h1 className="hero-title">Mai health advisor</h1>
      <p className="hero-sub">
        Personalized health guidance for informed decisions.
      </p>
      <div className="hero-btn">
        <a href="#app" className="hero-get-started-button">
          Get Started
        </a>
        <a href="#contact" className="hero-contact-us-button">
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default Hero;
