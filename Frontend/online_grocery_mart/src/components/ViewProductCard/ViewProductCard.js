import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import './ViewProductCard.css'
import { ProductsContext } from '../Context/ProductsContext';

const ViewProductCard = () => {
  const API_URL = 'http://localhost:8080/api/v1/cart/';

  let { id } = useParams();
  const { products } = useContext(ProductsContext);
  const { setCart } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

 
  const addToCart = async (productId) => {
    try {
      const response = await axios.post(API_URL + 'addToCart', {
        userId: userData.id,
        productId: productId,
        quantity: quantity
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setCart(response.data);
        toast.success("Product added to cart")
      }
    } catch (err) {
      if ("Product quantity out of stock!" === err.response.data.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error("Product already in the cart")
      }

    }
  }


  
  useEffect(() => {
    const selectedProduct = products.filter((prod) => Number(prod.id) === Number(id))[0];
    setProduct(selectedProduct);
    setCategory(selectedProduct.category.name)
   
  }, [id, products]);

  return (
    <section className="py-5 px-2 ">
      <div className="container bg-white shadow border border-3 p-5" style={{ borderRadius: "10px" }}>
        <div className="row gx-5">
          <aside className="col-lg-6" >
            <div className="border border border-success shadow d-flex justify-content-center" style={{ borderRadius: "10px" }}>

              <img style={{ maxWidth: "80%", maxHeight: "100vh", margin: "auto" }} alt="product_image" className="rounded-4 fit" src={product.image}></img>

            </div>
          </aside>

          <main class="col-lg-6">
            <div class="ps-lg-3">
              <h4 class="title text-dark">
                {product.name}
              </h4>
              <div class="d-flex flex-row my-3">
                <span class="text-muted"> 🛒{product.stock} items &nbsp; </span>
                <span class="text-success ms-2"> in stock</span>
              </div>

              <div class="mb-3">
                {product.price !== product.discountPrice ?
                  <>
                    <span className="text-muted"><del className='text-secondary'>Rs.{product.price}</del></span>
                    <span className="h5"> &nbsp;Rs.{product.discountPrice}</span>
                  </>
                  :
                  <span className="h5">Rs.{product.discountPrice}</span>}
              </div>

              <p style={{ textAlign: "justify" }}>
                {product.description}
              </p>

              <hr />

              <div class="row">
                <dt class="col-3">Category:</dt>
                <dd class="col-9">&nbsp;{category}</dd>
              </div>

              <hr />

              {/* <button onClick={() => addToCart(product.id)}  className="btn  btn-success border border-light mt-3" style={{marginRight:"10px", minwidth:"7rem"}}><h5>Add to cart</h5></button>  */}
              <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                <div className='d-flex flex-row  align-items-center mt-3'>  <strong>Quantity:</strong>
                  <input className='border border-success m-3 p-2 ' type="number" style={{ maxWidth: "3.5rem" }} value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                  <button onClick={() => addToCart(product.id)} className="btn btn-success border-success text-white border-success p-2" style={{ minwidth: "7rem" }}>Add to Cart</button>
                </div>

                <Link to="/" > <button className="btn border text-success border-success mt-3 p-2" style={{ minWidth: "7rem" }}>Continue Shopping</button> </Link>
              </div>

              {/* <Link to={'/'}><button className='btn btn-primary mt-3 '  style={{ width:"7rem"}}><h5>Back</h5></button></Link> */}

            </div>
          </main>
        </div>
      </div>
    </section>
  )
}

export default ViewProductCard
