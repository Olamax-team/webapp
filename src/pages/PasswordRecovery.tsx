import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { recoverySchema, recoveryValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
import arrow from '../assets/images/arrow-left.png'
import axios from 'axios';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';


const PasswordRecovery = () => {
  documentTitle('Password Recovery');

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
        url: `https://api.olamax.io/api/recover-account`,
        header: {'Content-Type':'application/json'},
        data: recoveryData,
      };

      setIsLoading(true);
      axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast({
            title: 'Success',
            description: 'Recovery password has been sent to your email',
            variant: 'success'
          })
          navigate('/log-in', {replace: true});
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
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-4 disabled:bg-primary/50 justify-center flex items-center gap-3' type='submit' disabled={isLoading}>
            {isLoading ? 'Requesting OTP...' : 'Proceed'}
            {isLoading && <Loader2 className='animate-spin'/>}
          </button>
          <p className='font-poppins'>Don’t have an account ? <Link to={'/sign-up'} className='font-semibold'>Register</Link></p>
        </form> 
      </Form>
    )
  };

  return (
    <AuthLayout>
      <PasswordRecoveryForm/>
    </AuthLayout>
  )
}

export default PasswordRecovery;