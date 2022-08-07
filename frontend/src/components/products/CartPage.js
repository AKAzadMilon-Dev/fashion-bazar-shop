import React, { useContext } from 'react'
import { Col, Container, Row, Table, Alert, ListGroup, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Store } from '../../Store'
import { Link, useNavigate  } from 'react-router-dom'
import { AiFillCaretRight, AiFillCaretLeft, AiFillDelete } from "react-icons/ai";

const CartPage = () => {
    

    const {state, dispatch} = useContext(Store)
    const {cart:{cartItems}} = state

  return (
    <>
        <Helmet>
          <title>Shoping Cart</title>
        </Helmet>
        <Container>
            <h2 className='text-center'>Shoping Cart</h2>
            <Row>
                <Col lg={8}>
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
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Stock Status</th>
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
                                                <Button disabled={item.quantity == item.inStock} className='incriButton' variant="gray"><AiFillCaretLeft/></Button>
                                                <span>{item.quantity}</span>
                                                <Button disabled={item.quantity === 1} className='incriButton' variant="gray"><AiFillCaretRight/></Button>
                                                
                                            </td>
                                            <td>{item.inStock}</td>
                                            <td>
                                            <Button className='deleteButton' variant="gray">
                                                    <AiFillDelete className='deleteIcon'></AiFillDelete>
                                            </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                                
                            </Table>
                        </ListGroup>
                        
                    }
                    
                </Col>
            </Row>

        </Container>

    </>
  )
}

export default CartPage