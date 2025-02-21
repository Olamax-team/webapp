import React from "react";
import { cn } from "../../lib/utils";
import useUserDetails from "../../stores/userStore";
import { HiOutlineInformationCircle } from "react-icons/hi";

const textArray = [
  "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL. FOR ENQUIRIES CLICK HERE",
  "ENJOY LOWER FEES ON ALL CRYPTO TRANSACTIONS WHEN YOU TRADE ETH AND LTC. SPECIAL DISCOUNT RUNS FROM 1ST OF NOVEMBER TO 1ST OF DECEMBER. FOR DETAILS, CLICK HERE",
  "TRADE YOUR CRYPTO SECURELY AND EARN REWARDS ON EVERY BTC AND DOGE TRANSACTION. PROMO RUNS FROM 10TH OF OCTOBER TO 10TH OF NOVEMBER. FOR MORE INFO, CLICK HERE"
]

const TopHeader = () => {
  const [textIndex, setTextIndex] = React.useState(0);
  const { user } = useUserDetails();

 // this is to cycle the header text
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("w-full bg-primary md:h-[40px] h-[32px] flex items-center justify-center", user?.account_status === 'Unverified' ? 'bg-[#E41D0333]/20' : '')}>
      <div className={cn("h-[16px] w-[380px] md:h-[18px] xl:w-[1250px] md:w-[85%] relative overflow-hidden text-white font-DMSans", user?.account_status === 'Unverified' ? 'text-[#E41D03]' : '')}>
        { user && user?.account_status === 'Verified' ?
          <React.Fragment>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 0 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[textIndex]}
            </p>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 1 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[(textIndex + 1) % textArray.length]}
            </p>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 2 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[(textIndex + 2) % textArray.length]}
            </p>
          </React.Fragment> :
          user && user?.account_status === 'Unverified' ?
          <div className="flex items-center gap-2">
            <HiOutlineInformationCircle className="size-5"/>
            <p className="xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px]">Please complete Identity Verification to have access to our full range of products & services</p>
          </div> :
          <React.Fragment>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 0 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[textIndex]}
            </p>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 1 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[(textIndex + 1) % textArray.length]}
            </p>
            <p
              className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                textIndex === 2 ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {textArray[(textIndex + 2) % textArray.length]}
            </p>
          </React.Fragment>
        }
      </div>
    </div>
  )
};

export default TopHeader;