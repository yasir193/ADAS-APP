import { createBrowserRouter,  createHashRouter,  Navigate,  RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import NotFound from './Components/NotFound/NotFound';
import Dashboard from './Components/Home/Dashboard';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';



function App() {
  const ProtectedRoute = ({children}) => {
    
  
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }
  
    return children || null;
  };
  
  


  const [currentUser , setCurrentUser ] = useState(null);

  function getUserData(){


    const userData =  jwtDecode(localStorage.getItem('token'));
    setCurrentUser(userData);
  };
  function clearUser(){

    localStorage.removeItem('token');
    setCurrentUser(null);
  }
  
  useEffect(function(){
    if(localStorage.getItem('token') !== null && currentUser == null  ){
      getUserData();
    }
  })
  













  const router =  createHashRouter([
    {path: '/' , element: <Layout currentUser={currentUser } clearUser={clearUser} /> , children: [
      {index: true , element: <Register/> },
      {path: 'register' , element: <Register/> },
      {path: 'login', element: <Login getUserData={ getUserData }/> },
      {path: 'home', element: <Dashboard/> },
      {path: 'profile', element: <Profile currentUser={currentUser}  />},
      {path: '*', element: <NotFound/> }
    ]}
  ])













  return <>
  
  <RouterProvider router= {router} />
  
  
  </>
}

export default App
