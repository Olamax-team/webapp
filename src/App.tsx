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

      if (storedToken && storedUserDetail) {
          try {
              const parsedUserDetail:userProps = JSON.parse(storedUserDetail);
              setUser(parsedUserDetail, storedToken);
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
