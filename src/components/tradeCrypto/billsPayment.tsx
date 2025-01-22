import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import arrowIcon from '../../assets/images/arrowdown.svg';

interface BillsPaymentProps {
categories: string[]; // Categories to map for dropdown
billProps1: string[]; // Options for billProp1 dropdown
props2currency: string[]; // Options for currency dropdown
className?: string; // Additional class names for styling
}

const BillsPayment: React.FC<BillsPaymentProps> = ({
categories,
billProps1,
props2currency,
className = "",
}) => {
const [cat, setCat] = useState<string>(categories[0] || "Electricity");
const [billProp1, setBillProp1] = useState<string>(billProps1[0] || "IBEDC");
const [currency, setCurrency] = useState<string>(props2currency[0] || "BTC");
const [amount1, setAmount1] = useState<string>("");
const [amount2, setAmount2] = useState<string>("");

return (
    <>
        <div className={`border border-white space-y-2 ${className}`}>
            {/* Header */}
            <div className="my-4 xl:ml-4 font-bold leading-[24px] text-[16px] xl:leading-[24px] xl:text-[16px]">
                <p className="mt-[30px] mb-5">Pay your bills with ease</p>
            </div>

            {/* Category Selection */}
            <div className="font-poppins flex justify-center space-x-4 text-[16px] leading-[24px] text-textDark">
                <div className="mt-3 font-Inter flex items-center w-[316px] xl:w-[440px] h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
                    <p className="leading-[18px] font-[500] text-[12px] xl:leading-[21px] xl:text-[14px]">Pay {cat} Bill</p>
                    <div className="flex ml-auto">
                    <div className="flex font-Inter items-center justify-end">
                        <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="rounded-md bg-bg px-2 py-1 text-right"
                        >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                            {category}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div>
                {/* Input for Amount and BillProp1 */}
                <div className="flex justify-center space-x-4">
                    <div className="font-Inter flex items-center w-[316px] xl:w-[440px] h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                        <div>
                        <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">Enter Amount</p>
                        <div className="grid grid-cols-2">
                            <Input
                            value={amount1}
                            onChange={(e) => setAmount1(e.target.value)}
                            placeholder="0.00"
                            className="h-[35px] pl-0 shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none outline-none peer placeholder:text-inherit"
                            />
                            <div className="flex items-center justify-end xl:justify-end">
                            <img
                                src={`../../../src/assets/images/${billProp1} Circular.png`}
                                alt={`${billProp1} logo`}
                                className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                            />
                            <select
                                value={billProp1}
                                onChange={(e) => setBillProp1(e.target.value)}
                                className="text-[13px] leading-[19.5px] xl:leading-[24px] xl:text-[16px] font-semibold rounded-md bg-bg  px-2 py-1"
                            >
                                {billProps1.map((bill) => (
                                <option key={bill} value={bill}>
                                    {bill}
                                </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Switch Icon */}
                <div className="flex justify-center font-bold text-primary my-2">
                    <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
                </div>
                {/* Currency and Payment Section */}
                <div className="flex justify-center space-x-4">
                    <div className="font-Inter flex items-center w-[316px] xl:w-[440px] h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                        <div>
                            <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">You Pay</p>
                            <div className="grid grid-cols-2">
                                <Input
                                value={amount2}
                                onChange={(e) => setAmount2(e.target.value)}
                                placeholder="0.00"
                                className="h-[35px] pl-0 shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none outline-none peer placeholder:text-inherit"
                                />
                                <div className="flex items-center justify-end xl:justify-end">
                                    <img
                                        src={`../../../src/assets/images/${currency} Circular.png`}
                                        alt={`${currency} logo`}
                                        className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                                    />
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="text-[13px] leading-[19.5px] xl:leading-[24px] xl:text-[16px] font-semibold rounded-md bg-bg px-2 py-1"
                                    >
                                        {props2currency.map((curr) => (
                                        <option key={curr} value={curr}>
                                            {curr}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className="flex justify-center items-center">
                    <Button className="py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                        Buy
                    </Button>
                </div>
            </div>
        </div>
    </>
);
};

export default BillsPayment;
