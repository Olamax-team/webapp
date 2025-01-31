import ImageAvatar from '../../ui/image-avatar'
import avatar from '../../../assets/images/avatar_1.png'
import { HiOutlineDuplicate, HiOutlineShieldCheck } from 'react-icons/hi'


const NameHeader = () => {
  const accountNumber = '20921123';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("copied!");
  };

  return (
    <div className="w-full h-[75px] lg:h-[100px] rounded-md bg-white p-4 lg:p-5 flex items-center justify-between">
      <div className="flex gap-4">
        <ImageAvatar image={avatar} style='lg:size-[60px] size-[40px]'/>
        <div>
          <h2 className='font-bold lg:text-lg text-sm'>Tosin Adebayor</h2>
          <button className='flex gap-3 items-center' onClick={copyToClipboard}>
            <h2 className='md:text-sm text-xs'>{accountNumber}</h2>
            <HiOutlineDuplicate className='lg:size-6 size-5'/>
          </button>
        </div>
      </div>
      <div className='flex items-center gap-2 text-[#34A853]'>
        <HiOutlineShieldCheck className='lg:size-6 size-5'/>
        <h2 className='text-xs md:text-sm lg:text-base'>Verified</h2>
      </div>
    </div>
  )
}

export default NameHeader