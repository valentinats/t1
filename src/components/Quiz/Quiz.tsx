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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("API connection error.");
      });
  }, []);

  return (
    <div className="options-card">
      {isLoading ? (
        <div className="load-row">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
      )}
    </div>
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
