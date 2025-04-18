import { useState } from "react"; 
import { Card, CardContent } from "../ui/card";
import IndicatorButtonGroup from "./indicator";
import CryptoMarketToday from "./cryptoMarketToday";
import BillsPayment from "./billsPayment";
import AirtimePayment from "./airtime";
import BuySell from "./buy/buySell";


const TradeCrypto = () => {
  const [activeTab, setActiveTab] = useState("Buy & Sell Crypto");
  const categories = ["Electricity", "CableTV"];
  const props1 = ["NGN", "USD", "EUR", "GBP"];
  const props2currency = ["BTC","ETH", "USDT", "SOL", "(Tron TRC20)" ];
  const billProps1 = ["IBEDC","Cable"];
  const airtimeProps1 = ["MTN","Airtel", "GLO", "9Mobile"];
  const tabs = ["Buy & Sell Crypto", "Airtime & Data", "Bills & Payment"];
  const airtimeOptions = ["Airtime", "Data" ];

  const handleTabClick = (index: number) => {
    const selectedTab = tabs[index];
    setActiveTab(selectedTab);
  };


  const renderContent = () => {
    switch (activeTab) {
      case "Buy & Sell Crypto":
        return (
          <BuySell/>
        );
      case "Airtime & Data":
        return (
          <AirtimePayment airtimeOptions={airtimeOptions} props1={props1} props2currency={props2currency} airtimeProps1={airtimeProps1}/>
      );
    case "Bills & Payment":
      return (
        <BillsPayment
          categories={categories}
          billProps1={billProps1}
          props2currency={props2currency}
        />
      );
    default:
      return null;
  }
};

return (
  <section className=" bg-bg overflow-hidden w-full py-6 xl:p-20 h-auto mx-auto my-auto flex items-center justify-center">
    <div className="px-5 mx-auto md:px-30 space-y-8 w-full h-auto">
        <IndicatorButtonGroup
          buttons={tabs}
          onButtonClick={handleTabClick}
          buttonClassName="pl-0 pb-6 font-Inter xl:font-poppins text-[13px] xl:text-[16px] leading-[19.5px] xl:leading-[24px] text-textDark "
        />
      <div className="flex my-3 xl:grid xl:grid-cols-2 xl:gap-20 flex-wrap">
        {/* Left Section */}
        <div className="mx-auto my-auto items-center w-full">
          <Card className="rounded-lg w-full h-auto">
            <CardContent className="h-auto">{renderContent()}</CardContent>
          </Card>
        </div>
        {/* Right Section: Crypto Market Today */}
        <div className="mx-auto my-auto items-center w-full">
          <CryptoMarketToday/> 
        </div>
      </div>
    </div>
  </section>
);
};

export default TradeCrypto;
