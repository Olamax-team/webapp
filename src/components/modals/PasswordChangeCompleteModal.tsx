import Modal from '../ui/modal'
import { usePasswordChangeCompleteModal } from '../../lib/utils'

const PasswordChangeCompleteModal = () => {
  const { isOpen, onClose } = usePasswordChangeCompleteModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Password Reset'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Congratulations, your password has been successfully updated.</p>
        <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Ok, I understand
        </button>
      </div>
    </Modal>
  )
}

export default PasswordChangeCompleteModal