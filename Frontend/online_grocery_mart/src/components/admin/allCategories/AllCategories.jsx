import axios from 'axios';
import React, { useContext } from 'react';
import { AdminCategoryContext } from '../../Context/AdminCategoryContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1/";

const AllCategories = ({getCategories}) => {

    const { categories, setCategories } = useContext(AdminCategoryContext);

  

    const deleteCategory = async (id) => {
        const response = await axios.delete(API_URL + 'category/delete/' + id);
        if (response.status === 200) {
            setCategories(categories.filter((cate) => cate.id !== id));
            toast.success("Category deleted!")
        }
        else {
            toast.error("Something went's Worng!")
        }
    }

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, []);
  

    return (
        <section className="section" style={{ paddingTop: '10px' }}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card" style={{minHeight:'90vh'}}>
                        <div className="card-body">
                            <h3 className="card-title text-success">All Categories</h3>
                            <div className="container d-flex justify-content-center row">
                                { categories.length !== 0 && (
                                        categories.map(category => {
                                            return (
                                                <div key={category.id} className="card mx-1 border" style={{minWidth: '15rem'}}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{category.name}</h5>
                                                        <Link
                                                        style={{marginRight:'10px'}}
                                                         to={"/update-category/" + category.id} className="btn btn-success text-white">update</Link>
                                                        <button className="btn border text-success icon-hover-success" onClick={() => deleteCategory(category.id)}> Delete</button>
                                                    </div>
                                                </div>)
                                        })
                                    )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AllCategories;
