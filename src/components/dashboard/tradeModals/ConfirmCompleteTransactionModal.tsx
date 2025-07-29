import Modal from '../../ui/modal'
import { useConfirmCompleteTransaction, useCryptoPaymentDetailsModal, useFiatPaymentDetailsModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';
import { useApiConfig } from '../../../hooks/api';
import axios from 'axios';
import React from 'react';

const ConfirmCompleteTransaction = () => {

  const { isOpen, onClose } = useConfirmCompleteTransaction();
  const { transactionId, setAccountDetails, item, coinNetwork } = useTradeStore();
  const paymentDetails = item?.tradeType === 'sell' ? useCryptoPaymentDetailsModal() : useFiatPaymentDetailsModal();

  const [isLoading, setIsLoading] = React.useState(false)

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
    setIsLoading(true);
    await axios.request(createBuyConfig)
    .then((response) => {
      if (response.status === 200) {
        setAccountDetails(response.data.data)
        onClose();
        paymentDetails.onOpen();
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => setIsLoading(false))
  };

  const completeTransaction = () => {
    if (coinNetwork && item?.tradeType == 'sell') {
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
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex font-Inter flex-col gap-10'>
        <p className='text-sm lg:text-base'>{item?.tradeType === 'sell' ? 'Are you sure you want to continue with this transaction' : 'Are you sure you want to proceed with the transaction process?'}</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full font-poppins h-12 rounded-lg bg-primary text-white cursor-pointer text-sm' onClick={completeTransaction} >
            {isLoading ? 'Completing ...' : 'Yes'}
          </button>
          <button className='w-full font-poppins h-12 rounded-lg border-primary border text-primary cursor-pointer text-sm' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmCompleteTransaction