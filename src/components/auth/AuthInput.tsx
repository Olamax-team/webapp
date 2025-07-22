import * as React from "react" 
import { cn } from "../../lib/utils"
import { EyeClosed, EyeIcon } from "lucide-react";

interface AuthInputProps extends React.ComponentProps<"input"> {
  boxStyle?: string;
  label?:string
  inputValue: string
  inputStyle?:string
};

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ inputValue, label, boxStyle, inputStyle, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    const togglePassword = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    }
    return (
      <div className={cn("relative",boxStyle)}>
        <input
          type={inputType}
          className={cn("box-border border border-solid-black/20 input h-[70px] w-full rounded-md focus:outline-none focus:border-2 focus:border-primary focus-visible:outline-none transition px-4 py-3 peer text-sm", inputStyle)}
          ref={ref}
          {...props}
        />
        <label className={cn("mb-2 font-Inter font-semibold absolute left-4 top-[50%] -translate-y-[50%] peer-focus:lg-text-[13px] peer-focus:text-[11px] leading-normal peer-focus:top-1.5 peer-focus:-translate-y-[5%] peer-focus:text-black/50 md:text-sm lg:text-base text-xs", inputValue && inputValue.length > 0 && '-translate-y-[4%] text-black/50 top-1.5 text-[12px] lg:text-[13px]')}>{label}</label>
        { type === 'password' &&
          <button className="absolute top-1/2 right-4 -translate-y-1/2" onClick={togglePassword} type="button">
            { inputType === 'text' ? <EyeIcon/> : <EyeClosed/> }
          </button>
        }
      </div>
    )
  }
)
AuthInput.displayName = "AuthInput"

export { AuthInput }