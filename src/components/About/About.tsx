import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <AboutDescription />
      </div>
    </section>
  );
};

const AboutDescription: React.FC = () => {
  return (
    <div className="about__desc">
      <h2>About us</h2>
      <p className="about__text">
        Every day a person has a choice what to spend his money on. Stores and
        websites offer an endless list of products. <br /> But we will help
        you make the right choice!
      </p>
      <AboutSignature />
    </div>
  );
};

const AboutSignature: React.FC = () => {
  return (
    <div className="about__signature">
      <span></span>
      <p>Goods4you</p>
    </div>
  );
};

export default About;
