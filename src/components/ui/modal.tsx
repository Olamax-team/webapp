import React from 'react'
import { HiXMark } from 'react-icons/hi2';
import { cn } from '../../lib/utils';

type modalDialogProps = {
  title: string;
  children:React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  useCloseButton?: boolean;
  modalSize?: string;
};

const Modal = ({title, children, isOpen, onClose, useCloseButton, modalSize }:modalDialogProps) => {
  const [showModal, setShowModal] = React.useState(isOpen);

  React.useEffect(() => {
    setShowModal(isOpen)
  },[isOpen]);

  const closeModal = React.useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose]);

  return (
    <React.Fragment>
      {isOpen && (
        <div className='fixed inset-0 overflow-x-hidden overflow-y-auto flex items-center justify-center outline-none focus:outline-none z-[80000] bg-neutral-800/50'>
          <div className={cn("w-[420px] p-4 h-auto", modalSize)}>
            <div className={cn("translate duration-300 h-full", showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full')}>
              <div className="p-5 xl:p-6 translate h-full lg:h-auto md:h-auto border-0 rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between w-full items-start">
                  <div className="text-[20px] leading-normal font-semibold">{title}</div>
                  <button onClick={closeModal} className={cn('p-1 rounded hover:opacity-70 transition', !useCloseButton && 'invisible')}>
                    <HiXMark size={25}/>
                  </button>
                </div>
                <div className='mt-4'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default Modal;