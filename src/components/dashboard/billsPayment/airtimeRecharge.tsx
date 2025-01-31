import { useState } from "react";
import arrow from '../../../assets/images/arrows.svg'; 
import arrowIcon from '../../../assets/images/arrowdown.svg'; 
import mtnLogo from '../../../assets/images/MTN Circular.png'; // MTN logo
import gloLogo from '../../../assets/images/MTN Circular.png'; // GLO logo
import airtelLogo from '../../../assets/images/MTN Circular.png'; // Airtel logo
import nineMobileLogo from '../../../assets/images/MTN Circular.png'; // 9Mobile logo
// Arrow for the last div action
import btcLogo from '../../../assets/images/BTC Circular.png'
import ETHLogo from '../../../assets/images/ETH Circular.png'
import USDTLogo from '../../../assets/images/USDT Circular.png'
import SOLLogo from '../../../assets/images/SOL Circular.png'

const AirtimeRecharge = () => {
  const [selectedOption, setSelectedOption] = useState('Airtime');
  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const [selectPayment, setSelectPayment] = useState('BTC');
  const [airtimeAmount, setAirtimeAmount] = useState('');
  const [PaymentAmount, setPaymentAmount] = useState('');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChange = (network: string) => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false); // Close dropdown after selection
  };

  const handleSelectedChange = (payment: string) => {
    setSelectPayment(payment);
    setIsPaymentDropdownOpen(false); // Close dropdown after selection
  };

  const handleAirtimeAmountChange = (event: any) => {
    setAirtimeAmount(event.target.value);
  };

  const handleYouPayAmountChange = (event: any) => {
    setPaymentAmount(event.target.value);
  };

  const networkOptions = [
    { value: 'MTN', logo: mtnLogo },
    { value: 'GLO', logo: gloLogo },
    { value: 'Airtel', logo: airtelLogo },
    { value: '9Mobile', logo: nineMobileLogo },
  ];

  const paymentOptions = [
    { value: 'BTC', logo: btcLogo },
    { value: 'ETH', logo: ETHLogo },
    { value: 'USDT', logo: USDTLogo },
    { value: 'SOL', logo: SOLLogo },
  ];

  return (
    <div>
      
      <div className="flex bg-[#f5f5f5] w-full xl:-h-[60px] h-[48px] rounded-sm mt-5">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="block w-full px-1 py-2 text-[12px] xl:-text[16px] xl:leading-[24px] leading-[18px] font-medium text-[#121826] font-Inter bg-[#f5f5f5] border border-none rounded-sm shadow-sm focus:outline-none focus:ring-[#f5f5f5] focus:bg-[#f5f5f5]"
        >
          <option value="AIRTIME" className="bg-white   ">Airtime</option>
          <option value="DATA" className="bg-white ">Data</option>
        </select>

      </div>
      
      {/* mtn  */}
      <div className="w-full rounded-sm bg-[#f5f5f5f5] mt-3 xl:h-[96px] ">
        <label htmlFor="payment" className=" hidden xl:block font-Inter text-[#121826] xl:mt-[8px] xl:font-normal xl:text-[14px]   xl:p-3 xl:leading-[21px]"> Airtime Amount </label>
        <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]   p-3 leading-[18px]">You Pay</label>
        <div className="flex justify-between  p-3 ">
          <input
            type="text"
            value={airtimeAmount}
            onChange={handleAirtimeAmountChange}
            placeholder="0.00"
            className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
            />

          {/* Custom Network Select */}
          <div className="relative ">
            <div
                    className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826]   w-[100px] h-[25px] xl:w-[115px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0  xl:ml-4 "
                    onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
            >
              <img
                src={networkOptions.find(option => option.value === selectedNetwork)?.logo}
                alt={selectedNetwork}
                className="size-5 mr-1"
              />
              <span>{selectedNetwork}</span>
              <img src={arrow} alt="Arrow" className="ml-2 xl:size-4" /> {/* Arrow for the select dropdown */}
            </div>

            {isNetworkDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {networkOptions.map((network) => (
                  <div
                    key={network.value}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectChange(network.value)}
                  >
                    <img src={network.logo} alt={network.value} className="w-6 h-6 mr-2" />
                    <span>{network.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Last action arrow */}
      <div className=" flex justify-center  items-center m-3 ">
        <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
      </div>

      {/* for BTC payment option */}
      <div className="w-full rounded-sm bg-[#f5f5f5] xl:h-[96px] mt-3">
        <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5  xl:p-3 xl:leading-[21px]">You Pay</label>
        <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px]  ml-2 p-2 leading-[18px]">You Recieve</label>

        <div className="flex justify-between px-3">
          <input
            type="text"
            value={PaymentAmount}
            onChange={handleYouPayAmountChange}
            placeholder="0.00000145"
            className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
            />

          {/* Custom Network Select */}
          <div className="relative ">
            <div
                    className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121]   w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0   "
                    onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
            >
              <img
                src={paymentOptions.find(option => option.value === selectPayment)?.logo}
                alt={selectPayment}
                className="w-6 h-6 mr-2"
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
                    <img src={payment.logo} alt={payment.value} className="w-6 h-6 mr-2" />
                    <span>{payment.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirtimeRecharge
