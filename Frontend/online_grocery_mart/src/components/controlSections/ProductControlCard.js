import React from 'react'
import { Link } from 'react-router-dom'

const ProductControlCard = (props) => {
  return (
    <>
      <div className="card shadow m-2 " style={{width: "18rem", borderRadius:"10px"}}>
      <img src={props.product.image} className="img-fluid border border-secondary " style={{maxHeight:"15rem", borderRadius:"10px"}} alt="product_image"></img>
            <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">{props.product.category.name}</p>
                
                {/* <h5 className="card-txt">{props.product.price!==props.product.discountPrice?<del className='text-secondary'>Rs.{props.product.price}</del>:""} Rs.{props.product.discountPrice}</h5> */}
            
            {
                props.product.price!==props.product.discountPrice?
             <>
                <span className="text-muted"><del className='text-secondary'>Rs.{props.product.price}</del></span> 
                <span className="h5"> &nbsp;Rs.{props.product.discountPrice}</span>
             </>
              :
              <span className="h5">Rs.{props.product.discountPrice}</span>
            }
<br/>
                <Link to={`/updateProduct/${props.product.id}`}><button className="btn m-1 mt-2 btn-info">Update</button> </Link>
                <button onClick={() => props.deleteHandler(props.product.id)} className="btn m-1 mt-2 btn-danger">Delete</button> 
                <Link to={`/viewProduct/${props.product.id}`}><button  className="btn m-1 mt-2 btn-success">View</button></Link>
                  
            </div>
        </div>
    </>
  )
}

export default ProductControlCard
