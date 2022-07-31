import React, { useContext } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Container, Navbar, Nav,Badge} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Home from "./components/home/HomePage";
import ShopPage from "./components/shop/ShopPage";
import ProductsPage from "./components/products/ProductsPage";
import ProductDetails from "./components/products/ProductDetails";
import AddToCart from "./components/products/AddToCart";
import { Store } from "./Store";

function App() {

  const {state} = useContext(Store)

  return (
    <>
      <BrowserRouter>
        <Navbar bg="light" variant="light">
          <Container>
          <Navbar.Brand href="#home">Fashion BAZAR</Navbar.Brand>
          <Nav className="ms-auto navMenu">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/product">Product</Link>
            <Link to="/cart">
              <FaShoppingCart className="shoppingCart"/>
              {state.cart.cartItems.length > 0 && (
                <Badge pill bg="success">
                {state.cart.cartItems.length}
                </Badge>
              )}
            </Link>
          </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/addtocart/:slug" element={<AddToCart/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
