import { HeartHandshake } from 'lucide-react';



const OurValues = () => {
    return (
      <div className=" mt-10 w-full h-auto ">
        <div className="text-left xl:text-center text-[#000000] ">
          <h2 className="font-Inter font-bold text-[18px] leading-[27px] xl:font-DMSans xl:text-[32px] xl:leading-[48px]">
            Our Values
          </h2>
          <p className="font-Inter font-medium text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px]">
            Guiding Principles & Beliefs
          </p>
        </div>
  
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4 lg:grid-cols-4 mt-10">
          <div className="w-full h-auto bg-[#039AE4] rounded-[5px] xl:rounded-[20px]  text-[#ffffff] flex flex-col items-center justify-center py-3 px-3 ">
            <div className="size-8 bg-[#ffffff] flex items-center justify-center mb-3 rounded-full">
              < HeartHandshake className="size-6  text-[#039AE4]" />
            </div>
            <h2 className="text-center text-[14px] xl:text-[18px] font-bold font-Inter leading-[25px] xl:leading-[29px] mb-2">Transparency</h2>
            <p className="text-center text-[12px] xl:text-[16px] font-Inter leading-[23px] font-normal xl:leading-[27px] p-3">
              We operate with complete openness, ensuring that our fees, processes, and services are clear and easy to understand, giving you confidence in every transaction.
            </p>
          </div>
  
          <div className="w-full h-auto bg-[#121826] rounded-[5px]  xl:rounded-[20px] text-[#ffffff] flex flex-col items-center justify-center  py-2 px-3">
            <div className="size-8 bg-[#ffffff] flex items-center justify-center mb-3 rounded-full">
              < HeartHandshake className="size-6  text-[#121826] " />
            </div>
            <h2 className="text-center text-[14px] xl:text-[18px] font-bold font-Inter leading-[25px] xl:leading-[29px] mb-2 ">Security</h2>
            <p className="text-center text-[12px] xl:text-[16px] font-Inter leading-[23px] font-normal xl:leading-[27px] p-3">
              Your safety is our top priority. We employ advanced encryption and multi-factor authentication to protect your funds and personal data at all times.
            </p>
          </div>
  

          <div className="w-full h-auto bg-[#039AE4] rounded-[5px]    xl:rounded-[20px] text-[#ffffff] flex flex-col items-center justify-center  py-2 px-3">
            <div className="size-8 bg-[#ffffff] flex items-center justify-center mb-3 rounded-full">
              <HeartHandshake className="size-6  text-[#039AE4]" />
            </div>
            <h2 className="text-center text-[14px] xl:text-[18px] font-bold font-Inter leading-[25px] xl:leading-[29px] mb-2">Innovation</h2>
            <p className="text-center text-[12px] xl:text-[16px] font-Inter leading-[23px] font-normal xl:leading-[27px] p-3">
              We stay ahead by embracing the latest technologies and continuously improving our platform to offer faster, more efficient solutions for your financial needs.
            </p>
          </div>

            <div className="  w-full h-auto  bg-[#121826] rounded-[5px]  xl:rounded-[20px] text-[#ffffff] flex flex-col items-center justify-center  py-2  px-3">
            <div className="size-8 bg-[#ffffff] flex items-center justify-center mb-3 rounded-full">
              < HeartHandshake className="size-6 text-[#121826]" />
            </div>
            <h2 className="text-center text-[14px] xl:text-[18px] font-bold font-Inter leading-[25px] xl:leading-[29px] mb-2">Customer Focus</h2>
            <p className="text-center text-[12px] xl:text-[16px] font-Inter leading-[23px] font-normal xl:leading-[27px] p-3">
              Your satisfaction is at the heart of everything we do. From personalized support to user-friendly features, we are dedicated to providing an exceptional experience for all our customers.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OurValues;
  