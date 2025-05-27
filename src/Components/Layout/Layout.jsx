import React from 'react'
import Navbar from './../Navbar/Navbar';
import SideBar from './../SideBar/SideBar';
import { Outlet } from 'react-router-dom';

export default function Layout({currentUser , clearUser}) {
  return <>
  
    <Navbar currentUser = {currentUser} clearUser = {clearUser} />
    
      <Outlet/>
    
    
  
  </>
}
