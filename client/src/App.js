import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductPage from "./pages/product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
