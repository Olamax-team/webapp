import { useCryptoPaymentDetailsModal, usePaymentConfirmationModal, useTransactionPendingModal,  } from '../../../lib/utils'
import qrCode from '../../../assets/images/QR.png'
import logo from '../../../assets/images/OLAMAX Logo 4.svg'
import { HiOutlineDuplicate } from 'react-icons/hi';
import useTradeStore from '../../../stores/tradeStore';
import UploadModal from '../../ui/upload-modal';
import { useCallback, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';
import { useToast } from '../../../hooks/use-toast';
import useBillsStore from '../../../stores/billsStore';

const CryptoPaymentDetailsModal = () => {
    const { isOpen, onClose } = useCryptoPaymentDetailsModal();
    const pending = useTransactionPendingModal();

    const { item } = useBillsStore();

    const [showModal, setShowModal] = useState(isOpen);
    const [open, setOpen] = useState(false)
    const closeModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
        onClose();
    }, 300)
    }, [onClose]);

    const tradeData = useTradeStore();

    const { toast } = useToast();

    const confirmDepositConfig = useApiConfig({
        method: 'post',
        url: 'confirm-deposited-address',
        formdata: {
            sellingId: tradeData.sellDetails?.sellingId,
        }
    }); 

    const confirmDeposit = async () => {
        await axios.request(confirmDepositConfig)
        .then((response) => {
            console.log(response);
          if (response.status === 200) {
            if (response.data.status === 'pending') {
                tradeData.setPendingDetails(response.data);
                onClose();
                pending.onOpen();
            } else {
                onClose();
                openPaymentConfirmation.onOpen();
            }
          }
        }).catch((error) => {
            if (error) {
                console.log(error);
                toast({
                  title: 'Error',
                  description: error.response.data.message || 'Something went wrong! Try again later',
                  variant: 'destructive'
                })
            }
        })
    };

    const completeBuyConfig = useApiConfig({
        method: 'post',
        url: 'complete-buy-order-transaction',
        formdata: {ref_number: tradeData.cryptoTradeDetails?.ref}
    });
    
      const completeBillConfig = useApiConfig({
        method: 'post',
        url: 'complete-bill-transaction',
        formdata: { ref_number: tradeData.cryptoTradeDetails?.ref}
      });

    const completeBuyTransaction = async () => {
        
    await axios.request(item?.bills === 'airtime' ? completeBillConfig :  item?.bills === 'data' ? completeBillConfig : item?.bills === 'cable' ? completeBillConfig : item?.bills === 'electricity' ? completeBillConfig : completeBuyConfig)
    .then((response) => {
        console.log(response)
        if (response.status === 200) {
        console.log(response.data)
        tradeData.clearAccountDetails();
        tradeData.clearItem();
        tradeData.clearTransactionId();
        tradeData.clearCryptoTradeDetails();
        onClose(); 
        openPaymentConfirmation.onOpen(); 
        } else {
        console.log('Error:', response.statusText);
        }
    }).catch((error:any) => {
        console.log(error);
        console.error(error);
        const errorMessage = error.response?.data?.message || error.response?.data?.[0]?.message || error.message || 'An unexpected error occurred.';
        toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
        });
    });
    }

    const Desktop = () => {
        return (
            <>
                <div className='flex bg-[#121826] p-6 gap-4 lg:hidden'>
                    <button className="w-full lg:hidden flex items-center justify-between text-white bg-[#121826]" onClick={() =>setOpen((state) =>!state)}>
                        <p className='font-poppins'>Information</p>
                        {open ? <ChevronUp className='size-5 lg:hidden'/> :<ChevronDown className='size-5 lg:hidden'/>}
                    </button>
                    <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                        <X className='lg:size-6 size-5'/>
                    </button>
                </div>
    
               <div className="hidden lg:block w-full h-full max-h-[720px]">           
                    <div className="flex flex-row h-full w-full">
                        {/* Left Side: Information Panel */}
                        <div className="bg-textDark text-white p-[42px] w-[40%] h-screen">
                            <h3 className="text-base font-poppins font-semibold mb-4">Information</h3>
                            <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal text-wrap">
                                <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
                                <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
                                <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
                                <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
                        </div>
                        </div>
                        {/* Right Panel */}
                        <div className='flex flex-col gap-5 w-[60%] justify-center items-center pb-9 -mt-16'>
                            <div className='w-full px-6 flex items-end justify-end'>
                            <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                                <X className='lg:size-6 size-5'/>
                            </button>
                            </div>
                        <div className="size-[150px] md:size-[200px] mx-auto">
                            <img src={qrCode} className='w-full h-full object-center'/>
                        </div>
                        {/* Bank Details */}
                        <div className="text-center">
                            {/* Bank Logo and Name */}
                            <div className="flex font-Inter items-center justify-center gap-6 mb-8">
                            <img src={logo} alt="Bank Logo" className="w-9 h-9" />
                            <p className='text-lg font-semibold'>OLAMAX EXCHANGE</p>
                            </div>
                            
                            {/* Account Details */}
                            <div className="px-5 py-[14px] font-Inter w-[360px] border rounded-md space-y-4">
                            <div className='space-y- border-b-2'>
                                <p className="text-sm text-left text-textDark">Wallet Address</p>
                                <span className="flex text-center justify-between gap-2 mb-4">
                                <p className="text-[14px] leading-[21px">{walletAdd}</p>
                                    <HiOutlineDuplicate 
                                    size={24}
                                    className='text-textDark cursor-pointer'
                                    onClick={copyToClipboard}/>
                                </span>
                            </div>
                            <div className='space-y-2'>
                                <p className="text-left mt-2 text-[14px] leading-[21px] text-textDark">Network</p>
                                <p className="text-left text-[14px] leading-[21px] uppercase">{coinNetwork}</p>
                            </div>
                            </div>
                        </div>
                        <div>
                            <button className='font-poppins w-[250px] h-[54px] rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={tradeData.isBill ? completeBuyTransaction : confirmDeposit }>
                            I Have Made Payment
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    const Mobile = () =>{
        return (
            <>
                {open ?
                <>
                <div className='lg:hidden block flex-col gap-8 w-full h-full'>
                    {/* Left Side: Information Panel */}
                    <div className="bg-textDark text-white p-[42px] w-full transition-all duration-300 h-full">
                        <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal text-wrap">
                            <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
                        </div>
                    </div>
                </div>
                </>:
                <>
                {/* Right Panel */}
                <div className='lg:hidden text-center block flex-col gap-5 w-full justify-center items-center pb-9 transition-all duration-300'>
                    <div className="size-[150px] md:size-[200px] mx-auto">
                        <img src={qrCode} className='w-full h-full object-center'/>
                    </div>
                    {/* Bank Details */}
                    <div className="text-center flex flex-col items-center justify-center">
                        {/* Bank Logo and Name */}
                        <div className="flex font-Inter items-center justify-center gap-6 mb-8">
                        <img src={logo} alt="Bank Logo" className="w-9 h-9" />
                        <p className='text-lg font-semibold'>OLAMAX EXCHANGE</p>
                        </div>
                        
                        {/* Account Details */}
                        <div className="px-5 py-[14px] font-Inter w-[360px] border rounded-md space-y-4">
                        <div className='space-y- border-b-2'>
                            <p className="text-sm text-left text-textDark">Wallet Address</p>
                            <span className="flex text-center justify-between gap-2 mb-4">
                            <p className="text-[14px] leading-[21px">{walletAdd}</p>
                                <HiOutlineDuplicate 
                                size={24}
                                className='text-textDark cursor-pointer'
                                onClick={copyToClipboard}/>
                            </span>
                        </div>
                        <div className='space-y-2'>
                            <p className="text-left mt-2 text-[14px] leading-[21px] text-textDark">Network</p>
                            <p className="text-left text-[14px] leading-[21px] uppercase">{coinNetwork}</p>
                        </div>
                        </div>
                    </div>
                    <div>
                        <button className='font-poppins w-[250px] h-[54px] rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={tradeData.isBill ? completeBuyTransaction :  confirmDeposit}>
                        I Have Made Payment
                        </button>
                    </div>
                </div>
                </>
                }
            </>
        )
    };

    const openPaymentConfirmation = usePaymentConfirmationModal();
    const coinNetwork = tradeData.isBill ? tradeData.cryptoTradeDetails?.network : tradeData.coinNetwork;
    const walletAdd = tradeData.isBill ? tradeData.cryptoTradeDetails?.address : tradeData.sellDetails?.address
  // Copy account number to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAdd ?? '');
        alert("Account number copied!");
    };

  return (
    <UploadModal
    isOpen={isOpen}
    modalSize='lg:max-w-[1000px] w-full max-w-[520px]'
    modalStyle='rounded-md'
    setShowModal={setShowModal}
    showModal={showModal}
    >
        <Desktop/>
        <Mobile/>
    </UploadModal>
  )
};

export default CryptoPaymentDetailsModal