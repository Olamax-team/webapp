import axios from "axios";
import useTradeStore from "../../../stores/tradeStore";
import { HiOutlineClipboard } from "react-icons/hi";
import { Info, Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { cn, formatNigerianPhoneNumber, useConfirmCompleteTransaction } from "../../../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { buyInput, buyInputValues } from "../../formValidation/formValidation";
import useUserDetails from "../../../stores/userStore";
import React from "react";
import { useToast } from "../../../hooks/use-toast";
import { useCoinBlockChains } from "../../../hooks/useCoinBlockChains";
import { useMinimumTransaction } from "../../../hooks/useMinimumTransaction";

const BuyInput: React.FC = () => {
    
  const { user, kycStatus, fetchKycStatus, token } = useUserDetails();
  const { item, setTransactionId } = useTradeStore();

  const openConfirmCompleteTransaction = useConfirmCompleteTransaction();

  const [isLoading, setIsLoading] = React.useState(false);

  //clipboard paste function
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue("walletAddress", text, { shouldValidate: true });
      }
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  React.useEffect(() =>{
    if (user) {
      fetchKycStatus();
    }
  },[user]);
    
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    resolver: zodResolver(buyInput),
    defaultValues: {
      walletAddress: '',
      network: '',
      phoneNumber: kycStatus?.phone_number ? formatNigerianPhoneNumber(kycStatus.phone_number) : '',
      paymentMethod: 'bank'
    }
  });

  const { data: blockChains } = useCoinBlockChains(typeof item?.cryptoType_id === "number" ? item.cryptoType_id : 0);
  const { data: minTransaction } = useMinimumTransaction(item?.cryptoType_id ?? 0);

  const watchedNetwork = watch('network');
  const selectedBlockChainDetails = blockChains?.find((item) => item.blockchain_name === watchedNetwork);

  const minTransactionInNaira = minTransaction && typeof minTransaction.transaction_charges === "number" ? minTransaction.transaction_charges * parseFloat(minTransaction.buy_naira_value ?? "0") : 0

  const { toast } = useToast();

  const handleBuyInput = async (data:buyInputValues) => {

    const transactionData = {
      stable_coin_id: item?.fiatType_id,
      coin_token_id: item?.cryptoType_id,
      naira_amount: item?.fiatAmount,
      coin_amount: item?.cryptoAmount,
      wallet_address: data.walletAddress,
      blockchain_id: selectedBlockChainDetails?.id,
      transaction_type: 'transfer',
      transaction_charges: minTransaction ? (minTransaction.transaction_charges * parseFloat(minTransaction.buy_naira_value)) : 0,
      phone: data.phoneNumber,
    };

    const buyConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/start-buy',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: transactionData,
    };

    setIsLoading(true)
    await axios.request(buyConfig)
    .then((response) => {
      console.log(response)
      if (response && response.status === 201) {
        setTransactionId(response.data.transaction_id);
        setIsLoading(false)
        openConfirmCompleteTransaction.onOpen();
      }
    }).catch((error) => {
        if (error) {
          toast({
            title: 'Error',
            description: error.response.data.error || error.response.data.message,
            variant: 'destructive'
          })
          setIsLoading(false);
          console.log(error.response.data.error || error.response.data.message)
        }
      })
  };

  return(
    <div className="p-5 xl:py-6 flex flex-col xl:flex-row gap-10 h-auto w-full my-auto space-y-6 font-Inter">
      {/* Left Section - Transaction Form */}
      <div className="px-5 xl:px-6 xl:w-[50%]">
        <form  onSubmit={handleSubmit(handleBuyInput)}>
          <div className="mb-8 space-y-1">
            <h2 className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">Provide Transaction Details</h2>
            <p className="text-textDark font-medium xl:text-[14px] xl:leading-[21px]">Complete Transaction</p>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {/* Wallet Address Input */}
            <div className="flex px-4 justify-between bg-white rounded-md">
            <input
              type="text"
              placeholder="Your Wallet Address"
              {...register("walletAddress")}
              className="font-medium xl:text-[16px] xl:leading-[24px] w-full py-2 pr-10 text-textDark h-[60px] outline-none focus:outline-none"
            />
              <button type="button" onClick={pasteFromClipboard} className="text-textDark">
                <HiOutlineClipboard size={24}/>
              </button>
            </div>
            {errors.walletAddress && (
              <p className="text-red-500 text-sm -mt-4">{(errors.walletAddress as { message: string }).message}</p>
            )}

            {/* Network Selection */}
            <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
              <select
                {...register("network")}
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
            {errors.network && <p className="text-red-500 text-sm -mt-4">{(errors.network as {message: string}).message}</p>}

            {/* Phone Number Input */}
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
              <p className="text-red-500 text-sm -mt-4">{(errors.phoneNumber as {message: string}).message}</p>
            )}

            {/* Payment Method Selection */}
            <div className="space-y-8">
              <p className="font-bold xl:text-[26px] xl:leading-[39px] font-DMSans">
                Select Payment Method
              </p>
              <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center">
                <select
                  {...register("paymentMethod")}
                  className="w-full mt-3 bg-white font-medium xl:text-[16px] xl:leading-[24px] focus:outline-none outline-none focus:border-0"
                >
                  <option value="bank">Bank Transfer (Default)</option>
                  <option value="crypto">Crypto Wallet</option>
                </select>
              </div>
            </div>

            {/* Warning Message */}
            <div className="flex items-start justify-start space-x-3 mt-4">
              <span className="flex justify-start"><Info size={24} /></span>
              <p className="text-[#121826] font-normal font-Inter text-sm">Please verify the wallet address before proceeding, we would not be held responsible if the details provided are incorrect.</p>
            </div>

            {/* Proceed Button */}
            <div className="flex items-center justify-center ">
              <Button
                disabled={isLoading} 
              type="submit"
              className={cn("flex items-center gap-3 h-[38px] xl:h-[54px]  mt-4 bg-primary hover:bg-secondary text-sm lg:text-base font-semibold text-white py-2 rounded-lg", isLoading ? 'w-fit px-6 lg:px-10': 'xl:w-[150px] w-[96px]')}>
                {isLoading ? 'Proceeding...' : 'Proceed'}
                {isLoading && <Loader2 className="animate-spin lg:size-7 size-6"/>}
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
              item?.cryptoType
                    } Circular.png`} alt="Btc" className="w-10 h-10" />
            <p className="font-semibold xl:text-[18px] xl:leading-[27px]">{item?.cryptoType}</p>
          </div>

          <div className="mt-4 font-medium xl:text-[16px] xl:leading-[24px] space-y-3 text-textDark">
            <div className="flex justify-between border-t-2 py-6">
              <span>You Receive</span>
              <span className="font-semibold xl:text-[18px] xl:leading-[27px]">{item?.cryptoType} {item?.cryptoAmount}</span>
            </div>
            <div className="border-t-2 py-6 space-y-4">
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {item?.fiatAmount}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center justify-center space-x-2">
                  <span>Withdrawal Fee</span>
                  <span className="flex justify-center"><Info size={20} /></span>
                </div>
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {minTransactionInNaira}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg border-t-2 py-6">
              <span>Total</span>
              <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {(Number(item?.fiatAmount) || 0) + (minTransactionInNaira)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BuyInput;