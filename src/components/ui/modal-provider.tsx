import React from 'react'
import WhatNextModal from '../modals/WhatNextModal'
import DocumentUploadModal from '../dashboard/identity-verification/DocumentUploadModal'

const ModalProvider = () => {
  return (
    <React.Fragment>
      <WhatNextModal/>
      <DocumentUploadModal/>
    </React.Fragment>
  )
}

export default ModalProvider