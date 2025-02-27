import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

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
    return children;
  }
  
  return <Loader2 className='animate-spin'/>;
};

export default ProtectedRoute;