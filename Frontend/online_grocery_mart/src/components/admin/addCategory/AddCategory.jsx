import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1/";

const AddCategory = () => 
{

    const {setCategories} = useContext(AdminCategoryContext);

    const [categoryDetail,setCategoryDetail] = useState({
        name:''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setCategoryDetail((prevData) => ({...prevData,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post(API_URL+'category/create',categoryDetail);
        if(response.status === 200){
            console.log(response.data);
            setCategories((prevState) => ([...prevState,response.data]));
            toast.success("Category is created!");
           
            navigate('/all-categories');
        }else{
            toast.error("Something went wrong!")
        }
    }  

    return (
        <div className="card">
            <div className="card-body">
            <h3 className="card-title text-success">Add Category</h3>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12 mt-2">
                        <label htmlFor="inputName5" className="form-label">Category Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            id="inputName5"
                            value={categoryDetail.name}
                            onChange={handleChange} />
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

export default AddCategory
