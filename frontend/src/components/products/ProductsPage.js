import React, {useState, useEffect, useReducer, useContext} from 'react';
import axios from 'axios';
import { SpinnerDiamond } from 'spinners-react';
import { Container, Row, Dropdown, Modal, Card, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Pagination from './Pagination';
import { Store } from '../../Store';
import Rating from './Rating';


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
    const [lgShow, setLgShow] = useState(false);
    const [details, setDetails] = useState({});

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

    const {state, dispatch: contextDespatch} = useContext(Store)
    const {cart} = state

    let handelAddToCart = async (product)=>{
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
    }

    const handleProductDetails = async (proDetails)=>{
        setLgShow(true)
        const productDetails = await axios.get(`/products/${proDetails}`)
        setDetails(productDetails.data)
    }

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
                        <Pagination itemsPerPage={8} product={product} handelAddToCart={handelAddToCart} handleProductDetails={handleProductDetails}></Pagination>
                    }
                </Row>
                {/* Modal */}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>Product Details</Modal.Header >
                    <Modal.Body >
                        {details
                        ?
                        <Card className="text-center">
                            <Card.Img variant="top" src={details.img} />
                            <Card.Body>
                                <Card.Title>{details.name}</Card.Title>
                                <Card.Text>{details.description}</Card.Text>
                                <Card.Text>
                                    <Rating rating={details.rating} ratingNumber={details.ratingNumber}/>
                                </Card.Text>
                                <Card.Text> Price ${details.price}</Card.Text>
                                <Button onClick={()=>handelAddToCart(details)} variant="primary">Add To Cart</Button>
                            </Card.Body>
                        </Card>
                        :
                        <h3>Product Details is not avialable</h3>
                        }
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default ProductsPage;
