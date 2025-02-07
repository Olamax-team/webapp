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
import VerifyCodeModal from '../dashboard/tradeModals/VerifyCodeModal'
import ConfirmCompleteTransaction from '../dashboard/tradeModals/ConfirmCompleteTransactionModal'
import TransactionCompletedModal from '../dashboard/tradeModals/TransactionCompletedModal'
import PaymentConfirmationModal from '../dashboard/tradeModals/PaymentConfirmationModal'
import FiatPaymentDetailsModal from '../dashboard/tradeModals/FiatPaymentDetailsModal'
import TwoFactorModal from '../dashboard/tradeModals/TwoFactorModal'
import ConfirmVerificationModal from '../dashboard/dashboardModals/ConfirmVerification'
import CryptoPaymentDetailsModal from '../dashboard/tradeModals/CryptoPaymentDetailsModal'

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
      <VerifyCodeModal/>
      <ConfirmCompleteTransaction/>
      <TransactionCompletedModal/>
      <FiatPaymentDetailsModal/>
      <PaymentConfirmationModal/>
      <TwoFactorModal/>
      <ConfirmVerificationModal/>
      <CryptoPaymentDetailsModal/>
    </React.Fragment>
  )
}

export default ModalProvider