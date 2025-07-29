import Modal from '../ui/modal'
import { useAuthFactorModal, useVerifyDeleteModal } from '../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { useForm } from 'react-hook-form';
import { verficationSchema, verficationValues } from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from '../../hooks/use-toast';
import useUserDetails from '../../stores/userStore';

const AuthFactorModal = () => {
  const { isOpen, onClose } = useAuthFactorModal();
  const openVerifyModal = useVerifyDeleteModal();

  const defaultVerificationValues = {
    verificationCode: ''
  };

  const form = useForm<verficationValues>({
    resolver: zodResolver(verficationSchema),
    defaultValues: defaultVerificationValues
  });

  const { token } = useUserDetails();
  const onSubmitForm = async (values:verficationValues) => {
    try {
      const { verificationCode } = values;

      const verifyData = {
        otp: verificationCode,
      };

      const verifyConfig = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/verify-two-fact-auth',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: verifyData
      };

      const response = await axios.request(verifyConfig);
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "2FA code verified successfully",
          variant: 'success'
        });
        openVerifyModal.onOpen();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data.message || "Failed to verify 2FA code",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
    }
  };


  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={true}
      title='Enter 2-FA Code'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-10'>
        <div>
          <p className='text-sm lg:text-base'>We just have to make sure it&apos;s really you. Kindly Input the 6-digit code from your authenticator.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className='mt-5'>
              <FormField
                control={form.control}
                name='verificationCode'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className='w-full lg:h-[70px] md:h-[70px] h-[62px] gap-2 md:gap-3 xl:gap-4 font-inter'>
                          <InputOTPSlot index={0} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal'/>
                          <InputOTPSlot index={1} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={2} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={3} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={4} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={5} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <button 
                className='w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' 
                type='submit'
              >
                Proceed
              </button>
            </form>
          </Form>
          <p className='text-center mt-3 font-Inter'>Didn&apos;t receive an email ? <button className='font-bold'>Request Code again</button></p>
        </div>
      </div>
    </Modal>
  )
}

export default AuthFactorModal