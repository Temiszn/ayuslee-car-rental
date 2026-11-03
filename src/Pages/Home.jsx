
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const API_URL =
  "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const DISCOUNT_DURATION = 30 * 24 * 60 * 60 * 1000;
const DISCOUNT_END_KEY = "ayusleeDiscountEnd";

const slides = [
  {
    number: "01",
    label: "PREMIUM EXECUTIVE EXPERIENCE",
    title: "Arrive in",
    highlight: "Elegance.",
    description:
      "Experience exceptional comfort and sophistication with premium executive vehicles.",
    button: "Explore Cars",
    image:
      "https://images.pexels.com/photos/17115620/pexels-photo-17115620.jpeg",
    alt: "Black Mercedes-Benz S-Class",
  },
  {
    number: "02",
    label: "LUXURY WITHOUT LIMITS",
    title: "Make Every",
    highlight: "Journey Count.",
    description:
      "Discover premium SUVs designed for comfort, confidence and unforgettable journeys.",
    button: "Find Your Ride",
    image:
      "https://images.pexels.com/photos/29906011/pexels-photo-29906011.jpeg",
    alt: "White Range Rover Vogue",
  },
  {
    number: "03",
    label: "PERFORMANCE MEETS STYLE",
    title: "Drive Beyond",
    highlight: "Ordinary.",
    description:
      "Discover vehicles that bring together exceptional performance and unmistakable style.",
    button: "Browse Marketplace",
    image:
      "https://images.pexels.com/photos/35290260/pexels-photo-35290260.jpeg",
    alt: "Silver Porsche 911 Carrera",
  },
  {
    number: "04",
    label: "THE AYUSLEE EXPERIENCE",
    title: "Luxury in",
    highlight: "Every Detail.",
    description:
      "More than just cars. Discover a better way to travel, explore and experience the road.",
    button: "Start Your Journey",
    image:
      "https://images.pexels.com/photos/15540368/pexels-photo-15540368.jpeg",
    alt: "Black BMW 7 Series",
  },
];

const Home = () => {
  const navigate = useNavigate();

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

  const [cars, setCars] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showDiscountPopup, setShowDiscountPopup] = useState(true);

  const [discountCountdown, setDiscountCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // FETCH FEATURED CARS
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch cars");
        }

        return response.json();
      })
      .then((data) => {
        setCars(
          data
            .filter((car) => car.availability === true)
            .slice(0, 3)
        );
      })
      .catch((error) =>
        console.log("Error fetching cars:", error)
      );
  }, []);

  // HERO SLIDER
  useEffect(() => {
    const slider = setInterval(() => {
      setActiveSlide(
        (current) => (current + 1) % slides.length
      );
    }, 4000);

    return () => clearInterval(slider);
  }, []);

  // DISCOUNT COUNTDOWN
  useEffect(() => {
    let endTime = Number(
      localStorage.getItem(DISCOUNT_END_KEY)
    );

    if (!endTime || Number.isNaN(endTime)) {
      endTime = Date.now() + DISCOUNT_DURATION;

      localStorage.setItem(
        DISCOUNT_END_KEY,
        String(endTime)
      );
    }

    const updateCountdown = () => {
      const difference = Math.max(
        0,
        endTime - Date.now()
      );

      setDiscountCountdown({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // CLOSE DISCOUNT POPUP
  const closeDiscountPopup = () => {
    setShowDiscountPopup(false);
  };

  // HERO SLIDER CONTROLS
  const nextSlide = () => {
    setActiveSlide(
      (current) => (current + 1) % slides.length
    );
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) =>
        (current - 1 + slides.length) % slides.length
    );
  };

  const currentSlide = slides[activeSlide];

  // DISCOUNT POPUP
  const discountPopup = showDiscountPopup
    ? createPortal(
        <div className="discount-overlay">
          <div
            className="discount-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="discount-title"
          >
            <button
              className="discount-close"
              onClick={closeDiscountPopup}
              aria-label="Close discount popup"
            >
              &times;
            </button>

            <span className="discount-label">
              EXCLUSIVE WELCOME OFFER
            </span>

            <h2 id="discount-title">
              Enjoy <span>5% OFF</span>
            </h2>

            <p className="discount-description">
              Make your next journey even more rewarding.
              Enjoy a special welcome discount on your next
              eligible booking with Ayuslee.
            </p>

            <div className="discount-divider"></div>

            <p className="discount-expiry">
              THIS OFFER ENDS IN
            </p>

            <div className="discount-countdown">
              <div>
                <strong>
                  {String(discountCountdown.days).padStart(2, "0")}
                </strong>
                <span>DAYS</span>
              </div>

              <div>
                <strong>
                  {String(discountCountdown.hours).padStart(2, "0")}
                </strong>
                <span>HOURS</span>
              </div>

              <div>
                <strong>
                  {String(discountCountdown.minutes).padStart(2, "0")}
                </strong>
                <span>MINUTES</span>
              </div>

              <div>
                <strong>
                  {String(discountCountdown.seconds).padStart(2, "0")}
                </strong>
                <span>SECONDS</span>
              </div>
            </div>

            <p className="discount-footer">
              YOUR JOURNEY. YOUR REWARD. AYUSLEE.
            </p>
          </div>
        </div>,
        document.body
      )
    : null;

useEffect(() => {
  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  if (!isMobile) return;

  const sections = document.querySelectorAll(
    ".home-page section:not(.home-hero)"
  );

  sections.forEach((section) => {
    section.classList.add("mobile-scroll-reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  return (
    <>
      {discountPopup}

      <div className="home-page">
        {/* FOUR-SLIDE HERO */}
        <section className="home-hero">
          {slides.map((slide, index) => (
            <div
              className={`hero-slide ${
                activeSlide === index ? "active" : ""
              }`}
              key={slide.number}
              aria-hidden={activeSlide !== index}
            >
              <img
                className="hero-slide-image"
                src={slide.image}
                alt={slide.alt}
              />

              <div className="hero-slide-overlay"></div>
            </div>
          ))}

          <div
            className="hero-slide-content"
            key={currentSlide.number}
          >
            <p className="hero-slide-counter">
              <span>{currentSlide.number}</span> / 04
              <i></i>
            </p>

            <p className="hero-label">
              {currentSlide.label}
            </p>

            <h1>
              {currentSlide.title}
              <br />
              <span>{currentSlide.highlight}</span>
            </h1>

            <p className="hero-description">
              {currentSlide.description}
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => navigate("/marketplace")}
              >
                {currentSlide.button} <span>→</span>
              </button>

              {!isSignedIn && (
                <button
                  className="secondary-button"
                  onClick={() => navigate("/vendor-register")}
                >
                  Become a Vendor
                </button>
              )}
            </div>
          </div>

          <button
            className="hero-arrow hero-arrow-left"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            className="hero-arrow hero-arrow-right"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.number}
                className={
                  activeSlide === index ? "active" : ""
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeSlide === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <div className="hero-bottom-note">
            <span>RENT</span>
            <i></i>
            <span>BUY</span>
            <i></i>
            <span>SELL</span>
          </div>
        </section>

{/* FEATURED CAR BRANDS */}
<section className="featured-brands">
  <div className="brands-heading">
    <span>THE WORLD'S FINEST AUTOMOTIVE MARQUES</span>
    <h2>Explore by Brand</h2>
    <p>Discover exceptional vehicles from the world's leading car manufacturers.</p>
  </div>

  <div className="brands-grid">
    {[
      {
        name: "Mercedes-Benz",
        logo: "mercedes-benz-logo.svg",
      },
      {
        name: "BMW",
        logo: "bmw-logo.svg",
      },
      {
        name: "Audi",
        logo: "audi-logo.svg",
      },
      {
        name: "Porsche",
        logo: "porsche-logo.svg",
      },
      {
        name: "Ferrari",
        logo: "ferrari-logo.svg",
      },
      {
        name: "Land Rover",
        logo: "land-rover-logo.svg",
      },
      {
        name: "Aston Martin",
        logo: "aston-martin-logo.svg",
      },
      {
        name: "Bentley",
        logo: "bentley-logo.svg",
      },
    ].map((brand) => (
      <a
        href="/marketplace"
        className="brand-card"
        key={brand.name}
        aria-label={`Explore ${brand.name} vehicles`}
      >
        <img
          src={`https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main/${brand.logo}`}
          alt={`${brand.name} logo`}
          loading="lazy"
        />
        <span>{brand.name}</span>
      </a>
    ))}
  </div>
</section>


        {/* FEATURED CARS */}
        <section className="featured-section">
          <div className="section-heading">
            <div>
              <p className="section-label">
                EXPLORE OUR COLLECTION
              </p>

              <h2>Featured Vehicles</h2>

              <p className="section-description">
                Find a vehicle that fits your journey and your plans.
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/marketplace")}
            >
              View All Cars →
            </button>
          </div>

          <div className="featured-grid">
            {cars.length > 0 ? (
              cars.map((car) => (
                <div className="featured-card" key={car.id}>
                  <div className="featured-image">
                    <img
                      src={car.image || car.imageUrl}
                      alt={car.name || "Available vehicle"}
                    />

                    <span className="car-status">
                      {car.listingType === "sale"
                        ? "For Sale"
                        : "For Rent"}
                    </span>
                  </div>

                  <div className="featured-info">
                    <p className="featured-brand">
                      {car.brand || "Quality Vehicle"}
                    </p>

                    <h3>{car.name}</h3>

                    <p className="featured-description">
                      {car.description ||
                        "Discover this available vehicle."}
                    </p>

                    <div className="featured-bottom">
                      <div>
                        <span className="price-label">
                          {car.listingType === "sale"
                            ? "Purchase price"
                            : "Rental price"}
                        </span>

                        <strong>
                          ₦
                          {Number(
                            car.listingType === "sale"
                              ? car.price
                              : car.rentalPrice || car.price
                          ).toLocaleString("en-NG")}

                          {car.listingType !== "sale" && (
                            <small> /day</small>
                          )}
                        </strong>
                      </div>

                      <button
                        className="view-car-button"
                        onClick={() =>
                          navigate(`/cars/${car.id}`)
                        }
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-featured-cars">
                <h3>Your next car awaits.</h3>

                <p>
                  Explore our marketplace to see vehicles currently
                  available for rent or purchase.
                </p>

                <button
                  className="primary-button"
                  onClick={() => navigate("/marketplace")}
                >
                  Browse Marketplace →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="benefits-section">
          <div className="benefits-intro">
            <p className="section-label">
              THE AYUSLEE EXPERIENCE
            </p>

            <h2>A simpler way to get on the road.</h2>

            <p>
              Whether you need a car for the weekend or are ready to own
              one, Ayuslee helps you discover your options in one place.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/about")}
            >
              Discover Ayuslee →
            </button>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-number">01</span>

              <div>
                <h3>Options That Fit You</h3>

                <p>
                  Browse vehicles for everyday travel, special occasions,
                  or your next purchase.
                </p>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-number">02</span>

              <div>
                <h3>Clear Pricing</h3>

                <p>
                  Review listed prices and rental rates before choosing
                  your vehicle.
                </p>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-number">03</span>

              <div>
                <h3>A Marketplace for Everyone</h3>

                <p>
                  Customers can explore cars while vendors can register
                  and list their vehicles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="testimonials-heading">
            <p className="section-label">
              CUSTOMER EXPERIENCES
            </p>

            <h2>What People Say About Ayuslee</h2>

            <p>
              A better car experience starts with a better service.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>

              <p>
                "Finding a suitable vehicle was simple. I love how easy
                it is to explore the available options."
              </p>

              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Sample customer portrait"
                />

                <div>
                  <h4>Alex Morgan</h4>
                  <span>Customer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card featured-testimonial">
              <div className="testimonial-stars">★★★★★</div>

              <p>
                "The platform makes comparing rental and sale vehicles
                straightforward. Everything is easy to find."
              </p>

              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Sample customer portrait"
                />

                <div>
                  <h4>Jordan Williams</h4>
                  <span>Customer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>

              <p>
                "I like having different vehicle options in one place.
                The experience feels clean and convenient."
              </p>

              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sample customer portrait"
                />

                <div>
                  <h4>Sarah James</h4>
                  <span>Customer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="home-cta">
          <div>
            <p className="section-label">
              READY WHEN YOU ARE
            </p>

            <h2>Your next journey starts with the right car.</h2>

            <p>
              Explore available vehicles and find the right option for you.
            </p>
          </div>

          <button
            className="cta-button"
            onClick={() => navigate("/marketplace")}
          >
            Explore Marketplace →
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
