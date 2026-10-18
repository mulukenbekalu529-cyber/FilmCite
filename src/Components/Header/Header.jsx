import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { FiSearch, FiBell, FiUser, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [accountName, setAccountName] = useState("Movie Lover");
  const [accountEmail, setAccountEmail] = useState("user@example.com");

  const navigate = useNavigate();

  const notificationCount = 5;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Save account form details in this session.
  // This is a front-end demonstration, not a real account update.
  const handleAccountSave = (event) => {
    event.preventDefault();

    alert("Account details saved for this session!");
    setIsAccountOpen(false);
  };

  // Close the profile dropdown and open Account.
  const handleAccountClick = () => {
    setIsProfileOpen(false);
    setIsHelpOpen(false);
    setIsAccountOpen(true);
  };

  // Close the profile dropdown and open Help Center.
  const handleHelpClick = () => {
    setIsProfileOpen(false);
    setIsAccountOpen(false);
    setIsHelpOpen(true);
  };

  // Sign out and return to Home.
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsProfileOpen(false);
    setIsAccountOpen(false);
    setIsHelpOpen(false);

    navigate("/");
  };

  return (
    <header
      className={`${style.header} ${isScrolled ? style.headerScrolled : ""}`}
    >
      {/* LEFT SIDE */}
      <div className={style.headerLeft}>
        {/* LOGO */}
        <div className={style.logo}>
          <span className={style.logoIcon}>▶</span>
          <span className={style.logoText}>FILMCITE</span>
        </div>

        {/* NAVIGATION */}
        <nav className={style.navMenu}>
          <Link to="/" className={style.navLink}>
            Home
          </Link>

          <Link to="" className={style.navLink}>
            TV Shows
          </Link>

          <Link to="" className={style.navLink}>
            Movies
          </Link>

          <Link to="" className={style.navLink}>
            New & Popular
          </Link>

          <Link to="/my-list" className={style.navLink}>
            My List
          </Link>

          <Link to="" className={style.navLink}>
            Browse by Language
          </Link>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className={style.headerRight}>
        {/* SEARCH */}
        <div className={style.searchContainer}>
          <button
            type="button"
            className={style.searchButton}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          {isSearchOpen && (
            <input
              type="text"
              className={style.searchInput}
              placeholder="Search movies and shows"
              autoFocus
            />
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className={style.notificationContainer}>
          <button
            type="button"
            className={style.notificationButton}
            aria-label="Notifications"
          >
            <FiBell />

            {notificationCount > 0 && (
              <span className={style.notificationBadge}>
                {notificationCount > 5 ? "5+" : notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* PROFILE */}
        <div className={style.profileContainer}>
          <button
            type="button"
            className={style.profileButton}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Profile"
          >
            <FiUser />
          </button>

          <button
            type="button"
            className={`${style.dropdownArrow} ${
              isProfileOpen ? style.arrowUp : ""
            }`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Profile menu"
          >
            <FiChevronDown />
          </button>

          {/* PROFILE DROPDOWN */}
          {isProfileOpen && (
            <div className={style.profileDropdown}>
              <button
                type="button"
                className={style.dropdownItem}
                onClick={handleAccountClick}
              >
                Account
              </button>

              <div className={style.dropdownLine}></div>

              <button
                type="button"
                className={style.dropdownItem}
                onClick={handleHelpClick}
              >
                Help Center
              </button>

              <div className={style.dropdownLine}></div>

              <button
                type="button"
                className={style.dropdownItem}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* ACCOUNT OVERLAY */}
        {isAccountOpen && (
          <div
            className={style.accountOverlay}
            onClick={() => setIsAccountOpen(false)}
          >
            <div
              className={style.accountForm}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={style.modalClose}
                onClick={() => setIsAccountOpen(false)}
                aria-label="Close account form"
              >
                ✕
              </button>

              <h2>My Account</h2>
              <p className={style.modalDescription}>
                Manage your account information.
              </p>

              <form onSubmit={handleAccountSave}>
                <label htmlFor="accountName">Name</label>

                <input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(event) => setAccountName(event.target.value)}
                  required
                />

                <label htmlFor="accountEmail">Email</label>

                <input
                  id="accountEmail"
                  type="email"
                  value={accountEmail}
                  onChange={(event) => setAccountEmail(event.target.value)}
                  required
                />

                <button type="submit" className={style.primaryButton}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* HELP CENTER OVERLAY */}
        {isHelpOpen && (
          <div
            className={style.accountOverlay}
            onClick={() => setIsHelpOpen(false)}
          >
            <div
              className={style.accountForm}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={style.modalClose}
                onClick={() => setIsHelpOpen(false)}
                aria-label="Close Help Center"
              >
                ✕
              </button>

              <h2>Help Center</h2>

              <p className={style.modalDescription}>
                Need help using Cine Stream Hub? Here are some quick tips.
              </p>

              <div className={style.helpSection}>
                <h3>Finding movies</h3>
                <p>
                  Browse the Home page to discover trending movies and shows.
                </p>

                <h3>My List</h3>
                <p>Use the My List button on a movie to save it for later.</p>

                <h3>Account</h3>
                <p>
                  Open the profile menu and select Account to edit the displayed
                  name and email.
                </p>
              </div>

              <button
                type="button"
                className={style.primaryButton}
                onClick={() => setIsHelpOpen(false)}
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
