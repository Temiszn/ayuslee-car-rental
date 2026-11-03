import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ManageCars.css";

const API_URL = "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
    } catch (error) {
      toast.error("Unable to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      setCars(cars.filter((car) => car.id !== id));
      toast.success("Car listing deleted successfully!");
    } catch (error) {
      toast.error("Unable to delete car.");
    }
  };

  return (
    <div className="manage-cars">
      <h1>Manage Car Listings</h1>
      <p>View and manage cars listed on Ayuslee Car Rentals.</p>

      {loading ? (
        <p>Loading cars...</p>
      ) : cars.length === 0 ? (
        <p>No car listings available yet.</p>
      ) : (
        <div className="manage-cars-grid">
          {cars.map((car) => (
            <div className="manage-car-card" key={car.id}>
              <img src={car.image} alt={car.name} />

              <div className="manage-car-info">
                <h3>{car.name}</h3>
                <p>Brand: {car.brand}</p>

                <p>
                  Listing Type:{" "}
                  {car.listingType === "rent" ? "For Rent" : "For Sale"}
                </p>

                <p>
                  Price: ₦
                  {Number(
                    car.listingType === "rent"
                      ? car.rentalPrice
                      : car.price
                  ).toLocaleString()}
                  {car.listingType === "rent" ? " / day" : ""}
                </p>

                <p>
                  Status: {car.availability ? "Available" : "Unavailable"}
                </p>

                <div className="manage-car-buttons">
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="delete-car-button"
                    onClick={() => deleteCar(car.id)}
                  >
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCars;
