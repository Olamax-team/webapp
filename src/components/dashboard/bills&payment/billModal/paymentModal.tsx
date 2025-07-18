import { useActiveCompleteTransactionModals, useActivePaymentModals } from '../../../../lib/utils';
import Modal from '../../../ui/modal'
import loading from "../../../../assets/images/Loading 1.svg";
import { useEffect } from 'react';

const PaymentModals = () => {
    const { isOpen, onClose } = useActivePaymentModals();
    const OpenCompleteTransactionModals = useActiveCompleteTransactionModals();

    useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            onClose(); 
            OpenCompleteTransactionModals.onOpen(); 
          }, 2000); // 2 seconds delay
    
          return () => clearTimeout(timer);
        }
      }, [isOpen, onClose, OpenCompleteTransactionModals]);

    return (
        <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        useCloseButton={false}
        modalSize='md:max-w-[540px] w-full'
        modalStyle='px-6 xl:px-10'
      >
        <div className="flex flex-col gap-10 items-center justify-center font-Inter">
            <div className="text-center font-Inter">
                {/* Loading Spinner */}
                <div className="flex justify-center mb-4">
                <img src={loading} alt="Loading..." className="h-[50px] w-[50px] animate-spin" />
                </div>
                <p className='font-bold text-[20px] leading-[30px]'>Confirming Transaction Status</p>
        
                {/* Message */}
                <p className="text-textDark font-normal text-sm lg:text-base mb-2">
                Please wait a moment while we confirm the status of your transaction!
                </p>
            </div>
        </div>
    </Modal>
      ); 
}
export default PaymentModals;