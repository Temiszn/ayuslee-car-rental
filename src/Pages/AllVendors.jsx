
import React, { useEffect, useState } from "react";
import "./AllVendors.css";

const API_URL =
  "https://6adde6054e88f1bba4a4cae1.mockapi.io/Vendors";

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch vendors");
        }
        return response.json();
      })
      .then((data) => setVendors(data))
      .catch((error) => console.log("Error fetching vendors:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="all-vendors">
      <section className="vendors-header">
        <p>AYUSLEE CAR RENTALS</p>
        <h1>Meet Our Vendors</h1>
        <span>
          Discover the businesses and people bringing quality vehicles
          to our marketplace.
        </span>
      </section>

      <section className="vendors-content">
        <div className="vendors-heading">
          <div>
            <h2>Our Vendor Community</h2>
            <p>Explore registered vehicle vendors on Ayuslee.</p>
          </div>
          <span className="vendor-count">
            {vendors.length} {vendors.length === 1 ? "Vendor" : "Vendors"}
          </span>
        </div>

        {loading ? (
          <p className="vendors-message">Loading vendors...</p>
        ) : vendors.length === 0 ? (
          <div className="vendors-message">
            <h3>No vendors registered yet</h3>
            <p>Registered vendors will appear here.</p>
          </div>
        ) : (
          <div className="vendors-grid">
            {vendors.map((vendor) => (
              <div className="vendor-card" key={vendor.id}>
                
<div className="vendor-avatar">
  {vendor.profileImg ? (
    <img
      src={vendor.profileImg}
      alt={vendor.storeName || vendor.vendorName || "Vendor"}
      onError={(event) => {
        event.currentTarget.style.display = "none";
        event.currentTarget.nextSibling.style.display = "flex";
      }}
    />
  ) : null}

  <span
    style={{
      display: vendor.profileImg ? "none" : "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {(vendor.storeName || vendor.vendorName || "A")
      .charAt(0)
      .toUpperCase()}
  </span>
</div>


                <div className="vendor-card-info">
                  <span className="vendor-status">REGISTERED VENDOR</span>
                  <h3>{vendor.storeName || "Vehicle Store"}</h3>
                  <p className="vendor-owner">
                    Owned by {vendor.vendorName || "Vendor"}
                  </p>

                  <div className="vendor-detail">
                    <span>Email</span>
                    <p>{vendor.email || "Not provided"}</p>
                  </div>

                  <div className="vendor-detail">
                    <span>Phone</span>
                    <p>{vendor.phoneNumber || "Not provided"}</p>
                  </div>

                  <div className="vendor-detail">
                    <span>Location</span>
                    <p>{vendor.address || "Not provided"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllVendors;
