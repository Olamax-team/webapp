import useUserDetails from '../../../stores/userStore';
import { HiOutlineDuplicate, HiOutlineShieldCheck } from 'react-icons/hi'
import React from 'react';
import { cn } from '../../../lib/utils';
import { ImagePlusIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/use-toast';
import axios from 'axios';


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

  const { toast } = useToast();
  const { token } = useUserDetails();

  const [imageSrc, setImageSrc] = React.useState<string | undefined>('/images/avatar_1.png');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => { // Make handleImageChange async
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
              setImageSrc(e.target.result as string);

              const formData = new FormData();
              formData.append('image', file);

              try {
                const imageUploadConfig = { 
                  method: 'post',
                  url: 'https://your-api-endpoint.com/upload',
                  data: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                  },
                };
                const response = await axios.request(imageUploadConfig);

                if (response) {
                  console.log(response)
                };

              } catch (error) {
                console.error('Error uploading image:', error);
                toast({
                  title: 'Error',
                  description: 'An error occured while uploading profile image',
                  variant: 'destructive'
                });
                setImageSrc('/images/avatar_1.png');
              }
          }
        };
        reader.readAsDataURL(file);
    }
};

  return (
    <div className="w-full h-[105px] lg:h-[130px] rounded-md bg-white p-4 lg:p-5 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className='rounded-full lg:size-[90px] size-[70px] relative cursor-pointer'>
          <div className="opacity-0 hover:opacity-100 active:opacity-100 absolute left-0 top-0 w-full h-full rounded-full flex items-center justify-center bg-black/60 z-[300] text-white" onClick={handleImageClick}>
            <ImagePlusIcon className='lg:size-[45px] size-[35px]'/>
          </div>
          <img src={imageSrc} alt="profile" className='object-cover rounded-full h-full w-full'/>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            className="hidden"
          />
        </div>
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