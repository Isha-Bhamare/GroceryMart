import React, { useEffect, useState } from 'react'
import "./Register.css";
// import swal from "sweetalert";
// import AdminDashboard from '../AdminDashboard/AdminDashboard';
// import AdminDashboard from '../Admin/adminDashboard/AdminDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';
import LoginRegisterUI from './LoginRegisterUI';
import { toast } from 'react-hot-toast';
import { UserContext } from '../Context/UserContext';
import AdminDashboard from '../admin/adminDashboard/AdminDashboard';
const Register = () => {
    const [userpage, setUserpage] = useState("login");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const [role, setRole] = useState("");
    
    const [emailValid, setEmailValid] = useState(true);
    const [passValid, setPassValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [phoneNoValid, setPhoneNoValid] = useState(true);

    const [userData, setUserData] = useState({});
    
    const loginHandler = (event) => {
        setEmail("");
        setPassword("");
        setUserpage(event.target.value);
      };


      const registerHandler = (event) => {
        setEmail("");
        setPassword("");
        setName("")
        setAddress("")
        setPhoneNo("")
        setUserpage(event.target.value);
      };


      const emailHandler = (event) => {
        // console.log("from the register page ui:email",event.target.value);
        setEmail(event.target.value);
    
        if (event.target.value === "") {
          setEmailValid(true);
        } else {
          if (
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
          ) {
            setEmailValid(true);
          } else {
            setEmailValid(false);
          }
        }
      };

      const passwordHandler = (event) => {
        setPassword(event.target.value);
        let password = event.target.value;
    
        if (event.target.value === "") {
          setPassValid(true);
        } else {
          if (password.length <= 5) {
            setPassValid(false);
          } else {
            setPassValid(true);
          }
        }
      };

      const nameHandler = (event) => {
        setName(event.target.value);
        let name = event.target.value;
    
        if (event.target.value === "") {
          setNameValid(true);
        } else {
          if (name.length <= 1) {
            setNameValid(false);
          } else {
            setNameValid(true);
          }
        }
      };

      const addressHandler = (event) => {
        setAddress(event.target.value);
        let address = event.target.value;
        
        if (event.target.value === "") {
            setAddressValid(true);
        } else {
            if (address.length <= 4) {
                setAddressValid(false);
            } else {
                setAddressValid(true);
            }
        }

      };

      const phoneNoHandler = (event) => {
        setPhoneNo(event.target.value);

        let phoneNo = event.target.value;
    
        if (event.target.value === "") {
          setPhoneNoValid(true);
        } else {
          if (phoneNo.length <= 9 || phoneNo.length > 12 ) {
            setPhoneNoValid(false);
          } else {
            setPhoneNoValid(true);
          }
        }
      };


      const retriveUserData = async (userdata) => {

        if(emailValid && passValid && userdata.email!=="" && userdata.password!=="")
       {
            const response = await fetch("http://localhost:8080/api/v1/user/login", {
              method: "POST",
              body: JSON.stringify(userdata),
              headers: {
                "Content-type": "application/json",
              },
            });
            const val = await response.json();
            // console.log(val.userid, val.role);
            if (!response.ok) {
                // throw new Error("somthing went wrong");
                console.log(response);
                toast.error(`Wrong Id/Password or Registered First`);
                return;
            }
            
            if(val.id>0)
            {
                setUserData(val);
                console.log(val);
                // swal({
                //   title: "Success",
                //   text: "Login successfull",
                //   icon: "success",
                // })
                toast.success(`Login successfull`);
                ((value) => {
                  setValid(true);
                  setRole(val.role);
                  localStorage.setItem("uniqueid", val.id);
                  localStorage.setItem("role", val.role);
                  localStorage.setItem("userData",JSON.stringify(val));
                })();
            }
            else
            {
                //     swal({
                //       title: "Error",
                //       text: "Wrong Id/Password or Registered First",
                //       icon: "error"
                // })
                toast.error(`Wrong Id/Password or Registered First`)
            }
        } 
        else
        {
            // swal({
            //   title: "Error",
            //   text: "Please fill login id and password",
            //   icon: "error"
            // })
            toast.error(`Please fill login id and password`)
            
        }     
      };



      const submitHandler = async (event) => {
        event.preventDefault();
      
        if (userpage === "register") {
          let userdata = { name:name,address:address,phoneNo:phoneNo,email: email, password: password, role: "USER" };
          if (
            emailValid &&
            passValid && nameValid && addressValid && phoneNoValid && 
            userdata.email !== "" &&
            userdata.password !== "" && userdata.name !== "" && userdata.address !== "" && userdata.phoneNo !== ""
          ) {
            console.log(JSON.stringify(userdata))
            const response = await fetch("http://localhost:8080/api/v1/user/register", {
              method: "POST",
              body: JSON.stringify(userdata),
              headers: {
                "Content-type": "application/json",
              },
            });
            if (!response.ok) {
            //   throw new Error("somthing went wrong");
            console.log(response)
            toast.error(`User already register or add correct details.`);
            return;

            }
           

            const val = await response.json();
            setUserData(val);
            console.log(val);

            toast.success(`Registeration successfull login Now.`);
            ((value) => {
              setEmail("");
              setPassword("");
              setAddress("");
              setName("");
              setPhoneNo("")
            })();
          } else {
            toast.error(`Fill all details`)
            // swal({
            //   title: "Error",
            //   text: "Fill all details",
            //   icon: "error",
            // });
            setNameValid(false);
            setAddressValid(false);
            setPhoneNoValid(false);
            setPassValid(false);
            setEmailValid(false);
          }
        } else {
            let userdata = { email: email, password: password};
            retriveUserData(userdata);
        }
      };
    

      useEffect(() => {
        if (localStorage.getItem("uniqueid") > 0) {
          setValid(true);
          setUserData(JSON.parse(localStorage.getItem('userData')));
          setRole(localStorage.getItem("role"));
        }
      }, []);


      const logoutSession = () => {
        console.log("logout")
        localStorage.removeItem("uniqueid");
        localStorage.removeItem("role");
        setEmail("");
        setPassword("");
        window.location.href = "/";
        // redirect("/");
        // localStorage.removeItem("cartItemList");
        setValid(false);
        toast.success(`Logout successfull.`);
      };
    

      let values = { emailid: email, upassword: password , name:name, address:address, phoneNo:phoneNo };


  return (
    <>
      {valid && role === "ADMIN" && (
        // <AdminDashboard userData={userData} llogout={logoutSession} arole={"ADMIN"} />
        <AdminDashboard userData={userData} logout={logoutSession} arole={"ADMIN"} />
      )}
      {valid && role === "USER" && (
        <UserContext.Provider value={{userData, setUserData}}>
          <UserDashboard userData={userData} llogout={logoutSession}  arole={"USER"}/>
        </UserContext.Provider>
      )}
      {!valid && (
        <LoginRegisterUI
          ehandler={emailHandler}
          phandler={passwordHandler}
          ahandler={addressHandler}
          pnhandler={phoneNoHandler}
          nhandler={nameHandler}
          shandler={submitHandler}
          lhandler={loginHandler}
          rhandler={registerHandler}
          upage={userpage}
          uvalue={values}
          nameValid={nameValid}
          addressValid={addressValid}
          phoneNoValid={phoneNoValid}
          passvalid={passValid}
          emailvalid={emailValid}
        />
      )}
    </>
  )
}

export default Register
