import axios from 'axios';
import React from 'react'
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 

library.add(faTrashCan)

const API_URL = "http://localhost:8080/api/v1/cart/";

const Cart = () => {

    const {cart,setCart} = useContext(CartContext);
    const {userData} = useContext(UserContext);
    console.log(userData);

    const DecreaseQuantity = async (productId, itemQuantity) =>{
        try{
             const response = await axios.put(API_URL + `descreaseQuantity/${productId}/${userData.id}`);
             if(response.status === 200){
                setCart(response.data);
                if(itemQuantity===1){
                  toast.success("Item remove from cart")
                }else{
                  toast.success("Item quantity decrease")
                }
              }
         } catch(err){
           toast.error("Something went Wrong!")
         }
    }
   

    const IncreaseQuantity = async (productId) =>{
        try{
             const response = await axios.put(API_URL + `increaseQuantity/${productId}/${userData.id}`);
             if(response.status === 200){
                setCart(response.data);

                toast.success("Item quantity increase")
             }
        } catch(err){
          toast.error("Item Out of Stock!")
        }
    }


    const RemoveProduct = async (productId) =>{
        try{
            const response = await axios.delete(API_URL + `removeProduct/${productId}/${userData.id}`);
            if(response.status === 200){
                setCart(response.data);
                toast.success("Item remove from cart")
            }
       } catch(err){
        toast.error("Something went Wrong!")
           
       }

    }

    return (
<section className=" my-5" >
      <Container>
        <Row >
          <Col lg={9}>
            <Card border="1" className="shadow-sm">
              <div className="m-4">
                <h4 className="card-title mb-4">Your shopping cart</h4>
                
                {(cart && cart.cartItems )?(cart.cartItems.map(item => { return (                                          
                <Row className="mb-4 gy-3 p-2 shadow-sm border" style={{borderRadius:"10px"}}>
                  <Col lg={5}>
                    <div className="me-lg-5 d-flex">
                      <Image src={item.product.image} className="border rounded me-3" style={{ width: "96px", height: "96px" }} alt="Product" />
                      <div>
                      <Link to={`/viewProduct/${item.product.id}`}>
                        <p className="text-dark font-weight-bold ml-3">{item.product.name}</p>
                        </Link>
                        <p className="text-muted ml-3">{item.product.category.name}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={2} sm={6} xs={6} className="d-flex flex-row flex-lg-column  text-nowrap">
                 
                      <small className="text-muted text-nowrap m-2">Price: Rs. {item.product.discountPrice}/per item</small>
                      <p className="h6 m-2"> Sub total Rs. {item.product.discountPrice * item.quantity}</p> <br />
                    
                  </Col>
                  <Col lg className="d-flex fl justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2 ">
                    <div className=" d-flex flex-row flex-lg-column justify-content-center align-items-center float-md-end">
                    <div className='d-flex align-items-center justify-content-center border rounded m-2 border-success' style={{maxHeight:"2.5rem"}}>
                                        {/* <label className="sr-only">Quantity</label> */}
                                       <button className='btn  btn-success btn-main' onClick={() => DecreaseQuantity(item.product.id,item.quantity)}>-</button>
                                    <div className="quantity">
                                        <input 
                                            type="number" 
                                            id="qty" 
                                            className="input-text qty text text-center" 
                                            step="1" 
                                            min="0" 
                                            max="9" 
                                            value={item.quantity}
                                            title="Qty" 
                                            disabled
                                            size="4" />
                                    </div>
                            <button className='btn btn-success  btn-main ' style={{maxHeight:"2.5rem"}} onClick={() => IncreaseQuantity(item.product.id)}>+</button>
                                </div>
                    <div>

                    </div>
                      <Button onClick={() => RemoveProduct(item.product.id)} variant="light" className="border text-success icon-hover-success m-2"><FontAwesomeIcon icon={faTrashCan}/> Remove</Button>
                    </div>
                  </Col>
                </Row>
                                            )
                                            })):null}
              </div>

              <div className="border-top pt-4 mx-4 mb-4">
                <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 days</p>
              </div>
            </Card>
          </Col>

          <Col lg={3}>
          <Card className="shadow-0 border">
        <Card.Body>
          <div className="d-flex justify-content-between mt-3">
            <p className="mb-2">Sub Total price:</p>
            <p className="mb-2">Rs.{cart && cart.totalPrice}</p>
          </div>

          {cart && cart.cartItems && cart.cartItems.length ?
           <>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Delivery Fee:</p>
                  <p className="mb-2">Rs.40</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount:</p>
                  <p className="mb-2 text-success">- Rs.40</p>
                </div>
          </>
          :''}

          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2 fw-bold">Rs.{cart && cart.totalPrice}</p>
          </div>


          {/* <div className="mt-3">
            <a href="/" className="btn btn-success w-100 shadow-0 mb-2">Make Purchase</a>
            <a href="/" className="btn btn-light w-100 border mt-2">Back to shop</a>
          </div> */}
          <div className="mt-3">
            {/* <Link to="/" className="btn btn-success text-white w-100 border mt-2">Back to shop</Link> */}
            <Link to="/" className="btn btn-success text-white w-100 border mt-2">Continue Shopping</Link>
          </div>
        </Card.Body>
      </Card>
      
    </Col>
      
        </Row>
      </Container>
    </section>
     
    )
}

export default Cart