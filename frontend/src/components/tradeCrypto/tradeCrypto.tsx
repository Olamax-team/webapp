import { useState } from "react"; 
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TradeCrypto = () => {
  const [activeTab, setActiveTab] = useState("Buy & Sell Crypto");
  const [subTab, setSubTab] = useState("Buy");
  const [cat, setCat] = useState("Electricity");
  const [cat0, setCat0] = useState("Airtime");  
  const [prop1, setprop1] = useState("NGN");
  const [prop2, setprop2] = useState("BTC");
  const [billProp1, setBillProp1] = useState("IBEDC");
  const [airtimeProp1, setAirtimeProp1] = useState("MTN");
  const props1 = ["NGN", "USD", "EUR", "GBP"];
  const props2 = ["BTC","ETH", "USDT", "SOL" ];
  const billProps1 = ["IBEDC","Cable"];
  const airtimeProps1 = ["MTN","Airtel", "GLO", "9Mobile"];

//   const toggleprop = () => {
//     setprop1((prev) => prop2);
//     setprop2((prev) => prop1);
//   };

  const renderContent = () => {
    switch (activeTab) {
      case "Buy & Sell Crypto":
        return (
          <>
            <div className="space-y-2 xl:space-y-3">
              {/* Sub-Tabs for Buy and Sell */}
              <div className="font-poppins flex items-start space-x-4 text-[16px] leading-[24px] text-textDark">
                <Button
                  variant={subTab === "Buy" ? "default" : "ghost"}
                  onClick={() => setSubTab("Buy")}
                  className={`p-5 mt-6 ${
                    subTab === "Buy"
                      ? "bg-bg hover:bg-bg text-primary font-semibold"
                      : "text-[18px] leading-[27px] hover:none font-semibold"
                  }`}
                >
                  BUY
                </Button>
                <Button
                  variant={subTab === "Sell" ? "default" : "ghost"}
                  onClick={() => setSubTab("Sell")}
                  className={`pb-2 mt-6 ${
                    subTab === "Sell"
                      ? "bg-bg hover:bg-bg text-primary"
                      : "text-[18px] leading-[27px] hover:none font-semibold"
                  }`}
                >
                  SELL
                </Button>
              </div>
              <div className="mt-5 border-2">
                {/* First prop Input */}
                <div className="font-Inter flex items-center w-[316px] xl:w-[440px] h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <div>
                    <p className="leading-[21px] text-[14px]">
                      You {subTab === "Buy" ? "Pay": "Sell"}
                    </p>
                    <Input
                      placeholder="0.00"
                      className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                  <img
                      src={`../../../src/assets/images/${
                        subTab === "Buy" ? prop1 : prop2
                      } Circular.png`}
                      alt={`${
                        subTab === "Buy" ? prop1 : prop2
                      } logo`}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-sm leading-[24px] text-[16px] font-semibold">
                      {subTab === "Buy" ? prop1 : prop2}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(subTab === "Buy" ? props1 : props2).map((prop) => (
                          <DropdownMenuItem
                            key={prop}
                            onClick={() =>  subTab === "Buy" ? setprop1(prop) : setprop2(prop)}
                          >
                            {prop}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Switch icon */}
                <div className="flex justify-center font-bold text-primary my-0">
                  <p>⇅</p>
                </div>

                {/* Second prop Input */}
                <div className="font-Inter flex items-center w-[316px] xl:w-[440px] h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <div>
                    <p className="text-sm">
                      You {subTab === "Buy" ? "Receive" : "Pay"}
                    </p>
                    <Input
                      placeholder="0.00"
                      className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src={`../../../src/assets/images/${
                        subTab === "Buy" ? prop2 : prop1
                      } Circular.png`}
                      alt={`${
                        subTab === "Buy" ? prop2 : prop1
                      } logo`}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-sm leading-[24px] text-[16px] font-semibold">
                      {subTab === "Buy" ? prop2 : prop1}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(subTab === "Buy" ? props2 : props1).map((prop) => (
                          <DropdownMenuItem
                            key={prop}
                            onClick={() =>  subTab === "Buy" ? setprop2(prop) : setprop1(prop)}
                          >
                            {prop}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Button className="py-3 my-6 bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
                    {subTab}
                  </Button>
                </div>
              </div>

              <div className="flex font-Inter font-[500px]  xl:mt-4 gap-1 justify-center items-center text-center text-[16px] leading-[26px] text-[#545454]">
              <img
                          src={`../../../src/assets/images/BTC Circular.png`}
                          alt={`BTC logo`}
                          className="w-[32px] h-[32px]"
                          />1 BTC = 116,377,572 Naira
              </div>
            </div>
          </>
        );
      case "Airtime & Data":
        return (
            <>
                <div className="space-y-4">
                {/* Sub-Tabs for Airtime & Data */}
                    <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
                    <Button
                        variant={subTab === "CRYPTO" ? "default" : "ghost"}
                        onClick={() => setSubTab("CRYPTO")}
                        className={`p-5 mt-6 ${
                        subTab === "CRYPTO"
                            ? "bg-bg hover:bg-bg text-primary font-semibold"
                            : "text-[18px] leading-[27px] hover:none font-semibold"
                        }`}
                    >
                        CRYPTO
                    </Button>
                    <Button
                        variant={subTab === "FIAT" ? "default" : "ghost"}
                        onClick={() => setSubTab("FIAT")}
                        className={`pb-2 mt-6 ${
                        subTab === "FIAT"
                            ? "bg-bg hover:bg-bg text-primary"
                            : "text-[18px] leading-[27px] hover:none font-semibold"
                        }`}
                    >
                        FIAT
                    </Button>
                    </div>
                      <div className="font-Inter flex items-center w-[440px] h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
                        <p className="font-Inter font-[500] leading-[24px] text-[16px]">{cat0}</p>
                        <div className="flex ml-auto">
                          <div className="flex items-center justify-center gap-1">
                            <DropdownMenu>
                            <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Select</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {["Airtime", "Data" ].map((prop) => (
                                <DropdownMenuItem
                                    key={prop}
                                    onClick={() => setCat0(prop)}
                                >
                                    {prop}
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    {/* First prop Input */}
                    <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                    <div>
                        <p className="leading-[21px] text-[14px]">
                        You Receive
                        </p>
                        <Input
                        placeholder="0.00"
                        className="text-[23px] shadow-none bg-bg font-bold leading-[34.5px] border-none outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <img
                        src={`../../../src/assets/images/${airtimeProp1} Circular.png`}
                        alt={`${airtimeProp1} logo`}
                        className="w-[32px] h-[32px]"
                        />
                        <span className="text-sm leading-[24px] text-[16px] font-semibold">
                        {airtimeProp1}
                        </span>
                        <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {airtimeProps1.map((prop) => (
                            <DropdownMenuItem
                                key={prop}
                                onClick={() => setAirtimeProp1(prop)}
                            >
                                {prop}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </div>

                    {/* Switch icon */}
                    <div className="flex justify-center font-bold text-primary my-0">
                      <p>⇅</p>
                    </div>
                    {/* Second prop Input */}
                    <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                    <div>
                        <p className="text-sm">
                        You Pay                        </p>
                        <Input
                        placeholder="0.00"
                        className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <img
                        src={`../../../src/assets/images/${
                          subTab === "CRYPTO" ? prop2 : prop1
                        } Circular.png`}
                        alt={`${
                          subTab === "CRYPTO" ? prop2 : prop1
                        } logo`}
                        className="w-[32px] h-[32px]"
                      />
                      <span className="text-sm leading-[24px] text-[16px] font-semibold">
                        {subTab === "CRYPTO" ? prop2 : prop1}
                      </span>
                        <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {(subTab === "CRYPTO" ? props2 : props1).map((prop) => (
                            <DropdownMenuItem
                                key={prop}
                                onClick={() => setprop2(prop)}
                            >
                                {prop}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </div>
                </div>
            <div className="flex justify-center items-center">
                <Button className="py-3 mt-6  bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
                Buy
                </Button>
            </div>
          </>
        );
      case "Bills & Payment":
        return (
          <>
          <div className="space-y-4">
          {/* Sub-Tabs for Bills & Payment */}
              <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
                <div className="mt-6 font-Inter flex items-center w-[440px] h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <p className="font-Inter font-[500] text-[16px] leading-[24px] text-textDark">Pay {cat} Bill</p>
                  <div className="flex ml-auto">
                      <div className="flex items-center justify-center gap-1">
                        <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {["Electricity","CableTV" ].map((prop) => (
                            <DropdownMenuItem
                                key={prop}
                                onClick={() => setCat(prop)}
                            >
                                {prop}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>
                       </div>
                  </div>
                </div>
              </div>

              {/* First prop Input */}
              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
              <div>
                  <p className="leading-[21px] text-[14px]">Enter Amount</p>
                  <Input
                  placeholder="0.00"
                  className="text-[23px] shadow-none bg-bg font-bold leading-[34.5px] border-none outline-none"
                  />
              </div>
              <div className="flex items-center justify-center gap-1">
                  <img
                  src={`../../../src/assets/images/${billProp1} Circular.png`}
                  alt={`${billProp1} logo`}
                  className="w-[32px] h-[32px]"
                  />
                  <span className="text-sm leading-[24px] text-[16px] font-semibold">
                  {billProp1}
                  </span>
                  <DropdownMenu>
                  <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>Select</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {billProps1.map((prop) => (
                      <DropdownMenuItem
                          key={prop}
                          onClick={() => setBillProp1(prop)}
                      >
                          {prop}
                      </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              </div>

              {/* Switch icon */}
              <div className="flex justify-center font-bold text-primary my-0">
                <p>⇅</p>
              </div>

              {/* Second prop Input */}
              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
              <div>
                  <p className="text-sm">You Pay</p>
                  <Input
                  placeholder="0.00"
                  className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
                  />
              </div>
              <div className="flex items-center justify-center gap-1">
                  <img
                  src={`../../../src/assets/images/${prop2} Circular.png`}
                  alt={`${prop2} logo`}
                  className="w-[32px] h-[32px]"
                  />
                  <span className="text-sm leading-[24px] text-[16px] font-semibold">
                  {prop2}
                  </span>
                  <DropdownMenu>
                  <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>Select</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["BTC","ETH", "USDT", "SOL" ].map((prop) => (
                      <DropdownMenuItem
                          key={prop}
                          onClick={() => setprop2(prop)}
                      >
                          {prop}
                      </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              </div>
              <div className="flex justify-center items-center">
                <Button className="py-3 mt-6  bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
                  Buy
                </Button>
              </div>
          </div>
    </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative bg-bg overflow-hidden w-full h-[550px] xl:h-[650px] mx-auto flex items-center justify-center">
      <div className="absolute top-[80px] w-[390px] xl:w-[1085px] h-[456px] xl:h-full">
        <div className="flex space-x-4 relative h-[32px] xl:h-[44px] w-[390px] xl:w-[1085px] mx-auto justify-start">
          <Button
            variant="ghost"
            className={`pb-2 font-poppins text-[16px] leading-[24px] ${
              activeTab === "Buy & Sell Crypto" ? "border-b-2" : ""
            }`}
            onClick={() => {setActiveTab("Buy & Sell Crypto"); setSubTab("Buy");}}
          >
            Buy & Sell Crypto
          </Button>
          <Button
            variant="ghost"
            className={`pb-2 font-poppins text-[16px] leading-[24px] ${
              activeTab === "Airtime & Data" ? "border-b-2" : ""
            }`}
            onClick={() => {setActiveTab("Airtime & Data");setSubTab("CRYPTO");}}
          >
            Airtime & Data
          </Button>
          <Button
            variant="ghost"
            className={`pb-2 font-poppins text-[13px] xl:text-[16px] leading-[19.5px] xl:leading-[24px] ${
              activeTab === "Bills & Payment" ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("Bills & Payment")}
          >
            Bills & Payment
          </Button>
        </div>
        <div className="flex my-3 xl:grid xl:grid-cols-2 xl:gap-20">
          {/* Left Section */}
          <div className=" ">
            <Card className="rounded-lg w-[356px] xl:w-[520px] h-[400px] xl:h-full mt-0">
              <CardContent>{renderContent()}</CardContent>
            </Card>
          </div>
          {/* Right Section: Crypto Market Today */}
          <div className="flex hidden xl:block space-x-4 relative my-auto">
            <Card className="xl:w-[413px] xl:h-[388px] bg-bg">
              <CardHeader>
                <CardTitle className="font-DMSans text-[32px] leading-[48px]">
                  Crypto Market Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-Inter space-y-4">
                  {[
                    {
                      name: "Bitcoin",
                      ticker: "BTC",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                      logo:"../../../src/assets/images/BTC Circular.png",
                    },
                    {
                      name: "Ethereum",
                      ticker: "ETH",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                      logo:"../../../src/assets/images/ETH Circular.png",
                    },
                    {
                      name: "Tether",
                      ticker: "USDT",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                      logo:"../../../src/assets/images/USDT Circular.png",
                    },
                    {
                      name: "Solana",
                      ticker: "SOL",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                      logo:"../../../src/assets/images/SOL Circular.png",
                    },
                  ].map((crypto, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    > 
                    <div className="flex gap-5">
                      <span>
                            <img
                              src={crypto.logo}
                              alt={`${prop2} logo`}
                              className="w-[48px] h-[48px]"
                            />
                          </span>
                        <div className="flex flex-col">
                          <span className="font-Inter font-semibold text-lg">
                            {crypto.name}
                          </span>
                          <span className="font-Inter block text-[16px] leading-[24px] text-[#545454]">
                            {crypto.ticker}
                          </span>
                        </div>
                    </div>

                      <div>
                        <span className="block text-right text-gray-500">
                          {crypto.price}
                        </span>
                        <span
                          className={`block text-right ${
                            crypto.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {crypto.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeCrypto;
