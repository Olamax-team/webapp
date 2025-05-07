import React, { FormEvent, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import arrowIcon from '../../assets/images/arrowdown.svg';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiChevronDown } from "react-icons/hi";
import { Loader2 } from "lucide-react";
import { activityIndex } from "../../stores/generalStore";
import { useNavigate } from "react-router-dom";
import { useFetchStore } from "../../stores/fetch-store";
import useBillsStore from "../../stores/billsStore";

interface BillsPaymentProps {
    categories: string[]; // Categories to map for dropdown
    className?: string; // Additional class names for styling
};

type electricBranchProps = {
    electricity: string;
    product_number: number;
    abrv:string;
    icon: string;
}; 

type cableServicesProps = {
    cable: string;
    product_number: number;
    abrv: string;
    icon: string;
};

const BillsPayment: React.FC<BillsPaymentProps> = ({
    categories,
    className = "",
}) => {
    const { fetchAllCoinPrices, fetchBillServices, fetchAllBuyCoins, fetchStableCoins } = useFetchStore();

    const { data: stables } = useQuery({
        queryKey: ['stable-coins'],
        queryFn: fetchStableCoins
    });

    const { data:coin } = useQuery({
        queryKey: ['all-coins'],
        queryFn: fetchAllBuyCoins
    });
    
    const getCoinId = (coinCode: string): number | undefined => {
        if (coin) {
          return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
        }
        return undefined; // Explicitly return undefined if coin is not defined
      };    

    const { data:prices } = useQuery({
        queryKey: ['coin-prices'],
        queryFn: fetchAllCoinPrices
    });
    
    const getPrice = (coinCode: string) => {
        const id = getCoinId(coinCode);
        if (prices) {
            return prices.find(p => p.coin_id === id)?.selling;
        }
    };

    const getBuyingPrice = (coinCode: string) => {
        const id = getCoinId(coinCode);
        if (prices) {
            return prices.find(p => p.coin_id === id)?.buying;
        }
    };
    
    const fetchElectricBranches = async () => {
        const response = await axios.request({  
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.olamax.io/api/get-electricity-branches/electricity/postpaid',
            headers: {'Content-Type':'application/json'}
        });

        if (response.status !== 200) {
            throw new Error('Something went wrong, try again later');
        };
        const data = response.data.branches as electricBranchProps[];
        return data;
    };
    
    const fetchTvServices = async () => {
        const response = await axios.request({  method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.olamax.io/api/get-tv',
            headers: {'Content-Type':'application/json'}
        });
        
        if (response.status !== 200) {
            throw new Error('Something went wrong, try again later');
        }
        const data = response.data.cable as cableServicesProps[];
        return data;
    };

    const { data:billServices, status:billServiceStatus} = useQuery({
        queryKey: ['bills-service'],
        queryFn: fetchBillServices,
    });
    
    const { data:electicBranches, status:electricBranchesStatus} = useQuery({
        queryKey: ['electric-branches'],
        queryFn: fetchElectricBranches,
    });
    
    const { data:tvServices, status:tvServiceStatus } = useQuery({
        queryKey: ['tv-services'],
        queryFn: fetchTvServices,
    });

    const [cat, setCat] = useState<string>(categories[0] || "Electricity");
    // const [currency, setCurrency] = useState<string>(props2currency[0] || "BTC");

    const [prop1, setprop1] = useState("NGN");
    const [prop2, setprop2] = useState("BTC");
    const [amount1, setAmount1] = useState<string>("");
    const [amount2, setAmount2] = useState<string>("");

    const [subTab, setSubTab] = useState(billServices ? billServices[0].cs : 'fiat');
    const [selectedBranch, setSelectedBranch] = useState(electicBranches ? electicBranches[0].abrv : 'IBEDC');
    const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
    const [selectedTVNetwork, setSelectedTVNetwork] = useState(tvServices ? tvServices[0].abrv : 'DSTV');
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
    const billDetails = useBillsStore();
    const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);

    const price = React.useMemo(() => {
        if (subTab === 'crypto') {
            return getPrice(prop2);
        } else {
            return getBuyingPrice(prop2);
        }
    }, [subTab, prop1, prop2, prices, coin]);

    const navigate = useNavigate();

  const { setActive, setShowTransactionDetail, setSelectedBill } = activityIndex();

    useEffect(() => {
        if (lastChanged !== 'amount1') return;
        if (!amount1) {
            setAmount2("");
            return;
          }

        if (price) {
        let newAmount2 = '';
        if (subTab === "crypto") {
            newAmount2 = (parseFloat(amount1) / parseFloat(price)).toFixed(6); // NGN → crypto
        } else if (subTab === 'fiat') {
            newAmount2 = (parseFloat(amount1)).toFixed(2); // crypto → NGN
        }
        setAmount2(newAmount2);
        console.log('running');
        console.log(amount2);
        }
    }, [amount1, prop1, subTab, prices, lastChanged]);

    useEffect(() => {
    if (lastChanged !== 'amount2') return;
      if (!amount2) {
        setAmount1("");
        return;
      }
    if (price) {
        let newAmount1 = '';
        if (subTab === "crypto") {
        newAmount1 = (parseFloat(amount2) * parseFloat(price)).toFixed(2); // NGN → crypto
        } else if (subTab === 'fiat') {
        newAmount1 = (parseFloat(amount2)).toFixed(2); // crypto → NGN
        }
        setAmount1(newAmount1);
    }
    }, [amount2, prop2, subTab, prices, lastChanged]);

    const handleSelectBranchChange = (branch: string) => {
        setSelectedBranch(branch);
        setIsBranchDropdownOpen(false);
    };

    const handleSelectNetworkChange = (network: string) => {
        setSelectedTVNetwork(network);
        setIsNetworkDropdownOpen(false);
    };

    const handleBillPay = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const billData = {
            selectedNetwork:cat === 'Electricity' ?  selectedBranch : selectedTVNetwork ,
            selectPayment: subTab === "fiat" ? "": prop2,
            inputAmount: amount1,
            paymentAmount: amount2,
            fiatPayment:subTab === "fiat" ? prop1: "",
      
          };
          
          billDetails.setItem(billData);
        setActive(cat === 'Electricity' ? 2 : 3);
        navigate('/dashboard/bills_payment');
        setShowTransactionDetail(true);
        setSelectedBill(cat === 'Electricity' ? 'electricity': 'cabletv');
    }

return (
    <>
        <form  onSubmit={handleBillPay}>
            <div className={`border border-white w-full space-y-2 ${className}`}>

                <div>
                    <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
                        { billServices && billServices.length > 0 && billServices.map((item) => (
                            <button
                            key={item.cs}
                            type="button"
                            onClick={() => {setSubTab(item.cs)}}
                            className={`${item.act === 'off' && 'hidden'} mt-[30px] w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${subTab === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
                            >
                            {item.cs}
                            </button>
                        ))}
                    </div>
                </div>

                { billServiceStatus === 'success' && billServices && 
                    <React.Fragment>
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
                                        <option key={category} value={category} className="text-center">
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
                                        <div className="flex gap-2">
                                            <Input
                                            value={amount1}
                                            onChange={(e) => {setAmount1(e.target.value); setLastChanged('amount1');}}
                                            placeholder="0.00"
                                            className="flex-1 h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                                            />
                                            { cat === 'Electricity' ? 
                                                <div className="relative w-[135px] xl:w-[150px] flex-none">
                                                <div
                                                    className="flex-none cursor-pointer bg-inherit xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 xl:ml-4"
                                                    onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                                                >
                                                    <img
                                                    src={electicBranches && electicBranches.find(option => option.abrv === selectedBranch)?.icon}
                                                    alt={selectedBranch}
                                                    className="size-5 mr-1 rounded-full object-cover"
                                                    />
                                                    <span>{selectedBranch}</span>
                                                    <HiChevronDown   className="size-6"/>            
                                                </div>
                                                { isBranchDropdownOpen && (
                                                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                    { electicBranches && electicBranches.length > 0 && electicBranches.map((branch) => (
                                                        <div
                                                        key={branch.product_number}
                                                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleSelectBranchChange(branch.abrv)}
                                                        >
                                                        <img src={branch.icon} alt={branch.abrv} className="w-6 h-6 mr-2 rounded-full" />
                                                        <span>{branch.abrv}</span>
                                                        </div>
                                                    ))}
                                    
                                                    { electricBranchesStatus === 'pending' && (
                                                        <div className="flex items-center justify-center py-4">
                                                        <Loader2 className="animate-spin" />
                                                        </div>
                                                    )}
                                                    </div>
                                                )}
                                                </div> : 
                                                <div className="relative w-[135px] xl:w-[150px] flex-none">
                                                    <div
                                                        className="flex-none cursor-pointer bg-inherit xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 xl:ml-4"
                                                        onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                                                    >
                                                        <img
                                                        src={tvServices && tvServices.find(option => option.abrv === selectedTVNetwork)?.icon}
                                                        alt={selectedTVNetwork}
                                                        className="size-5 mr-1 rounded-full object-cover"
                                                        />
                                                        <span>{selectedTVNetwork}</span>
                                                        <HiChevronDown   className="size-6"/>            
                                                    </div>
                                                    { isNetworkDropdownOpen && (
                                                        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                        { tvServices && tvServices.length > 0 && tvServices.map((network) => (
                                                            <div
                                                            key={network.product_number}
                                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleSelectNetworkChange(network.abrv)}
                                                            >
                                                            <img src={network.icon} alt={network.abrv} className="w-6 h-6 mr-2 rounded-full" />
                                                            <span>{network.abrv}</span>
                                                            </div>
                                                        ))}
                                        
                                                        { tvServiceStatus === 'pending' && (
                                                            <div className="flex items-center justify-center py-4">
                                                            <Loader2 className="animate-spin" />
                                                            </div>
                                                        )}
                                                        </div>
                                                    )}
                                                </div>
                                            }
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
                                            onChange={(e) => {setAmount2(e.target.value); setLastChanged('amount2');}}
                                            placeholder="0.00"
                                            className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold"
                                            />
                                            <div className="flex items-center justify-end gap-1 font-Inter">
                                                <img
                                                    src={(subTab === "crypto" ? `${(coin ?? []).find(option => option.coin === prop2)?.icon}` : `${(stables ?? []).find(option => option.coin === prop1)?.icon}`)}
                                                    alt={`${
                                                    subTab === "crypto" ? prop2 : prop1
                                                    } logo`}
                                                    className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
                                                />
                                                <select
                                                    value={subTab === "crypto" ? prop2 : prop1}
                                                    onChange={(e) =>
                                                        subTab === "crypto"
                                                            ? setprop2(e.target.value)
                                                            : setprop1(e.target.value)
                                                        }
                                                    className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
                                                >
                                                    {subTab === "crypto" ? 
                                                        coin && coin.length> 0 && coin.map((c) => (
                                                        <option key={c.id} value={c.coin} className="p-1">
                                                        {c.coin}
                                                        </option>
                                                    )): (stables && stables.length > 0 && stables.map((s) => (
                                                        <option key={s.id} value={s.coin} className="p-1">
                                                            {s.coin}
                                                        </option>
                                                        ))
                                                    )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                }

                { billServiceStatus === 'pending' && 
                    <div className="flex justify-center items-center mt-5">
                    <Loader2 className="animate-spin"/>
                    </div>
                }

                {/* Button */}
                <div className="flex justify-center items-center">
                    <Button className="py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                        Buy
                    </Button>
                </div>

            </div>
        </form>
    </>
);
};

export default BillsPayment;
