import React from 'react';
import { Button } from '../ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative mt-10 bg-bgSurface overflow-hidden w-[1440px] h-[650px]">

      {/* Content */}
      <>
        <div className="relative items-center text-center justify-center top-[72px] left-[110px] bottom-[251.66px] w-[1220.42px] h-[326.34px]">
          {/* Floating Tags */}
          <div className="font-poppins w-full flex text-center">
            {/* Top-Left */}
            <span className="absolute top-0 left-[12.55px] rounded-md border-2 border-primary px-4 py-2 text-primary text-sm font-semibold transform rotate-[15deg] w-[160.34px] h-[45px] float-down">
              Best Rates
            </span>

            {/* Bottom-Left */}
            <span className="absolute bottom-0 left-[12.55px] rounded-md border-2 border-tagGreen px-4 py-2 text-tagGreen text-sm font-semibold transform rotate-[-15deg] w-[160.34px] h-[45px] float-reverse-up">
              Quick Payment
            </span>

            {/* Top-Right */}
            <span className="absolute top-0 left-[1053px] rounded-md border-2 border-tagPurple px-4 py-2 text-tagPurple text-sm font-semibold transform rotate-[-15deg] w-[160.34px] h-[45px] float-reverse-down">
              24/7 Support
            </span>

            {/* Bottom-Right */}
            <span className="absolute bottom-0 left-[1065.55px] rounded-md border-2 border-textDark px-4 py-2 text-textDark text-sm font-semibold transform rotate-[15deg] w-[160.34px] h-[45px] float-up">
              Secure Platform
            </span>
            <div className='relative block top-[85.98px] left-[208.45px] text-center justify-center w-[802px] h-[230px]'>
              {/* Content */}
              <h1 className="font-DMSans text-[32px] font-bold leading-[48px] text-textDark mt-4 mb-4">
              Your all-in-one crypto platform to buy, sell & trade,<br /> cryptocurrencies
              </h1>
              <p className="font-Inter text-textDark text-[16px] font-medium leading-[24px] mb-6">
                OLAMAX is a highly-secure crypto platform to buy, sell or trade Bitcoin, Ethereum, 
                Tether <br/>(USDT), Celo, Stellar, USDC, and other cryptocurrencies at the best rates.
              </p>
              <Button className="bg-primary font-poppins text-white px-6 py-6 hover:bg-secondary">
                Trade Now !
              </Button>
            </div>
          </div>
       </div>
      </>
    </section>
  );
};

export default HeroSection;
