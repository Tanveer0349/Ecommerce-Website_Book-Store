import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Dashboard from "./core/UserDashboard";
import { isAdmin, isAuthenticated } from "./auth";
import AdminDashboard from "./core/AdminDashboard";
import Protected from "./auth/AdminRoute";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <Protected
              isAuthenticated={
                isAdmin()}
            >
              <AdminDashboard />
            </Protected>
          }
        />
        <Route path="/user/dashboard" exact element={<Dashboard />} />
        <Route path="/create/category" exact element={<CreateCategory />} />
        <Route path="/create/product" exact element={<CreateProduct />} />
        <Route path="/products/:productId" exact element={<Product />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
