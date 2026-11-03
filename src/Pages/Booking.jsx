import React from "react";
import BookingForm from "../Components/BookingForm";
import "./Booking.css";

const Booking = () => {
  return (
    <div className="booking-page">
      <section className="booking-hero">
        <p>AYUSLEE CAR RENTALS</p>
        <h1>Book Your <span>Next Journey.</span></h1>
        <p>
          You're one step closer to getting behind the wheel.
          Complete your booking details below.
        </p>
      </section>

      <section className="booking-content">
        <div className="booking-heading">
          <span>RESERVATION</span>
          <h2>Complete Your Booking</h2>
          <p>Provide your details to continue with your reservation.</p>
        </div>

        <BookingForm />
      </section>
    </div>
  );
};

export default Booking;