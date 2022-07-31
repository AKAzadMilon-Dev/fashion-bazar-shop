import React, {useState, useEffect, useReducer} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { SpinnerDiamond } from 'spinners-react';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading:true};
        case 'FETCH_SUCCESS':
            return {...state, loading:false, product:action.payload};
        case 'FETCH_FAILS':
            return {...state, loading:false, error:action.payload};
      default:
        return state
    }
  }

const ProductsPage = () => {

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        loading:false,
        error:'',
        product:[]
    });

    useEffect( async ()=>{
        dispatch({type:'FETCH_REQUEST'})
        try{
            const product = await axios.get("/products")
            dispatch({type:'FETCH_SUCCESS', payload:product.data})
        }catch(error){
            dispatch({type:'FETCH_FAILS', payload:error.message})
        }
    },[])

  return (
    <>
        <Container>
        <Helmet>
          <title>Product Page</title>
        </Helmet>
            <Row>
                <Dropdown.Header className='header'>
                    <h3>Editor's Pick</h3>
                </Dropdown.Header>
                { loading ?
                <div className='loading'>
                    <SpinnerDiamond size={69} thickness={137} speed={100} color="rgba(65, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                </div>
                :
                product.map(item=>(
                    <Col lg={3}>
                        <Card className="cardTitle">
                            <div className='imghidden'>
                                <Card.Img className='img' variant="top" src={item.img} alt={item.img} />
                            </div>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Card.Title>
                                <Card.Text>
                                    <Rating rating={item.rating} ratingNumber={item.ratingNumber}/>
                                </Card.Text>
                                <Card.Text><h6>Price = $ {item.price}</h6></Card.Text>
                                <Card.Text>{item.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <Link to="/addtocart" className="btn btn-primary" size="md">Add to cart</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
  );
};

export default ProductsPage;
