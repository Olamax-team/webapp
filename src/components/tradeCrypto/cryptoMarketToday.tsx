import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the type for a single crypto item
interface Crypto {
  name: string;
  ticker: string;
  price: string;
  change: string;
  logo: string;
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
  ];

  return (
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader>
          <CardTitle className={headerClassName}>Crypto Market Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={contentClassName}>
            {cryptos.map((crypto, index) => (
              <div key={index} className={itemClassName}>
                {/* Crypto Info */}
                <div className="flex gap-5">
                  <span>
                    <img
                      src={crypto.logo}
                      alt={`${crypto.name} logo`}
                      className="w-[48px] h-[48px]"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-Inter text-[18px] leading-[27px] font-[500] text-lg">
                      {crypto.name}
                    </span>
                    <span className="font-Inter block text-[16px] leading-[24px] text-[#545454]">
                      {crypto.ticker}
                    </span>
                  </div>
                </div>
                {/* Crypto Price and Change */}
                <div>
                  <span className="block text-right font-[500] text-textDark">
                    {crypto.price}
                  </span>
                  <span
                    className={`block text-right ${
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoMarketToday;
