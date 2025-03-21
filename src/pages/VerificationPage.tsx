import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { verficationSchema, verficationValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { documentTitle, useWhatNextPasswordModal } from '../lib/utils';
// import gmailIcon from '../assets/images/logos_google-gmail.png'
// import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { Loader2 } from 'lucide-react';

const VerificationPage = () => {
  documentTitle('Verification');

  const navigate = useNavigate();

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
        url: 'https://api.olamax.io/api/verify-email',
        header: {'Content-Type':'application/json'},
        data: verifyValues,
      };

      setIsLoading(true);
      axios.request(config).then((response) => {
        console.log(response);
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

    const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
    const [showResendButton, setShowResendButton] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);
  
    const resentOtp = async () => {
      setIsSending(true);
      setShowResendButton(false);
      startDelay();
    };
  
    const startCountdown = () => {
      setTimeLeft(60);
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime && prevTime <= 1) {
            clearInterval(intervalId);
            setShowResendButton(true);
            return 0
          }
          return prevTime ? prevTime - 1 : 0;
        })
      }, 1000);
    }
  
    const startDelay = () => {
      setTimeLeft(null);
      setTimeout(() => {
        startCountdown();
      }, 10000)
    };
  
    React.useEffect(() => {
      startDelay();
    }, []);
  
    React.useEffect(() =>{
      if (timeLeft && timeLeft > 0) {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime && prevTime <= 1) {
              clearInterval(intervalId);
              setShowResendButton(true);
              return 0
            }
            return prevTime ? prevTime - 1 : 0;
          })
        }, 1000);
        return () => clearInterval(intervalId)
      }
    },[timeLeft]);

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
                <img src={'/images/arrow-left.png'} alt="arrow_icon"/>
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
          <div className='flex items-center justify-end'>
            {timeLeft !== null && timeLeft > 0 && <p>{timeLeft}s</p>}
            {showResendButton && 
              <button type="button" className='text-primary text-sm font-semibold flex items-center gap-3 disabled:text-primary/60' onClick={resentOtp} disabled={isSending}>
                {isSending ? 'Resending OTP...' : 'Resend OTP'}
                {isSending && <Loader2 className='animate-spin'/>}
              </button>}
          </div>
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
      <VerificationForm/>
    </AuthLayout>
  )
}

export default VerificationPage;