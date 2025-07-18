import React from 'react'
import { documentTitle } from '../lib/utils'

const ComingSoon = () => {
  documentTitle('Coming Soon');
  const [email, setEmail] = React.useState('')
  return (
    <div className='w-full h-screen pt-5 pb-10 bg-gray-100'>
      <div className="w-[90%] mx-auto h-full overflow-hidden bg-[url('/images/undraw_qa.svg')] bg-contain md:bg-left bg-bottom bg-no-repeat">
        <div className='w-[110px] xl:w-[153px] h-[34px] xl:h-[48px]'>
          <img src={'/images/olamax_logo_2.png'} alt="logo" className='object-cover '/>
        </div>
        <div className="h-[calc(100%_-_34px)] 2xl:h-[calc(100%_-_48px)] flex flex-col md:items-end items-start md:justify-center">
          <div className="lg:w-[55%] 2xl:w-[45%] w-full mt-24 md:mt-0 flex flex-col lg:gap-6 gap-8 2xl:gap-7">
            <div className='border-l-4 2xl:border-l-[6px] border-black pl-3 py-0.5'>
              <h2 className='mb-3 font-bold 2xl:text-xl lg:text-lg'>COMING SOON</h2>
              <p className='font-medium 2xl:text-lg'>We are almost there! If you want to get notified when we start the escrow services, subscribe to our mailing list!</p>
            </div>
            <div className='text-4xl font-bold'>Get Notified when we launch this service.</div>
            <div className='flex items-center gap-5'>
              <input type="text" placeholder='Email Address' className='h-11 px-3 focus:outline-none flex-1 rounded' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="button" className='h-11 px-10 bg-black text-white rounded'>Notify Me!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon