import React, { useState, useEffect } from 'react';
import reactangl2 from '../../assets/images/Rectangle (1).svg';
import rectangle0 from '../../assets/images/Rectangle (2).svg';
import rectangle00 from '../../assets/images/Rectangle (3).svg';
import { cn } from '../../lib/utils';

 const UseOlamax = () => {
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
  const handleStepChange = (step:any) => {
    setActiveStep(step);
  };

  const stepImages = [reactangl2, rectangle0, rectangle00];

  return (
    <div className="h-auto bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <div>
      <h1 className="text-2xl  md:text-4xl font-bold text-center  px-4 sm:px-6  ">
        Using <span className="text-[#039AE4]">OLAMAX</span> is as Simple as These 3 Steps
      </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-10 sm:flex-row justify-between items-center w-full max-w-4xl p-6">
        {/* Left Side: List of Items with Numbers */}
        <div className="w-full sm:w-1/2 sm:mt-20">
          <ul>
            {/* Step 1 */}
            <li
              className={cn(
                'justify-start items-start gap-3 flex p-4 mb-4 transition-all duration-500',
                activeStep === 1 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(1)} // Update active step on click
            >
              <span className="flex items-center mt-2 justify-center text-lg font-bold text-gray-700 w-8 h-8 rounded-full bg-white mb-2">
                1
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Create an Account</h3>
                <span className="font-semibold">Sign up for a free account on our website or mobile apps</span>
              </p>
            </li>

            {/* Step 2 */}
            <li
              className={cn(
                'justify-start items-start flex p-4 mb-4 gap-3 transition-all duration-500',
                activeStep === 2 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(2)} // Update active step on click
            >
              <span className="flex items-center justify-center mt-2 text-lg font-bold text-gray-700 w-8 h-8 rounded-full bg-white mb-2">
                2
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg sm:text-xl font-medium">Complete Verification</h3>
                <span className="font-medium">Take a quick second to complete your verification (KYC)</span>
              </p>
            </li>

            {/* Step 3 */}
            <li
              className={cn(
                'justify-start items-start p-4 mb-4 transition-all duration-500 flex gap-3',
                activeStep === 3 ? 'filter-none' : 'filter blur-sm'
              )}
              onClick={() => handleStepChange(3)} // Update active step on click
            >
              <span className="flex items-center justify-center mt-2 text-lg font-bold text-gray-700 w-8 h-8 rounded-full bg-white mb-2">
                3
              </span>
              <p className="text-sm sm:text-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-start">Enjoy Trading</h3>
                <span className="font-semibold sm:text-sm">Experience limitless banking in Web3</span>
              </p>
            </li>
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="w-full sm:w-1/2 mt-6 sm:mt-0 flex justify-center items-center">
          {/* Hide the image on mobile (sm) and display it from medium screens (md) onward */}
          <img
            src={stepImages[activeStep - 1]} // Display image based on active step
            alt={`Step ${activeStep}`}
            className={`w-full sm:w-96 h-full sm:h-96 object-cover rounded-lg shadow-lg transition-all duration-500 
              hidden sm:block`} // Hide on mobile and show on larger screens
          />
        </div>
      </div>
    </div>
  );
};

export default UseOlamax;
