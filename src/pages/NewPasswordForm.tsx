import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { passwordRecoverySchema, passwordRecoveryValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';


const NewPasswordForm = () => {
  documentTitle('New Password Form');

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const PasswordRecoveryForm = () => {

    const defaultRecoveryValues = {
      emailOtp: '',
      newPassword: '',
      confirmPassword: ''
    };

  
    const form = useForm<passwordRecoveryValues>({
      resolver: zodResolver(passwordRecoverySchema),
      defaultValues: defaultRecoveryValues,
    });

    const watchedEmailOtp = form.watch('emailOtp');
    const watchedNewPassword = form.watch('newPassword');
    const watchedConfirmPassword = form.watch('confirmPassword');
  
    const onSubmitForm = (values:passwordRecoveryValues) => {
      const { emailOtp, newPassword, confirmPassword } = values;

      const recoveryData = {
        otp: emailOtp, 
        new_password: newPassword,
        new_retyped_password: confirmPassword
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
            description: 'Your new password has been set. Go ahead and login',
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
              <h2 className='text-[32px] leading-normal font-DMSans font-bold'>New Password Creation</h2>
              <p className='text-base lg:-mr-6'>We know you have recieved the OTP. You can now change your password by entering the OTP as well as the new password you intend to use.</p>
            </div>
            <button className='flex gap-4 items-center text-black/50 lg:hidden mt-4 -mr-8' onClick={() => navigate(-1)}>
              <div className="size-[20px]">
                <img src={'/images/arrow-left.png'} alt="arrow_icon"/>
              </div>
              Back
            </button>
          </div>
          <FormField
            control={form.control}
            name='emailOtp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedEmailOtp} label='Email OTP' type='text'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedNewPassword} label='New Password' type='password'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput {...field} inputValue={watchedConfirmPassword} label='Confirm Password' type='password'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <button className='w-full h-[70px] rounded-md bg-primary text-white mt-4 disabled:bg-primary/50 justify-center flex items-center gap-3' type='submit' disabled={isLoading}>
            {isLoading ? 'Creating New Password...' : 'Proceed'}
            {isLoading && <Loader2 className='animate-spin'/>}
          </button>
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

export default NewPasswordForm;