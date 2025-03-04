import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faSignOutAlt, faPlus, faFolderPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import './AdminHeader.css';
import { Navbar } from 'react-bootstrap';

library.add(faBars, faSignOutAlt, faPlus);

const AdminHeader = (props) => {
 
    
    
    

    return (
        <div>
     <nav className="header navbar  navbar-expand-lg  fixed-top  w-100 navigation" id="navbar" style={{backgroundColor:"#fff"}}>
    <div className="container fixed-top mx-3 mt-2 mb-0">
      <Link  to="/">
      <Navbar.Brand className='font-weight-bold' style={{color:"#007200"}} >
      Online Grocery Mart
            </Navbar.Brand>
            </Link>

      <button className="navbar-toggler mr-4 " type="button" data-toggle="collapse" data-target="#mainNavbar"
        aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          {/* <span className="navbar-toggler-icon"></span> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-bars" style={{color: "#20c200",}} /> */}
        <FontAwesomeIcon icon={faBars} style={{color: "#20c200", height:"1.5rem"}} />
      </button>

      

      <div className="collapse navbar-collapse bg-white w-100 mr-4 "  id="mainNavbar">
        <ul className="navbar-nav mx-auto d-flex flex-column flex-lg-row justify-content-center p-3 " style={{minWidth:'100%'}}>
        
                    <li className="nav-item hidden" style={{display:'none'}}>
                                <Link className="nav-link d-flex flex-row justify-content-center " to="/">
                                    <FontAwesomeIcon icon={faFolderPlus} />
                                    <span className='px-2'>All Products</span>
                                </Link>
                            </li>

                            <li className="nav-item hidden" style={{display:'none'}}>
                                <Link className="nav-link d-flex flex-row justify-content-center" to="/add-product">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span className='px-2'>Add Product</span>
                                </Link>
                            </li>
                            <li className="nav-item hidden" style={{display:'none'}}>
                                <Link className="nav-link d-flex flex-row justify-content-center" to="/all-categories">
                                    <FontAwesomeIcon icon={faFolderPlus} />
                                    <span className="px-2">All Categories</span>
                                </Link>
                            </li>

                            <li className="nav-item hidden" style={{display:'none'}}>
                                <Link className="nav-link d-flex flex-row justify-content-center" to="/add-category">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span className="px-2">Add Category</span>
                                </Link>
                            </li>
            </ul>
        
    <ul className="navbar-nav top-menu  d-flex flex-row justify-content-center  " >
        
        <li className="list-inline-item ">
          <button className='d-flex flex-row justify-content-center align-items-center border border-success mb-1' onClick={props.logout}>
            <FontAwesomeIcon icon={faSignOut} style={{color:'green',padding:'0px !important'}} /><h5 className='text-success mt-2'>Logout</h5>
          </button>
        </li>
      </ul>
      </div>

    </div>
  </nav>

            <aside id="sidebar collapse navbar-collapse" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link " to="/">
                            <FontAwesomeIcon icon={faFolderPlus} />
                            <span className='px-2'>All Products</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/add-product">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className='px-2'>Add Product</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/all-categories">
                            <FontAwesomeIcon icon={faFolderPlus} />
                            <span className="px-2">All Categories</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link "  to="/add-category">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="px-2">Add Category</span>
                        </Link>
                    </li>
                </ul>

            </aside>
        </div>
    )
}

export default AdminHeader
