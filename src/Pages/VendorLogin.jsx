import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./VendorLogin.css";

const API_URL = "https://6adde6054e88f1bba4a4cae1.mockapi.io/Vendors";

const VendorLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to check vendor account");
        }

        const vendors = await response.json();

        const vendor = vendors.find(
          (item) =>
            item.email.toLowerCase() === values.email.toLowerCase() &&
            item.password === values.password
        );

        if (!vendor) {
          toast.error("Incorrect email or password.");
          return;
        }

        toast.success("Sign in successful!");

        sessionStorage.setItem(
          "vendor",
          JSON.stringify({
            id: vendor.id,
            vendorName: vendor.vendorName,
            email: vendor.email,
            storeName: vendor.storeName,
          })
        );

        navigate("/vendor-dashboard", {
          state: { vendorId: vendor.id },
        });
      } catch (error) {
        toast.error("Unable to sign in. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="vendor-login-page">
      <div className="vendor-login-image">
        <div className="vendor-login-overlay">
          <span>AYUSLEE CAR RENTALS</span>
          <h2>Your Business.<br />Your Vehicles.<br />Your Journey.</h2>
          <p>
            Manage your vehicle listings and grow your business
            with Ayuslee.
          </p>
        </div>
      </div>

      <div className="vendor-login">
        <div className="vendor-login-content">
          <span className="vendor-login-label">VENDOR PORTAL</span>
          <h1>Welcome Back</h1>
          <p className="vendor-login-subtitle">
            Sign in to access your vendor dashboard.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="vendor-login-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="login-error">{formik.errors.email}</p>
              )}
            </div>

            <div className="vendor-login-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="login-error">{formik.errors.password}</p>
              )}
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="register-link">
            Don't have a vendor account?{" "}
            <Link to="/vendor-register">Create Account</Link>
          </p>

          <button
            className="vendor-login-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;