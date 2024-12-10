import React from "react";

const textArray = [
  "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL. FOR ENQUIRIES CLICK HERE",
  "ENJOY LOWER FEES ON ALL CRYPTO TRANSACTIONS WHEN YOU TRADE ETH AND LTC. SPECIAL DISCOUNT RUNS FROM 1ST OF NOVEMBER TO 1ST OF DECEMBER. FOR DETAILS, CLICK HERE",
  "TRADE YOUR CRYPTO SECURELY AND EARN REWARDS ON EVERY BTC AND DOGE TRANSACTION. PROMO RUNS FROM 10TH OF OCTOBER TO 10TH OF NOVEMBER. FOR MORE INFO, CLICK HERE"
]

const TopHeader = () => {
  const [textIndex, setTextIndex] = React.useState(0);

 // this is to cycle the header text
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-primary xl:h-[40px] h-[32px] flex items-center justify-center ">
      <div className="h-[16px] w-[379px] xl:h-[18px] xl:w-[1250px] relative overflow-hidden text-white">
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
      </div>
    </div>
  )
};

export default TopHeader;