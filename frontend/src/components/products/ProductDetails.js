import React, {useState, useEffect, useReducer, useContext} from 'react';
import { Col, Container, Row, Card, ListGroup, Badge, Button, Alert } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Rating from './Rating';
import AddToCart from './AddToCart';
import { Link,useNavigate } from 'react-router-dom'
import { Store } from '../../Store';

function reducer(state, action) {
  switch (action.type) {
    case 'FECTH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,loading:false,product:action.payload};
    case 'FETCH_FAILS':
      return {...state,loading:false,error:action.payload};
    default:
      return state
  }
}

const ProductDetails = () => {
  let navigate = useNavigate();
    let params = useParams();

    const [{loading, product, error}, dispatch] = useReducer(reducer,{
      loading:false,
      product:{},
      error:""
  });

  useEffect( async ()=>{
    dispatch({type:'FECTH_REQUEST'})
    try{
        const product = await axios.get(`/products/${params.slug}`)
        console.log(product)
        dispatch({type:'FETCH_SUCCESS',payload:product.data})
    }catch{
        dispatch({type:'FETCH_FAILS',payload:error.message})
    }
},[params.slug])

const {state, dispatch: contextDespatch} = useContext(Store)
const {cart} = state

let handleAddToCart = async ()=>{
  const existingItem = cart.cartItems.find((item)=>item._id === product._id)
  const quantity = existingItem ? existingItem.quantity +1 : 1
  const {data} = await axios.get(`/productcart/${product._id}`)
  if(data.inStock < quantity){
    window.alert(`${product.name} out of stack`)
    return
  }
  contextDespatch({
    type: 'CART_ADD_ITEM',
    payload: {...product, quantity:1}
  })
  navigate(`/cartpage`);
}

  return (
    <div>
      <Container>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Row>
          {product ?
          <>
            <Col className='imgDisplay' lg={7}>
              <Col lg={9}>
                <img className='imgView' src={product.img} alt={product.name}></img>
                
              </Col>
              <Col className='imgSmall' lg={3}>
                <img className='imgViewSmall' src={product.img} alt={product.name}></img>
              </Col>
            </Col>
            <Col lg={5}>
              <Card>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                  <h6>Total = {product.inStock > 0 ? <Badge bg="success">{product.inStock}</Badge> : <Badge bg="danger">{product.inStock}</Badge>} Stock </h6>
                </ListGroup.Item>
                <ListGroup variant="flush">
                  <ListGroup.Item className='productDetails'>
                    <Rating name="rating" rating={product.rating} ratingNumber={product.ratingNumber}/>
                    <h5>Price = $ {product.price}</h5>
                    <h6>{product.description}</h6>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <div className="d-grid gap-2 buttonStyle">
                <Button onClick={handleAddToCart} variant="success" size="md">Add To Cart</Button>
              </div>
            </Col>
          </>
          :
          <Alert className='alert' variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again.
            </p>
          </Alert>
        }
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
