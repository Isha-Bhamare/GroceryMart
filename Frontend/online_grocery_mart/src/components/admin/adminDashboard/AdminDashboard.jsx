import React,{useState,useEffect} from 'react';
import './AdminDashboard.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import axios from 'axios';
import { Routes,Route } from 'react-router';

import AllProducts from '../allProducts/AllProducts';
import AllCategories from '../allCategories/AllCategories';
import AddProduct from '../addProduct/AddProduct';
import AdminHeader from '../adminHeader/AdminHeader';
import AddCategory from '../addCategory/AddCategory';
import UpdateProduct from '../updateProduct/UpdateProduct';
import {AdminProductContext} from '../../Context/AdminProductContext'
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import UpdateCategory from '../updateCategory/UpdateCategory';
import { BrowserRouter } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/v1/";

const AdminDashboard = (props) => 
{
    const MySwal = withReactContent(Swal);
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);

    const getCategories = async () =>{
        const response = await axios.get(API_URL + 'category/allcategories');
        if(response.status === 200){
            setCategories(response.data);
        }
        else{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went's Worng!",
            });
        }
    }
    
    const getAllProducts = async () =>{
        const response = await axios.get(API_URL + 'product/allproducts');
        if(response.status === 200){
            setProducts(response.data);
        }
        else{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong's",
            })
        }
    }

 

    useEffect(() => {
        getAllProducts();
        getCategories();
        // eslint-disable-next-line
    }, []);
    
    return (
        <>
            <AdminProductContext.Provider value={{products,setProducts}}>
                <AdminCategoryContext.Provider value={{categories,setCategories}}>
                    <BrowserRouter>
                    <AdminHeader logout={props.logout}/>
                    <main id="main" className="main">
                        <Routes>
                            <Route path="/" exact element={<AllProducts getAllProducts={getAllProducts} />}/>
                            <Route path="/add-product" element={<AddProduct />}/>
                            <Route path="/update-product/:id" element={<UpdateProduct />}/>
                            <Route path="/all-categories" element={<AllCategories getCategories={getCategories} />}/>
                            <Route path="/add-category" element={<AddCategory />}/>
                            <Route path="/update-category/:id" element={<UpdateCategory />}/>
                            <Route path="*" element={<AllProducts getAllProducts={getAllProducts} />}/>
                        </Routes>
                    </main>
                    </BrowserRouter>
                </AdminCategoryContext.Provider>
            </AdminProductContext.Provider>
        </>
    )
}

export default AdminDashboard;
