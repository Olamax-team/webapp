import React from 'react'
// import banner from '../../assets/images/signIn_banner.png'
// import logo from '../../assets/images/olamax_logo_2.png'
// import icon from '../../assets/images/icon.png'
// import arrow from '../../assets/images/arrow-left.png'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  children:React.ReactNode
}

const AuthLayout = ({children}: Props) => {
  const navigate = useNavigate();

  return (
    <div className='w-full lg:h-screen'>
      <div className="w-full lg:h-[100px] md:h-[80px] h-[64px] shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)] lg:px-[80px] px-[50px] md:px-[90px] flex items-center justify-between">
        <Link className='w-[110px] h-[34px] lg:w-[153px] lg:h-[48px]' to={'/'}>
          <img src={'/images/olamax_logo_2.png'} alt="logo" className='object-cover'/>
        </Link>
        <button className="size-[40px] flex items-center justify-center">
          <img src={'/images/icon.png'} alt="question_mark" className='object-cover'/>
        </button>
      </div>
      <div className='w-full lg:h-full md:h-[calc(100vh_-_80px)] h-[calc(100vh_-_64px)] flex lg:flex-row flex-col relative'>
        <div className='h-full flex-none hidden lg:block'>
          <img src={'/images/signIn_banner.png'} alt="auth_banner" className='w-full h-full object-cover'/>
        </div>
        <button className='absolute top-[68px] right-[80px] lg:flex gap-4 items-center text-black/50 hidden' onClick={() => navigate(-1)}>
          <div className="size-[20px]">
            <img src={'/images/arrow-left.png'} alt="arrow_icon"/>
          </div>
          Back
        </button>
        <div className='flex-1 lg:px-[64px] h-full lg:pt-[41px] flex lg:block items-center justify-center px-6'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout