import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  const linkColumns = [
    ["Audio Description", "Investor Relations", "Legal Notices"],
    ["Help Centre", "Jobs", "Cookie Preferences"],
    ["Gift Cards", "Terms of Use", "Corporate Information"],
    ["Media Centre", "Privacy", "Contact Us"],
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube size={20} />
          </a>
        </div>

        <div className={styles.linkGrid}>
          {linkColumns.map((column, colIndex) => (
            <ul className={styles.linkColumn} key={colIndex}>
              {column.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className={styles.copyright}>© 1997–2026 Netflix, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
