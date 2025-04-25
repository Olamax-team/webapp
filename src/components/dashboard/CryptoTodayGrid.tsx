import React from "react";
import { Button } from "../ui/button";
import { HiOutlineDuplicate } from "react-icons/hi";
import IndicatorButtonGroup from "../tradeCrypto/indicator";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useApiConfig } from "../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { cn } from "../../lib/utils";
// import BTC from "../../assets/images/BTC Circular.png"
// import ETH from "../../assets/images/ETH Circular.png"
// import USDT from "../../assets/images/USDT Circular.png"
// import SOL from "../../assets/images/SOL Circular.png"
// import news1 from "../../assets/images/news1.png"
// import news2 from "../../assets/images/news2.png"
// import news3 from "../../assets/images/news3.png"
// import graphUp from "../../assets/images/positive-graph.png"
// import graphDown from "../../assets/images/negative-graph.png"
// import invites from "../../assets/images/invites.png"

// Define the type for a single crypto item

interface liveRateCoin {
  coin: string;
  symbol: string;
  price: string;
  icon: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
}
// interface Crypto {
//     name: string;
//     ticker: string;
//     price: string;
//     change: string;
//     logo: string;
//   }

interface News {
  id: number;
  title: string;
  imageUrl: string;
}
// Define the type for the component props
interface CryptoTodayGridProps {
    contentClassName?: string;
    itemClassName?: string;
    userInvite: string;
  }
const CryptoTodayGrid: React.FC<CryptoTodayGridProps> = ({
    contentClassName = "font-Inter space-y-6",
    itemClassName = "flex justify-between items-center",
    userInvite,
}) => {
    // const cryptos: Crypto[] = [
    //     {
    //       name: "Bitcoin",
    //       ticker: "BTC",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/BTC Circular.png",
    //     },
    //     {
    //       name: "Ethereum",
    //       ticker: "ETH",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/ETH Circular.png",
    //     },
    //     {
    //       name: "Tether",
    //       ticker: "USDT",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/USDT Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //     {
    //       name: "Solana",
    //       ticker: "SOL",
    //       price: "$2,051,913.71",
    //       change: "0.05%",
    //       logo: "/images/SOL Circular.png",
    //     },
    //   ];

  // Static data for the "Latest News" section
  const news: News[] = [
    {
      id: 1,
      title: "Olamax Launches New Escrow Service",
      imageUrl: "/images/news1.svg",
    },
    {
      id: 2,
      title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
      imageUrl: "/images/news2.svg",
    },
    {
      id: 3,
      title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
      imageUrl: "/images/news3.svg",
    },
  ];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userInvite);
    alert("Invite link copied to clipboard!");
  };
  const tabs = ["Trending", "Favorite"]
  const dynamicButtonClassName = (index: number, activeIndex: number) => {
    return index === activeIndex
      ? "text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-bold text-textDark"
      : "px-6 py-2 text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] text-[#00000066]";
  };
  const LiveRateComponent = ({coin}:{coin:liveRateCoin}) => {
    return(
        <div className={itemClassName}>
          {/* Crypto Info */}
          <div className="p-4 flex gap-5 w-full">
            <span>
              <img
                src={coin.icon}
                alt={`${coin.symbol} logo`}
                className="w-[32px] xl:w-[48px] h-[32px] xl:h-[48px]"
              />
            </span>
            <div className="flex flex-col">
              <span className="w-1/2 font-Inter text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-[500] text-wrap">
                {coin.coin}
              </span>
              <span className="font-Inter block text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] text-[#545454]">
                {coin.symbol}
              </span>
            </div>
          </div>
          {/* Crypto Price and Change */}
          <div className="w-full flex flex-col items-start">
            <span className="block item-end font-[500] text-textDark">
              ${coin.price}
            </span>
            <div className="flex items-center gap-1 justify-end">
              {coin.arrow}
              <span className={cn('', coin.color === "red" ? 'text-red-600' : 'text-green-600')}>{coin.percentageChange}</span>
            </div>
            </div>
            <Button 
              className="text-secondary hover:bg-white hover:text-secondary"
              variant={"ghost"}
              >
                Trade
            </Button>
        </div>
    )
  };

    const liveRateConfig = useApiConfig({
      url:'price-ticker',
      method:'get',
    });
  
    const fetchLiveRates = async () => {
      const response = await axios.request(liveRateConfig);
    
      if (response.status !== 200) {
        throw new Error('Something went wrong, try again later');
      }
    
      const data = response.data as liveRateCoin[];
      return data;
    };
  
    const { data, status } = useQuery({
      queryKey: ['live-rates'],
      queryFn: fetchLiveRates,
    });
  
    const LiveRates = () => {
  
      if (status === 'pending') {
        return (
          <div className="w-full h-full flex items-center justify-center my-8">
            <Loader className="animate-spin"/>
          </div>
        )
      }
  
      if (status === 'error') {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <p>Something went wrong while loading live rates, refresh the page please.</p>
          </div>
        )
      }
  
      return (
        <div className={contentClassName}>
          {data.map((item, index) => (
            <LiveRateComponent coin={item} key={index}/>
          ))}
        </div>
      )
    };

  return (
    <>
      <h2 className="text-nowrap text-[20px] xl:text-[26px] leading-[30px] xl:leading-[39px] font-Inter xl:font-DMSans font-bold my-2 xl:mb-4">Crypto Market Today</h2>
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-8 justify-start w-full">
        {/* Trending Section */}
        <div className="xl:col-span-5 w-full xl:w-[65%]">
          <div className="bg-white rounded-lg p-4">
            <div className="flex mb-4">
              <IndicatorButtonGroup
                buttons={tabs}
                dynamicButtonClassName={dynamicButtonClassName}
                bgClassName="bg-[#F8F9FA]"
                indicatorColor="bg-textDark"
                indicatorSize="w-[39px]"
              />
            </div>
            <LiveRates/>
          </div>  
        </div>
        {/* Invite and Latest News Section */}
        <div className="flex flex-col w-full xl:w-[35%] space-y-6">
            {/* Invites section */}
            <div className="w-full h-auto mx-auto bg-white rounded-xl">
              <img      
              src={"/images/invites.png"}
              alt="invites photo"
              className="w-full h-auto"/>
              <div className="font-Inter w-full h-auto my-4 p-4 items-center justify-center mx-auto space-y-3">
                <h2 className="text-wrap text-left text-[16px] xl:text-[] leading-[24px] xl:leading-[] font-bold text-textDark">Invite Friends</h2>
                <p className="text-wrap text-[14] xl:text-[] leading-[22.5px] xl:leading-[] font-medium text-textDark">Help grow our community by inviting your friends to join! Share the link and let others enjoy all the benefits we have to offer.</p>
                <div
                className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-primary text-sm font-medium">
                    Copy Invite Link
                  </span>
                  <HiOutlineDuplicate className="w-5 h-5 text-primary" onClick={copyToClipboard} />
                </div>
              </div>
            </div>
            <div className="w-full font-Inter bg-white rounded-lg p-4">
                <h2 className="font-Inter text-[18px] leading-[27px] font-bold mb-[16px]">Latest News</h2>
                <div className="space-y-7 mb-2 xl:mb-0">
                {news.map((item) => (
                    <div key={item.id} className="flex flex-row flex-wrap items-center gap-4">
                      <img
                          src={item.imageUrl}
                          alt="photo"
                          className="w-full h-auto rounded-sm object-fit"
                      />
                      <div>
                          <h3 className="text-wrap text-[14px] leading-[21px] font-medium">{item.title}</h3>
                      </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default CryptoTodayGrid;
