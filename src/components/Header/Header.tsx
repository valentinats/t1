import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";  
import logo from "../../assets/logo.svg"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("body_fixed");
    } else {
      document.body.classList.remove("body_fixed");
    }
    return () => {
      document.body.classList.remove("body_fixed");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderMenu = () => {
    return (
      <div className="menu">
        <a className="menu__logo" href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div
          className={`header__nav menu__nav ${
            isMenuOpen ? "menu__nav_open" : ""
          }`}
        >
          {renderNavigation()}
        </div>
        <div
          className={`burger__btn ${isMenuOpen ? "burger__btn_open" : ""}`}
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
      <nav className="nav">
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
    <section className="primary">
      <div className="container">
        {renderMenu()}
        <span className="line"></span>
        <h1 className="primary__title">
          Any products from famous brands with worldwide delivery
        </h1>
        <p className="primary__text">
          We sell smartphones, laptops, clothes, shoes, and many other products
          at low prices
        </p>
        <a className="primary__btn btn" href="/">
          Go to shopping
        </a>
      </div>

      <div className={`burger ${isMenuOpen ? "burger_open" : ""}`}>
        <div className="burger__content">
          <div className="burger__logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className={`${isMenuOpen ? "burger__nav" : ""}`}>
            {renderNavigation()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
