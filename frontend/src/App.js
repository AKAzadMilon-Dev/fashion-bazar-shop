import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/home/HomePage";
import ShopPage from "./components/shop/ShopPage";
import ProductsPage from "./components/products/ProductsPage";
import ProductDetails from "./components/products/ProductDetails";
import AddToCart from "./components/products/AddToCart";
import CartPage from "./components/products/CartPage";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Menu from "./components/navbar/Menu";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/addtocart/:slug" element={<AddToCart/>}></Route>
          <Route path="/cartpage" element={<CartPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/footer" element={<Footer/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
