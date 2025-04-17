import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import arrowIcon from '/images/arrowdown.svg';
import useTradeStore from "../../../stores/tradeStore";
import BTC from "/images/BTC Circular.png";
import { tradeSchema } from "../../formValidation/formValidation";
import useUserDetails from "../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useApiConfig } from "../../../hooks/api";
import axios from "axios";

interface BuySellProps {
  setTradeType?: React.Dispatch<React.SetStateAction<string>>; // Optional
  setShowTransactionDetail?: React.Dispatch<React.SetStateAction<boolean>>; // Optional
  className?: string;
};

const BuySell: React.FC<BuySellProps> = ({
  className,
  setTradeType,
  setShowTransactionDetail,
  
}) => {
  const navigate = useNavigate();
  const { user } = useUserDetails();

  const [subTab, setSubTab] = useState("sell");
  const [prop1, setProp1] = useState("NGN");
  const [prop2, setProp2] = useState("BTC");
  const [amount1, setAmount1] = useState<string>("1");
  const [amount2, setAmount2] = useState<string>("");
  const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [coin, setCoin] = useState<Coins[]>([]);

  const tradeDetails = useTradeStore();
  const [cryptoService, setCryptoService] = React.useState<cryptoServiceProps[]>();

  type Coins = {
    coin: string,
    coin_name: string,
    icon: string,
    id: number,
  };

  type CoinPrice = {
    id: number;
    coin_id: number;
    selling: string; // "1000.00"
    buying: string;
    escrow: string;
  };

  type cryptoServiceProps = {
    cs: string;
    act: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tradeSchema),
  });

  const getCryptoConfig = useApiConfig({
    method: 'get',
    url: 'crypto-service'
  });

  const getCoinConfig = useApiConfig({
    method: 'get',
    url: 'all-coins'
  });

  const getCoinPricesConfig = useApiConfig({
    method: 'get',
    url: 'coin-prices'
  });

  const getTransactionConfig = useApiConfig({
    method: 'get',
    url: 'min-transaction/1'
  });

  const getBlockChain = useApiConfig({
    method: 'get',
    url: 'blockchains'
  });

  // const getBuyConfig = useApiConfig({
  //   method: 'post',
  //   url: 'start-buy',
  // });


  const fetchCryptoService = async () => {
    await axios.request(getCryptoConfig)
    .then((response) => {
      setCryptoService(response.data.crypto_service)
    })
  };

  const fetchCoinPrices = async () => {
    await axios.request(getCoinPricesConfig)
    .then((response) => {
      setPrices(response.data)
      console.log('prices', response.data)
    })
  };

  const fetchCoins = async () => {
    await axios.request(getCoinConfig)
    .then((response) => {
      setCoin(response.data.coin);
      console.log('co', response.data.coin)
    })
  };

  const fetchMinTransaction = async () => {
    await axios.request( getTransactionConfig)
    .then((response) => {
      console.log('min-t', response.data)
    })
  };

  const fetchBlockChain = async () => {
    await axios.request( getBlockChain)
    .then((response) => {
      console.log('b-c', response.data);
    })
  };

  // const fetchBuy = async () => {
  //   await axios.request(getBuyConfig)
  //   .then((response) => {
  //     console.log('startBuy', response.data)
  //   })
  // };

  React.useEffect(() => {
    fetchCoins();
    fetchCryptoService();
    fetchMinTransaction();
    fetchCoinPrices();
    fetchBlockChain();
  },[]);

  console.log(coin);

  const getCoinId = (coinCode: string): number => {
      return coin.find(c => c.coin === coinCode)?.id || 0; // Default to 0 if not found
  };
  
  const getSellingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    return prices.find(p => p.coin_id === id)?.selling;
  };
  
  const getBuyingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    return prices.find(p => p.coin_id === id)?.buying;
  };
  const price = subTab === "buy" ? getSellingPrice(prop2) : getBuyingPrice(prop2);

  useEffect(() => {
    if (lastChanged !== 'amount1') return;
    if (!amount1 || !prop2) return;
  
    if (price) {
      if (subTab === "buy") {
        setAmount2((parseFloat(amount1) / parseFloat(price)).toFixed(6)); // NGN → BTC
      } else {
        setAmount2((parseFloat(amount1) * parseFloat(price)).toFixed(2)); // BTC → NGN
      }
    }
  }, [amount1, prop2, subTab, prices, coin, lastChanged]);

  useEffect(() => {
    if (lastChanged !== 'amount2') return;
    if (!amount2 || !prop2) return;
  
    if (price) {
      if (subTab === 'buy') {
        setAmount1((parseFloat(amount2) * parseFloat(price)).toFixed(2)); // BTC → NGN
      } else {
        setAmount1((parseFloat(amount2) / parseFloat(price)).toFixed(6)); // NGN → BTC
      }
    }
  }, [amount2, prop2, subTab, prices, coin, lastChanged]);
  
  
const onSubmit = (data: any) => {
  if (!user) {
    navigate("/log-in"); // Redirect to login if not logged in
    return;
  }
  const tradeData = {
    fiatType_id: getCoinId(prop1),
    crytoType_id: getCoinId(prop2),
    tradeType: subTab,
    fiatType: prop1,
    cryptoType: prop2,
    fiatAmount: subTab === "buy" ? data.amount1 : data.amount2,
    cryptoAmount: subTab === "buy" ? data.amount2 : data.amount1,

  };
  setShowTransactionDetail?.(true);
  setTradeType?.(subTab);
  tradeDetails.setItem(tradeData);
  // fetchBuy();
};

 console.log(tradeDetails.item);


  return (
      <div className= {`space-y-6 xl:space-y-6 justify-center w-full ${className || ""}`}>
        {/* Sub-Tabs for Buy and Sell */}
        <div className="ml-1 xl:ml-2">
          <div className="font-poppins flex items-start space-x-4 text-[16px] leading-[24px] text-textDark">
            {cryptoService && cryptoService.length > 0 && cryptoService.map((item, index:number) => (
              <Button
                key={index}
                variant={subTab === item.cs ? "default" : "ghost"}
                onClick={() => setSubTab(item.cs)}
                className={`p-5 mt-[30px] ${item.act === 'off' && 'hidden'} ${
                  subTab === item.cs
                    ? "bg-bg hover:bg-bg text-primary text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] font-semibold capitalize"
                    : "text-[14px] xl:text-[18px] leading-[21px] xl:leading-[27px] hover:none font-semibold capitalize"
                }`}
              >
                {item.cs}
              </Button>
            ))}
          </div>
        </div>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 mx-1 xl:mx-2">
            {/* First prop Input */}
            <div className="flex justify-center space-x-4">
              <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="flex flex-col w-full">
                  <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                    You {subTab === "buy" ? "Pay" : "Sell"}
                  </p>
                  <div className="flex w-full justify-between">
                    <Input
                      {...register("amount1")}
                      value={amount1}
                      onChange={(e) => {setAmount1(e.target.value); setLastChanged('amount1');}}
                      placeholder="1"
                      className="h-[35px] leading-[27px] mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold placeholder:text-black/50"
                    />
                    <div className="flex items-center justify-start gap-1 font-Inter w-fit">
                    <img
                      src={(subTab === "buy" ? `/images/${prop1} Circular.png` : `/images/${prop2} Circular.png`)}
                      alt={`${subTab === "buy" ? prop1 : prop2} logo`}
                      className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                    />
                      <select
                        value={subTab === "buy" ? prop1 :prop2}
                        required
                        onChange={(e) =>
                          subTab === "buy"
                            ? setProp1(e.target.value)
                            : setProp2(e.target.value)
                        }
                        className="rounded-md bg-bg px-2 py-1 font-medium text-base w-fit max-w-20"
                      >
                        {subTab === "buy"     
                        ?  (
                            <option key={prop1} value={prop1} className="p-1">
                              {prop1}
                            </option>
                          ) : 
                          coin.map((c) => (
                            <option key={c.id} value={c.coin} className="p-1">
                              {c.coin}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {errors.amount1 && <p className="text-red-500 text-sm text-wrap">{(errors.amount1 as { message: string }).message}</p>}

            {/* Icon */}
            <div className="flex justify-center font-bold text-primary my-2">
              <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
            </div>

            {/* Second prop Input */}
            <div className="flex justify-center space-x-4">
              <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="w-full">
                  <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                    You Receive
                  </p>
                  <div className="flex w-full justify-between">
                    <Input
                      {...register("amount2")}
                      value={amount2}
                      onChange={(e) => {setAmount2(e.target.value); setLastChanged('amount2');}}
                      placeholder='0.0001'
                      className="h-[35px] leading-[27px] mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold placeholder:text-black/50"
                    />

                    <div className="flex items-center justify-start gap-1 font-Inter w-fit">
                      <img
                        src={(subTab === "buy" ? `/images/${prop2} Circular.png`: `/images/${prop1} Circular.png` )}
                        alt={`${subTab === "buy" ? prop2 : prop1} logo`}
                        className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                      />
                      <select
                        value={subTab === "buy" ? prop2 : prop1}
                      onChange={(e) =>
                        subTab === "buy"
                          ? setProp2(e.target.value)
                          : setProp1(e.target.value)
                      }
                      className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-sm max-w-20 border-0"
                      >
                      {subTab === "buy" ? coin.map((c) => (
                            <option key={c.id} value={c.coin} className="p-1">
                              {c.coin}
                            </option>
                          )) :
                          (
                            <option key={prop1} value={prop1} className="p-1">
                              {prop1}
                            </option>
                          )}
                    </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {errors.amount2 && <p className="text-red-500 text-sm text-wrap">{(errors.amount2 as { message: string }).message}</p>}

            <div className="flex justify-center items-center">
              <Button 
              type="submit"
              className="font-Inter xl:font-poppins py-3 mt-6 mb-1 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px] capitalize">
                {subTab}
              </Button>
            </div>
          </div>
          <div className="flex font-Inter font-[500px] xl:mt-1 gap-1 justify-center items-center text-center text-[14px] leading-[21px] xl:text-[16px] xl:leading-[26px] text-[#545454]">
            <img
              src={BTC}
              alt={`BTC logo`}
              className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
            />
            1 BTC = 116,377,572 Naira
          </div>
        </form>
      </div>
  );
};

export default BuySell;