import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const textList = [
  {
    num: 1,
    title: "Create an Account",
    content: "Sign up for a free account on our website or mobile apps"
  },
  {
    num: 2,
    title: "Complete Verification",
    content: "Take a quick second to complete your verification (KYC)"
  },
  {
    num: 3,
    title: "Enjoy Trading",
    content: "Experience limitless banking in Web3"
  },
];

type textContentProps = {
  num: number;
  activeText?: boolean;
  onClick?: () => void;
  title: string;
  content: string;
}

const UseOlamax  = () => {
  const [activeStep, setActiveStep] = useState(1);
  const stepImages = ['/images/Rectangle_(1).svg', '/images/Rectangle_(2).svg', '/images/Rectangle_(3).svg'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep % 3) + 1); // Cycles through 1, 2, 3
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleStepChange = (step:number) => {
    setActiveStep(step);
  };

  const DesktopTextComponent = ({activeText, onClick, title, content, num}:textContentProps) => {
    return (
      <div className={cn("w-full h-full border-l-[5px] border-l-white flex p-4 items-center gap-4 relative transition-all duration-500")} onClick={onClick}>
        <div className="absolute h-full w-full -left-[4px] top-0 flex items-center">
          <div className={cn("h-[45%] w-[5px]", activeText ? 'bg-primary': 'bg-white')}/>
        </div>
        <div className={cn('flex gap-4 items-center', activeText ? 'filter-none': 'filter blur-sm')}>
          <div className="size-[40px] flex items-center justify-center bg-white rounded-full flex-none">
            <p>{num}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className='text-[23px] leading-normal font-semibold font-Inter'>{title}</h3>
            <p className='text-base'>{content}</p>
          </div>
        </div>
      </div>
    )
  };

  const MobileTextComponent = ({title, content, num}:textContentProps) => {
    return (
      <div className={cn("w-full h-full flex p-3 items-center gap-4 relative transition-all duration-500")}>
        <div className={cn('flex gap-4 items-center')}>
          <div className="size-[40px] flex items-center justify-center bg-white rounded-full flex-none">
            <p>{num}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className='text-lg font-semibold font-Inter'>{title}</h3>
            <p className='text-sm'>{content}</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-[#F8F9FA] flex flex-col items-center py-[40px] md:py-[65px] w-full">
      <div className='flex flex-col gap-0 md:gap-10 w-[90%] md:w-[80%] mx-auto'>
        <h1 className="mb-5 font-Inter text-[14px] lg:text-[32px] md:text-3xl font-bold lg:font-DMSans text-center lg:leading-tight">
          Using <span className="text-[#039AE4] lg:font-DMSans lg:text-[32px] leading-tight text-[14px] font-Inter md:text-[30px]">OLAMAX</span> is as Simple as These 3 Steps
        </h1>
        <div className="w-full h-[400px] gap-[120px] hidden lg:flex">
          <div className="w-[38%] grid grid-rows-3">
            {textList.map((item) => (
              <DesktopTextComponent key={item.num} {...item} onClick={() =>handleStepChange(item.num)} activeText={activeStep === item.num}/>
            ))}
          </div>
          <div className="w-[62%] h-full flex items-center justify-center">
            <img src={stepImages[activeStep-1]} alt="step_photo" className='object-cover h-full'/>
          </div>
        </div>
        <div className="w-full lg:hidden">
          {textList.map((item) => (
              <MobileTextComponent key={item.num} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseOlamax;
