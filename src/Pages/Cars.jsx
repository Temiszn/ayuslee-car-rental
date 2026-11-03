
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState("rent");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch(() => console.log("Unable to load cars"))
      .finally(() => setLoading(false));
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.listingType === carType &&
      car.availability === true
  );

  return (
    <div className="cars-page">
      <section className="cars-hero">
        <div className="cars-hero-content">
          <span>AYUSLEE CAR RENTALS</span>
          <h1>Find The Right Car For Your Journey.</h1>
          <p>
            Explore our collection of quality vehicles,
            available for rent or purchase.
          </p>
        </div>
      </section>

      <section className="cars-content">
        <div className="cars-heading">
          <div>
            <span className="cars-eyebrow">OUR COLLECTION</span>
            <h2>Available Cars</h2>
            <p>Find the perfect vehicle for your next journey.</p>
          </div>

          <div className="car-filter">
            <label htmlFor="carType">I want to:</label>
            <select
              id="carType"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="rent">Rent a Car</option>
              <option value="sale">Buy a Car</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="cars-message">Loading cars...</p>
        ) : filteredCars.length === 0 ? (
          <p className="cars-message">
            No cars are currently available in this category.
          </p>
        ) : (
          <div className="cars-grid">
            {filteredCars.map((car) => (
              <div className="car-card" key={car.id}>
                <div className="car-image-wrapper">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                  />
                  <span className="car-status">AVAILABLE</span>
                </div>

                <div className="car-info">
                  <p className="car-brand">{car.brand}</p>
                  <h2>{car.name}</h2>
                  <p className="car-description">
                    {car.description}
                  </p>

                  <div className="car-card-bottom">
                    <div>
                      <span className="car-price-label">
                        {carType === "rent" ? "DAILY RATE" : "PRICE"}
                      </span>
                      <h3>
                        ₦
                        {Number(
                          carType === "rent"
                            ? car.rentalPrice
                            : car.price
                        ).toLocaleString()}
                        {carType === "rent" ? (
                          <small>/day</small>
                        ) : null}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate(`/cars/${car.id}`)}
                    >
                      View Details <span>→</span>
                    </button>
                  </div>

                  <p className="car-condition">
                    Condition: {car.condition || "Not specified"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Cars;
