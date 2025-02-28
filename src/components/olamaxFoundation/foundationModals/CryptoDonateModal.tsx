import Modal from '../../ui/modal'
import { useCryptoDonateModal, useDonateConfirmationModal,  } from '../../../lib/utils';
import qrCode from '../../../assets/images/QR.png'
import logo from '../../../assets/images/OLAMAX Logo 4.svg'
import { HiOutlineDuplicate } from 'react-icons/hi';
import useDonateStore from '../../../stores/donateStore';

const CryptoDonateModal = () => {
  const { isOpen, onClose } = useCryptoDonateModal();
  const openDonateConfirmation = useDonateConfirmationModal();
  const walletAdd = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  // Copy account number to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAdd);
    alert("Account number copied!");
  };
  const donateData = useDonateStore();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title=''
      modalSize='w-[1000px] h-[640px]'
      modalStyle='p-0 xl:p-0'
    >
      <div className="flex flex-row gap-8">
        {/* Left Side: Information Panel */}
        <div className="bg-textDark text-white p-[42px] md:w-[40%]">
          <h3 className="text-base font-poppins font-semibold mb-4">Information</h3>
          <div className="space-y-6 items-center justify-center text-sm font-Inter font-normal text-wrap">
            <p className="border bg-white bg-opacity-20 p-3 rounded-md">Kindly complete the transaction by making payment to the displayed banking details.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Please verify the banking details before authorizing the payment, we would not be held responsible if funds are sent to a wrong account.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">Upon successful payment, click the "I Have Made Payment" button to complete the transaction.</p>
            <p className="bg-white bg-opacity-20 border p-3 rounded-md">This transaction has a time limit of 30 minutes before it is cancelled.</p>
          </div>
        </div>
        {/* Right Panel */}
        <div className='flex flex-col gap-5 w-[60%] justify-center items-center pb-9'>
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
                <p className="text-left text-[14px] leading-[21px]">{donateData.item?.currency}</p>
              </div>
            </div>
          </div>
          <div>
            <button className='font-poppins w-[250px] h-[54px] rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() => {onClose(); openDonateConfirmation.onOpen()}}>
              I Have Made Payment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default CryptoDonateModal