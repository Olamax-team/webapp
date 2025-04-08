import { cn } from '../../../lib/utils';

const sideInformations = [
  [
    "Please double-check your information. Incorrect details may delay verification.",
    "Use your full legal name as it appears on your official documents.",
    "Avoid using any nicknames or aliases to prevent verification issues.",
    "Your information is securely stored and used solely for identity"
  ],
  [
    "Ensure documents are clearly visible and not blurry to avoid verification delays.",
    "Only valid, unexpired documents are accepted; expired IDs will delay your application.",
    "The name on your documents must match the personal information provided.",
    "Submit full, uncropped images of your documents to ensure all information is visible.",
    "Ensure each document is under the max file size limit of 5MB for faster upload and processing."
  ],
  [
    "Ensure your face is place at the center of the circle",
    "Check that your camera has no dust on it.",
    "Check that your background is not blurry or faint",
  ],
]

type sideInfoProps = {
  open:boolean, 
  currentStep: number
}

const SideInformation = ({open, currentStep}:sideInfoProps) => {

  const SideInformationItem = ({text}:{text:string}) => {
    return (
      <div className='border borde-2 rounded-md p-3 bg-white/20'>
        <p className='text-[13px] leading-normal font-Inter'>{text}</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full hidden lg:flex items-center justify-between lg:mb-2">
        <p className='font-poppins'>Information</p>
      </div>
      <div className="pb-0 lg:flex flex-col gap-4 hidden">
        { sideInformations[currentStep].map((text:string, index:number) => (
          <SideInformationItem key={index} text={text}/>
        ))}
      </div>
      <div className={cn("pb-0 flex-col gap-4 hidden", open && 'flex lg:hidden')}>
        { sideInformations[currentStep].map((text:string, index:number) => (
          <SideInformationItem key={index} text={text}/>
        ))}
      </div>
    </div>
  )
}

export default SideInformation