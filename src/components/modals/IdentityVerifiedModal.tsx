import Modal from '../ui/modal'
import { useIdentityVerifiedModal } from '../../lib/utils'

const IdentityVerifiedModal = () => {
  const { isOpen, onClose } = useIdentityVerifiedModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton
      title='Identity Verified'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Congratulations! Your identity has been verified. You now have full access to all our products and services. Thank you for completing these steps</p>
        <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Ok, I understand
        </button>
      </div>
    </Modal>
  )
}

export default IdentityVerifiedModal