import React, { useState, useEffect } from "react";
import "./FAQ.css";

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
    <section id="faq" className="faq">
      <div className="container">
        <h2>FAQ</h2>
        <div className="faq__accordion">
          <div
            onClick={toggleAccordion1}
            className={`question${isExpanded1 ? " expanded" : ""}`}
          >
            <span className="line"></span>
            <p className="question__number">Question 1</p>
            {isExpanded1 && (
              <p className="question__answer">
                Long answer to the first question
              </p>
            )}
          </div>
          <div
            onClick={toggleAccordion2}
            className={`question${isExpanded2 ? " expanded" : ""}`}
          >
            <span className="line"></span>
            <p className="question__number">Question 2</p>
            {isExpanded2 && (
              <p className="question__answer">
                Long answer to the second question
              </p>
            )}
          </div>
          <span className="faq__line line"></span>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
