import Modal from '../../ui/modal'
import { useConfirmCompleteTransaction, useFiatPaymentDetailsModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';

const ConfirmCompleteTransaction = () => {

  const { isOpen, onClose } = useConfirmCompleteTransaction();
  const paymentDetails = useFiatPaymentDetailsModal();
  const { transactionId, setAccountDetails } = useTradeStore();

  console.log('t_id', transactionId);

  const createBuyConfig = useApiConfig({
    method: 'post',
    url: 'create-buy-order',
    formdata: { transaction_id: transactionId }
  });

  const createBuyOrder = async () => {
    await axios.request(createBuyConfig)
    .then((response) => {
      if (response) {
        setAccountDetails(response.data.data)
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  const completeTransaction = () => {
    createBuyOrder();
    onClose();
    paymentDetails.onOpen();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Complete Transaction'
      modalSize='w-[420px]'
    >
      <div className='flex font-Inter flex-col gap-10'>
        <p className='text-sm lg:text-base'>Are you sure you want to proceed with the transaction process?</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full font-poppins h-12 rounded-lg bg-primary text-white' onClick={completeTransaction}>
            Yes
          </button>
          <button className='w-full font-poppins h-12 rounded-lg border-primary border text-primary' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmCompleteTransaction