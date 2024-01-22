import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import AuthContextProvider from './components/context/auth';

import LoginPage from "./components/Login/Login";
import EmployeePage from "./components/Employee/Employee";
import DetailEmployee from "./components/DetailEmployee/DetailEmployee";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import UpdateEmployee from "./components/EditEmployee/EditEmployee";
import Menu from "./components/Share/Menu";
import MenuManagement from "./components/MenuManagement/menu";
import AddProduct from "./components/AddProduct/AddProduct";
import UpdateProduct from "./components/EditProduct/EditProduct";

import styles from './styles.module.css';
import Analysis from "./components/Analysis/Analysis";
import ManageOrder from "./components/ManageOrder/ManageOrder";
import CategoryList from "./components/Category/Category";
import AddCategory from "./components/AddCategory/AddCategory";
import EditCategory from "./components/EditCategory/EditCategory";
import CouponList from "./components/Coupon/Coupon";
import AddCoupon from "./components/AddCoupon/AddCoupon";
import UpdateCoupon from "./components/EditCoupon/EditCoupon";
import LoginSuccess from "./components/LoginSuccess";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        {/* Container chứa toàn bộ ứng dụng */}
        <div className={`container-fluid ${styles.containerEdit}`}>
          <div className={`row ${styles.rowEdit}`}>
            <Menu />
            <Routes>
              
              <Route path="/login-success/:userId" element={<LoginSuccess />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/employee" element={<EmployeePage />} />
              <Route path="/employee/:id" element={<DetailEmployee />} />
              <Route path="/employee/add" element={<AddEmployee />} />
              <Route path="/employee/update/:id" element={<UpdateEmployee />} />

              <Route path="/product" element={<MenuManagement />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />

              <Route path="/analysis" element={<Analysis />} />
              <Route path="/order" element={<ManageOrder />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/category/add" element={<AddCategory />} />
              <Route path="/category/update/:id" element={<EditCategory />} />

              <Route path="/coupon" element={<CouponList />} />
              <Route path="/coupon/add" element={<AddCoupon />} />
              <Route path="/coupon/update/:id" element={<UpdateCoupon />} />

              
            </Routes>
            {/* Hiển thị thông báo */}
            <ToastContainer
              position="top-center"
              autoClose={3001}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
