import React from 'react'
import { useUploadDocumentModal } from '../../../lib/utils'
import UploadModal from '../../ui/upload-modal'
import SideInformation from './SideInformation'
import { ChevronDown, X } from 'lucide-react'
import MultiStepForm from './MultiStepForm'

const DocumentUploadModal = () => {
  const { isOpen, onClose} = useUploadDocumentModal();
  const [showModal, setShowModal] = React.useState(isOpen);

  const [open, setOpen] = React.useState(false)

  const closeModal = React.useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose]);

  
  return (
    <UploadModal 
      isOpen={isOpen}
      modalSize='lg:max-w-[1000px] w-full max-w-[520px]'
      modalStyle='rounded-md'
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <div className="flex overflow-hidden flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-[32%] bg-[#121826] text-white p-6 lg:p-7">
          <SideInformation open={open}/>
        </div>
        <button className="w-full lg:hidden flex items-center justify-between text-white p-6 bg-[#121826]" onClick={() =>setOpen((state) =>!state)}>
          <p className='font-poppins'>Information</p>
          <ChevronDown className='size-5 lg:hidden'/>
        </button>
        <div className='hidden lg:block lg:w-[68%] p-6 lg:p-7'>
          <div className="flex items-center">
            <div className='flex-1 flex items-center justify-center border'>indicator</div>
            <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
              <X className='lg:size-6 size-5'/>
            </button>
          </div>
          <MultiStepForm/>
        </div>
        { open ? 
          <React.Fragment>
            <div className="lg:hidden w-full bg-[#121826] text-white p-6 lg:p-7">
              <SideInformation open={open}/>
            </div>
            <div className='lg:hidden w-full p-6 lg:p-7 bg-white'>
              <div className="flex items-center">
                <div className='flex-1 flex items-center justify-center border'>indicator</div>
                <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                  <X className='lg:size-6 size-5'/>
                </button>
              </div>
            </div>
          </React.Fragment>:
          <div className='lg:hidden lg:w-full p-5 lg:p-7'>
            <div className="flex items-center">
              <div className='flex-1 flex items-center justify-center border'>indicator</div>
              <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                <X className='lg:size-6 size-5'/>
              </button>
            </div>
            <MultiStepForm/>
          </div>
        }
      </div>
    </UploadModal>
  )
}

export default DocumentUploadModal;