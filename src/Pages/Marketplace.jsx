
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Marketplace.css";

const API_URL =
  "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const Marketplace = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesType =
      activeFilter === "all" ||
      car.listingType === activeFilter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (car.name || "").toLowerCase().includes(search) ||
      (car.brand || "").toLowerCase().includes(search) ||
      (car.description || "").toLowerCase().includes(search);

    return matchesType && matchesSearch;
  });

  const getPrice = (car) => {
    if (car.listingType === "rent") {
      return car.rentalPrice || car.price || 0;
    }

    return car.price || 0;
  };

  return (
    <div className="marketplace">
      <section className="marketplace-hero">
        <div className="marketplace-hero-content">
          <span className="marketplace-eyebrow">
            THE AYUSLEE COLLECTION
          </span>

          <h1>
            Find the car.
            <br />
            <span>Feel the difference.</span>
          </h1>

          <p>
            Explore quality vehicles for rent or sale.
            Your next journey starts here.
          </p>

          <div className="marketplace-hero-line"></div>
        </div>
      </section>

      <section className="marketplace-content">
        <div className="marketplace-heading">
          <div>
            <span className="section-eyebrow">EXPLORE OUR CARS</span>
            <h2>Find your perfect drive</h2>
            <p>Browse available vehicles and choose what works for you.</p>
          </div>

      
        </div>

        <div className="marketplace-toolbar">
          <div className="marketplace-filters">
            {[
              { label: "All Cars", value: "all" },
              { label: "For Rent", value: "rent" },
              { label: "For Sale", value: "sale" },
            ].map((filter) => (
              <button
                key={filter.value}
                className={
                  activeFilter === filter.value
                    ? "marketplace-filter active"
                    : "marketplace-filter"
                }
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="marketplace-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="text"
              placeholder="Search cars or brands..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search cars or brands"
            />
          </div>
        </div>

        {loading ? (
          <div className="marketplace-message">
            <div className="marketplace-loader"></div>
            <p>Finding your next drive...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="marketplace-empty">
            <span>✦</span>
            <h3>No matching cars found</h3>
            <p>
              Try another search or choose a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
            >
              View all cars
            </button>
          </div>
        ) : (
          <div className="marketplace-cars">
            {filteredCars.map((car) => (
              <article className="marketplace-card" key={car.id}>
                <div className="marketplace-card-image">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name || "Vehicle"}
                      loading="lazy"
                    />
                  ) : (
                    <div className="marketplace-no-image">
                      Image unavailable
                    </div>
                  )}

                  <span
                    className={
                      car.listingType === "rent"
                        ? "listing-badge rent-badge"
                        : "listing-badge sale-badge"
                    }
                  >
                    {car.listingType === "rent" ? "FOR RENT" : "FOR SALE"}
                  </span>

                  <span
                    className={
                      car.availability
                        ? "availability-dot available"
                        : "availability-dot unavailable"
                    }
                    title={
                      car.availability ? "Available" : "Not available"
                    }
                  ></span>
                </div>

                <div className="marketplace-card-body">
                  <div className="marketplace-car-heading">
                    <div>
                      <span className="marketplace-brand">
                        {car.brand || "Premium vehicle"}
                      </span>
                      <h3>{car.name || "Unnamed vehicle"}</h3>
                    </div>
                  </div>

                  <p className="marketplace-description">
                    {car.description || "Discover more about this vehicle."}
                  </p>

                  <div className="marketplace-card-bottom">
                    <div className="marketplace-price">
                      <strong>
                        ₦{Number(getPrice(car)).toLocaleString("en-NG")}
                      </strong>
                      <span>
                        {car.listingType === "rent" ? "/ day" : " asking price"}
                      </span>
                    </div>

                    <button
  className="marketplace-view-button"
  onClick={() => navigate(`/cars/${car.id}`)}
  disabled={!car.availability}
>
  {car.availability ? "View Details" : "Unavailable"}
  <span>↗</span>
</button>
                  </div>

                  <div
                    className={
                      car.availability
                        ? "marketplace-status is-available"
                        : "marketplace-status is-unavailable"
                    }
                  >
                    <span></span>
                    {car.availability ? "Available now" : "Currently unavailable"}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
