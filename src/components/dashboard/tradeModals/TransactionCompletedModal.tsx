import Modal from '../../ui/modal'
import { useTransactionCompletedModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';
import { useNavigate } from 'react-router-dom';
import { activityIndex } from '../../../stores/generalStore';

const TransactionCompletedModal = () => {
  const { isOpen, onClose } = useTransactionCompletedModal();
  const { paymentDetails, item, clearItem, clearPaymentDetails, clearAccountDetails } = useTradeStore();
  const { setActive, setShowTransactionDetail, setActiveTab } = activityIndex();

  const navigate = useNavigate();

  const handleClose = () => {
    setActive(0);
    setActiveTab('buy');
    setShowTransactionDetail(false);
    onClose();
    navigate('/dashboard/transaction');
    clearItem();
    clearPaymentDetails();
    clearAccountDetails();
  }

  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title={paymentDetails?.status === 'error' ? 'Transaction Incomplete' : 'Transaction Complete'}
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <div className="border-b-2 pb-2">
            <p className='text-sm lg:text-base'>Amount Transferred: <span className='font-bold'>{paymentDetails?.data?.amount_transfered}</span></p>
            <p className='text-sm lg:text-base'>Coin to Recieve: <span className='font-bold'>{paymentDetails?.data?.coin_to_receive}</span></p>
          </div>
          { paymentDetails?.status === 'error' ? 
            <p className='text-sm lg:text-base font-Inter'>Your payment has not been confirmed and your exchange for   <span className="font-bold">{item?.tradeType === "Buy"? `${item?.cryptoType} ${item?.cryptoAmount}`: `${item?.fiatType} ${item?.fiatAmount}`}</span> is not processed.</p> :
            <p className='text-sm lg:text-base font-Inter'>Your payment has been confirmed and your exchange for   <span className="font-bold">{item?.tradeType === "Buy"? `${item?.cryptoType} ${item?.cryptoAmount}`: `${item?.fiatType} ${item?.fiatAmount}`}</span> has been processed.</p>
          }
        </div>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>handleClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default TransactionCompletedModal