import Modal from '../ui/modal'
import { useActivateAuthModal, useQRCodeModal, useSecurityAuthModal } from '../../lib/utils'
import axios from 'axios';
import useUserDetails from '../../stores/userStore';
import { useApiConfig } from '../../hooks/api';
import {QRCodeSVG} from 'qrcode.react';

const QRCodeModal = () => {
  const { isOpen, onClose } = useQRCodeModal();
  const openSecurityAuthModal = useSecurityAuthModal();
  const openActiveAuthModal = useActivateAuthModal();

  const { authDetails } = useUserDetails();

    const getEmailOtpConfig = useApiConfig({
      method: 'get',
      url: 'get-email-otp'
    });

    const getEmailOtp = async () => {
      await axios.request(getEmailOtpConfig)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          openSecurityAuthModal.onOpen(); 
          onClose();
        }
      })
    }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={true}
      title='Enable Aunthenticator app'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-8'>
        <p className='text-sm lg:text-base'>Open your authenticator app and tap [+], Select [Scan QR code] to scan this QR code</p>
        <div className="size-[150px] md:size-[200px] mx-auto">
          { authDetails && authDetails.qr_code_url && <QRCodeSVG className='w-full h-full object-center' value={authDetails.qr_code_url}/>}
        </div>
        <div>
          <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={getEmailOtp}>
            Activate
          </button>
          <div className="flex items-center justify-center my-5">
            <button onClick={() => {openActiveAuthModal.onOpen(); onClose()}} className='underline'>Use setup key instead</button>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default QRCodeModal