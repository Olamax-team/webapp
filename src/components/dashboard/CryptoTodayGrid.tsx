import { ClipboardIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
// Define the type for a single crypto item
interface Crypto {
    name: string;
    ticker: string;
    price: string;
    change: string;
    logo: string;
  }

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
    const cryptos: Crypto[] = [
        {
          name: "Bitcoin",
          ticker: "BTC",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/BTC Circular.png",
        },
        {
          name: "Ethereum",
          ticker: "ETH",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/ETH Circular.png",
        },
        {
          name: "Tether",
          ticker: "USDT",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/USDT Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
        {
          name: "Solana",
          ticker: "SOL",
          price: "$2,051,913.71",
          change: "0.05%",
          logo: "../../../src/assets/images/SOL Circular.png",
        },
      ];
  // Static data for the "Latest News" section
  const news: News[] = [
    {
      id: 1,
      title: "Olamax Launches New Escrow Service",
      imageUrl: "../../../src/assets/images/news1.png",
    },
    {
      id: 2,
      title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
      imageUrl: "../../../src/assets/images/news2.png",
    },
    {
      id: 3,
      title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
      imageUrl: "../../../src/assets/images/news3.png",
    },
  ];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userInvite);
    alert("Invite link copied to clipboard!");
  };

  return (
    <>
        <h2 className="text-nowrap text-[20px] xl:text-[26px] leading-[30px] xl:leading-[39px] font-Inter xl:font-DMSans font-bold mb-4">Crypto Market Today</h2>
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-10 xl:gap-20 justify-start">
        {/* Trending Section */}
        <div className="xl:col-span-5 w-[356px] xl:w-[574px]">
            <div className="bg-white rounded-lg p-4">
                <div className="flex border-b mb-4">
                <button className="py-2 border-b-4 text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] border-textDark font-bold text-textDark">
                    Trending
                </button>
                <button className="px-6 py-2 text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] text-[#00000066]">Favorite</button>
                </div>
                <div className={contentClassName}>
            {cryptos.map((crypto, index) => (
              <div key={index} className={itemClassName}>
                {/* Crypto Info */}
                <div className="flex gap-5">
                  <span>
                    <img
                      src={crypto.logo}
                      alt={`${crypto.name} logo`}
                      className="w-[32px] xl:w-[48px] h-[32px] xl:h-[48px]"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-Inter text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-[500]">
                      {crypto.name}
                    </span>
                    <span className="font-Inter block text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] text-[#545454]">
                      {crypto.ticker}
                    </span>
                  </div>
                </div>
                {/* Crypto Price and Change */}
                <div className="flex space-x-6 items-center justify-center">
                <div>
                  <span className="font-Inter block text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] text-textDark">
                    {crypto.price}
                  </span>
                  <span
                    className={`block text-right text-[14px] leading-[21px] ${
                      crypto.change.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {!crypto.change.startsWith("-") && (
                      <img
                        src="../../../src/assets/images/positive-graph.png"
                        alt="Upward Trend"
                        className="inline-block w-[14px] h-[14px] m-2 justify-center"
                      />
                    )}
                    {crypto.change.startsWith("-") && (
                      <img
                        src="../../../src/assets/images/negative-graph.png"
                        alt="Downward Trend"
                        className="inline-block w-[14px] h-[14px]"
                      />
                    )}
                    {crypto.change}
                  </span>
                </div>
                <Button 
                  className="text-secondary hover:bg-white hover:text-secondary"
                  variant={"ghost"}
                  >
                    Trade
                </Button>
                </div>
              </div>
            ))}
                </div>
            </div>  
        </div>


        {/* Invite and Latest News Section */}
        <div className="grid grid-cols-1 gap-10">
            <div className="w-[356px] xl:w-[366px] h-[370px] mx-auto bg-white rounded-lg">
              <img      
              src="../../../src/assets/images/invites.png"
              alt="invites photo"
              className="w-full h-[190px] xl:h-[190px]"/>
              <div className="font-Inter w-[332.46px] xl:w-[330px] h-[137px] xl:h-[66px] mt-2 items-center justify-center my-auto mx-auto space-y-3">
                <h2 className="text-[16px] xl:text-[] leading-[24px] xl:leading-[] font-bold text-textDark">Invite Friends</h2>
                <p className="text-[14] xl:text-[] leading-[22.5px] xl:leading-[] font-medium text-textDark">Help grow our community by inviting your friends to join! Share the link and let others enjoy all the benefits we have to offer.</p>
                <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={copyToClipboard}
                >
                  <span className="text-primary text-sm font-medium">
                    Copy Invite Link
                  </span>
                  <ClipboardIcon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
            <div className="w-[366px] font-Inter bg-white rounded-lg p-4 border">
                <h2 className="font-Inter text-[18px] leading-[27px] font-bold mb-[16px]">Latest News</h2>
                <div className="space-y-7 mb-2 xl:mb-0">
                {news.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                          src={item.imageUrl}
                          alt={"photo"}
                          className="w-[132px] h-[116px] rounded-sm object-cover"
                      />
                      <div>
                          <h3 className="text-[14px] leading-[21px] font-medium">{item.title}</h3>
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
