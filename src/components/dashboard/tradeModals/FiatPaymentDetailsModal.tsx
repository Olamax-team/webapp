import Modal from '../../ui/modal'; 
import { usePaymentConfirmationModal, useFiatPaymentDetailsModal } from '../../../lib/utils';
import qrCode from '../../../assets/images/QR.png';
import logo from '../../../assets/images/GTCO.svg';
import { HiOutlineDuplicate } from 'react-icons/hi';
import useTradeStore from '../../../stores/tradeStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';
import { useToast } from '../../../hooks/use-toast';

const FiatPaymentDetailsModal = () => {
  const { isOpen, onClose } = useFiatPaymentDetailsModal();
  const openPaymentConfirmation = usePaymentConfirmationModal();
  // const [isMobile, setisMobile] = useState(false); // State to track active section

  // Copy account number to clipboard
  const copyToClipboard = (accountNumber:string) => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied!");
  };

  const { toast } = useToast();

  const { accountDetails } = useTradeStore();

  const completeBuyConfig = useApiConfig({
    method: 'post',
    url: 'complete-buy-order-transaction',
    formdata: {ref_number: accountDetails?.ref_number}
  });

  const completeBuyTransaction = async () => {
    await axios.request(completeBuyConfig)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        onClose(); 
        openPaymentConfirmation.onOpen(); 
      } else {
        console.log('Error:', response.statusText);
      }
    }).catch((error) => {
      console.log(error);
      toast({
        title: 'Error',
        description: error.response?.data[0].message || 'An error occurred while processing your request.',
        variant: 'destructive',
      })
    });
  }


  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title=""
      modalSize="w-[1000px] h-[640px]"
      modalStyle="p-0 xl:p-0"
    >


      <div className="flex flex-col md:flex-row gap-8 w-full h-full">
        {/* Chevron Button for Mobile View
        <div className="bg-textDark flex justify-between transform -translate-x-1/2 md:hidden">
        <h3 className="text-base font-poppins font-semibold mb-4 text-white">Information</h3>
        {isMobile ? <IoChevronUpOutline size={20} className='text-white' onClick={() => setisMobile(!isMobile)}/> : <IoChevronDownOutline size={20} className='text-white' onClick={() => setisMobile(!isMobile)} />}
        </div> */}
        {/* Left Section: Information Panel */}
        <div className={`bg-textDark text-white p-[42px] md:w-[40%] w-full transition-all duration-300 h-full`}>
          <h3 className="text-base font-poppins font-semibold mb-4">Information</h3>
          <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal">
            <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
          </div>
        </div>

        {/* Right Section: Payment Details */}
        <div className={`flex flex-col gap-5 md:w-[60%] w-full justify-center items-center pb-9 transition-all duration-300`}>
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
    </Modal>
  );
};

export default FiatPaymentDetailsModal;
