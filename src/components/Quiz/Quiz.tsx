import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css"; 

const Quiz = () => {
  return (
    <section id="productSelection" className={styles.quiz}>
      <div className={[styles['container'], styles.quiz__container].join(' ')}>
        <div className={styles.quiz__inner}>
          <p className={styles.quiz__title}>
            We will select the perfect product for you
          </p>
          <p className={styles.quiz__text}>
            Answer three questions and we will send you a catalog with the most
            suitable products for you.
          </p>
          <span className={[styles['quiz__line'], styles.line].join(' ')}></span>
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
    <div>
      <p className={styles.options__title}>
        What type of product are you considering?
      </p>
      <OptionsCard />
      <span className={[styles['quiz__line'], styles.line].join(' ')}></span>
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
        <div className={styles.load__row}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.options__list}>
          {categories.map((category) => (
            <li key={category} className={styles.options__card}>
              <div className={styles.checkbox} aria-label="Product selection checkbox">
                <input
                  className={styles.options__checkbox}
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
    <div className={styles.quiz__pages}>
      <button
        className={[styles['quiz__btn'], styles.btn].join(' ')}
        aria-label="A button to go to the next page"
      >
        Next step
      </button>
      <p className={styles.pages__count}>1 of 2</p>
    </div>
  );
};

export default Quiz;
