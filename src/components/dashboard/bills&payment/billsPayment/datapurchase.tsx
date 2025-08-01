import React, {useEffect, useState,  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formValidationSchema } from "../../../formValidation/formValidation";
import arrowIcon from '../../../../assets/images/arrowdown.svg'; 
import useBillsStore from "../../../../stores/billsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiChevronDown } from "react-icons/hi";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../../../stores/generalStore";
import { cn, formatNumberSafely, truncateTo8Decimals } from "../../../../lib/utils";
import useUserDetails from "../../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useBillServices } from "../../../../hooks/useBillServices";
import { useDataPurchaseNetworks } from "../../../../hooks/useDataPurchaseNetworks";
import { useAllBuyCoins } from "../../../../hooks/useAllBuyCoin";
import { useStableCoins } from "../../../../hooks/useStableCoins";
import { usePackages } from "../../../../hooks/usePackages";
import { useAllCoinPrices } from "../../../../hooks/useAllCoinPrices";
import { useLiveRates } from "../../../../hooks/useLiveRates";


type Inputs = {
  inputAmount: string;
  paymentAmount: string;
  selectedPayment: string;
  selectedNetwork:string;
  fiatPayment:string;
};

type airtimeNetworkProps = {
  network: string;
  product_number: number;
  icon: string;
};

type dataPackageProps = {
  payment_item_name: string;
  product_number: string;
  amount: number
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

const Datapurchase = () => {

  const { user, fetchKycDetails, kycDetails } = useUserDetails();

  const navigate = useNavigate();

  const { setShowTransactionDetail, setSelectedBill, selectedBill } = activityIndex();

  const { data:billServices, status:billServiceStatus} = useBillServices();
  const { data:networkOptionsList, status:networkOptionStatus} = useDataPurchaseNetworks();
  const { data: dataCoin } = useAllBuyCoins();

  const coin = dataCoin ? dataCoin.filter((item) => item.coin !== 'NGN') : undefined;

  const { data: stables } = useStableCoins();

  const [selectedNetwork, setSelectedNetwork] = useState(networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList[0].network : 'Select Network');
  const [selectedNetworkDetails, setSelectedNetworkDetails] = useState<airtimeNetworkProps | undefined>(() => networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList[0] : undefined);
  
  const [selectPayment, setSelectPayment] = useState((coin && coin.length > 0) ? coin[0].coin : 'BTC');
  const [selectPaymentDetails, setSelectPaymentDetails] = useState<coinsProps | undefined>(() => coin && coin.length > 0 ? coin[0] : undefined);

  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isNetworkDataPackageOpen, setIsNetworkDataPackageOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const { setItem } = useBillsStore();

  const [fiatPayment, setFiaPayment] = useState(stables && stables.length > 0 ? stables[0].coin : 'NGN');
  const [activeButton, setActiveButton] = useState( billServices ? billServices[0].cs : 'fiat');

  const { data:dataPackages, status:dataPackageStatus} = usePackages(selectedNetworkDetails?.product_number ?? 0);

  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedPackageDetails, setSelectedPackageDetails] = useState<dataPackageProps | undefined>(undefined);

  const isReadyAndAvailable = dataPackageStatus === 'success' && dataPackages.length > 0;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Inputs>({
    resolver: zodResolver(formValidationSchema), 
    defaultValues: {
      inputAmount: "",
      paymentAmount: "",
    }
  });

  const inputAmount = watch("inputAmount");
  const paymentAmount = watch("paymentAmount");

  const handleChange = (payment: string) => {
    setFiaPayment(payment);
    setIsPaymentDropdownOpen(false);
  };
  
  const handleSelectChange = (network:airtimeNetworkProps) => {
    setSelectedNetwork(network.network);
    setSelectedNetworkDetails(network);
    setIsNetworkDropdownOpen(false); 
  };

  const handleSelectedChange = (payment:coinsProps) => {
    setSelectPayment(payment.coin);
    setSelectPaymentDetails(payment)
    setIsPaymentDropdownOpen(false); 
  };

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

    const {data:liveRates } = useLiveRates();
    
    const getCoinId = (coinCode: string): number | undefined => {
      if (coin) {
        return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
      }
      return undefined; // Explicitly return undefined if coin is not defined
    };

    const { data:prices } = useAllCoinPrices();
    

  const dollarPrice = React.useMemo(() => {
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

    useEffect(() => {
    if (dataPackageStatus === 'success' && dataPackages && dataPackages.length > 0) {
      setSelectedPackage(dataPackages[0].payment_item_name);
      setSelectedPackageDetails(dataPackages[0]);
      setValue('inputAmount', dataPackages[0].payment_item_name);
      if (activeButton === 'fiat') {
        setValue('paymentAmount', dataPackages[0].amount.toString())
      } else {
        // setValue('paymentAmount', (dataPackages[0].amount / 1000).toFixed(6))
        const value = (dataPackages[0].amount / parseFloat(String(currentCoinPrice)));
        const lastValue = truncateTo8Decimals(value)
        setValue('paymentAmount', formatNumberSafely(lastValue.toString()))
      }
    } else {
      setSelectedPackage('Select Network Provider')
    }
  }, [dataPackageStatus, dataPackages, activeButton, currentCoinPrice])

  const handleSelectPackage = (package_name: dataPackageProps) => {
    setSelectedPackage(package_name.payment_item_name);
    setSelectedPackageDetails(package_name);
    if (activeButton === 'fiat') {
      setValue('paymentAmount', package_name.amount.toString())
    } else {
      const value = (package_name.amount / parseFloat(String(currentCoinPrice)));
      const lastValue = truncateTo8Decimals(value)
      setValue('paymentAmount', formatNumberSafely(lastValue.toString()))
    }
    setValue('inputAmount', package_name.payment_item_name);
    setIsNetworkDataPackageOpen(false);
  };

  React.useEffect(() => {
    setSelectedBill('data');
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
      selectedNetwork: selectedNetwork,
      transaction_type: activeButton,
      naira_amount: Number(selectedPackageDetails?.amount),
      coin_token_id: activeButton === 'crypto' ? selectPaymentDetails?.id : undefined,
      coin_amount: activeButton === 'crypto' ?  Number(data.paymentAmount) : undefined,
      bills: selectedBill,
      network: selectedNetwork,
      current_rate: currentRate?.priceInUsd,
      package_product_number: selectedPackageDetails?.product_number,
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
            onClick={() => setActiveButton(item.cs)}
            className={`${item.act === 'off' && 'hidden'} w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${activeButton === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
          >
            {item.cs}
          </button>

        ))}
      </div>

      { billServiceStatus === 'success' && billServices && billServices.length > 0 && 
        <React.Fragment>
          <div className="flex bg-[#f5f5f5] w-full xl:-h-[60px] h-[48px] rounded-sm mt-5 items-center">
            <h3 className="px-3 py-2" >Data Purchase</h3>
          </div>
          <div className="w-full  rounded-sm bg-[#f5f5f5] mt-3 ">
            <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px]  xl:mt-[8px] xl:p-3  xl:leading-[21px]">Select plan</label>
            <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px] px-3 py-2 leading-[18px]">You Receive</label>
            <div className=" px-3 h-[96px]  lg:h-[105px]">
              <div className="relative flex-1">
                <div
                  className="cursor-pointer bg-white  xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] h-[40px] xl:w-full xl:h-[40px] rounded-sm flex items-center justify-between focus:outline-none focus:ring-0 p-1 w-full"
                  onClick={() => setIsNetworkDataPackageOpen(!isNetworkDataPackageOpen)}
                >
                  <span className="flex gap-5 flex-1">{dataPackageStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedPackage} 
                  </span>
                  <HiChevronDown   className="size-6"/>             
                </div>

                { isNetworkDataPackageOpen && (
                  <div className={cn("absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1", isReadyAndAvailable ? 'h-[250px] overflow-y-auto' : 'h-[70px]')}>
                    { dataPackages && dataPackages.length > 0 && dataPackages.map((dataPackage) => (
                      <div
                        key={dataPackage.product_number}
                        className="flex items-center px-4 py-2 cursor-pointer   hover:bg-gray-100 rounded-lg"
                        onClick={() => handleSelectPackage(dataPackage)}
                      >
                        <span>{dataPackage.payment_item_name}</span>
                      </div>
                    ))}
                    { dataPackageStatus === 'pending' && (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                    { dataPackageStatus === 'success' && dataPackages.length < 1 && (
                      <div className="flex items-center justify-center py-4">
                        <p>DataPackages not available</p>
                      </div>
                    )}
                    { dataPackageStatus === 'error' && (
                      <div className="flex items-center justify-center w-full h-full px-2">
                        <p>Error occured while loading data packages. Try again later.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <div
                  className="cursor-pointer   bg-white xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] lg:mt-4 mt-3 w-full h-[40px]  xl:h-[40px] border border-none rounded-sm flex items-center justify-between  focus:outline-none focus:ring-0   "
                  onClick={() => {setIsNetworkDropdownOpen(!isNetworkDropdownOpen); setIsNetworkDataPackageOpen(false)}}
                >
                  { selectedNetwork === 'Select Network' ? <div className="invisible"/> :
                    <img
                      src={networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList.find(option => option.network === selectedNetwork)?.icon : '/images/MTN Circular.png'}
                      alt={selectedNetwork}
                      className="size-6 mr-2 rounded-full"
                    />
                  }
                  <span className="flex">{networkOptionStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedNetwork} <HiChevronDown   className="size-6"/>             
                  </span>
                </div>

                { isNetworkDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
                    { networkOptionsList && networkOptionsList.length > 0 && networkOptionsList.map((network) => (
                      <div
                        key={network.product_number}
                        className="flex items-center p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                        onClick={() => handleSelectChange(network)}
                      >
                        <img src={network.icon} alt={network.network} className=" size-6 mr-2 rounded-full" />
                        <span>{network.network}</span>
                      </div>
                    ))}
                    { networkOptionStatus === 'pending' && (
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

          <div className=" flex justify-center mt-10 lg:mt-5 items-center m-5 ">
            <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
          </div>

          <div className="w-full h-[64px] rounded-sm bg-[#f5f5f5] lg:mt-5  xl:h-[96px] mt-8">
            <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5  xl:p-3  xl:leading-[21px]">You Pay</label>
            <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px] px-3 py-2  leading-[18px]">You Pay</label>

            <div className="flex justify-between px-3 ">
              <input
                {...register("paymentAmount")}
                type="text"
                disabled
                placeholder="0.00000078"
                className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />

            <div className="relative">
                <div
                  className="cursor-pointer bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0"
                  onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                >
                  { activeButton === 'crypto' ? (
                    <>
                      <img
                        src={coin?.find(option => option.coin === selectPayment)?.icon}
                        alt={selectPayment}
                        className="size-6 mr-2"
                      />
                      <span>{selectPayment}</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={stables?.find(option => option.coin === fiatPayment)?.icon}
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
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
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
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
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

export default Datapurchase;
