import { usePaymentConfirmationModal, useFiatPaymentDetailsModal } from '../../../lib/utils';
import qrCode from '../../../assets/images/QR.png';
import logo from '../../../assets/images/GTCO.svg';
import { HiOutlineDuplicate } from 'react-icons/hi';
import useTradeStore from '../../../stores/tradeStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';
import { useToast } from '../../../hooks/use-toast';
import React from 'react';
import UploadModal from '../../ui/upload-modal';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const FiatPaymentDetailsModal = () => {
  const { isOpen, onClose } = useFiatPaymentDetailsModal();
  const [showModal, setShowModal] = React.useState(isOpen);

  const [open, setOpen] = React.useState(false)

  const closeModal = React.useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose]);

  const openPaymentConfirmation = usePaymentConfirmationModal();

  // Copy account number to clipboard
  const copyToClipboard = (accountNumber:string) => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied!");
  };
  const Desktop = () => {
      return(
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
              <div className='flex flex-row w-full h-full'>
              {/* Left Section: Information Panel */}
                <div className={`bg-textDark text-white p-[42px] w-[40%] transition-all duration-300 h-screen`}>
                    <h3 className="text-base font-poppins font-semibold mb-4">Information</h3>
                    <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal">
                    <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
                    <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
                    <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
                    <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
                    </div>
                </div>

              {/* Right Section: Payment Details */}
                <div className={`flex flex-col gap-5 md:w-[60%] w-full justify-center items-center pb-9 transition-all duration-300 md:-mt-16`}>
                    <div className='w-full px-6 flex items-end justify-end'>
                      <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                        <X className='lg:size-6 size-5'/>
                      </button>
                    </div>

                    <div className="size-[150px] md:size-[200px] mx-auto">
                    <img src={qrCode} className="w-full h-full object-center"/>
                    </div>

                    {/* Bank Details */}
                    <div className="text-center">
                    {/* Bank Logo and Name */}
                    <div className="flex font-Inter items-center justify-center gap-6 mb-8">
                        <img src={logo} alt="Bank Logo" className="w-9 h-9" />
                        <p className="text-lg font-semibold">{accountDetails?.bank}</p>
                    </div>
                    
                    {/* Account Details */}
                    <div className="px-5 py-[14px] font-Inter w-[360px] border rounded-md space-y-4">
                        <div className="space-y- border-b-2">
                        <p className="text-sm text-left text-textDark">Account Number</p>
                        <span className="flex text-center justify-between gap-2 mb-4">
                            <p className="text-[14px] leading-[21px]">{accountDetails?.bank_account}</p>
                            <HiOutlineDuplicate 
                            size={24}
                            className="text-textDark cursor-pointer"
                            onClick={() => copyToClipboard(accountDetails?.bank_account ?? '')}
                            />
                        </span>
                        </div>
                        <div className="space-y-2">
                        <p className="text-left mt-2 text-[14px] leading-[21px] text-textDark">Account Name</p>
                        <p className="text-left text-[14px] leading-[21px]">{accountDetails?.bank_account_name}</p>
                        </div>
                    </div>
                    </div>

                    {/* Payment Confirmation Button */}
                    <div>
                    <button 
                        className="font-poppins w-[250px] h-[54px] rounded-lg bg-primary hover:bg-secondary text-white mt-6"
                        onClick={() => completeBuyTransaction()}
                    >
                        I Have Made Payment
                    </button>
                    </div>
                </div>
              </div>

            </div>
          </>
      )
  };

  const Mobile = () => {
      return (
          <>
              {open ?
              <>     
                  <div className='lg:hidden block flex-col gap-8 w-full h-full'>
                      {/* Left Section: Information Panel */}
                      <div className={`bg-textDark text-white p-[42px] w-full transition-all duration-300 h-full`}>
                          <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal">
                            <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
                            <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
                          </div>
                      </div>
                  </div>
              </> : 
              <>
              {/* Right Section: Payment Details */}
              <div className={`lg:hidden block text-center flex-col gap-5 w-full justify-center items-center pb-9 transition-all duration-300`}>
                      <div className="size-[150px] md:size-[200px] mx-auto">
                      <img src={qrCode} className="w-full h-full object-center"/>
                      </div>

                      {/* Bank Details */}
                      <div className="text-center flex flex-col items-center justify-center">
                      {/* Bank Logo and Name */}
                      <div className="flex font-Inter items-center justify-center gap-6 mb-8">
                          <img src={logo} alt="Bank Logo" className="w-9 h-9" />
                          <p className="text-lg font-semibold">{accountDetails?.bank}</p>
                      </div>
                      
                      {/* Account Details */}
                      <div className="px-5 py-[14px] font-Inter w-[360px] border rounded-md space-y-4">
                          <div className="space-y- border-b-2">
                          <p className="text-sm text-left text-textDark">Account Number</p>
                          <span className="flex text-center justify-between gap-2 mb-4">
                              <p className="text-[14px] leading-[21px]">{accountDetails?.bank_account}</p>
                              <HiOutlineDuplicate 
                              size={24}
                              className="text-textDark cursor-pointer"
                              onClick={() => copyToClipboard(accountDetails?.bank_account ?? '')}
                              />
                          </span>
                          </div>
                          <div className="space-y-2">
                          <p className="text-left mt-2 text-[14px] leading-[21px] text-textDark">Account Name</p>
                          <p className="text-left text-[14px] leading-[21px]">{accountDetails?.bank_account_name}</p>
                          </div>
                      </div>
                      </div>

                      {/* Payment Confirmation Button */}
                      <div>
                      <button 
                          className="font-poppins w-[250px] h-[54px] rounded-lg bg-primary hover:bg-secondary text-white mt-6"
                          onClick={() => completeBuyTransaction()}
                      >
                          I Have Made Payment
                      </button>
                      </div>
                  </div>
              </>
              }
          </>
      )
  };
  const { toast } = useToast();

  const { accountDetails, isBill, clearAccountDetails, clearItem, clearTransactionId } = useTradeStore();

  console.log(accountDetails);

  const completeBuyConfig = useApiConfig({
    method: 'post',
    url: 'complete-buy-order-transaction',
    formdata: {ref_number: accountDetails?.ref_number}
  });

  const completeBillConfig = useApiConfig({
    method: 'post',
    url: 'complete-bill-transaction',
    formdata: {ref_number: accountDetails?.ref_number}
  });

  const completeBuyTransaction = async () => {
    await axios.request(isBill ? completeBillConfig : completeBuyConfig)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        clearAccountDetails();
        clearItem();
        clearTransactionId();
        onClose(); 
        openPaymentConfirmation.onOpen(); 
      } else {
        console.log('Error:', response.statusText);
      }
    }).catch((error:any) => {
      console.log(error);
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.[0]?.message || // Handle nested error messages
        error.message ||
        'An unexpected error occurred.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    });
  }


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
  );
};

export default FiatPaymentDetailsModal;
