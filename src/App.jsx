import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    emoji: "⌚",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    emoji: "👟",
  },
  {
    id: 4,
    name: "Backpack",
    price: 999,
    emoji: "🎒",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;

  const amountAfterDiscount = subtotal - discountAmount;

  const gst = amountAfterDiscount * 0.18;

  const grandTotal = amountAfterDiscount + gst;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(10);
      setCouponMessage("Coupon applied! 10% discount.");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  return (
    <div className="app">

      <h1>🛒 Online Shopping Cart</h1>

      <div className="container">

        {/* Products */}
        <section className="products">
          <h2>Products</h2>

          <div className="product-grid">

            {products.map((product) => (
              <div className="product-card" key={product.id}>

                <div className="product-image">
                  {product.emoji}
                </div>

                <h3>{product.name}</h3>

                <p className="price">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>
            ))}

          </div>
        </section>

        {/* Cart */}
        <section className="cart">

          <h2>🛍️ Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <div className="cart-product">
                    <span className="cart-emoji">
                      {item.emoji}
                    </span>

                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>
                  </div>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        updateQuantity(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, 1)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>

                </div>

              ))}

              {/* Coupon */}
              <div className="coupon">

                <h3>🎟️ Coupon Code</h3>

                <div className="coupon-box">

                  <input
                    type="text"
                    placeholder="Enter coupon"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                  />

                  <button onClick={applyCoupon}>
                    Apply
                  </button>

                </div>

                <p className="coupon-message">
                  {couponMessage}
                </p>

              </div>

              {/* Bill */}
              <div className="bill">

                <div>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <span>Discount</span>
                  <span>
                    - ₹{discountAmount.toFixed(2)}
                  </span>
                </div>

                <div>
                  <span>GST (18%)</span>
                  <span>
                    ₹{gst.toFixed(2)}
                  </span>
                </div>

                <hr />

                <div className="grand-total">
                  <span>Grand Total</span>
                  <span>
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>

              </div>

            </>
          )}

        </section>

      </div>
    </div>
  );
}

export default App;