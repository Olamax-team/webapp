import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useApiConfig } from "../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { cn } from "../../lib/utils";
// import BTC from "../../assets/images/BTC Circular.png"
// import ETH from "../../assets/images/ETH Circular.png"
// import USDT from "../../assets/images/USDT Circular.png"
// import SOL from "../../assets/images/SOL Circular.png"
// import graphUp from "../../assets/images/positive-graph.svg"

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

// Define the type for the component props
interface CryptoMarketTodayProps {
  containerClassName?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}

const CryptoMarketToday: React.FC<CryptoMarketTodayProps> = ({
  containerClassName = "hidden xl:block space-x-4 relative mt-6",
  cardClassName = "xl:w-full xl:h-auto bg-bg",
  headerClassName = "font-DMSans text-[32px] leading-[48px]",
  contentClassName = "font-Inter space-y-6",
  itemClassName = "flex justify-between items-center",
}) => {

  const LiveRateComponent = ({coin}:{coin:liveRateCoin}) => {
    return (
      <div className={itemClassName}>
      {/* Crypto Info */}
        <div className="flex gap-5">
          <span>
            <img
              src={coin.icon}
              alt={`${coin.symbol} logo`}
              className="w-[48px] h-[48px]"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-Inter text-[18px] leading-[27px] font-[500] text-lg">
              {coin.coin}
            </span>
            <span className="font-Inter block text-[16px] leading-[24px] text-[#545454]">
              {coin.symbol}
            </span>
          </div>
        </div>
        {/* Crypto Price and Change */}
        <div>
          <span className="block text-right font-[500] text-textDark">
            ${coin.price}
          </span>
          <div className="flex items-center gap-1">
            {coin.arrow}
            <span className={cn('', coin.color === "red" ? 'text-red-600' : 'text-green-600')}>{coin.percentageChange}</span>
          </div>
        </div>
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
        <div className="w-full h-full flex items-center justify-center">
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
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader>
          <CardTitle className={headerClassName}>Crypto Market Today</CardTitle>
        </CardHeader>
        <CardContent>
          <LiveRates/>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoMarketToday;
