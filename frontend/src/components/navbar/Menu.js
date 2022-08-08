import React, { useContext, useState } from "react";
import { Navbar, Nav,Badge, Container, Offcanvas, Button, Table } from 'react-bootstrap';
import { Store } from "../../Store";
import { Link} from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Menu = () => {

  const {state} = useContext(Store)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">Fashion BAZAR</Navbar.Brand>
        <Nav className="ms-auto navMenu">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/product">Product</Link>
          <Link onClick={handleShow} to="/cartpage">
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
      {/* Offcanvaus */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Menu
