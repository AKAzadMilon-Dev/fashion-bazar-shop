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

          <FaShoppingCart onClick={handleShow} className="shoppingCart"/>
          {state.cart.cartItems.length > 0 && (<Badge className="badgeStyle" pill bg="success">{state.cart.cartItems.length}</Badge>)}
          
        </Nav>
        </Container>
      </Navbar>
      {/* Offcanvaus */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link onClick={handleShow} to="/cartpage">
            <div>
              <Button className='w-100' variant="success">Go to cart</Button>
            </div>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Menu
