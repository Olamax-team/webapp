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
  const [prop1, setprop1] = useState("NGN");
  const [prop2, setprop2] = useState("BTC");

//   const toggleprop = () => {
//     setprop1((prev) => prop2);
//     setprop2((prev) => prop1);
//   };

  const renderContent = () => {
    switch (activeTab) {
      case "Buy & Sell Crypto":
        return (
          <>
            <div className="space-y-4">
              {/* Sub-Tabs for Buy and Sell */}
              <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
                <Button
                  variant={subTab === "Buy" ? "default" : "ghost"}
                  onClick={() => setSubTab("Buy")}
                  className={`p-5 ${
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
                  className={`pb-2 ${
                    subTab === "Sell"
                      ? "bg-bg hover:bg-bg text-primary"
                      : "text-[18px] leading-[27px] hover:none font-semibold"
                  }`}
                >
                  SELL
                </Button>
              </div>

              {/* First prop Input */}
              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div>
                  <p className="leading-[21px] text-[14px]">
                    You {subTab === "Buy" ? "Pay" : "Sell"}
                  </p>
                  <Input
                    placeholder="0.00"
                    className="bg-bg font-bold leading-[34.5px] text-[23px] border-none focus:outline-none appearance-none"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <img
                    src={`../../../src/assets/images/${prop1} Circular.png`}
                    alt={`${prop1} logo`}
                    className="w-[32px] h-[32px]"
                  />
                  <span className="text-sm leading-[24px] text-[16px] font-semibold">
                    {prop1}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["NGN", "USD", "EUR", "GBP"].map((prop) => (
                        <DropdownMenuItem
                          key={prop}
                          onClick={() => setprop1(prop)}
                        >
                          {prop}
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

              {/* Second prop Input */}
              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
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
            </div>
            <div className="flex justify-center items-center">
              <Button className="py-3 mt-6 bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
                {subTab}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-textDark">
              1 BTC = 116,377,572 Naira
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
                        className={`p-5 ${
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
                        className={`pb-2 ${
                        subTab === "FIAT"
                            ? "bg-bg hover:bg-bg text-primary"
                            : "text-[18px] leading-[27px] hover:none font-semibold"
                        }`}
                    >
                        FIAT
                    </Button>
                    </div>

                    {/* First prop Input */}
                    <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                    <div>
                        <p className="leading-[21px] text-[14px]">
                        You {subTab === "CRYPTO" ? "Pay" : "Receive"}
                        </p>
                        <Input
                        placeholder="0.00"
                        className="text-[23px] shadow-none bg-bg font-bold leading-[34.5px] border-none outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <img
                        src={`../../../src/assets/images/${prop1} Circular.png`}
                        alt={`${prop1} logo`}
                        className="w-[32px] h-[32px]"
                        />
                        <span className="text-sm leading-[24px] text-[16px] font-semibold">
                        {prop1}
                        </span>
                        <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select prop</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {["NGN", "USD", "EUR", "GBP"].map((prop) => (
                            <DropdownMenuItem
                                key={prop}
                                onClick={() => setprop1(prop)}
                            >
                                {prop}
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

                    {/* Second prop Input */}
                    <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                    <div>
                        <p className="text-sm">
                        You {subTab === "CRYPTO" ? "Receive" : "Pay"}
                        </p>
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
                            <DropdownMenuLabel>Select prop</DropdownMenuLabel>
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
                <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                  <div>
                      <p className="leading-[21px] text-[14px]">Pay {cat} Bill</p>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm leading-[24px] text-[16px] font-semibold">
                        {cat}
                        </span>
                        <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {["Electricity" ].map((prop) => (
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
                  src={`../../../src/assets/images/${prop1} Circular.png`}
                  alt={`${prop1} logo`}
                  className="w-[32px] h-[32px]"
                  />
                  <span className="text-sm leading-[24px] text-[16px] font-semibold">
                  {prop1}
                  </span>
                  <DropdownMenu>
                  <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>Select</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["NGN", "USD", "EUR", "GBP"].map((prop) => (
                      <DropdownMenuItem
                          key={prop}
                          onClick={() => setprop1(prop)}
                      >
                          {prop}
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
                      <DropdownMenuLabel>Select prop</DropdownMenuLabel>
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
          </div>
      <div className="flex justify-center items-center">
          <Button className="py-3 mt-6  bg-primary text-white rounded-lg text-[16px] leading-[24px] font-semibold sm:w-[150px] h-[54px]">
          Buy
          </Button>
      </div>
    </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative bg-bg overflow-hidden w-full h-[650px] mx-auto flex items-center justify-center">
      <div className="absolute top-[80px] w-[1085px] h-[584px]">
        <div className="flex space-x-4 relative h-[44px] w-[1085px] mx-auto justify-start">
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
            className={`pb-2 font-poppins text-[16px] leading-[24px] ${
              activeTab === "Bills & Payment" ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("Bills & Payment")}
          >
            Bills & Payment
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {/* Left Section */}
          <div className="w-[520px] h-[500px]">
            <Card className="rounded-lg">
              <CardHeader></CardHeader>
              <CardContent>{renderContent()}</CardContent>
            </Card>
          </div>
          {/* Right Section: Crypto Market Today */}
          <div className="flex space-x-4 relative my-auto">
            <Card className="w-[413px] h-[388px] bg-bg">
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
                    },
                    {
                      name: "Ethereum",
                      ticker: "ETH",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                    },
                    {
                      name: "Tether",
                      ticker: "USDT",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                    },
                    {
                      name: "Solana",
                      ticker: "SOL",
                      price: "$2,051,913.71",
                      change: "+0.05%",
                    },
                  ].map((crypto, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        <span className="font-Inter font-semibold text-lg">
                          {crypto.name}
                        </span>
                        <span className="font-Inter block text-[16px] leading-[24px] text-[#545454]">
                          {crypto.ticker}
                        </span>
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
