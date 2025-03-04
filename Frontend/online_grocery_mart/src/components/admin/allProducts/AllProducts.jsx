import React, {  useContext } from 'react';
import { useEffect } from 'react';
import { AdminProductContext } from '../../Context/AdminProductContext';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8080/api/v1/';

const AllProducts = ({getAllProducts}) => {
    const { products, setProducts } = useContext(AdminProductContext);

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(API_URL + 'product/delete/' + id);
            if (response.status === 200) {
                setProducts(products.filter((prod) => prod.id !== id));
                toast.success("Product deleted!");
            }
        } catch (err) {
            toast.error("Something went wrong!")
        }
    }

    useEffect(() =>{
        getAllProducts();
        // eslint-disable-next-line
    },[])

    return (
        <section className="section" style={{ paddingTop: '10px' }}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-success">All Products</h3>
                            {products.length !== 0 ? (
                                products.map((product) => {
                                    return (<ProductCard key={product.id} product={product} deleteProduct={deleteProduct} />)
                                })
                            ) : null}
                        </div>
                    </div>

                </div>
            </div>
        </section>)
}

export default AllProducts;


