import React, {  useEffect, useMemo, useState,  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formValidationSchema } from "../../../formValidation/formValidation";
import arrowIcon from '../../../../assets/images/arrowdown.svg'; 
import useBillsStore from "../../../../stores/billsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiChevronDown } from "react-icons/hi";
import { useApiConfig } from "../../../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../../../stores/generalStore";
import useUserDetails from "../../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useStableCoins } from "../../../../hooks/useStableCoins";
import { useAllBuyCoins } from "../../../../hooks/useAllBuyCoin";
import { useLiveRates } from "../../../../hooks/useLiveRates";
import { useAllCoinPrices } from "../../../../hooks/useAllCoinPrices";
import { useBillServices } from "../../../../hooks/useBillServices";
import { usePackages } from "../../../../hooks/usePackages";
import { formatNumberSafely, truncateTo8Decimals } from "../../../../lib/utils";
  
type Inputs = {
  inputAmount: string;
  paymentAmount: string;
  selectedPayment: string;
  selectedNetwork:string;
  fiatPayment:string;
};

type electricBranchProps = {
  electricity: string;
  product_number: number;
  abrv:string;
  icon: string;
}; 

interface coinsProps {
  coin: string;
  coin_name: string;
  icon: string;
  status: string;
  id: number;
  method: string;
  stable_coins: string;
};

const ElectricityBills = () => {

  const { user, fetchKycDetails, kycDetails } = useUserDetails();

  const navigate = useNavigate();

  const { setShowTransactionDetail, setSelectedBill, selectedBill } = activityIndex();

  const electricBranchesConfig = useApiConfig({
    method: 'get',
    url: 'get-electricity-branches/electricity/postpaid'
  });

  const fetchElectricBranches = async () => {
    const response = await axios.request(electricBranchesConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    };
    const data = response.data.branches as electricBranchProps[];
    return data;
  };

  const { data: stables } = useStableCoins();
  const { data:dataCoin } = useAllBuyCoins();
  const {data:liveRates } = useLiveRates();

  const coin = dataCoin ? dataCoin.filter((item) => item.coin !== 'NGN') : undefined;
    
  const getCoinId = (coinCode: string): number | undefined => {
    if (coin) {
      return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
    }
    return undefined; // Explicitly return undefined if coin is not defined
  };

  const { data:prices } = useAllCoinPrices();

  const getSellingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    if (prices) {
      return prices.find(p => p.coin_id === id)?.selling;
    }
  };

  const getBuyingPrice = (coinCode: string) => {
    const id = getCoinId(coinCode);
    if (prices) {
      return prices.find(p => p.coin_id === id)?.buying;
    }
  };
  const { data:billServices, status:billServiceStatus} = useBillServices();

  const { data:electicBranches, status:electricBranchesStatus} = useQuery({
    queryKey: ['electric-branches'],
    queryFn: fetchElectricBranches,
  });

  const { register, handleSubmit,setValue, formState: { errors }, reset, watch} = useForm<Inputs>({
    resolver: zodResolver(formValidationSchema), 
    defaultValues:{
      inputAmount: "",
    paymentAmount: "",
    }
  });

  const inputAmount = watch("inputAmount");
  const paymentAmount = watch("paymentAmount");

  const [amount1, setAmount1] = useState<string>("0");
  const [amount2, setAmount2] = useState<string>("0");
  
  const [selectedNetwork, setSelectedNetwork] = useState(electicBranches ? electicBranches[0].abrv : 'IBEDC');
  const [selectedNetworkDetails, setSelectedNetworkDetails] = useState<electricBranchProps | undefined>(() => electicBranches && electicBranches.length > 0 ? electicBranches[0] : undefined);

  const [selectPayment, setSelectPayment] = useState((coin && coin.length > 0) ? coin[0].coin : 'BTC');
  const [selectPaymentDetails, setSelectPaymentDetails] = useState<coinsProps | undefined>(() => coin && coin.length > 0 ? coin[0] : undefined);

  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const { setItem } = useBillsStore();

  const { data:packageData } = usePackages(selectedNetworkDetails?.product_number ?? 0);

  const packageDetails = packageData?.[0];

  const [fiatPayment, setFiaPayment] = useState('NGN');
  const [activeButton, setActiveButton] = useState(billServices ? billServices[0].cs : 'fiat');
  const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);

  const handleSelectChange = (network: electricBranchProps) => {
    setSelectedNetwork(network.abrv);
    setSelectedNetworkDetails(network)
    setIsNetworkDropdownOpen(false); 
  };

  const handleSelectedChange = (payment:coinsProps) => {
    setLastChanged('amount2')
    setSelectPayment(payment.coin);
    setSelectPaymentDetails(payment);
    setIsPaymentDropdownOpen(false); 
  };
  const handleChange = (payment: string) => {
    setFiaPayment(payment);
    setLastChanged('amount1')
    setIsPaymentDropdownOpen(false);
  };

  // const paymentOptions = [
  //   { value: 'BTC', logo: btcLogo },
  //   { value: 'ETH', logo: ETHLogo },
  //   { value: 'USDT', logo: USDTLogo },
  //   { value: 'SOL', logo: SOLLogo },
  // ];
  // const fiatPaymentOptions = [
  //   { value: 'NGN', logo: ngnlogo },
  //   { value: 'USD', logo: ngnlogo },
  //   { value: 'EUR', logo: ngnlogo },
  //   { value: 'GBP', logo: ngnlogo },
  // ];

  //autofill for both inputs

  const dollarPrice = useMemo(() => {
    if (activeButton === 'crypto') {
      return getSellingPrice(selectPayment);
    } else {
      return getBuyingPrice(selectPayment);
    }
  }, [activeButton, inputAmount, paymentAmount, selectPayment, fiatPayment, amount1, amount2, prices, coin]);

  
  const getCoinSellingPriceInNaira = (coinCode: string) => {
    if (!coinCode || !liveRates || liveRates.length === 0) return undefined;

    const currentCoin = liveRates.find((item) => item.symbol === coinCode);
    if (!currentCoin || !currentCoin.price || !dollarPrice) return undefined;

    const priceInUsd = parseFloat(currentCoin.price.replace(/,/g, ""));
    const dollarValue = parseFloat(String(dollarPrice));

    if (isNaN(priceInUsd) || isNaN(dollarValue)) return undefined;

    const priceInNaira = priceInUsd * dollarValue;
    return { priceInNaira, priceInUsd, dollarValue };
  };

  const currentRate = getCoinSellingPriceInNaira(selectPayment);

  useEffect(() => {
    
    if (lastChanged !== 'amount1') return;
    if (!amount1) {
      setAmount2("");
      setValue("paymentAmount", "");
      return;
  }
    if (dollarPrice) {
      let newpaymentAmount = '';
      if (activeButton === "crypto") {
        //WE DONOT KNOW THE FORMULA YET
        const value = (parseFloat(amount1) / (currentRate && currentRate.priceInNaira ? currentRate.priceInNaira : 1000))
        const lastValue = truncateTo8Decimals(value)
        newpaymentAmount = formatNumberSafely(lastValue.toString())
      } else if (activeButton === 'fiat') {
        newpaymentAmount = (parseFloat(amount1)).toFixed(2); // NGN
      }
  // Updating Zustand state
      setAmount2(newpaymentAmount);
      setValue("paymentAmount", newpaymentAmount);
    }
  }, [amount1, fiatPayment, activeButton, prices, coin, lastChanged]);

  useEffect(() => {
    if (lastChanged !== 'amount2') return;
    if (!amount2) {
      setAmount1("");
      setValue("inputAmount", "");
      return;
      }
  
    if (dollarPrice) {
      let newinputAmount = '';
      if (activeButton === "crypto") {
        //WE DONOT KNOW THE FORMULA YET
        const value = (parseFloat(amount1) / (currentRate && currentRate.priceInNaira ? currentRate.priceInNaira : 1000))
        const lastValue = truncateTo8Decimals(value)
        newinputAmount = formatNumberSafely(lastValue.toString()); // NGN → crypto
      } else if (activeButton === 'fiat') {
        newinputAmount = (parseFloat(amount2)).toFixed(2); 
      }
      setAmount1(newinputAmount);
      setValue("inputAmount", newinputAmount);
    }
  }, [amount2, selectPayment, activeButton, prices, coin, lastChanged]);

  React.useEffect(() => {
    setSelectedBill('electricity');
  },[])

  useEffect(() => {
      if (user) {
        fetchKycDetails(); 
      }
  }, [user])
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!user) {
      navigate("/log-in");
      return;
    };

    if (user && kycDetails) {
      if (kycDetails.status === 'Unverified' || kycDetails.status === 'pending' || kycDetails.status === 'Pending') {
        navigate("/dashboard/identity_verification"); 
        return;
      }
    };

    const regdata = {...data,
      selectPayment: activeButton === 'crypto' ? selectPayment : fiatPayment,
      selectedNetwork:selectedNetwork,
      transaction_type: activeButton,
      naira_amount: Number(data.inputAmount),
      coin_token_id: activeButton === 'crypto' ? selectPaymentDetails?.id : undefined,
      coin_amount: activeButton === 'crypto' ?  Number(data.paymentAmount) : undefined,
      bills: selectedBill,
      network: selectedNetwork,
      current_rate: currentRate?.priceInUsd,
      package_product_number: packageDetails?.product_number,
    };
  
    setShowTransactionDetail(true); 
    setItem(regdata);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      <div className="flex gap-5 items-center">
        { billServices && billServices.length > 0 && billServices.map((item) => (
          <button
            key={item.cs}
            type="button"
            onClick={() => {reset(); setActiveButton(item.cs)}}
            className={`${item.act === 'off' && 'hidden'} w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${activeButton === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
          >
            {item.cs}
          </button>

        ))}
      </div>

      { billServiceStatus === 'success' && billServices && billServices.length > 0 && 
        <React.Fragment>
          <div className="flex bg-[#f5f5f5] w-full xl:-h-[60px] h-[48px] rounded-sm mt-5 items-center">
            <h3 className="px-3 py-2" >Pay Electricity Bill</h3>
          </div>
          <div className="h-[64px] rounded-sm bg-[#f5f5f5] mt-3 w-full xl:h-[96px]">
            <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:mt-[8px] xl:font-normal xl:text-[14px] xl:p-3 xl:leading-[21px]"> Enter Amount </label>
            <label htmlFor="payment" className="block xl:hidden text-[#121826] font-Inter text-[12px] px-3 py-2  leading-[18px]">You Receive</label>
            <div className="flex justify-between px-3">
              <input
                {...register("inputAmount")}
                value= {amount1}
                type="text"
                placeholder="0.00"
                onChange={(e) => {setAmount1(e.target.value);setLastChanged('amount1');}}
                className="xl:w-[143px] w-[100px] h-[25px] leading-[27px] mt-0 text-[16px] xl:h-[32px] xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
              />

              <div className="relative">
                <div
                  className="cursor-pointer bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 xl:ml-4"
                  onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                >
                  <img
                    src={electicBranches ? electicBranches.find(option => option.abrv === selectedNetwork)?.icon : '/images/IBEDC_Circular.png'}
                    alt={selectedNetwork}
                    className="size-6 mr-1 rounded-full"
                  />
                  <span>{selectedNetwork}</span>
                  <HiChevronDown   className="size-6"/>           
                  </div>

                {isNetworkDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
                    { electicBranches && electicBranches.length > 0 && electicBranches.map((network) => (
                      <div
                        key={network.abrv}
                        className="flex items-center py-1 px-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                        onClick={() => handleSelectChange(network)}
                      >
                        <img src={network.icon} alt={network.abrv} className=" size-6 mr-2 rounded-full" />
                        <span>{network.abrv}</span>
                      </div>
                    ))}

                    { electricBranchesStatus === 'pending' && (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {errors.inputAmount && <p className="text-red-500 text-xs">{errors.inputAmount?.message}</p>}

          <div className="flex justify-center items-center m-5">
            <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px] text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
          </div>

          <div className="h-[64px] rounded-sm bg-[#f5f5f5] w-full xl:h-[96px] mt-5">
            <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5 xl:p-3 xl:leading-[21px]">You Pay</label>
            <label htmlFor="payment" className="block xl:hidden text-[#121826] font-Inter text-[12px] p-2 leading-[18px]">You Pay</label>

            <div className="flex justify-between px-3">
              <input
                {...register("paymentAmount")}
                value = {amount2}
                type="text"
                placeholder="0.00"
                onChange={(e) => {setAmount2(e.target.value);setLastChanged('amount2');}}
                className="xl:w-[143px] w-[100px] h-[25px] text-[16px] xl:h-[32px] xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter leading-[27px] xl:leading-[34.5px]"
              />

              <div className="relative">
                <div
                  className="cursor-pointer bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 p-1"
                  onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                >
                  {activeButton === 'crypto' ? (
                    <>
                      <img
                        src={coin && coin.length > 0 ? coin.find(option => option.coin === selectPayment)?.icon: `/images/${selectPayment} Circular.png`}
                        alt={selectPayment}
                        className="size-6 mr-2"
                      />
                      <span>{selectPayment}</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={stables && stables.length > 0 ? stables.find(option => option.coin === fiatPayment)?.icon : `/images/${fiatPayment} Circular.png`}
                        alt={fiatPayment}
                        className="size-6 mr-2"
                      />
                      <span>{fiatPayment}</span>
                    </>
                  )}
                  <HiChevronDown className="size-6" />
                </div>

                {isPaymentDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
                    {activeButton === 'crypto' ? (
                     coin && coin.length > 0 && coin.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectedChange(payment)}
                        >
                          <img src={payment.icon} alt={payment.coin} className="size-6 mr-2" />
                          <span>{payment.coin}</span>
                        </div>
                      ))
                    ) : (
                      stables && stables.length > 0 && stables.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleChange(payment.coin_name)}
                        >
                          <img src={payment.icon} alt={payment.coin} className="size-6 mr-2" />
                          <span>{payment.coin}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {errors.paymentAmount && <p className="text-red-500 text-xs">{errors.paymentAmount?.message}</p>}
        </React.Fragment>
      }

      { billServiceStatus === 'pending' && 
        <div className="flex justify-center items-center mt-5">
          <Loader2 className="animate-spin"/>
        </div>
      }

      <div className="flex items-center justify-center mt-10">
        <button type="submit"
          className="xl:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]"
        >
          Buy
        </button>
      </div>
    </form>
  );
}

export default ElectricityBills;
