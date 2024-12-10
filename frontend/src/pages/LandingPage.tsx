import Crypto from "../components/cryptoTrading/Crypto";
import HeroSection from "../components/hero/hero";
import Navigation from "../components/navigation/Navigation";
import TradeCrypto from "../components/tradeCrypto/tradeCrypto";
import UseOlamax from "../components/useOlamx/UseOlamx";

const LandingPage = () => {
  return (
    <>
      <Navigation/>
      <HeroSection/>
      <TradeCrypto/>
      <Crypto />
      <UseOlamax  />
    </>
  )
}

export default LandingPage;