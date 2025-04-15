import Modal from '../ui/modal'
import { useSecurityAuthModal } from '../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { securityAuthSchema, securityAuthValues } from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Link } from 'react-router';
import useUserDetails from '../../stores/userStore';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';

const SecurityAuthModal = () => {
  const { isOpen, onClose } = useSecurityAuthModal();

  const { user, token } = useUserDetails();
  const { toast } = useToast();

  const defaultPasswordValues = {
    emailAuth: '',
    newAuthApp: '',
  };

  const form = useForm<securityAuthValues>({
    resolver: zodResolver(securityAuthSchema),
    defaultValues: defaultPasswordValues,
  });

  const onSubmitForm = async (values:securityAuthValues) => {
    const { emailAuth, newAuthApp } = values;

    const securityAuthData = {
      auth_code: newAuthApp,
      email_otp: emailAuth
    };

    if (user && token) {
      const verifyAuthConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/verify-two-fact-auth',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: securityAuthData
      };
      
      await axios.request(verifyAuthConfig)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Success',
            description: 'You have successfully set up your 2 factor authentication',
            variant: 'success'
          });
          onClose();
        }
      }).catch((error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: 'Error occurred while setting up your 2 factor authentication',
          variant: 'destructive'
        });
      })
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {onClose(); form.reset();}}
      useCloseButton
      title='Security Authentication'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base'>We just have to make sure it&apos;s really you. Kindly Input the 6-digit code from your authenticator.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className='mt-5 flex flex-col gap-5'>
              <FormField
                control={form.control}
                name='emailAuth'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-full lg:h-[60px] h-[48px] rounded border-0 bg-[#f5f5f5] text-sm lg:text-base' placeholder='Email authentication'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newAuthApp'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-full lg:h-[60px] h-[48px] rounded border-0 bg-[#f5f5f5] text-sm lg:text-base' placeholder='New authentication app'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='mt-3'>
                <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' type='submit'>
                  Proceed
                </button>
                <div className='flex justify-center items-center my-4'>
                  <Link to={'/password-recovery'} className="font-poppins font-semibold text-sm lg:text-base" onClick={() => {onClose()}}>Forgot Password?</Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
};

export default SecurityAuthModal