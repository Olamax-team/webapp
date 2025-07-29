import { useNavigate } from "react-router-dom";
import useUserDetails from "../stores/userStore"
import React from "react";

export const useAutoLogout = () => {
  const { token, loginTime, clearUser } = useUserDetails();
  const  navigate = useNavigate();

  React.useEffect(() => {
    if (!token || !loginTime) return;

    const now = Date.now();
    const duration = 24 * 60 * 60 * 1000;
    const elapsed = now - loginTime;

    if (elapsed >= duration) {
      clearUser();
      navigate('/');
    } else {
      const remaining = duration - elapsed;
      const timeOut = setTimeout(() => {
        clearUser();
        navigate('/')
      }, remaining)

      return () => clearTimeout(timeOut)
    }
  }, [token, loginTime, clearUser, navigate])
}