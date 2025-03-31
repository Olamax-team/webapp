import React from "react";
import Crypto from "../components/cryptoTrading/Crypto";
import HeroSection from "../components/hero/hero";
import Testimonial from "../components/testimonial/Testimonial";
import TradeCrypto from "../components/tradeCrypto/tradeCrypto";
import UseOlamax from "../components/useOlamx/UseOlamx";
import TopHeader from "../components/footer/TopHeader";
import Notifications from "../components/navigation/notifications";


const LandingPage = () => {
  return (
    <React.Fragment>
      <Notifications/>
      <HeroSection/>
      <TradeCrypto/>
      <Crypto/>
      <UseOlamax/>
      <Testimonial/>
      <TopHeader/>
    </React.Fragment>
  )
}

export default LandingPage;