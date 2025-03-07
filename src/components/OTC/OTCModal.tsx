import Modal from '../ui/modal'
import { useOTCModal } from '../../lib/utils'

const OTCModal = () => {
  const { isOpen, onClose } = useOTCModal();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Are You Eligible for the OTC Desk?'
      modalSize='w-[420px]'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>To access the OTC Desk, ensure you meet the following eligibility requirements:
            <ul>USDT & USDC Transactions: Minimum of $50,000</ul>
            <ul>BTC Transactions: Minimum of 2 BTC</ul>
        </p>
        <p>Are you eligible to proceed?</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-primary text-white' onClick={() =>{onClose();}}>
            Yes
          </button>
          <button className='w-full h-12 rounded-lg border-textDark border text-textDark' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default OTCModal