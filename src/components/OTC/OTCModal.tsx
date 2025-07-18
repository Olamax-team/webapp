import Modal from '../ui/modal'
import { useOTCModal } from '../../lib/utils'
import useUserDetails from '../../stores/userStore';

const OTCModal = () => {
  const { isOpen, onClose } = useOTCModal();
    const { user } = useUserDetails();
    const isVerified = user?.account_status;
    
    const OTCButton = () => {
      if (isVerified === 'verified') {
        window.open("https://wa.me/+2347074322020", "_blank");
      } else {
        onClose();
      }
};
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={true}
      title='Are You Eligible for the OTC Desk?'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>To access the OTC Desk, ensure you meet the following eligibility requirements:
            <ul>USDT & USDC Transactions: Minimum of $50,000</ul>
            <ul>BTC Transactions: Minimum of 0.5 BTC</ul>
        </p>
        <p>Are you eligible to proceed?</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-primary text-white' 
          onClick={() =>OTCButton()}>
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