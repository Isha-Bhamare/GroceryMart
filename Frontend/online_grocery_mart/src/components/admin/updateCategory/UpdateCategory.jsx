import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1/";

const UpdateCategory = () => {

    const {categories} = useContext(AdminCategoryContext);
    const {id} = useParams();
    const [category,setCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() =>{
        const getCategory = () =>{
            setCategory(categories.filter((category) => Number(category.id) === Number(id))[0]);
        }
        
        if(categories.length !== 0){
            getCategory();
        }
    },[categories,id]);

    const handleChange = (e) =>{
        setCategory((prevCatg) => ({...prevCatg,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.put(API_URL+'category/update/' + id,category,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                toast.success('Category updated Successfully')
               
                navigate('/all-categories');
            }
        } catch(err){
            toast.error('Something went Wrong!')
        }
    }

    return (
        <div className="card">
             <div className="card-body">
             <h3 className="card-title text-success">Udate Category</h3>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12 mt-2">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            id="name"
                            value={category !== null ? category.name : ""}
                            defaultValue=""
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-success px-3 mx-3">Submit</button>
                        <Link to='/all-categories'>
                         <button className="btn border text-success icon-hover-success" style={{minWidth:'6rem'}}>Back</button>
                       </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategory;
