import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  return (
    <section id="productSelection" className="quiz">
      <div className="container quiz__container">
        <div className="quiz__inner">
          <p className="quiz__title">
            We will select the perfect product for you
          </p>
          <p className="quiz__text">
            Answer three questions and we will send you a catalog with the most
            suitable products for you.
          </p>
          <span className="quiz__line line"></span>
          <div className="quiz__options">
            <OptionsList />
            <OptionsPages />
          </div>
        </div>
      </div>
    </section>
  );
};

const OptionsList = () => {
  return (
    <div className="options__list">
      <p className="options__title">
        What type of product are you considering?
      </p>
      <OptionsCard />
      <span className="quiz__line line"></span>
    </div>
  );
};

const OptionsCard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <ul className="options-list">
      {categories.map((category) => (
        <li key={category} className="options-list__card">
          <div className="checkbox" aria-label="Product selection checkbox">
            <input
              className="options-list__checkbox"
              type="checkbox"
              id={category}
            ></input>
            <label htmlFor={category}>{category}</label>
          </div>
        </li>
      ))}
    </ul>
  );
};

const OptionsPages = () => {
  return (
    <div className="quiz__pages">
      <button
        className="quiz__btn btn"
        aria-label="A button to go to the next page"
      >
        Next step
      </button>
      <p className="pages-count">1 of 2</p>
    </div>
  );
};

export default Quiz;
