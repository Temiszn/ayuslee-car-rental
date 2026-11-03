import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./VendorForm.css";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const VendorForm = ({ vendorId, vendorName }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      vendorName: vendorName || "",
      name: "",
      brand: "",
      listingType: "rent",
      rentalPrice: "",
      price: "",
      image: "",
      description: "",
    },

    validationSchema: Yup.object({
      vendorName: Yup.string().required("Vendor name is required"),
      name: Yup.string().required("Car name is required"),
      brand: Yup.string().required("Brand is required"),
      listingType: Yup.string().oneOf(["rent", "sale"]).required(),
      rentalPrice: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Rental price is required"),
      price: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Selling price is required"),
      image: Yup.string()
        .url("Enter a valid image URL")
        .required("Image URL is required"),
      description: Yup.string().required("Description is required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            vendorId: vendorId,
            vendorName: vendorName,
            price: Number(values.price),
            rentalPrice: Number(values.rentalPrice),
            availability: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to post car");
        }

        toast.success("Car posted successfully!");
        resetForm();

        navigate("/vendor-dashboard", {
          state: { vendorId: vendorId },
        });
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="vendor-form-page">
      <div className="vendor-form-heading">
        <span>AYUSLEE VENDOR PORTAL</span>
        <h1>List Your Vehicle</h1>
        <p>
          Showcase your vehicle and connect with customers looking
          to rent or purchase.
        </p>
      </div>

      <div className="vendor-form">
        <div className="vendor-form-card-heading">
          <div>
            <span>NEW LISTING</span>
            <h2>Vehicle Information</h2>
          </div>
          <div className="vendor-form-icon">+</div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="vendor-form-grid">
            <div className="vendor-form-field">
              <label>Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                placeholder="Vendor Name"
                value={formik.values.vendorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
              {formik.touched.vendorName && formik.errors.vendorName && (
                <p className="vendor-form-error">
                  {formik.errors.vendorName}
                </p>
              )}
            </div>

            <div className="vendor-form-field">
              <label>Car Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Toyota Camry"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="vendor-form-error">{formik.errors.name}</p>
              )}
            </div>

            <div className="vendor-form-field">
              <label>Car Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Toyota"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.brand && formik.errors.brand && (
                <p className="vendor-form-error">{formik.errors.brand}</p>
              )}
            </div>

            <div className="vendor-form-field">
              <label>Listing Type</label>
              <select
                name="listingType"
                value={formik.values.listingType}
                onChange={formik.handleChange}
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>

            <div className="vendor-form-field">
              <label>Rental Price Per Day (₦)</label>
              <input
                type="number"
                name="rentalPrice"
                placeholder="Enter rental price"
                value={formik.values.rentalPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rentalPrice && formik.errors.rentalPrice && (
                <p className="vendor-form-error">
                  {formik.errors.rentalPrice}
                </p>
              )}
            </div>

            <div className="vendor-form-field">
              <label>Selling Price (₦)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter selling price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="vendor-form-error">{formik.errors.price}</p>
              )}
            </div>

            <div className="vendor-form-field full-vendor-width">
              <label>Vehicle Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="Paste a vehicle image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image && (
                <p className="vendor-form-error">{formik.errors.image}</p>
              )}

              {formik.values.image && !formik.errors.image && (
                <img
                  src={formik.values.image}
                  alt="Vehicle preview"
                  className="vendor-car-preview"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>

            <div className="vendor-form-field full-vendor-width">
              <label>Vehicle Description</label>
              <textarea
                name="description"
                placeholder="Tell customers about your vehicle..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows="5"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="vendor-form-error">
                  {formik.errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="vendor-form-actions">
            <button
              type="button"
              className="vendor-form-cancel"
              onClick={() =>
                navigate("/vendor-dashboard", {
                  state: { vendorId: vendorId },
                })
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="vendor-form-submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Posting..." : "Publish Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;