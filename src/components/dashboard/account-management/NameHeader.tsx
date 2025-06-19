import React from 'react';
import { cn } from '../../../lib/utils';
import { ImagePlusIcon, Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { useToast } from '../../../hooks/use-toast';
import { HiOutlineDuplicate, HiOutlineShieldCheck } from 'react-icons/hi'
import axios from 'axios';
import useUserDetails from '../../../stores/userStore';


const NameHeader = () => {
  const { user, fetchKycStatus, fetchUserDetails, userDetails } = useUserDetails();

  React.useLayoutEffect(() => {
    if (user) {
      fetchKycStatus();
      fetchUserDetails();
    }
  },[user]);

  console.log(userDetails);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userDetails? userDetails.uid : '');
    alert("copied!");
  };

  const { toast } = useToast();
  const { token } = useUserDetails();
  const [isLoading, setIsLoading] = React.useState(false);

  const [imageSrc, setImageSrc] = React.useState<string | undefined>((userDetails && userDetails.profile_image) ? userDetails.profile_image : '/images/avatar_1.png');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
              setImageSrc(e.target.result as string);

              const formData = new FormData();
              formData.append('user_image', file);

              setIsLoading(true);
              try {
                const imageUploadConfig = { 
                  method: 'post',
                  url: 'https://api.olamax.io/api/change-profile-image',
                  data: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                  },
                };
                const response = await axios.request(imageUploadConfig);

                if (response) {
                  console.log(response)
                  if (response.status === 200) {
                    toast({
                      title: 'Success',
                      description: 'Profile image successfully uploaded',
                      variant: 'success'
                    })
                  }
                  setIsLoading(false)
                };

              } catch (error) {
                console.error('Error uploading image:', error);
                toast({
                  title: 'Error',
                  description: 'An error occured while uploading profile image',
                  variant: 'destructive'
                });
                setImageSrc('/images/avatar_1.png');
                setIsLoading(false);
              }
          }
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-[125px] lg:h-[160px] rounded-md bg-white p-4 lg:p-5 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className='rounded-full xl:size-[130px] lg:size-[110px] size-[90px] relative cursor-pointer'>
          <div className="opacity-0 hover:opacity-100 absolute left-0 top-0 w-full h-full rounded-full flex items-center justify-center bg-black/60 z-[300] text-white" onClick={handleImageClick}>
            <ImagePlusIcon className='lg:size-[45px] size-[35px]'/>
          </div>
          {isLoading &&
            <div className="absolute left-0 top-0 w-full h-full rounded-full flex items-center justify-center bg-black/60 z-[300] text-white">
              <div className='flex flex-col items-center text-sm'>
                Uploading..
                <Loader2 className='size-[30px] animate-spin'/>
              </div>
            </div>
          }
          <img src={imageSrc} alt="profile" className='object-cover rounded-full h-full w-full'/>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            className="hidden"
            disabled={isLoading}
          />
        </div>
        <div>
          <h2 className='font-bold lg:text-lg text-sm'>{userDetails ? `${userDetails.first_name + ' ' + userDetails.last_name}` : user?.email}</h2>
          <button className='flex gap-3 items-center' onClick={copyToClipboard}>
            <h2 className='md:text-sm text-xs'>{userDetails?.uid}</h2>
            <HiOutlineDuplicate className='lg:size-6 size-5'/>
          </button>
        </div>
      </div>
      <div className={cn('flex items-center gap-2 ', userDetails && userDetails.status === 'verified' ? 'text-[#34A853]': 'text-orange-500')}>
        <HiOutlineShieldCheck className='lg:size-6 size-5'/>
        <h2 className='text-xs md:text-sm lg:text-base'>{userDetails ? userDetails.status : 'Unverified'}</h2>
      </div>
    </div>
  )
}

export default NameHeader