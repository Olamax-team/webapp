import Modal from '../ui/modal'
import { useSecurityAuthModal } from '../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { securityAuthSchema, securityAuthValues } from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Link } from 'react-router';

const SecurityAuthModal = () => {
  const { isOpen, onClose } = useSecurityAuthModal();;

  const defaultPasswordValues = {
    emailAuth: '',
    newAuthApp: '',
  };

  const form = useForm<securityAuthValues>({
    resolver: zodResolver(securityAuthSchema),
    defaultValues: defaultPasswordValues,
  });

  const onSubmitForm = (values:securityAuthValues) => {
    const { emailAuth, newAuthApp } = values;

    const securityAuthData = {
      new_auth_app: newAuthApp,
      email_auth: emailAuth
    };

    console.log(securityAuthData)
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
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
            </form>
          </Form>
        </div>
        <div>
          <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() => {onClose()}}>
            Proceed
          </button>
          <div className='flex justify-center items-center my-4'>
            <Link to={'/password-recovery'} className="font-poppins font-semibold text-sm lg:text-base" onClick={() => {onClose()}}>Forgot Password?</Link>
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default SecurityAuthModal