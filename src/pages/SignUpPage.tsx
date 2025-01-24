import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { signupSchema, signUpValues, verficationSchema, verficationValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { documentTitle, useModal } from '../lib/utils';
import gmailIcon from '../assets/images/logos_google-gmail.png'
import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

const SignUpPage = () => {
  documentTitle('Registration');

  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isGoogleSubmit, setIsGoogleSubmit] = React.useState(false);

  const navigate = useNavigate();

  const SignUpForm = () => {
    
    const defaultSignUpValues = {
      email: '',
      password: '',
      referralCode: ''
    };
  
    const form = useForm<signUpValues>({
      resolver: zodResolver(signupSchema),
      defaultValues: defaultSignUpValues
    });
  
    const watchedEmail = form.watch('email');
    const watchedPassword = form.watch('password');
    const watchedReferralCode = form.watch('referralCode')
  
    const onSubmitForm = async (values:signUpValues) => {
      const { email, password, referralCode } = values;
  
      const registerValues = {
        email: email,
        password: password,
        referrer_code: referralCode,
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/register',
        header: {'Content-Type':'application/json'},
        data: registerValues,
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
          <div className='mb-4 flex justify-between'>
            <div>
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>Create Account</h2>
              <p className='text-base'>Start trading with us today!</p>
            </div>
            <button className='flex gap-4 text-black/50 lg:hidden' onClick={() => navigate(-1)} type='button'>
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedPassword} label='Create Password' type='password'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='referralCode'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedReferralCode ? watchedReferralCode : ''} label='Referral Code (Optional)' type='text'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <p className='w-full font-Inter'>By creating an account you agree to the <span className='underline text-primary'>Privacy Policy</span> and <span className='underline text-primary'>Terms of Use</span></p>
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-8' type='submit'>Create Account</button>
          <div className='lines'>
            <h2>or</h2>
          </div>
          <button type='button' className='w-full h-[70px] rounded-md flex items-center justify-center bg-[#f5f5f5] gap-3'>
            <h2 className='font-semibold'>Continue with Google</h2>
            <div className='w-[24px] h-[18px]'>
              <img src={gmailIcon} alt="gmail_icon" className='object-cover' />
            </div>
          </button>
        </form> 
      </Form>
    );
  };

  const VerificationForm = () => {

    const { onOpen } = useModal();
    
    const defaultVerificationValues = {
      verificationCode: ''
    };
  
    const form = useForm<verficationValues>({
      resolver: zodResolver(verficationSchema),
      defaultValues: defaultVerificationValues
    });
  
    const onSubmitForm = (values:verficationValues) => {
      const { verificationCode } = values;
  
      const verifyValues = {
        verify_email: verificationCode
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/verify_email',
        header: {'Content-Type':'application/json'},
        data: verifyValues,
      };

      axios.request(config).then((response) => {
        if (response.data.status === 'success') {
          onOpen();
          navigate('/login-in', { replace: true });
        }
      });
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
      { isGoogleSubmit ? '' : isSubmit ? <VerificationForm/> : <SignUpForm/> }
    </AuthLayout>
  )
}

export default SignUpPage;