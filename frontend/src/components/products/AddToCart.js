import React, {useState, useEffect, useReducer} from 'react';
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ProductDetails from './ProductDetails';

function reducer(state, action) {
    switch (action.type) {
      case 'FECTH_REQUEST':
        return {
            ...state,
            loading:true
        };
      case 'FETCH_SUCCESS':
        return {
            ...state,
            loading:false,
            product:action.payload
        };
      case 'FETCH_FAILS':
        return {
            ...state,
            loading:false,
            error:action.payload
        };
      default:
        return state
    }
  }

const AddToCart = () => {
    let params = useParams();

    const [{loading, product, error}, dispatch] = useReducer(reducer,{
        loading:false,
        product:{},
        error:""
    });
  
    useEffect( async ()=>{
      dispatch({
          type:'FECTH_REQUEST'
      })
      try{
          const product = await axios.get(`/addtocart/${params.slug}`)
          console.log(product)
          dispatch({
              type:'FETCH_SUCCESS',
              payload:product.data
          })
      }catch{
          dispatch({
              type:'FETCH_FAILS',
              payload:error.message
          })
      }
  },[params.slug])
  return (
    <div>
        <Container>
            <Row className='cart'>
                <Col lg={3}></Col>
                <Col lg={6}>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{product.name}</ListGroup.Item>
                            <ListGroup.Item>{product.price}</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={3}></Col>
            </Row>
        </Container>
    </div>
  );
};

export default AddToCart;
