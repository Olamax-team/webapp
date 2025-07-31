import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useLiveRates } from "../../hooks/useLiveRates";

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
  containerClassName = "block space-x-4 relative mt-6",
  cardClassName = "xl:w-full xl:h-auto bg-bg",
  headerClassName = "text-wrap font-DMSans text-[32px] leading-[48px]",
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
          <div className="flex items-center gap-1 justify-end">
            {coin.arrow}
            <span className={cn('', coin.color === "red" ? 'text-red-600' : 'text-green-600')}>{coin.percentageChange}</span>
          </div>
        </div>
      </div>
    )
  };

  const { data, status } = useLiveRates();

  const LiveRates = () => {

    if (status === 'pending') {
      return (
        <div className="w-full h-full min-h-40 flex items-center justify-center my-8">
          <Loader2 className="animate-spin"/>
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
