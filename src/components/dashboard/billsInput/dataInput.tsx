import { useState } from "react";

const DataInput = () => {
    const[phoneNumber, setPhoneNumber] = useState('');


    const handlePhoneNumber = (event: any) => {
        setPhoneNumber(event.target.value)
      }

  return (
    <div className='xl:flex h-auto gap-10 w-full'>

                <div className=' xl:w-[50%] w-full p-5 xl:pt-6 '>  
                        


                <div className='mt-2'>
                <h2 className='font-bold font-DM Sans text-[26px] leading-[39px] '>Provide Transaction Details</h2>
                <p  className='font-medium text-[14px] leading-[21px]'>Complete Transaction</p>
                </div>


            <input
                type='text'
                value={phoneNumber}
                onChange={handlePhoneNumber}
                placeholder='Your Phone Number'
                className=' bg-white   h-[60px] w-full px-3 py-2 font-medium text-[16px] leading-[24px]  text-[#121826] border-none rounded-sm focus:outline-none  mt-5'
            
            />

            <div className='mt-8  flex item-center'>
            <img src='' alt='excal' className='size-6 '/>
            <p className='w-[404px] h-[72px] font-small text-[16px] leading-[24px] '>Please verify the information provided before proceeding, we would not be held responsible if the details provided are incorrect.</p>
            </div>

            <div className='mt-16 flex items-center justify-center '>
            <button className='lg:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter lg:h-[54px] lg:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]'>
            Proceed</button>
            </div>

            </div>


            <div className='bg-[#ffffff] rounded-md xl:w-[50%] w-full xl:h-[520px] mt-10 xl:mt-0 h-[420px] p-5'  > 
            <h3 className='font-bold  font-inter text-[18px] leading-[27px]  ' >Transaction Summary</h3>

            <div className='flex item-center  mt-5' >
                <img src='' alt=''/>
                <span>datas</span>
            </div>


            </div>
        </div>    
  )
}

export default DataInput