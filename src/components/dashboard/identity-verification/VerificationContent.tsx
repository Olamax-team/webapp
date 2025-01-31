import StartVerification from './StartVerification'
import FaqList from './FaqList'

const VerificationContent = () => {
  return (
    <div className="flex flex-col gap-6 lg:w-[580px] w-full">
      <div className="w-full">
        <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">Verify Your Identity</h2>
        <p className="font-Inter text-sm">This process helps protect your account & allows for seamless trading</p>
      </div>
      <StartVerification/>
      <div className="flex flex-col gap-4 bg-white rounded px-3 py-4 lg:px-4 lg:py-5">
        <h2 className="mb-2 text-[20px] leading-normal font-bold">Frequently Asked Questions</h2>
        <FaqList/>
      </div>
    </div>
  )
}

export default VerificationContent