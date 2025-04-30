import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useApiConfig } from "../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { activityIndex } from "../../stores/generalStore";


interface airtimePaymentProps {
  className?: string; // Editable className prop
  airtimeOptions: string[];
};

type cryptoServiceProps = {
  cs: string;
  act: string;
};

type airtimeNetworkProps = {
  network: string;
  product_number: number;
  icon: string;
};

type Coins = {
  coin: string,
  coin_name: string,
  icon: string,
  id: number,
};

type Stables = {
  coin: string,
  coin_name: string,
  icon: string,
  id: number,
};

type CoinPrice = {
  id: number;
  coin_id: number;
  selling: string;
  buying: string;
  escrow: string;
};

const AirtimePayment: React.FC<airtimePaymentProps> = ({
  className,
  airtimeOptions,
}) => {

  const billsServiceConfig = useApiConfig({
    method: 'get',
    url: 'get-bills-services'
  });

  const networksConfig = useApiConfig({
    method: 'get',
    url: 'get-airtime-data-network/airtime'
  });
    const getCoinConfig = useApiConfig({
      method: 'get',
      url: 'all-coins'
    });
    const getCoinPricesConfig = useApiConfig({
      method: 'get',
      url: 'coin-prices'
    });
  
    const getStableCoins = useApiConfig({
      method: 'get',
      url: 'stable-coins'
    });
  
    const fetchCoinPrices = async () => {
      await axios.request(getCoinPricesConfig)
      .then((response) => {
        setPrices(response.data)
      })
    };
    const fetchStableCoin = async () => {
      await axios.request(getStableCoins)
      .then((response) => {
        setStables(response.data.coin);
      })
    };
  
    const fetchCoins = async () => {
      await axios.request(getCoinConfig)
      .then((response) => {
        setCoin(response.data.coin);
      })
    };
  
    const getCoinId = (coinCode: string): number => {
      return coin.find(c => c.coin === coinCode)?.id || 0; // Default to 0 if not found
    };
    
    const getPrice = (coinCode: string) => {
      const id = getCoinId(coinCode);
      return prices.find(p => p.coin_id === id)?.selling;
    };
    React.useEffect(() => {
      fetchCoins();
      fetchCoinPrices();
      fetchStableCoin(); 
    },[]);

  const fetchBillServices = async () => {
    const response = await axios.request(billsServiceConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.bill_service as cryptoServiceProps[];
    return data;
  };

  const { data:billServices, status:billServiceStatus} = useQuery({
    queryKey: ['bills-service'],
    queryFn: fetchBillServices,
  });

  const fetchNetworkAirtime = async () => {
    const response = await axios.request(networksConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.branches as airtimeNetworkProps[];
    return data;
  };

  const { data:airtimeNetworks, status:airtimeNetworkStatus } = useQuery({
    queryKey: ['airtime-networks'],
    queryFn: fetchNetworkAirtime,
  });

  const { setActive } = activityIndex();
    const [prices, setPrices] = useState<CoinPrice[]>([]);
    const [coin, setCoin] = useState<Coins[]>([]);
    const [stables, setStables] = useState<Stables[]>([]);
    const [cat0, setCat0] = useState("Airtime");  
    const [subTab, setSubTab] = useState(billServices ? billServices[0].cs : 'fiat');
    const [selectedNetwork, setSelectedNetwork] = useState(airtimeNetworks ? airtimeNetworks[0].network : 'MTN');
    const [prop1, setprop1] = useState("NGN");
    const [prop2, setprop2] = useState("BTC");
    const [amount1, setAmount1] = useState<string>("");
    const [amount2, setAmount2] = useState<string>("");
      const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);

    const price = subTab === 'crypto' ? getPrice(prop2) : getPrice(prop1);
    useEffect(() => {
        if (lastChanged !== 'amount1') return;
        if (!amount1 || !prop1) return;
      
        if (price) {
          let newAmount2 = '';
            newAmount2 = (parseFloat(amount1) / parseFloat(price)).toFixed(6); 
      // Updating Zustand state
          setAmount2(newAmount2);
        }
      }, [amount1, prop1, subTab, prices, coin, lastChanged]);
    
      useEffect(() => {
        if (lastChanged !== 'amount2') return;
        if (!amount2 || !prop2) return;
      
        if (price) {
          let newAmount1 = '';
          newAmount1 = (parseFloat(amount2) / parseFloat(price)).toFixed(6); 
          setAmount1(newAmount1);
        }
      }, [amount2, prop2, subTab, prices, coin, lastChanged]);
    const navigate = useNavigate();


    const handleSelectChange = (network: string) => {
      setSelectedNetwork(network);
      setIsNetworkDropdownOpen(false);
    };

    const handleBuyClick = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data  = {
        type: subTab,
        service: cat0,
        amt_1: amount1,
        amt_2: amount2,
        network: selectedNetwork
      };

      setActive(cat0 === 'Airtime' ? 0 : 1)
      localStorage.setItem(cat0 === 'Airtime' ? "airtimeData" : "dataPurchaseData", JSON.stringify(data));
      navigate('/dashboard/bills_payment');
    };

    // const logoMap: Record<string, string> = {
    //   BTC: '/images/BTC Circular.png',
    //   ETH: '/images/ETH Circular.png',
    //   SOL: '/images/SOL Circular.png',
    //   USDT: 'images/USDT Circular.png',
    //   NGN: '/images/NGN Circular.png',
    //   MTN: '/images/MTN Circular.png',
    // };

  return (
    <form  onSubmit={handleBuyClick} >
      <div className={`space-y-2 w-full ${className || ""}`}>
        {/* Sub-Tabs */}
        <div className="mb-4">
          <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
          { billServices && billServices.length > 0 && billServices.map((item) => (
            <button
              key={item.cs}
              type="button"
              onClick={() => {setSubTab(item.cs)}}
              className={`${item.act === 'off' && 'hidden'} mt-[30px] w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${subTab === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
            >
              {item.cs}
            </button>
          ))}
          </div>
        </div>
        { billServiceStatus === 'success' && billServices &&
          <React.Fragment>
            {/* Airtime Dropdown */}
            <div className="flex justify-center space-x-4">
              <div className="font-Inter flex items-center w-full h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
                <p className="leading-[18px] font-[500] text-[12px] xl:leading-[21px] xl:text-[14px]">
                  {cat0}
                </p>
                <select
                  value={cat0}
                  onChange={(e) => setCat0(e.target.value)}
                  className="ml-auto p-2 bg-bg text-textDark rounded-md text-right"
                >
                  {airtimeOptions.map((prop) => (
                  <option key={prop} value={prop} className="text-center">
                    {prop}
                  </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              {/* Airtime Input */}
              <div className="flex justify-center space-x-4">
                <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <div className="w-full">
                      <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                        {cat0 === "Data" ? "Select Plan" : "Airtime Amount"}
                      </p>
                      <div className="flex gap-2">
                        <Input
                          value={amount1}
                          onChange={(e) => {setAmount1(e.target.value); setLastChanged('amount1');}}
                          placeholder="0.00"
                          className="flex-1 h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                        />
                        <div className="relative w-[135px] xl:w-[150px] flex-none">
                          <div
                            className="flex-none cursor-pointer bg-inherit xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 xl:ml-4"
                            onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                          >
                            <img
                              src={airtimeNetworks && airtimeNetworks.find(option => option.network === selectedNetwork)?.icon}
                              alt={selectedNetwork}
                              className="size-5 mr-1 rounded-full object-cover"
                            />
                            <span>{selectedNetwork}</span>
                            <HiChevronDown   className="size-6"/>            
                          </div>
                          { isNetworkDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                              { airtimeNetworks && airtimeNetworks.length > 0 && airtimeNetworks.map((network) => (
                                <div
                                  key={network.product_number}
                                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSelectChange(network.network)}
                                >
                                  <img src={network.icon} alt={network.network} className="w-6 h-6 mr-2 rounded-full" />
                                  <span>{network.network}</span>
                                </div>
                              ))}
            
                              { airtimeNetworkStatus === 'pending' && (
                                <div className="flex items-center justify-center py-4">
                                  <Loader2 className="animate-spin" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                          {/* <div className="flex items-center justify-end xl:justify-end font-Inter">
                              <img
                              src={logoMap[airtimeProp1 as keyof typeof logoMap]}
                              alt={`${airtimeProp1} logo`}
                              className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                              />
                              <select
                              value={airtimeProp1}
                              onChange={(e) => setAirtimeProp1(e.target.value)}
                              className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
                              >
                              {airtimeProps1.map((prop) => (
                              <option key={prop} value={prop}>
                                  {prop}
                              </option>
                              ))}
                              </select>
                          </div> */}
                      </div>
                  </div>
                </div>
              </div>
              {/* Switch Icon */}
              <div className="flex justify-center font-bold text-primary my-2">
                <img src={'/images/arrowdown.svg'} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
              </div>
              {/* Payment Input */}
              <div className="flex justify-center space-x-4">
                <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <div className="w-full">
                      <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                      You Pay
                      </p>
                      <div className="grid grid-cols-2">
                          <Input
                          value={amount2}
                          onChange={(e) => {setAmount2(e.target.value); setLastChanged('amount2');}}
                          placeholder="0.00"
                          className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                          />
                          <div className="flex items-center justify-end font-Inter">
                          <img
                              src={(subTab === "crypto" ? `/images/${prop2}` : `/images/${prop1} Circular.png`)}
                              alt={`${
                              subTab === "crypto" ? prop2 : prop1
                              } logo`}
                              className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                          />
                          <select
                              value={subTab === "crypto" ? prop2 : prop1}
                              onChange={(e) =>
                              subTab === "crypto"
                                  ? setprop2(e.target.value)
                                  : setprop1(e.target.value)
                              }
                              className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
                          >
                              {subTab === "crypto" ? 
                                coin.map((c) => (
                                <option key={c.id} value={c.coin} className="p-1">
                                  {c.coin}
                                </option>
                              )): (stables.map((s) => (
                                  <option key={s.id} value={s.coin} className="p-1">
                                    {s.coin}
                                  </option>
                                ))
                              )
                              }
                          </select>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment> 
        }
        { billServiceStatus === 'pending' && 
          <div className="flex justify-center items-center mt-5">
            <Loader2 className="animate-spin"/>
          </div>
        }
        {/* Buy Button */}
        <div className="flex justify-center items-center">
          <Button 
          type="submit"
          className="font-Inter xl:font-poppins py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
              Buy
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AirtimePayment;
