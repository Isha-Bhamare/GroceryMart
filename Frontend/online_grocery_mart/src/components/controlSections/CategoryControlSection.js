// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import adminService from '../services/AdminService';
// import { toast } from 'react-hot-toast';


// const CategoryControlSection = () => {

//     const [categories, setCategories] = new useState([]);


//     async function fetchdata()
//     {
//         const response = await fetch("http://localhost:8080/api/category/allcategories", {
//           method: "GET",
//         });
//         if (!response.ok) {
//           throw new Error("somthing went wrong");
//         }
//         const val = await response.json();
//             setCategories(val);
//     }

//     const deleteHandler = (id)=>{
//         adminService.deleteCategory(id).then(()=>{
//           toast.success("Category Deleted !")
//         })
//         // fetchdata();
//     }

//     useEffect(() => {
      
//       fetchdata();
  
//       // // Cleanup function
//       // return () => {
//       //   // Perform any cleanup operations here
//       // };
//     }, []); // Empty dependency array to run the effect only once
  

//   return (
//     <div  className='col col-auto bg-light  p-md-4  border ' >
      
//       <div >
//         <h2 className="text-center mt-3">All Categories</h2>
        
//             {/* <button className="btn btn-primary"><Link to="/add-employee" className='text-decoration-none text-white'>Add Employee</Link></button> */}
//         <Link  to="/addCategory"><button className="btn btn-primary">Add Category</button></Link>
//         <div className='row mt-3 ' >
//         <table className="table table-striped table-bordered">
//                 <thead>
//                     <tr>
//                     <th >Category id</th>
//                     <th>Category Name</th>
//                     <th>Actions </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         categories.map(
//                             category => 
//                             <tr key = {category.id}>
//                                 <td>{category.id}</td>
//                                 <td>{category.name}</td>
//                                 <td className='flex justify-content-center align-items-center'>
//                                     <button className="btn m-1 btn-info">Update</button>
//                                     <button  onClick={deleteHandler(category.id)} className="btn m-1 btn-danger">Delete</button>
//                                 </td>
//                             </tr>
//                         )
//                     }
                    
//                 </tbody>
//             </table>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default CategoryControlSection


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../services/AdminService';
import { toast } from 'react-hot-toast';

const CategoryControlSection = (props) => {
  const [categories, setCategories] = useState(props.categories);

  async function fetchdata() {
    const response = await fetch('http://localhost:8080/api/category/allcategories', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    const val = await response.json();
    setCategories(val);
  }

  const deleteHandler = (id) => {
    adminService.deleteCategory(id).then(() => {
      toast('Category Deleted!',{icon: '🗑️'});
      fetchdata();
      props.fetchdataCategory()
      props.fetchdataProduct() // Fetch data again after successful deletion
    })
    .catch((error) => {
      console.error(error);
    });
    // fetchdata();
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className='col col-auto bg-light p-md-4 border'>
      <div>
        <h2 className='text-center mt-3'>All Categories</h2>

        <Link to='/addCategory'>
          <button className='btn btn-primary'>Add Category</button>
        </Link>
        <div className='row mt-3 '>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Category id</th>
                <th>Category Name</th>
                <th>Actions </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td className='flex justify-content-center align-items-center'>
                  <Link to={`/updateCategory/${category.id}`}><button className='btn m-1 btn-info'>Update</button></Link>
                    <button onClick={() => deleteHandler(category.id)} className='btn m-1 btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryControlSection;

