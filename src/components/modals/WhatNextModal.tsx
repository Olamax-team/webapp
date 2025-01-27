import Modal from '../ui/modal'
import { useWhatNextModal } from '../../lib/utils'

const WhatNextModal = () => {
  const { isOpen, onClose } = useWhatNextModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton
      title='What Next ?'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p>To enjoy the complete range of our products & Services, we recommend you complete the identity verification process.</p>
        <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white'>
          Ok, I understand
        </button>
      </div>
    </Modal>
  )
}

export default WhatNextModal