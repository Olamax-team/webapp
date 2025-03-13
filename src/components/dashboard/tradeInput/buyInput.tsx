import React, { FormEvent, useState } from "react";
import useTradeStore from "../../../stores/tradeStore";
import { HiOutlineClipboard } from "react-icons/hi";
import { Info } from "lucide-react";
import { Button } from "../../ui/button";
import { useConfirmCompleteTransaction } from "../../../lib/utils";

const BuyInput: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [network, setNetwork] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Bank Transfer (Default)");
    
    const openConfirmCompleteTransaction = useConfirmCompleteTransaction();
    //clipboard paste function
    const pasteFromClipboard = async () => {
      const text = await navigator.clipboard.readText();
      setWalletAddress(text);
    };
    const handleBuyInput= (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      openConfirmCompleteTransaction.onOpen();
    }
    
    const networks = ["Bitcoin", "Ethereum", "Binance Smart Chain"]
    const tradeData = useTradeStore();

    var fee= 2000.00;
    return(
      <div className="p-5 xl:py-6 flex flex-col xl:flex-row gap-10 h-auto w-full my-auto space-y-6 font-Inter">
        {/* Left Section - Transaction Form */}
        <div className="px-5 xl:px-6 xl:w-[50%]">
          <form  onSubmit={handleBuyInput}>
            <div className="mb-8 space-y-1">
              <h2 className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">Provide Transaction Details</h2>
              <p className="text-textDark font-medium xl:text-[14px] xl:leading-[21px]">Complete Transaction</p>
            </div>

            <div className="mt-6 space-y-6">
              {/* Wallet Address Input */}
              <div className="flex px-4 justify-between bg-white rounded-md">
                <input
                  type="text"
                  placeholder="Your Wallet Address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none"
                />
                <button onClick={pasteFromClipboard} className="text-textDark">
                  <HiOutlineClipboard size={24}/>
                </button>
              </div>

              {/* Network Selection */}
              <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
                <select
                value={network}
                required
                onChange={(e) => setNetwork(e.target.value)}
                className="font-medium xl:text-[16px] xl:leading-[24px] w-full mt-3 rounded-md bg-white"
              >
                {networks.map((prop) => (
                <option key={prop} value={prop}>
                    {prop}
                </option>
                ))}
                </select>
              </div>

              {/* Phone Number Input */}
              <input
                type="tel"
                required
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="font-medium xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] outline-none"
              />

              {/* Payment Method Selection */}
              <div className="space-y-8">
                <p className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">Select Payment Method</p>
                <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
                  <select
                    value={paymentMethod}
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full mt-3 bg-white font-medium xl:text-[16px] xl:leading-[24px]"
                  >
                    <option value="bank">Bank Transfer (Default)</option>
                    <option value="crypto">Crypto Wallet</option>
                  </select>
                </div>
              </div>

              {/* Warning Message */}
              <div className="flex items-start justify-start space-x-3 mt-4">
                <span className="flex justify-start"><Info size={24} /></span>
                <p className="text-[#121826] font-normal font-Inter xl:text-[16px] xl:leading-[24px]">Please verify the wallet address before proceeding, we would not be held responsible if the details provided are incorrect.</p>
              </div>

              {/* Proceed Button */}
              <div className="flex items-center justify-center ">
                <Button 
                type="submit"
                onClick={() => {}}
                className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px]  mt-4 bg-primary hover:bg-secondary text-[16px] leading-[24px] font-semibold text-white py-2 rounded-lg">
                  Proceed
                </Button>
              </div>

            </div>
          </form>
        </div>

        {/* Right Section - Transaction Summary */}
        <div className="bg-white p-8 rounded-md w-full xl:w-[50%] h-fit font-Inter">
          <h2 className="xl:text-[18px] xl:leading-[27px] font-bold">Transaction Summary</h2>
          <div>
            <div className="mt-4 flex items-center space-x-2">
              <img src={`/images/${
                tradeData.item?.cryptoType
                      } Circular.png`} alt="Btc" className="w-10 h-10" />
              <p className="font-semibold xl:text-[18px] xl:leading-[27px]">{tradeData.item?.cryptoType}</p>
            </div>

            <div className="mt-4 font-medium xl:text-[16px] xl:leading-[24px] space-y-3 text-textDark">
              <div className="flex justify-between border-t-2 py-6">
                <span>You Receive</span>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">{tradeData.item?.cryptoType} {tradeData.item?.cryptoAmount}</span>
              </div>
              <div className="border-t-2 py-6 space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {tradeData.item?.fiatAmount}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Withdrawal Fee</span>
                    <span className="flex justify-center"><Info size={20} /></span>
                  </div>
                  <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {fee}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg border-t-2 py-6">
                <span>Total</span>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {(Number(tradeData.item?.fiatAmount) || 0) + fee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default BuyInput;