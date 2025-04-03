import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const authRoutes = ['/log-in', '/sign-up', '/verify-email'];

  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useUserDetails();

  React.useEffect(() => {
    if (!user || !token) {
      localStorage.setItem('intendedRoute', location.pathname);
      navigate('/');
    }
  }, [user, token, navigate, location.pathname]);

  if (user && token) {
    if (authRoutes.includes(location.pathname)) {
      const intendedRoute = localStorage.getItem('intendedRoute') || '/';
      navigate(intendedRoute);
    } else {
      return children;
    }
  }

  return <Loader2 className='animate-spin'/>;
};

export default ProtectedRoute;