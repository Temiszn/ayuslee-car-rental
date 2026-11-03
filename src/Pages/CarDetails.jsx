
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CarDetails.css";

const API_URL = "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCar = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Car not found");
      }

      const data = await response.json();
      setCar(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        carId: car.id,
        carName: car.name,
        bookingType: car.listingType,
      },
    });
  };

  if (loading) {
    return (
      <div className="details-message">
        <p>Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="details-message">
        <h2>Vehicle Not Found</h2>
        <p>Sorry, we couldn't find the vehicle you're looking for.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="details-top">
 <button
  className="back-button"
  onClick={() => navigate("/marketplace")}
>
  ← Back 
</button>

        <span>AYUSLEE / VEHICLE DETAILS</span>
      </div>

      <div className="car-details-card">
        <div className="details-image-wrapper">
          <img src={car.image} alt={car.name} />

          <span className="details-image-label">
            {car.listingType === "rent" ? "AVAILABLE FOR RENT" : "AVAILABLE FOR SALE"}
          </span>
        </div>

        <div className="car-details-info">
          <span className="details-brand">{car.brand}</span>

          <h1>{car.name}</h1>

          <div className="details-divider"></div>

          <p className="details-description">{car.description}</p>

          <div className="details-specs">
            <div>
              <span>CONDITION</span>
              <strong>{car.condition || "Not specified"}</strong>
            </div>

            <div>
              <span>AVAILABILITY</span>
              <strong className={car.availability ? "available" : "unavailable"}>
                {car.availability ? "Available" : "Not Available"}
              </strong>
            </div>

            <div>
              <span>LISTING TYPE</span>
              <strong>
                {car.listingType === "rent" ? "For Rent" : "For Sale"}
              </strong>
            </div>
          </div>

          <div className="details-price-section">
            <div>
              <span>{car.listingType === "rent" ? "RENTAL PRICE" : "SELLING PRICE"}</span>

              <h2>
                ₦
                {Number(
                  car.listingType === "rent"
                    ? car.rentalPrice
                    : car.price
                ).toLocaleString()}

                {car.listingType === "rent" && <small> / day</small>}
              </h2>
            </div>

            <button
              className="booking-action-button"
              onClick={handleBooking}
              disabled={!car.availability}
            >
              {car.listingType === "rent" ? "Rent This Car" : "Buy This Car"}
              <span> →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
