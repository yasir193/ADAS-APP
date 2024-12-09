import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import SideBar from './../SideBar/SideBar';
import { Outlet } from 'react-router-dom';

export default function Layout({currentUser , clearUser}) {
  return <>
  
  <Navbar   currentUser = {currentUser} clearUser = {clearUser} />
  <SideBar/>

    <Outlet/>

  <Footer/>
  
  </>
}
