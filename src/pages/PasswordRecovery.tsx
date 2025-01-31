import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { recoverySchema, recoveryValues, verficationSchema, verficationValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
import arrow from '../assets/images/arrow-left.png'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import axios from 'axios';


const PasswordRecovery = () => {
  documentTitle('Password Recovery');

  const [isSubmit, setIsSubmit] = React.useState(true);

  const navigate = useNavigate();

  const PasswordRecoveryForm = () => {

    const defaultRecoveryValues = {
      email: '',
    };
  
    const form = useForm<recoveryValues>({
      resolver: zodResolver(recoverySchema),
      defaultValues: defaultRecoveryValues,
    });
  
    const watchedEmail = form.watch('email');
  
    const onSubmitForm = (values:recoveryValues) => {
      const { email } = values;
  
      const recoveryData = {
        email: email,
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/recover-account',
        header: {'Content-Type':'application/json'},
        data: recoveryData,
      }

      axios.request(config).then((response) => {
        if (response.data.status === 'success') {
          setIsSubmit(true);
        }
      })
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col gap-4 lg:w-[440px] md:w-[500px] w-[390px] mx-auto lg:mx-0'>
          <div className='mb-2 flex items-start justify-between'>
            <div>
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>Password Recovery</h2>
              <p className='text-base lg:-mr-6'>Don’t worry, resetting your password is very easy. Just type in the email address you registered with, and we would send you a one time password to confirm your identity</p>
            </div>
            <button className='flex gap-4 items-center text-black/50 lg:hidden mt-4 -mr-8' onClick={() => navigate(-1)}>
              <div className="size-[20px]">
                <img src={arrow} alt="arrow_icon"/>
              </div>
              Back
            </button>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedEmail} label='Email Address' type='email'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-4' type='submit'>Proceed</button>
          <p className='font-poppins'>Don’t have an account ? <Link to={'/sign-up'} className='font-semibold'>Register</Link></p>
        </form> 
      </Form>
    )
  };

  const VerificationForm = () => {
    const navigate = useNavigate();

    const defaultVerificationValues = {
      verificationCode: ''
    };
  
    const form = useForm<verficationValues>({
      resolver: zodResolver(verficationSchema),
      defaultValues: defaultVerificationValues
    });
  
    const onSubmitForm = (values:verficationValues) => {
      const { verificationCode } = values;
  
      const verifyData = {
        verify_email: verificationCode,
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/verify-email',
        header: {'Content-Type':'application/json'},
        data: verifyData,
      };

      axios.request(config).then((response) => {
        if (response.data.status === 'success') {
          navigate('/login');
        }
      })
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col gap-4 lg:w-[440px] md:w-[500px] w-[390px] mx-auto lg:mx-0'>
          <div className='mb-4 flex justify-between'>
            <div>
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>Enter the 6-digit verification code we sent to your email address</h2>
              <p className='text-base'>This helps verify you are the account owner.</p>
            </div>
            <button className='flex gap-4 text-black/50 lg:hidden' onClick={() => navigate(-1)}>
              <div className="size-[20px]">
                <img src={arrow} alt="arrow_icon"/>
              </div>
              Back
            </button>
          </div>
          <FormField
            control={form.control}
            name='verificationCode'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className='w-full lg:h-[70px] md:h-[70px] h-[62px] gap-2 md:gap-3 xl:gap-4 font-inter'>
                      <InputOTPSlot index={0} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal'/>
                      <InputOTPSlot index={1} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={2} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={3} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={4} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={5} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-8' type='submit'>Proceed</button>
          <p className='w-full font-Inter'>Didn&apos;t receive an email ? <span className='font-semibold'>Request Code again</span></p>
        </form> 
      </Form>
    );
  };

  return (
    <AuthLayout>
      { isSubmit ? <VerificationForm/> : <PasswordRecoveryForm/> }
    </AuthLayout>
  )
}

export default PasswordRecovery;