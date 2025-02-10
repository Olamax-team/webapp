import {useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formValidationSchema } from "../../../formValidation/formValidation";
import arrow from '../../../../assets/images/arrows.svg'; 
import arrowIcon from '../../../../assets/images/arrowdown.svg'; 
import btcLogo from '../../../../assets/images/BTC Circular.png'
import ETHLogo from '../../../../assets/images/ETH Circular.png'
import USDTLogo from '../../../../assets/images/USDT Circular.png'
import SOLLogo from '../../../../assets/images/SOL Circular.png'
import IBEDC from '../../../../assets/images/IBEDC Circular.png'
import useBillsStore from "../../../../stores/billsStore";
import { zodResolver } from "@hookform/resolvers/zod";
   

type Inputs = {
  inputAmount: string;
  paymentAmount: string;
  selectedPayment: string;
  selectedNetwork:string;
};

type cowryProps = {
  setSelectedBill: React.Dispatch<React.SetStateAction<string>>;
  setShowTransactionDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const CowryBills = ({setShowTransactionDetail,setSelectedBill}:cowryProps) => {
  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>({
    resolver: zodResolver(formValidationSchema), 
    defaultValues:{
      inputAmount:"",
    paymentAmount: "",
    }
  }); 
  const [selectedNetwork, setSelectedNetwork] = useState('Lsag cowry');
  const [selectPayment, setSelectPayment] = useState('BTC');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const cowryDetails = useBillsStore();


  


  const handleSelectChange = (network: string) => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false); 
  };

  const handleSelectedChange = (payment: string) => {
    setSelectPayment(payment);
    setIsPaymentDropdownOpen(false); 
  };


  const networkOptions = [
    { value: 'LSAG', logo: IBEDC },
    { value: 'IBEDC', logo: IBEDC },
    { value: 'IBEDC', logo: IBEDC },
    { value: 'IBEDC', logo: IBEDC },
  ];

  const paymentOptions = [
    { value: 'BTC', logo: btcLogo },
    { value: 'ETH', logo: ETHLogo },
    { value: 'USDT', logo: USDTLogo },
    { value: 'SOL', logo: SOLLogo },
  ];

  const onSubmit: SubmitHandler<Inputs> = data => {

   const regdata = {...data, selectPayment:selectPayment, selectedNetwork:selectedNetwork}
  
   setShowTransactionDetail(true); 
   setSelectedBill('cowry')
   cowryDetails.setItem(regdata);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      
      <div className="flex bg-[#f5f5f5] w-full xl:-h-[60px] h-[48px] rounded-sm mt-5">
         <h3 className="px-3 py-2" >Cowry Card</h3>
       </div>


             <div className=" h-[64px] rounded-sm bg-[#f5f5f5] mt-3 w-full xl:h-[96px]  ">
                    <label htmlFor="payment" className=" hidden xl:block font-Inter text-[#121826] xl:mt-[8px] xl:font-normal xl:text-[14px]  xl:p-3 xl:leading-[21px]"> Enter Amount </label>
                   
                   <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]   p-2 leading-[18px]">You Pay</label>
                  
             <div className="flex justify-between px-3 ">
               <input
                   {...register("inputAmount")}
                  type="text"
                  placeholder="0.00"
                  className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                  />


                <div className="relative ">
                  <div
                    className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[12px] leading-[19.5px] text-[#212121]    w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0   "
                    onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                  >
                    <img
                      src={networkOptions.find(option => option.value === selectedNetwork)?.logo}
                      alt={selectedNetwork}
                      className="size-6 mr-1"
                    />
                    <span>{selectedNetwork}</span>
                    <img src={arrow} alt="Arrow" className="size-3 ml-2" /> {/* Arrow for the select dropdown */}
                  </div>

                  {isNetworkDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {networkOptions.map((network) => (
                        <div
                          key={network.value}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectChange(network.value)}
                        >
                          <img src={network.logo} alt={network.value} className=" size-6 mr-2" />
                          <span>{network.value}</span>
                        </div>
                      ))}
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
                <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]   p-2 leading-[18px]">You Recieve</label>

               <div className="flex justify-between px-3">
                <input
                  {...register("paymentAmount")}
                  type="text"
                  placeholder="0.00"
                  className="xl:w-[143px] w-[100px] h-[25px] text-[16px]  xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter leading-[27px] xl:leading-[34.5px]"
                />

                <div className="relative ">
                  <div
                    className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121]   w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0   "
                    onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                  >
                    <img
                      src={paymentOptions.find(option => option.value === selectPayment)?.logo}
                      alt={selectPayment}
                      className=" size-6 mr-2"
                    />
                    <span>{selectPayment}</span>
                    <img src={arrow} alt="Arrow" className="ml-2 xl:w-[16px] xl:h-[16px]" /> {/* Arrow for the select dropdown */}
                  </div>

                  {isPaymentDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {paymentOptions.map((payment) => (
                        <div
                          key={payment.value}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectedChange(payment.value)}
                        >
                          <img src={payment.logo} alt={payment.value} className=" size-6 mr-2" />
                          <span>{payment.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {errors.paymentAmount && <p className="text-red-500 text-xs">{errors.paymentAmount?.message}</p>}
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

export default CowryBills;
