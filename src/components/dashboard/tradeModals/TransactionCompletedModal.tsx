import Modal from '../../ui/modal'
import { useTransactionCompletedModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';

const TransactionCompletedModal = () => {
  const { isOpen, onClose } = useTransactionCompletedModal();
  const tradeData = useTradeStore();

  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Complete'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base font-Inter'>Your payment has been confirmed and your exchange for   <span className="font-bold">{tradeData.item?.tradeType === "Buy"? `${tradeData.item?.cryptoType} ${tradeData.item?.cryptoAmount}`: `${tradeData.item?.fiatType} ${tradeData.item?.fiatAmount}`}</span> has been processed.</p>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default TransactionCompletedModal