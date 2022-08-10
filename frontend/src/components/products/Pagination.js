import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Col, Card, Button, Badge } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Rating from './Rating';

const Pagination = ({ itemsPerPage, product, handelAddToCart, setLgShow }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    product.map((item, index)=>{
        items.push(index+1)
    })

    function Items({ currentItems }) {
        return (
          <>
            {currentItems &&
              currentItems.map((item) => (
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
                            {item.inStock == 0
                            ?
                            <Badge bg="danger">Out of Stock</Badge>
                            :
                            <div className="gap-5 buttonStyle">
                                <Button className='proButton' onClick={()=>handelAddToCart(item)} variant="success" size="md">Add To Cart</Button>
                                <Button className='viewButton' onClick={()=>setLgShow(true)} variant="success">View Details</Button>
                            </div>
                            }
                        </Card>
                    </Col>
              ))}
          </>
        );
    }


    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(product.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                className='pagination'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Pagination
