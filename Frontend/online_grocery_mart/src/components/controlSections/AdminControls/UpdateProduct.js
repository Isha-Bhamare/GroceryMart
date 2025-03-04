import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import adminService from '../../services/AdminService';

const UpdateProduct = () => {
    let { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [productImageURL, setProductImageURL] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDiscountPrice, setProductDiscountPrice] = useState("");
    const [productStocks, setProductStocks] = useState("");
    const [productCategoryId, setProductCategoryId] = useState("");


    async function fetchdataCategory() {
        const response = await fetch("http://localhost:8080/api/category/allcategories", {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
    
        const val = await response.json();

        setCategories(val);
      }

      const productNameHandler = (event) => {
        setProductName(event.target.value);
      };
      const productImageURLHandler = (event) => {
        setProductImageURL(event.target.value);
      };
      const productDescriptionHandler = (event) => {
        setProductDescription(event.target.value);
      }
      const productPriceHandler = (event) => {
        setProductPrice(event.target.value);
      }
      const productDiscountPriceHandler = (event) => {
        setProductDiscountPrice(event.target.value);
      }
      const productProductStocksHandler = (event) => {
        setProductStocks(event.target.value);
      }
      const productProductCategoryIdHandler = (event) => {
        setProductCategoryId(event.target.value);
        // console.log( event.target.value+"onchange"+productCategoryId)
      };

      const submitHandler = async (event) => {
        event.preventDefault();
        let cname = categories.filter(category => Number(productCategoryId) === Number(category.id)).map(category => category.name.trim())[0];
            let productData = {name: productName,image: productImageURL,description: productDescription,
                                price: productPrice,discountPrice: productDiscountPrice,stock: productStocks,
                                category: {
                                    id: productCategoryId,
                                    name: cname
                                }
            };

          if ( productData.name !== "" && productData.image !== "" && productData.description !== "" &&
          productData.price !== "0" && productData.discountPrice !== "0" && productData.stock !== "0" &&
          productData.category.id !== "" && productData.category.name) {
                    const response = await fetch(`http://localhost:8080/api/product/update/${id}`, {
                      method: "PUT",
                      body: JSON.stringify(productData),
                      headers: {
                        "Content-type": "application/json",
                      }
                    });
                    if (!response.ok) {
                      toast.error("Enter valid data!!")
                    }else{
                      toast.success("Product updated successfully")
                    }
    
           
          } else {
            toast.error("Fill all details")
          }
        
      };

    useEffect(() => {
        fetchdataCategory();
        adminService.getProductById(id).then((res)=>{
            setProductName(res.data.name);
            setProductDescription(res.data.description);
            setProductImageURL(res.data.image);
            setProductPrice(res.data.price);
            setProductDiscountPrice(res.data.discountPrice);
            setProductStocks(res.data.stock);
            setProductCategoryId(res.data.category.id)
            // console.log("callback " +res.data.category.id)
        })
    }, [id]);

  return (
    <div>
    <div className='container  '>
      <div className='row mt-3 p-2 mt-lg-3'>
        <div className='card col-md-6 offset-md-3 offset-md-3 ' style={{borderRadius:"10px"}}>
          <h3 className='text-center mt-2 fw-bolder' >Update Product</h3>
          <div className='card-body'>
            <form>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Product Name:</label>
                <input placeholder='Product Name' name='productName' className="form-control mt-2 "  
                 value={productName} onChange={productNameHandler}/>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Product Category:</label>
                <select className="form-control"  onChange={productProductCategoryIdHandler}>
                    {categories.map(category => <option id ={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Product Image URL:</label>
                <input placeholder='Product Image URL' name='productImageURL' className="form-control mt-2 "  
                 value={productImageURL} onChange={productImageURLHandler}/>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Description:</label>
                <textarea placeholder='Product Description' name='productDescription' className="form-control mt-2 "  
                 style={{height:"5rem"}} value={productDescription}  onChange={productDescriptionHandler}/>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Price:</label>
                <input type="number" placeholder='0' name='productPrice' className="form-control mt-2 "  
                 value={productPrice} onChange={productPriceHandler}/>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>Discount Price:</label>
                <input type="number" placeholder='0' name='productDiscountPrice' className="form-control mt-2 "  
                 value={productDiscountPrice} onChange={productDiscountPriceHandler}/>
              </div>
              <div className='form-group mt-2'>
                <label className='fw-bold'>No of Stock:</label>
                <input type="number" placeholder='0' name='setProductStocks' className="form-control mt-2 "  
                 value={productStocks} onChange={productProductStocksHandler}/>
              </div>
              <button className='btn btn-success mt-3' onClick={submitHandler}>Save</button>
              <Link to={'/'}><button className='btn btn-danger mt-3'  style={{marginLeft:"10px"}}>Back</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateProduct
