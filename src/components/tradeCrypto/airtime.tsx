import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import arrowIcon from '../../assets/images/arrowdown.svg';

interface airtimePaymentProps {
  className?: string; // Editable className prop
  airtimeOptions: string[];
  props1: string[];
  props2currency: string[];
  airtimeProps1: string[];
}

const AirtimePayment: React.FC<airtimePaymentProps> = ({
  className,
  airtimeOptions,
  props1,
  props2currency,
  airtimeProps1
}) => {

    const [cat0, setCat0] = useState("Airtime");  
    const [subTab, setSubTab] = useState("CRYPTO");
    const [prop1, setprop1] = useState("NGN");
    const [prop2, setprop2] = useState("BTC");
    const [airtimeProp1, setAirtimeProp1] = useState("MTN");
    const [amount1, setAmount1] = useState<string>("");
    const [amount2, setAmount2] = useState<string>("");

  return (
    <div className={`space-y-2 w-full ${className || ""}`}>
      {/* Sub-Tabs */}
      <div className="mb-4">
        <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
          <Button
            variant={subTab === "CRYPTO" ? "default" : "ghost"}
            onClick={() => setSubTab("CRYPTO")}
            className={`p-5 mt-[30px] ${
              subTab === "CRYPTO"
                ? "bg-bg hover:bg-bg text-primary text-[12px] xl:text-[16px] font-semibold"
                : "text-[14px] xl:text-[18px] font-semibold"
            }`}
          >
            CRYPTO
          </Button>
          <Button
            variant={subTab === "FIAT" ? "default" : "ghost"}
            onClick={() => setSubTab("FIAT")}
            className={`pb-2 mt-[30px] ${
              subTab === "FIAT"
                ? "bg-bg hover:bg-bg text-primary text-[12px] xl:text-[16px] font-semibold"
                : "text-[14px] xl:text-[18px] font-semibold"
            }`}
          >
            FIAT
          </Button>
        </div>
      </div>

      {/* Airtime Dropdown */}
      <div className="flex justify-center space-x-4">
        <div className="font-Inter flex items-center w-full h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
          <p className="leading-[18px] font-[500] text-[12px] xl:leading-[21px] xl:text-[14px]">
            {cat0}
          </p>
          <select
            value={cat0}
            onChange={(e) => setCat0(e.target.value)}
            className="ml-auto p-2 bg-bg text-textDark rounded-md text-right"
          >
            {airtimeOptions.map((prop) => (
            <option key={prop} value={prop}>
                {prop}
            </option>
            ))}
          </select>
        </div>
        </div>
        <div>
            {/* Airtime Input */}
            <div className="flex justify-center space-x-4">
                <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="w-full">
                    <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                        {cat0 === "Data" ? "Select Plan" : "Airtime Amount"}
                    </p>
                    <div className="grid grid-cols-2">
                        <Input
                        value={amount1}
                        onChange={(e) => setAmount1(e.target.value)}
                        placeholder="0.00"
                        className="h-[35px] pl-0 shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none outline-none peer placeholder:text-inherit"
                        />
                        <div className="flex items-center justify-end xl:justify-end">
                            <img
                            src={`../../../src/assets/images/${airtimeProp1} Circular.png`}
                            alt={`${airtimeProp1} logo`}
                            className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                            />
                            <select
                            value={airtimeProp1}
                            onChange={(e) => setAirtimeProp1(e.target.value)}
                            className="rounded-md bg-bg px-2 py-1"
                            >
                            {airtimeProps1.map((prop) => (
                            <option key={prop} value={prop}>
                                {prop}
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

            {/* Payment Input */}
            <div className="flex justify-center space-x-4">
                <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="w-full">
                    <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                    You Pay
                    </p>
                    <div className="grid grid-cols-2">
                        <Input
                        value={amount2}
                        onChange={(e) => setAmount2(e.target.value)}
                        placeholder="0.00"
                        className="h-[35px] pl-0 shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none outline-none peer placeholder:text-inherit"
                        />
                        <div className="flex items-center justify-end">
                        <img
                            src={`../../../src/assets/images/${
                            subTab === "CRYPTO" ? prop2 : prop1
                            } Circular.png`}
                            alt={`${
                            subTab === "CRYPTO" ? prop2 : prop1
                            } logo`}
                            className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                        />
                        <select
                            value={subTab === "CRYPTO" ? prop2 : prop1}
                            onChange={(e) =>
                            subTab === "CRYPTO"
                                ? setprop2(e.target.value)
                                : setprop1(e.target.value)
                            }
                            className="rounded-md bg-bg px-2 py-1"
                        >
                            {(subTab === "CRYPTO" ? props2currency : props1).map((prop) => (
                            <option key={prop} value={prop}>
                                {prop}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>

                {/* Buy Button */}
                <div className="flex justify-center items-center">
                    <Button className="py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                        Buy
                    </Button>
                </div>
        </div>
      
    </div>
  );
};

export default AirtimePayment;
