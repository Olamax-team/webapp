import React, {useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formValidationSchema } from "../../../formValidation/formValidation";
import arrowIcon from '../../../../assets/images/arrowdown.svg'; 
import useBillsStore from "../../../../stores/billsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiChevronDown } from "react-icons/hi";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../../../stores/generalStore";
import useUserDetails from "../../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { cn, truncateTo8Decimals } from "../../../../lib/utils";
import { useStableCoins } from "../../../../hooks/useStableCoins";
import { useAllBuyCoins } from "../../../../hooks/useAllBuyCoin";
import { useAllCoinPrices } from "../../../../hooks/useAllCoinPrices";
import { useLiveRates } from "../../../../hooks/useLiveRates";
import { useBillServices } from "../../../../hooks/useBillServices";
import { useTVServices } from "../../../../hooks/useTVServices";
import { usePackages } from "../../../../hooks/usePackages";


type Inputs = {
  inputAmount: string;
  paymentAmount: string;
  selectedPayment: string;
  selectedNetwork:string;
  fiatPayment:string;
};

type cableServicesProps = {
  cable: string;
  product_number: number;
  abrv: string;
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

type packageProps = {
  payment_item_name: string;
  product_number: string;
  amount: number
};

const CableTv = () => {

  const { user, fetchKycDetails, kycDetails } = useUserDetails();

  const navigate = useNavigate();

  const { setShowTransactionDetail, setSelectedBill, selectedBill } = activityIndex();

    const { data: stables } = useStableCoins();
    const { data:dataCoin } = useAllBuyCoins();

    const coin = dataCoin ? dataCoin.filter((item) => item.coin !== 'NGN') : undefined;
     
   const getCoinId = (coinCode: string): number | undefined => {
     if (coin) {
       return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
     }
     return undefined; // Explicitly return undefined if coin is not defined
   };
 
   const { data:prices } = useAllCoinPrices();
    const {data:liveRates } = useLiveRates();
 
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

  const { data:billServices, status:billServiceStatus } = useBillServices();
  const { data:tvServices, status:tvServiceStatus } = useTVServices();

  const { register, handleSubmit,setValue, formState: { errors }, reset,watch} = useForm<Inputs>({
    resolver: zodResolver(formValidationSchema), 
    defaultValues:{
      inputAmount: "",
      paymentAmount:"",
    }
  });

  const inputAmount = watch("inputAmount");
  const paymentAmount = watch("paymentAmount");

  // const [amount1, setAmount1] = useState<string>("0");
  // const [amount2, setAmount2] = useState<string>("0");

  const [selectedNetwork, setSelectedNetwork] = useState(tvServices ? tvServices[0].abrv : 'DSTV');
  const [selectedNetworkDetails, setSelectedNetworkDetails] = useState<cableServicesProps | undefined>(() => tvServices && tvServices.length > 0 ? tvServices[0] : undefined);

  const [selectPayment, setSelectPayment] = useState((coin && coin.length > 0) ? coin[0].coin : 'BTC');
  const [selectPaymentDetails, setSelectPaymentDetails] = useState<coinsProps | undefined>(() => coin && coin.length > 0 ? coin[0] : undefined);

  const [isNetworkDataPackageOpen, setIsNetworkDataPackageOpen] = useState(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const { setItem } = useBillsStore();

  const [fiatPayment, setFiaPayment] = useState('NGN');
  const [activeButton, setActiveButton] = useState(billServices ? billServices[0].cs : 'fiat');
  
  const handleSelectChange = (network: cableServicesProps) => {
    setSelectedNetwork(network.abrv);
    setSelectedNetworkDetails(network);
    setIsNetworkDropdownOpen(false);
  };

  const handleSelectedChange = (payment: coinsProps) => {
    setSelectPayment(payment.coin);
    setSelectPaymentDetails(payment);
    setIsPaymentDropdownOpen(false); 
  };

  const handleChange = (payment: string) => {
    setFiaPayment(payment);
    setIsPaymentDropdownOpen(false);
  };


  const { data:subscriptionPackages, status:cablePackageStatus} = usePackages(selectedNetworkDetails?.product_number ?? 0);

  const [selectedPackage, setSelectedPackage] = useState('');
  const [, setSelectedPackageDetails] = useState<packageProps | undefined>(undefined);
  const isReadyAndAvailable = cablePackageStatus === 'success' && subscriptionPackages.length > 0;

  const dollarPrice = useMemo(() => {
    if (activeButton === 'crypto') {
      return getSellingPrice(selectPayment);
    } else {
      return getBuyingPrice(selectPayment);
    }
  }, [activeButton, inputAmount, paymentAmount, selectPayment, fiatPayment, prices, coin]);

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

    const currentCoinPrice = React.useMemo(() => {
      if (!selectPayment) return undefined;
      const nairaValue = getCoinSellingPriceInNaira(selectPayment)
      return nairaValue?.priceInNaira;
    }, [selectPayment, liveRates, dollarPrice]);

  const handleSelectPackage = (package_name: packageProps) => {
    setSelectedPackage(package_name.payment_item_name);
    setSelectedPackageDetails(package_name);
    if (activeButton === 'fiat') {
      setValue('paymentAmount', package_name.amount.toString())
    } else {
      const value = (package_name.amount / parseFloat(String(currentCoinPrice)));
      const lastValue = truncateTo8Decimals(value)
      setValue('paymentAmount', lastValue.toString())
    }
    setValue('inputAmount', package_name.payment_item_name);
    setIsNetworkDataPackageOpen(false);
  };

  useEffect(() => {
    setSelectedBill('cable')
  },[]);

  useEffect(() => {
      if (user) {
          fetchKycDetails(); 
      }
  }, [user])

    useEffect(() => {
      if (tvServiceStatus === 'success' && subscriptionPackages && subscriptionPackages.length > 0) {
        setSelectedPackage(subscriptionPackages[0].payment_item_name);
        if (subscriptionPackages && subscriptionPackages.length > 0) {
          setSelectedPackageDetails(subscriptionPackages[0]);
        }
        setValue('inputAmount', subscriptionPackages[0].payment_item_name);
        if (activeButton === 'fiat') {
          setValue('paymentAmount', subscriptionPackages[0].amount.toString())
        } else {
          const value = (subscriptionPackages[0].amount / (currentRate && currentRate.priceInNaira ? currentRate.priceInNaira : 1000));
          const lastValue = truncateTo8Decimals(value)
          setValue('paymentAmount', lastValue.toString())
        }
      } else {
        setSelectedPackage('Package Loading...')
      }
    }, [tvServiceStatus, subscriptionPackages, activeButton])
    

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
      package_product_number: selectedNetworkDetails?.product_number,
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
            <h3 className="px-3 py-2" >Cable TV Recharge</h3>
          </div>

          <div className="w-full  rounded-sm bg-[#f5f5f5] mt-3 ">
            <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px]  xl:mt-[8px] xl:p-3  xl:leading-[21px]">Select plan</label>
            <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px] px-3 py-2 leading-[18px]">Select Plan</label>
            <div className=" px-3 h-[96px]  lg:h-[105px] ">
              <div className="relative flex-1">
                <div
                  className="cursor-pointer bg-white xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-full h-[40px] xl:w-full xl:h-[40px] rounded-sm flex items-center justify-between focus:outline-none focus:ring-0 p-1"
                  onClick={() => setIsNetworkDataPackageOpen(!isNetworkDataPackageOpen)}
                >
                  <span className="flex gap-5 justify-between">{cablePackageStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedPackage} <HiChevronDown   className="size-6"/>             
                  </span>
                </div>

                { isNetworkDataPackageOpen && (
                  <div className={cn("absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1", isReadyAndAvailable ? 'h-[250px] overflow-y-auto' : 'h-[70px]')}>
                    { subscriptionPackages && subscriptionPackages.length > 0 && subscriptionPackages.map((dataPackage) => (
                      <div
                        key={dataPackage.product_number}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                        onClick={() => handleSelectPackage(dataPackage)}
                      >
                        <span>{dataPackage.payment_item_name}</span>
                      </div>
                    ))}
                    { cablePackageStatus === 'pending' && (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                    { cablePackageStatus === 'success' && subscriptionPackages.length < 1 && (
                      <div className="flex items-center justify-center py-4">
                        <p>DataPackages not available</p>
                      </div>
                    )}
                    { cablePackageStatus === 'error' && (
                      <div className="flex items-center justify-center w-full h-full px-2">
                        <p>Error occured while loading packages. Try again later.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <div
                  className="cursor-pointer   bg-white xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-full mt-4 h-[40px] xl:w-full xl:h-[40px] border border-none rounded-sm flex items-center justify-between  focus:outline-none focus:ring-0   "
                  onClick={() => {setIsNetworkDropdownOpen(!isNetworkDropdownOpen); setIsNetworkDataPackageOpen(false)}}
                >
                  <img
                    src={tvServices && tvServices.length > 0 ? tvServices.find(option => option.abrv === selectedNetwork)?.icon : '/images/MTN Circular.png'}
                    alt={selectedNetwork}
                    className="size-6 mr-2 rounded-full"
                  />
                  <span className="flex">{tvServiceStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedNetwork}  <HiChevronDown   className="size-6"/>             
                  </span>
                </div>

                { isNetworkDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
                    { tvServices && tvServices.length > 0 && tvServices.map((network) => (
                      <div
                        key={network.product_number}
                        className="flex items-center p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                        onClick={() => handleSelectChange(network)}
                      >
                        <img src={network.icon} alt={network.abrv} className=" size-6 mr-2 rounded-full" />
                        <span>{network.abrv}</span>
                      </div>
                    ))}
                    { tvServiceStatus === 'pending' && (
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
    
          <div className=" flex justify-center mt-10 lg:mt-5  items-center m-5 ">
            <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
          </div>
    
          <div className=" h-[64px] rounded-sm bg-[#f5f5f5]  w-full xl:h-[96px] mt-10">
          <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5  xl:p-3  xl:leading-[21px]">You Pay</label>
          <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]  px-3 py-2  leading-[18px]">You Pay</label>
    
          <div className="flex justify-between px-3">
            <input
              {...register("paymentAmount")}
              type="text"
              disabled
              placeholder="0.00"
              className="xl:w-[143px] w-[100px] h-[25px] text-[16px]  xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter leading-[27px] xl:leading-[34.5px]"
            />
  
      <div className="relative">
          <div
            className="cursor-pointer bg-[#f55f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0"
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
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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
                    onClick={() => handleChange(payment.coin)}
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
  )
}

export default CableTv
