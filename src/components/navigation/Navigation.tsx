import React from "react";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";
import useUserDetails from "../../stores/userStore";

const Navigation = () => {
  const { isLoggedIn } = useUserDetails();
  const notifications = true;

  return (
    <React.Fragment>
      <TopHeader/>
      <BottomHeader userLoggedIn ={isLoggedIn} notifications={notifications}/>
    </React.Fragment>
  )
}

export default Navigation;