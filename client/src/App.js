import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import ProductListPage from "./pages/products";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import HomePage from "./pages/home";
import CheckoutPage from "./pages/checkout";
import ProfileUserPage from "./pages/profileUser";
import OrderUserPage from "./pages/OrderUserPage";
import ForgotPasswordPage from "./pages/forgotPassword";
import ChangePasswordPage from "./pages/changePassword";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/user/profile" element={<ProfileUserPage />} />
        <Route path="/user/orders" element={<OrderUserPage />} />
        <Route path="/user/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/user/change-password" element={<ChangePasswordPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
};

export default App;
