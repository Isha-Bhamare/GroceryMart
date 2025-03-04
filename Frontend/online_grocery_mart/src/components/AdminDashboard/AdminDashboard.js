import React from 'react'
import AdminHeader from './AdminHeader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import CategoryControlSection from '../controlSections/CategoryControlSection'
import ControlSections from '../controlSections/ControlSections'
import AddCategory from '../controlSections/AdminControls/AddCategory'
import UpdateCategory from '../controlSections/AdminControls/UpdateCategory'
import ViewProduct from '../controlSections/AdminControls/ViewProduct'
import AddProduct from '../controlSections/AdminControls/AddProduct'
import UpdateProduct from '../controlSections/AdminControls/UpdateProduct'
// import Home from '../Home'

const AdminDashboard = (props) => {
  return (
    <div style={{background:"#efefef", minHeight:"100vh", maxWidth:"100vw"}}>
       <BrowserRouter className="App">
          <AdminHeader llogout={props.llogout}/>
        <Routes>
         <Route path='/' exact element={<ControlSections/>}>  </Route>
         <Route path='/addCategory' exact element={<AddCategory/>}></Route>
         <Route path='/updateCategory/:id' exact element={<UpdateCategory/>}></Route>
         <Route path='/viewProduct/:id' exact element={<ViewProduct/>}></Route>
         <Route path='/addProduct' exact element={<AddProduct/>}></Route>
         <Route path='/updateProduct/:id' exact element={<UpdateProduct/>}></Route>
         </Routes>
          {/* <AdminHeader llogout={props.llogout}/> */}
         
    </BrowserRouter>
    </div>
  )
}

export default AdminDashboard
