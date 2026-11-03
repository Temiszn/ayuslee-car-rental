import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./BookingForm.css";

const BookingForm = () => {
  const location = useLocation();
  const user = location.state || {};

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://6ad3c59f59dd78397bbc1076.mockapi.io/Cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load cars");
        }
        return response.json();
      })
      .then((data) => setCars(data))
      .catch(() => toast.error("Unable to load cars"));
  }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    bookingType: Yup.string()
      .oneOf(["rent", "sale"])
      .required("Please select a booking type"),
    carId: Yup.string().required("Please select a car"),
    bookingDate: Yup.string().required("Please select a date"),
  });

  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <span>YOUR RESERVATION</span>
        <h2>Booking Details</h2>
        <p>Please provide the information required to continue.</p>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          fullName: user.fullName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          bookingType: user.bookingType || "rent",
          carId: user.carId ? String(user.carId) : "",
          bookingDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const selectedCar = cars.find(
              (car) => String(car.id) === String(values.carId)
            );

            if (!selectedCar || selectedCar.availability !== true) {
              toast.error("This vehicle is no longer available.");
              return;
            }

            const response = await fetch(
              "https://6adde6054e88f1bba4a4cae1.mockapi.io/Bookings",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...values,
                  carName: selectedCar.name || "",
                  status: "Pending",
                  userId: user.userId || "",
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Booking failed");
            }

            toast.success("Booking submitted successfully!");

            resetForm({
              values: {
                fullName: user.fullName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bookingType: "rent",
                carId: "",
                bookingDate: "",
              },
            });
          } catch (error) {
            toast.error("Could not submit booking. Please try again.");
          }
        }}
      >
        {({ values, isSubmitting }) => {
          const selectedCar = cars.find(
            (car) => String(car.id) === String(values.carId)
          );

          return (
            <Form className="booking-fields">

              <div className="booking-field">
                <label>Full Name</label>
                <Field
                  name="fullName"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="booking-field">
                <label>Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              <div className="booking-field">
                <label>Phone Number</label>
                <Field
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error"
                />
              </div>

              <div className="booking-field">
                <label>Booking Type</label>
                <Field as="select" name="bookingType">
                  <option value="rent">Rent a Car</option>
                  <option value="sale">Buy a Car</option>
                </Field>
                <ErrorMessage
                  name="bookingType"
                  component="div"
                  className="error"
                />
              </div>

              <div className="booking-field">
                <label>Select Vehicle</label>
                <Field
                  as="select"
                  name="carId"
                  disabled={!!user.carId}
                >
                  <option value="">Choose a vehicle</option>

                  {cars
                    .filter(
                      (car) =>
                        car.listingType === values.bookingType &&
                        car.availability === true
                    )
                    .map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name} - {car.brand}
                      </option>
                    ))}
                </Field>

                <ErrorMessage
                  name="carId"
                  component="div"
                  className="error"
                />
              </div>

              <div className="booking-field">
                <label>Booking Date</label>
                <Field
                  name="bookingDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
                <ErrorMessage
                  name="bookingDate"
                  component="div"
                  className="error"
                />
              </div>

              {selectedCar && (
                <div className="selected-car-summary">
                  <div className="selected-car-image">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                    />
                  </div>

                  <div className="selected-car-info">
                    <span>YOUR SELECTED VEHICLE</span>
                    <h3>{selectedCar.name}</h3>
                    <p>{selectedCar.brand}</p>

                    <strong>
                      ₦
                      {Number(
                        values.bookingType === "rent"
                          ? selectedCar.rentalPrice
                          : selectedCar.price
                      ).toLocaleString()}
                      {values.bookingType === "rent" ? " / day" : ""}
                    </strong>
                  </div>
                </div>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Booking"}
              </button>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;