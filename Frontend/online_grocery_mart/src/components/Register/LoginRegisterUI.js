import React from 'react'

const LoginRegisterUI = (props) => {
    let context=<Loginfrom registerbutton={props.rhandler}/>
  let hintmessage=<h2 style={{color: 'rgb(3, 236, 3)'}}>Login Here.</h2>
  let registerpage=<></>
  if(props.upage==="register")
  {
    hintmessage=<>
    <h2 style={{color: 'rgb(3, 236, 3)'}}>Register here </h2>
    
    </>
    registerpage=<>
                <label htmlFor="name" className="label-name">
              <span className="name-span">User Name</span>

              <div className="input-name-container">
                <i className="ph-envelope"></i>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={props.nhandler}
                  value={props.uvalue.name}
                  className={`input-name ${!props.nameValid?"passError":""}`}
                  placeholder="Enter your name"
                  autoFocus
                />
              </div>
            </label>
            <label htmlFor="phoneNo" className="label-phoneNo">
              <span className="phoneNo-span">Phone Number</span>

              <div className="input-phoneNo-container">
                <i className="ph-envelope"></i>
                <input
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  onChange={props.pnhandler}
                  value={props.uvalue.phoneNo}
                  className={`input-phoneNo ${!props.phoneNoValid?"passError":""}`}
                  placeholder="Enter your phone number"
                  autoFocus
                />
              </div>
            </label>
            <label htmlFor="address" className="label-address">
              <span className="address-span">User Address</span>

              <div className="input-address-container">
                <i className="ph-envelope"></i>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={props.ahandler}
                  value={props.uvalue.address}
                  className={`input-address ${!props.addressValid?"passError":""}`}
                  placeholder="Enter your address"
                  autoFocus
                />
              </div>
            </label>
            </>
        context=<Registerform loginbutton={props.lhandler} />
  }



  return (
    <>
         <div className="container1 ">
        <div className="container-shadow shadow-lg">
        <header className="header2">
            <i className="ph-dog"></i>
            <h2 className="title text-center" style={{color:"green"}}>Online Grocery Mart</h2>
         </header>

            {hintmessage}
          <form name="signin" className="form" onSubmit={props.shandler}>

        {
            registerpage
        }
            <label htmlFor="email" className="label-email">
              <span className="email-span">Email address</span>

              <div className="input-email-container">
                <i className="ph-envelope"></i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={props.ehandler}
                  value={props.uvalue.emailid}
                  className={`input-email  ${!props.emailvalid?"passError":""}`}
                  placeholder="Enter your email"
                  autoFocus
                />
              </div>
            </label>

            <label htmlFor="password" className="label-password">
              <span className="password-span">Password</span>

              <div className="input-password-container">
                <i className="ph-lock"></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={props.phandler}
                  value={props.uvalue.upassword}
                  className={`input-password ${!props.passvalid?"passError":""}`}
                  placeholder="*************"
                />
              </div>
            </label>
            {context}
          </form>
        </div>
      </div>

      
    </>
  )
};



export const Registerform=(props)=>
{
    return(
        <>
            <button type="submit" className="btn btn-success register-btn" >Create Account</button>
            <button type="button" className="btn border border-success text-success  register-btn" onClick={props.loginbutton} value="login">Login</button>
        </>
    )
}
export const Loginfrom=(props)=>
{
    return(
        <>
        <button type="submit" className="btn btn-success register-btn" >Login</button>
        <button type="button" className="btn border border-success text-success  register-btn" onClick={props.registerbutton} value="register">New Account</button>
       </>
    )
}

export default LoginRegisterUI
