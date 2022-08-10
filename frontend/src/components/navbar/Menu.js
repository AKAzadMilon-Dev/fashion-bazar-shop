import React, { useContext, useState } from "react";
import { Navbar, Nav,Badge, Container, Offcanvas, Button, Table, Alert, ListGroup, Form, Row, Col } from 'react-bootstrap';
import { Store } from "../../Store";
import { Link} from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillCaretRight, AiFillCaretLeft, AiFillDelete } from "react-icons/ai";

const Menu = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {state, dispatch} = useContext(Store)
  const {cart:{cartItems}} = state

  const updateQuantity = (item, quantity)=>{
      dispatch({
          type: 'CART_ADD_ITEM',
          payload: {...item, quantity}
      })
  }

  const handleRemoveItem = (item)=>{
      dispatch({
          type: 'CART_REMOVE_ITEM',
          payload: item
      })
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Fashion BAZAR</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navMenu">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/product">Product</Link>
              <FaShoppingCart onClick={handleShow} className="shoppingCart"/>
              {state.cart.cartItems.length > 0 && (<Badge className="badgeStyle" pill bg="success">{state.cart.cartItems.length}</Badge>)}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ms-auto navMenu">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Offcanvaus */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length < 0
            ?
            <Alert variant="dander">
                Cart is empty!
            </Alert>
            :
            <ListGroup className='listStyle'>
              <Table>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Product</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                {cartItems.map((item)=>(
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <Link to={`/products/${item.slug}`}>{item.name}</Link>
                            </td>
                            <td>
                                <img width="50" src={item.img}></img>
                            </td>
                            <td>
                                $ {item.price}
                            </td>
                            <td>
                            <Button onClick={()=>handleRemoveItem(item)} className='deleteButton' variant="gray">
                                <AiFillDelete className='deleteIcon'></AiFillDelete>
                            </Button>
                            </td>
                        </tr>
                    </tbody>
                ))}
              </Table>
            </ListGroup>
            }
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
