import React from 'react';
import Banner from '../banner/Banner';
import { Helmet } from 'react-helmet-async';
import ProductsPage from '../products/ProductsPage';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Online Store</title>
      </Helmet>
      <Banner></Banner>
      <ProductsPage></ProductsPage>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
