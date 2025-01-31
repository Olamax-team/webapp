import React from 'react'
import { cn } from '../../lib/utils'

type modalDialogProps = {
  children:React.ReactNode;
  isOpen: boolean;
  modalSize: string;
  modalStyle?: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadModal = ({children, isOpen, modalSize, modalStyle, showModal, setShowModal }:modalDialogProps) => {

  React.useEffect(() => {
    setShowModal(isOpen)
  },[isOpen]);

  return (
    <React.Fragment>
      {isOpen && (
        <div className='fixed inset-0 overflow-x-hidden overflow-y-auto flex items-center justify-center outline-none focus:outline-none z-[80000] bg-neutral-800/50'>
          <div className={cn("p-4 h-auto", modalSize)}>
            <div className={cn("translate duration-300 h-full", showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full')}>
              <div className={cn("overflow-hidden translate h-full lg:h-auto md:h-auto border-0 rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none", modalStyle)}>
              {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default UploadModal;