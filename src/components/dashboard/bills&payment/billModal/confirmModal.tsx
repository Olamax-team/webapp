import Modal from '../../../ui/modal'
import { useOpenActiveOtpModals, useConfirmModal } from '../../../../lib/utils'

const ConfirmModal = () => {
  const { isOpen, onClose } = useConfirmModal();
  const openOTPModals = useOpenActiveOtpModals();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Complete Transaction'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Are you sure you want to proceed with the transaction process?</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-primary text-white' onClick={() => {openOTPModals.onOpen(); onClose()}}>
            Yes
          </button>
          <button className='w-full h-12 rounded-lg border-primary border text-primary' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal