import React, { useState, useEffect } from 'react';
import reactangl2 from '../../assets/images/Rectangle (1).svg';
import rectangle0 from '../../assets/images/Rectangle (2).svg';
import rectangle00 from '../../assets/images/Rectangle (3).svg';
import { cn } from '../../lib/utils';

const UseOlamax  = () => {
  // State to track the active step
  const [activeStep, setActiveStep] = useState(1);

  // Automatically change active step every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep % 3) + 1); // Cycles through 1, 2, 3
    }, 5000);

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Handle click to change active step
  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };

  const stepImages = [reactangl2, rectangle0, rectangle00];

  return (
    <div className="h-auto bg-gray-100 flex flex-col items-center p-3">
      {/* Header Section */}
      <div>
        <h1 className="font-Inter text-[14px] lg:text-[32px] md:text-3xl font-bold lg:font-DMSans text-center lg:leading-tight">
          Using <span className="text-[#039AE4] lg:font-DMSans lg:text-[32px] leading-tight text-[14px] font-Inter md:text-[30px]">OLAMAX</span> is as Simple as These 3 Steps
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col  sm:flex-row justify-between items-center  w-full p-3 ">
        {/* Left Side: List of Items with Numbers */}
        <div className="w-full   sm:w-1/2  flex justify-start items-start h-[400px] relative "> 

         {/* Indicator */}
         <div
                className="w-[4px] relative bg-[#039AE4] rounded-l-full transition-all duration-500  hidden lg:block"
                style={{
                  height: '20%', 
                  top: `${(activeStep - 1) * 30}%`,
                }} 
              /> 

         

          <ul className="w-full h-full p-3">
            {/* Step 1 */}
            <li
              className={cn(
                'justify-start items-start gap-3 flex mt-5  transition-all duration-500',
                activeStep === 1 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(1)} // Update active step on click
            >
              <span className="flex items-center justify-center text-[16px] font-medium font-Inter text-[#000000] w-[30px] h-[30px] rounded-full bg-white ">
                1
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg lg:text-[23px] lg:leading-tight font-semibold font-Inter text-[#000000] mb-2">Create an Account</h3>
                <span className="font-medium font-Inter text-sm lg:text[16px] lg:leading-6 text-[#121826]">Sign up for a free account on our website or mobile apps</span>
              </p>
            </li>

            {/* Step 2 */}
            <li
              className={cn(
                'justify-start items-start flex mt-14  gap-3 transition-all duration-500',
                activeStep === 2 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(2)} // Update active step on click
            >
              <span className="flex items-center justify-center text-[16px] font-medium font-Inter text-[#000000] w-[30px] h-[30px] rounded-full bg-white ">
                2
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg lg:text-[23px] lg:leading-tight font-semibold font-Inter text-[#000000]">Complete Verification</h3>
                <span className="font-medium font-Inter lg:text[16px] lg:leading-6 text-sm text-[#121826]">Take a quick second to complete your verification (KYC)</span>
              </p>
            </li>

            {/* Step 3 */}
            <li
              className={cn(
                'justify-start items-start mt-16 transition-all duration-500 flex gap-3',
                activeStep === 3 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(3)} // Update active step on click
            >
              <span className="flex items-center justify-center text-[16px] font-medium font-Inter text-[#000000] w-[30px] h-[30px] rounded-full bg-white ">
                3
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg lg:text-[23px] lg:leading-tight font-semibold font-Inter text-[#000000]">Enjoy Trading</h3>
                <span className="font-medium font-Inter text-sm lg:text[16px] lg:leading-6 text-[#121826]">Experience limitless banking in Web3</span>
              </p>
            </li>
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          {/* Hide the image on mobile (sm) and display it from medium screens (md) onward */}
          <img
            src={stepImages[activeStep - 1]} // Display image based on active step
            alt={`Step ${activeStep}`}
            className={`w-full sm:w-96 h-full sm:h-96 object-cover transition-all duration-500 hidden sm:block`} // Hide on mobile and show on larger screens
          />
        </div>
      </div>
    </div>
  );
};

export default UseOlamax;
