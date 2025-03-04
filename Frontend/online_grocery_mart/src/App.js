import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
// import 'font-awesome/css/font-awesome'
// import Header from './components/Header';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Cart from './components/Cart';
import Register from './components/Register/Register';
import { Toaster } from 'react-hot-toast';
// import NewNavbar from './components/NavBar/NewNavBar';
// import UserDashboard from './components/UserDashboard/UserDashboard';

function App() {



  return (
    <>
    <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
      </div>
    <Register/>
    </>
  );
}

export default App;
