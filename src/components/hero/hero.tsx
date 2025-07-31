import React from 'react';
import { Button } from '../ui/button';
import FloatingTag from '../ui/floating-tag';
import { useNavigate } from 'react-router-dom';
import useUserDetails from '../../stores/userStore';
import { useConfirmFactorAuthModal } from '../../lib/utils';


const HeroSection: React.FC = () => {
  const { user, fetchKycDetails, kycDetails, token } = useUserDetails();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && token) {
      fetchKycDetails();
    }
  }, [user, token]);

    const { userDetails, fetchUserDetails} = useUserDetails();
  
    React.useEffect(() => {
      if (user) {
        fetchUserDetails();
      }
    },[user]);
  
    const { onOpen } = useConfirmFactorAuthModal();
  
    React.useEffect(() => {
      if (user && userDetails?.status === 'verified' && userDetails?.is_auth_code === 'inactive') {
        onOpen();
        return;
      }
    }, [user, userDetails?.status])



  return (
    <section className="relative bg-bgSurface overflow-hidden w-full h-[650px] mx-auto mt-1">

      {/* Content */}
      <React.Fragment>
        <div className="relative mx-auto my-[72px] w-full xl:w-[1220.42px] h-auto xl:h-[326.34px]">
          <div className="font-poppins w-full flex flex-wrap text-center mx-auto items-center justify-center">
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
                  right: '12.55px',
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
                  right: '12.55px',
                }} 
                rotation={-15} 
                text={'Secure Platform'}
                borderColor='border-textDark'
                textColor='text-textDark'
                animate='float-up'
                boxPosition={{bottom:'-5px', left:'-2px'}} />
            </div>
            <div className='relative m-5 xl:m-20 text-center items-center justify-center w-full'>
              {/* Content */}
              <h1 className="text-wrap font-DMSans text-[18px] leading-[27px] xl:text-[32px] font-bold xl:leading-[48px] text-textDark mt-4 mb-4">
              Your all-in-one crypto platform to buy, sell & trade, cryptocurrencies
              </h1>           
              <p className="text-wrap font-Inter text-textDark text-[14px] leading-[21px] xl:text-[16px] font-medium xl:leading-[24px] mb-6">
                OLAMAX is a highly-secure crypto platform to buy, sell or trade Bitcoin, Ethereum, 
                Tether <br/>(USDT), Celo, Stellar, USDC, and other cryptocurrencies at the best rates.
              </p>           
              <Button className="bg-primary font-poppins p-[25px_25px] gap-[10px] rounded-[10px] text-white font-semibold hover:bg-secondary" 
              onClick={() =>{ (user && kycDetails?.status === 'verified') ? navigate('/dashboard')  : (user && kycDetails?.status === 'Unverified') ? navigate('/dashboard/identity_verification') :  navigate('/sign-up') }}>
                Trade Now !
              </Button>
            </div>
          </div>
       </div>
       <div className='w-full'>
          <img
            src={'/images/waves.svg'}
            alt="waves"
            className="absolute bottom-0 hidden xl:block w-full h-[200px] object-cover"
          />
          <img
            src={'/images/wavesmobile.svg'}
            alt="waves"
            className="absolute bottom-0 xl:hidden block w-full h-[222px]"
          />
        </div>
      </React.Fragment>
    </section>
  );
};
export default HeroSection;
