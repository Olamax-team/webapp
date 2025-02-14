import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import useUserDetails, { userProps } from '../../stores/userStore';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { isLoggedIn, setUser } = useUserDetails();
    const navigate = useNavigate();

      React.useEffect(() => {
          const storedToken = localStorage.getItem('token');
          const storedUserDetail = localStorage.getItem('userDetail');
          const storedUserLoginStatus = localStorage.getItem('isLoggedIn');
    
          console.log(storedUserLoginStatus)
    
          if (storedToken && storedUserDetail && storedUserLoginStatus) {
              try {
                  const parsedUserDetail:userProps = JSON.parse(storedUserDetail);
                  const isLoggedIn:boolean = storedUserLoginStatus ? JSON.parse(storedUserLoginStatus) : false;
                  setUser(parsedUserDetail, storedToken, isLoggedIn);
              } catch (error) {
                  console.error("Error parsing user data:", error);
                  localStorage.clear();
              }
          } else {
              navigate('/');
          }
      }, [navigate, setUser]);

    return isLoggedIn ? children || <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;