import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, ChevronDown } from "lucide-react";

import styles from "./Header.module.css";
import logo from "../../assets/image/logo.png";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.Container}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Netflix" />
        </Link>

        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/tv-shows">
            TV Shows
          </Link>
          <Link className={styles.navLink} to="/movies">
            Movies
          </Link>
          <Link className={styles.navLink} to="/new-popular">
            New & Popular
          </Link>
          <Link className={styles.navLink} to="/my-list">
            My List
          </Link>
          <Link className={styles.navLink} to="/browse-language">
            Browse by Language
          </Link>
        </nav>

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={styles.searchButton}
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Movie Title"
                className={styles.searchInput}
              />
            )}
          </div>

          <button className={styles.iconButton}>
            <Bell size={20} />
            <span className={styles.notificationBadge}>4</span>
          </button>

          <div className={styles.profileContainer}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={styles.profileButton}
            >
              <div className={styles.userAvatar}>
                <User size={20} />
              </div>
              <ChevronDown size={20} />
            </button>
            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <Link className={styles.profileMenuItem} to="/account">
                  Account
                </Link>
                <Link className={styles.profileMenuItem} to="/help">
                  Help Center
                </Link>
                <hr className={styles.profileMenuDivider} />
                <Link className={styles.profileMenuItem} to="/logout">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
