import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product,deleteProduct }) => {
    return (
        <section className="py-2">
            <div className="container bg-white shadow border border-3 p-2" style={{ borderRadius: "10px" }}>
                <div className="row gx-5">
                    <aside className="col-lg-4 my-auto "  >
                        <div className="shadow"
                            style={{ borderRadius: "10px", padding: '0px', marginLeft:'5px' }}>
                            <img
                                style={{ width: "100%", 
                                         height: '200px !important',
                                         borderRadius:'10px',
                                         margin: "auto",
                                        objectFit:'cover' }}
                                alt="product_image" className="rounded-4 fit border"
                                src={product.image} />
                        </div>
                    </aside>

                    <main className="col-lg-8" >
                        <div className="ps-lg-3" style={{padding:'10px'}}>
                            <h4 className="title text-dark my-2">
                                {product && product.name}
                            </h4>

                            <div className="d-flex flex-row my-3">
                                <span className="text-muted"> 🛒 Stock: {product && product.stock} items</span>
                                <span className="text-success ms-2">&nbsp; in stock</span>
                            </div>

                            <div className="mb-3">
                            {product.price !== product.discountPrice ?<>
                                <span className="text-muted"><del className='text-secondary'>Rs.{product.price}.00</del></span>
                                <span className="h5"> &nbsp;Rs {product && product.discountPrice}.00</span>
                            </>: <span className="h5"> &nbsp;Rs {product && product.price}.00</span> }
                            </div>
                            <p>
                                {product && product.description}
                            </p>
                            <hr />
                            <div className="row">
                                <dt className="col-4 col-lg-3">Category:</dt>
                                <dd className="col-8 col-lg-9">{product && product.category.name}</dd>
                            </div>
                            <hr />
                            <Link to={'/update-product/' + product.id }>
                                <button className='btn btn-success mb-2 '
                                    style={{ marginLeft: "10px", width: "7rem" }}>
                                    Update
                                </button>
                            </Link>
                            <button onClick={() => deleteProduct(product.id)}
                            style={{ marginLeft: "10px", width: "7rem" }}
                             className='btn border text-success icon-hover-success  mx-3 mb-2 px-3 text-center'>
                                Delete
                            </button>
                        </div>

                    </main>

                </div>

            </div>

        </section>
    )
}

export default ProductCard;
