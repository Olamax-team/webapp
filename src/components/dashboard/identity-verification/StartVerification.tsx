import { useUploadDocumentModal } from "../../../lib/utils";

const StartVerification = () => {
  const { onOpen } = useUploadDocumentModal();

  return (
    <div className="bg-white rounded px-3 py-4 lg:px-4 lg:py-5 mt-3">
      <div className="w-full lg:w-[61%] h-[170px] lg:h-[200px] flex flex-col justify-between">
        <div className="w-full">
          <h2 className="font-bold font-Inter lg:text-[20px] leading-normal mb-2 text-base">Standard Identity Verification</h2>
          <p className="text-sm font-Inter">It only takes 3-5 minutes to verify your account. Unlock all trading permissions and enjoy access to our full range of products & services</p>
        </div>
        <div>
          <button className="bg-primary hover:bg-secondary font-semibold text-white px-4 py-2 lg:px-6 lg:py-3 rounded-md text-sm lg:text-base" onClick={() =>onOpen()}>Verify Now!</button>
        </div>
      </div>
    </div>
  )
};

export default StartVerification