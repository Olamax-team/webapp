import { useIdentityVerifiedModal, useUploadDocumentModal, useVerificationProgressModal } from "../../../lib/utils";
import useUserDetails from "../../../stores/userStore";
import React from "react";

const StartVerification = () => {
  const { onOpen } = useUploadDocumentModal();
  const { user, fetchKycStatus, kycStatus } = useUserDetails();

  const [stepOneChecked, setStepOneChecked] = React.useState(false);
  const [stepTwoChecked, setStepTwoChecked] = React.useState(false);
  const [stepThreeChecked, setStepThreeChecked] = React.useState(false);

  const identityVerified = useIdentityVerifiedModal();
  const verificationInProgress = useVerificationProgressModal();

  React.useEffect(() => {
    if (user) {
      fetchKycStatus();
    }
  }, [user]);

  const stepOneData = {
    lname: kycStatus ? kycStatus.lname : null,
    fname: kycStatus ? kycStatus.fname : null,
    dateOfBirth: kycStatus ? kycStatus.dateOfBirth : null,
    gender: kycStatus ? kycStatus.gender : null,
    phone_number: kycStatus ? kycStatus.phone_number : null,
  };

  const document_status = { kyc_documents_status: 'pending' };
  const video_status = { kyc_documents_video_status: "pending" };

  React.useEffect(() => {
    if (kycStatus) {
      function checkObjectPresence(object1: Record<string, any>, generalObject: Record<string, any>): boolean {
        const object1Keys = Object.keys(object1);
      
        return object1Keys.every((key) => generalObject.hasOwnProperty(key));
      };

      if (checkObjectPresence(stepOneData, kycStatus)) {
        setStepOneChecked(true);
      } else setStepOneChecked(false);

      if (kycStatus.front !== '' || kycStatus.back !== '' || kycStatus.hold !== '') {
        if (checkObjectPresence(document_status, kycStatus)) {
          setStepTwoChecked(true)
        }
      } else setStepTwoChecked(false);

      if (kycStatus.short_video) {
        if (checkObjectPresence(video_status, kycStatus)) {
          setStepThreeChecked(true)
        }
      } else setStepThreeChecked(false); 
    }
  }, [kycStatus]);

  const checkStatus = () => {
    if (user && kycStatus) {
      if (kycStatus.status === 'Verified') {
        identityVerified.onOpen();
      } else {
        verificationInProgress.onOpen();
      }
    }
  }



  return (
    <div className="bg-white rounded px-3 py-4 lg:px-4 lg:py-5 mt-3">
      <div className="w-full lg:w-[61%] h-[170px] lg:h-[200px] flex flex-col justify-between">
        <div className="w-full">
          <h2 className="font-bold font-Inter lg:text-[20px] leading-normal mb-2 text-base">Standard Identity Verification</h2>
          <p className="text-sm font-Inter">It only takes 3-5 minutes to verify your account. Unlock all trading permissions and enjoy access to our full range of products & services</p>
        </div>
        <div>
          {stepOneChecked && stepTwoChecked && stepThreeChecked ?
            <button className="bg-primary hover:bg-secondary font-semibold text-white px-4 py-2 lg:px-6 lg:py-3 rounded-md text-sm lg:text-base" onClick={checkStatus}>Check Status!</button> :
            <button className="bg-primary hover:bg-secondary font-semibold text-white px-4 py-2 lg:px-6 lg:py-3 rounded-md text-sm lg:text-base" onClick={() =>onOpen()}>Verify Now!</button>
          }
        </div>
      </div>
    </div>
  )
};

export default StartVerification