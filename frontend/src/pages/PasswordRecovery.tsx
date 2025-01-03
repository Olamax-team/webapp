import AuthLayout from '../components/layout/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/ui/form';
import { recoverySchema, recoveryValues } from '../lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom';
import { documentTitle } from '../lib/utils';
import arrow from '../assets/images/arrow-left.png'


const PasswordRecovery = () => {
  documentTitle('Password Recovery');

  const navigate = useNavigate();

  const defaultRecoveryValues = {
    email: '',
  };

  const form = useForm<recoveryValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: defaultRecoveryValues,
  });

  const watchedEmail = form.watch('email');

  const onSubmitForm = (values:recoveryValues) => {
    console.log(values);
  }

  return (
    <AuthLayout>
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
    </AuthLayout>
  )
}

export default PasswordRecovery;