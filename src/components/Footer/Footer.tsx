import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__menu menu">
          <a className="menu__logo" href="/">
            <img src={logo} />
          </a>
          <div className="menu__nav footer__nav">{renderNavigation()}</div>
        </div>
      </div>
    </footer>
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
    </nav>
  );
};

export default Footer;
