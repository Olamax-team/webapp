import Modal from '../ui/modal'
import { useActivateAuthModal, useQRCodeModal, useSecurityAuthModal } from '../../lib/utils'
import { HiOutlineDuplicate } from 'react-icons/hi';

const ActivateAuthModal = () => {
  const { isOpen, onClose } = useActivateAuthModal();
  const openQRModal = useQRCodeModal();
  const openSecurityAuthModal = useSecurityAuthModal();

  const activationCode = '2NVCDG7YUIHGFV3ZOH4';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(activationCode);
    alert("copied!");
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Security Authentication'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base'>Open your authenticator app and tap [+], Select [Enter a setup key] and enter the following key</p>
          <div className="w-full lg:h-[60px] h-[48px] rounded bg-[#f5f5f5] mt-7 flex items-center justify-between p-4" onClick={copyToClipboard}>
            <h2 className='text-sm lg:text-base'>{activationCode}</h2>
            <HiOutlineDuplicate className='lg:size-6 size-5'/>
          </div>
        </div>
        <div>
          <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() => {openSecurityAuthModal.onOpen(); onClose()}}>
            Activate
          </button>
          <div className="flex items-center justify-center my-5">
            <button onClick={() => {openQRModal.onOpen(); onClose()}} className='underline'>Use QR code Instead</button>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default ActivateAuthModal