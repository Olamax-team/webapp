import Modal from '../../ui/modal'
import { useSellConfirmCompleteTransaction, useTwoFactorModal } from '../../../lib/utils'

const SellConfirmCompleteTransaction = () => {
  const { isOpen, onClose } = useSellConfirmCompleteTransaction();
  const TwoFactorModal = useTwoFactorModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Change Password'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Are you sure you want to proceed with the transaction process?</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full font-poppins h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose(); TwoFactorModal.onOpen();}}>
            Yes
          </button>
          <button className='w-full font-poppins h-12 rounded-lg border-primary border text-primary' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default SellConfirmCompleteTransaction