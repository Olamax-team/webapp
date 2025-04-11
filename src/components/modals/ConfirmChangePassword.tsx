import Modal from '../ui/modal'
import { useAuthFactorModal, useConfirmPasswordChangeModal } from '../../lib/utils'

const ConfirmChangePasswordModal = () => {
  const { isOpen, onClose } = useConfirmPasswordChangeModal();
  const authFactor = useAuthFactorModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Change Password'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Are you sure you want to change your password?.</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose(); authFactor.onOpen();}}>
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

export default ConfirmChangePasswordModal