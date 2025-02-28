import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import arrowIcon from '../../assets/images/arrowdown.svg';
// import BTC from "../../assets/images/BTC Circular.png";
// import ETH from "../../assets/images/ETH Circular.png";
// import USDT from "../../assets/images/USDT Circular.png";
// import SOL from "../../assets/images/SOL Circular.png";
// import NGN from "../../assets/images/NGN Circular.png";
// import MTN from "../../assets/images/MTN Circular.png"

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
    const handleBuyClick = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
    const logoMap: Record<string, string> = {
      BTC: '/images/BTC Circular.png',
      ETH: '/images/ETH Circular.png',
      SOL: '/images/SOL Circular.png',
      USDT: 'images/USDT Circular.png',
      NGN: '/images/NGN Circular.png',
      MTN: '/images/MTN Circular.png',
    };

  return (
    <form  onSubmit={handleBuyClick} >
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
                          className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                          />
                          <div className="flex items-center justify-end xl:justify-end font-Inter">
                              <img
                              src={logoMap[airtimeProp1 as keyof typeof logoMap]}
                              alt={`${airtimeProp1} logo`}
                              className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                              />
                              <select
                              value={airtimeProp1}
                              onChange={(e) => setAirtimeProp1(e.target.value)}
                              className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
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
                <img src={'/images/arrowdown.svg'} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
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
                          className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                          />
                          <div className="flex items-center justify-end font-Inter">
                          <img
                              src={logoMap[(subTab === "CRYPTO" ? prop2 : prop1) as keyof typeof logoMap]}
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
                              className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
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
                      <Button 
                      type="submit"
                      className="font-Inter xl:font-poppins py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                          Buy
                      </Button>
                  </div>
          </div>
        
      </div>
    </form>
  );
};

export default AirtimePayment;
