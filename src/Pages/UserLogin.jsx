import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./UserLogin.css";

const API_URL =
  "https://6ade064b4e88f1bba4a4e3cb.mockapi.io/Users";

const UserLogin = () => {
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
          throw new Error("Unable to check account");
        }

        const users = await response.json();

        const user = users.find(
          (item) =>
            item.email.toLowerCase() === values.email.toLowerCase() &&
            item.password === values.password
        );

        if (!user) {
          toast.error("Incorrect email or password.");
          return;
        }

        toast.success("Sign in successful!");

        sessionStorage.setItem(
          "customer",
          JSON.stringify({
            userId: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );

        navigate("/marketplace", {
          state: {
            userId: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
        });
      } catch (error) {
        toast.error("Unable to sign in. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="user-login-page">
      <div className="user-login-image">
        <div className="user-login-overlay">
          <span>AYUSLEE CAR RENTALS</span>

          <h2>
            Every Journey
            <br />
            Deserves the
            <br />
            Right Drive.
          </h2>

          <p>
            Welcome back. Explore our collection of vehicles
            and find the perfect match for your next journey.
          </p>
        </div>
      </div>

      <div className="user-login">
        <div className="user-login-content">
          <span className="user-login-label">CUSTOMER PORTAL</span>

          <h1>Welcome Back</h1>

          <p className="user-login-subtitle">
            Sign in to continue exploring vehicles on Ayuslee.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="user-login-field">
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
                <p className="login-error">{formik.errors.email}</p>
              )}
            </div>

            <div className="user-login-field">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
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
            Don't have an account?{" "}
            <Link to="/user-register">Create Account</Link>
          </p>

          <button
            className="user-login-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;