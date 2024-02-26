import React from "react";
// import main from "../../index.module.css"
import styles from "./Footer.module.css";
import footer from "../Header/Header.module.css";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={[styles["footer__menu"], footer.menu].join(" ")}>
          <a className={footer.menu__logo} href="/">
            <img src={logo} />
          </a>
          <div className={[footer["menu__nav"], styles.footer__nav].join(" ")}>
            {renderNavigation()}
          </div>
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
    <nav className={footer.nav}>
      {links.map((link, index) => (
        <a key={index} href={link.href}>
          {link.text}
        </a>
      ))}
    </nav>
  );
};

export default Footer;
