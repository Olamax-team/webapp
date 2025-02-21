import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';
import { useLocalStorage } from '../../hooks/use-localstorage';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, setUser } = useUserDetails();

  const { getItem } = useLocalStorage();
  const storedUser = getItem('user');
  const storedToken = getItem('token');


  React.useEffect(() => {
    if (storedUser && storedToken && !user && !token) {
      setUser(JSON.parse(storedUser), storedToken);
    }
  }, []);

  React.useEffect(() => {
    if (!user || !token) {
      localStorage.setItem('intendedRoute', location.pathname);
      navigate('/');
    }
  }, [user, token, navigate, location.pathname]);

  if (user && token) {
    return children;
  }
  
  return null;
};

export default ProtectedRoute;