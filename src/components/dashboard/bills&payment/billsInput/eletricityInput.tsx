import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billSchemaValues, billsSchema } from "../../../formValidation/formValidation";
import useBillsStore from "../../../../stores/billsStore";
import { formatNigerianPhoneNumber, removeEmptyKeys, useConfirmModal } from "../../../../lib/utils";
import { Info, Loader2 } from "lucide-react";
import useUserDetails from "../../../../stores/userStore";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiConfig } from "../../../../hooks/api";
import axios, { AxiosError } from "axios";
import { useToast } from "../../../../hooks/use-toast";
import useTradeStore from "../../../../stores/tradeStore";
import { HiArrowRight } from "react-icons/hi2";
import { useCoinBlockChains } from "../../../../hooks/useCoinBlockChains";


const ElectricityInput = () => {

    const { item } = useBillsStore();
    const { setAccountDetails, setTransactionId, setIsBill, setCryptoTradeDetails } = useTradeStore();

    const [userIsValid, setUserIsValid] = React.useState(false);
    const [isValidating, setIsValidating] = React.useState(false);

    const {onOpen}  = useConfirmModal();

    const { toast } = useToast();
        const { user, fetchKycStatus, kycStatus, token } = useUserDetails();
        
        React.useEffect(() => {
            if (user) {
                fetchKycStatus();
            };
        }, [user])


    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<billSchemaValues>({
        resolver: zodResolver(billsSchema),
        defaultValues: {
            phoneNumber: kycStatus?.phone_number ? formatNigerianPhoneNumber(kycStatus.phone_number) : '',
            billType: '',
            meterNumber: ''
        }
    });

    const meterNumber = watch('meterNumber');
    const block_chain = watch('blockChain');

    const { data:blockChains } = useCoinBlockChains(typeof item?.coin_token_id === "number" ? item.coin_token_id : 0);
    const selectedChain = blockChains?.find((item) => item.blockchain_name === block_chain);

    const electricTypeConfig = useApiConfig({
        method: 'get',
        url: 'get-electricity-type'
    });

    const validateCustomerConfig = useApiConfig({
        method: 'post',
        url: 'validate-customer',
        formdata: {
            amount: item ? item.naira_amount : 0,
            cable_prepaid_number: meterNumber,
            bill: item ? item.bills : ''
        }
    });

    const fetchElectricType = async (): Promise<{ type: string }[]> => {
        const response = await axios.request(electricTypeConfig);
        if (response.status !== 200) {
            throw new Error('Something went wrong, try again later');
        }
        return response.data.electricity_type as { type: string }[];
    };

    const { data:electicTypes } = useQuery<Array<{ type: string }>>({
        queryKey: ['electric-types'],
        queryFn: fetchElectricType,
    });

    const checkUser = async () => {

        if (meterNumber === '' || meterNumber === undefined) {
           setError('meterNumber', {type: 'manual', message: 'Meter number is required for validation'});
           return;
        };

        setIsValidating(true);
        await axios.request(validateCustomerConfig).then((response) => {
            if (response.status !== 200) {
                setIsValidating(false);
                throw new Error('Something went wrong, try again later');
            };

            if (response.status === 200) {
                setIsValidating(false)
                setUserIsValid(true);
            };
        }).catch((error) => {
            console.error(error);
            if (AxiosError) {
                setIsValidating(false);
                toast({
                    title: 'Error',
                    description: error.response.data.message,
                    variant: 'destructive'
                })
                return;
            }
        });
    }

    const onSubmit = async (data:billSchemaValues) => {

        if (userIsValid) {
            const newData = {
                transaction_type: item?.transaction_type,
                naira_amount: item?.naira_amount,
                coin_token_id: item?.coin_token_id,
                blockchain_id: selectedChain?.id,
                coin_amount: item?.coin_amount,
                bills: item?.bills,
                network: item?.network,
                package_product_number: item?.package_product_number,
                phone_number: data.phoneNumber,
                meter_number: data.meterNumber,
                current_rate: item?.current_rate,
                electricity_type: data.billType
            };
    
            
            if (item?.transaction_type === 'crypto' && newData.blockchain_id === undefined) {
                setError('blockChain', {type: 'manual', message: 'Select a blockchain'})
                return;
            };
            
            const finalData = removeEmptyKeys(newData)
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `https://api.olamax.io/api/start-bill-subscription`,
                headers: {
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: finalData,
            };
    
            await axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    setTransactionId(response.data.transaction_id);
                    { item?.transaction_type === 'fiat' ? 
                        setAccountDetails(response.data.transaction_details.data) :
                        setCryptoTradeDetails(response.data.transaction_details)
                    }
                    setIsBill(true);
                    onOpen();
                }
            }).catch((error) => {
                if (error) {
                    toast({
                        title: 'Error',
                        description: error.response.data.message,
                        variant: 'destructive'
                    });
                }
            });
        };

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="xl:flex h-auto gap-10 w-full">
            <div className="xl:w-[50%] w-full p-5 xl:pt-6">
                <div className="mt-2">
                    <h2 className="font-bold font-Inter xl:font-DMSans text-[18px] leading-[30px] xl:text-[22px] xl:leading-[39px] text-[#121826]">
                        Provide Transaction Details
                    </h2>
                    <p className="font-medium text-[14px] xl:text-[18px] leading-[21px]">
                        Complete Transaction
                    </p>
                </div>
                { item && item.transaction_type === 'crypto' &&
                  <React.Fragment>
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
                  </React.Fragment>
                }
                <div className="w-full px-4 py-2 rounded-md bg-white h-[60px] justify-center mt-5">
                    <select
                        id="electricity-bill"
                        {...register("billType")} 
                        className="font-medium xl:text-[16px] xl:leading-[24px] w-full mt-3 rounded-md bg-white focus:outline-none outline-none focus:border-0 uppercase"
                    >
                        <option value="" className="text-sm uppercase">Select Bill Type</option>
                        { electicTypes && electicTypes?.length > 0 && electicTypes.map((prop, index) => (
                        <option key={index} value={prop.type} className="uppercase text-sm">
                            {prop.type}
                        </option>
                        ))}
                    </select>
                    {errors.billType && (
                        <p className="text-red-500 text-sm mt-1"> {(errors.billType as { message: string }).message}</p>
                        )}
                </div>

                <div className="w-full xl:h-[60px] h-[48px] rounded-sm mt-6 bg-[#f5f5f5]">
                        <input
                        type="text" 
                        placeholder="Your Phone Number"
                            maxLength={15}
                            minLength={10}  
                                                    
                        className="w-full h-[60px] px-3 py-2 text-[12px] xl:text-[16px] xl:leading-[24px] leading-[18px] font-medium text-[#121826] font-Inter bg-white border border-none rounded-sm shadow-sm focus:ring-[#f5f5f5] focus:bg-[#f5f5f5]"
                        {...register("phoneNumber", {
                        })}
                        />
                        {errors.phoneNumber && (<p className="text-red-500 text-sm mt-1"> {(errors.phoneNumber as { message: string }).message}</p>)}
                </div>

                <div className="w-full xl:h-[60px] h-[48px] mt-5 rounded-sm xl:mt-5 bg-[#f5f5f5] ">
                    <div className="w-full flex gap-2 h-full">
                        <input
                            type="text"
                            placeholder="Enter your meter number"
                            maxLength={11}
                            minLength={10}
                        
                            className="flex-1 xl:h-[60px] h-[48px] px-3 py-2 text-[12px] xl:text-[16px] xl:leading-[24px] leading-[18px] font-medium text-[#121826] font-Inter bg-white border border-none rounded-sm shadow-sm    focus:ring-[#f5f5f5]  focus:bg-[#f5f5f5]"
                            {...register("meterNumber")} 
                        />
                        <button type="button" className="aspect-square flex-none h-full rounded-md bg-white flex items-center justify-center" onClick={checkUser} disabled={isValidating}>
                            {isValidating ? <Loader2 className="lg:size-7 animate-spin"/> : <HiArrowRight className="lg:size-7"/>}
                        </button>
                    </div>

                       {errors.meterNumber && (<p className="text-red-500 text-sm mt-1"> {(errors.meterNumber as { message: string }).message} </p>
                    )}
                </div>

                    {/* <div className="mt-12 xl:mt-6 font-poppins text-[#000000] text-[16px] leading-[24px]">
                        <h3>Tosin Adebayor</h3>
                    </div> */}


                    <div className="mt-12 xl:mt12 flex item-center gap-2">
                        <Info  className="size-6" />
                        <p className="w-full  font-small text-[14px] xl:text-[16px] leading-[24px]">
                            Please verify the information provided before proceeding, we would not be held responsible if the details provided are incorrect.
                        </p>
                    </div>
                    { userIsValid &&
                        <div className="mt-16 flex items-center justify-center">
                            <button
                                type="submit"
                                className="lg:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter lg:h-[54px] lg:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]"
                            >
                                Proceed
                            </button>
                        </div>
                    }
            </div>

            <div className="bg-[#ffffff] rounded-md xl:w-[50%] w-full xl:h-[520px] h-auto mt-10 xl:mt-0 p-5 flex flex-col ">
                  <h2 className="font-bold font-inter text-[14px] xl:text-[18px] leading-[27px]">
                       Transaction Summary
                </h2>


                <div className="mt-5">
                  <div className="text-sm text-[#212121]  p-4 space-y-4">
                        <div className="space-y-2  mt-3">
                            <p className="font-medium text-[16px] leading-[24px]">{item?.selectedNetwork}</p>
                        </div>

                        <div className="flex justify-between w-full  font-Inter  border-t-2 border-[#0000001A] mt-3 py-5">
                            <p className="font-medium text-[16px] leading-[24px] text-[#121826]">You Recieve</p>
                            <strong>{item?.inputAmount}</strong>
                        </div>
                      <div className="border-t-2 border-[#0000001A] mt-3">
                                <div className="flex justify-between w-full font-Inter py-5">
                                    <p className="font-medium text-[16px] leading-[24px] text-[#121826]">Price</p>
                                    <strong>{item?.selectPayment || item?.fiatPayment} {item?.paymentAmount}</strong>
                                </div>

                                <div className="flex justify-between w-full font-Inter py-5 ">
                                    <p className="font-medium text-[16px] leading-[24px] text-[#121826] flex items-center gap-2">Withdrawal Fee <Info className="size-6" />
                                    </p>
                                    <p className="font-bold">__</p>
                                </div>
                        </div>

                        <div className="border-t-2 border-[#0000001A] flex justify-between w-full font-Inter mt-3 py-5">
                            <p className="font-medium text-[16px] leading-[24px] text-[#121826]">Total</p>
                            <strong>{item?.selectPayment || item?.fiatPayment} {item?.paymentAmount}</strong>
                        </div>
                    </div>

                </div>
            </div>

          </div>
     </form>

    );
};

export default ElectricityInput;
