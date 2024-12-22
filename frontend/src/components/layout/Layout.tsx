import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../navigation/Navigation';
import Footer from '../footer/Footer';

const Layout = () => {
  const { pathname } = useLocation();
  const isAuthRoutes = pathname === '/log-in' || pathname === '/sign-up';

  return (
    <React.Fragment>
      { isAuthRoutes ? '' : <Navigation/> }
      <Outlet/>
      { isAuthRoutes ? '' : <Footer/> }
    </React.Fragment>
  )
}

export default Layout;