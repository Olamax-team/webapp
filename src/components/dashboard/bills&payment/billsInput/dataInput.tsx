import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { numberSchema, numberSchemaValues } from "../../../formValidation/formValidation";
import useBillsStore from "../../../../stores/billsStore";
import { formatNigerianPhoneNumber, removeEmptyKeys, useConfirmModal } from "../../../../lib/utils";
import { Info } from "lucide-react";
import useUserDetails from "../../../../stores/userStore";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetchStore } from "../../../../stores/fetch-store";
import axios from "axios";
import useTradeStore from "../../../../stores/tradeStore";
import { useToast } from "../../../../hooks/use-toast";

const DataInput = () => {
    const {item } = useBillsStore();
    const { setTransactionId, setAccountDetails, setIsBill} = useTradeStore();
    const {onOpen}  = useConfirmModal();
    const { toast } = useToast();
    
    const { user, fetchKycStatus, kycStatus, token } = useUserDetails();
    const { fetchCoinBlockChain } = useFetchStore();
    
    React.useEffect(() => {
        if (user) {
            fetchKycStatus();
        };
    }, [user])
     
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<numberSchemaValues>({
        resolver: zodResolver(numberSchema),
        defaultValues: {
            blockChain: '', 
            phoneNumber: kycStatus?.phone_number ? formatNigerianPhoneNumber(kycStatus.phone_number) : '',
        }
    });

    const { data:blockChains } = useQuery({
        queryKey: ['block-chains', item?.coin_token_id],
        queryFn: () => item?.coin_token_id ? fetchCoinBlockChain(item.coin_token_id) : Promise.reject('coin token id is undefined')
    });

    const block_chain = watch('blockChain');
    const selectedChain = blockChains?.find((item) => item.blockchain_name === block_chain);

    const onSubmit = async (data:numberSchemaValues) => {
        const newData = {
            transaction_type: item?.transaction_type,
            naira_amount: item?.naira_amount,
            coin_token_id: item?.coin_token_id,
            blockchain_id: selectedChain?.id,
            coin_amount: item?.coin_amount,
            bills: item?.bills,
            network: item?.network,
            package_product_number: item?.package_product_number,
            phone_number: data?.phoneNumber
        }
        
        if (item?.transaction_type === 'crypto' && newData.blockchain_id === undefined) {
            setError('blockChain', {type: 'manual', message: 'Select a blockchain'})
            return;
        }
        const finalData = removeEmptyKeys(newData);

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
            console.log(response)
            if (response.status === 201) {
                setTransactionId(response.data?.transaction_id);
                setAccountDetails(response.data?.transaction_details.data);
                setIsBill(true);
                onOpen();
            }
        }).catch((error) => {
            console.log(error)
            if (error) {
                toast({
                    title: 'Error',
                    description: error.response.data.message,
                    variant: 'destructive'
                });
            }
        });
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
                    <input
                        type="text"
                        placeholder="Your Phone Number"
                        maxLength={11}
                        minLength={10}
                        className="bg-white h-[60px] w-full px-3 py-2 font-medium text-[16px] leading-[24px] text-[#121826] border-none rounded-sm focus:outline-none mt-5"
                        {...register("phoneNumber")} 
                    />
                       {errors.phoneNumber && (<p className="text-red-500 text-sm mt-1"> {(errors.phoneNumber as { message: string }).message} </p>
                    )}

                    <div className="mt-8 flex item-center gap-2">
                        <Info  className="size-6" />
                        <p className="text-[#121826] font-normal text-[14px] font-Inter xl:text-[16px] xl:leading-[24px]">
                            Please verify the information provided before proceeding, we would not be held responsible if the details provided are incorrect.
                        </p>
                    </div>

                    <div className="mt-16 flex items-center justify-center">
                        <button
                            type="submit"
                            className="lg:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter lg:h-[54px] lg:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]"
                        >
                            Proceed
                        </button>
                    </div>
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
                                    <strong>{item?.selectPayment || item?.fiatPayment} {item?.paymentAmount}.00</strong>
                                </div>

                                <div className="flex justify-between w-full font-Inter py-5">
                                    <p className="font-medium text-[16px] leading-[24px] text-[#121826] flex items-center gap-2">
                                        Withdrawal Fee <Info   className="size-6" />
                                    </p>
                                    <p className="font-bold text-[16px] leading-[24px] text-[#121826]">__</p>
                                </div>
                        </div>
                        <div className=" border-t-2 border-[#0000001A] flex justify-between w-full font-Inter mt-3 py-5">
                            <p className="font-medium text-[16px] leading-[24px] text-[#121826]">Total</p>
                            <strong>{item?.selectPayment || item?.fiatPayment} {item?.paymentAmount}.00</strong>
                        </div>
                    </div>

                </div>
            </div>

          </div>
    </form>

    );
};

export default DataInput;
