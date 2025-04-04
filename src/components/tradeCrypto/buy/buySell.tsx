import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import arrowIcon from '/images/arrowdown.svg';
import useTradeStore from "../../../stores/tradeStore";
import BTC from "/images/BTC Circular.png";
import ETH from "/images/ETH Circular.png";
import USDT from "/images/USDT Circular.png";
import SOL from "/images/SOL Circular.png";
import NGN from "/images/NGN Circular.png";
import { tradeSchema } from "../../formValidation/formValidation";
import useUserDetails from "../../../stores/userStore";
import { useNavigate } from "react-router-dom";

interface BuySellProps {
  props1Currency: string[];
  props2Currency: string[];
  setTradeType?: React.Dispatch<React.SetStateAction<string>>; // Optional
  setShowTransactionDetail?: React.Dispatch<React.SetStateAction<boolean>>; // Optional
  className?: string;
}
const BuySell: React.FC<BuySellProps> = ({
  className,
  props1Currency,
  props2Currency,
  setTradeType,
  setShowTransactionDetail,
  
}) => {
  const navigate = useNavigate();
  const { user } = useUserDetails();
  const [subTab, setSubTab] = useState("Buy");
  const [prop1, setProp1] = useState("NGN");
  const [prop2, setProp2] = useState("BTC");
  const [amount1, setAmount1] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");
  const tradeDetails = useTradeStore();
  const logoMap: Record<string, string> = {
    BTC,
    ETH,
    SOL,
    USDT,
    NGN,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tradeSchema),
  });
  
const onSubmit = (data: any) => {
  if (!user) {
    navigate("/log-in"); // Redirect to login if not logged in
    return;
  }
  const tradeData = {
    tradeType: subTab,
    fiatType: prop1,
    cryptoType: prop2,
    fiatAmount: subTab === "Buy" ? data.amount1 : data.amount2,
    cryptoAmount: subTab === "Buy" ? data.amount2 : data.amount1,
  };
  setShowTransactionDetail?.(true);
  setTradeType?.(subTab);
  tradeDetails.setItem(tradeData);
};

  return (
      <div className= {`space-y-6 xl:space-y-6 justify-center w-full ${className || ""}`}>
        {/* Sub-Tabs for Buy and Sell */}
        <div className="ml-1 xl:ml-2">
          <div className="font-poppins flex items-start space-x-4 text-[16px] leading-[24px] text-textDark">
            <Button
              variant={subTab === "Buy" ? "default" : "ghost"}
              onClick={() => setSubTab("Buy")}
              className={`p-5 mt-[30px] ${
                subTab === "Buy"
                  ? "bg-bg hover:bg-bg text-primary text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] font-semibold"
                  : "text-[14px] xl:text-[18px] leading-[21px] xl:leading-[27px] hover:none font-semibold"
              }`}
            >
              BUY
            </Button>
            <Button
              variant={subTab === "Sell" ? "default" : "ghost"}
              onClick={() => setSubTab("Sell")}
              className={`pb-2 mt-[30px] ${
                subTab === "Sell"
                  ? "bg-bg hover:bg-bg text-primary text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] font-semibold"
                  : "text-[14px] xl:text-[18px] leading-[21px] xl:leading-[27px] hover:none font-semibold"
              }`}
            >
              SELL
            </Button>
          </div>
        </div>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 mx-1 xl:mx-2">
            {/* First prop Input */}
            <div className="flex justify-center space-x-4 overflow-scroll">
              <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="flex flex-col w-full">
                  <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                    You {subTab === "Buy" ? "Pay" : "Sell"}
                  </p>
                  <div className="flex w-full justify-between">
                    <Input
                      {...register("amount1")}
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      placeholder="0.00"
                      className="h-[35px] leading-[27px] mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                    />
                  {errors.amount1 && <p className="text-red-500 text-sm">{(errors.amount1 as { message: string }).message}</p>}

                    <div className="flex items-center justify-start gap-1 font-Inter w-fit">
                    <img
                      src={logoMap[(subTab === "Buy" ? prop1 : prop2) as keyof typeof logoMap]}
                      alt={`${subTab === "Buy" ? prop1 : prop2} logo`}
                      className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                    />
                      <select
                        value={subTab === "Buy" ? prop1 : prop2}
                        required
                        onChange={(e) =>
                          subTab === "Buy"
                            ? setProp1(e.target.value)
                            : setProp2(e.target.value)
                        }
                        className="rounded-md bg-bg px-2 py-1 font-medium text-base w-fit max-w-20"
                      >
                        {(subTab === "Buy" ? props1Currency : props2Currency).map((prop) => (
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

            {/* Icon */}
            <div className="flex justify-center font-bold text-primary my-2">
              <img src={arrowIcon} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
            </div>

            {/* Second prop Input */}
            <div className="flex justify-center space-x-4 overflow-scroll">
              <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div className="w-full">
                  <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
                    You Receive
                  </p>
                  <div className="flex w-full justify-between">
                    <Input
                      {...register("amount2")}
                      value={amount2}
                      onChange={(e) => setAmount2(e.target.value)}
                      placeholder="0.00"
                      className="h-[35px] leading-[27px] mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                    />
                    {errors.amount2 && <p className="text-red-500 text-sm text-wrap">{(errors.amount2 as { message: string }).message}</p>}

                    <div className="flex items-center justify-start gap-1 font-Inter w-fit">
                      <img
                        src={logoMap[(subTab === "Buy" ? prop2 : prop1) as keyof typeof logoMap]}
                        alt={`${subTab === "Buy" ? prop2 : prop1} logo`}
                        className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                      />
                      <select
                        value={subTab === "Buy" ? prop2 : prop1}
                      onChange={(e) =>
                        subTab === "Buy"
                          ? setProp2(e.target.value)
                          : setProp1(e.target.value)
                      }
                      className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
                      >
                      {(subTab === "Buy" ? props2Currency : props1Currency).map((prop) => (
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

            <div className="flex justify-center items-center">
              <Button 
              type="submit"
              className="font-Inter xl:font-poppins py-3 mt-6 mb-1 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                {subTab}
              </Button>
            </div>
          </div>
          <div className="flex font-Inter font-[500px] xl:mt-1 gap-1 justify-center items-center text-center text-[14px] leading-[21px] xl:text-[16px] xl:leading-[26px] text-[#545454]">
            <img
              src={BTC}
              alt={`BTC logo`}
              className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
            />
            1 BTC = 116,377,572 Naira
          </div>
        </form>
      </div>
  );
};

export default BuySell;