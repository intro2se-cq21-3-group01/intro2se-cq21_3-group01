import React, { useState } from "react";
import "./Payment.css";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleCheckboxChange = (paymentMethod, event) => {
    event.preventDefault();
    setSelectedPayment(paymentMethod);
  };

  // Giả sử mỗi sản phẩm có id, tên, giá và số lượng
  const [products, setProducts] = useState([
    { id: 1, name: "Cookie", price: 149.0, quantity: 1 },
    { id: 2, name: "Cookie", price: 149.0, quantity: 2 },
  ]);

  const updateQuantity = (productId, num, event) => {
    event.preventDefault();
    const newProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedQuantity = product.quantity + num;
        return {
          ...product,
          quantity: updatedQuantity > 0 ? updatedQuantity : 1,
        };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal().toFixed(2);
  const taxRate = 0.8;
  const tax = (subtotal * taxRate).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <div className="payment">
      <form className="order-confirm">
        <h1 className="title1-order-confirm">Order confirmation</h1>
        <div>
          <h2 className="title2-order-confirm">Shipping details</h2>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address ..."
          />
          <input type="text" id="name" name="name" placeholder="Name ..." />
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone number ..."
          />
        </div>
        <div>
          <h2 className="title3-order-confirm">Payment methods</h2>
          <label className="title-checkbox-bank">Bank</label>
          <input
            type="checkbox"
            id="bank"
            checked={selectedPayment === "bank"}
            onChange={(e) => handleCheckboxChange("bank", e)}
          />
          <label className="title-checkbox-cash">Cash</label>
          <input
            type="checkbox"
            id="cash"
            checked={selectedPayment === "cash"}
            onChange={(e) => handleCheckboxChange("cash", e)}
          />
          <label className="title-checkbox-momo">Momo</label>
          <input
            type="checkbox"
            id="momo"
            checked={selectedPayment === "momo"}
            onChange={(e) => handleCheckboxChange("momo", e)}
          />
        </div>
        <div>
          <input type="submit" id="payment" value="Payment" />
          <input type="submit" id="cancel" value="Cancel order" />
        </div>
      </form>
      <form className="order-summary">
        <h1 className="title1-order-summary">Order summary</h1>
        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <p className="name-product">{product.name}</p>
              <button
                id="minus"
                onClick={(e) => updateQuantity(product.id, -1, e)}
              >
                -
              </button>
              <p className="quantity-product">{product.quantity}</p>
              <button
                id="plus"
                onClick={(e) => updateQuantity(product.id, 1, e)}
              >
                +
              </button>
              <p className="price-product">
                {(product.price * product.quantity).toFixed(3)} ₫
              </p>
            </div>
          ))}
        </div>
        <div>
          <label className="label-giftCard">Gift card/Discount code</label>
          <input type="text" id="gift-card" name="gift-card" />
          <button id="apply">Apply</button>
        </div>
        <div>
          <label className="summary-sub">
            Sub total <p className="value-summary-sub">£{subtotal}</p>
          </label>
          <label className="summary-tax">
            Tax <p className="value-summary-tax">£{tax}</p>
          </label>
          <label className="summary-shipping">
            Shipping<p className="value-summary-shipping">Free</p>
          </label>
          <label className="summary-total">
            Total<p className="value-summary-total">£{tax}</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Payment;
