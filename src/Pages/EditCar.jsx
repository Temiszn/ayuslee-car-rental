import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EditCar.css";

const API_URL =
  "https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const vendorId = location.state?.vendorId;

  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      brand: "",
      listingType: "rent",
      rentalPrice: "",
      price: "",
      image: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Car name is required"),
      brand: Yup.string().required("Brand is required"),
      listingType: Yup.string().required("Listing type is required"),
      rentalPrice: Yup.number().when("listingType", {
        is: "rent",
        then: (schema) =>
          schema.required("Rental price is required").positive(),
        otherwise: (schema) => schema,
      }),
      price: Yup.number().when("listingType", {
        is: "sale",
        then: (schema) =>
          schema.required("Sale price is required").positive(),
        otherwise: (schema) => schema,
      }),
      image: Yup.string()
        .url("Enter a valid image URL")
        .required("Image URL is required"),
      description: Yup.string().required("Description is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Car not found");
        }

        const car = await response.json();

        if (String(car.vendorId) !== String(vendorId)) {
          toast.error("You can only edit your own listings.");
          return;
        }

        const updateResponse = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...car,
            ...values,
            price: Number(values.price) || 0,
            rentalPrice: Number(values.rentalPrice) || 0,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Update failed");
        }

        toast.success("Car listing updated successfully!");

        navigate("/vendor-dashboard", {
          state: { vendorId },
        });
      } catch (error) {
        toast.error("Unable to update car listing.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Car not found");
        }

        const car = await response.json();

        if (!vendorId || String(car.vendorId) !== String(vendorId)) {
          toast.error("You can only edit your own listings.");
          navigate("/vendor-login", { replace: true });
          return;
        }

        formik.setValues({
          name: car.name || "",
          brand: car.brand || "",
          listingType: car.listingType || "rent",
          rentalPrice: car.rentalPrice || "",
          price: car.price || "",
          image: car.image || "",
          description: car.description || "",
        });
      } catch (error) {
        toast.error("Unable to load car details.");
      } finally {
        setLoading(false);
      }
    };

    getCar();
  }, [id, vendorId, navigate]);

  if (loading) {
    return <p className="edit-loading">Loading car details...</p>;
  }

  return (
    <div className="edit-car-page">
      <div className="edit-car-heading">
        <span>VENDOR SPACE</span>
        <h1>Edit Your Listing</h1>
        <p>Update your vehicle information and listing details.</p>
      </div>

      <div className="edit-car-container">
        <div className="edit-car-top">
          <h2>Vehicle Information</h2>
          <p>Make sure your information is accurate before updating.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="edit-form-grid">
            <div className="edit-form-group">
              <label>Car Name</label>
              <input
                name="name"
                placeholder="e.g. Toyota Camry"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="edit-error">{formik.errors.name}</p>
              )}
            </div>

            <div className="edit-form-group">
              <label>Brand</label>
              <input
                name="brand"
                placeholder="e.g. Toyota"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.brand && formik.errors.brand && (
                <p className="edit-error">{formik.errors.brand}</p>
              )}
            </div>

            <div className="edit-form-group">
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

            {formik.values.listingType === "rent" && (
              <div className="edit-form-group">
                <label>Rental Price Per Day (₦)</label>
                <input
                  type="number"
                  name="rentalPrice"
                  placeholder="Enter rental price"
                  value={formik.values.rentalPrice}
                  onChange={formik.handleChange}
                />
                {formik.errors.rentalPrice && (
                  <p className="edit-error">{formik.errors.rentalPrice}</p>
                )}
              </div>
            )}

            {formik.values.listingType === "sale" && (
              <div className="edit-form-group">
                <label>Sale Price (₦)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter sale price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && (
                  <p className="edit-error">{formik.errors.price}</p>
                )}
              </div>
            )}

            <div className="edit-form-group edit-full-width">
              <label>Car Image URL</label>
              <input
                name="image"
                placeholder="Paste your vehicle image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
              {formik.touched.image && formik.errors.image && (
                <p className="edit-error">{formik.errors.image}</p>
              )}
            </div>

            <div className="edit-form-group edit-full-width">
              <label>Car Description</label>
              <textarea
                name="description"
                placeholder="Describe your vehicle..."
                rows="5"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="edit-error">{formik.errors.description}</p>
              )}
            </div>
          </div>

          <div className="edit-form-actions">
            <button
              type="button"
              className="edit-cancel-button"
              onClick={() =>
                navigate("/vendor-dashboard", { state: { vendorId } })
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-submit-button"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;