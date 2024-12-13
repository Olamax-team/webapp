import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

type ExchangePropsProps = {
  subTabs: string[]; // Array of sub-tab labels
  activeSubTab: string; // Current active tab
  setActiveSubTab: (tab: string) => void; // Function to set the active tab
  exchangeProp1: string; // First exchangeProp value
  exchangeProp2: string; // Second exchangeProp value
  setexchangeProp1: (exchangeProp: string) => void; // Function to set the first exchangeProp
  setexchangeProp2: (exchangeProp: string) => void; // Function to set the second exchangeProp
  firstExchangeProps: string[]; // Options for the first dropdown
  secondExchangeProps: string[]; // Options for the second dropdown
  payText: string; // Text for the "Pay" label
  receiveText: string; // Text for the "Receive" label
  receiveText2: string; // Text for the "Receive" label
};

export const ExchangeProps: React.FC<ExchangePropsProps> = ({
  subTabs,
  activeSubTab,
  setActiveSubTab,
  exchangeProp1,
  exchangeProp2,
  setexchangeProp1,
  setexchangeProp2,
  firstExchangeProps,
  secondExchangeProps,
  payText,
  receiveText,
  receiveText2,
}) => {
  return (
    <div className="space-y-4">
      {/* Sub-Tabs */}
      <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
        {subTabs.map((tab) => (
          <Button
            key={tab}
            variant={activeSubTab === tab ? "default" : "ghost"}
            onClick={() => setActiveSubTab(tab)}
            className={`p-5 ${
              activeSubTab === tab
                ? "bg-bg hover:bg-bg text-primary font-semibold"
                : "text-[18px] leading-[27px] hover:none font-semibold"
            }`}
          >
            {tab.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* First Exchange Input */}
      <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
        <div>
          <p className="leading-[21px] text-[14px]">
            {activeSubTab === subTabs[0] ? payText : receiveText=receiveText2}
          </p>
          <Input
            placeholder="0.00"
            className="bg-bg font-bold leading-[34.5px] text-[23px] border-none focus:outline-none appearance-none"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <img
            src={`../../../src/assets/images/${exchangeProp1} Circular.png`}
            alt={`${exchangeProp1} logo`}
            className="w-[32px] h-[32px]"
          />
          <span className="text-sm leading-[24px] text-[16px] font-semibold">
            {exchangeProp1}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>▼</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {firstExchangeProps.map((exchangeProp) => (
                <DropdownMenuItem
                  key={exchangeProp}
                  onClick={() => setexchangeProp1(exchangeProp)}
                >
                  {exchangeProp}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Switch Button */}
      <div className="flex justify-center font-bold text-primary my-2">
        <Button variant="ghost" size="icon" disabled>
          ⇅
        </Button>
      </div>

      {/* Second Exchange Input */}
      <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
        <div>
          <p className="text-sm">
            {activeSubTab === subTabs[0] ? receiveText : payText}
          </p>
          <Input
            placeholder="0.00"
            className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <img
            src={`../../../src/assets/images/${exchangeProp2} Circular.png`}
            alt={`${exchangeProp2} logo`}
            className="w-[32px] h-[32px]"
          />
          <span className="text-sm leading-[24px] text-[16px] font-semibold">
            {exchangeProp2}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>▼</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {secondExchangeProps.map((exchangeProp) => (
                <DropdownMenuItem
                  key={exchangeProp}
                  onClick={() => setexchangeProp2(exchangeProp)}
                >
                  {exchangeProp}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center items-center">
        <Button className="py-3 mt-6 bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
          {activeSubTab}
        </Button>
      </div>
    </div>
  );
};
