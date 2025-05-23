import Modal from '../../ui/modal'
import { useConfirmCompleteTransaction, useCryptoPaymentDetailsModal, useFiatPaymentDetailsModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';

const ConfirmCompleteTransaction = () => {

  const { isOpen, onClose } = useConfirmCompleteTransaction();
  const { transactionId, setAccountDetails, item, coinNetwork } = useTradeStore();
  const paymentDetails = item?.tradeType === 'sell' ? useCryptoPaymentDetailsModal() : useFiatPaymentDetailsModal();

  const confirmDeposit = async () => {
    onClose();
    paymentDetails.onOpen();
  };

  const createBuyConfig = useApiConfig({
    method: 'post',
    url: 'create-buy-order',
    formdata: { transaction_id: transactionId }
  });

  const createBuyOrder = async () => {
    await axios.request(createBuyConfig)
    .then((response) => {
      if (response.status === 200) {
        setAccountDetails(response.data.data)
      onClose();
      paymentDetails.onOpen();
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  const completeTransaction = () => {
    if (coinNetwork) {
      confirmDeposit();
    } else {
      createBuyOrder();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title={item?.tradeType === 'sell' ? 'Continue Transaction' :  'Complete Transaction'}
      modalSize='w-[420px]'
    >
      <div className='flex font-Inter flex-col gap-10'>
        <p className='text-sm lg:text-base'>{item?.tradeType === 'sell' ? 'Are you sure you want to continue with this transaction' : 'Are you sure you want to proceed with the transaction process?'}</p>
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