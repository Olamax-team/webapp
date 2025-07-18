import Modal from '../../../ui/modal'
import { useActiveCompleteTransactionModals } from '../../../../lib/utils'
import useTradeStore from '../../../../stores/tradeStore';

const CompleteTransactionModals = () => {
  const { isOpen, onClose } = useActiveCompleteTransactionModals();
  const tradeData = useTradeStore();
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Transaction Complete'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base font-Inter'>Your payment has been confirmed and your exchange for   <span className="font-bold">{tradeData.item?.cryptoType} {tradeData.item?.cryptoAmount}</span> has been processed.</p>
        <button className='w-full h-12 rounded-lg font-poppins bg-primary hover:bg-secondary text-white' onClick={() =>onClose()}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default CompleteTransactionModals