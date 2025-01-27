import { cn } from '../../../lib/utils';

const sideInformations = [
  "Please double-check your information. Incorrect details may delay verification.",
  "Use your full legal name as it appears on your official documents.",
  "Avoid using any nicknames or aliases to prevent verification issues.",
  "Your information is securely stored and used solely for identity"
]

const SideInformation = ({open}:{open:boolean}) => {

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
      <div className="pb-10 lg:flex flex-col gap-4 hidden">
        { sideInformations.map((text:string, index:number) => (
          <SideInformationItem key={index} text={text}/>
        ))}
      </div>
      <div className={cn("pb-10 flex-col gap-4 hidden", open && 'flex lg:hidden')}>
        { sideInformations.map((text:string, index:number) => (
          <SideInformationItem key={index} text={text}/>
        ))}
      </div>
    </div>
  )
}

export default SideInformation