import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { loginSchema, loginValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
// import gmailIcon from '../assets/images/logos_google-gmail.png'
// import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import useUserDetails from '../stores/userStore';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/use-localstorage';
import { useApiConfig } from '../hooks/api';

const LoginPage = () => {
  documentTitle('Login');

  const navigate = useNavigate();
  const { setUser, setLoading, loading } = useUserDetails();
  const { setItem } = useLocalStorage();
  const { toast } = useToast();

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

  const onSubmitForm = async (values:loginValues) => {
    const { email, password } = values;
  
    const loginValues = {
      email: email,
      password: password,
    };

    const loginConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/login',
      headers: {
        'Content-Type':'application/json',
      },
      data: loginValues
    };

    setLoading(true);
    axios.request(loginConfig)
    .then((response) => {
      if (response.status === 200) {
        setItem('token', response.data.token);
        setItem('user', JSON.stringify(response.data.data.user));
        setUser(response.data.data.user, response.data.token );
        toast({
          title: 'Success',
          description: 'Login was successful, welcome!',
          variant: 'success'
        });
        setLoading(false);
        navigate('/dashboard');
      };
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Error',
          description: error.response?.data.message,
          variant: 'destructive'
        });
        setLoading(false);
        console.error("Error fetching data message:", error.response?.data.message || error.message);        
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong!! Try again later',
          variant: 'destructive'
        });
        setLoading(false);
        console.error("Unexpected error:", error);
      };
    });
  };

  const continueWithGoogle = async () => {

   
      window.location.href = "https://api.olamax.io/auth/google"
    
    // const config = {
    //   method: 'get',
    //   url: 'https://api.olamax.io/auth/google',
    // };

    // setIsLoading(true);
    // axios.request(config)
    // .then((response) => {
    //   console.log(response);
    //   if (response.data.status === 'success') {
    //     toast({
    //       title: 'Success',
    //       description: 'Registration was successful',
    //        variant: 'success'
    //     });
    //     setIsLoading(false);
    //   }
    // }).catch((error) => {
    //   if (axios.isAxiosError(error)) {
    //     toast({
    //       title: 'Error',
    //       description: error.response?.data.message,
    //       variant: 'destructive'
    //     });
    //     setIsLoading(false);
    //     console.error("Error fetching data:", error.response?.data || error.message);        
    //   } else {
    //     toast({
    //       title: 'Error',
    //       description: 'Something went wrong, try again later',
    //       variant: 'destructive'
    //     });
    //     setIsLoading(false);
    //     console.error("Unexpected error:", error);
    //   };
    // })
  };

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
                  <AuthInput {...field} inputValue={watchedPassword} label='Enter Password' type='password' name='password' id='password'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Link to={'/password-recovery'} className="font-poppins font-semibold">Forgot Password?</Link>
          <button className='w-full h-[70px] rounded-md bg-primary text-white flex items-center gap-3 disabled:bg-primary/50 justify-center' type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
            {loading && <Loader2 className='animate-spin'/>}
          </button>
          <div className='lines'>
            <h2>or</h2>
          </div>
          <button type='button' className='w-full h-[70px] rounded-md flex items-center justify-center bg-[#f5f5f5] disabled:bg-gray-300 gap-3' onClick={continueWithGoogle}>
            <h2 className='font-semibold'>Continue with Google</h2>
            <div className='w-[24px] h-[18px]'>
              <img src={'/images/logos_google-gmail.png'} alt="gmail_icon" className='object-cover' />
            </div>
          </button>
          <p className='font-poppins'>Don&apos;t have an account ? <Link to={'/sign-up'} className='font-semibold'>Register</Link></p>
        </form> 
      </Form>
    </AuthLayout>
  )
}

export default LoginPage;