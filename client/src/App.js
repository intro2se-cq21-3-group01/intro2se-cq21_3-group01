import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductPage from "./pages/product";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Test from "./components/test/test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
