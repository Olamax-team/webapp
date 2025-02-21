import React from "react";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

const Navigation = () => {
  const notifications = true;

  return (
    <React.Fragment>
      <TopHeader/>
      <BottomHeader notifications={notifications}/>
    </React.Fragment>
  )
}

export default Navigation;