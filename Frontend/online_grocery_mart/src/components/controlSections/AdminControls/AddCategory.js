import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'

const AddCategory = () => {


  const [categoryName, setCategoryName] = useState("");


  const categoryHandler = (event) => {
    setCategoryName(event.target.value);

  };


  const submitHandler = async (event) => {
    event.preventDefault();
  
      let categoryData = { name: categoryName};
      if ( categoryData.name !== "") {
                const response = await fetch("http://localhost:8080/api/category/create", {
                  method: "POST",
                  body: JSON.stringify(categoryData),
                  headers: {
                    "Content-type": "application/json",
                  },
                });
                if (!response.ok) {
                  toast.error("Enter valid category")
                  // throw new Error("somthing went wrong");
                }else{
                  toast.success("Category added successfully")
                  setCategoryName("")
                }

       
      } else {
        toast.error("Fill all details")
      }
    
  };


  

  return (
    <div>
        <div className='container  '>
          <div className='row mt-3 p-2 mt-lg-3'>
            <div className='card col-md-6 offset-md-3 offset-md-3 ' style={{borderRadius:"10px"}}>
              <h3 className='text-center mt-2 fw-bolder' >Add Category</h3>
              <div className='card-body'>
                <form>
                  <div className='form-group mt-2'>
                    <label className='fw-bold'>Category Name:</label>
                    <input placeholder='Category Name' name='firstName' className="form-control mt-2 "  
                     value={categoryName} onChange={categoryHandler}/>
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

export default AddCategory
