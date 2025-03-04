import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { CategoriesContext } from '../Context/CategoriesContext'
import { ProductsContext } from '../Context/ProductsContext'
import { UserContext } from '../Context/UserContext'
import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import NavBar from '../NavBar/NavBar'
import Cart from '../Cart/Cart'
import ViewProductCard from '../ViewProductCard/ViewProductCard'
import UserAccount from '../UserAccount/UserAccount'
import ScrollToTop from './ScrollToTop'

const API_URL = "http://localhost:8080/api/v1/cart";

const UserDashboard = (props) => {
  
  const {userData}=useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});

  // console.log(userData);

  useEffect(() => {
    const getCart = async () => {
      const response = await axios.get(API_URL + "/getCartByUserId/" + userData.id);
      if (response.status === 200) {
        setCart(response.data);
      }
    };
  
    if (userData !== null) {
      getCart();
    }
  }, [userData]);

  return (
    <>
    <ProductsContext.Provider value={{products, setProducts}}>
      <CategoriesContext.Provider value={{categories, setCategories}}>
        <CartContext.Provider value={{cart,setCart}}>

          <BrowserRouter className="App">
            <ScrollToTop/>
            
            <NavBar llogout={props.llogout}/>

            <Routes>
                <Route path='/' exact element={<Home/>}>  </Route>
                <Route path='/cart' exact element={<Cart/>}>  </Route>
                <Route path='/viewProduct/:id' exact element={<ViewProductCard/>}></Route>
                <Route path='/user-account' exact element={<UserAccount/>}></Route>
                <Route path='*' exact element={<Home />} />
            </Routes>
            <Footer/>
          </BrowserRouter>
        </CartContext.Provider>
      </CategoriesContext.Provider>
    </ProductsContext.Provider>
    </>
  )
}

export default UserDashboard
