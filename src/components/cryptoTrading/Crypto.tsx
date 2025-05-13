import { Button } from "../ui/button";
import rectangle18 from '../../assets/images/Rectangle 18.png';
import strokes from '../../assets/images/strokes-removebg-preview.png';
import strokesmall from '../../assets/images/strokessmall.svg'
import useUserDetails from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import React from "react";

const Crypto = () => {
  const { user, kycDetails, fetchKycDetails } = useUserDetails();

  React.useEffect(() => {
    if (user) {
      fetchKycDetails()
    }
  }, [user]);

  const navigate = useNavigate();

  return (
    <section className="h-auto w-full flex justify-center items-center overflow-hidden">
      <div className="relative flex flex-col sm:flex-row justify-between items-center w-full h-auto flex-wrap">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 2xl:w-[106px] 2xl:h-[195.47px] xl:w-[100px] xl:h-[180px] md:w-[80px] md:h-[170px] w-[76px] h-[70px]">
            <img 
              src={strokes} 
              alt="Decorative_strokes" 
              className="object-contain h-full lg:block hidden"
            />
            <img 
              src={strokesmall} 
              alt="Decorative_strokes" 
              className="object-contain h-full lg:hidden"
            />
          </div>

          {/* mobile view of center text and content*/}
          <div className="bg-white w-full px-10 md:px-32 flex justify-center items-center min-h-[400px] max-h-[700px] lg:hidden">
            <div className="w-full">
              <h2 className="text-[28px] mb-8 md:text-[32px] leading-normal font-semibold">
                Crypto Trading Made Seamless
              </h2>
              <div className="flex flex-col justify-between">
                <p className="mb-12">Trade Bitcoin, Ethereum, Tether (USDT), Stellar, Ripple, Matic, USDC and your favorite cryptocurrencies on the OLAMAX trading platform</p>
                <Button className="w-[160px] h-[38px] md:w-[200px] md:h-[44px] bg-secondary text-[13px] md:text-[15px] leading-normal font-semibold hover:bg-secondary/80" onClick={() =>{ (user && kycDetails && kycDetails.status === 'Verified' ) ? navigate('/dashboard')  : (user && kycDetails && kycDetails.status === 'Unverified' ) ? navigate('/dashboard/identity_verification')  : navigate('/sign-up') }}>Start Crypto Trading !</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={rectangle18} alt="banner" className="w-full h-full md:h-[600px] lg:h-[650px] object-cover" />
        </div>

        {/* desktop view of center text and content*/}
        <div className="hidden lg:block absolute lg:left-[108px] lg:top-[130px] xl:left-[131px] xl:top-[160px] 2xl:left-[220px] 2xl:top-[164px]">
          <h2 className="lg:text-[65px] xl:text-[70px] 2xl:text-[80px] leading-normal font-DMSans font-bold whitespace-pre">
            Crypto Trading <span  className="text-white">Made Seamless</span>
          </h2>
          <div className="lg:h-[160px] lg:w-[420px] flex flex-col justify-between">
            <p>Trade Bitcoin, Ethereum, Tether (USDT), Stellar, Ripple, Matic, USDC and your favorite cryptocurrencies on the OLAMAX trading platform</p>
            <Button className="w-[226px] h-[54px] bg-secondary text-base font-semibold hover:bg-secondary/80" onClick={() =>{ user ? navigate('/dashboard')  : navigate('/sign-up') }}>Start Crypto Trading !</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crypto;
