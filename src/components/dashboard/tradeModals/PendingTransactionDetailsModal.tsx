import { usePendingTransactionDetailsModal, useTransactionPendingModal } from '../../../lib/utils'
import Modal from '../../ui/modal';
import useTradeStore from '../../../stores/tradeStore';

const PendingTransactionDetailsModal = () => {
  const { isOpen, onClose } = usePendingTransactionDetailsModal();
  const pendingTransaction = useTransactionPendingModal();
  const { pendingDetails, sellDetails } = useTradeStore();


  return (
    <Modal
      isOpen={isOpen} 
      onClose={() => { onClose(); pendingTransaction.onOpen(); }}
      useCloseButton={false}
      title='Pending Transaction Details'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm xl:text-base capitalize'>Status: {pendingDetails?.transaction.status}</p>
          <p className='text-sm xl:text-base'>Amount: {pendingDetails?.transaction.amount} {sellDetails?.currency}</p>
          <p className='text-sm xl:text-base'>Naira Value: NGN {pendingDetails?.transaction.naira_value}</p>
          <p className='text-sm xl:text-base'>Transaction Bank Name: {pendingDetails?.transaction.details.bank_name}</p>
          <p className='text-sm xl:text-base capitalize'>Account Name: {pendingDetails?.transaction.details.account_name}</p>
          <p className='text-sm xl:text-base'>Account Number: {pendingDetails?.transaction.details.account_number}</p>
        </div>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() => { onClose(); pendingTransaction.onOpen()}}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default PendingTransactionDetailsModal 