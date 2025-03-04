import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CategoryControlSection from './CategoryControlSection'
import ProductControlSection from './ProductControlSection'

const ControlSections = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

//   const navigate = useNavigate();
  async function fetchdataProduct() {
    const response = await fetch("http://localhost:8080/api/product/allproducts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const val = await response.json();
    setProducts(val);
  }

  async function fetchdataCategory() {
    const response = await fetch("http://localhost:8080/api/category/allcategories", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const val = await response.json();
    setCategories(val);
  }

  useEffect(() => {
    fetchdataProduct();
    fetchdataCategory();
  }, []); 

  return (
    <Container className='pb-2' style={{maxWidth:"100vw"}}>
      {/* <div className='m-2 d-flex flex-column flex-md-row row'> */}
      <div className='m-2 d-flex flex-column flex-md-row row justify-content-around'>

      <CategoryControlSection fetchdataProduct={fetchdataProduct} fetchdataCategory={fetchdataCategory} categories={categories}/>
      <ProductControlSection products={products} fetchdataCategory={fetchdataCategory} />
      </div>
    </Container>
  )
}

export default ControlSections
