import Modal from '../ui/modal'
import { useWhatNextPasswordModal } from '../../lib/utils'

const WhatNextPasswordModal = () => {
  const { isOpen, onClose } = useWhatNextPasswordModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='What Next ?'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>To enjoy the complete range of our products & Services, we recommend you complete the identity verification process.</p>
        <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Ok, I understand
        </button>
      </div>
    </Modal>
  )
}

export default WhatNextPasswordModal