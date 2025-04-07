import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';

const ProtectAuthRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useUserDetails();

  React.useEffect(() => {
    if (user && token) {
      navigate('/dashboard');
    }
  }, [user, token, navigate, location.pathname]);

  return children;
};

export default ProtectAuthRoute;