import React, {useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formValidationSchema } from "../../../formValidation/formValidation";
import arrowIcon from '../../../../assets/images/arrowdown.svg'; 
// import btcLogo from '../../../../assets/images/BTC Circular.png'
// import ETHLogo from '../../../../assets/images/ETH Circular.png'
// import USDTLogo from '../../../../assets/images/USDT Circular.png'
// import SOLLogo from '../../../../assets/images/SOL Circular.png'
import useBillsStore from "../../../../stores/billsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiChevronDown } from "react-icons/hi";
// import ngnlogo from '../../../../assets/images/NGN Circular.png';
import { useApiConfig } from "../../../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../../../stores/generalStore";
import { useFetchStore } from "../../../../stores/fetch-store";



type Inputs = {
  inputAmount: string;
  paymentAmount: string;
  selectedPayment: string;
  selectedNetwork:string;
  fiatPayment:string;

};

type cryptoServiceProps = {
  cs: string;
  act: string;
};

type cableServicesProps = {
  cable: string;
  product_number: number;
  abrv: string;
  icon: string;
};

const CableTv = () => {

  const { setShowTransactionDetail, setSelectedBill } = activityIndex();
   const { fetchAllCoinPrices, fetchStableCoins, fetchAllCoins } = useFetchStore();

  const billsServiceConfig = useApiConfig({
    method: 'get',
    url: 'get-bills-services'
  });

  const tvServiceConfig = useApiConfig({
    method: 'get',
    url: 'get-tv'
  });

  const fetchTvServices = async () => {
    const response = await axios.request(tvServiceConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.cable as cableServicesProps[];
    return data;
  };

  const fetchBillServices = async () => {
    const response = await axios.request(billsServiceConfig);
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data.bill_service as cryptoServiceProps[];
    return data;
  };
    const { data: stables } = useQuery({
      queryKey: ['stable-coins'],
      queryFn: fetchStableCoins
    })
  
    const { data:coin } = useQuery({
      queryKey: ['all-coins'],
      queryFn: fetchAllCoins
    })
     
   const getCoinId = (coinCode: string): number | undefined => {
     if (coin) {
       return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
     }
     return undefined; // Explicitly return undefined if coin is not defined
   };
 
   const { data:prices } = useQuery({
     queryKey: ['coin-prices'],
     queryFn: fetchAllCoinPrices
   });
 
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

  const { data:billServices, status:billServiceStatus } = useQuery({
    queryKey: ['bills-service'],
    queryFn: fetchBillServices,
  });

  const { data:tvServices, status:tvServiceStatus } = useQuery({
    queryKey: ['tv-services'],
    queryFn: fetchTvServices,
  });

  const frontPageData = JSON.parse(localStorage.getItem('tvData') || '{}');

  const { register, handleSubmit,setValue, formState: { errors }, reset,watch} = useForm<Inputs>({
    resolver: zodResolver(formValidationSchema), 
    defaultValues:{
      inputAmount: "",
      paymentAmount:"",
    }
  });

  const inputAmount = watch("inputAmount");
  const paymentAmount = watch("paymentAmount");
  const [amount1, setAmount1] = useState<string>("0");
  const [amount2, setAmount2] = useState<string>("0");
  const [selectedNetwork, setSelectedNetwork] = useState(frontPageData && Object.keys(frontPageData).length > 0 ? frontPageData.network : tvServices ? tvServices[0].abrv : 'DSTV');
  const [selectPayment, setSelectPayment] = useState('BTC');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const cableDetails = useBillsStore();
  const [fiatPayment, setFiaPayment] = useState('NGN');
  const [activeButton, setActiveButton] = useState(frontPageData && Object.keys(frontPageData).length > 0 ? frontPageData.type : billServices ? billServices[0].cs : 'fiat');
  const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);
  
  const handleSelectChange = (network: string) => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false);
  };

  const handleSelectedChange = (payment: string) => {
    setSelectPayment(payment);
    setIsPaymentDropdownOpen(false); 
  };
  const handleChange = (payment: string) => {
    setFiaPayment(payment);
    setIsPaymentDropdownOpen(false);
  };

  // const fiatPaymentOptions = [
  //   { value: 'NGN', logo: ngnlogo },
  //   { value: 'USD', logo: ngnlogo },
  //   { value: 'EUR', logo: ngnlogo },
  //   { value: 'GBP', logo: ngnlogo },
  // ];

  // const paymentOptions = [
  //   { value: 'BTC', logo: btcLogo },
  //   { value: 'ETH', logo: ETHLogo },
  //   { value: 'USDT', logo: USDTLogo },
  //   { value: 'SOL', logo: SOLLogo },
  // ];
    //autofill for both inputs
    const price = useMemo(() => {
      if (activeButton === 'crypto') {
        return getSellingPrice(selectPayment);
      } else {
        return getBuyingPrice(selectPayment);
      }
    }, [activeButton, inputAmount, paymentAmount, selectPayment, fiatPayment, amount1, amount2, prices, coin]);
    useEffect(() => {
      
      if (lastChanged !== 'amount1') return;
      if (!amount1) {
        setAmount2("");
        setValue("paymentAmount", "");
        return;
    }
      if (price) {
        let newpaymentAmount = '';
        if (activeButton === "crypto") {
          //WE DONOT KNOW THE FORMULA YET
          newpaymentAmount = (parseFloat(amount1) / parseFloat(price)).toFixed(6); // NGN → crypto
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
    
      if (price) {
        let newinputAmount = '';
        if (activeButton === "crypto") {
          //WE DONOT KNOW THE FORMULA YET
          newinputAmount = (parseFloat(amount2) * parseFloat(price)).toFixed(2); // NGN → crypto
        } else if (activeButton === 'fiat') {
          newinputAmount = (parseFloat(amount2)).toFixed(2); 
        }
        setAmount1(newinputAmount);
        setValue("inputAmount", newinputAmount);
      }
    }, [amount2, selectPayment, activeButton, prices, coin, lastChanged]);
    

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.getItem('tvData');

    const rechargeData = {...data,
      selectPayment: activeButton === 'crypto' ? selectPayment : fiatPayment,
      selectedNetwork: selectedNetwork, 
    };
    setShowTransactionDetail(true); 
    setSelectedBill('cabletv')
    cableDetails.setItem(rechargeData);
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
    
          <div className=" h-[64px] rounded-sm bg-[#f5f5f5] mt-3 w-full xl:h-[96px]  ">
            <label htmlFor="payment" className=" hidden xl:block font-Inter text-[#121826] xl:mt-[8px] xl:font-normal xl:text-[14px]  xl:p-3 xl:leading-[21px]"> Enter Amount </label>
            <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]   p-2 leading-[18px]">You Pay</label>
            <div className="flex justify-between px-3 ">
              <input
              {...register("inputAmount")}
              type="text"
              placeholder="0.00"
              onChange={(e) => {setAmount1(e.target.value);setLastChanged('amount1');}}
              className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
              />
    
            <div className="relative ">
              <div
                className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px]  xl:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0  xl:ml-4 "
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              >
                <img
                  src={tvServices ? tvServices.find(option => option.abrv === selectedNetwork)?.icon : '/images/IBEDC_Circular.png'}
                  alt={selectedNetwork}
                  className=" size-6 mr-2 rounded-full"
                />
                <span>{selectedNetwork}</span>
                <HiChevronDown   className="size-6"/>  
              </div>
    
              {isNetworkDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  { tvServices && tvServices.length > 0 && tvServices.map((network) => (
                    <div
                      key={network.abrv}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectChange(network.abrv)}
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
    
          <div className=" flex justify-center  items-center m-5 ">
            <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
          </div>
    
          <div className=" h-[64px] rounded-sm bg-[#f5f5f5]  w-full xl:h-[96px] mt-5">
          <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5  xl:p-3  xl:leading-[21px]">You Pay</label>
          <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]  px-3 py-2  leading-[18px]">You Recieve</label>
    
            <div className="flex justify-between px-3   ">
              <input
                {...register("paymentAmount")}
                type="text"
                value={amount2}
                placeholder="0.00"
                onChange={(e) => {setAmount2(e.target.value);setLastChanged('amount2');}}
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
                    onClick={() => handleSelectedChange(payment.coin)}
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
