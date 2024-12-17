import React from "react";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

const Navigation = () => {
  const userLoggedIn = false;
  const notifications = true;

  return (
    <React.Fragment>
      <TopHeader/>
      <BottomHeader userLoggedIn ={userLoggedIn} notifications={notifications}/>
    </React.Fragment>
  )
}

export default Navigation;