import Modal from '../ui/modal'
import { useAuthFactorModal, useConfirmDeleteModal } from '../../lib/utils'

const ConfirmDeleteModal = () => {
  const { isOpen, onClose } = useConfirmDeleteModal();
  const openAuthFactorModal = useAuthFactorModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Delete Account'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Permanently remove your account and all associated data. This action cannot be undone, so please ensure you want to proceed.</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-[#E41D03] text-white' onClick={() =>{onClose(); openAuthFactorModal.onOpen();}}>
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

export default ConfirmDeleteModal