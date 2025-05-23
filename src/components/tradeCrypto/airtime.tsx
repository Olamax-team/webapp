// import React, { FormEvent, useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { HiChevronDown } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";
// import { activityIndex } from "../../stores/generalStore";
// import { useFetchStore } from "../../stores/fetch-store";
// import useBillsStore from "../../stores/billsStore";
// import useUserDetails from "../../stores/userStore";
// import axios from "axios";
// import { cn } from "../../lib/utils";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { formValidationSchema } from "../formValidation/formValidation";


// interface airtimePaymentProps {
//   className?: string; // Editable className prop
//   airtimeOptions: string[];
// };
// type Inputs = {
//   inputAmount: string;
//   paymentAmount: string;
//   selectPayment: string;
//   selectedNetwork:string;
//   fiatPayment:string;
// };
// type dataPackageProps = {
//   payment_item_name: string;
//   product_number: string;
//   amount: number
// };

// type airtimeNetworkProps = {
//   network: string;
//   product_number: number;
//   icon: string;
// };

// const AirtimePayment: React.FC<airtimePaymentProps> = ({
//   className,
//   airtimeOptions,
// }) => {
//     const { user } = useUserDetails();

//   const { fetchBillServices, fetchNetworkAirtime, fetchDataPurchaseNetworks, fetchAllCoinPrices, fetchStableCoins, fetchAllCoins } = useFetchStore();

//   const { data: stables } = useQuery({
//     queryKey: ['stable-coins'],
//     queryFn: fetchStableCoins
//   })

//   const { data:networkOptionsList, status:networkOptionStatus} = useQuery({
//     queryKey: ['data-networks'],
//     queryFn: fetchDataPurchaseNetworks,
//   });
//   console.log(networkOptionsList)

//   const { data:coin } = useQuery({
//     queryKey: ['all-coins'],
//     queryFn: fetchAllCoins
//   })
  
//   const getCoinId = (coinCode: string): number | undefined => {
//     if (coin) {
//       return coin.find(c => c.coin === coinCode)?.id; // Return undefined if not found
//     }
//     return undefined; // Explicitly return undefined if coin is not defined
//   };

//   const { data:prices } = useQuery({
//     queryKey: ['coin-prices'],
//     queryFn: fetchAllCoinPrices
//   });
  
//   const getPrice = (coinCode: string) => {
//     const id = getCoinId(coinCode);
//     if (prices) {
//       return prices.find(p => p.coin_id === id)?.selling;
//     }
//   };

//   const getBuyingPrice = (coinCode: string) => {
//     const id = getCoinId(coinCode);
//     if (prices) {
//       return prices.find(p => p.coin_id === id)?.buying;
//     }
//   };

//   const { data:billServices, status:billServiceStatus} = useQuery({
//     queryKey: ['bills-service'],
//     queryFn: fetchBillServices,
//   });

//   const { data:airtimeNetworks, status:airtimeNetworkStatus } = useQuery({
//     queryKey: ['airtime-networks'],
//     queryFn: fetchNetworkAirtime,
//   });

//   const { setActive, setShowTransactionDetail, setSelectedBill } = activityIndex();

//   const [cat0, setCat0] = useState("Airtime");  
//   const [subTab, setSubTab] = useState(billServices ? billServices[0].cs : 'fiat');
//   const [selectedNetwork, setSelectedNetwork] = useState(networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList[0].network : 'MTN');
//   const [selectedNetworkDetails, setSelectedNetworkDetails] = useState<airtimeNetworkProps | undefined>(() => networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList[0] : undefined);
//     // const [selectedNetwork, setSelectedNetwork] = useState(airtimeNetworks ? airtimeNetworks[0].network : 'MTN');
//   const [isNetworkDataPackageOpen, setIsNetworkDataPackageOpen] = useState(false);
//   const [prop1, setprop1] = useState("NGN");
//   const [prop2, setprop2] = useState("BTC");
//   const [amount1, setAmount1] = useState<string>("");
//   const [amount2, setAmount2] = useState<string>("");
//   const [lastChanged, setLastChanged] = useState<'amount1' | 'amount2' | null>(null);
//   const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
//   const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
//   const airtimeDetails = useBillsStore();
//   const dataDetails = useBillsStore();

//   const fetchDataPackages = async () => {
//     const response = await axios.request({
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: `https://api.olamax.io/api/subscription-packages/${selectedNetworkDetails?.product_number}`,
//       headers: {'Content-Type':'application/json'}
//     });
//     if (response.status !== 200) {
//       throw new Error('Something went wrong, try again later');
//     }
//     const data = response.data.prices as dataPackageProps[];
//     return data;
//   }

//   const { data:dataPackages, status:dataPackageStatus} = useQuery({
//     queryKey: ['data-packages', selectedNetwork, selectedNetworkDetails?.product_number],
//     queryFn: fetchDataPackages,
//     enabled: selectedNetworkDetails && selectedNetworkDetails.product_number !== 0
//   });

//   const [selectedPackage, setSelectedPackage] = useState('');
//   const [selectedPackageDetails, setSelectedPackageDetails] = useState<dataPackageProps | undefined>(undefined);

//   const isReadyAndAvailable = dataPackageStatus === 'success' && dataPackages.length > 0;
    
//   const price = React.useMemo(() => {
//     if (subTab === 'crypto') {
//       return getPrice(prop2);
//     } else {
//       return getBuyingPrice(prop2);
//     }
//   }, [subTab, prop1, prop2, prices, coin]);

//   const handleSelectPackage = (package_name: dataPackageProps) => {
//     setSelectedPackage(package_name.payment_item_name);
//     setSelectedPackageDetails(package_name);
//     if (subTab === 'fiat') {
//       setAmount2(package_name.amount.toString())
//     } else {
//       setAmount2((package_name.amount / 1000).toFixed(6))
//     }
//     setAmount1(package_name.payment_item_name);
//     setIsNetworkDataPackageOpen(false);
//   };
//   console.log(selectedPackageDetails);

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
//     resolver: zodResolver(formValidationSchema), 
//     defaultValues: {
//       inputAmount: "",
//       paymentAmount: "",
//     }
//   });

//   useEffect(() => {
//     if (subTab==="data" && dataPackageStatus === 'success' && dataPackages && dataPackages.length > 0) {
//       setSelectedPackage(dataPackages[0].payment_item_name);
//       setSelectedPackageDetails(dataPackages[0]);
//       setAmount1(dataPackages[0].payment_item_name);
//       setValue('inputAmount', dataPackages[0].payment_item_name);
//       if (subTab === 'data') {
//         setAmount2((dataPackages[0].amount / 1000).toFixed(6))
//         setValue('paymentAmount', (dataPackages[0].amount / 1000).toFixed(6))
//       } else {
//         setAmount2(dataPackages[0].amount.toString())
//         setValue('paymentAmount', dataPackages[0].amount.toString())
//       }
//     } else {
//       setSelectedPackage('Package Loading...')
//     }
//   }, [dataPackageStatus, dataPackages, subTab])
// //autofill for both inputs
//   useEffect(() => {
//       if (lastChanged !== 'amount1') return;
//       if (!amount1) {
//         setAmount2("");
//         return;
//       }
//       if (price) {
//         let newAmount2 = '';
//         if (subTab === "crypto") {
//           newAmount2 = amount1 ? (parseFloat(amount1) / parseFloat(price)).toFixed(6) : "0.00000"; // NGN → crypto
//         } else if (subTab === 'fiat') {
//           newAmount2 = amount1 ? (parseFloat(amount1)).toFixed(2) : "0.00"; // crypto → NGN
//         }
//         setAmount2(newAmount2);
//       }
//     }, [amount1, prop1, subTab, prices, lastChanged]);
  
//   useEffect(() => {
//     if (lastChanged !== 'amount2') return;
//     if (!amount2) {
//       setAmount1("");
//       return;
//     }
//     if (price) {
//       let newAmount1 = '';
//       if (subTab === "crypto") {
//         newAmount1 = amount2 ? (parseFloat(amount2) * parseFloat(price)).toFixed(2): "0.00000"; // NGN → crypto
//       } else if (subTab === 'fiat') {
//         newAmount1 = amount2 ? (parseFloat(amount2)).toFixed(2) : "0.00"; // crypto → NGN
//       }
//       setAmount1(newAmount1);
//     }
//   }, [amount2, prop2, subTab, prices, lastChanged]);

//   const navigate = useNavigate();

//   const handleSelectChange = (network: airtimeNetworkProps) => {
//     setSelectedNetwork(network.network);
//     setSelectedNetworkDetails(network);
//     setIsNetworkDropdownOpen(false);
//   };

//   const onSubmit: SubmitHandler<Inputs> = (data) => {

//     const dataData = {...data,
//       selectedNetwork: selectedNetwork,
//       selectPayment: subTab === "fiat" ? "": prop2,
//       inputAmount: amount1,
//       paymentAmount: amount2,
//       fiatPayment:subTab === "fiat" ? prop1: "",

//     };
//     setShowTransactionDetail(true); 
//     setSelectedBill('data');
//     dataDetails.setItem(dataData);
//   };

//   const handleBuyClick = ( event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!user) {
//       navigate("/log-in"); // Redirect to login if not logged in
//       return;
//     };
  
//     const airtimeData = {
//       selectedNetwork: selectedNetwork,
//       selectPayment: subTab === "fiat" ? "": prop2,
//       inputAmount: amount1,
//       paymentAmount: amount2,
//       fiatPayment:subTab === "fiat" ? prop1: "",

//     };
    
//     airtimeDetails.setItem(airtimeData);

//     setActive(cat0 === 'Airtime' ? 0 : 1);
//     navigate('/dashboard/bills_payment');
//     setShowTransactionDetail(true);
//     setSelectedBill(cat0 === 'Airtime' ? 'airtime' : 'data');
//   };

//   return (
//     <>
//     {cat0 === "Data" ? (
//       <>
//       <form onSubmit={handleSubmit(onSubmit)} >

//       <div className="flex gap-5 items-center">
//         { billServices && billServices.length > 0 && billServices.map((item) => (
//           <button
//             key={item.cs}
//             type="button"
//             onClick={() => setSubTab(item.cs)}
//             className={`${item.act === 'off' && 'hidden'} w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${subTab === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
//           >
//             {item.cs}
//           </button>

//         ))}
//       </div>

//       { billServiceStatus === 'success' && billServices && billServices.length > 0 && 
//         <React.Fragment>
//           <div className="flex bg-[#f5f5f5] w-full xl:-h-[60px] h-[48px] rounded-sm mt-5 items-center">
//             <h3 className="px-3 py-2" >Data Purchase</h3>
//           </div>
//           <div className="w-full h-[64px] rounded-sm bg-[#f5f5f5] mt-3 xl:h-[96px]">
//             <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px]  xl:mt-[8px] xl:p-3  xl:leading-[21px]">Select plan</label>
//             <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px] px-3 py-2 leading-[18px]">You Pay</label>
//             <div className="flex justify-between px-3 gap-1">
//               <div className="relative flex-1">
//                 <div
//                   className="cursor-pointer bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[120px] h-[25px] xl:w-full xl:h-[32px] rounded-sm flex items-center justify-between focus:outline-none focus:ring-0 p-1"
//                   onClick={() => setIsNetworkDataPackageOpen(!isNetworkDataPackageOpen)}
//                 >
//                   <span>{dataPackageStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedPackage}</span>
//                   <HiChevronDown   className="size-6"/>             
//                 </div>

//                 { isNetworkDataPackageOpen && (
//                   <div className={cn("absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1", isReadyAndAvailable ? 'h-[250px] overflow-y-auto' : 'h-[70px]')}>
//                     { dataPackages && dataPackages.length > 0 && dataPackages.map((dataPackage) => (
//                       <div
//                         key={dataPackage.product_number}
//                         className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
//                         onClick={() => handleSelectPackage(dataPackage)}
//                       >
//                         <span>{dataPackage.payment_item_name}</span>
//                       </div>
//                     ))}
//                     { dataPackageStatus === 'pending' && (
//                       <div className="flex items-center justify-center py-4">
//                         <Loader2 className="animate-spin" />
//                       </div>
//                     )}
//                     { dataPackageStatus === 'success' && dataPackages.length < 1 && (
//                       <div className="flex items-center justify-center py-4">
//                         <p>DataPackages not available</p>
//                       </div>
//                     )}
//                     { dataPackageStatus === 'error' && (
//                       <div className="flex items-center justify-center w-full h-full px-2">
//                         <p>Error occured while loading data packages. Try again later.</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="relative">
//                 <div
//                   className="cursor-pointer   bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[120px] h-[25px] xl:w-[110px] xl:h-[32px] border border-none rounded-sm flex items-center justify-between  focus:outline-none focus:ring-0   "
//                   onClick={() => {setIsNetworkDropdownOpen(!isNetworkDropdownOpen); setIsNetworkDataPackageOpen(false)}}
//                 >
//                   <img
//                     src={networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList.find(option => option.network === selectedNetwork)?.icon : '/images/MTN Circular.png'}
//                     alt={selectedNetwork}
//                     className="size-6 mr-2 rounded-full"
//                   />
//                   <span>{networkOptionStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedNetwork}</span>
//                   <HiChevronDown   className="size-6"/>             
//                 </div>

//                 { isNetworkDropdownOpen && (
//                   <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
//                     { networkOptionsList && networkOptionsList.length > 0 && networkOptionsList.map((network) => (
//                       <div
//                         key={network.product_number}
//                         className="flex items-center p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
//                         onClick={() => handleSelectChange(network)}
//                       >
//                         <img src={network.icon} alt={network.network} className=" size-6 mr-2 rounded-full" />
//                         <span>{network.network}</span>
//                       </div>
//                     ))}
//                     { networkOptionStatus === 'pending' && (
//                       <div className="flex items-center justify-center py-4">
//                         <Loader2 className="animate-spin" />
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {errors.inputAmount && <p className="text-red-500 text-xs">{errors.inputAmount?.message}</p>}

//           <div className=" flex justify-center  items-center m-5 ">
//             <img src={'/images/arrowdown.svg'} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] xl:w-[32px] xl:h-[32px]" />
//           </div>

//           <div className="w-full h-[64px] rounded-sm bg-[#f5f5f5]   xl:h-[96px] mt-5">
//           <label htmlFor="payment" className="hidden xl:block font-Inter text-[#121826] xl:font-normal xl:text-[14px] xl:mt-5  xl:p-3  xl:leading-[21px]">You Pay</label>
//           <label htmlFor="payment" className=" block xl:hidden  text-[#121826] font-Inter text-[12px] px-3 py-2  leading-[18px]">You Recieve</label>

//             <div className="flex justify-between px-3 ">
//             <input
//                 {...register("paymentAmount")}
//                 type="text"
//                 placeholder="0.00000078"
//                 className="xl:w-[143px] w-[100px]  h-[25px] leading-[27px]  mt-0 text-[16px]   xl:h-[32px]  xl:text-[18px] text-[#121826] bg-[#f5f5f5] border-none rounded-none focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
//                 />

//             <div className="relative">
//                 <div
//                   className="cursor-pointer bg-[#f5f5f5] xl:text-[16px] text-[13px] leading-[19.5px] text-[#212121] w-[100px] h-[25px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0"
//                   onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
//                 >
//                   { subTab === 'crypto' ? (
//                     <>
//                       <img
//                         src={coin && coin.length > 0 ? coin.find(option => option.coin === prop2)?.icon: '/images/MTN Circular.png'}
//                         alt={prop2}
//                         className="size-6 mr-2"
//                       />
//                       <span>{prop2}</span>
//                     </>
//                   ) : (
//                     <>
//                       <img
//                         src={stables && stables.length > 0 ? stables.find(option => option.coin === prop1)?.icon : '/images/MTN Circular.png'}
//                         alt={prop1}
//                         className="size-6 mr-2"
//                       />
//                       <span>{prop1}</span>
//                     </>
//                   )}
//                   <HiChevronDown className="size-6" />
//                 </div>

//                 {isPaymentDropdownOpen && (
//                   <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-1">
//                     {subTab === 'crypto' ? (
//                       coin && coin.length > 0 && coin.map((payment) => (
//                         <div
//                           key={payment.id}
//                           className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
//                           onClick={() => setprop2(payment.coin)}
//                         >
//                           <img src={payment.icon} alt={payment.coin} className="size-6 mr-2" />
//                           <span>{payment.coin}</span>
//                         </div>
//                       ))
//                     ) : (
//                       stables && stables.length > 0 && stables.map((payment) => (
//                         <div
//                           key={payment.id}
//                           className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
//                           onClick={() => setprop2(payment.coin)}
//                         >
//                           <img src={payment.icon} alt={payment.coin} className="size-6 mr-2" />
//                           <span>{payment.coin}</span>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {errors.paymentAmount && <p className="text-red-500 text-xs">{errors.paymentAmount?.message}</p>}
//         </React.Fragment>
//       }

//       { billServiceStatus === 'pending' && 
//         <div className="flex justify-center items-center mt-5">
//           <Loader2 className="animate-spin"/>
//         </div>
//       }

//       <div className="flex items-center justify-center mt-10">
//         <button type="submit"
          
//           className="xl:w-[150px] w-[96px] h-[38px] rounded-sm text-[13px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]"
//         >
//           Buy
//         </button>
//       </div>
//       </form>
//       </>
//     ):(
//     <>
//     <form  onSubmit={handleBuyClick} >
//       <div className={`space-y-2 w-full ${className || ""}`}>
//         {/* Sub-Tabs */}
//         <div className="mb-4">
//           <div className="font-poppins flex justify-start space-x-4 text-[16px] leading-[24px] text-textDark">
//           { billServices && billServices.length > 0 && billServices.map((item) => (
//             <button
//               key={item.cs}
//               type="button"
//               onClick={() => {setSubTab(item.cs)}}
//               className={`${item.act === 'off' && 'hidden'} mt-[30px] w-[60px] xl:w-[80px] xl:h-[44px] h-[32px] rounded-md font-poppins font-semibold text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] p-5 items-center justify-center flex uppercase ${subTab === item.cs ? 'bg-[#f5f5f5] text-[#039AE4]' : 'bg-transparent text-[#121826]'}`}
//             >
//               {item.cs}
//             </button>
//           ))}
//           </div>
//         </div>
//         { billServiceStatus === 'success' && billServices &&
//           <React.Fragment>
//             {/* Airtime Dropdown */}
//             <div className="flex justify-center space-x-4">
//               <div className="font-Inter flex items-center w-full h-[60px] justify-between bg-bg p-3 rounded-md text-textDark">
//                 <p className="leading-[18px] font-[500] text-[12px] xl:leading-[21px] xl:text-[14px]">
//                   {cat0}
//                 </p>
//                 <select
//                   value={cat0}
//                   onChange={(e) => setCat0(e.target.value)}
//                   className="ml-auto p-2 bg-bg text-textDark rounded-md text-right"
//                 >
//                   {airtimeOptions.map((prop) => (
//                   <option key={prop} value={prop} className="text-center">
//                     {prop}
//                   </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               {/* Airtime Input */}
//               <div className="flex justify-center space-x-4">
//                 <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
//                   <div className="w-full">
//                       <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
//                         {cat0 === "Data" ? "Select Plan" : "Airtime Amount"}
//                       </p>
//                       <div className="flex gap-2">                     
//                         <Input
//                         value={amount1}
//                         onChange={(e) => {setAmount1(e.target.value); setLastChanged('amount1');}}
//                         placeholder="airtime amount"
//                         className="flex-1 h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold placeholder:font-normal placeholder:text-gray-400"
//                       />
//                         <div className="relative w-[135px] xl:w-[150px] flex-none">
//                           <div
//                             className="flex-none cursor-pointer bg-inherit xl:text-[16px] text-[13px] leading-[19.5px] text-[#121826] w-[120px] h-[25px] xl:w-[135px] xl:h-[32px] border border-none rounded-sm flex items-center justify-center focus:outline-none focus:ring-0 xl:ml-4"
//                             onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
//                           >
//                             <img
//                               src={networkOptionsList && networkOptionsList.length > 0 ? networkOptionsList.find(option => option.network === selectedNetwork)?.icon : '/images/MTN Circular.png'}
//                               alt={selectedNetwork}
//                               className="size-6 mr-2 rounded-full"
//                             />
//                             {/* <img
//                               src={airtimeNetworks ? airtimeNetworks.find(option => option.network === selectedNetwork)?.icon : `/images/${selectedNetwork} Circular.png` }
//                               alt={selectedNetwork}
//                               className="size-5 mr-1 rounded-full object-cover"
//                             /> */}
//                             <span>{networkOptionStatus === 'pending' ? <Loader2 className="animate-spin"/> : selectedNetwork}</span>
//                             <HiChevronDown   className="size-6"/>            
//                           </div>
//                           { isNetworkDropdownOpen && (
//                             <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//                               { airtimeNetworks && airtimeNetworks.length > 0 && airtimeNetworks.map((network) => (
//                                 <div
//                                   key={network.product_number}
//                                   className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
//                                   onClick={() => handleSelectChange(network)}
//                                 >
//                                   <img src={network.icon} alt={network.network} className="w-6 h-6 mr-2 rounded-full" />
//                                   <span>{network.network}</span>
//                                 </div>
//                               ))}
            
//                               { airtimeNetworkStatus === 'pending' && (
//                                 <div className="flex items-center justify-center py-4">
//                                   <Loader2 className="animate-spin" />
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Switch Icon */}
//               <div className="flex justify-center font-bold text-primary my-2">
//                 <img src={'/images/arrowdown.svg'} alt="Arrow" className="w-[25.6px] h-[22.4px]   text-[#039AE4] lg:w-[32px] lg:h-[32px]" />
//               </div>
//               {/* Payment Input */}
//               <div className="flex justify-center space-x-4">
//                 <div className="font-Inter flex items-center w-full h-[64px] xl:h-[96px] justify-between bg-bg p-3 rounded-md text-textDark">
//                   <div className="w-full">
//                       <p className="leading-[18px] text-[12px] xl:leading-[21px] xl:text-[14px]">
//                       You Pay
//                       </p>
//                       <div className="grid grid-cols-2">
//                         <Input
//                           value={amount2}
//                           onChange={(e) => {setAmount2(e.target.value); setLastChanged('amount2');}}
//                           placeholder="payment amount"
//                           className="h-[35px] leading-[27px]  mt-0 text-[16px] xl:text-[18px] xl:leading-[34.5px] pl-0 shadow-none bg-bg border-none rounded-none focus:outline-none font-bold placeholder:font-normal placeholder:text-gray-400"
//                         />
//                           <div className="flex items-center justify-end font-Inter">
//                           <img
//                               src={(subTab === "crypto" ? `${coin?.find(option => option.coin === prop2)?.icon ?? ''}` : `${stables?.find(option => option.coin === prop1)?.icon ?? ''}`)}
//                               alt={`${
//                               subTab === "crypto" ? prop2 : prop1
//                               } logo`}
//                               className="w-[24px] xl:w-[32px] h-[24px] xl:h-[32px]"
//                           />
//                           <select
//                             value={subTab === "crypto" ? prop2 : prop1}
//                             onChange={(e) =>
//                             subTab === "crypto" ? setprop2(e.target.value) : setprop1(e.target.value)}
//                             className="rounded-md bg-bg px-2 py-1 w-fit font-medium text-base max-w-20"
//                           >
//                               {subTab === "crypto" ? 
//                                 coin && coin.length > 0 && coin.map((c) => (
//                                 <option key={c.id} value={c.coin} className="p-1">
//                                   {c.coin}
//                                 </option>
//                               )): (stables && stables.length > 0 && stables.map((s) => (
//                                   <option key={s.id} value={s.coin} className="p-1">
//                                     {s.coin}
//                                   </option>
//                                 ))
//                               )
//                               }
//                           </select>
//                           </div>
//                       </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </React.Fragment> 
//         }
//         { billServiceStatus === 'pending' && 
//           <div className="flex justify-center items-center mt-5">
//             <Loader2 className="animate-spin"/>
//           </div>
//         }
//         {/* Buy Button */}
//         <div className="flex justify-center items-center">
//           <Button 
//           type="submit"
//           className="font-Inter xl:font-poppins py-3 mt-4 xl:mt-6 bg-primary hover:bg-secondary text-white rounded-lg text-[16px] leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
//               Buy
//           </Button>
//         </div>
//       </div>
//     </form>
//     </>
//     )}
//     </>

//   );
// };

// export default AirtimePayment;
