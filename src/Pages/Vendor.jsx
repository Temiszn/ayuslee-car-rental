
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import VendorForm from "../Components/VendorForm";
import "./Vendor.css";

const Vendor = () => {
  const location = useLocation();

  const vendorId = location.state?.vendorId;
  const vendorName = location.state?.vendorName;

  if (!vendorId) {
    return <Navigate to="/vendor-login" replace />;
  }

  return (
    <div className="vendor-page">
      <section className="vendor-page-header">
        <p>AYUSLEE VENDOR PORTAL</p>
        <h1>List Your Vehicle.</h1>
        <span>
          Add your vehicle to our marketplace and connect with customers
          looking for their next journey.
        </span>
      </section>

      <section className="vendor-page-content">
        <VendorForm
          vendorId={vendorId}
          vendorName={vendorName}
        />
      </section>
    </div>
  );
};

export default Vendor;
