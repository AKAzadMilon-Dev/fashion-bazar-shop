import React from 'react';
import Banner from '../banner/Banner';
import { Helmet } from 'react-helmet-async';
import ProductsPage from '../products/ProductsPage';

const HomePage = () => {
  return (
    <div>
      <Helmet>
          <title>Online Store</title>
        </Helmet>
      <Banner></Banner>
      <ProductsPage></ProductsPage>
    </div>
  );
};

export default HomePage;
