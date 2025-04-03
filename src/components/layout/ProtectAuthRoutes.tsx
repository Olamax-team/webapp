import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';

const ProtectAuthRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useUserDetails();

  useEffect(() => {
    if (user && token) {
      const intendedRoute = localStorage.getItem('intendedRoute') || '/';
      navigate(intendedRoute);
    }
  }, [user, token, navigate, location.pathname]);

  return children;
};

export default ProtectAuthRoute;