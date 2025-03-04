
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome ,faEnvelope, faPhone, faPrint} from "@fortawesome/free-solid-svg-icons";
library.add(faHome,faEnvelope, faPhone, faPrint);


const Footer = () => {
  return (
    <footer
          class="text-center text-lg-start text-dark mt-2"
          style={{backgroundColor: "#ECEFF1"}}
          >

    <section
             class="d-flex justify-content-between p-2 "
              style={{background:"#28A745"}}
             >

    </section>

    <section class="shadow-lg" >
      <div class="container py-2 text-center text-md-start " >
       
        <div class="row mt-3">
          
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
           
            <h6 class="text-uppercase  fw-bold">Online Grocery Store</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto  text-left "
                style={{width: "60px", backgroundColor: "#007200", height: "2px"}}
                />
            <p className=' px-2' style={{ textAlign: "justify",
  textJustify: "inter-word"}} >
             Online Grocery Mart delivering fresh products, pantry staples & household essentials. Shop from home, save time & enjoy reliable doorstep delivery. Simplify your shopping experience with us.
            </p>
          </div>
    
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 d-flex justify-content-left flex-column">
       
            <h6 class="text-uppercase fw-bold">Categories</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#007200", height: "2px"}}
                />
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Namkeens & Snacks</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Vegetables</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Fruits</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Dairy  Bread and Eggs</a>
            </p>
          </div>
        
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      
            <h6 class="text-uppercase fw-bold">Useful links</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#007200", height: "2px"}}
                />
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Home</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">About Us</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Privacy policy</a>
            </p>
            <p className='text-left ml-2'>
              <a href="#!" class="text-dark">Help</a>
            </p>
          </div>
       
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#007200", height: "2px"}}
                />

           <p className='text-left ml-2'><FontAwesomeIcon icon={faHome} /> Hinjewadi, Pune 411045, India</p>
            <p className='text-left ml-2'><FontAwesomeIcon icon={faEnvelope} /> ogmsupport@gmail.com</p>
            <p className='text-left ml-2'><FontAwesomeIcon icon={faPhone} /> + 01 234 567 88</p>
            <p className='text-left ml-2'><FontAwesomeIcon icon={faPrint} /> + 01 234 567 89</p>
          
          </div>
        </div>
    
      </div>
    </section>
 
    <div
         class="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
            © 2023 Copyright: Abhinav Mahalley
    </div>
   
  </footer>
  )
}

export default Footer