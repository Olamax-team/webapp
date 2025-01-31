import React from 'react'
import { AuthInput } from '../../auth/AuthInput'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { HiOutlineCalendar } from 'react-icons/hi';
import { Calendar } from '../../ui/calendar';
import { format } from "date-fns";
import { cn } from '../../../lib/utils';
import {  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import nationalitiesJson from './nationalities.json'

const StepOne = ({setCurrentStep, currentStep}:{currentStep:number; setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) => {
  const [lname, setLName] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | undefined>();
  const [gender, setGender] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const nationalities = nationalitiesJson;

  const onNext = () => {
    if (currentStep === 2) {
      return;
    };

    setCurrentStep((prevNum) => prevNum + 1)
  }

  const DateComponent = () => {
    return (
      <Popover>
        <PopoverTrigger asChild className='focus:border-primary focus:border-2'>
          <button className={cn("w-full lg:h-[60px] h-[48px] flex items-center justify-between px-4 rounded-md border focus:border-primary focus:border-2", dateOfBirth ? "pt-5" :"")}>
            { dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : <span className='text-black font-semibold text-base'>Date of Birth</span> }
            <HiOutlineCalendar className="ml-auto size-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[300000]" align="start">
          <Calendar
            mode="single"
            selected={dateOfBirth}
            onSelect={setDateOfBirth}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
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

  const NationalitySelect = () => {
    return (
      <Select onValueChange={(value) => setNationality(value)} defaultValue={nationality}>
        <SelectTrigger className={cn("w-full h-full pl-4 font-semibold text-base focus:border-primary focus:border-2 focus:ring-0", nationality ? 'lg:pt-5 pt-6': '')}>
          <SelectValue placeholder="Select Nationality" />
        </SelectTrigger>
        <SelectContent className='z-[300000]'>
          <SelectGroup>
            { nationalities.map((item:string, index:number) => (
              <SelectItem value={item.toLowerCase()} key={index}>{item}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  };
  
  return (
    <div className='flex flex-col lg:gap-1 gap-2'>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Bio-Data</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={lname}
          onChange={(e) => setLName(e.target.value)}
          label='Last Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
        />
        <AuthInput
          inputValue={fname}
          onChange={(e) => setFName(e.target.value)}
          label='First Name'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
        />
        <div className="relative">
          {dateOfBirth && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Date of Birth</label>}
          <DateComponent/>
        </div>
        <div className="w-full lg:h-[60px] h-[48px] relative">
          {gender && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Gender</label>}
          <GenderSelect/>
        </div>
        <div className="w-full lg:h-[60px] h-[48px] relative">
          {nationality && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Nationality</label>}
          <NationalitySelect/>
        </div>
      </div>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Contact Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-2 lg:p-2">
        <AuthInput
          inputValue={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label='Phone Number'
          inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
        />
      </div>
      <div className='lg:p-2 lg:mt-2 mt-5'>
        <button className='py-2 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px]' onClick={onNext}>Proceed</button>
      </div>
    </div>
  )
};

export default StepOne