import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../navigation/Navigation';
import Footer from '../footer/Footer';
import ModalProvider from '../ui/modal-provider';
import { Toaster } from "../ui/toaster"

const Layout = () => {
  const { pathname } = useLocation();
  const authRoutes = ['/log-in', '/sign-up', '/password-recovery']
  const isAuthRoutes = authRoutes.includes(pathname);
  

  return (
    <React.Fragment>
      <Toaster/>
      <ModalProvider/>
      { isAuthRoutes ? '' : <Navigation/> }
      <Outlet/>
      { isAuthRoutes ? '' : <Footer/> }
    </React.Fragment>
  )
}

export default Layout;