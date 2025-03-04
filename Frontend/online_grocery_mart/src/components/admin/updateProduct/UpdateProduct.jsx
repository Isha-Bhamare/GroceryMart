import React,{useEffect} from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AdminProductContext } from '../../Context/AdminProductContext';
import { Link } from 'react-router-dom';

const API_URL =  "http://localhost:8080/api/v1/";

const UpdateProduct = () => 
{
    const {products} = useContext(AdminProductContext);
    const {categories} = useContext(AdminCategoryContext);
    
    const {id} = useParams();
    const [product,setProduct] = useState({
      name:'',
      image:'',
        description:'',
        price:0,
        discountPrice:0,
        stock:0,
        categoryId:0
      });

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    
    useEffect(() => {

      const getProduct = () =>{
          const selectedProduct = products.filter((prod) => Number(prod.id) === Number(id))[0];
          setProduct({
            name:selectedProduct.name,
            image:selectedProduct.image,
            description:selectedProduct.description,
            price:selectedProduct.price,
            discountPrice:selectedProduct.discountPrice,
            stock:selectedProduct.stock,
            categoryId:selectedProduct.category.id
          })
          
        }
      if(products.length !== 0){
        getProduct();
      }
    }, [products, id]);

    
    const handleChange = (e) =>{
 
      setProduct((prevState) => ({...prevState,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        
        const response = await axios.put(API_URL + 'product/update/'+id,product,{
          headers:{
            'Content-Type':'application/json'
          }
        });
        if(response.status === 200){
          MySwal.fire({
            icon:'success',
            title:'Success',
            text:"Product Updated Successfully",
            timer:2000
          });
          navigate('/');
        }
      } catch(err){
        MySwal.fire({
          icon:'error',
          title:'Error',
          text:"Something went's Wrong!"
        });
      }
    }

    return (
        <div className="card">
            <div className="card-body">
            <h3 className="card-title text-success">Udate Product</h3>        
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12 ">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    value={product.name}
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
                      value={product.image}
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
                    value={product.description}
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
                    value={+product.price}
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
                    placeholder="Discount Price"
                    value={+product.discountPrice}
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
                    value={product.stock} 
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
                      <option defaultValue={''}>Choose Category</option>
                      {categories.length !== 0 && (
                        categories.map((category =>{
                          return (<option 
                            key={category.id} 
                            value={category.id}
                            selected={ product.categoryId !== 0 ? (product.categoryId === category.id ? true :false):false }
                            >{category.name}</option>);
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

export default UpdateProduct
