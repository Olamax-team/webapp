import Modal from '../../ui/modal'
import { useDonateCompletedModal } from '../../../lib/utils'
import useDonateStore from '../../../stores/donateStore';

const DonateCompletedModal = () => {
  const { isOpen, onClose } = useDonateCompletedModal();
  const donateData = useDonateStore();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Complete'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base font-Inter'>Your payment has been confirmed and your donation for   <span className="font-bold">{ `${donateData.item?.currency} ${donateData.item?.amount}`}</span> has been processed.</p>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default DonateCompletedModal