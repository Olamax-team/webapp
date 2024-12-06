import { Button } from "../ui/button";
import rectangle18 from '../../assets/images/Rectangle 18.png';
import strokes from '../../assets/images/strokes-removebg-preview.png';

 const Crypto = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      {/* Main Section */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 flex-wrap">

        {/* Left Column */}
        <div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-center space-y-6">

           {/* Strokes Image, positioned to the margin */}
           <div className="absolute top-0 left-0 right-0 w-24 sm:w-10 md:w-20 lg:w-24 xl:w-56">
                <img 
                    src={strokes} 
                    alt="Decorative Strokes" 
                    className="object-contain "
                />
                </div>


          {/* Heading and Description */}
          <div className="text-center">

            {/* H1: Absolute positioned, centered horizontally */}
            <div className="whitespace-nowrap mb-10 pb-10">
              <h1 className="absolute hidden sm:block xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-[#121826] text-center sm:text-left tracking-wider leading-tight">
                Crypto Trading <span className="text-white">Made Seamless</span>
              </h1>
            </div>

            {/* H2: Visible only on small screens, hidden on medium and large screens */}
            <h2 className="text-base sm:hidden font-bold text-[#121826] text-center sm:text-center">
              Crypto Trading <span>Made Seamless</span>
            </h2>

            {/* Centered Paragraph */}
            <p className="text-base text-black text-left  ">
              Trade Bitcoin, Ethereum, Tether (USDT), Stellar, Ripple, <br/>
              Matic, USDC, and your favorite cryptocurrencies on the <br/>
              OLAMAX trading platform.
            </p>

            {/* Centered Button */}
            <div className="text-left mt-6 ">
              <Button className="bg-[#0073AD] text-white">Start Crypto Trading!</Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full sm:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
          <img src={rectangle18} alt="Crypto Trading Platform" className="w-full h-auto sm:h-auto md:h-[80%] lg:h-[70%] xl:h-[60%] rounded-lg shadow-lg object-contain" />
        </div>

      </div>
      
    </section>
  );
};

export default Crypto;
