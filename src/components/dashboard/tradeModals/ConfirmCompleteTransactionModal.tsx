import Modal from '../../ui/modal'
import { useConfirmCompleteTransaction, useTwoFactorModal, useVerifyCodeModal } from '../../../lib/utils'
import useTradeStore from '../../../stores/tradeStore';

const ConfirmCompleteTransaction = () => {
  const { isOpen, onClose } = useConfirmCompleteTransaction();
  const tradeData = useTradeStore();
  const verifyCodeModal = tradeData.item?.tradeType === "Buy" ? useVerifyCodeModal(): useTwoFactorModal();
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
          <button className='w-full font-poppins h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose(); verifyCodeModal.onOpen();}}>
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