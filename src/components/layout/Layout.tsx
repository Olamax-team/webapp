import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../navigation/Navigation';
import Footer from '../footer/Footer';
import ModalProvider from '../ui/modal-provider';
import { Toaster } from "../ui/toaster"
import ScrollUp from '../scrollUpIcon/scrollUp';
import QueryProvider from '../ui/react-query-provider';

const Layout = () => {
  const { pathname } = useLocation();
  const authRoutes = ['/log-in', '/sign-up', '/password-recovery', '/verify-email', '/set-new-password']
  const isAuthRoutes = authRoutes.includes(pathname);
  
  const location = useLocation();
  const protectedRoutes = ['/dashboard']; 
  
  React.useEffect(() => {
    if (protectedRoutes.includes(location.pathname)) {
      localStorage.setItem('intendedRoute', location.pathname);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <QueryProvider>
        <Toaster/>
        <ModalProvider/>
        <ScrollUp/>
        { isAuthRoutes ? '' : <Navigation/> }
        <Outlet/>
        { isAuthRoutes ? '' : <Footer/> }
      </QueryProvider>
    </React.Fragment>
  )
}

export default Layout;