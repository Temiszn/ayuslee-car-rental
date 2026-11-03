import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const subject = form.elements[2].value;
    const message = form.elements[3].value;

    const whatsappMessage = `Hello Ayuslee Car Rentals!

Name: ${name}
Email: ${email}
Subject: ${subject}

Message: ${message}`;

    const whatsappURL = `https://wa.me/2348122132357?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
    form.reset();
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div>
          <p className="contact-label">WE'RE HERE TO HELP</p>
          <h1>
            Let's Start a <span>Conversation.</span>
          </h1>
          <p>
            Have questions about renting, buying or listing a car?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <p className="contact-label">GET IN TOUCH</p>
          <h2>How Can We Help You?</h2>
          <p>
            Whether you're looking for your next car or need
            assistance with our platform, we're ready to help.
          </p>

          <div className="contact-detail">
            <span>01</span>
            <div>
              <h3>Car Rentals</h3>
              <p>Questions about finding or booking a vehicle.</p>
            </div>
          </div>

          <div className="contact-detail">
            <span>02</span>
            <div>
              <h3>Marketplace</h3>
              <p>Interested in buying a car or listing your own?</p>
            </div>
          </div>

          <div className="contact-detail">
            <span>03</span>
            <div>
              <h3>Customer Support</h3>
              <p>Need help using the Ayuslee platform?</p>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <h2>Send Us a Message</h2>
          <p>
            Fill in the details below and we'll be glad to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="contact-input-row">
              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              required
            />

            <textarea
              placeholder="Write your message..."
              rows="6"
              required
            />

            <button type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="contact-bottom">
        <h2>Ready to Find Your Next Car?</h2>
        <button onClick={() => navigate("/marketplace")}>
          Explore Marketplace
        </button>
      </section>
    </div>
  );
};

export default Contact;