import { usePendingTransactionDetailsModal, useTransactionPendingModal } from '../../../lib/utils'
import Modal from '../../ui/modal';
import useTradeStore from '../../../stores/tradeStore';

const TransactionPendingModal = () => {
  const { isOpen, onClose } = useTransactionPendingModal();
  const pendingDetailsModal = usePendingTransactionDetailsModal();
  const { pendingDetails } = useTradeStore();


  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Pending'
      modalSize='max-w-[420px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base font-Inter'>{pendingDetails?.message}</p>
          <button className='text-sm mt-2 cursor-pointer underline text-black/70' onClick={() => { onClose(); pendingDetailsModal.onOpen();}}>Show full transaction details</button>
        </div>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default TransactionPendingModal 