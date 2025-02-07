import React, { FormEvent, useState } from "react";
import useTradeStore from "../../../stores/tradeStore";
import { Info } from "lucide-react";
import { Button } from "../../ui/button";
import { useSellConfirmCompleteTransaction } from "../../../lib/utils";

const SellInput: React.FC = () => {
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [bankName, setBankName] = useState("Your Bank");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const openSellConfirmCompleteTransaction = useSellConfirmCompleteTransaction();
    const bankNames = ["UBA", "GTB", "First Bank", "Kuda MFB"]
    const tradeData = useTradeStore();

    const handleSellInput= (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    var fee= 0;
    return(
      <div className="p-5 xl:py-6 flex flex-col xl:flex-row gap-10 h-auto w-full my-auto space-y-6 font-Inter">
        {/* Left Section - Transaction Form */}
            <div className="px-5 xl:px-6 xl:w-[50%]">
                <form  onSubmit={handleSellInput}>
                    <div className="mb-8 space-y-1">
                        <h2 className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">Provide Transaction Details</h2>
                        <p className="text-textDark font-medium xl:text-[14px] xl:leading-[21px]">Complete Transaction</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        {/* bankName Selection */}
                        <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
                        <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="font-medium xl:text-[16px] xl:leading-[24px] w-full mt-3 rounded-md bg-white"
                        >
                        {bankNames.map((prop) => (
                        <option key={prop} value={prop}>
                            {prop}
                        </option>
                        ))}
                        </select>
                        </div>

                        {/* Account Number Input */}
                        <div className="flex px-4 justify-between bg-white rounded-md">
                        <input
                            type="text"
                            placeholder="Bank Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none"
                        />
                        </div>

                        {/* Account Name Input */}
                        <div className="flex px-4 justify-between bg-white rounded-md">
                        <input
                            type="text"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none"
                        />
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex px-4 justify-between bg-white rounded-md">
                            <input
                            type="tel"
                            placeholder="Your Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="font-medium xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] outline-none"
                            />
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
                        onClick={() => {openSellConfirmCompleteTransaction.onOpen();}}
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
              <img src={`../../../src/assets/images/${
                tradeData.item?.fiatType
                      } Circular.png`} alt="NGN" className="w-10 h-10" />
              <p className="font-semibold xl:text-[18px] xl:leading-[27px]">Naira</p>
            </div>

            <div className="mt-4 font-medium xl:text-[16px] xl:leading-[24px] space-y-3 text-textDark">
              <div className="flex justify-between border-t-2 py-6">
                <span>You Receive</span>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">{tradeData.item?.fiatType} {tradeData.item?.fiatAmount}</span>
              </div>
              <div className="border-t-2 py-6 space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold xl:text-[18px] xl:leading-[27px]">{tradeData.item?.cryptoType} {tradeData.item?.cryptoAmount}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Withdrawal Fee</span>
                    <span className="flex justify-center"><Info size={20} /></span>
                  </div>
                  <span className="font-semibold xl:text-[18px] xl:leading-[27px]"> {fee}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg border-t-2 py-6">
                <span>Total</span>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">{tradeData.item?.cryptoType} {(Number(tradeData.item?.cryptoAmount) || 0) + fee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default SellInput;