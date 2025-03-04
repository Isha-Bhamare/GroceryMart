import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const API_URL = 'http://localhost:8080/api/v1/user/'
const UserAccount = () => {
    const {userData, setUserData} = useContext(UserContext);
    const [updatedUser,setUpdatedUser] = useState({});

    useEffect(() =>{
        if(userData){
            setUpdatedUser(userData);
        }
    },[userData]);

    const handleChange = (e) =>{
        setUpdatedUser((prevProp) => ({...prevProp,[e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.put(API_URL + 'update/' + userData.id,updatedUser,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        if(response.status === 200){
            setUserData(response.data);
            localStorage.removeItem('user-details');
            localStorage.setItem('user-details',JSON.stringify(response.data));
            toast.success("User is Updated!")
        }else{
            toast.error('Something went wrong!')
        }
    } 


  return (
    <div className='container  '>
    <div className='row my-3 p-2  mt-lg-3'>
      <div className='card col-md-6 offset-md-3 offset-md-3  shadow-lg' style={{borderRadius:"10px"}}>
        <h3 className='text-center mt-2 fw-bolder text-success' >Account Information</h3>
        <div className='card-body'>
  <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Enter Name"
                        defaultValue={updatedUser.name}
                        onChange={handleChange} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Jassa"
                        id="email"
                        name="email"
                        defaultValue={updatedUser.email}
                        onChange={handleChange}
                         />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor='phoneNo'>Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        name="phoneNo"
                        id="phoneNo"
                        defaultValue={updatedUser.phoneNo}
                        onChange={handleChange} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor='address'>Address</label>
                    <textarea
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="therichposts@gmail.com"
                        id="address"
                        defaultValue={updatedUser.address}
                        onChange={handleChange}
                        >
                    </textarea>
                </div>
                <div className="mt-3 d-flex flex-row justify-content-between">
                <button type='submit' className="btn btn-success my-3">Save Changes</button>
                <Link to="/" > <button  className="btn border text-success border-success my-3">Continue Shopping</button> </Link>
                </div>

            </form>
            </div>
            </div>
          </div>
        </div>
  
  )
}

export default UserAccount
