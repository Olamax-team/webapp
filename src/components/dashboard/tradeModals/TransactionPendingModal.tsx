import { useTransactionPendingModal } from '../../../lib/utils'
import Modal from '../../ui/modal';
import useTradeStore from '../../../stores/tradeStore';

const TransactionPendingModal = () => {
  const { isOpen, onClose } = useTransactionPendingModal();
  const { pendingDetails } = useTradeStore();


  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Pending'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base font-Inter'>{pendingDetails?.message}</p>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default TransactionPendingModal 