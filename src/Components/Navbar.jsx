
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";
import ayusleeLogo from "../assets/ayuslee-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const vendor = JSON.parse(
    sessionStorage.getItem("vendor") || "null"
  );

  const customer = JSON.parse(
    sessionStorage.getItem("customer") || "null"
  );

  const isSignedIn = Boolean(
    (vendor && vendor.id) ||
    (customer && customer.userId)
  );

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleDashboard = () => {
    closeMenu();

    if (vendor && vendor.id) {
      navigate("/vendor-dashboard", {
        state: { vendorId: vendor.id },
      });
    } else if (customer && customer.userId) {
      navigate("/marketplace");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vendor");
    sessionStorage.removeItem("customer");

    closeMenu();
    toast.success("Logged out successfully.");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-brand">
        <Link to="/" className="brand-name" onClick={closeMenu}>
          <img src={ayusleeLogo} alt="Ayuslee Car Rentals" />
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <ul className={`navbar-links ${menuOpen ? "show-menu" : ""}`}>

        <li className="mobile-cancel">
          <button onClick={closeMenu} aria-label="Close menu">
            &times;
          </button>
        </li>

        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>

        <li>
          <Link to="/marketplace" onClick={closeMenu}>Marketplace</Link>
        </li>

        <li>
          <Link to="/all-vendors" onClick={closeMenu}>Our Vendors</Link>
        </li>

        <li>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
        </li>

        {/* MOBILE PROFILE AND LOGOUT */}
        {isSignedIn && (
          <li className="mobile-profile">
           

            <button
              className="mobile-logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        )}

        {/* MOBILE LOGIN AND SIGNUP */}
        {!isSignedIn && (
          <li className="mobile-auth">
            <button
              className="login-button"
              onClick={() => {
                closeMenu();
                navigate("/vendor-login");
              }}
            >
              Log In
            </button>

            <button
              className="signup-button"
              onClick={() => {
                closeMenu();
                navigate("/user-register");
              }}
            >
              Sign Up
            </button>
          </li>
        )}
      </ul>

      {/* DESKTOP ACTIONS AND MOBILE HAMBURGER */}
      <div className="navbar-actions">

        {!isSignedIn && (
          <>
            <button
              className="login-button"
              onClick={() => navigate("/vendor-login")}
            >
              Log In
            </button>

            <button
              className="signup-button"
              onClick={() => navigate("/user-register")}
            >
              Sign Up
            </button>
          </>
        )}

        {isSignedIn && (
          <>
            <button
              className="profile-button desktop-profile"
              onClick={handleDashboard}
              title={vendor ? "Vendor Dashboard" : "My Profile"}
              aria-label={vendor ? "Vendor Dashboard" : "My Profile"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </button>

            <button
              className="desktop-logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
