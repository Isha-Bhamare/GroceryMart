// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import ProductControlCard from './ProductControlCard';

// const ProductControlSection = () => {


//     const [products, setProducts] = new useState([]);


//     async function fetchdata()
//     {
//         const response = await fetch("http://localhost:8080/api/product/allproducts", {
//           method: "GET",
//         });
//         if (!response.ok) {
//           throw new Error("somthing went wrong");
//         }
//         const val = await response.json();
//         setProducts(val);
//     }


//     useEffect(() => {
//         fetchdata();
//       }, []);
    

//   return (
//     <div className='col col-lg bg-light p-md-4 border' >
//               <div >
//         <h2 className="text-center mt-3">All Products</h2>
        
//             {/* <button className="btn btn-primary"><Link to="/add-employee" className='text-decoration-none text-white'>Add Employee</Link></button> */}
//         <Link  to="/addCategory"><button className="btn btn-primary">Add Product</button></Link>

//         <div className='d-flex flex-column flex-md-row row mt-3   justify-content-center align-items-center' >
//            {
//              products.map(product => <ProductControlCard product={product}/>)
//            }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default ProductControlSection


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductControlCard from './ProductControlCard';
import adminService from '../services/AdminService';
import { toast } from 'react-hot-toast';

const ProductControlSection = (props) => {
  const [products, setProducts] = useState(props.products);
//   const navigate = useNavigate();
  async function fetchdata() {
    const response = await fetch("http://localhost:8080/api/product/allproducts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const val = await response.json();
    setProducts(val);
  }

  const deleteHandler = (id) => {
    adminService.deleteProduct(id).then(() => {
      toast('Product Deleted!',{icon: '🗑️'});
      fetchdata();
      props.fetchdataProduct() // Fetch data again after successful deletion
    })
    .catch((error) => {
      console.error(error);
    });
    fetchdata();
  };

  useEffect(() => {
    fetchdata();
  }, [props.products]); // Empty dependency array because fetchdata doesn't depend on any props or state variables

  return (
    <div className='col col-lg bg-light p-md-4 border'>
      <div>
        <h2 className="text-center mt-3">All Products</h2>
        
        <Link to="/addProduct">
          <button className="btn btn-primary">Add Product</button>
        </Link>

        <div className='d-flex flex-column flex-md-row row mt-3 justify-content-center align-items-center'>
          {products.map(product => <ProductControlCard key={product.id} product={product} deleteHandler={deleteHandler}/>)}
        </div>
      </div>
    </div>
  );
}

export default ProductControlSection;
