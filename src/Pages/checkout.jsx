import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { backend_url, currency } from "../App";
import "./CSS/Checkout.css";

const Checkout = () => {
  const { cartItems, getTotalCartAmount, products } = useContext(ShopContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send form data to backend)
    console.log("Form submitted:", form);
    // Optionally clear the cart after submission
    // clearCart();
  };

  // Helper function to get product details from cart items
  const getProductDetails = (id) => {
    return products.find(product => product.id === id) || {};
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-cart-summary">
        <h2>Cart Summary</h2>
        {Object.keys(cartItems).map((id) => {
          const product = getProductDetails(id);
          if (!product || cartItems[id] <= 0) {
            return null; // Skip if product is not found or quantity is 0
          }
          console.log(product); // Debugging line to check product data
          return (
            <div key={id} className="checkout-item">
              <img
                src={`${backend_url}/images/${product.image}`}
                alt={product.name}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <p>{product.name}</p>
                <p>{currency}{product.new_price} x {cartItems[id]}</p>
              </div>
            </div>
          );
        })}
        <div className="checkout-total">
          <h3>Total: {currency}{getTotalCartAmount()}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="checkout-submit-button">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;