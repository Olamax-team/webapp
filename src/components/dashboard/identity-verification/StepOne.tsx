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
import { HiArrowRight } from 'react-icons/hi2';
import { useApiConfig } from '../../../hooks/api';


const StepOne = ({setCurrentStep, currentStep}:{currentStep:number; setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) => {
  const { user, token, fetchKycStatus, kycStatus, fetchUserDetails, userDetails } = useUserDetails();

  const [lname, setLName] = React.useState(userDetails ? userDetails.last_name : '');
  const [fname, setFName] = React.useState(userDetails ? userDetails.first_name : '');
  const [mname, setMName] = React.useState(userDetails ? userDetails?.middle_name : '');
  const [dateOfBirth, setDateOfBirth] = React.useState<string| null>(userDetails ? userDetails.date_of_birth : null);
  const [address, setAddress] = React.useState(userDetails ? userDetails.address : '');
  const [city, setCity] = React.useState('');


  React.useLayoutEffect(() => {
    if (user) {
      fetchUserDetails();
      fetchKycStatus();
    }
  }, [user]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const [gender, setGender] = React.useState(userDetails && userDetails.gender !== null ? userDetails.gender : '');
  const [nationality, setNationality] = React.useState(userDetails ? userDetails.nationality : '');
  const [phoneNumber, setPhoneNumber] = React.useState(userDetails ? userDetails.phone_number : '');
  const [phoneOtp, setPhoneOtp] = React.useState('')


  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const nationalities = nationalitiesJson;

  const formatPhoneNumber = (phoneNumber:string) => {
    const tenDigits = phoneNumber?.slice(1, 11)
    return `+234${tenDigits}`;
  };

  const onNext = () => {

    if (currentStep === 4) {
      return;
    };

    if (!lname || !fname || !dateOfBirth || !gender || !nationality || !phoneNumber || !mname || !address) {
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
      mname: mname,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
      gender: gender,
      address: address,
      nationality: nationality,
      phone_number: formatPhoneNumber(phoneNumber),
      city: city,
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
        console.log(error)
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
        <SelectTrigger className={cn("text-sm w-full h-full pl-4 font-semibold focus:border-primary focus:border-2 focus:ring-0", gender ? 'lg:pt-5 pt-6': '')}>
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent className='z-[300000]'>
          <SelectGroup>
            <SelectItem value="male" className='text-sm'>Male</SelectItem>
            <SelectItem value="female" className='text-sm'>Female</SelectItem> 
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  };

  const stepOneData = {
    lname: lname,
    fname: fname,
    mname: mname,
    address: address,
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

      if (kycStatus.lname !== null && kycStatus.fname !== null && kycStatus.dateOfBirth !== null && kycStatus.gender !== null && kycStatus.phone_number !== null && address !== null && kycStatus.mname !== null) {
        if (checkObjectPresence(stepOneData, kycStatus)) {
          setCurrentStep(1);
        }
      }

    }
  }, [kycStatus]);

  const sendOtpConfig = useApiConfig({
    url: 'get-sms-otp',
    method: 'post',
    formdata: {phone_number: phoneNumber, email: 'eluxdon@gmail.com'}
  });

  const verifyOtpConfig = useApiConfig({
    url: 'verify-sms-otp',
    method: 'post',
    formdata: {verify_otp: phoneOtp}
  })

  const [disableProceed, setDisableProceed] = React.useState(true);
  const [showOtp, setShowOtp] = React.useState(false)

  const sendOtp = async () => {
    await axios.request(sendOtpConfig)
    .then((response) => {
      if (response && response.status === 200) {
        toast({
          title: 'Success',
          description: 'Otp successfully sent to your phone number',
          variant: 'success'
        })
        setShowOtp(true);
      }
    })
  };

  const verifyOtp = async () => {
    await axios.request(verifyOtpConfig)
    .then((response) => {
      if (response && response.status === 200) {
        toast({
          title: 'Success',
          description: 'Phone number successfully verified',
          variant: 'success'
        })
        setPhoneOtp('');
        setShowOtp(false);
        setDisableProceed(false);
      }
    })
  };

  return (
    <div className='flex flex-col lg:gap-1 gap-2'>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Bio-Data</h2>
      <div className="grid grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={lname || ''}
          value={lname ?? ''}
          onChange={(e) => setLName(e.target.value)}
          label='Last Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='lname'
          id='lname'
        />
        <AuthInput
          inputValue={fname || ''}
          value={fname ?? ''}
          onChange={(e) => setFName(e.target.value)}
          label='First Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='fname'
          id='fname'
        />
        <AuthInput
          inputValue={mname || ''}
          value={mname ?? ''}
          onChange={(e) => setMName(e.target.value)}
          label='Middle Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='mname'
          id='mname'
        />
        <div className="relative">
          <div className='w-full lg:h-[55px] h-[48px] relative border rounded-md px-4 flex gap-2 items-center'>
            <h2 className={cn('font-semibold hidden md:block')}>Date Of Birth</h2>
            <h2 className={cn('font-semibold md:hidden')}>DOB</h2>
            <input 
              type="date" 
              className={cn('flex-1 h-full focus:outline-none text-sm')}
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
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Contact Address</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={address || ''}
          value={address ?? ''}
          onChange={(e) => setAddress(e.target.value)}
          label='Address'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='address'
          id='address'
        />
        <AuthInput
          inputValue={city}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label='City'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='city'
          id='city'
        />
      </div>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Contact Information</h2>
      <div className="grid grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={phoneNumber}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onBlur={() => sendOtp()}
          label='Phone Number'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          name='phoneNumber'
          id='phoneNumber'
        />
        { showOtp &&
          <div className="w-full flex gap-3">
            <div className="flex-1">
              <AuthInput
                inputValue={phoneOtp}
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                label='Phone OTP'
                inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px] flex-1'
                name='phoneOtp'
                id='phoneOtp'
              />
            </div>
            <button type="button" className='border rounded-md px-3 flex-none' onClick={() => verifyOtp()}>
              <HiArrowRight/>
            </button>
          </div>
        }
      </div>
      { !disableProceed &&
        <div className='lg:p-2 lg:mt-2 mt-5'>
          <button className='py-3 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px] flex items-center gap-3' onClick={onNext} disabled={isLoading}>
            {isLoading ? 'Updating bio-data' : 'Proceed'}
            {isLoading && <Loader2 className='animate-spin'/>}
          </button>
        </div>
      }
    </div>
  )
};

export default StepOne;