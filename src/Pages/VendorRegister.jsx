import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./VendorRegister.css";

const API_URL =
  "https://6adde6054e88f1bba4a4cae1.mockapi.io/Vendors";

const VendorRegister = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      email: "",
      phoneNumber: "",
      storeName: "",
      address: "",
      profileImg: "",
      password: "",
    },

    validationSchema: Yup.object({
      vendorName: Yup.string().required("Vendor name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      storeName: Yup.string().required("Store name is required"),
      address: Yup.string().required("Address is required"),
      profileImg: Yup.string()
        .url("Enter a valid image URL")
        .nullable(),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const vendor = await response.json();

        toast.success("Vendor registration successful!");

        resetForm();

        navigate("/vendor-login", {
          state: { vendorId: vendor.id },
        });
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="vendor-register-page">
      <div className="vendor-register-image">
        <div className="vendor-register-overlay">
          <span>AYUSLEE CAR RENTALS</span>
          <h2>Bring Your<br />Vehicles to<br />the Marketplace.</h2>
          <p>
            Join our vendor community and showcase your vehicles
            to customers looking for their next journey.
          </p>
        </div>
      </div>

      <div className="vendor-register">
        <div className="vendor-register-content">
          <span className="vendor-register-label">VENDOR PORTAL</span>
          <h1>Create Your Account</h1>
          <p className="vendor-register-subtitle">
            Complete your details to start listing vehicles with Ayuslee.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="vendor-register-grid">
              <div className="vendor-register-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="vendorName"
                  placeholder="Enter your full name"
                  value={formik.values.vendorName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.vendorName && formik.errors.vendorName && (
                  <p className="register-error">{formik.errors.vendorName}</p>
                )}
              </div>

              <div className="vendor-register-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="register-error">{formik.errors.email}</p>
                )}
              </div>

              <div className="vendor-register-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="register-error">{formik.errors.phoneNumber}</p>
                )}
              </div>

              <div className="vendor-register-field">
                <label>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  placeholder="Enter store name"
                  value={formik.values.storeName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.storeName && formik.errors.storeName && (
                  <p className="register-error">{formik.errors.storeName}</p>
                )}
              </div>

              <div className="vendor-register-field full-register-width">
                <label>Business Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="register-error">{formik.errors.address}</p>
                )}
              </div>

              <div className="vendor-register-field full-register-width">
                <label>Store Profile Picture (Optional)</label>
                <input
                  type="url"
                  name="profileImg"
                  placeholder="Paste image URL here"
                  value={formik.values.profileImg}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.profileImg && formik.errors.profileImg && (
                  <p className="register-error">{formik.errors.profileImg}</p>
                )}

                {formik.values.profileImg && !formik.errors.profileImg && (
                  <img
                    src={formik.values.profileImg}
                    alt="Store profile preview"
                    className="register-image-preview"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              <div className="vendor-register-field full-register-width">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="register-error">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="vendor-register-login">
            Already have an account?{" "}
            <Link to="/vendor-login">Sign In</Link>
          </p>

          <button
            className="vendor-register-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;