import React from 'react'
import { AuthInput } from '../../auth/AuthInput'
import { format } from "date-fns";
import { cn } from '../../../lib/utils';
import {  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import nationalitiesJson from './nationalities.json'
import { useToast } from '../../../hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import useUserDetails from '../../../stores/userStore';
import { CustomSelectSearch } from '../../ui/custom-select-search';


const StepOne = ({setCurrentStep, currentStep}:{currentStep:number; setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) => {
  const { user, kycDetails, fetchKycDetails, token, fetchKycStatus, kycStatus } = useUserDetails();

  const [lname, setLName] = React.useState(kycDetails ? kycDetails.lname : '');
  const [fname, setFName] = React.useState(kycDetails ? kycDetails.fname : '');
  const [dateOfBirth, setDateOfBirth] = React.useState<string| null>(kycDetails ? kycDetails.dateOfBirth : null);


  React.useLayoutEffect(() => {
    if (user) {
      fetchKycDetails();
      fetchKycStatus();
    }
  }, [user]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const [gender, setGender] = React.useState(kycDetails ? kycDetails.gender : '');
  const [nationality, setNationality] = React.useState(kycDetails ? kycDetails.nationality : '');
  const [phoneNumber, setPhoneNumber] = React.useState(kycDetails ? kycDetails.phone_number : '');


  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const nationalities = nationalitiesJson;

  const formatPhoneNumber = (phoneNumber:string) => {
    const tenDigits = phoneNumber?.slice(1, 11)
    return `+234${tenDigits}`;
  };

  const onNext = () => {

    if (currentStep === 2) {
      return;
    };

    if (!lname || !fname || !dateOfBirth || !gender || !nationality || !phoneNumber) {
      toast({
        title: 'Error',
        description: 'Make sure all fields are completely filled inorder to proceed!',
        variant: 'destructive'
      });
      return;
    };

    const stepOneData = {
      lname: lname,
      fname: fname,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
      gender: gender,
      nationality: nationality,
      phone_number: formatPhoneNumber(phoneNumber),
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/add-biodata',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: stepOneData,
    };

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
  };

  const GenderSelect = () => {
    return (
      <Select onValueChange={(value) => setGender(value)} defaultValue={gender}>
        <SelectTrigger className={cn("w-full h-full pl-4 font-semibold text-base focus:border-primary focus:border-2 focus:ring-0", gender ? 'lg:pt-5 pt-6': '')}>
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent className='z-[300000]'>
          <SelectGroup>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem> 
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  };

  const stepOneData = {
    lname: lname,
    fname: fname,
    dateOfBirth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
    gender: gender,
    phone_number: formatPhoneNumber(phoneNumber),
  };

  React.useEffect(() => {
    if (kycStatus) {
      function checkObjectPresence(object1: Record<string, any>, generalObject: Record<string, any>): boolean {
        const object1Keys = Object.keys(object1);
      
        return object1Keys.every((key) => generalObject.hasOwnProperty(key));
      }

      if (kycStatus.lname !== null && kycStatus.fname !== null && kycStatus.dateOfBirth !== null && kycStatus.gender !== null && kycStatus.phone_number !== null) {
        if (checkObjectPresence(stepOneData, kycStatus)) {
          setCurrentStep(1);
        }
      }

    }
  }, [kycStatus]);

  

  
  return (
    <div className='flex flex-col lg:gap-1 gap-2'>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Bio-Data</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={kycDetails ? kycDetails.lname : lname}
          onChange={(e) => setLName(e.target.value)}
          value={lname}
          label='Last Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='lname'
          id='lname'
        />
        <AuthInput
          inputValue={fname}
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          label='First Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='fname'
          id='fname'
        />
        <div className="relative">
          {/* {dateOfBirth && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Date of Birth</label>} */}
          <div className='w-full lg:h-[55px] h-[48px] relative border rounded-md px-4 flex gap-2 items-center'>
            <h2 className={cn('font-semibold')}>Date Of Birth</h2>
            <input 
              type="date" 
              className={cn('flex-1 h-full focus:outline-none')}
              value={dateOfBirth || ''}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="w-full lg:h-[60px] h-[48px] relative">
          {gender && <label className='-translate-y-[4%] text-black/50 top-1.5 text-[12px] lg:text-[13px] font-semibold absolute left-4'>Gender</label>}
          <GenderSelect/>
        </div>
        <div className="w-full lg:h-[60px] h-[48px] relative">
          <CustomSelectSearch
            name='Nationality'
            value={nationality}
            setValue={setNationality}
            stringArray={nationalities}
          />
        </div>
      </div>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Contact Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={phoneNumber}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label='Phone Number'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='phoneNumber'
          id='phoneNumber'
        />
      </div>
      <div className='lg:p-2 lg:mt-2 mt-5'>
        <button className='py-3 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px] flex items-center gap-3' onClick={onNext} disabled={isLoading}>
          {isLoading ? 'Updating bio-data' : 'Proceed'}
          {isLoading && <Loader2 className='animate-spin'/>}
        </button>
      </div>
    </div>
  )
};

export default StepOne;