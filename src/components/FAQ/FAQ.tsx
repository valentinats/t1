import React, { useState, useEffect } from "react";
import styles from "./FAQ.module.css";

const Accordion: React.FC = () => {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  useEffect(() => {
    setIsExpanded1(true);
  }, []);

  const toggleAccordion1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleAccordion2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <h2>FAQ</h2>
        <div className="faq__accordion">
          <div
            onClick={toggleAccordion1}
            className={`${styles.question} ${isExpanded1 ? styles.expanded : ""}`}
          >
            <span className={styles.line}></span>
            <p className={styles.question__number}>Question 1</p>
            {isExpanded1 && (
              <p className={styles.question__answer}>
                Long answer to the first question
              </p>
            )}
          </div>
          <div
            onClick={toggleAccordion2}
            className={`${styles.question} ${isExpanded2 ? styles.expanded : ""}`}
          >
            <span className={styles.line}></span>
            <p className={styles.question__number}>Question 2</p>
            {isExpanded2 && (
              <p className={styles.question__answer}>
                Long answer to the second question
              </p>
            )}
          </div>
          <span className={[styles['faq__line'], styles.line].join(' ')}></span>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
