import React from "react";
import styles from"./About.module.css";

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}> 
        <AboutDescription />
      </div>
    </section>
  );
};

const AboutDescription: React.FC = () => {
  return (
    <div className={styles.about__desc}>
      <h2>About us</h2>
      <p className={styles.about__text}>
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
    <div className={styles.about__signature}>
      <span></span>
      <p>Goods4you</p>
    </div>
  );
};

export default About;
