import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billsSchema } from "../../../formValidation/formValidation";
import useBillsStore from "../../../../stores/billsStore";
import exclamation from '../../../../assets/images/exclamation-circle.svg'
import { useState } from "react";
import { useConfirmModal } from "../../../../lib/utils";
  



const ElectricityInput = () => {
    const electricityData = useBillsStore();
    const [billType, setBillType] = useState("prepaid");
    const {onOpen}  = useConfirmModal()

  const handleChange = (e:any) => {
    setBillType(e.target.value);
  };

   

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(billsSchema)
    });

    const onSubmit = (data: any) => {
        const upDatedData = {
            selectedNetwork:data.selectedNetwork,
            inputAmount:data.inputAmount, 
            selectPayment:data.selectPayment,
             paymentAmount:data.paymentAmount
            }
            electricityData.setItem(upDatedData);

        
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


                <div className="w-full xl:h-[60px] h-[48px] rounded-sm mt-5 bg-[#f5f5f5]">
                        <select
                          id="electricity-bill"
                          // name="electricity-bill"
                          {...register("billType")} 
                          value={billType}
                          onChange={handleChange}
                          className="w-full bg-white h-[60px] text-[#121826] border border-none rounded-sm shadow-sm focus:ring-white focus:border-white"
                        >
                          <option value="">Select bill type</option> 
                          <option value="prepaid">Prepaid</option>
                          <option value="postpaid">Postpaid</option>
                        </select>

                        {errors.billType && (
                          <p className="text-red-500 text-sm mt-1"> {(errors.billType as { message: string }).message}</p>
                         )}
                   </div>


                <div className="w-full xl:-h-[60px] h-[48px]  rounded-sm mt-8 bg-[#f5f5f5] ">
                    <input
                        type="text"
                        placeholder="12349876522"
                        maxLength={11}
                        minLength={10}
                       
                        className="w-full h-[60px] px-3 py-2 text-[12px] xl:-text[16px] xl:leading-[24px] leading-[18px] font-medium text-[#121826] font-Inter bg-white border border-none rounded-sm shadow-sm    focus:ring-[#f5f5f5]  focus:bg-[#f5f5f5]"
                        {...register("meterNumber")} 
                    />
                       {errors.meterNumber && (<p className="text-red-500 text-sm mt-1"> {(errors.meterNumber as { message: string }).message} </p>
                    )}
                    </div>

                  <div className="mt-10 font-poppins text-[#000000] text-[16px] leading-[24px]"><h3>Tosin Adebayor</h3> </div>

                  <div className="w-full xl:h-[60px] h-[48px] rounded-sm mt-10 bg-[#f5f5f5]">
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


                    <div className="mt-12 flex item-center">
                        <img src= {exclamation}   className="size-6" />
                        <p className="w-full  font-small text-[14px] xl:text-[16px] leading-[24px]">
                            Please verify the information provided before proceeding, we would not be held responsible if the details provided are incorrect.
                        </p>
                    </div>

                    <div className="mt-16 flex items-center justify-center">
                        <button
                            type="submit"
                            className="lg:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter lg:h-[54px] lg:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]"
                            onClick={() =>onOpen()}
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
                        <div className="space-y-2 border-b border-[#0000001A] mt-3">
                            <p className="font-medium text-[16px] leading-[24px]">{electricityData.item?.selectedNetwork}</p>
                        </div>

                        <div className="flex justify-between w-full  font-Inter  border-b border-[#0000001A] mt-3 py-5">
                            <p className="font-medium text-[16px] leading-[24px] text-[#121826]">You Recieve</p>
                            <strong>{electricityData.item?.inputAmount}</strong>
                        </div>
                      <div className="border-b border-[#0000001A] mt-3">
                                <div className="flex justify-between w-full font-Inter py-5">
                                    <p className="font-medium text-[16px] leading-[24px] text-[#121826]">Price</p>
                                    <strong>{electricityData.item?.selectPayment} {electricityData.item?.paymentAmount}</strong>
                                </div>

                                <div className="flex justify-between w-full font-Inter py-5">
                                    <p className="font-medium text-[16px] leading-[24px] text-[#121826] flex items-center">Withdrawal Fee <img src= {exclamation}   className="size-6" />
                                    </p>
                                        <p><img src='' alt="" className="size-6" /></p>
                                </div>
                        </div>

                        <div className="flex justify-between w-full font-Inter mt-3 py-5">
                            <p className="font-medium text-[16px] leading-[24px] text-[#121826]">Total</p>
                            <strong>{electricityData.item?.inputAmount}</strong>
                        </div>
                    </div>

                </div>
            </div>

          </div>
     </form>

    );
};

export default ElectricityInput;
