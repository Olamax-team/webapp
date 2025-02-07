import Modal from '../../ui/modal'
import { useConfirmVerificationModal } from '../../../lib/utils'
import { useNavigate } from 'react-router-dom';

const ConfirmVerificationModal = () => {
  const { isOpen, onClose } = useConfirmVerificationModal();
  const navigate = useNavigate();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Confirm Verification'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10 font-Inter'>
        <p className='text-sm lg:text-base'>To enjoy the complete range of our products & Services, we recommend you complete the identity verification process.</p>
        <div className="flex items-center justify-between gap-4">
          <button className='font-poppins w-full h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose(); navigate('/dashboard/identity_verification') }}>
            Proceed
          </button>
          <button className='font-poppins w-full h-12 rounded-lg border-primary border text-primary' onClick={() =>onClose()}>
            Skip
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmVerificationModal