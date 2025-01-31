import * as React from "react" 
import { cn } from "../../lib/utils"

interface AuthInputProps extends React.ComponentProps<"input"> {
  boxStyle?: string;
  label?:string
  inputValue: string
  inputStyle?:string
};

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ inputValue, label, boxStyle, inputStyle, type, ...props }, ref) => {

    return (
      <div className={cn("relative",boxStyle)}>
        <input
          type={type}
          className={cn("box-border border border-solid-black/20 input h-[70px] w-full rounded-md focus:outline-none focus:border-2 focus:border-primary focus-visible:outline-none transition px-4 py-3 peer", inputStyle)}
          ref={ref}
          {...props}
        />
        <label className={cn("mb-1 font-Inter font-semibold absolute left-4 top-[50%] -translate-y-[50%] peer-focus:text-[13px] leading-normal peer-focus:top-2 peer-focus:-translate-y-[5%] peer-focus:text-black/50 text-sm lg:text-base", inputValue && inputValue.length > 0 && '-translate-y-[5%] text-black/50 top-2 text-[13px] lg:text-[13px]')}>{label}</label>
      </div>
    )
  }
)
AuthInput.displayName = "AuthInput"

export { AuthInput }