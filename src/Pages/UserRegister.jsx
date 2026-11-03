import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./UserRegister.css";

const API_URL =
  "https://6ade064b4e88f1bba4a4e3cb.mockapi.io/Users";

const UserRegister = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
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

        toast.success("Account created successfully!");
        resetForm();
        navigate("/user-login");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="user-register-page">
      <div className="user-register-image">
        <div className="user-register-overlay">
          <span>AYUSLEE CAR RENTALS</span>
          <h2>Your Next<br />Journey Starts<br />Here.</h2>
          <p>
            Discover quality vehicles, explore your options
            and enjoy a better way to travel with Ayuslee.
          </p>
        </div>
      </div>

      <div className="user-register">
        <div className="user-register-content">
          <span className="user-register-label">CUSTOMER PORTAL</span>

          <h1>Create Your Account</h1>

          <p className="user-register-subtitle">
            Join Ayuslee and find the right vehicle for your next journey.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="user-register-field">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="off"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="register-error">{formik.errors.fullName}</p>
              )}
            </div>

            <div className="user-register-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="register-error">{formik.errors.email}</p>
              )}
            </div>

            <div className="user-register-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                autoComplete="off"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="register-error">{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div className="user-register-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="register-error">{formik.errors.password}</p>
              )}
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <p className="register-link">
            Already have an account?{" "}
            <Link to="/user-login">Sign In</Link>
          </p>

          <button
            className="user-register-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;