import { Button } from "../ui/button"

const Contact = () => {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-4 xl:space-y-10 bg-white w-[80%] h-[160px] xl:h-[400px]">
        <h1 className="font-DMSans text-lg xl:text-[32px] xl:leading-[48px] font-bold">Can't find what you are looking for?</h1>
        {/* Contact Button */}
        <div className="flex items-center justify-center ">
            <Button 
            onClick={() => {}}
            className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px]  bg-primary hover:bg-secondary text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] font-semibold text-white py-2 rounded-lg">
            Contact Us
            </Button>
        </div>
        <div className="absolute bottom-0 left-0">
            <img
            src="/images/strokes.svg"
            alt="Decorative_strokes" 
            className="w-[40%] xl:w-full xl:object-contain h-full block "
            />
            {/* <img
            src="/images/strokessmall.svg"
            alt="Decorative_strokes" 
            className="object-contain h-full block xl:hidden"
            /> */}
        </div>
        <div className="absolute bottom-0 right-0">
            <img
            src="/images/strokes.svg"
            alt="Decorative_strokes" 
            className="xl:w-full xl:object-contain h-full hidden xl:block scale-x-[-1]"
            />
            {/* <img
            src="/images/strokessmall.svg"
            alt="Decorative_strokes" 
            className="object-contain h-full block xl:hidden scale-x-[-1]"
            /> */}
        </div>
    </div>  
  )
}

export default Contact
