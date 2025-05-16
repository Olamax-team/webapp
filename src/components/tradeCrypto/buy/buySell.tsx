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
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { activityIndex } from "../../../stores/generalStore";
import { useFetchStore } from "../../../stores/fetch-store";


interface BuySellProps {
  className?: string;
};

const BuySell: React.FC<BuySellProps> = ({
  className,
  
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchKycDetails, token } = useUserDetails();

  const [subTab, setSubTab] = useState("sell");

  const [btcPrice, setBtcPrice] = useState<string>("");
  const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);

  const { setActive, setShowTransactionDetail, setSelectedBill } = activityIndex();

  const tradeDetails = useTradeStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(tradeSchema),
  });

  const amount1 = watch('amount1');
  const amount2 = watch('amount2');


  const { fetchAllBuyCoins, fetchLiveRates, fetchAllCoinPrices, fetchCryptoServices, fetchStableCoins } = useFetchStore();

  const { data: cryptoService } = useQuery({
    queryKey: ['crypto-service'],
    queryFn: fetchCryptoServices,
  });

  const { data: liveRates } = useQuery({
    queryKey: ['live-rates'],
    queryFn: fetchLiveRates,
  });

  const { data: prices } = useQuery({
    queryKey: ['coin-prices'],
    queryFn: fetchAllCoinPrices,
  });

  const { data: dataCoin } = useQuery({
    queryKey: ['all-coins'],
    queryFn: fetchAllBuyCoins,
  });

  const coin = dataCoin ? dataCoin.filter((item) => item.coin !== 'NGN') : undefined;

  const { data: stables } = useQuery({
    queryKey: ['stable-coins'],
    queryFn: fetchStableCoins,
  });

  const [prop1, setProp1] = useState("NGN");
  const [prop2, setProp2] = useState("BTC");

  const getCoinId = (coinCode: string): number => {
    return (coin ?? []).find(c => c.coin === coinCode)?.id || 0; 
  };
  
  const getCoinValue = (coinCode: string): string => {
    return (liveRates ?? []).find(c => c.symbol === coinCode)?.price || ""; 
  };
  
  const getSellingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    return (prices ?? []).find(p => p.coin_id === id)?.selling;
  };
  
  const getBuyingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    return (prices ?? []).find(p => p.coin_id === id)?.buying;
  };

  const price = subTab === "buy" ? getBuyingPrice(prop2) : getSellingPrice(prop2);
  const coinValue = getCoinValue(prop2);
  const BtcPrice = subTab === "buy" ? getBuyingPrice("BTC") : getSellingPrice("BTC");

  useEffect(() => {
    if (lastChanged !== 'amount1') return;
    if (!amount1) {
      // setAmount2("");
      setValue("amount2", "");
      return;
    }
    if (price) {
      let newAmount2 = '';
      if (subTab === "buy") {
        newAmount2 = (parseFloat(amount1) / parseFloat(price) / parseFloat(coinValue.replace(/,/g, ""))).toFixed(6); 
      } else if (subTab === 'sell') {
        newAmount2 = (parseFloat(amount1) * parseFloat(price) * parseFloat(coinValue.replace(/,/g, ""))).toFixed(2); // crypto → NGN
      }

      // Syncing the calculated amount2 with react-hook-form
      // setAmount2(newAmount2);  // Updating Zustand state
      setValue("amount2", newAmount2);
    }
  }, [amount1, prop1, prop2, subTab, prices, coin, lastChanged]);

  useEffect(() => {
    if (lastChanged !== 'amount2') return;
    if (!amount2) {
      // setAmount1("");
      setValue("amount1", "");
      return;
    }
  
    if (price) {
      let newAmount1 = '';
      if (subTab === "buy") {
        newAmount1 = (parseFloat(amount2) * parseFloat(price) * parseFloat(coinValue.replace(/,/g, ""))).toFixed(2) // crypto → NGN
      } else if (subTab === 'sell') {
        newAmount1 = (parseFloat(amount2) / parseFloat(price) / parseFloat(coinValue.replace(/,/g, ""))).toFixed(6); // NGN → crypto
      }

      // setAmount1(newAmount1); 
      setValue("amount1", newAmount1);
    }
  }, [amount2, prop2,prop1, subTab, prices, coin, lastChanged]);
  
  useEffect(() => {
    
    const BTCPriceInUSD = getCoinValue(prop2);
    if (BtcPrice) {
      let BTCP = "";
    BTCP = (
      parseFloat(BTCPriceInUSD.replace(/,/g, "")) * parseFloat(BtcPrice)
    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          setBtcPrice(BTCP);
        }
  }, [prices]); 


  useEffect(() =>{
    if (user && token) {
      fetchKycDetails();
    }
  },[user, token])

  const onSubmit = async (data: any) => {

    if (!user) {
      navigate("/log-in"); // Redirect to login if not logged in
      return;
    };

    // if (user && kycDetails) {
    //   if (kycDetails.status === 'Unverified') {
    //     navigate("/dashboard/identity_verification"); 
    //     return;
    //   }
    // }


    const fiatID = subTab === "buy" ? getCoinId(prop1) : getCoinId(prop2);
    const cryptoID = subTab === "buy" ? getCoinId(prop2) : getCoinId(prop1);

    const tradeData = {
      fiatType_id: fiatID,
      cryptoType_id: cryptoID,
      tradeType: subTab,
      fiatType: prop1,
      cryptoType: prop2,
      fiatAmount: subTab === "buy" ? data.amount1 : data.amount2,
      cryptoAmount: subTab === "buy" ? data.amount2 : data.amount1,
    };

    if (location.pathname === "/") {
      navigate("/dashboard", { state: { from: '/' } });
      setActive(subTab === 'buy' ? 0 : 1);
      setShowTransactionDetail(true);
      setSelectedBill(subTab === 'buy' ? 'buy' : 'sell');
      tradeDetails.setItem(tradeData);
    } else {
      setActive(subTab === 'buy' ? 0 : 1);
      setShowTransactionDetail(true);
      setSelectedBill(subTab === 'buy' ? 'buy' : 'sell');
      tradeDetails.setItem(tradeData);
    }

  };




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
        {cryptoService?.some(
          service =>
            (service.cs === 'buy' || service.cs === 'sell') && service.act === 'on'
        ) ? (
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
                          onChange={(e) => {setValue('amount1', e.target.value); setLastChanged('amount1');}}
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
                            { subTab === "buy"     
                            ?  (
                                (stables ?? []).map((s) => (
                                  <option key={s.id} value={s.coin} className="p-1">
                                    {s.coin}
                                  </option>
                                ))
                              ) : 
                              (coin ?? []).map((c) => (
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
                          onChange={(e) => {setValue('amount2', e.target.value); setLastChanged('amount2');}}
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
                          {subTab === "buy" ? (coin ?? []).map((c) => (
                                <option key={c.id} value={c.coin} className="p-1">
                                  {c.coin}
                                </option>
                              )) :
                              (
                                (stables ?? []).map((s) => (
                                  <option key={s.id} value={s.coin} className="p-1">
                                    {s.coin}
                                  </option>
                                ))
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
                1 BTC = NGN {btcPrice}
              </div>
          </form>
        ) : cryptoService?.some(
          service => service.cs === 'escrow' && service.act === 'on'
        ) ? (
          <div className="text-center bg-red-400 text-white">Escrow services coming soon!</div>
        ): null}
      </div>
  );
};

export default BuySell;