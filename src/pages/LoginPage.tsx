import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { loginSchema, loginValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
import gmailIcon from '../assets/images/logos_google-gmail.png'
import arrow from '../assets/images/arrow-left.png'

const LoginPage = () => {
  documentTitle('Login');

  const navigate = useNavigate();

  const defaultLoginValues = {
    email: '',
    password: ''
  };

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues
  });

  const watchedEmail = form.watch('email');
  const watchedPassword = form.watch('password');

  const onSubmitForm = (values:loginValues) => {
    console.log(values);
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col gap-4 lg:w-[440px] md:w-[500px] w-[390px] mx-auto lg:mx-0'>
          <div className='mb-2 flex items-center justify-between'>
            <div>
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>Login</h2>
              <p className='text-base'>We're happy to see you again!</p>
            </div>
            <button className='flex gap-4 items-center text-black/50 lg:hidden' onClick={() => navigate(-1)} type='button'>
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
                  <AuthInput {...field} inputValue={watchedPassword} label='Enter Password' type='password'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Link to={'/password-recovery'} className="font-poppins font-semibold">Forgot Password?</Link>
          <button className='w-full h-[70px] rounded-md bg-primary text-white' type='submit'>Login</button>
          <div className='lines'>
            <h2>or</h2>
          </div>
          <button type='button' className='w-full h-[70px] rounded-md flex items-center justify-center bg-[#f5f5f5] gap-3'>
            <h2 className='font-semibold'>Continue with Google</h2>
            <div className='w-[24px] h-[18px]'>
              <img src={gmailIcon} alt="gmail_icon" className='object-cover' />
            </div>
          </button>
          <p className='font-poppins'>Don’t have an account ? <Link to={'/sign-up'} className='font-semibold'>Register</Link></p>
        </form> 
      </Form>
    </AuthLayout>
  )
}

export default LoginPage;