
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./VendorDashboard.css";

const VENDORS_URL =
  "https://6adde6054e88f1bba4a4cae1.mockapi.io/Vendors";

const CARS_URL =
  "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const VendorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const vendorId = location.state?.vendorId;

  const [vendor, setVendor] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) {
      navigate("/vendor-login", { replace: true });
      return;
    }

    const getDashboard = async () => {
      try {
        const vendorResponse = await fetch(`${VENDORS_URL}/${vendorId}`);

        if (!vendorResponse.ok) {
          throw new Error("Vendor not found");
        }

        const vendorData = await vendorResponse.json();
        setVendor(vendorData);

        const carsResponse = await fetch(CARS_URL);

        if (!carsResponse.ok) {
          throw new Error("Unable to load cars");
        }

        const carsData = await carsResponse.json();

        setCars(
          carsData.filter(
            (car) => String(car.vendorId) === String(vendorId)
          )
        );
      } catch (error) {
        toast.error("Unable to load your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, [vendorId, navigate]);

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`${CARS_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete listing");
      }

      setCars((previousCars) =>
        previousCars.filter((car) => car.id !== id)
      );

      toast.success("Car listing deleted successfully.");
    } catch (error) {
      toast.error("Could not delete this listing.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vendor");
    sessionStorage.removeItem("customer");

    toast.success("Logged out successfully.");
    navigate("/", { replace: true });
  };

  if (loading) {
    return <p className="dashboard-message">Loading dashboard...</p>;
  }

  if (!vendor) {
    return <p className="dashboard-message">Vendor account not found.</p>;
  }

  const availableCars = cars.filter((car) => car.availability).length;

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">VENDOR SPACE</span>
          <h1>Welcome, {vendor.vendorName}.</h1>
          <p>Manage your vehicle listings and store activity.</p>
          <span className="dashboard-store">
            {vendor.storeName}
          </span>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="dashboard-add-button"
            onClick={() =>
              navigate("/vendor", {
                state: {
                  vendorId: vendor.id,
                  vendorName: vendor.vendorName,
                },
              })
            }
          >
            + Post a Car
          </button>

          <button
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <span>Total Listings</span>
          <h2>{cars.length}</h2>
        </div>

        <div className="dashboard-stat">
          <span>Available Vehicles</span>
          <h2>{availableCars}</h2>
        </div>

        <div className="dashboard-stat">
          <span>Unavailable Vehicles</span>
          <h2>{cars.length - availableCars}</h2>
        </div>
      </div>

      <div className="dashboard-section-heading">
        <div>
          <span className="dashboard-label">YOUR INVENTORY</span>
          <h2>My Car Listings</h2>
        </div>
        <span>{cars.length} vehicles</span>
      </div>

      {cars.length === 0 ? (
        <div className="dashboard-empty">
          <h3>No listings yet</h3>
          <p>Your posted vehicles will appear here.</p>
          <button
            onClick={() =>
              navigate("/vendor", {
                state: {
                  vendorId: vendor.id,
                  vendorName: vendor.vendorName,
                },
              })
            }
          >
            Post Your First Car
          </button>
        </div>
      ) : (
        <div className="dashboard-cars">
          {cars.map((car) => (
            <div className="dashboard-car-card" key={car.id}>
              <div className="dashboard-car-image">
                <img src={car.image} alt={car.name} />

                <span
                  className={
                    car.availability
                      ? "car-status available"
                      : "car-status unavailable"
                  }
                >
                  {car.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="dashboard-car-info">
                <span className="dashboard-car-type">
                  {car.listingType === "rent" ? "FOR RENT" : "FOR SALE"}
                </span>

                <h3>{car.name}</h3>
                <p>{car.brand}</p>

                <strong>
                  ₦
                  {Number(
                    car.listingType === "rent"
                      ? car.rentalPrice
                      : car.price
                  ).toLocaleString()}
                  {car.listingType === "rent" ? " / day" : ""}
                </strong>

                <div className="dashboard-car-actions">
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/edit-car/${car.id}`, {
                        state: { vendorId: vendor.id },
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-car-button"
                    onClick={() => deleteCar(car.id)}
                  >
                    Delete
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

export default VendorDashboard;
