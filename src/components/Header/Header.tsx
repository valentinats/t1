import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import burger from "../Burger/Burger.module.css";
import logo from "../../assets/logo.svg"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add(styles.body_fixed); 
    } else {
      document.body.classList.remove(styles.body_fixed);
    }
    return () => {
      document.body.classList.remove(styles.body_fixed);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderMenu = () => {
    return (
      <div className={styles.menu}>
        <a className={styles.menu__logo} href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div
          className={`${[styles.menu__nav, styles.header__nav].join(' ')} ${
            isMenuOpen ? "menu__nav_open" : ""
          }`}
        >
          {renderNavigation()}
        </div>
        <div
          className={`${burger.burger__btn} ${isMenuOpen ? burger.burger__btn_open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
        </div>
      </div>
    );
  };

  const renderNavigation = () => {
    const links = [
      { href: "#catalog", text: "Catalog" },
      { href: "#about", text: "About us" },
      { href: "#productSelection", text: "Product selection" },
      { href: "#team", text: "Our team" },
      { href: "#faq", text: "FAQ" },
    ];

    return (
      <nav className={[styles.nav, burger.nav].join(' ')}>
        {links.map((link, index) => (
          <a key={index} href={link.href}>
            {link.text}
          </a>
        ))}
        <Link to="/t1/staff">For staff</Link>
      </nav>
    );
  };

  return (
    <section className={styles.primary}>
      <div className={styles.container}>
        {renderMenu()}
        <span className={styles.line}></span>
        <h1 className={styles.primary__title}>
          Any products from famous brands with worldwide delivery
        </h1>
        <p className={styles.primary__text}>
          We sell smartphones, laptops, clothes, shoes, and many other products
          at low prices
        </p>
        <a className={styles.primary__btn} href="/">
          Go to shopping
        </a>
      </div>

      <div className={`${burger.burger} ${isMenuOpen ? burger.burger_open : ""}`}>
        <div className={burger.burger__content}>
          <div className={burger.burger__logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={`${isMenuOpen ? burger.burger__nav : ""}`}>
            {renderNavigation()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
