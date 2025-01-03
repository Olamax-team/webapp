import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { signupSchema, signUpValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { api, documentTitle } from '../lib/utils';
import gmailIcon from '../assets/images/logos_google-gmail.png'
import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';

const SignUpPage = () => {
  documentTitle('Registration');

  const navigate = useNavigate();

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

  const onSubmitForm = (values:signUpValues) => {
    const { email, password, referralCode } = values;

    const registerValues = {
      view: 'register',
      email: email,
      password: password,
      referrer: referralCode,
    };
    console.log(registerValues);

    let data = JSON.stringify({
      "view": "register",
      "fname": "tt",
      "lname": "ta",
      "mname": "tt",
      "email": "du@gmail.com",
      "password": "pass"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olamax.peacefarm.me/api/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col gap-4 lg:w-[440px] md:w-[500px] w-[390px] mx-auto lg:mx-0'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>Create Account</h2>
              <p className='text-base'>Start trading with us today!</p>
            </div>
            <button className='flex gap-4 items-center text-black/50 lg:hidden' onClick={() => navigate(-1)}>
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
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-2' type='submit'>Create Account</button>
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
    </AuthLayout>
  )
}

export default SignUpPage;