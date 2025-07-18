import Modal from '../ui/modal'
import { useConfirmDeleteModal, useStartDeleteModal } from '../../lib/utils'
import { Input } from '../ui/input';
import React from 'react';
import useUserDetails from '../../stores/userStore';

const StartDeleteModal = () => {
  const { user, kycStatus, fetchKycStatus} = useUserDetails();
  const { isOpen, onClose } = useStartDeleteModal();
  const openConfirmDeleteModal = useConfirmDeleteModal();

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  React.useEffect(() => {
    if (user) {
      fetchKycStatus();
    }
  },[user])

  const onSubmit = () => {
    if (email === '') {
     setEmailError('Email field cannot be empty');
     return;
    };

    if (kycStatus?.email === email) {
      onClose();
      openConfirmDeleteModal.onOpen();
    } else {
      setEmailError('Email does not match the account email');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {onClose(); setEmail('')}}
      useCloseButton
      title='Confirm Delete Account'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-6'>
        <p className='text-red-500 text-sm lg:text-base'>You are about to permanently remove your account and all associated data? To proceed with this action, type in your default email address (the one you used in creating your account).</p>
        <div>
          <Input className='w-full h-[40px] lg:h-[50px] placeholder:text-sm text-sm xl:text-base' placeholder='Enter you default email address' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <p className='text-xs md:text-sm text-red-500'>{emailError}</p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button className='px-6 h-12 rounded-lg border-primary bg-primary border text-white' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default StartDeleteModal