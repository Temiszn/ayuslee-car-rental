import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <p className="about-label">WHO WE ARE</p>

          <h1>
            More Than Just a Ride.
            <span> A Better Journey.</span>
          </h1>

          <p>
            At Ayuslee Car Rentals, we make it easier to find,
            rent and buy quality vehicles. Whether it's a daily
            trip or a new adventure, we're here to get you moving.
          </p>

          <button onClick={() => navigate("/marketplace")}>
            Explore Our Cars
          </button>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="about-story">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury vehicle"
          />
        </div>

        <div className="about-story-content">
          <p className="about-label">ABOUT AYUSLEE</p>

          <h2>Making Every Journey Count</h2>

          <p>
            Ayuslee Car Rentals is a car rental and marketplace
            platform created to make vehicle access simple and
            convenient.
          </p>

          <p>
            We connect customers with vehicle options for rent
            and purchase, while giving vendors a platform to
            showcase their cars and reach potential customers.
          </p>

          <button onClick={() => navigate("/contact")}>
            Get In Touch
          </button>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-values">
        <div className="about-values-heading">
          <p className="about-label">WHAT DRIVES US</p>
          <h2>Built Around Better Experiences.</h2>
        </div>

        <div className="about-mission">
          <div className="about-value-card">
            <span>01</span>
            <h3>Our Mission</h3>
            <p>
              To make renting and buying vehicles more accessible,
              convenient and reliable for everyone.
            </p>
          </div>

          <div className="about-value-card">
            <span>02</span>
            <h3>Our Vision</h3>
            <p>
              To build a trusted platform that connects car owners
              and customers through better vehicle experiences.
            </p>
          </div>

          <div className="about-value-card">
            <span>03</span>
            <h3>Our Promise</h3>
            <p>
              To provide a straightforward experience for customers
              and vendors at every step.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta">
        <p className="about-label">READY TO GET MOVING?</p>

        <h2>Your Next Journey Starts Here.</h2>

        <p>Find a vehicle that fits your plans.</p>

        <button onClick={() => navigate("/marketplace")}>
          Browse Marketplace
        </button>
      </section>

    </div>
  );
};

export default About;