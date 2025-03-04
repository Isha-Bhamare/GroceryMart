import React, { useContext } from 'react';
import './Category.css';
import axios from 'axios';
import { ProductsContext } from '../Context/ProductsContext';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8080/api/v1/product/';

const Category = ({category}) => 
{
    const {setProducts} = useContext(ProductsContext);

    const changeByCategory = async (categoryId) =>{
        const response = await axios.get(API_URL + 'allproductsbycategory/' + categoryId);
        if(response.status === 200){
            setProducts(response.data);
        }else{
            toast.error("Something went's Wrong!")
        }
    }
    return (
        <div class="row justify-content-center align-items-center d-flex flex-row flex-lg-column">
            <div class="col-lg-12 col-sm-12 col-md-4 m-1 category-container d-flex flex-row align-items-center justify-content-center">
                <div class="item-info align-items-center justify-content-center text-center" >
                    <p class="mb-0 py-3 text-center" onClick={() => changeByCategory(category.id)}
                        style={{cursor:'pointer',fontSize:'20px',color:'black'}}>
                        {category && category.name}
                    </p>
                </div>
            </div>
        </div>)
}

export default Category;