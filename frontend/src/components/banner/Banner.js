import React from 'react';
import {Carousel} from 'react-bootstrap'
import data from './BannerData';

const Banner = () => {
  return (
    <>
        <div >
            <Carousel >
                {data.map(item=>(
                    <Carousel.Item >
                        <div className='carousel' style={{background:`url(${item.img})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat', padding:'250px 0', position:'relative'}}>
                        </div>
                        <Carousel.Caption className='carouselInner'>
                            <h1>{item.title}</h1>
                            <h6>{item.subtitle}</h6>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    </>
  );
};

export default Banner;
