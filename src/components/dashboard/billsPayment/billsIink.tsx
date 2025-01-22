import React from 'react';
import { IconType } from 'react-icons/lib';

type billsLinkProps = {
  index: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  active: number;
  icon: IconType;
  name: string;
}

const BillsIink = ({ index, setActive, active, icon: Icon, name }: billsLinkProps) => {
  return (
    <div key={index}
      onClick={() => setActive(index)}
      className={`px-[16px] py-[13px] w-full md:h-[112px] xl:h-[130px] 2xl:h-[140px] h-[80px] rounded-sm flex flex-col items-center justify-center shadow-sm hover:shadow-sm mt-[20px]
            ${active === index ? 'bg-[#121826] text-white   ' : 'bg-white text-[#121826]'}
            cursor-pointer`}
    >
      <div className="flex items-center justify-center flex-col ">
        <div className={` size-[35px] rounded-full flex items-center justify-center ${active === index ? ' bg-[#121826]/70' : 'bg-[#f8f9fA]'} `}>
          <Icon className={` size-6 ${active === index ? 'text-white' : 'text-[#121826]'} `} />
        </div>
        <p className={`text-[#121826] text-[10px] xl:text-[12px] leading-[14px] xl:leading-[18px] font-Inter text-center ${active === index ? 'text-white' : 'text-[#121826]'}`}>
          {name}
        </p>
      </div>
    </div>
  )
}

export default BillsIink;
