import Crypto from "../components/cryptoTrading/Crypto";
import Footer from "../components/footer/Footer";
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
      <Footer/>
    </>
  )
}

export default LandingPage;