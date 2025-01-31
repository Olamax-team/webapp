import React from 'react'
import WhatNextPasswordModal from '../modals/WhatNextPasswordModal'
import DocumentUploadModal from '../dashboard/identity-verification/DocumentUploadModal'
import WhatNextUploadModal from '../modals/WhatNextUploadModal'
import VerificationProgressModal from '../modals/VerificationProgressModal'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'
import VerifyDeleteModal from '../modals/VerifyDeleteModal'
import AuthFactorModal from '../modals/AuthFactorModal'
import EnableAuthModal from '../modals/EnableAuthModal'
import ActivateAuthModal from '../modals/ActivateAuthModal'
import QRCodeModal from '../modals/QRCodeModal'
import SecurityAuthModal from '../modals/SecurityAuthModal'
import ChangePasswordModal from '../modals/ChangePasswordModal'
import ConfirmChangePasswordModal from '../modals/ConfirmChangePassword'
import VerifyPasswordChangeModal from '../modals/VerifyPasswordChangeModal'
import PasswordChangeCompleteModal from '../modals/PasswordChangeCompleteModal'

const ModalProvider = () => {
  return (
    <React.Fragment>
      <WhatNextPasswordModal/>
      <WhatNextUploadModal/>
      <VerificationProgressModal/>
      <DocumentUploadModal/>
      <ConfirmDeleteModal/>
      <VerifyDeleteModal/>
      <AuthFactorModal/>
      <SecurityAuthModal/>
      <EnableAuthModal/>
      <ActivateAuthModal/>
      <QRCodeModal/>
      <ChangePasswordModal/>
      <ConfirmChangePasswordModal/>
      <VerifyPasswordChangeModal/>
      <PasswordChangeCompleteModal/>
    </React.Fragment>
  )
}

export default ModalProvider