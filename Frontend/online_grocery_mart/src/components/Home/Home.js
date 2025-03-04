import React from 'react';
import './Home.css';
import BannerImage from '../../assets/images/8460841-3.jpg'
import Products from '../Products/Products';


const Home = () => {
    return (
    <>
            <img src={BannerImage} className="img-fluid w-80 h-10 mb-3" alt="product-img"
        style={{ height: '400px !important' }} />
            
        <Products/>
    </>)
}

export default Home;
