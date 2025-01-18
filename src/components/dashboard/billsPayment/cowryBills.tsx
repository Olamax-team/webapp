import { useState } from "react";
import arrow from '../../../assets/images/arrows.svg'; 
import arrowIcon from '../../../assets/images/arrowdown.svg'; 
import btcLogo from '../../../assets/images/BTC Circular.png'
import ETHLogo from '../../../assets/images/ETH Circular.png'
import USDTLogo from '../../../assets/images/USDT Circular.png'
import SOLLogo from '../../../assets/images/SOL Circular.png'
import IBEDC from '../../../assets/images/IBEDC Circular.png'

const CowryBills = () => {
  const [selectedOption, setSelectedOption] = useState('COWRY CARD');
  const [selectedNetwork, setSelectedNetwork] = useState('Lasg Cowry Card');
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
    { value: 'LASG COWRY CARD', logo: IBEDC },
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

  return (
    <div>
      
      <div className="flex bg-[#f5f5f5] w-[316px] lg:w-[440px] lg:-h-[60px] h-[48px] rounded-sm mt-5">
              <select
                value={selectedOption}
                onChange={handleChange}
                className="block w-[300px] lg:w-[400px] px-4 py-2 text-[12px] lg:text-[16px] lg:leading-[24px] leading-[18px] font-medium text-[#121826] font-Inter bg-[#f5f5f5] border border-none rounded-sm shadow-sm focus:outline-none   focus:ring-[#f5f5f5]  focus:bg-[#f5f5f5]"
              >
                <option value="COWRY CARD" className="bg-white"> Cowry Card</option>
                <option value="AIRTIME" className="bg-white">Airtime</option>
              </select>
            </div>



                    {/* mtn  */}
                    <div className="w-[316px] h-[64px] rounded-sm bg-[#f5f5f5f5] mt-3 lg:w-[440px] lg:h-[96px] ">
              <label htmlFor="payment" className=" hidden lg:block font-Inter text-[#121826] lg:mt-[8px] lg:font-normal lg:text-[14px]  lg:ml-2 lg:p-3 lg:leading-[21px]"> Enter Amount </label>
              <label htmlFor="payment" className=" block lg:hidden  text-[#121826] font-Inter text-[12px] mt-8 ml-2 p-2 leading-[18px]">You Pay</label>
              <div className="flex justify-between  ">
                <input
                  type="text"
                  value={airtimeAmount}
                  onChange={handleAirtimeAmountChange}
                  placeholder="0.00"
                  className="lg:w-[143px] w-[143px]  h-[27px] leading-[27px] ml-4 mt-0 text-[18px]   lg:h-[35px] lg:ml-5 lg:text-[23px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter lg:leading-[34.5px]"
                />

                 

                {/* Custom electricity Select */}
                <div className="relative ">
                  <div
                    className="cursor-pointer  mr-4 bg-[#f5f5f5] lg:text-[16px] text-[13px] leading-[19.5px] text-[#212121]   w-[150px] h-[25px] lg:w-[180px] lg:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0  lg:ml-4 "
                    onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                  >
                    <img
                      src={networkOptions.find(option => option.value === selectedNetwork)?.logo}
                      alt={selectedNetwork}
                      className="w-6 h-6 mr-1"
                    />
                    <span>{selectedNetwork}</span>
                    <img src={arrow} alt="Arrow" className="ml-2 lg:w-[16px] lg:h-[16px] " /> {/* Arrow for the select dropdown */}
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
              <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
            </div>

            {/* for ibedc payment option */}
            <div className="w-[316px] h-[64px] rounded-sm bg-[#f5f5f5]  lg:w-[440px] lg:h-[96px] mt-3">
              <label htmlFor="payment" className="hidden lg:block font-Inter text-[#121826] lg:font-normal lg:text-[14px] lg:mt-5 lg:ml-2 lg:p-3 lg:leading-[21px]">You Pay</label>
              <label htmlFor="payment" className=" block lg:hidden  text-[#121826] font-Inter text-[12px]  ml-2 p-2 leading-[18px]">You Recieve</label>

              <div className="flex justify-between   ">
                <input
                  type="text"
                  value={PaymentAmount}
                  onChange={handleYouPayAmountChange}
                  placeholder="0.00"
                  className="lg:w-[143px] w-[143px] h-[27px] text-[18px] ml-5 lg:h-[35px] lg:ml-5 lg:text-[23px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter leading-[27px] lg:leading-[34.5px]"
                />

                {/* Custom ibedc Select */}
                <div className="relative ">
                  <div
                    className="cursor-pointer  mr-4 bg-[#f5f5f5] lg:text-[16px] text-[13px] leading-[19.5px] text-[#212121]   w-[80px] h-[25px] lg:w-[150px] lg:h-[32px] border border-none rounded-sm flex items-center justify-center  focus:outline-none focus:ring-0  lg:ml-4 "
                    onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                  >
                    <img
                      src={paymentOptions.find(option => option.value === selectPayment)?.logo}
                      alt={selectPayment}
                      className="w-6 h-6 mr-2"
                    />
                    <span>{selectPayment}</span>
                    <img src={arrow} alt="Arrow" className="ml-2 lg:w-[16px] lg:h-[16px]" /> {/* Arrow for the select dropdown */}
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

export default CowryBills