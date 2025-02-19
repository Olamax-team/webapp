import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { signupSchema, signUpValues, verficationSchema, verficationValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { documentTitle, useWhatNextPasswordModal } from '../lib/utils';
import gmailIcon from '../assets/images/logos_google-gmail.png'
import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

const SignUpPage = () => {
  documentTitle('Registration');

  const [isSubmit, setIsSubmit] = React.useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const SignUpForm = () => {
    const [loading, setLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
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
      };

      setLoading(true);
      axios.request(config)
      .then((response) => {
        if (response.data.status === 'success') {
          toast({
            title: 'Success',
            description: response.data.message,
             variant: 'success'
          });
          setLoading(false);
          setIsSubmit(true);
        }
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Error',
            description: error.response?.data.message,
            variant: 'destructive'
          });
          setLoading(false);
          console.error("Error fetching data:", error.response?.data || error.message);        
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong!! Try again later',
            variant: 'destructive'
          });
          setLoading(false);
          console.error("Unexpected error:", error);
        };
      })
    };

    const continueWithGoogle = async () => {
      const config = {
        method: 'get',
        url: 'https://api.olamax.io/auth/google',
      };

      setIsLoading(true);

      axios.request(config)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          toast({
            title: 'Success',
            description: 'Registration was successful',
             variant: 'success'
          });
          setIsLoading(false);
        }
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Error',
            description: error.response?.data.message,
            variant: 'destructive'
          });
          setIsLoading(false);
          console.error("Error fetching data:", error.response?.data || error.message);        
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong, try again later',
            variant: 'destructive'
          });
          setIsLoading(false);
          console.error("Unexpected error:", error);
        };
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
                  <AuthInput {...field} inputValue={watchedEmail} label='Email Address' type='email' name='email' id='email'/>
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
                  <AuthInput {...field} inputValue={watchedPassword} label='Create Password' type='password' name='password' id='password'/>
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
                  <AuthInput {...field} inputValue={watchedReferralCode ? watchedReferralCode : ''} label='Referral Code (Optional)' type='text' name='referralCode' id='referralCode'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <p className='w-full font-Inter'>By creating an account you agree to the <span className='underline text-primary'>Privacy Policy</span> and <span className='underline text-primary'>Terms of Use</span></p>
          <button className='font-semibold w-full h-[70px] rounded-md bg-primary text-white mt-8 flex items-center gap-3 justify-center disabled:bg-primary/50' type='submit' disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
            {loading && <Loader2 className='animate-spin'/>}
          </button>
          <div className='lines'>
            <h2>or</h2>
          </div>
          <button type='button' className='font-semibold w-full h-[70px] rounded-md flex items-center justify-center bg-[#f5f5f5] gap-3 disabled:bg-gray-300' onClick={continueWithGoogle} disabled={isLoading}>
            { isLoading ? 'Creating account...' : 'Continue with Google' }
            {isLoading ? <Loader2 className='animate-spin'/> :
              <div className='w-[24px] h-[18px]'>
                <img src={gmailIcon} alt="gmail_icon" className='object-cover' />
              </div>
            }
          </button>
        </form> 
      </Form>
    );
  };

  const VerificationForm = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { onOpen } = useWhatNextPasswordModal();
    
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

      setIsLoading(true);
      axios.request(config).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          onOpen();
          navigate('/log-in', { replace: true });
        }
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          setIsLoading(false);
          console.error("Error fetching data:", error.response?.data || error.message);        
        } else {
          setIsLoading(false);
          console.error("Unexpected error:", error);
        };
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
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-8 flex items-center gap-3 justify-center disabled:bg-primary/50' type='submit' disabled={isLoading}>
            {isLoading ? 'Proceeding...' : 'Proceed'}
            {isLoading && <Loader2 className='animate-spin'/>}
          </button>
          <p className='w-full font-Inter'>Didn&apos;t receive an email ? <span className='font-semibold'>Request Code again</span></p>
        </form> 
      </Form>
    );
  };

  return (
    <AuthLayout>
      { isSubmit ? <VerificationForm/> : <SignUpForm/> }
    </AuthLayout>
  )
}

export default SignUpPage;