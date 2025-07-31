import { usePendingTransactionDetailsModal, useTransactionPendingModal } from '../../../lib/utils'
import Modal from '../../ui/modal';
import useTradeStore from '../../../stores/tradeStore';
import { activityIndex } from '../../../stores/generalStore';
import { useNavigate } from 'react-router-dom';

const TransactionPendingModal = () => {
  const { isOpen, onClose } = useTransactionPendingModal();
  const pendingDetailsModal = usePendingTransactionDetailsModal();
  const { pendingDetails } = useTradeStore();
  const { clearItem, clearPaymentDetails, clearCryptoTradeDetails } = useTradeStore();

  const { setActive, setActiveTab, setShowTransactionDetail } = activityIndex();

  const navigate = useNavigate();

  const handleClose = () => {
    setActive(0);
    setShowTransactionDetail(false);
    clearItem();
    clearPaymentDetails();
    clearCryptoTradeDetails();
    setActiveTab('sell');
    onClose();
    navigate('/dashboard/transaction')
  }


  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Pending'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base font-Inter'>{pendingDetails?.message}</p>
          <button className='text-sm mt-2 cursor-pointer underline text-black/70' onClick={() => { onClose(); pendingDetailsModal.onOpen();}}>Show full transaction details</button>
        </div>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>handleClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default TransactionPendingModal 