import { useNavigate } from 'react-router-dom';
import './App.css'
import { documentTitle } from './lib/utils';
import LandingPage from './pages/LandingPage';
import useUserDetails, { userProps } from './stores/userStore';
import React from 'react';
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

function App() {
  documentTitle('Home');

  const navigate = useNavigate();
  const { setUser } = useUserDetails();


  const { VITE_APP_VAPID_KEY } = import.meta.env;

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  React.useEffect(() => {
    requestPermission();
  }, []);

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
