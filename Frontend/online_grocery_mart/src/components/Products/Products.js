import axios from 'axios';
import React, { useCallback, useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-hot-toast';
import { CategoriesContext } from '../Context/CategoriesContext';
import { ProductsContext } from '../Context/ProductsContext';
import ProductCard from '../ProductCard/ProductCard';
import './Products.css'

const Products = () => {

    const API_URL = 'http://localhost:8080/api/v1/';

    const { products, setProducts } = useContext(ProductsContext);
    const { categories, setCategories } = useContext(CategoriesContext);
  
  const getAllProduct = async () => {
      try {
        const response = await axios.get(API_URL + 'product/allproducts');
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }

    const changeByCategory = async (categoryId) =>{
        const response = await axios.get(API_URL + 'product/allproductsbycategory/' + categoryId);
        if(response.status === 200){
            setProducts(response.data);
        }else{
          toast.error("Something went wrong!");
        }
    }

    const getCategories = useCallback(async () => {
      try {
        const response = await axios.get(API_URL + 'category/allcategories');
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }, [ setCategories]);

  
    const getAllProducts = useCallback(async () => {
      try {
        const response = await axios.get(API_URL + 'product/allproducts');
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          toast.error("Something went wrong");
          
        }
      } catch (err) {
        toast.error("Something went wrong");
          
      }
    }, [setProducts]);
  
    useEffect(() => {
      const fetchData = async () => {
        await getCategories();
        await getAllProducts();
      };
  
      fetchData();
    }, [getAllProducts, getCategories]);

  return (
   <Container className='col-12 d-flex flex-column mx-10 mt-2 flex-lg-column justify-content-between' style={{maxWidth:"90vw"}} >
    <div  className='col-sm-12 row d-flex flex-row flex-lg-row justify-content-around ' style={{minWidth:"100%"}}>
    <p className="widget-title  mb-4 font-weight-bold"  style={{ cursor: 'pointer', fontSize: '2rem',color:"#007200" }}>Products</p>

        <div class="dropdown">
        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Filter by Category
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item  " onClick={getAllProduct}>All products</div>
            {categories && (categories.map(category => (
            <div class="dropdown-item  " id={category.id} onClick={() => changeByCategory(category.id)}>{category.name}</div>
            )))}
                        
        </div>
        </div>
    </div>

    <div className='d-flex flex-column flex-md-row row mt-3 justify-content-center align-items-center'>
      {products && products.length?<>{products.map(product => <ProductCard key={product.id} product={product} />)}</>:
      <h1 className='text-center text-success' style={{marginTop:"6rem",marginBottom:"10rem"}}>Product Not Found!</h1>}
          
        </div>
   </Container>
  )
}

export default Products