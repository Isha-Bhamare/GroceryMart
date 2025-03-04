import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import { AdminProductContext } from '../../Context/AdminProductContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1/";

const AddProduct = () => 
{

  const {categories} = useContext(AdminCategoryContext);
  
  const {setProducts} = useContext(AdminProductContext);

  const navigate = useNavigate();

  const [productDetails,setProductDetails] = useState({
    name:'',
    image:'',
    description:'',
    price:0,
    discountPrice:0,
    stock:0,
    categoryId:null
  });

  const handleChange = (e) =>{
    setProductDetails((prevState) =>({...prevState,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await axios.post(API_URL + 'product/create',productDetails);
    if(response.status === 200){
      setProducts((prevProducts)=> ([...prevProducts,response.data]));
      toast.success("Product is Created!");
      
      navigate('/');
    } else{
      toast.success( "Something went Wrong!");
    }
  }


  return (
        <div className="card">
            <div className="card-body">
            <h3 className="card-title text-success">Add Product</h3>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    value={productDetails.name}
                    onChange={handleChange}
                    required
                     />
                </div>
                <div className="col-md-12 mt-2">
                  <label htmlFor="image" className="form-label">Product Image</label>
                  <input 
                      type="text"
                      name="image"
                      id="image"
                      className="form-control" 
                      value={productDetails.image}
                      onChange={handleChange} 
                      required
                      />
                </div>
               

                <div className="col-12 mt-2">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Enter Description" 
                    onChange={handleChange}
                    value={productDetails.description}
                    ></textarea>
                </div>
                <div className="col-6 mt-2">
                  <label htmlFor="inputAddress2" className="form-label">Price</label>
                  <input 
                    type="number"
                    name="price"
                    id="price" 
                    className="form-control" 
                    placeholder="Price"
                    value={productDetails.price}
                    onChange={handleChange}
                    required
                     />
                </div>
                <div className="col-6 mt-2">
                  <label htmlFor="sellPrice" className="form-label">Discount Price</label>
                  <input 
                    type="number"
                    name="discountPrice"
                    id="discountPrice" 
                    className="form-control" 
                    placeholder="Sell Price"
                    value={productDetails.discountPrice}
                    onChange={handleChange}
                    required
                     />
                </div>

                <div className="col-md-6 mt-2">
                  <label htmlFor="stock" className="form-label">Stock</label>
                  <input 
                    type="text"
                    name="stock"
                    id="stock"
                    className="form-control"
                    value={productDetails.stock} 
                    onChange={handleChange}
                    required
                     />
                </div>

                <div className="col-md-6 mt-2">
                  <label htmlFor="categoryId" className="form-label">Category</label>
                  <br></br>
                  <select 
                    id="categoryId" 
                    name="categoryId" 
                    className="form-select" 
                    style={{height:'45px',borderRadius:'',boxShadow: 'none',
                    background: '#eee',borderColor: '#eee',outline: 'none'}}
                    onChange={handleChange}
                    required>
                      <option selected>Choose Category</option>
                      {categories.length !== 0 && (
                        categories.map((category =>{
                          return (<option key={category.id} value={category.id}>{category.name}</option>);
                        }))
                      ) }
                  </select>
                </div>

                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-success px-3 mx-3">Submit</button>
                  <Link to='/'>
                         <button className="btn border text-success icon-hover-success" style={{minWidth:'6rem'}}>Back</button>
                  </Link>
                </div>

              </form>
            </div>
        </div>
    )
}

export default AddProduct;
