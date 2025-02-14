import { useNavigate } from 'react-router-dom';
import './App.css'
import { documentTitle } from './lib/utils';
import LandingPage from './pages/LandingPage';
import useUserDetails, { userProps } from './stores/userStore';
import React from 'react';

function App() {
  documentTitle('Home');

  const navigate = useNavigate();
  const { setUser } = useUserDetails();

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

  return <LandingPage/>;
};

export default App;
