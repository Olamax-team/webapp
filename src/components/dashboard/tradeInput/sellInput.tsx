import React, { useEffect } from "react";
import useTradeStore from "../../../stores/tradeStore";
import { Info } from "lucide-react";
import { Button } from "../../ui/button";
import { formatNigerianPhoneNumber, useConfirmCompleteTransaction } from "../../../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sellInput, sellInputValues } from "../../formValidation/formValidation";
import useUserDetails from "../../../stores/userStore";
import { useApiConfig } from "../../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "../../../stores/fetch-store";
import { useToast } from "../../../hooks/use-toast";

const SellInput: React.FC = () => {

    const { user, kycStatus, fetchKycStatus, token } = useUserDetails();
    const { fetchCoinBlockChain } = useFetchStore();
    const openConfirmCompleteTransaction = useConfirmCompleteTransaction();
    const tradeData = useTradeStore();

    const { toast } = useToast();

    useEffect(() =>{
      if (user) {
        fetchKycStatus();
      }
    },[user]);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(sellInput),
      defaultValues: {
        bankName: "",
        accountNumber: "",
        accountName: "",
        phoneNumber: kycStatus?.phone_number ? formatNigerianPhoneNumber(kycStatus.phone_number) : '',
        blockChain: ""
      },
    });


    const bankListConfig = useApiConfig({
      method: 'get',
      url: 'get-bank-list'
    });

  
    const fetchBankList = async () => {
      const response = await axios.request(bankListConfig);
      if (response.status !== 200) {
        throw new Error('Something went wrong, try again later');
      };
      const data = response.data.bank_list as {bank:string}[];
      return data;
    };


    const { data:bankNames } = useQuery({
      queryKey: ['bank-list'],
      queryFn: fetchBankList
    });


    const { data:blockChains } = useQuery({
      queryKey: ['block-chains', tradeData.item?.cryptoType_id],
      queryFn: () => tradeData.item?.fiatType_id? fetchCoinBlockChain(tradeData.item.fiatType_id) : Promise.reject('coin token id is undefined')
    });
  

    const handleSellInput= async (data: sellInputValues) => {

      const newData = {
        coin_shorthand: tradeData.item?.cryptoType.toLowerCase(),
        naira_value: parseFloat(tradeData.item?.fiatAmount ?? "0"),
        amount: parseFloat(tradeData.item?.cryptoAmount ?? "0"),
        bank_type: data.bankName,
        account_number: data.accountNumber,
        account_name: data.accountName,
        phone_number: data.phoneNumber,
        coin_network: data.blockChain
      };
  
      const startTransactionConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.olamax.io/api/start-selling-transaction`,
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: newData
      }
  
      await axios.request(startTransactionConfig)
      .then((response) => {
        if (response.status === 201) {
          tradeData.setSellDetails(response.data);
          tradeData.setCoinNetwork(data.blockChain);
          openConfirmCompleteTransaction.onOpen();
        };
      }).catch((error) => {
        if (error) {
          toast({
            title: 'Error',
            description: error.response.data.error || error.response.data.message,
            variant: 'destructive'
          })
          console.log(error.response.data.error || error.response.data.message)
        }
      })
    }

    const fee= 0;
    return(
      <div className="p-5 xl:py-6 flex flex-col xl:flex-row gap-10 h-auto w-full my-auto space-y-6 font-Inter">
        {/* Left Section - Transaction Form */}
        <div className="xl:order-1 order-2 px-5 xl:px-6 xl:w-[50%]">
            <form  onSubmit={handleSubmit(handleSellInput)}>
                <div className="mb-8 space-y-1">
                    <h2 className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">Provide Transaction Details</h2>
                    <p className="text-textDark font-medium xl:text-[14px] xl:leading-[21px]">Complete Transaction</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center mt-6">
                        <select
                            {...register("blockChain")}
                            className="font-medium xl:text-[16px] xl:leading-[24px] w-full mt-3 rounded-md bg-white focus:outline-none outline-none focus:border-0 uppercase"
                        >
                            <option value="" className="text-sm uppercase">Select Blockchain</option>
                            { blockChains && blockChains.length > 0 && blockChains.map((prop) => (
                            <option key={prop.id} value={prop.blockchain_name} className="uppercase text-sm">
                                {prop.blockchain_name}
                            </option>
                            ))}
                        </select>
                    </div>
                    {errors.blockChain && (<p className="text-red-500 text-sm mt-1"> {(errors.blockChain as { message: string }).message} </p>)}
                  </div>

                  {/* bankName Selection */}
                  <div>
                    <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
                      <select
                      {...register ("bankName")}
                      className="font-medium xl:text-[16px] xl:leading-[24px] w-full mt-3 rounded-md bg-white p-1 outline-none focus:outline-none"
                      >
                      <option value="">Select Bank</option>
                      {bankNames && bankNames.length > 0 && bankNames.map((prop) => (
                      <option key={prop.bank} value={prop.bank}>
                          {prop.bank}
                      </option>
                      ))}
                      </select>
                    </div>
                    {errors.bankName && <p className="text-red-500 text-sm mt-1">{(errors.bankName as {message: string}).message}</p>}
                  </div>

                    {/* Account Number Input */}
                    <div>
                      <div className="flex px-4 justify-between bg-white rounded-md">
                      <input
                          type="text"
                          placeholder="Bank Account Number"
                          {...register ("accountNumber")}
                          className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none"
                      />
                      </div>
                      {errors.accountNumber && (
                        <p className="text-red-500 text-sm mt-1">{(errors.accountNumber as {message: string}).message}</p>
                      )}
                    </div>

                    {/* Account Name Input */}
                    <div>
                      <div className="flex px-4 justify-between bg-white rounded-md">
                      <input
                          type="text"                            
                          placeholder="Account Name"
                          {...register ("accountName")}
                          className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none"
                      />
                      </div>
                      {errors.accountName && (
                        <p className="text-red-500 text-sm mt-1">{(errors.accountName as {message: string}).message}</p>
                      )}

                    </div>

                    {/* Phone Number Input */}
                    <div>
                      <div className="flex px-4 justify-center bg-white rounded-md">
                        <span className="flex items-center justify-center item-center w-fit font-medium xl:text-[16px] xl:leading-[24px] px-4 py-2 rounded-md h-[60px] outline-none">+234</span>
                        <input
                          type="tel"
                          placeholder="Your Phone Number"
                          {...register("phoneNumber")}
                          className="font-medium xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] outline-none"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{(errors.phoneNumber as {message: string}).message}</p>
                      )}
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
                    className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px]  mt-4 bg-primary hover:bg-secondary text-[16px] leading-[24px] font-semibold text-white py-2 rounded-lg">
                        Proceed
                    </Button>
                    </div>
                </div>
            </form>
        </div>

        {/* Right Section - Transaction Summary */}
        <div className="xl:order-2 order-1 bg-white p-8 rounded-md w-full xl:w-[50%] h-fit font-Inter">
          <h2 className="xl:text-[18px] xl:leading-[27px] font-bold">Transaction Summary</h2>
          <div>
            <div className="mt-4 flex items-center space-x-2">
              <img src={`/images/${
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