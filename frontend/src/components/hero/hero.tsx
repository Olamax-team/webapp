import React from 'react';
import { Button } from '../ui/button';
import FloatingTag from '../ui/floating-tag';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-bgSurface overflow-hidden w-full h-[650px] mx-auto mt-1">

      {/* Content */}
      <>
        <div className="relative mx-auto top-[72px] bottom-[251.66px] w-[430px] xl:w-[1220.42px] h-[550px] xl:h-[326.34px]">
          <div className="font-poppins w-full flex text-center">
            {/* Floating Tags */}
            <div className='hidden xl:block'>
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
            </div>
            <div className='relative top-10 mx-auto text-center justify-center w-[802px] h-[230px]'>
              {/* Content */}
              <h1 className="font-DMSans text-[18px] leading-[27px] xl:text-[32px] font-bold xl:leading-[48px] text-textDark mt-4 mb-4">
              Your all-in-one crypto platform to buy, sell & trade,<br /> cryptocurrencies
              </h1>
              <p className="font-Inter text-textDark text-[14px] leading-[21px] xl:text-[16px] font-medium xl:leading-[24px] mb-6">
                OLAMAX is a highly-secure crypto platform to buy, sell or trade Bitcoin, Ethereum, 
                Tether <br/>(USDT), Celo, Stellar, USDC, and other cryptocurrencies at the best rates.
              </p>
              <Button className="bg-primary font-poppins p-[25px_25px] gap-[10px] rounded-[10px] text-white font-semibold hover:bg-secondary">
                Trade Now !
              </Button>
            </div>
          </div>
       </div>
        <img
          src="/src/assets/images/waves.png"
          alt="waves"
          className="absolute bottom-0 hidden xl:block w-full h-[200px]"
        />
        <img
          src="/src/assets/images/waves-mobile.png"
          alt="waves"
          className="absolute bottom-0 xl:hidden block w-full h-[222px]"
        />
      </>
    </section>
  );
};
export default HeroSection;
