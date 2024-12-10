import React from 'react';
import { Button } from '../ui/button';
import FloatingTag from '../ui/floating-tag';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-bgSurface overflow-hidden w-[1440px] h-[650px] mx-auto border-2">

      {/* Content */}
      <>
        <div className="relative items-center flex text-center justify-center top-[72px] left-[110px] bottom-[251.66px] w-[1220.42px] h-[326.34px]">
          {/* Floating Tags */}
          <div className="font-poppins w-full flex text-center">
            {/* Top-Left */}
            <FloatingTag 
              position={{
                top: '0',
                left: '12.55px',
              }} 
              rotation={15} 
              text={'Best Rates'}
              borderColor='border-primary'
              textColor='text-primary'
              animate='float-down'
              boxPosition={{bottom:'-5px', right:'-2px'}} />

            {/* Bottom-Left */}
            <FloatingTag 
              position={{
                bottom: '0',
                left: '12.55px',
              }} 
              rotation={-15} 
              text={'Quick Payment'}
              borderColor='border-tagGreen'
              textColor='text-tagGreen'
              animate='float-reverse-up'
              boxPosition={{bottom:'-5px', right:'-2px'}} />

            {/* Top-Right */}
            <FloatingTag 
              position={{
                top: '0',
                left: '1053px',
              }}
              rotation={-15}
              text={'24/7 Support'}
              borderColor='border-tagPurple'
              textColor='text-tagPurple'
              animate='float-reverse-down' 
              boxPosition={{bottom:'-5px', left:'-2px'}} />

            {/* Bottom-Right */}
            <FloatingTag 
              position={{
                bottom: '0',
                left: '1065.55px',
              }} 
              rotation={-15} 
              text={'Secure Platform'}
              borderColor='border-textDark'
              textColor='text-textDark'
              animate='float-up'
              boxPosition={{bottom:'-5px', left:'-2px'}} />

            <div className='relative block mx-auto text-center justify-center w-[802px] h-[230px]'>
              {/* Content */}
              <h1 className="font-DMSans text-[32px] font-bold leading-[48px] text-textDark mt-4 mb-4">
              Your all-in-one crypto platform to buy, sell & trade,<br /> cryptocurrencies
              </h1>
              <p className="font-Inter text-textDark text-[16px] font-medium leading-[24px] mb-6">
                OLAMAX is a highly-secure crypto platform to buy, sell or trade Bitcoin, Ethereum, 
                Tether <br/>(USDT), Celo, Stellar, USDC, and other cryptocurrencies at the best rates.
              </p>
              <Button className="bg-primary font-poppins p-[25px_25px] gap-[10px] rounded-[10px] text-white font-semibold hover:bg-secondary">
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
