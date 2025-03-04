import React from 'react';
import './ProductCard.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

library.add(faShoppingCart);

const API_URL = 'http://localhost:8080/api/v1/cart/';

const ProductCard = ({product}) => {
    const {setCart} = useContext(CartContext);
    const {userData} = useContext(UserContext);
   

    const addToCart = async (productId) =>{
        try{
            const response = await axios.post(API_URL + 'addToCart',{
                userId:userData.id,
                productId:productId,
                quantity:1
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            });
    
            if(response.status === 200){
                setCart(response.data);
                
                toast.success("Product added to cart")
            }
        } catch(err){
            console.log(err);
            toast.error("Product already in the cart");
            
        }
    }

    return (
        <>
        <div className="card shadow m-2 mb-3 main-product  " style={{width: "18rem", borderRadius:"10px"}}>
        <img src={product.image} className="img-fluid shadow-sm " style={{maxHeight:"15rem", borderRadius:"10px"}} alt="product_image"></img>
              <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.category.name}</p>
               
              {
                  product.price!==product.discountPrice?
               <>
                  <span className="text-muted"><del className='text-secondary'>Rs.{product.price}</del></span> 
                  <span className="h5 text-success"> &nbsp;Rs.{product.discountPrice}</span>
               </>
                :
                <span className="h5 text-success">Rs.{product.discountPrice}</span>
              }
                    <br/>
           
                  <button  onClick={() => addToCart(product.id)} className="btn m-1 mt-2 btn-success w-100">Add to Cart</button> 
                  <Link to={`/viewProduct/${product.id}`}>
                  <Button variant="light" className="border text-success icon-hover-success m-1 w-100">View</Button>
                  </Link>
                    
              </div>
          </div>
      </>
        
        )
}

export default ProductCard;