import React from "react";

const CarForm = () => {
  return (
    <div>
      <h2>Add a Car</h2>

      <form>
        <input type="text" placeholder="Car Name" />
        <input type="text" placeholder="Car Brand" />
        <input type="text" placeholder="Car Model" />
        <input type="number" placeholder="Year" />
        <input type="number" placeholder="Price" />
        <input type="text" placeholder="Car Image URL" />

        <select>
          <option value="">Select Option</option>
          <option value="rent">For Rent</option>
          <option value="buy">For Sale</option>
        </select>

        <button type="submit">Submit Car</button>
      </form>
    </div>
  );
};

export default CarForm;
