import React from 'react'
import { AuthInput } from '../../auth/AuthInput';
import { Loader2, Paperclip, X } from 'lucide-react';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import useUserDetails from '../../../stores/userStore';
import { useToast } from '../../../hooks/use-toast';
import axios from 'axios';

const StepFour = ({setCurrentStep, currentStep}:{currentStep:number; setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) => {
  const { user, token, fetchKycStatus, kycStatus, fetchUserDetails, userDetails } = useUserDetails();

  React.useEffect(()=> {
    if (user) {}
    fetchKycStatus();
    fetchUserDetails();
  }, [user, fetchKycStatus, fetchUserDetails]);

  console.log(kycStatus);
  console.log(userDetails);


  const bvn_status = { bvn_status: true };
  
  React.useEffect(() => {
    if (kycStatus) {
      function checkObjectPresence(object1: Record<string, any>, generalObject: Record<string, any>): boolean {
        const object1Keys = Object.keys(object1);
      
        return object1Keys.every((key) => generalObject.hasOwnProperty(key));
      }

      if (kycStatus.bvn_status !== null || kycStatus.address_file !== null) {
        if (checkObjectPresence(bvn_status, kycStatus)) {
          setCurrentStep(2);
        }
      };

    }
  }, [kycStatus]);
  const [bvn, setBVN] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();
  const formData = new FormData();

  const isNumeric = (str:string) => {
    if (typeof str !== 'string' || str.length === 0) {
      return false;
    }
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode === 32) continue;
      if (isNaN(Number(str[i])) || !Number.isFinite(Number(str[i]))) {
        return false;
      }
    }
    return true;
  }

  const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) { 
      setImage(file);
    }
  };

  const cancelImage = () => {
    setImage(null)
  };

  const displayImage = (file: File | null, onClick:() =>void): JSX.Element | null => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div className='w-fit relative'>
          <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '120px', maxHeight: '120px' }} className='rounded-md'/>
          <button type='button' className="size-7 bg-white absolute bottom-2 right-2 flex items-center justify-center rounded-md" onClick={onClick}>
            <X className=' text-red-500'/>
          </button>
        </div>
      )
    }
    return null;
  };

  const handleSubmit = () => {

    if (currentStep === 4) {
      return;
    }

    if (!bvn) {
      toast({
        title: 'Error',
        description: 'BVN is required!!!',
        variant: 'destructive'
      });
      return;
    }

    if (bvn.trim().length < 11 || bvn.trim().length > 11 || !isNumeric(bvn)) {
      toast({
        title: 'Error',
        description:'Invalid BVN number!!!',
        variant: 'destructive'
      });
      setBVN('')
      return;
    }

    if (image === null) {
      toast({
        title: 'Error',
        description: 'Utility Bill is required!!!',
        variant: 'destructive'
      });
      return;
    }

    const kycBvnData = {
      method: 'bvn',
      identityNumber: bvn,
    }

    const kycBvnConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/start-kyc-verification',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: kycBvnData,
    };

    setIsLoading(true);
    axios.request(kycBvnConfig)
      .then((response) => {
        if (response.status === 200) {
          if (image) {
            formData.append('address_file', image);

            const utilityBillConfig = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api.olamax.io/api/upload-address',
              headers: {
                'Content-Type':'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
              data: formData,
            };

            axios.request(utilityBillConfig)
            .then((result) => {
              if (result.status === 200) {
                toast({
                  title: 'Success',
                  description: 'BVN verified & Utility Bill uploaded successfully!',
                  variant: 'success'
                });
              }
            });
            setIsLoading(false);
            setCurrentStep((prevNum) => prevNum + 1);
          }
        };
      }).catch((error) => {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Error',
            description: error.response? error.response.data.message : 'BVN verification failed, try again later!',
            variant: 'destructive'
          });
          setIsLoading(false);
          console.error("Error fetching data message:", error.response?.data.message || error.message);
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong!! Try again later',
            variant: 'destructive'
          });
          setIsLoading(false);
          console.error("Unexpected error:", error);
        };
      });
  }   


   return (
    <div className='flex flex-col lg:gap-1 gap-2'>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>BVN Details</h2>
      <div className="grid grid-cols-1 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={bvn}
          value={bvn ?? ''}
          onChange={(e) => setBVN(e.target.value)}
          label='BVN'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='bvn'
          id='bvn'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='font-semibold font-Inter text-sm lg:text-base'>Utility Bill</h2>
        <div className="p-2">
          { image ? 
            <React.Fragment>
              {displayImage(image, () =>cancelImage())}
            </React.Fragment> :
            <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='holding-image'>
              <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
              <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
              <p className='text-sm'>Upload Utility Bill (e.g tax payment, electricity bill, tenant agreement, electricity bill etc.)</p>
              <input type='file' id='holding-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e)}/>
            </label>
          }
        </div>
      </div>
      <div className='lg:p-2 lg:mt-2 mt-5'>
        <button className='py-3 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px] flex items-center justify-center gap-3 disabled:bg-primary/50' onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Verifying details...' : 'Proceed'}
          {isLoading && <Loader2 className='animate-spin'/>}
        </button>
      </div>
    </div>
  )
}

export default StepFour