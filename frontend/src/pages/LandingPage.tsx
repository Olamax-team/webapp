import Crypto from "../components/cryptoTrading/Crypto";
import HeroSection from "../components/hero/hero";
import Navigation from "../components/navigation/Navigation";
import UseOlamax from "../components/useOlamx/UseOlamx";

const LandingPage = () => {
  return (
    <>
      <Navigation/>
      <HeroSection/>
      <Crypto />
      <UseOlamax  />
    </>
  )
}

export default LandingPage;