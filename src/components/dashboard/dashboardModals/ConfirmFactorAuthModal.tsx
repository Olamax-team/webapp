import Modal from '../../ui/modal'
import { useConfirmFactorAuthModal } from '../../../lib/utils'
import { useNavigate } from 'react-router-dom';

const ConfirmFactorAuthModal = () => {
  const { isOpen, onClose } = useConfirmFactorAuthModal();
  const navigate = useNavigate();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={true}
      title='Enable Your 2FA'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10 font-Inter'>
        <p className='text-sm lg:text-base'>To enjoy the complete range of our products & services, and have total security we recommend you complete the two factor authentication process.</p>
        <div className="flex items-center justify-between gap-4">
          <button className='font-poppins w-full h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose(); navigate('/dashboard/account_management') }}>
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

export default ConfirmFactorAuthModal