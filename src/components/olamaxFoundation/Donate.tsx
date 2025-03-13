import { FormEvent, useState } from "react";
import useDonateStore from "../../stores/donateStore";
import BTC from "../../assets/images/BTC Circular.png"
import ETH from "../../assets/images/ETH Circular.png";
import USDT from "../../assets/images/USDT Circular.png";
import SOL from "../../assets/images/SOL Circular.png";
import NGN from "../../assets/images/NGN Circular.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCryptoDonateModal, useFiatDonateModal } from "../../lib/utils";

const Donate = ()=> {
    const [paymentMethod, setPaymentMethod] = useState("Crypto");
    const [contact, setContact] = useState("");
    const [amount, setAmount] = useState<string>("");
    const [fiatType, setFiatType] = useState("NGN");
    const [cryptoType, setCryptoType] = useState("BTC");
    const [name, setName] = useState("");
    const donateDetails = useDonateStore();
    const coin = ["BTC", "ETH", "USDT", "SOL"]
    const logoMap: Record<string, string> = {
    BTC,
    ETH,
    SOL,
    USDT,
    NGN,
    };

    const openDonate = paymentMethod === "Crypto" ? useCryptoDonateModal() : useFiatDonateModal();

    const handleDonate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const donateData = {
        paymentMethod: paymentMethod,
        currency: paymentMethod === "Crypto" ? cryptoType : fiatType,
        amount: amount, 
        name: name,
        contact: contact,
    };
    donateDetails.setItem(donateData);
    openDonate.onOpen();
    console.log(donateData);

    }

    return (
        <>
        <div className="bg-white rounded-lg px-5 py-6 xl:px-[40px] xl:py-[30px] w-full font-Inter">
            <form  onSubmit={handleDonate}>
                <div className="">
                    <p className="font-bold text-[14px] leading-[21px] xl:text-[18px] xl:leading-[27px] font-DMSans">Donate Now!</p>
                </div>

                <div className="mt-6 xl:mt-8 space-y-3 xl:space-y-2">
                {/* Payment Method Selection */}
                    <div className="w-full px-4 py-2 rounded-md bg-[#F5F5F5] h-[60px] justify-center">
                        <select
                            value={paymentMethod}
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full mt-3 bg-[#F5F5F5] font-semibold xl:font-medium text-[12px] leading-[18px] xl:text-[16px] xl:leading-[24px]"
                        >
                            <option value="Crypto">Crypto</option>
                            <option value="Fiat">Fiat</option>
                        </select>
                    </div>
                    {/* Coin Selection */}
                    <div className="px-4 py-2 xl:py-4 rounded-md items-center h-[96px] bg-[#F5F5F5] w-full">
                        <p className="font-normal text-xs xl:text-sm">You Donate</p>
                        <div className="w-full flex items-end justify-between overflow-hidden">
                            <div className="w-1/2">
                                <Input
                                value={amount}
                                required
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="h-[35px] text-[18px] leading-[27px] bg-[#F5F5F5]  mt-0 xl:text-[23px] xl:leading-[34.5px] pl-0 shadow-none border-none rounded-none focus:outline-none font-bold"
                                />
                            </div>
                            <div className="flex w-1/2 items-end justify-end gap-1 font-Inter">
                                <img
                                src={logoMap[(paymentMethod === "Fiat" ? fiatType : cryptoType) as keyof typeof logoMap]}
                                alt={`${paymentMethod === "Fiat" ? fiatType : cryptoType} logo`}
                                className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                                />

                                <select
                                value={paymentMethod === "Crypto" ? cryptoType : fiatType}
                                required
                                onChange={(e) => paymentMethod === "Crypto" ? setCryptoType(e.target.value) : setFiatType(e.target.value)}
                                className="font-medium xl:text-[16px] xl:leading-[24px] mt-3 rounded-md bg-[#F5F5F5] px-2 py-1 text-base w-fit max-w-20"
                                >
                                {paymentMethod === "Crypto" ? (
                                    coin.map((prop) => (
                                        <option key={prop} value={prop}>
                                            {prop}
                                        </option>
                                    ))
                                ) : (
                                    <option value={fiatType}>NGN</option>
                                )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*Full Name Input */}
                    <div className="w-full">
                        <Input
                            required
                            placeholder = "Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#F5F5F5] font-semibold xl:font-medium text-[12px] leading-[18px] xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] shadow-none border-none focus:outline-none"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="">
                        <Input
                            type="tel"
                            required
                            placeholder="Email address / Phone Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="bg-[#F5F5F5] font-semibold xl:font-medium text-[12px] leading-[18px] xl:text-[16px] xl:leading-[24px] w-full px-4 py-2 rounded-md h-[60px] shadow-none border-none focus:outline-none"
                        />
                    </div>

                    {/* Donate Button */}
                    <div className="flex items-center justify-center ">
                        <Button 
                        type="submit"
                        onClick={() => {}}
                        className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px]  mt-4 bg-primary hover:bg-secondary text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] font-semibold text-white py-2 rounded-lg">
                        Donate
                        </Button>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};

export default Donate;