import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import arrowIcon from '../../assets/images/arrowdown.svg';
// import BTC from "../../assets/images/BTC Circular.png";
// import ETH from "../../assets/images/ETH Circular.png";
// import USDT from "../../assets/images/USDT Circular.png";
// import SOL from "../../assets/images/SOL Circular.png";
// import IBEDC from "../../assets/images/IBEDC Circular.png";
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
const handleBillPay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
}

  const logoMap: Record<string, string> = {
    BTC: '/images/BTC Circular.png',
    ETH: '/images/ETH Circular.png',
    SOL: '/images/SOL Circular.png',
    USDT: 'images/USDT Circular.png',
    IBEDC: '/images/IBEDC Circular.png',
  };

return (
    <>
        <form  onSubmit={handleBillPay}>
            <div className={`border border-white w-full space-y-2 ${className}`}>
                {/* Header */}
                <div className="my-4  font-bold leading-[24px] text-[16px] xl:leading-[24px] xl:text-[16px]">
                    <p className="mt-[30px] mb-5">Pay your bills with ease</p>
                </div>

                {/* Category Selection */}
                <div className="font-poppins flex justify-center space-x-4 text-[16px] leading-[24px] text-textDark">
                    <div className="mt-3 font-Inter flex items-center w-full h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
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
                        <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                            <div className="w-full">
                            <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">Enter Amount</p>
                            <div className="grid grid-cols-2">
                                <Input
                                value={amount1}
                                onChange={(e) => setAmount1(e.target.value)}
                                placeholder="0.00"
                                className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                                />
                                <div className="flex items-center justify-end xl:justify-end font-Inter">
                                <img
                                    src={logoMap[billProp1 as keyof typeof logoMap]}
                                    alt={`${billProp1} logo`}
                                    className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                                />
                                <select
                                    value={billProp1}
                                    onChange={(e) => setBillProp1(e.target.value)}
                                    className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
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
                        <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                            <div className="w-full">
                                <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">You Pay</p>
                                <div className="grid grid-cols-2">
                                    <Input
                                    value={amount2}
                                    onChange={(e) => setAmount2(e.target.value)}
                                    placeholder="0.00"
                                    className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                                    />
                                    <div className="flex items-center justify-end gap-1 font-Inter">
                                        <img
                                            src={logoMap[currency as keyof typeof logoMap]}
                                            alt={`${currency} logo`}
                                            className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                                        />
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
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
        </form>
    </>
);
};

export default BillsPayment;
