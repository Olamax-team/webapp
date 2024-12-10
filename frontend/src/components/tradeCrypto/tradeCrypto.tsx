import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "../ui/dropdown-menu";

const TradeCrypto = () => {
  const [activeTab, setActiveTab] = useState("Buy & Sell Crypto");
  const [subTab, setSubTab] = useState("BUY");

  const renderContent = () => {
    switch (activeTab) {
      case "Buy & Sell Crypto":
        return (
          <>
            <div className="space-y-4">
              {/* Sub-Tabs for Buy and Sell */}
              <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
                <Button
                  variant={subTab === "BUY" ? "default" : "ghost"}
                  onClick={() => setSubTab("BUY")}
                  className={`p-5 ${subTab === "BUY" ? "bg-bg hover:bg-bg text-primary font-semibold" : "text-[18px] leading-[27px] hover:none font-semibold"}`}
                >
                  BUY
                </Button>
                <Button
                  variant={subTab === "SELL" ? "default" : "ghost"}
                  onClick={() => setSubTab("SELL")}
                  className={`pb-2 ${subTab === "SELL" ? "bg-bg hover:bg-bg text-primary" : "text-[18px] leading-[27px] hover:none font-semibold"}`}
                >
                  SELL
                </Button>
              </div>

              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div>
                  <p className="leading-[21px] text-[14px]">You {subTab === "BUY" ? "Pay" : "Receive"}</p>
                  <Input
                    placeholder="0.00"
                    className="bg-bg font-bold leading-[34.5px] text-[23px] border-none focus:outline-none appearance-none"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                    <img 
                        src="../../../src/assets/images/Nigeria Circular.png"
                        alt="Nigeria circular logo"
                        className="w-[32px] h-[32px]"
                    />
                    <span className="text-sm leading-[24px] text-[16px] font-semibold">NGN</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Fiat</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>NGN</DropdownMenuItem>
                            <DropdownMenuItem>USD</DropdownMenuItem>
                            <DropdownMenuItem>EUR</DropdownMenuItem>
                            <DropdownMenuItem>GBP</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>

              <div className="flex justify-center font-bold text-primary my-2">
                <Button variant="ghost" size="icon">⇅</Button>
              </div>

              <div className="font-Inter flex items-center w-[440px] h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
                <div>
                  <p className="text-sm">You {subTab === "BUY" ? "Receive" : "Pay"}</p>
                  <Input
                    placeholder="0.00"
                    className="h-[35px] shadow-none bg-bg font-bold leading-[34.5px] text-[23px] border-none"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                    <img 
                        src="../../../src/assets/images/Nigeria Circular.png"
                        alt="Bitcoin circular logo"
                        className="w-[32px] h-[32px]"
                    />
                  <span className="text-sm leading-[24px] text-[16px] font-semibold">BTC</span>
                  <DropdownMenu>
                        <DropdownMenuTrigger>▼</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Fiat</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>NGN</DropdownMenuItem>
                            <DropdownMenuItem>USD</DropdownMenuItem>
                            <DropdownMenuItem>EUR</DropdownMenuItem>
                            <DropdownMenuItem>GBP</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
                <Button className="py-3 mt-6 bg-primary text-white rounded-md font-semibold sm:w-[150px] h-[54px]">
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
          <div className="space-y-4">
            <Input placeholder="Enter Phone Number" className="w-full" />
            <Input placeholder="Amount" className="w-full" />
            <Button className="w-full bg-primary text-white">Buy Airtime</Button>
          </div>
        );
      case "Bills & Payment":
        return (
          <div className="space-y-4">
            <Input placeholder="Enter Bill Details" className="w-full" />
            <Input placeholder="Amount" className="w-full" />
            <Button className="w-full bg-primary text-white">Pay Bill</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative bg-bg overflow-hidden w-[1440px] h-[650px] mx-auto border-2 flex items-center justify-center">
        <div className="absolute top-[80px] w-[1085px] h-[584px]">
        <div className="flex space-x-4 relative h-[44px] w-[1085px] mx-auto justify-start">
                <Button
                    variant="ghost"
                    className={`pb-2 font-poppins text-[16px] leading-[24px] ${activeTab === "Buy & Sell Crypto" ? "border-b-2" : ""}`}
                    onClick={() => setActiveTab("Buy & Sell Crypto")}
                >
                    Buy & Sell Crypto
                </Button>
                <Button
                    variant="ghost"
                    className={`pb-2 font-poppins text-[16px] leading-[24px] ${activeTab === "Airtime & Data" ? "border-b-2" : ""}`}
                    onClick={() => setActiveTab("Airtime & Data")}
                >
                    Airtime & Data
                </Button>
                <Button
                    variant="ghost"
                    className={`pb-2 font-poppins text-[16px] leading-[24px] ${activeTab === "Bills & Payment" ? "border-b-2" : ""}`}
                    onClick={() => setActiveTab("Bills & Payment")}
                >
                    Bills & Payment
                </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
            {/* Left Section */}
            <div className="w-[520px] h-[500px]">
                <Card className="rounded-lg">
                <CardHeader>
                </CardHeader>
                <CardContent>{renderContent()}</CardContent>
                </Card>
            </div>
            {/* Right Section: Crypto Market Today */}
            <div className="flex space-x-4 relative my-auto">
                <Card className="w-[413px] h-[388px] bg-bg">
                    <CardHeader>
                        <CardTitle className="font-DMSans text-[32px] leading-[48px]">Crypto Market Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-Inter space-y-4">
                        {[
                            { name: "BTC", price: "$2,051,913.71", change: "+0.05%" },
                            { name: "ETH", price: "$1,563,987.45", change: "+0.03%" },
                            { name: "USDT", price: "$1.00", change: "0.00%" },
                            { name: "SOL", price: "$75.23", change: "+0.07%" },
                        ].map((crypto, index) => (
                            <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-lg">{crypto.name}</span>
                            </div>
                            <div>
                                <span className="block text-right text-gray-500">{crypto.price}</span>
                                <span className={`block text-right ${crypto.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
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
