import axios from "axios";
import useTradeStore from "../../../stores/tradeStore";
import { HiOutlineClipboard } from "react-icons/hi";
import { Info } from "lucide-react";
import { Button } from "../../ui/button";
import { useConfirmCompleteTransaction } from "../../../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { buyInput, buyInputValues } from "../../formValidation/formValidation";
import useUserDetails from "../../../stores/userStore";
import React from "react";
import { useApiConfig } from "../../../hooks/api";


type blockChain = {
  blockchain_name: string;
  coin_id: number;
  created_at: string;
  id: string;
  updated_at: string;
};

type coinType = {
  id: number,
  coin_name: string;
  shorthand: string;
  buy: string;
  sell: string;
  escrow: string;
  status: string;
  stable_coins: string;
  created_at: string;
  updated_at: string;
};

type limitType = {
  buying_limit: string;
  selling_limit: string;
  card_limit: string;
  data_limit: string;
  card_limit_active: number;
  data_limit_active: number;
}

type minTransaction = {
  status: string;
  message: string;
  coin: coinType;
  limit: limitType;
  current_rate: number;
  transaction_charges: number;
  sell_naira_value: string;
  buy_naira_value: string;
  icon: string;
}

const BuyInput: React.FC = () => {
    
  const { user, kycStatus, fetchKycStatus, token } = useUserDetails();
  const { item, setTransactionId } = useTradeStore();

  const [blockChains, setBlockChains] = React.useState<blockChain[]>([]);
  const [minTransaction, setMinTransaction] = React.useState<minTransaction>();

  const openConfirmCompleteTransaction = useConfirmCompleteTransaction();

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
    
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(buyInput),
    defaultValues: {
      walletAddress: '',
      network: '',
      phoneNumber: kycStatus?.phone_number || '',
      paymentMethod: 'bank'
    }
  });

  const getBlockChain = useApiConfig({
    method: 'get',
    url: 'blockchains'
  });

  const fetchBlockChain = async () => {
    await axios.request( getBlockChain)
    .then((response) => {
      setBlockChains(response.data)
    })
  };

  const getTransactionConfig = useApiConfig({
    method: 'get',
    url: `min-transaction/${item?.cryptoType_id}`
  });

  const fetchMinTransaction = async () => {
    await axios.request( getTransactionConfig)
    .then((response) => {
      setMinTransaction(response.data)
    })
  };

  React.useEffect(() =>{
    fetchBlockChain();
    fetchMinTransaction();
  },[]);

  const formatPhoneNumber = (phoneNumber:string) => {
    const tenDigits = phoneNumber?.slice(4, 14)
    return `0${tenDigits}`;
  };

  const watchedNetwork = watch('network');
  const selectedBlockChainDetails = blockChains.find((item) => item.blockchain_name === watchedNetwork);

  const handleBuyInput = async (data:buyInputValues) => {

    const transactionData = {
      stable_coin_id: item?.fiatType_id,
      coin_token_id: item?.cryptoType_id,
      naira_amount: item?.fiatAmount,
      coin_amount: item?.cryptoAmount,
      wallet_address: data.walletAddress,
      blockchain_id: selectedBlockChainDetails?.id,
      transaction_type: 'transfer',
      transaction_charges: minTransaction ? minTransaction.transaction_charges : 0,
      phone: formatPhoneNumber(data.phoneNumber),
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

    await axios.request(buyConfig)
    .then((response) => {
      setTransactionId(response.data.transaction_id);
    });

    openConfirmCompleteTransaction.onOpen();
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

          <div className="mt-6 space-y-6">
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
              <p className="text-red-500">{(errors.walletAddress as { message: string }).message}</p>
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
            {errors.network && <p className="text-red-500 text-sm">{(errors.network as {message: string}).message}</p>}



            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder="Your Phone Number"
              {...register("phoneNumber")}
              className="font-medium xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{(errors.phoneNumber as {message: string}).message}</p>
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
                <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {minTransaction?.transaction_charges}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg border-t-2 py-6">
              <span>Total</span>
              <span className="font-semibold xl:text-[18px] xl:leading-[27px]">NGN {(Number(item?.fiatAmount) || 0) + (minTransaction?.transaction_charges || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BuyInput;