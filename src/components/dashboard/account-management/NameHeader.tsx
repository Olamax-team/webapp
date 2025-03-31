import useUserDetails from '../../../stores/userStore';
import ImageAvatar from '../../ui/image-avatar'
// import avatar from '../../../assets/images/avatar_1.png'
import { HiOutlineDuplicate, HiOutlineShieldCheck } from 'react-icons/hi'
import React from 'react';
import { cn } from '../../../lib/utils';


const NameHeader = () => {
  const { user, fetchKycDetails, kycDetails } = useUserDetails();

  React.useLayoutEffect(() => {
    if (user) {
      fetchKycDetails();
    }
  },[user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(kycDetails? kycDetails.uid : '');
    alert("copied!");
  };

  return (
    <div className="w-full h-[75px] lg:h-[100px] rounded-md bg-white p-4 lg:p-5 flex items-center justify-between">
      <div className="flex gap-4">
        <ImageAvatar image={'/images/avatar_1.png'} style='lg:size-[60px] size-[40px]'/>
        <div>
          <h2 className='font-bold lg:text-lg text-sm'>{kycDetails ? `${kycDetails.fname + ' ' + kycDetails.lname}` : user?.email}</h2>
          <button className='flex gap-3 items-center' onClick={copyToClipboard}>
            <h2 className='md:text-sm text-xs'>{kycDetails?.uid}</h2>
            <HiOutlineDuplicate className='lg:size-6 size-5'/>
          </button>
        </div>
      </div>
      <div className={cn('flex items-center gap-2 ', kycDetails && kycDetails.status === 'Verified' ? 'text-[#34A853]': 'text-orange-500')}>
        <HiOutlineShieldCheck className='lg:size-6 size-5'/>
        <h2 className='text-xs md:text-sm lg:text-base'>{kycDetails ? kycDetails.status : 'Unverified'}</h2>
      </div>
    </div>
  )
}

export default NameHeader