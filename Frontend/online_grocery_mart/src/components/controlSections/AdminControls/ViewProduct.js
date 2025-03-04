import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import adminService from '../../services/AdminService';

const ViewProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [category,setCategory] = useState("")

    useEffect(()=>{
        adminService.getProductById(id).then((res)=>{
            setProduct(res.data);
            setCategory(res.data.category.name)
        })
    },[id])

  return (
    

<section className="py-5 ">
  <div className="container bg-white shadow border border-3 p-5"  style={{borderRadius:"10px"}}>
    <div className="row gx-5">
      <aside className="col-lg-6">
        <div className="border border border-success shadow d-flex justify-content-center" style={{borderRadius:"10px"}}>
          
            <img style={{maxWidth: "80%", maxHeight: "100vh", margin: "auto"}}  alt="product_image" className="rounded-4 fit" src={product.image}></img>

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
          {product.price!==product.discountPrice?
             <>
                <span className="text-muted"><del className='text-secondary'>Rs.{product.price}</del></span> 
                <span className="h5"> &nbsp;Rs.{product.discountPrice}</span>
            </>
            :
            <span className="h5">Rs.{product.discountPrice}</span>}
          </div>

          <p>
            {product.description}
          </p>

          <hr />

          <div class="row">
            <dt class="col-3">Category:</dt>
            <dd class="col-9">{category}</dd>
          </div>

          <hr />
              
          <Link to={'/'}><button className='btn btn-primary mt-3 '  style={{marginLeft:"10px", width:"7rem"}}><h5>Back</h5></button></Link>

        </div>
      </main>
    </div>
  </div>
</section>




  )
}

export default ViewProduct
