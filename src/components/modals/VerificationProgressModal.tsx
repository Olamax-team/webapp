import Modal from '../ui/modal'
import { useVerificationProgressModal } from '../../lib/utils'

const VerificationProgressModal = () => {
  const { isOpen, onClose } = useVerificationProgressModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Verification in Progress'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Thank you for submitting your information. Your verification is currently being processed. Check back in 3-5 minutes for an update on your status.</p>
        <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Ok, I understand
        </button>
      </div>
    </Modal>
  )
}

export default VerificationProgressModal