import React from 'react'
import {  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../../lib/utils';
import { Loader2, Paperclip, X } from 'lucide-react';
import { HiOutlineDocumentText} from 'react-icons/hi';
import { AuthInput } from '../../auth/AuthInput';
import { useToast } from '../../../hooks/use-toast';
import axios from 'axios';
import useUserDetails from '../../../stores/userStore';

type kyc = {
  method: string;
  name: string;
};

const StepTwoMobile = ({setCurrentStep, currentStep}:{currentStep:number; setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) => {

  const [documentType, setDocumentType] = React.useState('');
  const [frontImage, setFrontImage] = React.useState<File | null>(null);
  const [backImage, setBackImage] = React.useState<File | null>(null);
  const [holdingImage, setHoldingImage] = React.useState<File | null>(null);
  const [nin, setNin] = React.useState('');

  const formData = new FormData();

  const { toast } = useToast();
  const { token, user, kycStatus, fetchKycStatus, fetchKycDetails } = useUserDetails();
  const [isLoading, setIsLoading] = React.useState(false);

  const [availableKyc, setAvailableKyc] = React.useState<kyc[]>([])

  React.useEffect(()=> {
    if (user) {
      const fetchKyc = () => {
        const config = {
          method: 'get',
          url: 'https://api.olamax.io/api/available-kyc-method',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          },
        };
    
        axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            setAvailableKyc(response.data.kyc_methods)
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            console.error("Error fetching data message:", error.response?.data.message || error.message);        
          } else {
            console.error("Unexpected error:", error);
          }; 
        });
      };
  
      fetchKyc();
      fetchKycStatus();
      fetchKycDetails();
    }
  },[user]);
 
  const DocumentSelect = () => {

    const handleDocumentSelect = (value:string) => {
      setDocumentType(value);
    };

    console.log(availableKyc);

    return (
      <Select onValueChange={(value) => handleDocumentSelect(value)} defaultValue={documentType}>
        <SelectTrigger className={cn("w-full h-full pl-4 font-semibold text-base focus:border-primary focus:border-2 focus:ring-0", documentType ? 'lg:pt-5 pt-6': '')}>
          <SelectValue placeholder="Select Identity type" />
        </SelectTrigger>
        <SelectContent className='z-[300000]'>
          <SelectGroup>
          {availableKyc === undefined && <Loader2 className='animate-spin'/>}
            {availableKyc && availableKyc.map((item) => (
              <SelectItem value={item.method}>{item.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  };

  const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>, key: 'front' | 'back' | 'holding') => {
    const file = event.target.files?.[0];

    if (file) { 
      if (key === 'front') {
        setFrontImage(file);
      } else if (key === 'back') {
        setBackImage(file);
      } else {
        setHoldingImage(file);
      } 
    }
  };

  const cancelImage = ( type:string) => {

    if (type === 'front') {
      setFrontImage(null);
    } else if (type === 'back') {
      setBackImage(null);
    } else {
      setHoldingImage(null);
    }
  };

  const displayImage = (file: File | null, onClick:() =>void): JSX.Element | null => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div className='w-fit relative'>
          <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '100px', maxHeight: '100px' }} className='rounded-md'/>
          <button type='button' className="size-7 bg-white absolute bottom-2 right-2 flex items-center justify-center rounded-md" onClick={onClick}>
            <X className=' text-red-500'/>
          </button>
        </div>
      )
    }
    return null;
  };

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

  const handleSubmit = () => {
    if (documentType === 'nin') {

      const kycData = {
        method: 'nin',
        identityNumber: nin
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/start-kyc-verification',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: kycData,
      };

      if (currentStep === 4) {
        return;
      };

      if (documentType === 'nin') {
        if (nin.trim().length < 11 || nin.trim().length > 11 || !isNumeric(nin)) {
          toast({
            title: 'Error',
            description:'Invalid NIN number!!!',
            variant: 'destructive'
          });
          setNin('')
          return;
        }
      }

      setIsLoading(true);
      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: 'Success',
              description: response.data.message,
              variant: 'success'
            });
            setIsLoading(false);
            setCurrentStep((prevNum) => prevNum + 1)
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            toast({
              title: 'Error',
              description: error.response? error.response.data.message : 'Something went wrong, try again later!',
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
    } else {

      formData.append('method', documentType);
      if (frontImage) {
        formData.append('front', frontImage, frontImage.name)
      };
      if (backImage) {
        formData.append('back', backImage, backImage.name)
      };
      if (holdingImage) {
        formData.append('hold', holdingImage, holdingImage.name)
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/upload-document',
        headers: {
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        data: formData,
      };

      if (documentType === '' || backImage === null || frontImage === null || holdingImage === null) {
        toast({
          title: 'Error',
          description: 'All fields are required!!!',
          variant: 'destructive'
        });
        return;
      } else {
        setIsLoading(true);
        axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: 'Success',
              description: response.data.message,
              variant: 'success'
            });
            setIsLoading(false);
            setCurrentStep((prevNum) => prevNum + 1);
          };
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            toast({
              title: 'Error',
              description: error.response? error.response.data.message : 'Something went wrong, try again later!',
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
      };
    };
  };

  const document_status = {kyc_documents_status: 'pending'}

  React.useLayoutEffect(() => {
    if (kycStatus) {
      function checkObjectPresence(object1: Record<string, any>, generalObject: Record<string, any>): boolean {
        const object1Keys = Object.keys(object1);
      
        return object1Keys.every((key) => generalObject.hasOwnProperty(key));
      }

      if (kycStatus.front !== null || kycStatus.back !== null || kycStatus.hold !== null) {
        if (checkObjectPresence(document_status, kycStatus)) {
          setCurrentStep(3);
        }
      };

    }
  }, [kycStatus]);

  return (
    <div className="w-full lg:hidden">
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Select Document Type</h2>
      <div className="mt-3 flex flex-col gap-3">
        <div className="w-full lg:h-[60px] h-[48px] relative mb-2">
          {documentType && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Identity Type</label>}
          <DocumentSelect/>
        </div>
        { documentType === 'nin' ?
          <React.Fragment>
            <h2 className='text-sm'>Confirming your NIN helps us verify your identity and protect your account from fraud.</h2>
            <AuthInput
              inputValue={nin}
              value={nin}
              onChange={(e) => setNin(e.target.value)} 
              label='NIN'
              inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
            />
          </React.Fragment> :
          <React.Fragment>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm'>Document Front Side</h2>
              {frontImage ?
                <React.Fragment>
                  {displayImage(frontImage, () =>cancelImage('front'))}
                </React.Fragment> :
                <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='front-image'>
                  <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                  <p className='text-sm'>Upload Document</p>
                  <input type='file' id='front-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'front')}/>
                </label>
              }
            </div>
            {documentType === ''}
            <div className='flex flex-col gap-2'> 
              <h2 className='text-sm'>Document Back Side</h2>
              { backImage ?
                <React.Fragment>
                  {displayImage(backImage, () =>cancelImage('back') )}
                </React.Fragment> :
                <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='back-image'>
                  <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                  <p className='text-sm'>Upload Document</p>
                  <input type='file' id='back-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'back')}/>
                </label>
              }
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm'>User Holding Document</h2>
              { holdingImage ? 
                <React.Fragment>
                  {displayImage(holdingImage, () =>cancelImage('holding'))}
                </React.Fragment> :
                <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='holding-image'>
                  <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                  <p className='text-sm'>Upload Document</p>
                  <input type='file' id='holding-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'holding')}/>
                </label>
              }
            </div>
          </React.Fragment>
        }
        { documentType === 'nin' ?
            <div className='lg:p-2 lg:mt-2 mt-5'>
              <button className='py-3 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px] flex items-center justify-center gap-3 disabled:bg-primary/50' onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? `${'Verifying NIN...'}` : 'Proceed'}
                {isLoading && <Loader2 className='animate-spin'/>}
              </button>
            </div>
          :
          <div className='lg:p-2 lg:mt-2 mt-5'>
            <button className='py-3 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px] flex items-center justify-center gap-3 disabled:bg-primary/50' onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Uploading documents...' : 'Proceed'}
              {isLoading && <Loader2 className='animate-spin'/>}
            </button>
          </div>
        }
      </div>
    </div>
  )
};

export default StepTwoMobile;
