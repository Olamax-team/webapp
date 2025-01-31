import React from 'react'
import {  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../../lib/utils';
import { Paperclip, X } from 'lucide-react';
import { HiOutlineDocumentText} from 'react-icons/hi';
import { AuthInput } from '../../auth/AuthInput';


const StepTwo = () => {
  const [documentType, setDocumentType] = React.useState('');
  const [formdata, setFormdata] = React.useState<any[]>([]);
  const [frontImage, setFrontImage] = React.useState<File | null>(null);
  const [backImage, setBackImage] = React.useState<File | null>(null);
  const [holdingImage, setHoldingImage] = React.useState<File | null>(null);
  const [bvn, setBvn] = React.useState('')

  const DocumentSelect = () => {

    const handleDocumentSelect = (value:string) => {
      setDocumentType(value);

      const documentData = {
        key: "method",
        value: value,
        type: "text"
      };

      setFormdata((prevData) => [...prevData, documentData])
    }

    return (
      <Select onValueChange={(value) => handleDocumentSelect(value)} defaultValue={documentType}>
        <SelectTrigger className={cn("w-full h-full pl-4 font-semibold text-base focus:border-primary focus:border-2 focus:ring-0", documentType ? 'lg:pt-5 pt-6': '')}>
          <SelectValue placeholder="Select Identity type" />
        </SelectTrigger>
        <SelectContent className='z-[300000]'>
          <SelectGroup>
            <SelectItem value="national_id">National Identity Card</SelectItem>
            <SelectItem value="passport">International Passport</SelectItem> 
            <SelectItem value="license">Driver License</SelectItem> 
            <SelectItem value="bvn">Bank Verification Number</SelectItem> 
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  };

  const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>, key: 'front' | 'back' | 'holding') => {
    const file = event.target.files?.[0];

    if (file) { 
      if (key === 'front') {
        setFrontImage(file)
      } else if (key === 'back') {
        setBackImage(file)
      } else {
        setHoldingImage(file);
      }
      
      
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = {
          key: key,
          src: reader.result as string,
          type: 'file'
        };

        setFormdata((prevData) => {
          const existingIndex = prevData.findIndex(item => item.key === key);

          if (existingIndex !== -1) {
            const newData = [...prevData];
            newData[existingIndex] = imageData;
            return newData
          } else {
            return [...prevData, imageData]
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const formatImageSize = (size: number| undefined) => {

    if (size) {
      const fileSizeInKB = (size / 1024)
      const fileSizeInMB = (size / (1024*1024));

      if (fileSizeInMB >= 1) {
        return `${fileSizeInMB.toFixed(2)}MB`
      } else {
        return `${fileSizeInKB.toFixed(2)}KB`
      }
    }
  };

  const cancelImage = ( type:string) => {

    if (type === 'front') {
      const newData = formdata.filter((item) => item.key !== type);
      setFrontImage(null);
      setFormdata(newData);
    } else if (type === 'back') {
      setBackImage(null)
    } else {
      setHoldingImage(null)
    }
  };

  console.log(formdata);
  console.log('frontImage:', frontImage);
  console.log('backImage:', backImage);
  console.log('holdingImage:', holdingImage);
  console.log(formatImageSize(frontImage?.size));


  return (
    <div className='lg:w-[75%] w-full'>
      <h2 className='font-semibold font-Inter text-sm lg:text-base'>Select Document Type</h2>
      <div className="mt-3 flex flex-col gap-3">
        <div className="w-full lg:h-[60px] h-[48px] relative mb-2">
          {documentType && <label className='-translate-y-[5%] text-black/50 top-2 text-[13px] font-semibold absolute left-4'>Identity Type</label>}
          <DocumentSelect/>
        </div>
        {documentType === 'bvn' ?
        <React.Fragment>
          <h2 className='text-sm'>Confirming your BVN helps us verify your identity and protect your account from fraud.</h2>
          <AuthInput
            inputValue={bvn}
            onChange={(e) => setBvn(e.target.value)} 
            label='BVN'
            inputStyle='capitalize font-semibold lg:pt-6 pt-6 lg:h-[60px] h-[48px]'
          />
        </React.Fragment>
         : 
          <React.Fragment>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm'>Document Front Side</h2>
              <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='front-image'>
                <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                {frontImage ? 
                  <X className='size-6 absolute right-4 top-1/2 -translate-y-1/2 text-red-500' onClick={() =>cancelImage('front')}/> : 
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                }
                {frontImage ?
                  <div className='flex flex-col'>
                    <span className='text-sm line-clamp-1'>{frontImage.name}</span>
                    <span className='text-sm'>{formatImageSize(frontImage.size)}</span>
                  </div> : 
                  <p className='text-sm'>Upload Document</p>
                }
                <input type='file' id='front-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'front')}/>
              </label>
            </div>
            <div className='flex flex-col gap-2'> 
              <h2 className='text-sm'>Document Back Side</h2>
              <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='back-image'>
                <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                {backImage ? 
                  <X className='size-6 absolute right-4 top-1/2 -translate-y-1/2 text-red-500' onClick={() =>cancelImage('back')}/> : 
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                }
                {backImage ?
                  <div className='flex flex-col'>
                    <span className='text-sm line-clamp-1'>{backImage.name}</span>
                    <span className='text-sm'>{formatImageSize(backImage.size)}</span>
                  </div> : 
                  <p className='text-sm'>Upload Document</p>
                }
                <input type='file' id='back-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'back')}/>
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm'>User Holding Document</h2>
              <label className="border rounded-md lg:h-[60px] h-[48px] w-full relative p-4 pl-14 cursor-pointer flex items-center" htmlFor='holding-image'>
                <HiOutlineDocumentText className='size-6 absolute left-4 top-1/2 -translate-y-1/2 '/>
                {holdingImage ? 
                  <X className='size-6 absolute right-4 top-1/2 -translate-y-1/2 text-red-500' onClick={() =>cancelImage('holding')}/> : 
                  <Paperclip className='size-6 absolute right-4 top-1/2 -translate-y-1/2'/>
                }
                {holdingImage ?
                  <div className='flex flex-col'>
                    <span className='text-sm line-clamp-1'>{holdingImage.name}</span>
                    <span className='text-sm'>{formatImageSize(holdingImage.size)}</span>
                  </div> : 
                  <p className='text-sm'>Upload Document</p>
                }
                <input type='file' id='holding-image' hidden accept='jpeg' onChange={(e) => handleImageChange(e, 'holding')}/>
              </label>
            </div>
          </React.Fragment>
        }
        <div className='lg:p-2 lg:mt-2 mt-5'>
          <button className='py-2 px-8 bg-primary rounded-md text-white leading-normal text-[13px] lg:text-[16px]'>Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default StepTwo