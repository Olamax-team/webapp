import { Button } from "../ui/button";
import rectangle18 from '../../assets/images/Rectangle 18.png';
import strokes from '../../assets/images/strokes-removebg-preview.png';
import strokesmall from '../../assets/images/strokessmall.svg'

const Crypto = () => {
  return (
    <section className="h-auto w-full flex justify-center items-center ">
      {/* Main Section */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center w-full h-auto flex-wrap">

        {/* Left Column */}
        <div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-center space-y-6 ">

          {/* Strokes Image, positioned to the margin */}
          {/* <!-- For larger screens, show strokes and hide strokesmall --/> */}
          <div className="hidden sm:block absolute top-0 left-0 right-0 w-[213px] h-[195.47px]  md:w-[145px] md:h-[132.24px] ">
            <img 
              src={strokes} 
              alt="Decorative Strokes" 
              className="object-contain w-[100px]   md:w-20   "
            />
          </div>

        {/* <!-- For smaller screens, show strokesmall and hide strokes --> */}
        <div className="sm:hidden absolute  left-0 right-0 top-0 w-[76px] h-[70px] ">
          <img 
            src={strokesmall} 
            alt="Decorative Strokes" 
            className="object-contain w-10 "
          />
        </div>


          {/* Heading and Description */}
          <div className="pt-10">

            {/* H1: Absolute positioned, centered horizontally */}
            <div className="whitespace-nowrap absolute hidden sm:block w-[120px] h-[120px] top-[162px] left-[131px] md:w-[792px] md:h-[90px] md:left-[81.5px] md:top-[132px] ">
              <h1 className=" font-DMSans font-bold leading-tight text-center text-[80px]  text-[#121826]">
                Crypto Trading <span className="text-white font-DMSans font-bold text-[80px] text-center leading-tight">Made Seamless</span>
              </h1>
            </div>

            {/* H2: Visible only on small screens, hidden on medium and large screens */}
             <div className="w-[330px] h-[36px] top-[232px] left-[32px]">  
                <h2 className="text-[20px] leading-tight sm:hidden font-DMSans font-bold text-[#121826]  ">
                 Crypto Trading Made Seamless
            </h2>
             </div>

            {/* Centered Paragraph */}
            {/* <p className="text-[16px] sm:text-[13px] w-[432px] h-[72px] font-Inter    md:text-[14px] leading-tight  text-black text-left"> */}
            <div className="w-[345px] h-[62px] top-[148px] left-[32px] md:w-[387px] md:h-[66px] md:top-[218px] md:left-[82px] lg:w-[432px] lg:h-[72px] lg:top-[280px] lg:left-[131px]  ">
                <h4 className=" font-Inter font-medium text-[13px] leading-tight text-[#121826]  md:text-[14px] lg:text-[16px] w-full   ">
                  Trade Bitcoin, Ethereum, Tether (USDT), Stellar, Ripple, 
                  Matic, USDC, and your favorite cryptocurrencies on the 
                  OLAMAX trading platform.
            </h4>
            </div>

            {/* Centered Button */}
                <Button className="bg-[#0073AD] text-[#ffffff] rounded-[5px] text-[13px] pt-[15px] pl-[25px] pr[25px] pb-[15px] w-[160px] h-[38px] top-[300px]  left-[32px] gap-[10px] md:w-[193px] md:h-[46px] md:top-[312px] md:left[82px] lg:w-[226px] lg:h-[54px] lg:top-[392px] lg:rounded-[10px] font-poppins lg:text-[16px] lg:font-semibold  ">
                  Start Crypto Trading!
                </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className=" w-full h-auto sm:w-1/2 ">
          {/* Full-width and full-height image */}
          <img src={rectangle18} alt="Crypto Trading Platform" className="w-full  h-auto  object-cover" />
        </div>

      </div>
      
    </section>
  );
};

export default Crypto;
