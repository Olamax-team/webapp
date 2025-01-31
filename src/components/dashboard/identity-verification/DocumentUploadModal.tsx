import React from 'react'
import { useUploadDocumentModal } from '../../../lib/utils'
import UploadModal from '../../ui/upload-modal'
import SideInformation from './SideInformation'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import MultiStepForm from './MultiStepForm'

const headers = ['Personal Information', 'Documents Identification ', 'Liveness Check']

const DocumentUploadModal = () => {
  const { isOpen, onClose} = useUploadDocumentModal();
  const [showModal, setShowModal] = React.useState(isOpen);

  const [currentStep, setCurrentStep] = React.useState(0);

  const [open, setOpen] = React.useState(false)

  const closeModal = React.useCallback(() => {
    setShowModal(false);
    setCurrentStep(0);
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
          <SideInformation open={open} currentStep={currentStep}/>
        </div>
        <button className="w-full lg:hidden flex items-center justify-between text-white p-6 bg-[#121826]" onClick={() =>setOpen((state) =>!state)}>
          <p className='font-poppins'>Information</p>
          {open ? <ChevronUp className='size-5 lg:hidden'/> :<ChevronDown className='size-5 lg:hidden'/>}
        </button>
        <div className='hidden lg:block lg:w-[68%] p-6 lg:p-7'>
          <div className="flex items-center">
            <div className='flex-1 flex items-center gap-4'>
              <div className="border border-black size-6 rounded-full flex items-center justify-center">
                <div className="rounded-full size-4 bg-black"/>
              </div>
              <h2 className='font-bold lg:text-lg'>{headers[currentStep]}</h2>
            </div>
            <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
              <X className='lg:size-6 size-5'/>
            </button>
          </div>
          <MultiStepForm currentStep={currentStep} setCurrentStep={setCurrentStep}/>
        </div>
        { open ? 
          <React.Fragment>
            <div className="lg:hidden w-full bg-[#121826] text-white p-6 lg:p-7">
              <SideInformation open={open} currentStep={currentStep} />
            </div>
            <div className='lg:hidden w-full p-6 lg:p-7 bg-white'>
              <div className="flex items-center">
                <div className='flex-1 flex items-center gap-4'>
                  <div className="border border-black size-6 rounded-full flex items-center justify-center">
                    <div className="rounded-full size-4 bg-black"/>
                  </div>
                  <h2 className='font-bold lg:text-lg'>{headers[currentStep]}</h2>
                </div>
                <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                  <X className='lg:size-6 size-5'/>
                </button>
              </div>
            </div>
          </React.Fragment>:
          <div className='lg:hidden lg:w-full p-5 lg:p-7'>
            <div className="flex items-center">
              <div className='flex-1 flex items-center gap-4'>
                <div className="border border-black size-6 rounded-full flex items-center justify-center">
                  <div className="rounded-full size-4 bg-black"/>
                </div>
                <h2 className='font-bold lg:text-lg'>{headers[currentStep]}</h2>
              </div>
              <button className='size-8 lg:size-9 rounded-full flex items-center justify-center bg-gray-200 flex-none' onClick={closeModal}>
                <X className='lg:size-6 size-5'/>
              </button>
            </div>
            <MultiStepForm currentStep={currentStep} setCurrentStep={setCurrentStep}/>
          </div>
        }
      </div>
    </UploadModal>
  )
}

export default DocumentUploadModal;