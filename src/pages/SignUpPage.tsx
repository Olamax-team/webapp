import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { signupSchema, signUpValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
// import gmailIcon from '../assets/images/logos_google-gmail.png'
// import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

const SignUpPage = () => {
  documentTitle('Registration');

  const navigate = useNavigate();
  const { toast } = useToast();

  const SignUpForm = () => {
    const [loading, setLoading] = React.useState(false);
    
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
          navigate('/verify-email', {replace: true})
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
      window.location.href = "https://api.olamax.io/auth/google"
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
                <img src={'/images/arrow-left.png'} alt="arrow_icon"/>
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
          <button type='button' className='font-semibold w-full h-[70px] rounded-md flex items-center justify-center bg-[#f5f5f5] gap-3 disabled:bg-gray-300' onClick={continueWithGoogle}>
            Continue with Google
            <div className='w-[24px] h-[18px]'>
              <img src={'/images/logos_google-gmail.png'} alt="gmail_icon" className='object-cover' />
            </div>
          </button>
        </form> 
      </Form>
    );
  };

  return (
    <AuthLayout>
      <SignUpForm/>
    </AuthLayout>
  )
}

export default SignUpPage;