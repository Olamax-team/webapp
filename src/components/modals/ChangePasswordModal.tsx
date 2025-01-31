import Modal from '../ui/modal'
import { useChangePasswordModal, usePasswordChangeCompleteModal } from '../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { changePasswordSchema, changePasswordValues } from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Link } from 'react-router';

const ChangePasswordModal = () => {
  const { isOpen, onClose } = useChangePasswordModal();
  const openPasswordChangedModal = usePasswordChangeCompleteModal();

  const defaultPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const form = useForm<changePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: defaultPasswordValues,
  });

  const onSubmitForm = (values:changePasswordValues) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    const changePasswordData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    console.log(changePasswordData)
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Change Password'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base'>Update your password regularly to maintain the security of your account and protect your personal information.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className='mt-5 flex flex-col gap-5'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-full lg:h-[60px] h-[48px] rounded border-0 bg-[#f5f5f5] text-sm lg:text-base' placeholder='Current password'/>
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
                      <Input {...field} className='w-full lg:h-[60px] h-[48px] rounded border-0 bg-[#f5f5f5] text-sm lg:text-base' placeholder='New password'/>
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
                      <Input {...field} className='w-full lg:h-[60px] h-[48px] rounded border-0 bg-[#f5f5f5] text-sm lg:text-base' placeholder='Confirm password'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div>
          <button className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() => { openPasswordChangedModal.onOpen(); onClose() }}>
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

export default ChangePasswordModal