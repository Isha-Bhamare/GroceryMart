import React, { useContext } from 'react'
import {  Container, Navbar } from 'react-bootstrap'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser,faShoppingCart,faSignOut, faBars } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from '../Context/CartContext';
library.add(faUser,faShoppingCart,faSignOut);

const NavBar = (props) => {
    const {cart} = useContext(CartContext)
    
  return (
    <>
     <Navbar bg="success" variant="dark" style={{height:"2rem" ,backgroundColor: "#ECEFF1"}}>
        <Container fluid  className="justify-content-center">
        <Navbar.Brand className='font-italic font-weight-bold' style={{fontSize:"small"}}>
                    Grocery Offer Zone Top Deals & Discounts
            </Navbar.Brand>
        </Container>
     </Navbar>


     <nav className="navbar  navbar-expand-lg  shadow  w-100 navigation" id="navbar" style={{backgroundColor:"#ECEFF1"}}>
    <div className="container">
      <Link  to="/">
      <Navbar.Brand className='font-weight-bold' style={{color:"#007200"}} >
      Online Grocery Mart
            </Navbar.Brand>
            </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar"
        aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          {/* <span className="navbar-toggler-icon"></span> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-bars" style={{color: "#20c200",}} /> */}
        <FontAwesomeIcon icon={faBars} style={{color: "#20c200", height:"1.5rem"}} />
      </button>

      

      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Categories </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-account">Account</Link>
          </li>
        </ul>
              <ul className="navbar-nav top-menu mx-auto d-flex flex-row justify-content-between  " style={{width:"7rem"}}>
        <li className="list-inline-item flex flex-row justify-content-center align-items-center align-text-top">
          <Link to="/cart" className="position-relative">
            <FontAwesomeIcon icon="shopping-cart" />
            <span className="text-success position-absolute top-0 start-100 translate-middle badge-circle" >
              {/* {cart && cart.cartItems && cart.cartItems.length} */}
              {cart && cart.cartItems && cart.cartItems.length ? cart.cartItems.reduce((acc, item) => acc + item.quantity, 0) : ''}
            </span>
          </Link>
        </li>
        <li className="list-inline-item">
          <button onClick={props.llogout}>
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </li>
      </ul>
      </div>

    </div>
  </nav>
    </>
  )
}

export default NavBar