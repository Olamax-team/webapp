import Modal from '../../../ui/modal'
import { useActivateAuthModal, useQRModals } from '../../../../lib/utils'
import qrCode from '../../../../assets/images/QR.png'


const QRModals = () => {
  const { isOpen, onClose } = useQRModals();
  const openActiveAuthModal = useActivateAuthModal();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Enable Aunthenticator app'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-8'>
        <p className='text-sm lg:text-base'>Open your authenticator app and tap [+], Select [Scan QR code] to scan this QR code</p>
        <div className="size-[150px] md:size-[200px] mx-auto">
          <img src={qrCode} className='w-full h-full object-center'/>
        </div>
        <div>
          <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() => {onClose()}}>
            Activate
          </button>
          <div className="flex items-center justify-center my-5">
            <button onClick={() => {openActiveAuthModal.onOpen(); onClose()}} className='underline'>Use setup key instead</button>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default QRModals