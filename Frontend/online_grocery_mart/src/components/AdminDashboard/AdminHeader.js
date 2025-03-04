import React from 'react'
// import {Container,  Navbar} from "react-bootstrap"
import { Button, Container, Nav, Navbar} from "react-bootstrap"
// import {Badge, Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap"
// import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"
 
const AdminHeader = (props) => {
  return (
    <Navbar bg="dark" variant="dark" style={{height:"4rem"}}>
        <Container fluid>
            <Navbar.Brand>
                <Link to='/'>Online Grocery Mart</Link>
            </Navbar.Brand>
       
            <Nav>

                {/* <Dropdown >
                    <Dropdown.Toggle variant="success" >
                        <FaShoppingCart color="white" fontSize="25px" /> 
                        <Badge bg="success" style={{marginLeft:"2px"}}>{10}</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{minWidth:370}}>
                        <span style={{padding:10}}>Cart is Empty!</span>
                    </Dropdown.Menu>

                </Dropdown> */}

<Button className="btn my-2 my-sm-0  border-0 bg-danger"
                   type="button"
                   onClick={props.llogout}>
                   <svg 
                     xmlns="http://www.w3.org/2000/svg"
                     width="27"
                     height="27"
                     fill="currentColor"
                     className="bi bi-box-arrow-right img-fluid"
                     viewBox="0 0 16 16"
                   >
                     <path
                       fillRule="evenodd"
                       d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                     />
                     <path
                       fillRule="evenodd"
                       d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                     />
                   </svg>
                   &nbsp; Logout
                 </Button>
            </Nav>
        </Container>
    </Navbar>

  )
}

export default AdminHeader
