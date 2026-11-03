
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import ayusleeLogo from "../assets/ayuslee-logo.png";

const Footer = () => {
  return (
    <footer className="ayuslee-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img
            src={ayusleeLogo}
            alt="Ayuslee Car Rentals Logo"
            className="footer-logo"
          />

          <p>
            Your journey, our priority. Discover quality vehicles
            and enjoy a better way to travel.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/cars">Our Cars</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-links">
          <h4>Get In Touch</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/all-vendors">Our Vendors</Link>
          <Link to="/vendor-login">Become a Vendor</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Ayuslee Car Rentals. All rights reserved.</p>
        <span>Drive with confidence.</span>
      </div>
    </footer>
  );
};

export default Footer;
